-- P3 · Trade-in (Tesla's trade-in step), as the homepage promises: "Seu purificador antigo vale um UP" — a flat
-- R$ 100 (US$ 20) off the balance of a Neo UP purchase for handing in an old purifier at installation.
-- The customer declares it while the order is placed (before Acquafy confirms); the credit comes off the balance when
-- staff confirm; the technician checks the old unit at installation and staff record the result.

alter table public.order_settings
 add column trade_in_brl_minor integer not null default 10000 check(trade_in_brl_minor>=0),
 add column trade_in_usd_minor integer not null default 2000 check(trade_in_usd_minor>=0),
 add column trade_in_products text[] not null default '{neo-up}';

alter table public.product_orders
 add column trade_in jsonb,
 add column trade_in_minor integer not null default 0 check(trade_in_minor>=0),
 add column trade_in_status text check(trade_in_status in ('declared','received','missing'));

create function portal_private.order_trade_in(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare o public.product_orders;s public.order_settings;
begin
 select * into o from public.product_orders where id=(payload->>'order_id')::uuid for update;
 if o.id is null then raise exception 'Order unavailable';end if;
 if action in ('declare','remove') then
 -- The owner, on a purchase not yet confirmed (the balance does not exist yet), with an eligible product.
 if o.user_id<>auth.uid() or not portal_private.account_access(o.account_id) or o.flow<>'fixed' or o.kind<>'purchase' or o.status not in ('awaiting_fee','placed')
 or exists(select 1 from public.order_payments where order_id=o.id and kind='balance') then raise exception 'Trade-in locked';end if;
 if action='remove' then
 update public.product_orders set trade_in=null,trade_in_minor=0,trade_in_status=null,updated_at=now() where id=o.id;
 return o.id;
 end if;
 select * into s from public.order_settings;
 if not exists(select 1 from jsonb_array_elements(o.items) i where i->>'product'=any(s.trade_in_products)) then raise exception 'Trade-in unavailable';end if;
 -- The credit must leave a payable balance (Stripe minimum), whatever fee and credit the settings hold.
 if o.total_minor-coalesce(o.fee_minor,0)-(case when o.currency='brl' then s.trade_in_brl_minor else s.trade_in_usd_minor end)<50 then raise exception 'Trade-in unavailable';end if;
 if length(coalesce(trim(payload->>'brand'),'')) not between 2 and 80 or length(coalesce(trim(payload->>'model'),'')) > 80 or coalesce((payload->>'years')::integer,0) not between 0 and 50 then raise exception 'Invalid trade-in';end if;
 update public.product_orders set
  trade_in=jsonb_build_object('brand',trim(payload->>'brand'),'model',trim(coalesce(payload->>'model','')),'years',(payload->>'years')::integer),
  trade_in_minor=case when o.currency='brl' then s.trade_in_brl_minor else s.trade_in_usd_minor end,
  trade_in_status='declared',updated_at=now()
 where id=o.id;
 return o.id;
 elsif action='verify' then
 -- Staff record what the technician found at installation.
 if not portal_private.staff('admin') or o.trade_in_status is null or o.status not in ('paid','processing','shipped','installed','completed') or coalesce(payload->>'result','') not in ('received','missing') then raise exception 'Invalid verification';end if;
 update public.product_orders set trade_in_status=payload->>'result',updated_at=now() where id=o.id;
 return o.id;
 end if;
 raise exception 'Invalid command';
end;$$;
revoke all on function portal_private.order_trade_in(text,jsonb) from public,anon;
grant execute on function portal_private.order_trade_in(text,jsonb) to authenticated;
create function public.order_trade_in(action text,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.order_trade_in(action,payload);$$;
revoke all on function public.order_trade_in(text,jsonb) from public,anon;
grant execute on function public.order_trade_in(text,jsonb) to authenticated;

-- The credit comes off the balance when staff confirm (order_command 'confirm' creates the balance payment).
create function portal_private.balance_trade_in() returns trigger language plpgsql security definer set search_path='' as $$
declare credit integer;
begin
 if new.kind='balance' then
 select trade_in_minor into credit from public.product_orders where id=new.order_id;
 if new.amount_minor-coalesce(credit,0)<50 then raise exception 'Trade-in exceeds balance';end if;
 new.amount_minor:=new.amount_minor-coalesce(credit,0);
 end if;
 return new;
end;$$;
revoke all on function portal_private.balance_trade_in() from public,anon,authenticated;
create trigger balance_trade_in before insert on public.order_payments for each row execute function portal_private.balance_trade_in();

-- E-mails show the balance after the trade-in credit: the queued snapshot carries it.
create or replace function portal_private.queue_order_notification(order_ref uuid,kind text,extra jsonb default '{}') returns void language plpgsql security definer set search_path='' as $$
declare email text;snapshot jsonb;
begin
 select u.email,jsonb_build_object('id',o.id,'kind',o.kind,'currency',o.currency,'total_minor',o.total_minor,'fee_minor',o.fee_minor,'trade_in_minor',o.trade_in_minor,
  'delivery_estimate',o.delivery_estimate,'tracking_reference',o.tracking_reference,'items',o.items)||extra
 into email,snapshot from public.product_orders o join auth.users u on u.id=o.user_id where o.id=order_ref and o.flow='fixed';
 if email is not null then insert into public.order_notifications(order_id,kind,to_email,payload)values(order_ref,kind,email,snapshot);end if;
end;$$;
