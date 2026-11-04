-- Storage deletion also needs SELECT visibility; permit administrators to clean failed unpublished uploads.
alter policy portal_file_read on storage.objects to authenticated using(
 bucket_id='portal-documents' and (portal_private.staff('admin') or exists(
 select 1 from public.documents d where d.object_path=name and portal_private.account_access(d.account_id)))
);
