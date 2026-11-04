-- Expose invoker wrappers; keep privilege escalation implementations outside the Data API.
alter function public.portal_admin(text,jsonb) set schema portal_private;
alter function public.portal_ticket(text,jsonb) set schema portal_private;
create function public.portal_admin(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$ select portal_private.portal_admin(action,payload); $$;
create function public.portal_ticket(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$ select portal_private.portal_ticket(action,payload); $$;
revoke all on function public.portal_admin(text,jsonb),public.portal_ticket(text,jsonb) from public,anon;
grant execute on function public.portal_admin(text,jsonb),public.portal_ticket(text,jsonb) to authenticated;
alter function public.portal_summary(uuid) security invoker;

alter table public.audit_events add column account_id uuid references public.accounts(id), add column changed_fields jsonb;
create or replace function portal_private.audit_change() returns trigger language plpgsql security definer set search_path='' as $$
 declare record jsonb:=to_jsonb(new); begin
 insert into public.audit_events(actor_id,entity,entity_id,operation,account_id,changed_fields) values(auth.uid(),tg_table_name,
 coalesce(record->>'id',record->>'user_id'),tg_op,
 case when tg_table_name='accounts' then (record->>'id')::uuid else (record->>'account_id')::uuid end,
 jsonb_strip_nulls(jsonb_build_object('status',record->'status','amount',record->'amount','settled_on',record->'settled_on','role',record->'role','active',record->'active','user_id',record->'user_id')));
 return new; end;
$$;
revoke all on function portal_private.audit_change() from public;
