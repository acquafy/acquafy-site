create table public.customer_leases(
 id uuid primary key default gen_random_uuid(),account_id uuid not null references public.accounts(id),
 title text not null check(length(title) between 3 and 160),agreement_text text not null check(length(agreement_text) between 100 and 100000),
 monthly_minor integer not null check(monthly_minor between 50 and 99999999),share_bps integer not null check(share_bps between 0 and 10000),
 status text not null default 'offered' check(status in ('offered','accepted','active','past_due','ended','review')),
 signer text,accepted_by uuid references auth.users(id),accepted_at timestamptz,evidence_hash text,
 checkout_id text unique,subscription_id text unique,customer_id text,cancel_at_period_end boolean not null default false,
 installed_at timestamptz,location text not null check(length(location) between 5 and 300),created_at timestamptz not null default now()
);
create table public.lease_units(lease_id uuid references public.customer_leases(id),purifier_id uuid references public.purifiers(id),primary key(lease_id,purifier_id),unique(purifier_id));
create table public.lease_receipts(
 invoice_id text primary key,lease_id uuid not null references public.customer_leases(id),amount_minor integer not null check(amount_minor>0),
 period_start timestamptz not null,period_end timestamptz not null,state text not null default 'collected' check(state in ('collected','review')),created_at timestamptz not null default now()
);
create table public.lease_revenue(
 invoice_id text references public.lease_receipts(invoice_id),purifier_id uuid references public.purifiers(id),investor_account_id uuid references public.accounts(id),
 amount_minor integer not null check(amount_minor>=0),state text not null default 'pending_install' check(state in ('pending_install','accrued','review')),primary key(invoice_id,purifier_id)
);
alter table public.customer_leases enable row level security;
alter table public.lease_units enable row level security;
alter table public.lease_receipts enable row level security;
alter table public.lease_revenue enable row level security;
revoke all on public.customer_leases,public.lease_units,public.lease_receipts,public.lease_revenue from anon,authenticated;
grant select on public.customer_leases,public.lease_units,public.lease_receipts,public.lease_revenue to authenticated;
grant all on public.customer_leases,public.lease_units,public.lease_receipts,public.lease_revenue to service_role;
create policy lease_read on public.customer_leases for select to authenticated using(portal_private.staff('admin') or portal_private.account_access(account_id));
create policy lease_units_read on public.lease_units for select to authenticated using(portal_private.staff('admin') or exists(select 1 from public.customer_leases l where l.id=lease_units.lease_id and portal_private.account_access(l.account_id)) or exists(select 1 from public.purifiers p where p.id=lease_units.purifier_id and portal_private.account_access(p.account_id)));
create policy lease_receipts_read on public.lease_receipts for select to authenticated using(portal_private.staff('admin') or exists(select 1 from public.customer_leases l where l.id=lease_receipts.lease_id and portal_private.account_access(l.account_id)));
create policy lease_revenue_read on public.lease_revenue for select to authenticated using(portal_private.staff('admin') or portal_private.account_access(investor_account_id));
create function portal_private.lease_command(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare l public.customer_leases;result uuid;p public.purifiers;
begin
 if action='create' then
 if not portal_private.staff('admin') or payload->>'approved' is distinct from 'yes' then raise exception 'Approved staff terms required';end if;
 if not exists(select 1 from public.accounts where id=(payload->>'account_id')::uuid and status='active') then raise exception 'Account unavailable';end if;
 insert into public.customer_leases(account_id,title,agreement_text,monthly_minor,share_bps,location)values((payload->>'account_id')::uuid,trim(payload->>'title'),trim(payload->>'agreement_text'),(payload->>'monthly_minor')::integer,(payload->>'share_bps')::integer,trim(payload->>'location'))returning id into result;return result;
 end if;
 select * into l from public.customer_leases where id=(payload->>'lease_id')::uuid for update;
 if l.id is null then raise exception 'Lease unavailable';end if;
 if action='accept' then
 if not portal_private.approved() or not exists(select 1 from public.account_memberships m join public.accounts a on a.id=m.account_id where m.account_id=l.account_id and m.user_id=auth.uid() and m.role='owner' and m.active and a.status='active') then raise exception 'Owner access required';end if;
 if l.status<>'offered' or payload->>'consent' is distinct from 'yes' or length(trim(payload->>'signer')) not between 3 and 160 then raise exception 'Consent required';end if;
 update public.customer_leases set signer=trim(payload->>'signer'),accepted_by=auth.uid(),accepted_at=now(),evidence_hash=encode(sha256(convert_to(l.agreement_text||l.monthly_minor::text||l.share_bps::text||l.location||trim(payload->>'signer')||auth.uid()::text,'UTF8')),'hex'),status='accepted' where id=l.id;
 elsif action='assign' then
 if not portal_private.staff('admin') or l.status<>'offered' then raise exception 'Assignment must precede consent';end if;
 select * into p from public.purifiers where id=(payload->>'purifier_id')::uuid for update;
 if p.id is null or p.status<>'available' or not exists(select 1 from public.contracts where id=p.contract_id and status='active') then raise exception 'Unit unavailable';end if;
 insert into public.lease_units values(l.id,p.id);
 elsif action='install' then
 if not portal_private.staff('admin') or l.status<>'active' then raise exception 'Paid lease required';end if;
 update public.customer_leases set installed_at=coalesce(installed_at,now()) where id=l.id;
 update public.lease_revenue set state='accrued' where invoice_id in(select invoice_id from public.lease_receipts where lease_id=l.id and state='collected') and state='pending_install';
 update public.purifiers set status='operation',activation_date=coalesce(activation_date,current_date) where id in(select purifier_id from public.lease_units where lease_id=l.id);
 else raise exception 'Invalid command';end if;
 return l.id;
end;$$;
revoke all on function portal_private.lease_command(text,jsonb) from public,anon;
grant execute on function portal_private.lease_command(text,jsonb) to authenticated;
create function public.lease_command(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.lease_command(action,payload);$$;
revoke all on function public.lease_command(text,jsonb) from public,anon;
grant execute on function public.lease_command(text,jsonb) to authenticated;
-- Only verified server events can record collections and derive investor accruals.
create function public.lease_collect(payload jsonb) returns void language plpgsql security invoker set search_path='' as $$
declare l public.customer_leases;n integer;total bigint;
begin
 select * into l from public.customer_leases where subscription_id=payload->>'subscription_id' for update;
 if l.id is null then raise exception 'Subscription binding pending';end if;
 if (payload->>'amount_minor')::integer<>l.monthly_minor then raise exception 'Invoice amount mismatch';end if;
 select count(*) into n from public.lease_units where lease_id=l.id;
 if n=0 then raise exception 'No assigned units';end if;
 insert into public.lease_receipts(invoice_id,lease_id,amount_minor,period_start,period_end)values(payload->>'invoice_id',l.id,l.monthly_minor,to_timestamp((payload->>'period_start')::bigint),to_timestamp((payload->>'period_end')::bigint))on conflict do nothing;
 if not found then return;end if;
 total:=l.monthly_minor::bigint*l.share_bps/10000;
 insert into public.lease_revenue(invoice_id,purifier_id,investor_account_id,amount_minor,state)
 select payload->>'invoice_id',p.id,p.account_id,(total/n+case when row_number() over(order by p.id)<=total%n then 1 else 0 end)::integer,case when l.status='review' then 'review' when l.installed_at is null then 'pending_install' else 'accrued' end from public.lease_units u join public.purifiers p on p.id=u.purifier_id where u.lease_id=l.id;
 update public.customer_leases set status=case when status in ('review','ended') then status else 'active' end where id=l.id;
end;$$;
revoke all on function public.lease_collect(jsonb) from public,anon,authenticated;
grant execute on function public.lease_collect(jsonb) to service_role;
