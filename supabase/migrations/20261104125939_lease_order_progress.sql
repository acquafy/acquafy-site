create function portal_private.lease_order_progress() returns trigger language plpgsql security definer set search_path='' as $$begin
 update public.product_orders set status=case when new.status='review' then 'review' when new.status='ended' then 'completed' when new.installed_at is not null then 'installed' when new.status='active' then 'paid' when new.status='accepted' then 'accepted' else status end,updated_at=now()
 where lease_id=new.id and status not in ('cancelled','completed') and (new.status in ('review','ended','active','accepted') or new.installed_at is not null);
 return new;end;$$;
revoke all on function portal_private.lease_order_progress() from public,anon,authenticated;
create trigger lease_order_progress after update on public.customer_leases for each row execute function portal_private.lease_order_progress();
