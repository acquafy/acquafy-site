-- P3 · stock: staff-only counts, public availability, reserve on the order fee, release on cancellation.
begin;
do $$declare c uuid:=gen_random_uuid();s uuid:=gen_random_uuid();o uuid;o2 uuid;fee uuid;st uuid;d jsonb;
begin
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data)values
 (c,c||'@test.invalid',now(),'{}','{"signup_kind":"customer"}'),(s,s||'@test.invalid',now(),'{"portal_role":"internal"}','{}');
 insert into public.staff_role_grants(user_id,role)values(s,'admin');
 d:=jsonb_build_object('name','Test Customer','phone','+5511999999999','address','Rua Teste 1, São Paulo - SP, 01000-000, Brasil','state','SP');

 perform set_config('request.jwt.claim.sub',c::text,true);
 begin perform public.stock_command('set',jsonb_build_object('product_id','neo-ultra','color','Azul Petróleo','on_hand',5,'ship_days',3));raise exception 'Customer set stock';exception when raise_exception then if sqlerrm<>'Staff access required' then raise;end if;end;
 perform set_config('request.jwt.claim.sub',s::text,true);
 st:=public.stock_command('set',jsonb_build_object('product_id','neo-ultra','color','Azul Petróleo','on_hand',1,'ship_days',3));
 perform public.stock_command('lead_time',jsonb_build_object('weeks',8));
 if (select made_to_order_weeks from public.order_settings)<>8 then raise exception 'Lead time not set';end if;
 if not exists(select 1 from public.stock_availability() where product_id='neo-ultra' and color='Azul Petróleo' and available and ship_days=3) then raise exception 'Availability missing';end if;

 -- The fee places the order and reserves the unit; the next order of the same colour is made to order.
 perform set_config('request.jwt.claim.sub',c::text,true);
 o:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-ultra','quantity',1,'color','Azul Petróleo')),'delivery',d));
 if exists(select 1 from public.order_stock_reservations where order_id=o) then raise exception 'Reserved before the fee';end if;
 select id into fee from public.order_payments where order_id=o;
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_s1'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_s1','subtotal_minor',12500,'paid_minor',12500,'currency','brl','payment_intent_id','pi_s1'));
 if (select on_hand from public.product_stock where id=st)<>0 or not exists(select 1 from public.order_stock_reservations where order_id=o and stock_id=st and quantity=1) then raise exception 'Unit not reserved';end if;
 if exists(select 1 from public.stock_availability() where product_id='neo-ultra' and color='Azul Petróleo' and available) then raise exception 'Sold-out unit still available';end if;

 o2:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-ultra','quantity',1,'color','Azul Petróleo')),'delivery',d));
 select id into fee from public.order_payments where order_id=o2;
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_s2'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_s2','subtotal_minor',12500,'paid_minor',12500,'currency','brl','payment_intent_id','pi_s2'));
 if exists(select 1 from public.order_stock_reservations where order_id=o2) or (select on_hand from public.product_stock where id=st)<>0 then raise exception 'Oversold';end if;

 -- Cancelling the first order puts the unit back.
 perform public.order_command('cancel',jsonb_build_object('order_id',o));
 if (select on_hand from public.product_stock where id=st)<>1 or exists(select 1 from public.order_stock_reservations where order_id=o) then raise exception 'Unit not released';end if;
 perform set_config('stock_test.customer',c::text,true);
end$$;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('stock_test.customer'),true);
do $$begin
 if exists(select 1 from public.product_stock) then raise exception 'Stock counts visible to customers';end if;
 if not exists(select 1 from public.stock_availability()) then raise exception 'Availability hidden from customers';end if;
end$$;
set local role anon;
do $$begin if not exists(select 1 from public.stock_availability()) then raise exception 'Availability hidden from visitors';end if;end$$;
select 'PASS product_stock';
rollback;
