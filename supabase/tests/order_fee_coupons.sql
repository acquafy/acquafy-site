-- Coupons on the order fee and the balance: a 99% promotion code on both is recorded, and the order's discount is
-- the sum of both. Runs in a transaction and rolls everything back.
begin;
do $$declare c uuid:=gen_random_uuid();s uuid:=gen_random_uuid();o uuid;fee uuid;bal uuid;total integer;fee_amt integer;bal_amt integer;
begin
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data)values
 (c,c||'@test.invalid',now(),'{}','{"signup_kind":"customer"}'),(s,s||'@test.invalid',now(),'{"portal_role":"internal"}','{}');
 insert into public.staff_role_grants(user_id,role)values(s,'admin');
 perform set_config('request.jwt.claim.sub',c::text,true);
 o:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',1)),
  'delivery',jsonb_build_object('name','Test Customer','phone','+5511999999999','address','Rua Teste 1, São Paulo - SP, 01000-000, Brasil','state','SP','country_code','BR')));
 select id,amount_minor into fee,fee_amt from public.order_payments where order_id=o and kind='fee';
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_fee99'));
 -- 99% off the fee: paid = price - discount.
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee99','subtotal_minor',fee_amt,'paid_minor',fee_amt-(fee_amt*99/100),'discount_minor',fee_amt*99/100,'currency','brl','payment_intent_id','pi_fee99','promotion','promo_test99'));
 if (select status from public.product_orders where id=o)<>'placed' then raise exception 'Discounted fee did not place the order';end if;
 perform set_config('request.jwt.claim.sub',s::text,true);
 perform public.order_command('confirm',jsonb_build_object('order_id',o,'delivery_estimate','Até 20/12/2026'));
 select id,amount_minor into bal,bal_amt from public.order_payments where order_id=o and kind='balance';
 perform public.order_payment_bind(jsonb_build_object('payment_id',bal,'session_id','cs_bal99'));
 perform public.order_payment_event(jsonb_build_object('payment_id',bal,'state','paid','session_id','cs_bal99','subtotal_minor',bal_amt,'paid_minor',bal_amt-(bal_amt*99/100),'discount_minor',bal_amt*99/100,'currency','brl','payment_intent_id','pi_bal99','promotion','promo_test99'));
 if (select status from public.product_orders where id=o)<>'paid' then raise exception 'Discounted balance did not pay the order';end if;
 if (select discount_minor from public.product_orders where id=o)<>fee_amt*99/100+bal_amt*99/100
  or (select paid_minor from public.product_orders where id=o)<>(fee_amt-fee_amt*99/100)+(bal_amt-bal_amt*99/100)
  or (select promotion from public.product_orders where id=o)<>'promo_test99' then raise exception 'Order totals do not add up the two discounts';end if;
end$$;
select 'PASS order_fee_coupons';
rollback;
