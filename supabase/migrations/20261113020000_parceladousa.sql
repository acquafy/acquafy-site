-- ParceladoUSA: the balance of a BRL order can be paid in installments on ParceladoUSA's hosted page, as an
-- alternative to Stripe Checkout. Its order id ("pusa_<id>") is bound to the payment exactly like a Stripe session
-- (checkout_id), so order_payment_event checks it the same way.
--
-- Every session or ParceladoUSA order ever bound to a payment is kept, so a late payment on one that was replaced
-- (the customer switched method or opened a new page) is recognised as this payment's and sent to staff review.
create table public.order_payment_attempts(
 ref text primary key,
 payment_id uuid not null references public.order_payments(id),
 -- ParceladoUSA page of the attempt: an open order is reused, never replaced (its API cannot cancel it).
 url text check(url is null or (url like 'https://%' and length(url)<=2000)),
 -- Last status check against ParceladoUSA, so the public callback cannot flood its API.
 checked_at timestamptz,
 created_at timestamptz not null default now()
);
alter table public.order_payment_attempts enable row level security;
revoke all on public.order_payment_attempts from anon,authenticated;
grant all on public.order_payment_attempts to service_role;
-- Sessions bound before this table existed.
insert into public.order_payment_attempts(ref,payment_id) select checkout_id,id from public.order_payments where checkout_id is not null on conflict do nothing;

-- Binds a Stripe Checkout session or a ParceladoUSA order to a payment before the customer is sent to it (server only).
create or replace function public.order_payment_bind(payload jsonb) returns void language plpgsql security invoker set search_path='' as $$
declare pay public.order_payments;
begin
 select * into pay from public.order_payments where id=(payload->>'payment_id')::uuid for update;
 if pay.id is null or pay.status not in ('open','failed') or payload->>'session_id' is null then raise exception 'Payment unavailable';end if;
 -- Compare-and-set: a replacement session binds only over the session the server checked, never over a newer one.
 if pay.checkout_id is distinct from nullif(payload->>'previous_session_id','') then raise exception 'Payment changed';end if;
 update public.order_payments set checkout_id=payload->>'session_id',status='open',updated_at=now() where id=pay.id;
 insert into public.order_payment_attempts(ref,payment_id,url)values(payload->>'session_id',pay.id,nullif(payload->>'url',''));
end;$$;
revoke all on function public.order_payment_bind(jsonb) from public,anon,authenticated;
grant execute on function public.order_payment_bind(jsonb) to service_role;

-- A replaced session or ParceladoUSA order of this payment was paid anyway: the customer may have paid twice, so
-- the payment and the order go to staff review (refund by hand). Server only.
create function public.order_payment_stray(payload jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
declare pay public.order_payments;
begin
 select p.* into pay from public.order_payments p join public.order_payment_attempts a on a.payment_id=p.id
 where p.id=(payload->>'payment_id')::uuid and a.ref=payload->>'ref' for update of p;
 if pay.id is null or pay.checkout_id is not distinct from payload->>'ref' then raise exception 'Unknown payment';end if;
 if pay.status<>'review' then update public.order_payments set status='review',updated_at=now() where id=pay.id;end if;
 update public.product_orders set status='review',updated_at=now() where id=pay.order_id and status<>'cancelled';
 return pay.id;
end;$$;
revoke all on function public.order_payment_stray(jsonb) from public,anon,authenticated;
grant execute on function public.order_payment_stray(jsonb) to service_role;

-- Applies a verified Stripe or ParceladoUSA event to a payment and moves the order (server only).
-- Refunds and disputes now name their charge (payment_intent_id, the ParceladoUSA ref for ParceladoUSA): only the
-- charge recorded on the payment can settle it, so the refund of a replaced attempt never marks the current one refunded.
-- state: paid | failed | refunded | disputed. Paid and failed events must match the bound session, amount and currency.
create or replace function public.order_payment_event(payload jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
declare pay public.order_payments;o public.product_orders;state text:=payload->>'state';paid integer;discount integer;
begin
 select * into pay from public.order_payments where id=(payload->>'payment_id')::uuid for update;
 if pay.id is null then raise exception 'Unknown payment';end if;
 select * into o from public.product_orders where id=pay.order_id for update;
 if state in ('paid','failed') and (pay.checkout_id is distinct from payload->>'session_id' or (payload->>'subtotal_minor')::integer is distinct from pay.amount_minor or payload->>'currency' is distinct from pay.currency) then raise exception 'Payment mismatch';end if;
 if state='paid' then
 if pay.status in ('paid','refunding','refunded','review') then return pay.id;end if;
 paid:=(payload->>'paid_minor')::integer;discount:=coalesce((payload->>'discount_minor')::integer,0);
 if paid is null or paid<0 or discount<0 or paid<>pay.amount_minor-discount or (pay.kind='fee' and discount<>0) then raise exception 'Payment mismatch';end if;
 update public.order_payments set status='paid',payment_intent_id=payload->>'payment_intent_id',paid_minor=paid,discount_minor=discount,promotion=payload->>'promotion',updated_at=now() where id=pay.id;
 if pay.kind='fee' and o.status='awaiting_fee' then
 update public.product_orders set status='placed',placed_at=now(),updated_at=now() where id=o.id;
 elsif pay.kind='balance' and o.status='confirmed' then
 update public.product_orders set status='paid',paid_minor=(select sum(paid_minor) from public.order_payments where order_id=o.id and status='paid'),discount_minor=discount,promotion=payload->>'promotion',updated_at=now() where id=o.id;
 else
 -- Paid after a cancellation or out of order: staff must review and refund.
 update public.order_payments set status='review' where id=pay.id;
 update public.product_orders set status='review',updated_at=now() where id=o.id;
 end if;
 elsif state='failed' then
 if pay.status='open' then update public.order_payments set status='failed',updated_at=now() where id=pay.id;end if;
 elsif state in ('refunded','disputed') and pay.payment_intent_id is distinct from nullif(payload->>'payment_intent_id','') then
 -- A charge that is not the one recorded on this payment (a replaced session or ParceladoUSA order, or one never
 -- recorded): its refund settles nothing here; a dispute goes to staff review.
 if state='disputed' then
 update public.order_payments set status='review',updated_at=now() where id=pay.id;
 if o.status<>'cancelled' then update public.product_orders set status='review',updated_at=now() where id=o.id;end if;
 end if;
 elsif state='refunded' and pay.status='refunded' then
 return pay.id;
 elsif state='refunded' and payload->>'full'='yes' and (pay.status='refunding' or o.status='cancelled') then
 update public.order_payments set status='refunded',updated_at=now() where id=pay.id;
 elsif state in ('refunded','disputed') then
 update public.order_payments set status='review',updated_at=now() where id=pay.id;
 if o.status<>'cancelled' then update public.product_orders set status='review',updated_at=now() where id=o.id;end if;
 else raise exception 'Invalid payment event';end if;
 return pay.id;
end;$$;
revoke all on function public.order_payment_event(jsonb) from public,anon,authenticated;
grant execute on function public.order_payment_event(jsonb) to service_role;
