-- Orders deliver to Brazil, the United States or other countries (address and phone formats are checked by the
-- portal, lib/orders/delivery.ts). Orders store delivery.country_code (BR | US | OTHER); older orders without it are
-- Brazilian. Installation windows are published per Brazilian UF, so only Brazilian addresses can book them.

create or replace function portal_private.installation_command(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
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
 if w.id is null or not w.active or w.starts_at<now()+interval '48 hours' or w.region is distinct from upper(o.delivery->>'state')
 -- Windows are per Brazilian UF: an address elsewhere never matches one (a US "PA" is not Pará).
 or coalesce(o.delivery->>'country_code','BR')<>'BR' then raise exception 'Window unavailable';end if;
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
