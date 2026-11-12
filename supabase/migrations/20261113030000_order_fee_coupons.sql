-- Coupons on the order fee: Stripe promotion codes now apply to the fee as well as the balance, so the whole order
-- can be tested end to end with a high-discount code. The paid amount must still equal the price minus the discount
-- Stripe reports; the order's discount is the sum of the discounts of its paid payments (fee + balance).
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
 if paid is null or paid<0 or discount<0 or paid<>pay.amount_minor-discount then raise exception 'Payment mismatch';end if;
 update public.order_payments set status='paid',payment_intent_id=payload->>'payment_intent_id',paid_minor=paid,discount_minor=discount,promotion=payload->>'promotion',updated_at=now() where id=pay.id;
 if pay.kind='fee' and o.status='awaiting_fee' then
 update public.product_orders set status='placed',placed_at=now(),updated_at=now() where id=o.id;
 elsif pay.kind='balance' and o.status='confirmed' then
 update public.product_orders set status='paid',paid_minor=(select sum(paid_minor) from public.order_payments where order_id=o.id and status='paid'),discount_minor=(select sum(discount_minor) from public.order_payments where order_id=o.id and status='paid'),promotion=coalesce(payload->>'promotion',(select promotion from public.order_payments where order_id=o.id and status='paid' and promotion is not null order by updated_at desc limit 1)),updated_at=now() where id=o.id;
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
