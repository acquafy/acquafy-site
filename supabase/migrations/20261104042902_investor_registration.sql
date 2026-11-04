-- Public applications never grant Auth access or expose approved commercial terms.
create table public.investor_applications (
 id uuid primary key default gen_random_uuid(),
 full_name text not null check(length(full_name) between 2 and 160),
 email text not null check(length(email) between 3 and 254 and email=lower(email)),
 phone text not null check(length(phone) between 5 and 40),
 country text not null check(length(country) between 2 and 100),
 company text not null default '' check(length(company)<=160),
 message text not null default '' check(length(message)<=2000),
 source text not null default 'website_media_network' check(source='website_media_network'),
 consent_version text not null default 'investor-contact-v1',
 created_at timestamptz not null default now(),
 enrollment_id uuid unique references public.investor_enrollments(id),
 invited_at timestamptz
);
create index investor_applications_created on public.investor_applications(created_at desc);
create index investor_applications_email_created on public.investor_applications(email,created_at desc);
alter table public.investor_applications enable row level security;
revoke all on public.investor_applications from anon,authenticated;
grant select on public.investor_applications to authenticated;
grant all on public.investor_applications to service_role;
create policy applications_staff_read on public.investor_applications for select to authenticated using(portal_private.staff('admin'));

-- Only the server can submit. Advisory lock makes the global/email limits atomic across instances.
create function public.submit_investor_application(payload jsonb) returns void language plpgsql security invoker set search_path='' as $$
begin
 perform pg_advisory_xact_lock(941803211);
 if (select count(*) from public.investor_applications where created_at>now()-interval '1 hour')>=100 then
  raise exception 'Registration temporarily unavailable';
 end if;
 -- A repeat returns the same generic acknowledgement, without leaking existing applications.
 if exists(select 1 from public.investor_applications where email=lower(trim(payload->>'email')) and created_at>now()-interval '24 hours') then return; end if;
 insert into public.investor_applications(full_name,email,phone,country,company,message)
 values(trim(payload->>'full_name'),lower(trim(payload->>'email')),trim(payload->>'phone'),trim(payload->>'country'),coalesce(trim(payload->>'company'),''),coalesce(trim(payload->>'message'),''));
end;$$;
revoke all on function public.submit_investor_application(jsonb) from public,anon,authenticated;
grant execute on function public.submit_investor_application(jsonb) to service_role;

create function portal_private.invite_investor_application(application_id uuid,payload jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare a public.investor_applications; enrollment uuid;
begin
 if not portal_private.staff('admin') then raise exception 'Forbidden'; end if;
 select * into a from public.investor_applications where id=application_id for update;
 if not found or a.enrollment_id is not null then raise exception 'Application unavailable'; end if;
 enrollment:=portal_private.enrollment_staff('invite',payload||jsonb_build_object('email',a.email));
 update public.investor_applications set enrollment_id=enrollment,invited_at=now() where id=a.id;
 return enrollment;
end;$$;
revoke all on function portal_private.invite_investor_application(uuid,jsonb) from public,anon;
grant execute on function portal_private.invite_investor_application(uuid,jsonb) to authenticated;
create function public.invite_investor_application(application_id uuid,payload jsonb) returns uuid language sql security invoker set search_path='' as $$select portal_private.invite_investor_application(application_id,payload);$$;
revoke all on function public.invite_investor_application(uuid,jsonb) from public,anon;
grant execute on function public.invite_investor_application(uuid,jsonb) to authenticated;
