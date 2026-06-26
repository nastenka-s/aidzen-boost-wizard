
create policy "Service role manages pinterest objects"
on storage.objects for all
to service_role
using (bucket_id = 'pinterest')
with check (bucket_id = 'pinterest');
