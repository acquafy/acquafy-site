begin;
do $$declare staff uuid:=gen_random_uuid(); partner uuid:=gen_random_uuid();begin
 perform set_config('registration_test.staff',staff::text,true);perform set_config('registration_test.partner',partner::text,true);
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data)values(staff,staff||'@test.invalid',now(),'{"portal_role":"internal"}'),(partner,partner||'@test.invalid',now(),'{"portal_role":"partner"}');
 insert into public.staff_role_grants(user_id,role)values(staff,'admin');
end$$;
set local role service_role;
select public.submit_investor_application(jsonb_build_object('full_name','Registration test','email',current_setting('registration_test.partner')||'@test.invalid','phone','+15551234567','country','US'));
select public.submit_investor_application(jsonb_build_object('full_name','Duplicate test','email',current_setting('registration_test.partner')||'@test.invalid','phone','+15551234567','country','US'));
do $$begin if(select count(*) from public.investor_applications where email=current_setting('registration_test.partner')||'@test.invalid')<>1 then raise exception 'Duplicate registration';end if;end$$;
reset role;
set local role anon;
do $$begin
 begin perform * from public.investor_applications;raise exception 'Anonymous read allowed';exception when insufficient_privilege then null;end;
 begin perform public.submit_investor_application('{}');raise exception 'Anonymous direct submission allowed';exception when insufficient_privilege then null;end;
end$$;
reset role;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('registration_test.partner'),true);
do $$begin
 if exists(select 1 from public.investor_applications) then raise exception 'Partner read allowed';end if;
 begin perform public.submit_investor_application('{}');raise exception 'Partner direct submission allowed';exception when insufficient_privilege then null;end;
 begin perform public.invite_investor_application(gen_random_uuid(),'{}');raise exception 'Partner invitation allowed';exception when raise_exception then if sqlerrm<>'Forbidden' then raise;end if;end;
end$$;
select set_config('request.jwt.claim.sub',current_setting('registration_test.staff'),true);
do $$declare a uuid; offer uuid; enrollment uuid; rejected boolean:=false;begin
 select id into a from public.investor_applications where email=current_setting('registration_test.partner')||'@test.invalid';
 if a is null then raise exception 'Admin cannot read';end if;
 offer:=public.enrollment_staff('publish',jsonb_build_object('title','Registration test','version',gen_random_uuid(),'agreement_text',repeat('ROLLBACK TEST ONLY. ',10),'unit_model','Test','unit_amount_minor',1000,'term_months',12,'min_quantity',1,'max_quantity',10,'approved','yes'));
 enrollment:=public.invite_investor_application(a,jsonb_build_object('email','spoof@invalid.test','offer_id',offer,'quantity',1,'account_name','Registration test'));
 if not exists(select 1 from public.investor_applications where id=a and enrollment_id=enrollment and invited_at is not null) then raise exception 'Application not linked';end if;
 if not exists(select 1 from public.investor_enrollments where id=enrollment and user_id=current_setting('registration_test.partner')::uuid) then raise exception 'Applicant identity not enforced';end if;
 begin perform public.invite_investor_application(a,'{}');exception when raise_exception then rejected:=true;end;
 if not rejected then raise exception 'Duplicate invitation allowed';end if;
end$$;
rollback;
