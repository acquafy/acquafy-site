-- ParceladoUSA: every bound session/order is kept per payment; a payment on a replaced one goes to staff review.
-- Runs in a transaction and rolls everything back.
begin;
do $$declare c uuid:=gen_random_uuid();o uuid;fee uuid;bal uuid;d jsonb;
begin
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data)values(c,c||'@test.invalid',now(),'{}','{"signup_kind":"customer"}');
 d:=jsonb_build_object('name','Test Customer','phone','+5511999999999','address','Rua Teste 1, São Paulo - SP, 01000-000, Brasil','state','SP','country_code','BR');
 perform set_config('request.jwt.claim.sub',c::text,true);
 o:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',1)),'delivery',d));
 select id into fee from public.order_payments where order_id=o and kind='fee';

 -- Each bind is recorded; the compare-and-set still holds.
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_a'));
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','pusa_1','previous_session_id','cs_a'));
 if (select array_agg(ref order by ref) from public.order_payment_attempts where payment_id=fee)<>array['cs_a','pusa_1'] then raise exception 'Attempts not recorded';end if;
 begin perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','pusa_2','previous_session_id','cs_a'));raise exception 'Stale bind accepted';exception when raise_exception then if sqlerrm<>'Payment changed' then raise;end if;end;

 -- A ParceladoUSA order is paid exactly like a Stripe session, checked against the bound ref.
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','pusa_1','subtotal_minor',12500,'paid_minor',12500,'discount_minor',0,'currency','brl','payment_intent_id','pusa_1'));
 if (select status from public.product_orders where id=o)<>'placed' then raise exception 'ParceladoUSA payment not recorded';end if;

 -- Stray: only a replaced attempt of the same payment; never the bound one or an unknown ref.
 begin perform public.order_payment_stray(jsonb_build_object('payment_id',fee,'ref','pusa_1'));raise exception 'Bound ref treated as stray';exception when raise_exception then if sqlerrm<>'Unknown payment' then raise;end if;end;
 begin perform public.order_payment_stray(jsonb_build_object('payment_id',fee,'ref','pusa_999'));raise exception 'Unknown ref accepted';exception when raise_exception then if sqlerrm<>'Unknown payment' then raise;end if;end;
 perform public.order_payment_stray(jsonb_build_object('payment_id',fee,'ref','cs_a'));
 if (select status from public.order_payments where id=fee)<>'review' or (select status from public.product_orders where id=o)<>'review' then raise exception 'Stray payment not sent to review';end if;
end$$;
-- Customers cannot read the attempts or call the server functions.
set local role authenticated;
do $$begin
 begin perform count(*) from public.order_payment_attempts;raise exception 'Attempts readable';exception when insufficient_privilege then null;end;
 begin perform public.order_payment_stray('{}');raise exception 'Customer called stray';exception when insufficient_privilege then null;end;
end$$;
select 'PASS parceladousa';
rollback;
