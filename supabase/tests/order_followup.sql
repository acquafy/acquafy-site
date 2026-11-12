-- P2: address editing before confirmation, installation windows and bookings, and the e-mail outbox.
-- Runs in a transaction and rolls everything back.
begin;
do $$declare c uuid:=gen_random_uuid();u uuid:=gen_random_uuid();s uuid:=gen_random_uuid();o uuid;o2 uuid;fee uuid;bal uuid;w uuid;w2 uuid;full_w uuid;d jsonb;w2_start timestamptz;n integer;
begin
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data)values
 (c,c||'@test.invalid',now(),'{}','{"signup_kind":"customer"}'),(u,u||'@test.invalid',now(),'{}','{"signup_kind":"customer"}'),(s,s||'@test.invalid',now(),'{"portal_role":"internal"}','{}');
 insert into public.staff_role_grants(user_id,role)values(s,'admin');
 d:=jsonb_build_object('name','Test Customer','phone','+5511999999999','address','Rua Teste 1, São Paulo - SP, 01000-000, Brasil','state','SP');

 perform set_config('request.jwt.claim.sub',c::text,true);
 o:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',1)),'delivery',d));

 -- Address: the owner corrects it before confirmation; others cannot.
 perform public.order_delivery_update(jsonb_build_object('order_id',o,'delivery',d||jsonb_build_object('address','Rua Nova 2, São Paulo - SP, 01000-000, Brasil')));
 if (select delivery->>'address' from public.product_orders where id=o)<>'Rua Nova 2, São Paulo - SP, 01000-000, Brasil' then raise exception 'Address not updated';end if;
 perform set_config('request.jwt.claim.sub',u::text,true);
 begin perform public.order_delivery_update(jsonb_build_object('order_id',o,'delivery',d));raise exception 'Foreign address edit';exception when raise_exception then if sqlerrm<>'Delivery locked' then raise;end if;end;

 -- Fee paid → placed (e-mail queued); staff confirm → confirmed (e-mail); balance paid → paid (e-mail).
 select id into fee from public.order_payments where order_id=o and kind='fee';
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_f'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_f','subtotal_minor',12500,'paid_minor',12500,'currency','brl','payment_intent_id','pi_f'));
 perform set_config('request.jwt.claim.sub',s::text,true);
 perform public.order_command('confirm',jsonb_build_object('order_id',o,'delivery_estimate','Até 20/12/2026'));
 perform set_config('request.jwt.claim.sub',c::text,true);
 begin perform public.order_delivery_update(jsonb_build_object('order_id',o,'delivery',d));raise exception 'Address edited after confirmation';exception when raise_exception then if sqlerrm<>'Delivery locked' then raise;end if;end;

 -- Installation windows: staff only; the customer cannot book before paying.
 perform set_config('request.jwt.claim.sub',c::text,true);
 begin perform public.installation_command('publish',jsonb_build_object('region','SP','starts_at',now()+interval '5 days','ends_at',now()+interval '5 days 4 hours','capacity',1));raise exception 'Customer published a window';exception when raise_exception then if sqlerrm<>'Staff access required' then raise;end if;end;
 perform set_config('request.jwt.claim.sub',s::text,true);
 w:=public.installation_command('publish',jsonb_build_object('region','SP','starts_at',now()+interval '5 days','ends_at',now()+interval '5 days 4 hours','capacity',1));
 w2:=public.installation_command('publish',jsonb_build_object('region','SP','starts_at',now()+interval '6 days','ends_at',now()+interval '6 days 4 hours','capacity',2));
 full_w:=public.installation_command('publish',jsonb_build_object('region','RJ','starts_at',now()+interval '5 days','ends_at',now()+interval '5 days 4 hours','capacity',2));
 perform set_config('request.jwt.claim.sub',c::text,true);
 begin perform public.installation_command('book',jsonb_build_object('order_id',o,'window_id',w));raise exception 'Booked before paying';exception when raise_exception then if sqlerrm<>'Booking unavailable' then raise;end if;end;

 select id into bal from public.order_payments where order_id=o and kind='balance';
 perform public.order_payment_bind(jsonb_build_object('payment_id',bal,'session_id','cs_b'));
 perform public.order_payment_event(jsonb_build_object('payment_id',bal,'state','paid','session_id','cs_b','subtotal_minor',187500,'paid_minor',187500,'currency','brl','payment_intent_id','pi_b'));

 -- Booking: only in the order's state; the window must have room; rebooking moves the appointment.
 begin perform public.installation_command('book',jsonb_build_object('order_id',o,'window_id',full_w));raise exception 'Booked in another state';exception when raise_exception then if sqlerrm<>'Window unavailable' then raise;end if;end;
 perform public.installation_command('book',jsonb_build_object('order_id',o,'window_id',w));
 if (select free from public.installation_window_free(array[w])) is distinct from 0 then raise exception 'Capacity not counted';end if;
 perform public.installation_command('book',jsonb_build_object('order_id',o,'window_id',w2));
 if (select window_id from public.installation_bookings where order_id=o)<>w2 or (select free from public.installation_window_free(array[w]))<>1 then raise exception 'Reschedule failed';end if;
 select starts_at into w2_start from public.installation_windows where id=w2;
 -- Within 48 hours of the appointment it can no longer be moved.
 update public.installation_windows set starts_at=now()+interval '1 day',ends_at=now()+interval '1 day 4 hours' where id=w2;
 begin perform public.installation_command('book',jsonb_build_object('order_id',o,'window_id',w));raise exception 'Late reschedule';exception when raise_exception then if sqlerrm<>'Booking locked' then raise;end if;end;

 -- A US address in "PA" (Pennsylvania) never books a Brazilian window in PA (Pará).
 perform set_config('request.jwt.claim.sub',s::text,true);
 perform public.installation_command('publish',jsonb_build_object('region','PA','starts_at',now()+interval '5 days','ends_at',now()+interval '5 days 4 hours','capacity',5));
 perform set_config('request.jwt.claim.sub',c::text,true);
 update public.product_orders set delivery=delivery||jsonb_build_object('country_code','US','state','PA') where id=o;
 begin perform public.installation_command('book',jsonb_build_object('order_id',o,'window_id',(select id from public.installation_windows where region='PA')));raise exception 'US address booked a Brazilian window';exception when raise_exception then if sqlerrm<>'Window unavailable' then raise;end if;end;
 update public.product_orders set delivery=delivery||jsonb_build_object('country_code','BR','state','SP') where id=o;

 -- Another customer cannot book someone else's order.
 perform set_config('request.jwt.claim.sub',u::text,true);
 begin perform public.installation_command('book',jsonb_build_object('order_id',o,'window_id',w));raise exception 'Foreign booking';exception when raise_exception then if sqlerrm<>'Booking unavailable' then raise;end if;end;

 -- Each booking e-mail keeps the appointment it was queued for, even after rescheduling.
 if (select array_agg((payload->'booking'->>'starts_at')::timestamptz order by id) from public.order_notifications where order_id=o and kind='installation_booked')
  <>array[(select starts_at from public.installation_windows where id=w),w2_start] then raise exception 'Booking e-mails lost their appointment';end if;
 if exists(select 1 from public.order_notifications where order_id=o and (payload->>'total_minor')::integer<>200000) then raise exception 'E-mail payload incomplete';end if;

 -- A second paid order takes the last place of w; cancelling it releases the place.
 perform set_config('request.jwt.claim.sub',c::text,true);
 o2:=public.order_command('place',jsonb_build_object('kind','purchase','currency','brl','terms','yes','items',jsonb_build_array(jsonb_build_object('product','neo-up','quantity',1)),'delivery',d));
 select id into fee from public.order_payments where order_id=o2 and kind='fee';
 perform public.order_payment_bind(jsonb_build_object('payment_id',fee,'session_id','cs_f2'));
 perform public.order_payment_event(jsonb_build_object('payment_id',fee,'state','paid','session_id','cs_f2','subtotal_minor',12500,'paid_minor',12500,'currency','brl','payment_intent_id','pi_f2'));
 perform set_config('request.jwt.claim.sub',s::text,true);
 perform public.order_command('confirm',jsonb_build_object('order_id',o2,'delivery_estimate','Até 20/12/2026'));
 select id into bal from public.order_payments where order_id=o2 and kind='balance';
 perform public.order_payment_bind(jsonb_build_object('payment_id',bal,'session_id','cs_b2'));
 perform public.order_payment_event(jsonb_build_object('payment_id',bal,'state','paid','session_id','cs_b2','subtotal_minor',187500,'paid_minor',187500,'currency','brl','payment_intent_id','pi_b2'));
 perform set_config('request.jwt.claim.sub',c::text,true);
 if not exists(select 1 from public.installation_windows_open('sp',12) where id=w) then raise exception 'Open window not offered';end if;
 perform public.installation_command('book',jsonb_build_object('order_id',o2,'window_id',w));
 if exists(select 1 from public.installation_windows_open('SP',12) where id=w) then raise exception 'Full window offered';end if;
 perform public.order_command('cancel',jsonb_build_object('order_id',o2));
 if exists(select 1 from public.installation_bookings where order_id=o2) or (select free from public.installation_window_free(array[w]))<>1 then raise exception 'Cancelled order kept its place';end if;

 -- Staff close w2: no new bookings, but the customer who booked it still sees the appointment (checked below).
 perform set_config('request.jwt.claim.sub',s::text,true);
 perform public.installation_command('close',jsonb_build_object('window_id',w2));

 -- Outbox: one e-mail per step, to the customer.
 if (select array_agg(kind order by id) from public.order_notifications where order_id=o)<>array['placed','confirmed','paid','installation_booked','installation_booked'] then raise exception 'Unexpected e-mails: %',(select array_agg(kind order by id) from public.order_notifications where order_id=o);end if;
 if exists(select 1 from public.order_notifications where order_id=o and to_email<>c||'@test.invalid') then raise exception 'E-mail to the wrong address';end if;
 -- Claim marks a batch as sending and counts the attempt; a second claim does not take the same rows.
 select count(*) into n from public.order_notifications where status='pending';
 if (select count(*) from public.order_notifications_claim(50))<>n or (select count(*) from public.order_notifications_claim(50))<>0 then raise exception 'Claim failed';end if;

 perform set_config('followup_test.customer',c::text,true);perform set_config('followup_test.other',u::text,true);
end$$;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('followup_test.other'),true);
do $$begin
 if exists(select 1 from public.installation_bookings) then raise exception 'Foreign booking visible';end if;
 if (select count(*) from public.installation_windows)<>3 then raise exception 'Closed window visible to other customers';end if;
end$$;
select set_config('request.jwt.claim.sub',current_setting('followup_test.customer'),true);
do $$begin
 if (select count(*) from public.installation_bookings)<>1 then raise exception 'Own booking not visible';end if;
 if not exists(select 1 from public.installation_bookings b join public.installation_windows w on w.id=b.window_id where not w.active) then raise exception 'Closed window of own booking hidden';end if;
 begin perform count(*) from public.order_notifications;raise exception 'Outbox readable';exception when insufficient_privilege then null;end;
 begin perform public.order_notifications_claim(1);raise exception 'Customer claimed e-mails';exception when insufficient_privilege then null;end;
end$$;
select 'PASS order_followup';
rollback;
