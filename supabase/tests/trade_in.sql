-- P3 · trade-in: R$ 100 off the Neo UP balance, declared before confirmation, verified by staff after payment.
begin;
do $$declare c uuid:=gen_random_uuid();u uuid:=gen_random_uuid();s uuid:=gen_random_uuid();o uuid;o2 uuid;fee uuid;bal uuid;d jsonb;
begin
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data)values
 (c,c||'@test.invalid',now(),'{}','{"signup_kind":"customer"}'),(u,u||'@test.invalid',now(),'{}','{"signup_kind":"customer"}'),(s,s||'@test.invalid',now(),'{"portal_role":"internal"}','{}');
 insert into public.staff_role_grants(user_id,role)values(s,'admin');
 d:=jsonb_build_object('name','Test Customer','phone','+5511999999999','address','Rua Teste 1, São Paulo - SP, 01000-000, Brasil','state','SP');

 perform set_config('request.jwt.claim.sub',c::text,true);
 o:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',1)),'delivery',d));
 o2:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-ultra','quantity',1)),'delivery',d));

 -- Only the Neo UP qualifies; only the owner declares; the brand is required.
 begin perform public.order_trade_in('declare',jsonb_build_object('order_id',o2,'brand','Electrolux','years',5));raise exception 'Trade-in on another model';exception when raise_exception then if sqlerrm<>'Trade-in unavailable' then raise;end if;end;
 begin perform public.order_trade_in('declare',jsonb_build_object('order_id',o,'brand','','years',5));raise exception 'Trade-in without brand';exception when raise_exception then if sqlerrm<>'Invalid trade-in' then raise;end if;end;
 perform set_config('request.jwt.claim.sub',u::text,true);
 begin perform public.order_trade_in('declare',jsonb_build_object('order_id',o,'brand','Electrolux','years',5));raise exception 'Foreign trade-in';exception when raise_exception then if sqlerrm<>'Trade-in locked' then raise;end if;end;
 perform set_config('request.jwt.claim.sub',c::text,true);
 perform public.order_trade_in('declare',jsonb_build_object('order_id',o,'brand','Electrolux','model','PE11B','years',5));
 if not exists(select 1 from public.product_orders where id=o and trade_in_minor=10000 and trade_in_status='declared' and trade_in->>'brand'='Electrolux') then raise exception 'Trade-in not declared';end if;

 -- Fee, then confirmation: the balance is R$ 2.000 − R$ 125 − R$ 100.
 select id into fee from public.order_payments where order_id=o and kind='fee';
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_t1'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_t1','subtotal_minor',12500,'paid_minor',12500,'currency','brl','payment_intent_id','pi_t1'));
 perform set_config('request.jwt.claim.sub',s::text,true);
 perform public.order_command('confirm',jsonb_build_object('order_id',o,'delivery_estimate','Até 20/12/2026'));
 select id into bal from public.order_payments where order_id=o and kind='balance';
 if (select amount_minor from public.order_payments where id=bal)<>177500 then raise exception 'Credit not applied: %',(select amount_minor from public.order_payments where id=bal);end if;
 if (select payload->>'trade_in_minor' from public.order_notifications where order_id=o and kind='confirmed')<>'10000' then raise exception 'E-mail without the credit';end if;

 -- After confirmation the customer can no longer change it; staff verify only after payment.
 perform set_config('request.jwt.claim.sub',c::text,true);
 begin perform public.order_trade_in('remove',jsonb_build_object('order_id',o));raise exception 'Trade-in removed after confirmation';exception when raise_exception then if sqlerrm<>'Trade-in locked' then raise;end if;end;
 perform set_config('request.jwt.claim.sub',s::text,true);
 begin perform public.order_trade_in('verify',jsonb_build_object('order_id',o,'result','received'));raise exception 'Verified before payment';exception when raise_exception then if sqlerrm<>'Invalid verification' then raise;end if;end;
 perform public.order_payment_bind(jsonb_build_object('payment_id',bal,'session_id','cs_t2'));
 perform public.order_payment_event(jsonb_build_object('payment_id',bal,'state','paid','session_id','cs_t2','subtotal_minor',177500,'paid_minor',177500,'currency','brl','payment_intent_id','pi_t2'));
 if (select paid_minor from public.product_orders where id=o)<>190000 then raise exception 'Paid total wrong';end if;
 perform set_config('request.jwt.claim.sub',c::text,true);
 begin perform public.order_trade_in('verify',jsonb_build_object('order_id',o,'result','received'));raise exception 'Customer verified own trade-in';exception when raise_exception then if sqlerrm<>'Invalid verification' then raise;end if;end;
 perform set_config('request.jwt.claim.sub',s::text,true);
 begin perform public.order_trade_in('verify',jsonb_build_object('order_id',o));raise exception 'Verified without a result';exception when raise_exception then if sqlerrm<>'Invalid verification' then raise;end if;end;
 if (select trade_in_status from public.product_orders where id=o)<>'declared' then raise exception 'Status lost';end if;
 perform public.order_trade_in('verify',jsonb_build_object('order_id',o,'result','received'));
 if (select trade_in_status from public.product_orders where id=o)<>'received' then raise exception 'Verification not recorded';end if;

 -- A credit that would leave less than the minimum payable balance is refused (fee raised to R$ 1.950).
 update public.order_settings set fee_brl_minor=195000;
 perform set_config('request.jwt.claim.sub',c::text,true);
 o2:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',1)),'delivery',d));
 begin perform public.order_trade_in('declare',jsonb_build_object('order_id',o2,'brand','Electrolux','years',5));raise exception 'Credit beyond the balance';exception when raise_exception then if sqlerrm<>'Trade-in unavailable' then raise;end if;end;
 update public.order_settings set fee_brl_minor=12500;

 -- Declared, then removed before confirmation: no credit.
 perform set_config('request.jwt.claim.sub',c::text,true);
 o:=public.order_command('place',jsonb_build_object('kind','purchase','currency','usd','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',1)),'delivery',d));
 perform public.order_trade_in('declare',jsonb_build_object('order_id',o,'brand','Brastemp','years',3));
 if (select trade_in_minor from public.product_orders where id=o)<>2000 then raise exception 'USD credit wrong';end if;
 perform public.order_trade_in('remove',jsonb_build_object('order_id',o));
 if (select trade_in_minor from public.product_orders where id=o)<>0 or (select trade_in from public.product_orders where id=o) is not null then raise exception 'Trade-in not removed';end if;
end$$;
select 'PASS trade_in';
rollback;
