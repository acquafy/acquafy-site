create or replace function portal_private.order_command(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare o public.product_orders;account uuid;line jsonb;snapshot jsonb:='[]';p public.order_products;result uuid;l uuid;
begin
 if action='request' then
 if not portal_private.approved() then raise exception 'Verified account required';end if;
 select m.account_id into account from public.account_memberships m join public.accounts a on a.id=m.account_id where m.user_id=auth.uid() and m.active and m.role='owner' and a.status='active' order by m.created_at limit 1;
 if account is null or coalesce(payload->>'kind','') not in ('purchase','lease') or coalesce(jsonb_array_length(payload->'items'),0) not between 1 and 30 or length(coalesce(payload->'delivery'->>'name','')) not between 3 and 160 or length(coalesce(payload->'delivery'->>'address','')) not between 5 and 500 or length(coalesce(payload->'delivery'->>'phone','')) not between 5 and 40 then raise exception 'Invalid order';end if;
 if (select count(*) from public.product_orders where user_id=auth.uid() and created_at>now()-interval '1 hour')>=10 then raise exception 'Order limit reached';end if;
 for line in select * from jsonb_array_elements(payload->'items') loop
 select * into p from public.order_products where id=line->>'product' and enabled;
 if p.id is null or coalesce((line->>'quantity')::integer,0) not between 1 and 100 or length(coalesce(line->>'color',''))>80 then raise exception 'Invalid product';end if;
 snapshot:=snapshot||jsonb_build_array(jsonb_build_object('product',p.id,'title',p.title,'quantity',(line->>'quantity')::integer,'color',line->>'color','catalog_unit_minor',p.unit_minor));
 end loop;
 insert into public.product_orders(account_id,user_id,kind,items,delivery)values(account,auth.uid(),payload->>'kind',snapshot,payload->'delivery')returning id into result;return result;
 end if;
 select * into o from public.product_orders where id=(payload->>'order_id')::uuid for update;
 if o.id is null then raise exception 'Order unavailable';end if;
 if action='accept' then
 if o.user_id<>auth.uid() or not portal_private.account_access(o.account_id) or o.status<>'quoted' or payload->>'consent' is distinct from 'yes' or coalesce(length(trim(payload->>'signer')),0) not between 3 and 160 then raise exception 'Consent required';end if;
 if o.kind='lease' then raise exception 'Accept the linked lease agreement';end if;
 update public.product_orders set status='accepted',signer=trim(payload->>'signer'),accepted_at=now(),evidence_hash=encode(sha256(convert_to(o.items::text||o.delivery::text||o.total_minor::text||o.quote_text||trim(payload->>'signer'),'UTF8')),'hex'),updated_at=now() where id=o.id;
 elsif action='cancel' and o.user_id=auth.uid() and o.status in ('requested','quoted','accepted') and o.checkout_id is null and o.lease_id is null then update public.product_orders set status='cancelled',updated_at=now() where id=o.id;
 else
 if not portal_private.staff('admin') then raise exception 'Staff access required';end if;
 if action='quote' and o.status='requested' and payload->>'approved'='yes' and coalesce(length(trim(payload->>'quote_text')),0) between 100 and 100000 then
 if o.kind='lease' then
 l:=portal_private.lease_command('create',jsonb_build_object('account_id',o.account_id,'title','Locação · '||o.id,'agreement_text',payload->>'quote_text','monthly_minor',payload->>'total_minor','share_bps',payload->>'share_bps','location',o.delivery->>'address','approved','yes'));
 end if;
 update public.product_orders set total_minor=(payload->>'total_minor')::integer,quote_text=trim(payload->>'quote_text'),lease_id=l,status='quoted',updated_at=now() where id=o.id;
 elsif action='fulfill' and o.status in ('paid','processing','shipped','installed') and payload->>'status' in ('processing','shipped','installed','completed') and array_position(array['paid','processing','shipped','installed','completed'],payload->>'status')>array_position(array['paid','processing','shipped','installed','completed'],o.status) then
 if payload->>'status'='shipped' and coalesce(length(payload->>'tracking_reference'),0)<3 then raise exception 'Tracking required';end if;
 update public.product_orders set status=payload->>'status',tracking_reference=left(payload->>'tracking_reference',300),updated_at=now() where id=o.id;
 else raise exception 'Invalid transition';end if;
 end if;return o.id;
end;$$;
create table public.order_events(id bigint generated always as identity primary key,order_id uuid not null references public.product_orders(id),status text not null,created_at timestamptz not null default now());
create index order_events_order on public.order_events(order_id,created_at);
alter table public.order_events enable row level security;
revoke all on public.order_events from anon,authenticated;
grant select on public.order_events to authenticated;
grant all on public.order_events to service_role;
create policy order_events_read on public.order_events for select to authenticated using(exists(select 1 from public.product_orders o where o.id=order_events.order_id and (portal_private.staff('admin') or (o.user_id=(select auth.uid()) and portal_private.account_access(o.account_id)))));
create function portal_private.order_timeline() returns trigger language plpgsql security definer set search_path='' as $$begin
 if TG_OP='INSERT' or old.status is distinct from new.status then insert into public.order_events(order_id,status)values(new.id,new.status);end if;return new;end;$$;
revoke all on function portal_private.order_timeline() from public,anon,authenticated;
create trigger order_timeline after insert or update on public.product_orders for each row execute function portal_private.order_timeline();
