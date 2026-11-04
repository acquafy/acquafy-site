-- Stripe coupons / promotion codes on Checkout (orders, leases, investor enrollment).
-- Stored prices stay the pre-discount subtotal that Stripe must match; the amount actually
-- charged, the discount and the applied promotion code (or coupon) are recorded beside it.
alter table public.product_orders
 add column paid_minor integer check(paid_minor>=0),
 add column discount_minor integer not null default 0 check(discount_minor>=0),
 add column promotion text;
alter table public.enrollment_checkouts
 add column paid_minor integer check(paid_minor>=0),
 add column discount_minor integer not null default 0 check(discount_minor>=0),
 add column promotion text;
-- A 100% coupon produces a paid invoice of zero.
alter table public.lease_receipts drop constraint lease_receipts_amount_minor_check;
alter table public.lease_receipts
 add constraint lease_receipts_amount_minor_check check(amount_minor>=0),
 add column subtotal_minor integer,
 add column discount_minor integer not null default 0 check(discount_minor>=0);

-- Investor share is allocated on the amount actually collected after any coupon.
create or replace function public.lease_collect(payload jsonb) returns void language plpgsql security invoker set search_path='' as $$
declare l public.customer_leases;n integer;total bigint;paid integer;subtotal integer;
begin
 select * into l from public.customer_leases where subscription_id=payload->>'subscription_id' for update;
 if l.id is null then raise exception 'Subscription binding pending';end if;
 paid:=(payload->>'amount_minor')::integer;subtotal:=coalesce((payload->>'subtotal_minor')::integer,paid);
 if subtotal<>l.monthly_minor then raise exception 'Invoice amount mismatch';end if;
 if paid is null or paid<0 or paid>subtotal or coalesce((payload->>'discount_minor')::integer,0)<>subtotal-paid then raise exception 'Invoice discount mismatch';end if;
 select count(*) into n from public.lease_units where lease_id=l.id;
 if n=0 then raise exception 'No assigned units';end if;
 insert into public.lease_receipts(invoice_id,lease_id,amount_minor,subtotal_minor,discount_minor,period_start,period_end)values(payload->>'invoice_id',l.id,paid,subtotal,subtotal-paid,to_timestamp((payload->>'period_start')::bigint),to_timestamp((payload->>'period_end')::bigint))on conflict do nothing;
 if not found then return;end if;
 total:=paid::bigint*l.share_bps/10000;
 insert into public.lease_revenue(invoice_id,purifier_id,investor_account_id,amount_minor,state)
 select payload->>'invoice_id',p.id,p.account_id,(total/n+case when row_number() over(order by p.id)<=total%n then 1 else 0 end)::integer,case when l.status='review' then 'review' when l.installed_at is null then 'pending_install' else 'accrued' end from public.lease_units u join public.purifiers p on p.id=u.purifier_id where u.lease_id=l.id;
 update public.customer_leases set status=case when status in ('review','ended') then status else 'active' end where id=l.id;
end;$$;
revoke all on function public.lease_collect(jsonb) from public,anon,authenticated;
grant execute on function public.lease_collect(jsonb) to service_role;

-- Enrollment: validate the discount and record the amount actually invested.
create or replace function portal_private.enrollment_gateway(operation text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
 declare attempt public.enrollment_checkouts; enrollment public.investor_enrollments; offer public.investor_offers; new_contract uuid; event_state text; event_id text; paid_on date; paid integer; discount integer;
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
 -- amount_minor is the pre-discount subtotal; a Stripe promotion code may lower what was charged.
 discount:=coalesce((payload->>'discount_minor')::integer,0);paid:=coalesce((payload->>'paid_minor')::integer,attempt.amount_minor);
 if discount<0 or paid<0 or paid<>attempt.amount_minor-discount then raise exception 'Discount mismatch';end if;
 insert into public.stripe_events(event_id,event_type,object_id) values(event_id,payload->>'event_type',payload->>'session_id') on conflict do nothing;
 if not found then return enrollment.id;end if;
 -- Payment risk is sticky: an old success event cannot reverse a refund/dispute.
 if attempt.state in ('refunded','disputed') and event_state not in ('refunded','disputed') then return enrollment.id;end if;
 if event_state='paid' then
 if payload->>'payment_intent_id' is null and paid>0 then raise exception 'Missing payment reference';end if;
 paid_on:=(to_timestamp((payload->>'paid_at')::bigint) at time zone 'UTC')::date;
 if paid_on is null then raise exception 'Missing payment timestamp';end if;
 select * into offer from public.investor_offers where id=enrollment.offer_id;
 if not exists(select 1 from public.accounts a join public.account_memberships m on m.account_id=a.id join auth.users u on u.id=m.user_id
 where a.id=enrollment.account_id and a.status='active' and m.user_id=enrollment.user_id and m.active and m.role='owner' and u.email_confirmed_at is not null and u.raw_app_meta_data->>'portal_role' in ('internal','partner') and (u.banned_until is null or u.banned_until<now())) then
 update public.enrollment_checkouts set state='paid',stripe_payment_intent_id=payload->>'payment_intent_id',paid_minor=paid,discount_minor=discount,promotion=payload->>'promotion',updated_at=now() where id=attempt.id;
 update public.investor_enrollments set status='payment_review',review_note='Pagamento recebido durante bloqueio de acesso. A equipe deve revisar a ativação.',updated_at=now() where id=enrollment.id;
 return enrollment.id;
 end if;
 if exists(select 1 from public.enrollment_checkouts where enrollment_id=enrollment.id and id<>attempt.id and state='paid') then
 update public.enrollment_checkouts set state='paid',stripe_payment_intent_id=payload->>'payment_intent_id',paid_minor=paid,discount_minor=discount,promotion=payload->>'promotion',updated_at=now() where id=attempt.id;
 update public.investor_enrollments set status='payment_review',review_note='Mais de um pagamento recebido. A equipe deve revisar antes de prosseguir.',updated_at=now() where id=enrollment.id;
 return enrollment.id;
 end if;
 if enrollment.contract_id is null then
 if enrollment.status not in ('accepted','payment_pending') or not exists(select 1 from public.agreement_acceptances where enrollment_id=enrollment.id) then raise exception 'Enrollment is not accepted';end if;
 insert into public.contracts(account_id,number,title,status,starts_on,ends_on,invested_amount)
 values(enrollment.account_id,'ENR-'||enrollment.id::text,offer.title,'active',paid_on,(paid_on+(offer.term_months||' months')::interval-interval '1 day')::date,paid::numeric/100) returning id into new_contract;
 update public.investor_enrollments set status='active',contract_id=new_contract,updated_at=now() where id=enrollment.id;
 else
 update public.investor_enrollments set status='active',updated_at=now() where id=enrollment.id and status in ('accepted','payment_pending');
 end if;
 update public.enrollment_checkouts set state='paid',stripe_payment_intent_id=payload->>'payment_intent_id',paid_minor=paid,discount_minor=discount,promotion=payload->>'promotion',updated_at=now() where id=attempt.id;
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
