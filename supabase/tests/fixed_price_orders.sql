-- Fixed-price orders: server pricing in BRL and USD, order fee, staff confirmation, balance, cancellation and refunds.
-- Runs in a transaction and rolls everything back.
begin;
do $$declare c uuid:=gen_random_uuid();u uuid:=gen_random_uuid();s uuid:=gen_random_uuid();o uuid;o2 uuid;o3 uuid;o4 uuid;fee uuid;bal uuid;l uuid;
begin
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data)values
 (c,c||'@test.invalid',now(),'{}','{"signup_kind":"customer"}'),(u,u||'@test.invalid',now(),'{}','{"signup_kind":"customer"}'),(s,s||'@test.invalid',now(),'{"portal_role":"internal"}','{}');
 insert into public.staff_role_grants(user_id,role)values(s,'admin');

 -- Purchase in BRL: unit price comes from the catalog (US$ 400 × 5), never from the payload.
 perform set_config('request.jwt.claim.sub',c::text,true);
 begin perform public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',2)),'delivery',jsonb_build_object('name','Test Customer','phone','+5511999999999','address','Rua Teste 1, São Paulo, SP, 01000-000, Brasil')));raise exception 'Order placed without terms';exception when raise_exception then if sqlerrm<>'Invalid order' then raise;end if;end;
 o:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',2,'unit_minor',1,'price',1,'color','Branco')),'delivery',jsonb_build_object('name','Test Customer','phone','+5511999999999','address','Rua Teste 1, São Paulo, SP, 01000-000, Brasil')));
 if not exists(select 1 from public.product_orders where id=o and flow='fixed' and currency='brl' and status='awaiting_fee' and total_minor=400000 and fee_minor=12500 and items->0->>'unit_minor'='200000' and items->0->>'color'='Branco' and evidence_hash is not null) then raise exception 'BRL pricing failed';end if;
 select id into fee from public.order_payments where order_id=o and kind='fee' and amount_minor=12500 and currency='brl' and status='open';
 if fee is null then raise exception 'Fee payment missing';end if;

 -- Payment events are checked against the bound session, amount and currency.
 begin perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee','subtotal_minor',12500,'paid_minor',12500,'currency','brl'));raise exception 'Unbound session accepted';exception when raise_exception then if sqlerrm<>'Payment mismatch' then raise;end if;end;
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_fee'));
 begin perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee','subtotal_minor',12500,'paid_minor',12500,'currency','usd'));raise exception 'Currency mismatch accepted';exception when raise_exception then if sqlerrm<>'Payment mismatch' then raise;end if;end;
 begin perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee','subtotal_minor',12500,'paid_minor',2500,'discount_minor',10000,'currency','brl'));raise exception 'Discounted fee accepted';exception when raise_exception then if sqlerrm<>'Payment mismatch' then raise;end if;end;
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee','subtotal_minor',12500,'paid_minor',12500,'currency','brl','payment_intent_id','pi_fee'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee','subtotal_minor',12500,'paid_minor',12500,'currency','brl','payment_intent_id','pi_fee'));
 if not exists(select 1 from public.product_orders where id=o and status='placed' and placed_at is not null) then raise exception 'Fee did not place the order';end if;
 if (select count(*) from public.order_events where order_id=o and status='placed')<>1 then raise exception 'Duplicate event changed the order';end if;

 -- Only staff confirm; confirmation opens the balance (total minus fee).
 begin perform public.order_command('confirm',jsonb_build_object('order_id',o,'delivery_estimate','Até 20/12/2026'));raise exception 'Customer confirmed own order';exception when raise_exception then if sqlerrm<>'Staff access required' then raise;end if;end;
 perform set_config('request.jwt.claim.sub',s::text,true);
 perform public.order_command('confirm',jsonb_build_object('order_id',o,'delivery_estimate','Até 20/12/2026'));
 select id into bal from public.order_payments where order_id=o and kind='balance' and amount_minor=387500 and currency='brl' and status='open';
 if bal is null or not exists(select 1 from public.product_orders where id=o and status='confirmed' and delivery_estimate='Até 20/12/2026') then raise exception 'Confirmation failed';end if;

 -- A replacement session binds only over the session the server saw (compare-and-set).
 begin perform public.order_payment_bind(jsonb_build_object('payment_id',bal,'session_id','cs_bal_x','previous_session_id','cs_other'));raise exception 'Stale bind accepted';exception when raise_exception then if sqlerrm<>'Payment changed' then raise;end if;end;
 -- Balance with a coupon pays the order.
 perform public.order_payment_bind(jsonb_build_object('payment_id',bal,'session_id','cs_bal'));
 perform public.order_payment_event(jsonb_build_object('payment_id',bal,'state','paid','session_id','cs_bal','subtotal_minor',387500,'paid_minor',377500,'discount_minor',10000,'currency','brl','payment_intent_id','pi_bal','promotion','promo_x'));
 if not exists(select 1 from public.product_orders where id=o and status='paid' and paid_minor=390000 and discount_minor=10000) then raise exception 'Balance did not pay the order';end if;
 -- Within the withdrawal period a paid order can still be cancelled: the fee and the balance are both refunded.
 perform set_config('request.jwt.claim.sub',c::text,true);
 perform public.order_command('cancel',jsonb_build_object('order_id',o));
 if (select count(*) from public.order_payments where order_id=o and status='refunding')<>2 then raise exception 'Paid order not refunded';end if;
 -- Once preparation starts the customer can no longer cancel.
 update public.product_orders set status='processing' where id=o;
 begin perform public.order_command('cancel',jsonb_build_object('order_id',o));raise exception 'Order in preparation cancelled';exception when raise_exception then if sqlerrm<>'Cancellation unavailable' then raise;end if;end;

 -- Lease in USD: monthly price from the catalog (10% of US$ 1,000); confirmation creates the lease in the order's currency.
 o2:=public.order_command('place',jsonb_build_object('kind','lease','currency','usd','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-ultra','quantity',1)),'delivery',jsonb_build_object('name','Test Customer','phone','+15551234567','address','123 Test Street, Austin, TX, US')));
 if not exists(select 1 from public.product_orders where id=o2 and total_minor=10000 and fee_minor=2500 and currency='usd') then raise exception 'Lease pricing failed';end if;
 select id into fee from public.order_payments where order_id=o2 and kind='fee';
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_fee2'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee2','subtotal_minor',2500,'paid_minor',2500,'currency','usd','payment_intent_id','pi_fee2'));
 perform set_config('request.jwt.claim.sub',s::text,true);
 perform public.order_command('confirm',jsonb_build_object('order_id',o2,'delivery_estimate','Janeiro de 2027','agreement_text',repeat('APPROVED LEASE TERMS ',10),'share_bps',5000));
 select lease_id into l from public.product_orders where id=o2 and status='confirmed';
 if l is null or not exists(select 1 from public.customer_leases where id=l and monthly_minor=10000 and currency='usd' and status='offered') or exists(select 1 from public.order_payments where order_id=o2 and kind='balance') then raise exception 'Lease confirmation failed';end if;
 -- Receipts and investor revenue take the lease's currency.
 update public.customer_leases set currency='brl' where id=l;
 insert into public.lease_receipts(invoice_id,lease_id,amount_minor,period_start,period_end)values('in_test',l,10000,now(),now()+interval '1 month');
 if (select currency from public.lease_receipts where invoice_id='in_test')<>'brl' then raise exception 'Receipt currency not set';end if;
 delete from public.lease_receipts where invoice_id='in_test';
 update public.customer_leases set currency='usd' where id=l;
 -- After the customer accepts the lease agreement (no monthly charge yet) the order can still be cancelled.
 update public.customer_leases set status='accepted',accepted_at=now(),signer='Test Customer' where id=l;
 if (select status from public.product_orders where id=o2)<>'accepted' then raise exception 'Lease progress not mirrored';end if;
 perform set_config('request.jwt.claim.sub',c::text,true);
 perform public.order_command('cancel',jsonb_build_object('order_id',o2));
 if (select status from public.product_orders where id=o2)<>'cancelled' or (select status from public.customer_leases where id=l)<>'ended' or (select status from public.order_payments where order_id=o2 and kind='fee')<>'refunding' then raise exception 'Accepted lease not cancelled';end if;
 perform set_config('request.jwt.claim.sub',s::text,true);

 -- Cancelling before the fee voids the payment; cancelling within the withdrawal period refunds it.
 perform set_config('request.jwt.claim.sub',c::text,true);
 o3:=public.order_command('place',jsonb_build_object('kind','purchase','currency','usd','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-fit','quantity',1)),'delivery',jsonb_build_object('name','Test Customer','phone','+15551234567','address','123 Test Street, Austin, TX, US')));
 perform set_config('request.jwt.claim.sub',u::text,true);
 begin perform public.order_command('cancel',jsonb_build_object('order_id',o3));raise exception 'Foreign cancellation allowed';exception when raise_exception then if sqlerrm<>'Cancellation unavailable' then raise;end if;end;
 perform set_config('request.jwt.claim.sub',c::text,true);
 perform public.order_command('cancel',jsonb_build_object('order_id',o3));
 if not exists(select 1 from public.product_orders where id=o3 and status='cancelled') or not exists(select 1 from public.order_payments where order_id=o3 and status='void') then raise exception 'Cancellation before fee failed';end if;
 -- A fee paid after the cancellation is held for staff review.
 select id into fee from public.order_payments where order_id=o3;
 update public.order_payments set status='open',checkout_id='cs_late' where id=fee;
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_late','subtotal_minor',2500,'paid_minor',2500,'currency','usd','payment_intent_id','pi_late'));
 if not exists(select 1 from public.product_orders where id=o3 and status='review') then raise exception 'Late fee not reviewed';end if;

 o4:=public.order_command('place',jsonb_build_object('kind','purchase','currency','usd','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-fit','quantity',1)),'delivery',jsonb_build_object('name','Test Customer','phone','+15551234567','address','123 Test Street, Austin, TX, US')));
 select id into fee from public.order_payments where order_id=o4;
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_fee4'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee4','subtotal_minor',2500,'paid_minor',2500,'currency','usd','payment_intent_id','pi_fee4'));
 perform public.order_command('cancel',jsonb_build_object('order_id',o4));
 if not exists(select 1 from public.order_payments where id=fee and status='refunding') then raise exception 'Refund not requested';end if;
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','refunded','full','yes'));
 if not exists(select 1 from public.order_payments where id=fee and status='refunded') or not exists(select 1 from public.product_orders where id=o4 and status='cancelled') then raise exception 'Refund not recorded';end if;
 -- Late or replayed events never undo the recorded refund.
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','refunded','full','yes'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_fee4','subtotal_minor',2500,'paid_minor',2500,'currency','usd','payment_intent_id','pi_fee4'));
 if (select status from public.order_payments where id=fee)<>'refunded' or (select status from public.product_orders where id=o4)<>'cancelled' then raise exception 'Stale event undid the refund';end if;
 -- Outside the withdrawal period the customer cannot cancel a placed order.
 o4:=public.order_command('place',jsonb_build_object('kind','purchase','currency','usd','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-fit','quantity',1)),'delivery',jsonb_build_object('name','Test Customer','phone','+15551234567','address','123 Test Street, Austin, TX, US')));
 update public.product_orders set status='placed',placed_at=now()-interval '8 days' where id=o4;
 begin perform public.order_command('cancel',jsonb_build_object('order_id',o4));raise exception 'Late cancellation allowed';exception when raise_exception then if sqlerrm<>'Cancellation unavailable' then raise;end if;end;

 perform set_config('fixed_test.customer',c::text,true);perform set_config('fixed_test.other',u::text,true);perform set_config('fixed_test.payment',fee::text,true);
end$$;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('fixed_test.other'),true);
do $$begin if exists(select 1 from public.order_payments) then raise exception 'Cross-customer payment exposure';end if;end$$;
select set_config('request.jwt.claim.sub',current_setting('fixed_test.customer'),true);
do $$begin
 if (select count(*) from public.order_payments)<5 then raise exception 'Own payments inaccessible';end if;
 begin perform public.order_payment_event(jsonb_build_object('payment_id',current_setting('fixed_test.payment'),'state','refunded','full','yes'));raise exception 'Customer called the payment event';exception when insufficient_privilege then null;end;
 begin update public.order_payments set status='paid';raise exception 'Customer spoofed payment';exception when insufficient_privilege then null;end;
end$$;
select 'PASS fixed_price_orders';
rollback;
