create or replace function portal_private.approved() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from auth.users where id=(select auth.uid()) and email_confirmed_at is not null and not coalesce(is_anonymous,false) and (banned_until is null or banned_until<now()) and raw_app_meta_data->>'portal_role' in ('internal','partner','customer'));
$$;
-- A public signup can receive only the customer role; metadata supplied by a browser cannot grant staff access.
create function portal_private.new_customer() returns trigger language plpgsql security definer set search_path='' as $$
declare account uuid;
begin
 if new.raw_app_meta_data->>'portal_role' is null then
 new.raw_app_meta_data:=coalesce(new.raw_app_meta_data,'{}')||'{"portal_role":"customer"}'::jsonb;
 end if;return new;
end;$$;
revoke all on function portal_private.new_customer() from public,anon,authenticated;
create trigger customer_role before insert on auth.users for each row execute function portal_private.new_customer();
create function portal_private.customer_account() returns trigger language plpgsql security definer set search_path='' as $$
declare account uuid;
begin
 if new.raw_app_meta_data->>'portal_role'='customer' and new.raw_user_meta_data->>'signup_kind'='customer' then
 insert into public.accounts(name)values('Acquafy customer '||left(new.id::text,8))returning id into account;
 insert into public.account_memberships(account_id,user_id,role)values(account,new.id,'owner');
 end if;return new;
end;$$;
revoke all on function portal_private.customer_account() from public,anon,authenticated;
create trigger customer_account after insert on auth.users for each row execute function portal_private.customer_account();
create table public.order_products(id text primary key,title text not null,unit_minor integer not null check(unit_minor>=50),enabled boolean not null default true);
alter table public.order_products enable row level security;
revoke all on public.order_products from anon,authenticated;
grant select on public.order_products to anon,authenticated;
grant all on public.order_products to service_role;
create policy product_catalog on public.order_products for select to anon,authenticated using(enabled);
create table public.product_orders(
 id uuid primary key default gen_random_uuid(),account_id uuid not null references public.accounts(id),user_id uuid not null references auth.users(id),
 kind text not null check(kind in ('purchase','lease')),items jsonb not null,delivery jsonb not null,
 status text not null default 'requested' check(status in ('requested','quoted','accepted','paid','processing','shipped','installed','completed','cancelled','review')),
 total_minor integer check(total_minor between 50 and 99999999),quote_text text,accepted_at timestamptz,signer text,evidence_hash text,
 lease_id uuid unique references public.customer_leases(id),checkout_id text unique,payment_intent_id text unique,
 tracking_reference text,updated_at timestamptz not null default now(),created_at timestamptz not null default now()
);
create index product_orders_user on public.product_orders(user_id,created_at desc);
alter table public.product_orders enable row level security;
revoke all on public.product_orders from anon,authenticated;
grant select on public.product_orders to authenticated;
grant all on public.product_orders to service_role;
create policy order_read on public.product_orders for select to authenticated using(portal_private.staff('admin') or (user_id=(select auth.uid()) and portal_private.account_access(account_id)));
create trigger audit_product_order after insert or update on public.product_orders for each row execute function portal_private.audit_change();
create function portal_private.order_command(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare o public.product_orders;account uuid;line jsonb;snapshot jsonb:='[]';p public.order_products;result uuid;l uuid;
begin
 if action='request' then
 if not portal_private.approved() then raise exception 'Verified account required';end if;
 select m.account_id into account from public.account_memberships m join public.accounts a on a.id=m.account_id where m.user_id=auth.uid() and m.active and m.role='owner' and a.status='active' order by m.created_at limit 1;
 if account is null or payload->>'kind' not in ('purchase','lease') or jsonb_array_length(payload->'items') not between 1 and 30 or length(coalesce(payload->'delivery'->>'name','')) not between 3 and 160 or length(coalesce(payload->'delivery'->>'address','')) not between 5 and 500 or length(coalesce(payload->'delivery'->>'phone','')) not between 5 and 40 then raise exception 'Invalid order';end if;
 if (select count(*) from public.product_orders where user_id=auth.uid() and created_at>now()-interval '1 hour')>=10 then raise exception 'Order limit reached';end if;
 for line in select * from jsonb_array_elements(payload->'items') loop
 select * into p from public.order_products where id=line->>'product' and enabled;
 if p.id is null or (line->>'quantity')::integer not between 1 and 100 or length(coalesce(line->>'color',''))>80 then raise exception 'Invalid product';end if;
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
 elsif action='fulfill' and o.status in ('paid','processing','shipped','installed') and payload->>'status' in ('processing','shipped','installed','completed') then
 if payload->>'status'='shipped' and coalesce(length(payload->>'tracking_reference'),0)<3 then raise exception 'Tracking required';end if;
 update public.product_orders set status=payload->>'status',tracking_reference=left(payload->>'tracking_reference',300),updated_at=now() where id=o.id;
 else raise exception 'Invalid transition';end if;
 end if;return o.id;
end;$$;
revoke all on function portal_private.order_command(text,jsonb) from public,anon;
grant execute on function portal_private.order_command(text,jsonb) to authenticated;
create function public.order_command(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.order_command(action,payload);$$;
revoke all on function public.order_command(text,jsonb) from public,anon;
grant execute on function public.order_command(text,jsonb) to authenticated;

-- Existing website sales catalog; lease financing figures are deliberately excluded.
insert into public.order_products(id,title,unit_minor)values
('neo-up','Neo Up',40000),
('neo-fit','Neo Fit',50000),
('neo-touch','Neo Touch',60000),
('neo-smart-h2','Neo Smart H2',70000),
('neo-plus','Neo Plus',70000),
('neo-ultra','Neo Ultra',100000),
('neo-ultra-spark','Neo Ultra Spark',120000),
('neo-ultra-spark-h2','Neo Ultra Spark H2',140000),
('neo-max','Neo Max',120000),
('neo-max-spark','Neo Max Spark',140000),
('neo-max-spark-h2','Neo Max Spark H2',160000),
('neo-infinity','Neo Infinity',170000),
('neo-infinity-spark','Neo Infinity Spark',180000),
('neo-infinity-spark-h2','Neo Infinity Spark H2',190000),
('neo-prime','Neo Prime',170000),
('neo-prime-spark','Neo Prime Spark',180000),
('neo-prime-spark-h2','Neo Prime Spark H2',190000),
('neo-prestige','Neo Prestige',173000),
('neo-prestige-spark','Neo Prestige Spark',183000),
('neo-prestige-spark-h2','Neo Prestige Spark H2',193000),
('acquafy-media','Acquafy Media',260000);
