-- Investor onboarding: immutable published offers, consent evidence, and verified payment activation.
create table public.investor_offers (
 id uuid primary key default gen_random_uuid(), title text not null check(length(trim(title)) between 3 and 160),
 version text not null check(length(version) between 1 and 60), agreement_text text not null check(length(trim(agreement_text)) between 100 and 100000),
 agreement_hash text not null,
 unit_model text not null check(length(unit_model) between 2 and 100), unit_amount_minor integer not null check(unit_amount_minor between 50 and 99999999),
 currency text not null default 'usd' check(currency='usd'), term_months integer not null check(term_months between 1 and 120),
 min_quantity integer not null default 1 check(min_quantity between 1 and 1000), max_quantity integer not null default 100 check(max_quantity between 1 and 1000),
 enabled boolean not null default true, published_by uuid not null references auth.users(id), published_at timestamptz not null default now(),
 unique(title,version), check(max_quantity>=min_quantity)
);
create table public.investor_enrollments (
 id uuid primary key default gen_random_uuid(), account_id uuid not null references public.accounts(id), user_id uuid not null references auth.users(id),
 offer_id uuid not null references public.investor_offers(id), quantity integer not null check(quantity between 1 and 1000),
 amount_minor integer not null check(amount_minor between 50 and 99999999), currency text not null default 'usd' check(currency='usd'),
 status text not null default 'invited' check(status in ('invited','details_submitted','changes_requested','approved','accepted','payment_pending','active','payment_review','cancelled')),
 details jsonb not null default '{}', review_note text not null default '', reviewed_by uuid references auth.users(id), reviewed_at timestamptz,
 contract_id uuid unique references public.contracts(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index enrollment_user on public.investor_enrollments(user_id,created_at desc);
create index enrollment_account on public.investor_enrollments(account_id);
create table public.agreement_acceptances (
 id uuid primary key default gen_random_uuid(), enrollment_id uuid not null unique references public.investor_enrollments(id),
 user_id uuid not null references auth.users(id), signer_name text not null check(length(trim(signer_name)) between 3 and 160),
 agreement_text text not null, commercial_terms jsonb not null, evidence_hash text not null,
 accepted_at timestamptz not null default now()
);
create table public.enrollment_checkouts (
 id uuid primary key default gen_random_uuid(), enrollment_id uuid not null references public.investor_enrollments(id),
 stripe_session_id text unique, stripe_payment_intent_id text unique, amount_minor integer not null, currency text not null,
 state text not null default 'allocating' check(state in ('allocating','open','processing','paid','expired','failed','refunded','disputed')),
 livemode boolean, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index checkout_single_pending on public.enrollment_checkouts(enrollment_id) where state in ('allocating','open','processing');
create index checkout_enrollment on public.enrollment_checkouts(enrollment_id);
create table public.stripe_events (
 event_id text primary key, event_type text not null, object_id text not null, processed_at timestamptz not null default now()
);

create function portal_private.enrollment_owner(target uuid) returns boolean language sql stable security definer set search_path='' as $$
 select portal_private.approved() and exists(select 1 from public.investor_enrollments e join public.account_memberships m on m.account_id=e.account_id
 join public.accounts a on a.id=e.account_id where e.id=target and e.user_id=auth.uid() and m.user_id=auth.uid() and m.role='owner' and m.active and a.status='active');
$$;
revoke all on function portal_private.enrollment_owner(uuid) from public;
grant execute on function portal_private.enrollment_owner(uuid) to authenticated;
do $$ declare t text;begin
 foreach t in array array['investor_offers','investor_enrollments','agreement_acceptances','enrollment_checkouts','stripe_events'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('revoke all on public.%I from anon,authenticated',t);
 execute format('grant select on public.%I to authenticated',t);
 end loop;
end $$;
create policy offers_read on public.investor_offers for select to authenticated using(portal_private.staff('admin') or (portal_private.approved() and (enabled or exists(select 1 from public.investor_enrollments e where e.offer_id=investor_offers.id and e.user_id=auth.uid()))));
create policy enrollments_read on public.investor_enrollments for select to authenticated using(portal_private.staff('admin') or portal_private.enrollment_owner(id));
create policy acceptance_read on public.agreement_acceptances for select to authenticated using(portal_private.staff('admin') or portal_private.enrollment_owner(enrollment_id));
create policy checkouts_read on public.enrollment_checkouts for select to authenticated using(portal_private.staff('admin') or portal_private.enrollment_owner(enrollment_id));
create policy stripe_events_read on public.stripe_events for select to authenticated using(portal_private.staff('admin'));

do $$ declare t text;begin
 foreach t in array array['investor_offers','investor_enrollments','agreement_acceptances','enrollment_checkouts'] loop
 execute format('create trigger audit_enrollment after insert or update on public.%I for each row execute function portal_private.audit_change()',t);
 end loop;
end $$;

create function portal_private.enrollment_staff(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
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
 elsif action='cancel' and enrollment.status in ('invited','changes_requested','details_submitted','approved','accepted') and not exists(select 1 from public.enrollment_checkouts where enrollment_id=enrollment.id) then
 update public.investor_enrollments set status='cancelled',updated_at=now() where id=enrollment.id;
 else raise exception 'Invalid transition';end if;
 result:=enrollment.id;
 end if;
 if result is null then raise exception 'Record not found';end if;return result;
 end;
$$;

create function portal_private.enrollment_member(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
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
 if not offer.enabled or payload->>'consent' is distinct from 'yes' or coalesce(length(trim(payload->>'signer_name')),0) not between 3 and 160 then raise exception 'Explicit consent and signer identity required';end if;
 if payload->>'agreement_hash' is distinct from offer.agreement_hash then raise exception 'Agreement has changed';end if;
 terms:=jsonb_build_object('offer_id',offer.id,'version',offer.version,'title',offer.title,'unit_model',offer.unit_model,'quantity',enrollment.quantity,'unit_amount_minor',offer.unit_amount_minor,'total_minor',enrollment.amount_minor,'currency',enrollment.currency,'term_months',offer.term_months,'starts_on','verified_payment','enrollment_details',enrollment.details);
 body:=offer.agreement_text;
 insert into public.agreement_acceptances(enrollment_id,user_id,signer_name,agreement_text,commercial_terms,evidence_hash)
 values(enrollment.id,auth.uid(),trim(payload->>'signer_name'),body,terms,encode(sha256(convert_to(body||E'\n'||terms::text,'UTF8')),'hex'));
 update public.investor_enrollments set status='accepted',updated_at=now() where id=enrollment.id;
 else raise exception 'Invalid transition';end if;return enrollment.id;
 end;
$$;

create function portal_private.enrollment_prepare_checkout(target uuid) returns uuid language plpgsql security definer set search_path='' as $$
 declare enrollment public.investor_enrollments; result uuid;
 begin
 select * into enrollment from public.investor_enrollments where id=target for update;
 if enrollment.id is null or not portal_private.enrollment_owner(target) then raise exception 'Access denied' using errcode='42501';end if;
 if enrollment.status not in ('accepted','payment_pending') or not exists(select 1 from public.agreement_acceptances where enrollment_id=target) or not exists(select 1 from public.investor_offers where id=enrollment.offer_id and enabled) then raise exception 'Checkout is not available';end if;
 select id into result from public.enrollment_checkouts where enrollment_id=target and state in ('allocating','open','processing');
 if result is null then insert into public.enrollment_checkouts(enrollment_id,amount_minor,currency) values(target,enrollment.amount_minor,enrollment.currency) returning id into result;end if;
 update public.investor_enrollments set status='payment_pending',updated_at=now() where id=target;
 return result;
 end;
$$;

create function public.enrollment_staff(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.enrollment_staff(action,payload);$$;
create function public.enrollment_member(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.enrollment_member(action,payload);$$;
create function public.enrollment_prepare_checkout(target uuid) returns uuid language sql security invoker set search_path='' as $$select portal_private.enrollment_prepare_checkout(target);$$;
revoke all on function portal_private.enrollment_staff(text,jsonb),portal_private.enrollment_member(text,jsonb),portal_private.enrollment_prepare_checkout(uuid),public.enrollment_staff(text,jsonb),public.enrollment_member(text,jsonb),public.enrollment_prepare_checkout(uuid) from public,anon;
grant execute on function portal_private.enrollment_staff(text,jsonb),portal_private.enrollment_member(text,jsonb),portal_private.enrollment_prepare_checkout(uuid),public.enrollment_staff(text,jsonb),public.enrollment_member(text,jsonb),public.enrollment_prepare_checkout(uuid) to authenticated;

-- Only the trusted server may bind Stripe sessions or apply signature-verified events.
create function portal_private.enrollment_gateway(operation text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
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
create function public.enrollment_gateway(operation text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.enrollment_gateway(operation,payload);$$;
revoke all on function portal_private.enrollment_gateway(text,jsonb),public.enrollment_gateway(text,jsonb) from public,anon,authenticated;
grant usage on schema portal_private to service_role;
grant execute on function portal_private.enrollment_gateway(text,jsonb),public.enrollment_gateway(text,jsonb) to service_role;

create function portal_private.enrollment_lookup_user(email_address text) returns uuid language plpgsql stable security definer set search_path='' as $$
 declare result uuid;begin
 if not portal_private.staff('admin') then raise exception 'Administrator access required' using errcode='42501';end if;
 select id into result from auth.users where lower(email)=lower(trim(email_address));return result;
 end;
$$;
create function public.enrollment_lookup_user(email_address text) returns uuid language sql security invoker set search_path='' as $$select portal_private.enrollment_lookup_user(email_address);$$;
revoke all on function public.enrollment_lookup_user(text),portal_private.enrollment_lookup_user(text) from public,anon;
grant execute on function public.enrollment_lookup_user(text),portal_private.enrollment_lookup_user(text) to authenticated;
