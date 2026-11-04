-- First production data slice. No sample investments or financial records are seeded.
create schema if not exists portal_private;
revoke all on schema portal_private from public;
grant usage on schema portal_private to authenticated;

create table public.accounts (
 id uuid primary key default gen_random_uuid(), name text not null check (length(trim(name)) between 2 and 160),
 status text not null default 'active' check(status in ('active','suspended')), created_at timestamptz not null default now()
);
create table public.staff_role_grants (
 user_id uuid primary key references auth.users(id), role text not null check(role in ('admin','support')), created_at timestamptz not null default now()
);
create table public.account_memberships (
 account_id uuid references public.accounts(id), user_id uuid references auth.users(id),
 role text not null check(role in ('owner','viewer')), active boolean not null default true,
 created_at timestamptz not null default now(), primary key(account_id,user_id)
);
create index membership_user on public.account_memberships(user_id,account_id);
create table public.contracts (
 id uuid primary key default gen_random_uuid(), account_id uuid not null references public.accounts(id),
 number text not null unique check(length(number) between 2 and 80), title text not null check(length(title) between 2 and 200),
 status text not null check(status in ('draft','active','ended')), currency text not null default 'USD' check(currency='USD'),
 starts_on date not null, ends_on date not null, invested_amount numeric(18,2) not null check(invested_amount>=0),
 created_at timestamptz not null default now(), unique(id,account_id), check(ends_on>=starts_on)
);
create index contract_account on public.contracts(account_id);
create table public.purifiers (
 id uuid primary key default gen_random_uuid(), account_id uuid not null references public.accounts(id), contract_id uuid not null,
 serial text not null unique check(length(serial) between 2 and 100), model text not null check(length(model) between 2 and 100),
 status text not null check(status in ('available','operation','maintenance','retired')), city text not null default '', state text not null default '',
 activation_date date, created_at timestamptz not null default now(), foreign key(contract_id,account_id) references public.contracts(id,account_id)
);
create index purifier_account on public.purifiers(account_id,contract_id);
create table public.payouts (
 id uuid primary key default gen_random_uuid(), account_id uuid not null references public.accounts(id), contract_id uuid not null,
 period_start date not null, period_end date not null, due_on date not null,
 amount numeric(18,2) not null check(amount>0), status text not null check(status in ('scheduled','settled')),
 settled_on date, reference text, created_at timestamptz not null default now(),
 foreign key(contract_id,account_id) references public.contracts(id,account_id),
 unique(contract_id,period_start,period_end), check(period_end>=period_start),
 check((status='settled' and settled_on is not null and reference is not null and length(trim(reference))>=3) or (status='scheduled' and settled_on is null))
);
create index payout_account on public.payouts(account_id,due_on);
create table public.documents (
 id uuid primary key default gen_random_uuid(), account_id uuid not null references public.accounts(id), contract_id uuid,
 title text not null check(length(title) between 2 and 200), object_path text not null unique,
 filename text not null, mime_type text not null check(mime_type='application/pdf'), size_bytes bigint not null check(size_bytes between 1 and 10485760),
 created_at timestamptz not null default now(), foreign key(contract_id,account_id) references public.contracts(id,account_id),
 check(object_path like account_id::text || '/%')
);
create index document_account on public.documents(account_id,created_at);
create table public.support_tickets (
 id uuid primary key default gen_random_uuid(), number bigint generated always as identity unique,
 account_id uuid not null references public.accounts(id), created_by uuid not null default auth.uid() references auth.users(id),
 subject text not null check(length(trim(subject)) between 3 and 160), status text not null default 'open' check(status in ('open','in_progress','resolved')),
 assigned_to uuid references public.staff_role_grants(user_id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index ticket_account on public.support_tickets(account_id,updated_at desc);
create table public.support_messages (
 id uuid primary key default gen_random_uuid(), ticket_id uuid not null references public.support_tickets(id),
 author_id uuid not null references auth.users(id), from_staff boolean not null,
 body text not null check(length(trim(body)) between 1 and 5000), created_at timestamptz not null default now()
);
create index message_ticket on public.support_messages(ticket_id,created_at);
create table public.audit_events (
 id bigint generated always as identity primary key, actor_id uuid references auth.users(id),
 entity text not null, entity_id text not null, operation text not null, created_at timestamptz not null default now()
);

create function portal_private.approved() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from auth.users where id=(select auth.uid()) and email_confirmed_at is not null
 and not coalesce(is_anonymous,false) and (banned_until is null or banned_until<now())
 and raw_app_meta_data->>'portal_role' in ('internal','partner'));
$$;
create function portal_private.staff(required_role text default null) returns boolean language sql stable security definer set search_path='' as $$
 select portal_private.approved() and exists(select 1 from public.staff_role_grants g join auth.users u on u.id=g.user_id
 where g.user_id=(select auth.uid()) and u.raw_app_meta_data->>'portal_role'='internal' and (required_role is null or g.role=required_role));
$$;
create function portal_private.account_access(target uuid) returns boolean language sql stable security definer set search_path='' as $$
 select portal_private.staff('admin') or (portal_private.approved() and exists(select 1 from public.account_memberships m join public.accounts a on a.id=m.account_id
 where m.account_id=target and m.user_id=(select auth.uid()) and m.active and a.status='active'));
$$;
revoke all on all functions in schema portal_private from public;
grant execute on function portal_private.approved(), portal_private.staff(text), portal_private.account_access(uuid) to authenticated;

-- Business records are read-only to application clients. Mutations use validated RPCs below.
do $$ declare t text; begin
 foreach t in array array['accounts','staff_role_grants','account_memberships','contracts','purifiers','payouts','documents','support_tickets','support_messages','audit_events'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('revoke all on public.%I from anon, authenticated',t);
 execute format('grant select on public.%I to authenticated',t);
 end loop;
end $$;
create policy accounts_read on public.accounts for select to authenticated using(portal_private.account_access(id));
create policy staff_read on public.staff_role_grants for select to authenticated using(portal_private.staff() or (user_id=(select auth.uid()) and portal_private.approved()));
create policy membership_read on public.account_memberships for select to authenticated using(portal_private.staff('admin') or (user_id=(select auth.uid()) and portal_private.account_access(account_id)));
create policy contracts_read on public.contracts for select to authenticated using(portal_private.account_access(account_id));
create policy units_read on public.purifiers for select to authenticated using(portal_private.account_access(account_id));
create policy payouts_read on public.payouts for select to authenticated using(portal_private.account_access(account_id));
create policy documents_read on public.documents for select to authenticated using(portal_private.account_access(account_id));
create policy tickets_read on public.support_tickets for select to authenticated using(portal_private.staff() or portal_private.account_access(account_id));
create policy messages_read on public.support_messages for select to authenticated using(exists(select 1 from public.support_tickets t where t.id=ticket_id and (portal_private.staff() or portal_private.account_access(t.account_id))));
create policy audit_read on public.audit_events for select to authenticated using(portal_private.staff('admin'));

create function portal_private.audit_change() returns trigger language plpgsql security definer set search_path='' as $$
 begin insert into public.audit_events(actor_id,entity,entity_id,operation) values(auth.uid(),tg_table_name,
 coalesce(to_jsonb(new)->>'id',to_jsonb(new)->>'user_id'),tg_op); return new; end;
$$;
revoke all on function portal_private.audit_change() from public;
do $$ declare t text; begin
 foreach t in array array['accounts','staff_role_grants','account_memberships','contracts','purifiers','payouts','documents','support_tickets','support_messages'] loop
 execute format('create trigger audit_write after insert or update on public.%I for each row execute function portal_private.audit_change()',t);
 end loop;
end $$;

-- Administrator-only, bounded mutations. No caller-supplied identities or amounts from the partner UI.
create function public.portal_admin(action text, payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
 declare result uuid; target uuid; recipient uuid; begin
 if not portal_private.staff('admin') then raise exception 'Administrator access required' using errcode='42501'; end if;
 target := (payload->>'account_id')::uuid;
 case action
 when 'account' then
 insert into public.accounts(name) values(trim(payload->>'name')) returning id into result;
 when 'account_status' then
 update public.accounts set status=payload->>'status' where id=target returning id into result;
 when 'membership' then
 select id into recipient from auth.users where lower(email)=lower(trim(payload->>'email')) and email_confirmed_at is not null and raw_app_meta_data->>'portal_role' in ('internal','partner');
 if recipient is null then raise exception 'Create and approve the Auth user before assigning membership'; end if;
 insert into public.account_memberships(account_id,user_id,role,active) values(target,recipient,payload->>'role',coalesce((payload->>'active')::boolean,true))
 on conflict(account_id,user_id) do update set role=excluded.role,active=excluded.active;
 result:=recipient;
 when 'contract' then
 insert into public.contracts(account_id,number,title,status,starts_on,ends_on,invested_amount)
 values(target,trim(payload->>'number'),trim(payload->>'title'),payload->>'status',(payload->>'starts_on')::date,(payload->>'ends_on')::date,(payload->>'invested_amount')::numeric) returning id into result;
 when 'purifier' then
 insert into public.purifiers(account_id,contract_id,serial,model,status,city,state,activation_date)
 values(target,(payload->>'contract_id')::uuid,trim(payload->>'serial'),trim(payload->>'model'),payload->>'status',left(coalesce(payload->>'city',''),120),left(coalesce(payload->>'state',''),80),nullif(payload->>'activation_date','')::date) returning id into result;
 when 'payout' then
 insert into public.payouts(account_id,contract_id,period_start,period_end,due_on,amount,status,settled_on,reference)
 values(target,(payload->>'contract_id')::uuid,(payload->>'period_start')::date,(payload->>'period_end')::date,(payload->>'due_on')::date,(payload->>'amount')::numeric,payload->>'status',nullif(payload->>'settled_on','')::date,nullif(trim(payload->>'reference'),'')) returning id into result;
 when 'settle_payout' then
 update public.payouts set status='settled',settled_on=(payload->>'settled_on')::date,reference=trim(payload->>'reference')
 where id=(payload->>'payout_id')::uuid and account_id=target and status='scheduled' returning id into result;
 when 'unit_status' then
 update public.purifiers set status=payload->>'status' where id=(payload->>'unit_id')::uuid and account_id=target returning id into result;
 when 'document' then
 if not exists(select 1 from storage.objects where bucket_id='portal-documents' and name=payload->>'object_path') then raise exception 'Upload is incomplete'; end if;
 insert into public.documents(account_id,contract_id,title,object_path,filename,mime_type,size_bytes)
 values(target,nullif(payload->>'contract_id','')::uuid,trim(payload->>'title'),payload->>'object_path',left(payload->>'filename',200),'application/pdf',(payload->>'size_bytes')::bigint) returning id into result;
 else raise exception 'Unsupported action';
 end case;
 if result is null then raise exception 'Record not found'; end if;
 return result;
 end;
$$;

create function public.portal_ticket(action text, payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
 declare result uuid; account uuid; ticket public.support_tickets; staff boolean:=portal_private.staff(); begin
 if not portal_private.approved() then raise exception 'Access denied' using errcode='42501'; end if;
 if action='create' then
 account:=(payload->>'account_id')::uuid;
 if not (staff or portal_private.account_access(account)) then raise exception 'Access denied' using errcode='42501'; end if;
 insert into public.support_tickets(account_id,subject) values(account,trim(payload->>'subject')) returning id into result;
 insert into public.support_messages(ticket_id,author_id,from_staff,body) values(result,auth.uid(),staff,trim(payload->>'body'));
 else
 select * into ticket from public.support_tickets where id=(payload->>'ticket_id')::uuid for update;
 if ticket.id is null or not (staff or portal_private.account_access(ticket.account_id)) then raise exception 'Access denied' using errcode='42501'; end if;
 result:=ticket.id;
 if action='reply' then
 insert into public.support_messages(ticket_id,author_id,from_staff,body) values(result,auth.uid(),staff,trim(payload->>'body'));
 update public.support_tickets set updated_at=now(),status=case when staff then 'in_progress' else 'open' end where id=result;
 elsif action='status' and staff then
 update public.support_tickets set updated_at=now(),status=payload->>'status',assigned_to=auth.uid() where id=result;
 else raise exception 'Access denied' using errcode='42501'; end if;
 end if;
 return result;
 end;
$$;
revoke all on function public.portal_admin(text,jsonb),public.portal_ticket(text,jsonb) from public,anon;
grant execute on function public.portal_admin(text,jsonb),public.portal_ticket(text,jsonb) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('portal-documents','portal-documents',false,10485760,array['application/pdf']);
create policy portal_upload on storage.objects for insert to authenticated with check(bucket_id='portal-documents' and portal_private.staff('admin'));
create policy portal_file_read on storage.objects for select to authenticated using(bucket_id='portal-documents' and exists(select 1 from public.documents d where d.object_path=name and portal_private.account_access(d.account_id)));
create policy portal_orphan_cleanup on storage.objects for delete to authenticated using(bucket_id='portal-documents' and portal_private.staff('admin') and not exists(select 1 from public.documents d where d.object_path=name));

create function public.portal_summary(account uuid) returns jsonb language plpgsql stable security definer set search_path='' as $$
 begin
 if not portal_private.account_access(account) then raise exception 'Access denied' using errcode='42501'; end if;
 return jsonb_build_object(
 'contracts',(select count(*) from public.contracts where account_id=account),
 'units',(select count(*) from public.purifiers where account_id=account),
 'invested',(select coalesce(sum(invested_amount),0) from public.contracts where account_id=account and status<>'draft'),
 'settled',(select coalesce(sum(amount),0) from public.payouts where account_id=account and status='settled'),
 'scheduled',(select coalesce(sum(amount),0) from public.payouts where account_id=account and status='scheduled'));
 end;
$$;
revoke all on function public.portal_summary(uuid) from public,anon;
grant execute on function public.portal_summary(uuid) to authenticated;
