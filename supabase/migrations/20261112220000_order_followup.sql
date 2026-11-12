-- P2: what happens after a fixed-price order is placed (Tesla-style task list).
-- 1. The customer can correct the delivery address and contact until Acquafy confirms the order.
-- 2. Installation: staff publish windows per region (UF); the customer books one after paying.
-- 3. E-mails: every status change and booking queues an e-mail in an outbox that a server job sends (Resend).

-- 1 · Delivery address and contact, editable by the customer before confirmation.
create function portal_private.order_delivery_update(payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare o public.product_orders;d jsonb:=payload->'delivery';
begin
 select * into o from public.product_orders where id=(payload->>'order_id')::uuid for update;
 if o.id is null or o.user_id<>auth.uid() or not portal_private.account_access(o.account_id) or o.flow<>'fixed' or o.status not in ('awaiting_fee','placed') then raise exception 'Delivery locked';end if;
 if length(coalesce(d->>'name','')) not between 3 and 160 or length(coalesce(d->>'address','')) not between 5 and 500 or length(coalesce(d->>'phone','')) not between 5 and 40 then raise exception 'Invalid delivery';end if;
 update public.product_orders set delivery=d,updated_at=now() where id=o.id;
 return o.id;
end;$$;
revoke all on function portal_private.order_delivery_update(jsonb) from public,anon;
grant execute on function portal_private.order_delivery_update(jsonb) to authenticated;
create function public.order_delivery_update(payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.order_delivery_update(payload);$$;
revoke all on function public.order_delivery_update(jsonb) from public,anon;
grant execute on function public.order_delivery_update(jsonb) to authenticated;

-- 2 · Installation windows and bookings.
create table public.installation_windows(
 id uuid primary key default gen_random_uuid(),
 region text not null check(region ~ '^[A-Z]{2}$'),
 starts_at timestamptz not null,ends_at timestamptz not null check(ends_at>starts_at),
 capacity integer not null check(capacity between 1 and 50),
 active boolean not null default true,
 created_by uuid references auth.users(id),created_at timestamptz not null default now()
);
create index installation_windows_region on public.installation_windows(region,starts_at);
create table public.installation_bookings(
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null unique references public.product_orders(id),
 window_id uuid not null references public.installation_windows(id),
 booked_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index installation_bookings_window on public.installation_bookings(window_id);
alter table public.installation_windows enable row level security;
alter table public.installation_bookings enable row level security;
revoke all on public.installation_windows,public.installation_bookings from anon,authenticated;
grant select on public.installation_windows,public.installation_bookings to authenticated;
grant all on public.installation_windows,public.installation_bookings to service_role;
-- Customers see the open windows (date, period, region); staff see everything.
create policy installation_windows_read on public.installation_windows for select to authenticated using(portal_private.staff('admin') or (active and portal_private.approved()));
create policy installation_bookings_read on public.installation_bookings for select to authenticated using(portal_private.staff('admin') or exists(select 1 from public.product_orders o where o.id=installation_bookings.order_id and o.user_id=(select auth.uid()) and portal_private.account_access(o.account_id)));
create trigger audit_installation_window after insert or update on public.installation_windows for each row execute function portal_private.audit_change();
create trigger audit_installation_booking after insert or update on public.installation_bookings for each row execute function portal_private.audit_change();

-- Free places of a window (bookings are counted on the server; customers cannot read other people's bookings).
create function public.installation_window_free(window_ids uuid[]) returns table(window_id uuid,free integer) language sql stable security definer set search_path='' as $$
 select w.id,(w.capacity-count(b.order_id))::integer from public.installation_windows w left join public.installation_bookings b on b.window_id=w.id
 where w.id=any(window_ids) and (portal_private.staff('admin') or (w.active and portal_private.approved())) group by w.id;
$$;
revoke all on function public.installation_window_free(uuid[]) from public,anon;
grant execute on function public.installation_window_free(uuid[]) to authenticated;

create function portal_private.installation_command(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare w public.installation_windows;o public.product_orders;b public.installation_bookings;result uuid;used integer;
begin
 if action='publish' then
 if not portal_private.staff('admin') then raise exception 'Staff access required';end if;
 if coalesce(payload->>'region','') !~ '^[A-Z]{2}$' or (payload->>'starts_at')::timestamptz<=now() or (payload->>'ends_at')::timestamptz<=(payload->>'starts_at')::timestamptz or coalesce((payload->>'capacity')::integer,0) not between 1 and 50 then raise exception 'Invalid window';end if;
 insert into public.installation_windows(region,starts_at,ends_at,capacity,created_by)values(payload->>'region',(payload->>'starts_at')::timestamptz,(payload->>'ends_at')::timestamptz,(payload->>'capacity')::integer,auth.uid())returning id into result;
 return result;
 elsif action='close' then
 if not portal_private.staff('admin') then raise exception 'Staff access required';end if;
 update public.installation_windows set active=false where id=(payload->>'window_id')::uuid returning id into result;
 if result is null then raise exception 'Window unavailable';end if;
 return result;
 elsif action='book' then
 -- Once paid (purchase balance, or the lease's first month), the owner books a window in the order's state,
 -- at least 48 hours ahead; booking again moves the appointment while the current one is still 48 hours away.
 select * into o from public.product_orders where id=(payload->>'order_id')::uuid for update;
 if o.id is null or o.user_id<>auth.uid() or not portal_private.account_access(o.account_id) or o.flow<>'fixed' or o.status not in ('paid','processing','shipped') then raise exception 'Booking unavailable';end if;
 select * into w from public.installation_windows where id=(payload->>'window_id')::uuid for update;
 if w.id is null or not w.active or w.starts_at<now()+interval '48 hours' or w.region is distinct from upper(o.delivery->>'state') then raise exception 'Window unavailable';end if;
 select * into b from public.installation_bookings where order_id=o.id for update;
 if b.order_id is not null then
 if b.window_id=w.id then return o.id;end if;
 if (select starts_at from public.installation_windows where id=b.window_id)<now()+interval '48 hours' then raise exception 'Booking locked';end if;
 end if;
 select count(*) into used from public.installation_bookings where window_id=w.id;
 if used>=w.capacity then raise exception 'Window full';end if;
 insert into public.installation_bookings(order_id,window_id,booked_by)values(o.id,w.id,auth.uid())
 on conflict(order_id) do update set window_id=excluded.window_id,booked_by=excluded.booked_by,updated_at=now();
 return o.id;
 end if;
 raise exception 'Invalid command';
end;$$;
revoke all on function portal_private.installation_command(text,jsonb) from public,anon;
grant execute on function portal_private.installation_command(text,jsonb) to authenticated;
create function public.installation_command(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.installation_command(action,payload);$$;
revoke all on function public.installation_command(text,jsonb) from public,anon;
grant execute on function public.installation_command(text,jsonb) to authenticated;

-- 3 · E-mail outbox. Rows are written by triggers and read only by the server job (service role).
create table public.order_notifications(
 id bigint generated always as identity primary key,
 order_id uuid not null references public.product_orders(id),
 kind text not null check(kind in ('placed','confirmed','paid','installation_booked','shipped','installed','cancelled','refunded')),
 to_email text not null,
 status text not null default 'pending' check(status in ('pending','sending','sent','failed')),
 attempts integer not null default 0,last_error text,provider_id text,
 created_at timestamptz not null default now(),sent_at timestamptz,locked_at timestamptz
);
create index order_notifications_pending on public.order_notifications(status,created_at) where status in ('pending','sending');
alter table public.order_notifications enable row level security;
revoke all on public.order_notifications from anon,authenticated;
grant all on public.order_notifications to service_role;

create function portal_private.queue_order_notification(order_ref uuid,kind text) returns void language plpgsql security definer set search_path='' as $$
declare email text;
begin
 select u.email into email from public.product_orders o join auth.users u on u.id=o.user_id where o.id=order_ref and o.flow='fixed';
 if email is not null then insert into public.order_notifications(order_id,kind,to_email)values(order_ref,kind,email);end if;
end;$$;
revoke all on function portal_private.queue_order_notification(uuid,text) from public,anon,authenticated;

create function portal_private.order_event_notification() returns trigger language plpgsql security definer set search_path='' as $$begin
 if new.status in ('placed','confirmed','paid','shipped','installed','cancelled') then perform portal_private.queue_order_notification(new.order_id,new.status);end if;
 return new;end;$$;
revoke all on function portal_private.order_event_notification() from public,anon,authenticated;
create trigger order_event_notification after insert on public.order_events for each row execute function portal_private.order_event_notification();

create function portal_private.booking_notification() returns trigger language plpgsql security definer set search_path='' as $$begin
 if TG_OP='INSERT' or old.window_id is distinct from new.window_id then perform portal_private.queue_order_notification(new.order_id,'installation_booked');end if;
 return new;end;$$;
revoke all on function portal_private.booking_notification() from public,anon,authenticated;
create trigger booking_notification after insert or update on public.installation_bookings for each row execute function portal_private.booking_notification();

create function portal_private.refund_notification() returns trigger language plpgsql security definer set search_path='' as $$begin
 if new.status='refunded' and old.status is distinct from 'refunded' then perform portal_private.queue_order_notification(new.order_id,'refunded');end if;
 return new;end;$$;
revoke all on function portal_private.refund_notification() from public,anon,authenticated;
create trigger refund_notification after update on public.order_payments for each row execute function portal_private.refund_notification();

-- The sender claims a batch (skipping rows another run holds), then reports each result.
create function public.order_notifications_claim(batch integer) returns setof public.order_notifications language sql security invoker set search_path='' as $$
 update public.order_notifications n set status='sending',locked_at=now(),attempts=attempts+1
 where n.id in (select id from public.order_notifications
  where (status='pending' or (status='sending' and locked_at<now()-interval '10 minutes')) and attempts<5
  order by created_at limit least(greatest(batch,1),50) for update skip locked)
 returning n.*;
$$;
revoke all on function public.order_notifications_claim(integer) from public,anon,authenticated;
grant execute on function public.order_notifications_claim(integer) to service_role;
