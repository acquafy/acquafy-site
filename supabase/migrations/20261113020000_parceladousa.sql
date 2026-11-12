-- ParceladoUSA: the balance of a BRL order can be paid in installments on ParceladoUSA's hosted page, as an
-- alternative to Stripe Checkout. Its order id ("pusa_<id>") is bound to the payment exactly like a Stripe session
-- (checkout_id), so order_payment_event checks it the same way.
--
-- Every session or ParceladoUSA order ever bound to a payment is kept, so a late payment on one that was replaced
-- (the customer switched method or opened a new page) is recognised as this payment's and sent to staff review.
create table public.order_payment_attempts(
 ref text primary key,
 payment_id uuid not null references public.order_payments(id),
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
 insert into public.order_payment_attempts(ref,payment_id)values(payload->>'session_id',pay.id);
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
