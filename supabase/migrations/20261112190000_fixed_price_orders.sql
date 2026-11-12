-- Fixed-price orders (the Tesla-style flow). The customer places an order at the catalog price, in BRL or USD, and pays
-- an order fee; staff confirm availability and the delivery estimate; the customer pays the balance before delivery.
-- Orders created by the quote flow ('requested' → 'quoted' → 'accepted') keep working unchanged (flow = 'quote').

-- One row of commercial settings: the site's fixed exchange rate and the order fee per currency.
create table public.order_settings(
 id boolean primary key default true check(id),
 brl_per_usd numeric(8,4) not null check(brl_per_usd>0),
 fee_usd_minor integer not null check(fee_usd_minor>=50),
 fee_brl_minor integer not null check(fee_brl_minor>=50),
 -- Days after placing an order in which the customer may cancel and get the fee back (CDC art. 49).
 withdrawal_days integer not null check(withdrawal_days between 0 and 90)
);
insert into public.order_settings values(true,5,2500,12500,7);
alter table public.order_settings enable row level security;
revoke all on public.order_settings from anon,authenticated;
grant select on public.order_settings to anon,authenticated;
grant all on public.order_settings to service_role;
create policy order_settings_read on public.order_settings for select to anon,authenticated using(true);

-- Monthly lease price (36 months), as the website shows it: 10% of the purchase price.
alter table public.order_products add column lease_minor integer check(lease_minor>=50);
update public.order_products set lease_minor=unit_minor/10;

alter table public.product_orders drop constraint product_orders_status_check;
alter table public.product_orders add constraint product_orders_status_check check(status in
 ('requested','quoted','accepted','awaiting_fee','placed','confirmed','paid','processing','shipped','installed','completed','cancelled','review'));
alter table public.product_orders
 add column flow text not null default 'quote' check(flow in ('quote','fixed')),
 add column currency text not null default 'usd' check(currency in ('usd','brl')),
 add column fee_minor integer check(fee_minor>=50),
 add column placed_at timestamptz,
 add column confirmed_at timestamptz,
 add column delivery_estimate text check(length(delivery_estimate) between 3 and 200);

alter table public.customer_leases add column currency text not null default 'usd' check(currency in ('usd','brl'));

-- Each charge of a fixed-price order: the order fee, then the balance (purchases only).
create table public.order_payments(
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.product_orders(id),
 kind text not null check(kind in ('fee','balance')),
 currency text not null check(currency in ('usd','brl')),
 amount_minor integer not null check(amount_minor between 50 and 99999999),
 status text not null default 'open' check(status in ('open','failed','paid','refunding','refunded','void','review')),
 checkout_id text unique,payment_intent_id text unique,
 paid_minor integer check(paid_minor>=0),discount_minor integer not null default 0 check(discount_minor>=0),promotion text,
 created_at timestamptz not null default now(),updated_at timestamptz not null default now(),
 unique(order_id,kind)
);
alter table public.order_payments enable row level security;
revoke all on public.order_payments from anon,authenticated;
grant select on public.order_payments to authenticated;
grant all on public.order_payments to service_role;
create policy order_payments_read on public.order_payments for select to authenticated using(exists(select 1 from public.product_orders o where o.id=order_payments.order_id and (portal_private.staff('admin') or (o.user_id=(select auth.uid()) and portal_private.account_access(o.account_id)))));
create trigger audit_order_payment after insert or update on public.order_payments for each row execute function portal_private.audit_change();

