-- Transactional authorization and workflow regression suite; leaves no test users or records.
begin;
do $$
declare a uuid:=gen_random_uuid(); b uuid:=gen_random_uuid(); ua uuid:=gen_random_uuid(); ub uuid:=gen_random_uuid(); sa uuid:=gen_random_uuid(); ad uuid:=gen_random_uuid(); ca uuid:=gen_random_uuid(); cb uuid:=gen_random_uuid(); ta uuid:=gen_random_uuid(); tb uuid:=gen_random_uuid();
begin
 perform set_config('portal_test.a',a::text,true);perform set_config('portal_test.b',b::text,true);
 perform set_config('portal_test.ua',ua::text,true);perform set_config('portal_test.ub',ub::text,true);
 perform set_config('portal_test.support',sa::text,true);perform set_config('portal_test.admin',ad::text,true);
 perform set_config('portal_test.ca',ca::text,true);perform set_config('portal_test.cb',cb::text,true);
 perform set_config('portal_test.ta',ta::text,true);perform set_config('portal_test.tb',tb::text,true);
 insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data) values
 (ua,ua::text||'@test.invalid',now(),'{"portal_role":"partner"}'),(ub,ub::text||'@test.invalid',now(),'{"portal_role":"partner"}'),
 (sa,sa::text||'@test.invalid',now(),'{"portal_role":"internal"}'),(ad,ad::text||'@test.invalid',now(),'{"portal_role":"internal"}');
 insert into public.staff_role_grants(user_id,role) values(sa,'support'),(ad,'admin');
 insert into public.accounts(id,name) values(a,'Isolation A'),(b,'Isolation B');
 insert into public.account_memberships(account_id,user_id,role) values(a,ua,'owner'),(b,ub,'viewer');
 insert into public.contracts(id,account_id,number,title,status,starts_on,ends_on,invested_amount)
 values(ca,a,ca::text,'A contract','active','2026-01-01','2027-01-01',100),(cb,b,cb::text,'B contract','active','2026-01-01','2027-01-01',200);
 insert into public.purifiers(account_id,contract_id,serial,model,status) values(a,ca,ca::text,'Neo','operation'),(b,cb,cb::text,'Neo','available');
 insert into public.payouts(account_id,contract_id,period_start,period_end,due_on,amount,status)
 values(a,ca,'2026-01-01','2026-01-31','2026-02-01',10,'scheduled'),(b,cb,'2026-01-01','2026-01-31','2026-02-01',20,'scheduled');
 insert into public.documents(account_id,title,object_path,filename,mime_type,size_bytes)
 values(a,'A document',a::text||'/test.pdf','a.pdf','application/pdf',10),(b,'B document',b::text||'/test.pdf','b.pdf','application/pdf',10);
 insert into storage.objects(bucket_id,name) values('portal-documents',a::text||'/test.pdf'),('portal-documents',b::text||'/test.pdf');
 insert into public.support_tickets(id,account_id,created_by,subject) values(ta,a,ua,'A ticket'),(tb,b,ub,'B ticket');
 insert into public.support_messages(ticket_id,author_id,from_staff,body) values(ta,ua,false,'Private A'),(tb,ub,false,'Private B');
end $$;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('portal_test.ua'),true);
do $$ declare result uuid; n integer; summary jsonb;
begin
 if (select count(*) from public.accounts)<>1 or (select count(*) from public.contracts)<>1 or (select count(*) from public.purifiers)<>1 or (select count(*) from public.payouts)<>1 or (select count(*) from public.documents)<>1 or (select count(*) from public.support_tickets)<>1 or (select count(*) from public.support_messages)<>1 then raise exception 'Account isolation failed';end if;
 if (select count(*) from storage.objects where bucket_id='portal-documents')<>1 then raise exception 'Storage isolation failed';end if;
 if exists(select 1 from public.audit_events) then raise exception 'Partner can read audit';end if;
 summary:=public.portal_summary(current_setting('portal_test.a')::uuid);
 if (summary->>'settled')::numeric<>0 or (summary->>'scheduled')::numeric<>10 then raise exception 'Past due incorrectly settled';end if;
 begin perform public.portal_summary(current_setting('portal_test.b')::uuid);raise exception 'Foreign summary allowed';exception when insufficient_privilege then null;end;
 begin perform public.portal_admin('account','{"name":"Forbidden"}');raise exception 'Partner admin allowed';exception when insufficient_privilege then null;end;
 begin update public.contracts set invested_amount=999;raise exception 'Direct business mutation allowed';exception when insufficient_privilege then null;end;
 begin insert into public.staff_role_grants(user_id,role) values(auth.uid(),'admin');raise exception 'Privilege escalation allowed';exception when insufficient_privilege then null;end;
 begin perform public.portal_ticket('create',jsonb_build_object('account_id',current_setting('portal_test.b'),'subject','Foreign','body','No'));raise exception 'Foreign ticket allowed';exception when insufficient_privilege then null;end;
 begin perform public.portal_ticket('reply',jsonb_build_object('ticket_id',current_setting('portal_test.tb'),'body','No'));raise exception 'Foreign reply allowed';exception when insufficient_privilege then null;end;
 begin perform public.portal_ticket('status',jsonb_build_object('ticket_id',current_setting('portal_test.ta'),'status','resolved'));raise exception 'Partner staff action allowed';exception when insufficient_privilege then null;end;
 result:=public.portal_ticket('create',jsonb_build_object('account_id',current_setting('portal_test.a'),'subject','Real support request','body','A persisted message','from_staff',true));
 if not exists(select 1 from public.support_messages where ticket_id=result and author_id=auth.uid() and not from_staff) then raise exception 'Actor spoofing or missing message';end if;
