begin;
do $$ declare staff uuid:=gen_random_uuid(); p uuid:=gen_random_uuid(); other_user uuid:=gen_random_uuid();begin
 perform set_config('enrollment_test.staff',staff::text,true);perform set_config('enrollment_test.partner',p::text,true);perform set_config('enrollment_test.other',other_user::text,true);
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data) values(staff,staff::text||'@test.invalid',now(),'{"portal_role":"internal"}'),(p,p::text||'@test.invalid',now(),'{"portal_role":"partner"}'),(other_user,other_user::text||'@test.invalid',now(),'{"portal_role":"partner"}');
 insert into public.staff_role_grants(user_id,role)values(staff,'admin');end $$;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('enrollment_test.staff'),true);
do $$ declare offer uuid; enrollment uuid;begin
 offer:=public.enrollment_staff('publish',jsonb_build_object('title','Verification offer '||gen_random_uuid(),'version','test-1','agreement_text',repeat('TEST AGREEMENT FOR ROLLBACK VERIFICATION ONLY. ',8),'unit_model','Verification unit','unit_amount_minor',40000,'term_months',36,'min_quantity',1,'max_quantity',10,'approved','yes'));
 perform set_config('enrollment_test.offer',offer::text,true);
 enrollment:=public.enrollment_staff('invite',jsonb_build_object('email',current_setting('enrollment_test.partner')||'@test.invalid','offer_id',offer,'quantity',2,'account_name','Verification investor'));
 perform set_config('enrollment_test.enrollment',enrollment::text,true);
 if (select amount_minor from public.investor_enrollments where id=enrollment)<>80000 then raise exception 'Server pricing failed';end if;
end $$;
select set_config('request.jwt.claim.sub',current_setting('enrollment_test.other'),true);
do $$begin
 if exists(select 1 from public.investor_enrollments) or exists(select 1 from public.agreement_acceptances) or exists(select 1 from public.enrollment_checkouts) then raise exception 'Enrollment privacy failed';end if;
 begin perform public.enrollment_member('details',jsonb_build_object('enrollment_id',current_setting('enrollment_test.enrollment')));raise exception 'Foreign mutation allowed';exception when insufficient_privilege then null;end;
 begin perform public.enrollment_gateway('bind','{}');raise exception 'Public payment confirmation allowed';exception when insufficient_privilege then null;end;
end $$;
select set_config('request.jwt.claim.sub',current_setting('enrollment_test.partner'),true);
do $$declare rejected boolean:=false;begin
 begin perform public.enrollment_prepare_checkout(current_setting('enrollment_test.enrollment')::uuid);exception when raise_exception then rejected:=true;end;if not rejected then raise exception 'Checkout before consent allowed';end if;
 perform public.enrollment_member('details',jsonb_build_object('enrollment_id',current_setting('enrollment_test.enrollment'),'legal_name','Verification Investor','entity_type','individual','phone','+14075550123','country','US','address','123 Verification Way','city','Orlando','region','FL','postal_code','32819','amount_minor',1,'status','active'));
 if (select status from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid)<>'details_submitted' then raise exception 'Client status spoof allowed';end if;
end $$;
select set_config('request.jwt.claim.sub',current_setting('enrollment_test.staff'),true);
select public.enrollment_staff('approve',jsonb_build_object('enrollment_id',current_setting('enrollment_test.enrollment')));
select public.enrollment_staff('withdraw',jsonb_build_object('offer_id',current_setting('enrollment_test.offer')));
select set_config('request.jwt.claim.sub',current_setting('enrollment_test.partner'),true);
do $$declare attempt uuid;rejected boolean:=false;begin
 begin perform public.enrollment_member('accept',jsonb_build_object('enrollment_id',current_setting('enrollment_test.enrollment'),'consent','yes','signer_name','Verification Investor','agreement_hash','tampered'));exception when raise_exception then rejected:=true;end;if not rejected then raise exception 'Unreviewed agreement hash accepted';end if;
 perform public.enrollment_member('accept',jsonb_build_object('enrollment_id',current_setting('enrollment_test.enrollment'),'consent','yes','signer_name','Verification Investor','agreement_hash',(select agreement_hash from public.investor_offers where id=current_setting('enrollment_test.offer')::uuid)));
 if not exists(select 1 from public.agreement_acceptances where enrollment_id=current_setting('enrollment_test.enrollment')::uuid and (commercial_terms->>'total_minor')::int=80000 and length(evidence_hash)=64) then raise exception 'Acceptance evidence missing';end if;
 begin update public.agreement_acceptances set signer_name='Forged';raise exception 'Evidence is editable';exception when insufficient_privilege then null;end;
 attempt:=public.enrollment_prepare_checkout(current_setting('enrollment_test.enrollment')::uuid);
 if attempt<>public.enrollment_prepare_checkout(current_setting('enrollment_test.enrollment')::uuid) then raise exception 'Concurrent checkout allocation not reused';end if;
 perform set_config('enrollment_test.attempt',attempt::text,true);