create or replace function portal_private.order_command(action text,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare o public.product_orders;account uuid;line jsonb;snapshot jsonb:='[]';p public.order_products;result uuid;l uuid;
 s public.order_settings;unit bigint;qty integer;total bigint:=0;fee integer;
begin
 if action in ('request','place') then
 if not portal_private.approved() then raise exception 'Verified account required';end if;
 select m.account_id into account from public.account_memberships m join public.accounts a on a.id=m.account_id where m.user_id=auth.uid() and m.active and m.role='owner' and a.status='active' order by m.created_at limit 1;
 if account is null or coalesce(payload->>'kind','') not in ('purchase','lease') or coalesce(jsonb_array_length(payload->'items'),0) not between 1 and 30 or length(coalesce(payload->'delivery'->>'name','')) not between 3 and 160 or length(coalesce(payload->'delivery'->>'address','')) not between 5 and 500 or length(coalesce(payload->'delivery'->>'phone','')) not between 5 and 40 then raise exception 'Invalid order';end if;
 if (select count(*) from public.product_orders where user_id=auth.uid() and created_at>now()-interval '1 hour')>=10 then raise exception 'Order limit reached';end if;
 if action='place' then
 -- Fixed price: the server prices every line from the catalog; nothing the browser sends is trusted as a price.
 if coalesce(payload->>'currency','') not in ('usd','brl') or payload->>'terms' is distinct from 'yes' then raise exception 'Invalid order';end if;
 select * into s from public.order_settings;
 for line in select * from jsonb_array_elements(payload->'items') loop
 select * into p from public.order_products where id=line->>'product' and enabled;
 qty:=coalesce((line->>'quantity')::integer,0);
 unit:=case when payload->>'kind'='lease' then p.lease_minor else p.unit_minor end;
 if p.id is null or unit is null or qty not between 1 and 100 or length(coalesce(line->>'color',''))>80 then raise exception 'Invalid product';end if;
 if payload->>'currency'='brl' then unit:=round(unit*s.brl_per_usd);end if;
 total:=total+unit*qty;
 snapshot:=snapshot||jsonb_build_array(jsonb_build_object('product',p.id,'title',p.title,'quantity',qty,'color',line->>'color','unit_minor',unit,'catalog_unit_minor',p.unit_minor));
 end loop;
 fee:=case when payload->>'currency'='brl' then s.fee_brl_minor else s.fee_usd_minor end;
 if total>99999999 or (payload->>'kind'='purchase' and total<=fee) then raise exception 'Invalid order';end if;
 insert into public.product_orders(account_id,user_id,kind,items,delivery,flow,currency,total_minor,fee_minor,status,signer,accepted_at,evidence_hash)
 values(account,auth.uid(),payload->>'kind',snapshot,payload->'delivery','fixed',payload->>'currency',total,fee,'awaiting_fee',trim(payload->'delivery'->>'name'),now(),
 encode(sha256(convert_to(snapshot::text||(payload->'delivery')::text||total::text||fee::text||(payload->>'currency')||auth.uid()::text,'UTF8')),'hex'))
 returning id into result;
 insert into public.order_payments(order_id,kind,currency,amount_minor)values(result,'fee',payload->>'currency',fee);
 return result;
 end if;
 for line in select * from jsonb_array_elements(payload->'items') loop
 select * into p from public.order_products where id=line->>'product' and enabled;
 if p.id is null or coalesce((line->>'quantity')::integer,0) not between 1 and 100 or length(coalesce(line->>'color',''))>80 then raise exception 'Invalid product';end if;
 snapshot:=snapshot||jsonb_build_array(jsonb_build_object('product',p.id,'title',p.title,'quantity',(line->>'quantity')::integer,'color',line->>'color','catalog_unit_minor',p.unit_minor));
 end loop;
 insert into public.product_orders(account_id,user_id,kind,items,delivery)values(account,auth.uid(),payload->>'kind',snapshot,payload->'delivery')returning id into result;return result;
 end if;
 select * into o from public.product_orders where id=(payload->>'order_id')::uuid for update;
 if o.id is null then raise exception 'Order unavailable';end if;
 if action='cancel' and o.flow='fixed' then
 -- Cancellable until preparation starts: before the fee, after it, after confirmation and after the balance ('paid'),
 -- and for leases after the agreement is accepted ('accepted') but before the first monthly charge.
 -- The customer may cancel before paying the fee or within the withdrawal period; staff may cancel any time in these states.
 -- Every payment already made is refunded.
 select * into s from public.order_settings;
 if o.status not in ('awaiting_fee','placed','confirmed','accepted','paid')
 or not ((o.user_id=auth.uid() and portal_private.account_access(o.account_id) and (o.status='awaiting_fee' or o.placed_at>now()-make_interval(days=>s.withdrawal_days)))
 or portal_private.staff('admin')) then raise exception 'Cancellation unavailable';end if;
 if o.lease_id is not null and exists(select 1 from public.customer_leases where id=o.lease_id and (status not in ('offered','accepted') or subscription_id is not null)) then raise exception 'Cancellation unavailable';end if;
 update public.product_orders set status='cancelled',updated_at=now() where id=o.id;
 if o.lease_id is not null then
 delete from public.lease_units where lease_id=o.lease_id;
 update public.customer_leases set status='ended' where id=o.lease_id;
 end if;
 update public.order_payments set status=case when status='paid' then 'refunding' else 'void' end,updated_at=now() where order_id=o.id and status in ('open','failed','paid');
 elsif action='accept' then
 if o.user_id<>auth.uid() or not portal_private.account_access(o.account_id) or o.status<>'quoted' or payload->>'consent' is distinct from 'yes' or coalesce(length(trim(payload->>'signer')),0) not between 3 and 160 then raise exception 'Consent required';end if;
 if o.kind='lease' then raise exception 'Accept the linked lease agreement';end if;
 update public.product_orders set status='accepted',signer=trim(payload->>'signer'),accepted_at=now(),evidence_hash=encode(sha256(convert_to(o.items::text||o.delivery::text||o.total_minor::text||o.quote_text||trim(payload->>'signer'),'UTF8')),'hex'),updated_at=now() where id=o.id;
 elsif action='cancel' and o.user_id=auth.uid() and o.status in ('requested','quoted','accepted') and o.checkout_id is null and o.lease_id is null then update public.product_orders set status='cancelled',updated_at=now() where id=o.id;
 else
 if not portal_private.staff('admin') then raise exception 'Staff access required';end if;
 if action='quote' and o.flow='quote' and o.status='requested' and payload->>'approved'='yes' and coalesce(length(trim(payload->>'quote_text')),0) between 100 and 100000 then
 if o.kind='lease' then
 l:=portal_private.lease_command('create',jsonb_build_object('account_id',o.account_id,'title','Locação · '||o.id,'agreement_text',payload->>'quote_text','monthly_minor',payload->>'total_minor','share_bps',payload->>'share_bps','location',o.delivery->>'address','approved','yes'));
 end if;
 update public.product_orders set total_minor=(payload->>'total_minor')::integer,quote_text=trim(payload->>'quote_text'),lease_id=l,status='quoted',updated_at=now() where id=o.id;
 elsif action='confirm' and o.flow='fixed' and o.status='placed' and coalesce(length(trim(payload->>'delivery_estimate')),0) between 3 and 200 then
 -- Staff confirm availability and the delivery estimate. A purchase then owes the balance; a lease gets its agreement at the catalog monthly price.
 if o.kind='lease' then
 l:=portal_private.lease_command('create',jsonb_build_object('account_id',o.account_id,'title','Locação · '||o.id,'agreement_text',payload->>'agreement_text','monthly_minor',o.total_minor,'share_bps',payload->>'share_bps','location',o.delivery->>'address','approved','yes'));
 update public.customer_leases set currency=o.currency where id=l;
 else
 insert into public.order_payments(order_id,kind,currency,amount_minor)values(o.id,'balance',o.currency,o.total_minor-o.fee_minor);
 end if;
 update public.product_orders set status='confirmed',confirmed_at=now(),delivery_estimate=trim(payload->>'delivery_estimate'),lease_id=l,updated_at=now() where id=o.id;
 elsif action='fulfill' and o.status in ('paid','processing','shipped','installed') and payload->>'status' in ('processing','shipped','installed','completed') and array_position(array['paid','processing','shipped','installed','completed'],payload->>'status')>array_position(array['paid','processing','shipped','installed','completed'],o.status) then
 if payload->>'status'='shipped' and coalesce(length(payload->>'tracking_reference'),0)<3 then raise exception 'Tracking required';end if;
 update public.product_orders set status=payload->>'status',tracking_reference=left(payload->>'tracking_reference',300),updated_at=now() where id=o.id;
 else raise exception 'Invalid transition';end if;
 end if;return o.id;
end;$$;

-- Binds a Stripe Checkout session to a payment before the customer is sent to it (server only).
create function public.order_payment_bind(payload jsonb) returns void language plpgsql security invoker set search_path='' as $$
declare pay public.order_payments;
begin
 select * into pay from public.order_payments where id=(payload->>'payment_id')::uuid for update;
 if pay.id is null or pay.status not in ('open','failed') or payload->>'session_id' is null then raise exception 'Payment unavailable';end if;
 -- Compare-and-set: a replacement session binds only over the session the server checked, never over a newer one.
 if pay.checkout_id is distinct from nullif(payload->>'previous_session_id','') then raise exception 'Payment changed';end if;
 update public.order_payments set checkout_id=payload->>'session_id',status='open',updated_at=now() where id=pay.id;
end;$$;
revoke all on function public.order_payment_bind(jsonb) from public,anon,authenticated;
grant execute on function public.order_payment_bind(jsonb) to service_role;

-- Applies a verified Stripe event to a payment and moves the order (server only).
-- state: paid | failed | refunded | disputed. Paid and failed events must match the bound session, amount and currency.
create function public.order_payment_event(payload jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
declare pay public.order_payments;o public.product_orders;state text:=payload->>'state';paid integer;discount integer;
begin
 select * into pay from public.order_payments where id=(payload->>'payment_id')::uuid for update;
 if pay.id is null then raise exception 'Unknown payment';end if;
 select * into o from public.product_orders where id=pay.order_id for update;
 if state in ('paid','failed') and (pay.checkout_id is distinct from payload->>'session_id' or (payload->>'subtotal_minor')::integer is distinct from pay.amount_minor or payload->>'currency' is distinct from pay.currency) then raise exception 'Payment mismatch';end if;
 if state='paid' then
 if pay.status in ('paid','refunding','refunded','review') then return pay.id;end if;
 paid:=(payload->>'paid_minor')::integer;discount:=coalesce((payload->>'discount_minor')::integer,0);
 if paid is null or paid<0 or discount<0 or paid<>pay.amount_minor-discount or (pay.kind='fee' and discount<>0) then raise exception 'Payment mismatch';end if;
 update public.order_payments set status='paid',payment_intent_id=payload->>'payment_intent_id',paid_minor=paid,discount_minor=discount,promotion=payload->>'promotion',updated_at=now() where id=pay.id;
 if pay.kind='fee' and o.status='awaiting_fee' then
 update public.product_orders set status='placed',placed_at=now(),updated_at=now() where id=o.id;
 elsif pay.kind='balance' and o.status='confirmed' then
 update public.product_orders set status='paid',paid_minor=(select sum(paid_minor) from public.order_payments where order_id=o.id and status='paid'),discount_minor=discount,promotion=payload->>'promotion',updated_at=now() where id=o.id;
 else
 -- Paid after a cancellation or out of order: staff must review and refund.
 update public.order_payments set status='review' where id=pay.id;
 update public.product_orders set status='review',updated_at=now() where id=o.id;
 end if;
 elsif state='failed' then
 if pay.status='open' then update public.order_payments set status='failed',updated_at=now() where id=pay.id;end if;
 elsif state='refunded' and pay.status='refunded' then
 return pay.id;
 elsif state='refunded' and payload->>'full'='yes' and (pay.status='refunding' or o.status='cancelled') then
 update public.order_payments set status='refunded',updated_at=now() where id=pay.id;
 elsif state in ('refunded','disputed') then
 update public.order_payments set status='review',updated_at=now() where id=pay.id;
 if o.status<>'cancelled' then update public.product_orders set status='review',updated_at=now() where id=o.id;end if;
 else raise exception 'Invalid payment event';end if;
 return pay.id;
end;$$;
revoke all on function public.order_payment_event(jsonb) from public,anon,authenticated;
grant execute on function public.order_payment_event(jsonb) to service_role;

-- Lease receipts and investor revenue carry the currency of their lease (BRL leases come from orders placed in Brazil).
alter table public.lease_receipts add column currency text not null default 'usd' check(currency in ('usd','brl'));
alter table public.lease_revenue add column currency text not null default 'usd' check(currency in ('usd','brl'));
create function portal_private.lease_receipt_currency() returns trigger language plpgsql security definer set search_path='' as $$begin
 new.currency:=(select currency from public.customer_leases where id=new.lease_id);return new;end;$$;
revoke all on function portal_private.lease_receipt_currency() from public,anon,authenticated;
create trigger lease_receipt_currency before insert on public.lease_receipts for each row execute function portal_private.lease_receipt_currency();
create function portal_private.lease_revenue_currency() returns trigger language plpgsql security definer set search_path='' as $$begin
 new.currency:=(select currency from public.lease_receipts where invoice_id=new.invoice_id);return new;end;$$;
revoke all on function portal_private.lease_revenue_currency() from public,anon,authenticated;
create trigger lease_revenue_currency before insert on public.lease_revenue for each row execute function portal_private.lease_revenue_currency();