end $$;
select set_config('request.jwt.claim.sub',current_setting('portal_test.support'),true);
do $$ begin
 if exists(select 1 from public.contracts) or exists(select 1 from public.payouts) or exists(select 1 from public.documents) then raise exception 'Support can read unassigned financial records';end if;
 if (select count(*) from public.support_tickets)<3 then raise exception 'Staff queue missing tickets';end if;
 perform public.portal_ticket('reply',jsonb_build_object('ticket_id',current_setting('portal_test.ta'),'body','Team response'));
 perform public.portal_ticket('status',jsonb_build_object('ticket_id',current_setting('portal_test.ta'),'status','resolved'));
 if not exists(select 1 from public.support_tickets where id=current_setting('portal_test.ta')::uuid and assigned_to=auth.uid() and status='resolved') then raise exception 'Staff workflow failed';end if;
 begin perform public.portal_admin('account','{"name":"No"}');raise exception 'Support admin allowed';exception when insufficient_privilege then null;end;
end $$;
select set_config('request.jwt.claim.sub',current_setting('portal_test.admin'),true);
do $$ declare result uuid;
begin
 result:=public.portal_admin('account','{"name":"Created through staff RPC"}');
 if not exists(select 1 from public.accounts where id=result) then raise exception 'Admin create failed';end if;
 begin perform public.portal_admin('purifier',jsonb_build_object('account_id',current_setting('portal_test.a'),'contract_id',current_setting('portal_test.cb'),'serial',gen_random_uuid(),'model','Neo','status','operation'));raise exception 'Cross-account relationship allowed';exception when foreign_key_violation then null;end;
 begin perform public.portal_admin('payout',jsonb_build_object('account_id',current_setting('portal_test.a'),'contract_id',current_setting('portal_test.ca'),'period_start','2026-02-01','period_end','2026-02-28','due_on','2026-03-01','amount',20,'status','settled','settled_on','2026-03-01'));raise exception 'Settlement without reference allowed';exception when check_violation then null;end;
 perform public.portal_admin('settle_payout',jsonb_build_object('account_id',current_setting('portal_test.a'),'payout_id',(select id from public.payouts where account_id=current_setting('portal_test.a')::uuid limit 1),'settled_on','2026-02-03','reference','Bank-test-123'));
 if (public.portal_summary(current_setting('portal_test.a')::uuid)->>'settled')::numeric<>10 then raise exception 'Settlement did not update totals';end if;
 if not exists(select 1 from public.audit_events where actor_id=auth.uid()) then raise exception 'Audit missing';end if;
end $$;
reset role;
update public.account_memberships set active=false where user_id=current_setting('portal_test.ua')::uuid;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('portal_test.ua'),true);
do $$ begin
 if exists(select 1 from public.accounts) or exists(select 1 from public.contracts) or exists(select 1 from public.support_tickets) or exists(select 1 from storage.objects where bucket_id='portal-documents') then raise exception 'Revocation failed';end if;
 begin perform public.portal_ticket('reply',jsonb_build_object('ticket_id',current_setting('portal_test.ta'),'body','After revocation'));raise exception 'Revoked mutation allowed';exception when insufficient_privilege then null;end;
end $$;
reset role;
update public.accounts set status='suspended' where id=current_setting('portal_test.b')::uuid;
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('portal_test.ub'),true);
do $$ begin if exists(select 1 from public.contracts) then raise exception 'Account suspension failed';end if;end $$;
reset role;
set local role anon;
do $$ begin
 begin perform public.portal_admin('account','{"name":"Anonymous"}');raise exception 'Anonymous RPC allowed';exception when insufficient_privilege then null;end;
 begin perform 1 from public.accounts;raise exception 'Anonymous table allowed';exception when insufficient_privilege then null;end;
end $$;
reset role;
rollback;
select 'PASS: tenant isolation, storage isolation, staff scope, mutation authorization, cross-account constraints, financial settlement evidence, support workflow, audit, revocation, suspension, and anonymous denial' as result;