end $$;
reset role;
set local role service_role;
select set_config('request.jwt.claims','{"role":"service_role"}',true);
do $$declare base jsonb;begin
 base:=jsonb_build_object('attempt_id',current_setting('enrollment_test.attempt'),'session_id','cs_test_'||current_setting('enrollment_test.attempt'),'amount_minor',80000,'currency','usd','livemode',false);
 perform public.enrollment_gateway('bind',base);
 update public.accounts set status='suspended' where id=(select account_id from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid);
 perform public.enrollment_gateway('event',base||jsonb_build_object('event_id','evt_blocked_'||gen_random_uuid(),'event_type','checkout.session.completed','state','paid','payment_intent_id','pi_test_'||current_setting('enrollment_test.attempt'),'paid_at',extract(epoch from now())::bigint));
 if (select status from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid)<>'payment_review' then raise exception 'Blocked account auto-activated';end if;
 if exists(select 1 from public.contracts where account_id=(select account_id from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid)) then raise exception 'Blocked account received contract';end if;
end $$;
reset role;
set local role authenticated;
select set_config('request.jwt.claims','{"role":"authenticated"}',true);
select set_config('request.jwt.claim.sub',current_setting('enrollment_test.staff'),true);
select public.portal_admin('account_status',jsonb_build_object('account_id',(select account_id from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid),'status','active'));
select public.enrollment_staff('review_payment',jsonb_build_object('enrollment_id',current_setting('enrollment_test.enrollment')));
reset role;
set local role service_role;
select set_config('request.jwt.claims','{"role":"service_role"}',true);
do $$declare base jsonb;rejected boolean:=false;begin
 base:=jsonb_build_object('attempt_id',current_setting('enrollment_test.attempt'),'session_id','cs_test_'||current_setting('enrollment_test.attempt'),'amount_minor',80000,'currency','usd','livemode',false);
 perform public.enrollment_gateway('bind',base);
 perform public.enrollment_gateway('event',base||jsonb_build_object('event_id','evt_pending_'||gen_random_uuid(),'event_type','checkout.session.completed','state','processing'));
 if exists(select 1 from public.contracts where account_id=(select account_id from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid)) then raise exception 'Unpaid checkout activated';end if;
 begin perform public.enrollment_gateway('event',base||jsonb_build_object('event_id','evt_wrong_'||gen_random_uuid(),'event_type','checkout.session.completed','state','paid','amount_minor',1));exception when raise_exception then rejected:=true;end;if not rejected then raise exception 'Underpayment accepted';end if;
 base:=base||jsonb_build_object('event_id','evt_paid_'||current_setting('enrollment_test.attempt'),'event_type','checkout.session.async_payment_succeeded','state','paid','payment_intent_id','pi_test_'||current_setting('enrollment_test.attempt'),'paid_at',extract(epoch from now())::bigint);
 perform public.enrollment_gateway('event',base);perform public.enrollment_gateway('event',base);
 if (select status from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid)<>'active' then raise exception 'Verified payment did not activate';end if;
 if (select count(*) from public.contracts where account_id=(select account_id from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid))<>1 then raise exception 'Duplicate webhook created duplicate contract';end if;
 perform public.enrollment_gateway('event',base||jsonb_build_object('event_id','evt_refund_'||gen_random_uuid(),'event_type','charge.refunded','state','refunded'));
 perform public.enrollment_gateway('event',base||jsonb_build_object('event_id','evt_late_paid_'||gen_random_uuid()));
 if (select status from public.investor_enrollments where id=current_setting('enrollment_test.enrollment')::uuid)<>'payment_review' then raise exception 'Out-of-order success overrode refund';end if;
end $$;
reset role;
rollback;
select 'PASS: enrollment privacy, staff review, server pricing, immutable agreement evidence, checkout reuse, server-only gateway, unpaid denial, amount verification, duplicate events, activation, withdrawn-version preservation, suspension/review recovery and sticky refunds' as result;
