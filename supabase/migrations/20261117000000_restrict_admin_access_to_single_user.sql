-- Limit all administrative writes to the single provisioned owner account.
begin;

drop policy if exists "admin write settings" on public.site_settings;
drop policy if exists "admin write projects" on public.projects;
drop policy if exists "admin write skills" on public.skills;
drop policy if exists "admin write experience" on public.experience;
drop policy if exists "admin write testimonials" on public.testimonials;
drop policy if exists "admin read messages" on public.messages;
drop policy if exists "admin update messages" on public.messages;
drop policy if exists "admin delete messages" on public.messages;
drop policy if exists "admin upload images" on storage.objects;
drop policy if exists "admin update images" on storage.objects;
drop policy if exists "admin delete images" on storage.objects;

create policy "admin write settings" on public.site_settings for all to authenticated
using ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid)
with check ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);
create policy "admin write projects" on public.projects for all to authenticated
using ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid)
with check ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);
create policy "admin write skills" on public.skills for all to authenticated
using ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid)
with check ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);
create policy "admin write experience" on public.experience for all to authenticated
using ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid)
with check ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);
create policy "admin write testimonials" on public.testimonials for all to authenticated
using ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid)
with check ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);

create policy "admin read messages" on public.messages for select to authenticated
using ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);
create policy "admin update messages" on public.messages for update to authenticated
using ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid)
with check ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);
create policy "admin delete messages" on public.messages for delete to authenticated
using ((select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);

create policy "admin upload images" on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio' and (select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);
create policy "admin update images" on storage.objects for update to authenticated
using (bucket_id = 'portfolio' and (select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid)
with check (bucket_id = 'portfolio' and (select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);
create policy "admin delete images" on storage.objects for delete to authenticated
using (bucket_id = 'portfolio' and (select auth.uid()) = '5609ff26-5d6a-429d-9881-aabe8eebede5'::uuid);

revoke all privileges on table public.site_settings, public.projects, public.skills,
  public.experience, public.testimonials, public.messages from anon;
grant select on table public.site_settings, public.projects, public.skills,
  public.experience, public.testimonials to anon;
grant insert on table public.messages to anon;

revoke all privileges on table public.site_settings, public.projects, public.skills,
  public.experience, public.testimonials, public.messages from authenticated;
grant select, insert, update, delete on table public.site_settings, public.projects,
  public.skills, public.experience, public.testimonials, public.messages to authenticated;

revoke all privileges on table storage.objects from anon;
grant select on table storage.objects to anon;
revoke all privileges on table storage.objects from authenticated;
grant select, insert, update, delete on table storage.objects to authenticated;

commit;
