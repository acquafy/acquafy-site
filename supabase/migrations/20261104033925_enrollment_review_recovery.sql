-- Controlled staff recovery after payment review; recorded contracts are not duplicated.
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
 else
 update public.investor_enrollments set status='active',updated_at=now() where id=enrollment.id and status in ('accepted','payment_pending');
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
create or replace function portal_private.enrollment_staff(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
 declare result uuid; offer public.investor_offers; enrollment public.investor_enrollments; target_user uuid; account uuid; qty integer;
 begin
 if not portal_private.staff('admin') then raise exception 'Administrator access required' using errcode='42501';end if;
 if action='publish' then
 if (payload->>'approved') is distinct from 'yes' then raise exception 'Approval of the legal and commercial terms is required';end if;
 insert into public.investor_offers(title,version,agreement_text,agreement_hash,unit_model,unit_amount_minor,term_months,min_quantity,max_quantity,published_by)
 values(trim(payload->>'title'),trim(payload->>'version'),trim(payload->>'agreement_text'),encode(sha256(convert_to(trim(payload->>'agreement_text'),'UTF8')),'hex'),trim(payload->>'unit_model'),(payload->>'unit_amount_minor')::integer,(payload->>'term_months')::integer,(payload->>'min_quantity')::integer,(payload->>'max_quantity')::integer,auth.uid()) returning id into result;
 elsif action='withdraw' then
 update public.investor_offers set enabled=false where id=(payload->>'offer_id')::uuid returning id into result;
 elsif action='invite' then
 select * into offer from public.investor_offers where id=(payload->>'offer_id')::uuid and enabled for share;
 qty:=(payload->>'quantity')::integer;
 if offer.id is null or qty<offer.min_quantity or qty>offer.max_quantity or qty::bigint*offer.unit_amount_minor>99999999 then raise exception 'Invalid offer or quantity';end if;
 select id into target_user from auth.users where lower(email)=lower(trim(payload->>'email')) and raw_app_meta_data->>'portal_role' in ('partner','internal');
 if target_user is null then raise exception 'Prepare the Auth identity before creating an invitation';end if;
 -- New enrollments get their own account unless a verified existing account is explicitly chosen.
 account:=nullif(payload->>'account_id','')::uuid;
 if account is null then insert into public.accounts(name) values(trim(payload->>'account_name')) returning id into account;
 elsif not exists(select 1 from public.accounts where id=account and status='active') then raise exception 'Account unavailable';end if;
 insert into public.account_memberships(account_id,user_id,role) values(account,target_user,'owner') on conflict(account_id,user_id) do update set active=true,role='owner';
 insert into public.investor_enrollments(account_id,user_id,offer_id,quantity,amount_minor) values(account,target_user,offer.id,qty,qty*offer.unit_amount_minor) returning id into result;
 else
 select * into enrollment from public.investor_enrollments where id=(payload->>'enrollment_id')::uuid for update;
 if enrollment.id is null then raise exception 'Enrollment not found';end if;
 if action='approve' and enrollment.status='details_submitted' then
 update public.investor_enrollments set status='approved',reviewed_by=auth.uid(),reviewed_at=now(),review_note='',updated_at=now() where id=enrollment.id;
 elsif action='request_changes' and enrollment.status='details_submitted' and length(trim(payload->>'note')) between 3 and 1000 then
 update public.investor_enrollments set status='changes_requested',review_note=trim(payload->>'note'),updated_at=now() where id=enrollment.id;
 elsif action='review_payment' and enrollment.status='payment_review'
 and exists(select 1 from public.enrollment_checkouts where enrollment_id=enrollment.id and state='paid')
 and not exists(select 1 from public.enrollment_checkouts where enrollment_id=enrollment.id and state in ('refunded','disputed'))
 and exists(select 1 from public.accounts a join public.account_memberships m on m.account_id=a.id where a.id=enrollment.account_id and a.status='active' and m.user_id=enrollment.user_id and m.active and m.role='owner') then
 update public.investor_enrollments set status='accepted',review_note='',reviewed_by=auth.uid(),reviewed_at=now(),updated_at=now() where id=enrollment.id;
 elsif action='cancel' and enrollment.status in ('invited','changes_requested','details_submitted','approved','accepted') and not exists(select 1 from public.enrollment_checkouts where enrollment_id=enrollment.id) then
 update public.investor_enrollments set status='cancelled',updated_at=now() where id=enrollment.id;
 else raise exception 'Invalid transition';end if;
 result:=enrollment.id;
 end if;
 if result is null then raise exception 'Record not found';end if;return result;
 end;
$$;

