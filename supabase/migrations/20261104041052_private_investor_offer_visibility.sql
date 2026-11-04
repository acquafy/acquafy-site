-- Published means eligible for staff invitations, not a public catalog of negotiated investor terms.
alter policy offers_read on public.investor_offers to authenticated using(
 portal_private.staff('admin') or exists(
 select 1 from public.investor_enrollments e where e.offer_id=investor_offers.id
 and e.user_id=(select auth.uid()) and portal_private.enrollment_owner(e.id))
);
