create or replace function portal_private.lease_command(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
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
 if l.status<>'offered' or payload->>'consent' is distinct from 'yes' or coalesce(length(trim(payload->>'signer')),0) not between 3 and 160 or not exists(select 1 from public.lease_units where lease_id=l.id) then raise exception 'Consent required';end if;
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

create trigger audit_customer_lease after insert or update on public.customer_leases for each row execute function portal_private.audit_change();
