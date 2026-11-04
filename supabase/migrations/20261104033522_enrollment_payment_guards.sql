-- Preserve issued terms; never activate revoked accounts or ignore duplicate payments.
create or replace function portal_private.enrollment_gateway(operation text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
 declare attempt public.enrollment_checkouts; enrollment public.investor_enrollments; offer public.investor_offers; new_contract uuid; event_state text; event_id text; paid_on date;
 begin
 if coalesce(auth.jwt()->>'role','')<>'service_role' then raise exception 'Server access required' using errcode='42501';end if;
 select * into attempt from public.enrollment_checkouts where id=(payload->>'attempt_id')::uuid for update;
 if attempt.id is null then raise exception 'Unknown checkout attempt';end if;
 select * into enrollment from public.investor_enrollments where id=attempt.enrollment_id for update;
 if operation='bind' then
 if (payload->>'amount_minor')::integer is distinct from attempt.amount_minor or payload->>'currency' is distinct from attempt.currency or payload->>'session_id' is null then raise exception 'Payment mismatch';end if;
 if attempt.stripe_session_id is not null and attempt.stripe_session_id<>payload->>'session_id' then raise exception 'Checkout already bound';end if;
 update public.enrollment_checkouts set stripe_session_id=payload->>'session_id',livemode=(payload->>'livemode')::boolean,state=case when state='allocating' then 'open' else state end,updated_at=now() where id=attempt.id;
 elsif operation='release' then
 if attempt.state<>'allocating' or attempt.stripe_session_id is not null then raise exception 'Attempt cannot be released';end if;
 update public.enrollment_checkouts set state='failed',updated_at=now() where id=attempt.id;
 if enrollment.status='payment_pending' then update public.investor_enrollments set status='accepted',updated_at=now() where id=enrollment.id;end if;
 elsif operation='event' then
 event_id:=payload->>'event_id';event_state:=payload->>'state';
 if event_id is null or event_state not in ('processing','paid','expired','failed','refunded','disputed') then raise exception 'Invalid event';end if;
 if attempt.stripe_session_id is null or attempt.stripe_session_id is distinct from payload->>'session_id' or attempt.livemode is distinct from (payload->>'livemode')::boolean then raise exception 'Unbound checkout or environment mismatch';end if;
 if (payload->>'amount_minor')::integer is distinct from attempt.amount_minor or payload->>'currency' is distinct from attempt.currency then raise exception 'Payment mismatch';end if;
 insert into public.stripe_events(event_id,event_type,object_id) values(event_id,payload->>'event_type',payload->>'session_id') on conflict do nothing;
 if not found then return enrollment.id;end if;
 -- Payment risk is sticky: an old success event cannot reverse a refund/dispute.
 if attempt.state in ('refunded','disputed') and event_state not in ('refunded','disputed') then return enrollment.id;end if;
 if event_state='paid' then
 if payload->>'payment_intent_id' is null then raise exception 'Missing payment reference';end if;
 paid_on:=(to_timestamp((payload->>'paid_at')::bigint) at time zone 'UTC')::date;
 if paid_on is null then raise exception 'Missing payment timestamp';end if;
 select * into offer from public.investor_offers where id=enrollment.offer_id;
 if not exists(select 1 from public.accounts a join public.account_memberships m on m.account_id=a.id join auth.users u on u.id=m.user_id
 where a.id=enrollment.account_id and a.status='active' and m.user_id=enrollment.user_id and m.active and m.role='owner' and u.email_confirmed_at is not null and u.raw_app_meta_data->>'portal_role' in ('internal','partner') and (u.banned_until is null or u.banned_until<now())) then
 update public.enrollment_checkouts set state='paid',stripe_payment_intent_id=payload->>'payment_intent_id',updated_at=now() where id=attempt.id;
 update public.investor_enrollments set status='payment_review',review_note='Pagamento recebido durante bloqueio de acesso. A equipe deve revisar a ativação.',updated_at=now() where id=enrollment.id;
 return enrollment.id;
 end if;
 if exists(select 1 from public.enrollment_checkouts where enrollment_id=enrollment.id and id<>attempt.id and state='paid') then
 update public.enrollment_checkouts set state='paid',stripe_payment_intent_id=payload->>'payment_intent_id',updated_at=now() where id=attempt.id;
 update public.investor_enrollments set status='payment_review',review_note='Mais de um pagamento recebido. A equipe deve revisar antes de prosseguir.',updated_at=now() where id=enrollment.id;
 return enrollment.id;
 end if;
 if enrollment.contract_id is null then
 if enrollment.status not in ('accepted','payment_pending') or not exists(select 1 from public.agreement_acceptances where enrollment_id=enrollment.id) then raise exception 'Enrollment is not accepted';end if;
 insert into public.contracts(account_id,number,title,status,starts_on,ends_on,invested_amount)
 values(enrollment.account_id,'ENR-'||enrollment.id::text,offer.title,'active',paid_on,(paid_on+(offer.term_months||' months')::interval-interval '1 day')::date,enrollment.amount_minor::numeric/100) returning id into new_contract;
 update public.investor_enrollments set status='active',contract_id=new_contract,updated_at=now() where id=enrollment.id;
 end if;
 update public.enrollment_checkouts set state='paid',stripe_payment_intent_id=payload->>'payment_intent_id',updated_at=now() where id=attempt.id;
 elsif event_state in ('refunded','disputed') then
 update public.enrollment_checkouts set state=event_state,updated_at=now() where id=attempt.id;
 update public.investor_enrollments set status='payment_review',review_note='Pagamento requer análise da equipe.',updated_at=now() where id=enrollment.id;
 elsif attempt.state<>'paid' then
 update public.enrollment_checkouts set state=event_state,updated_at=now() where id=attempt.id;
 if event_state in ('expired','failed') and enrollment.status='payment_pending' then update public.investor_enrollments set status='accepted',updated_at=now() where id=enrollment.id;end if;
 end if;
 else raise exception 'Unsupported gateway operation';end if;
 return enrollment.id;
 end;
$$;
create or replace function portal_private.enrollment_member(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
 declare enrollment public.investor_enrollments; offer public.investor_offers; v_details jsonb; terms jsonb; body text; result uuid;
 begin
 select * into enrollment from public.investor_enrollments where id=(payload->>'enrollment_id')::uuid for update;
 if enrollment.id is null or not portal_private.enrollment_owner(enrollment.id) then raise exception 'Access denied' using errcode='42501';end if;
 select * into offer from public.investor_offers where id=enrollment.offer_id;
 if action='details' and enrollment.status in ('invited','changes_requested') then
 v_details:=jsonb_build_object('legal_name',trim(payload->>'legal_name'),'entity_type',payload->>'entity_type','phone',trim(payload->>'phone'),'country',upper(trim(payload->>'country')),'address',trim(payload->>'address'),'city',trim(payload->>'city'),'region',trim(payload->>'region'),'postal_code',trim(payload->>'postal_code'));
 if coalesce(length(v_details->>'legal_name'),0) not between 3 and 160 or coalesce(v_details->>'entity_type','') not in ('individual','company') or coalesce(v_details->>'country','') !~ '^[A-Z]{2}$' or coalesce(length(v_details->>'phone'),0) not between 6 and 40 or coalesce(length(v_details->>'address'),0) not between 5 and 200 or coalesce(length(v_details->>'city'),0) not between 2 and 100 or coalesce(length(v_details->>'region'),0)>100 or coalesce(length(v_details->>'postal_code'),0) not between 2 and 30 then raise exception 'Invalid enrollment details';end if;
 update public.investor_enrollments set details=v_details,status='details_submitted',review_note='',updated_at=now() where id=enrollment.id;
 elsif action='accept' and enrollment.status='approved' then
 if payload->>'consent' is distinct from 'yes' or coalesce(length(trim(payload->>'signer_name')),0) not between 3 and 160 then raise exception 'Explicit consent and signer identity required';end if;
 if payload->>'agreement_hash' is distinct from offer.agreement_hash then raise exception 'Agreement has changed';end if;
 terms:=jsonb_build_object('offer_id',offer.id,'version',offer.version,'title',offer.title,'unit_model',offer.unit_model,'quantity',enrollment.quantity,'unit_amount_minor',offer.unit_amount_minor,'total_minor',enrollment.amount_minor,'currency',enrollment.currency,'term_months',offer.term_months,'starts_on','verified_payment','enrollment_details',enrollment.details);
 body:=offer.agreement_text;
 insert into public.agreement_acceptances(enrollment_id,user_id,signer_name,agreement_text,commercial_terms,evidence_hash)
 values(enrollment.id,auth.uid(),trim(payload->>'signer_name'),body,terms,encode(sha256(convert_to(body||E'\n'||terms::text,'UTF8')),'hex'));
 update public.investor_enrollments set status='accepted',updated_at=now() where id=enrollment.id;
 else raise exception 'Invalid transition';end if;return enrollment.id;
 end;
$$;

create or replace function portal_private.enrollment_prepare_checkout(target uuid) returns uuid language plpgsql security definer set search_path='' as $$
 declare enrollment public.investor_enrollments; result uuid;
 begin
 select * into enrollment from public.investor_enrollments where id=target for update;
 if enrollment.id is null or not portal_private.enrollment_owner(target) then raise exception 'Access denied' using errcode='42501';end if;
 if enrollment.status not in ('accepted','payment_pending') or not exists(select 1 from public.agreement_acceptances where enrollment_id=target) then raise exception 'Checkout is not available';end if;
 select id into result from public.enrollment_checkouts where enrollment_id=target and state in ('allocating','open','processing');
 if result is null then insert into public.enrollment_checkouts(enrollment_id,amount_minor,currency) values(target,enrollment.amount_minor,enrollment.currency) returning id into result;end if;
 update public.investor_enrollments set status='payment_pending',updated_at=now() where id=target;
 return result;
 end;
$$;


