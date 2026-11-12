-- P3 · Stock available now (Tesla's inventory). Staff keep units on hand per model and colour with a delivery time;
-- the website and the order page show "Disponível agora" or the made-to-order estimate. When the order fee is paid
-- (status 'placed') a purchase reserves units in stock; cancelling releases them. Leases use investor units instead.

alter table public.order_settings add column made_to_order_weeks integer not null default 10 check(made_to_order_weeks between 1 and 52);

create table public.product_stock(
 id uuid primary key default gen_random_uuid(),
 product_id text not null references public.order_products(id),
 -- Colour name as the website sends it in Portuguese ("Azul Petróleo", "Inox"); '' covers every colour.
 color text not null default '' check(length(color)<=80),
 on_hand integer not null default 0 check(on_hand>=0),
 ship_days integer not null check(ship_days between 1 and 120),
 updated_at timestamptz not null default now(),
 unique(product_id,color)
);
create table public.order_stock_reservations(
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.product_orders(id),
 stock_id uuid not null references public.product_stock(id),
 quantity integer not null check(quantity>0),
 created_at timestamptz not null default now()
);
create index order_stock_reservations_order on public.order_stock_reservations(order_id);
alter table public.product_stock enable row level security;
alter table public.order_stock_reservations enable row level security;
revoke all on public.product_stock,public.order_stock_reservations from anon,authenticated;
grant select on public.product_stock,public.order_stock_reservations to authenticated;
grant all on public.product_stock,public.order_stock_reservations to service_role;
-- Unit counts are for staff; customers see availability through stock_availability(), and their own reservations.
create policy product_stock_read on public.product_stock for select to authenticated using(portal_private.staff('admin'));
create policy order_stock_reservations_read on public.order_stock_reservations for select to authenticated using(portal_private.staff('admin') or exists(select 1 from public.product_orders o where o.id=order_stock_reservations.order_id and o.user_id=(select auth.uid()) and portal_private.account_access(o.account_id)));
create trigger audit_product_stock after insert or update on public.product_stock for each row execute function portal_private.audit_change();

-- Public availability (website product pages and the order page): in stock or not, and in how many days; no counts.
-- The made-to-order estimate is public in order_settings.made_to_order_weeks.
create function public.stock_availability() returns table(product_id text,color text,available boolean,ship_days integer) language sql stable security definer set search_path='' as $$
 select s.product_id,s.color,s.on_hand>0,s.ship_days from public.product_stock s join public.order_products p on p.id=s.product_id where p.enabled;
$$;
revoke all on function public.stock_availability() from public;
grant execute on function public.stock_availability() to anon,authenticated;

-- Staff set the units on hand and the delivery time of a model and colour.
create function portal_private.stock_command(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
 if not portal_private.staff('admin') then raise exception 'Staff access required';end if;
 if action='set' then
 if not exists(select 1 from public.order_products where id=payload->>'product_id') or coalesce((payload->>'on_hand')::integer,-1)<0 or coalesce((payload->>'ship_days')::integer,0) not between 1 and 120 or length(coalesce(payload->>'color',''))>80 then raise exception 'Invalid stock';end if;
 insert into public.product_stock(product_id,color,on_hand,ship_days)values(payload->>'product_id',trim(coalesce(payload->>'color','')),(payload->>'on_hand')::integer,(payload->>'ship_days')::integer)
 on conflict(product_id,color) do update set on_hand=excluded.on_hand,ship_days=excluded.ship_days,updated_at=now() returning id into result;
 return result;
 elsif action='lead_time' then
 if coalesce((payload->>'weeks')::integer,0) not between 1 and 52 then raise exception 'Invalid lead time';end if;
 update public.order_settings set made_to_order_weeks=(payload->>'weeks')::integer;
 return null;
 end if;
 raise exception 'Invalid command';
end;$$;
revoke all on function portal_private.stock_command(text,jsonb) from public,anon;
grant execute on function portal_private.stock_command(text,jsonb) to authenticated;
create function public.stock_command(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.stock_command(action,payload);$$;
revoke all on function public.stock_command(text,jsonb) from public,anon;
grant execute on function public.stock_command(text,jsonb) to authenticated;

-- Reserve when the order fee is paid; release on cancellation. A line is reserved only when the whole quantity is in
-- stock (the colour's own row first, then the any-colour row); otherwise it is made to order.
create function portal_private.order_stock() returns trigger language plpgsql security definer set search_path='' as $$
declare line jsonb;st public.product_stock;qty integer;
begin
 if new.flow='fixed' and new.kind='purchase' and new.status='placed' and old.status is distinct from 'placed' then
 for line in select * from jsonb_array_elements(new.items) loop
 qty:=(line->>'quantity')::integer;
 select * into st from public.product_stock s where s.product_id=line->>'product' and s.color in (coalesce(line->>'color',''),'') and s.on_hand>=qty
 order by (s.color='') limit 1 for update;
 if st.id is not null then
 update public.product_stock set on_hand=on_hand-qty,updated_at=now() where id=st.id;
 insert into public.order_stock_reservations(order_id,stock_id,quantity)values(new.id,st.id,qty);
 end if;
 end loop;
 elsif new.status='cancelled' and old.status is distinct from 'cancelled' then
 update public.product_stock s set on_hand=s.on_hand+r.quantity,updated_at=now() from public.order_stock_reservations r where r.order_id=new.id and r.stock_id=s.id;
 delete from public.order_stock_reservations where order_id=new.id;
 end if;
 return new;
end;$$;
revoke all on function portal_private.order_stock() from public,anon,authenticated;
create trigger order_stock after update on public.product_orders for each row execute function portal_private.order_stock();
