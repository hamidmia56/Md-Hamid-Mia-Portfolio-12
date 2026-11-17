-- SECURITY ROLLBACK SNAPSHOT — captured 2026-11-17 before hardening
-- Restores the original RLS policies and table-level grants observed before changes.
-- Run only if rollback is required.

begin;

drop policy if exists "admin write settings" on public.site_settings;
drop policy if exists "public read settings" on public.site_settings;
drop policy if exists "admin write projects" on public.projects;
drop policy if exists "public read projects" on public.projects;
drop policy if exists "admin write skills" on public.skills;
drop policy if exists "public read skills" on public.skills;
drop policy if exists "admin write experience" on public.experience;
drop policy if exists "public read experience" on public.experience;
drop policy if exists "admin write testimonials" on public.testimonials;
drop policy if exists "public read testimonials" on public.testimonials;
drop policy if exists "admin read messages" on public.messages;
drop policy if exists "admin update messages" on public.messages;
drop policy if exists "admin delete messages" on public.messages;
drop policy if exists "public send message" on public.messages;
drop policy if exists "public read images" on storage.objects;
drop policy if exists "admin upload images" on storage.objects;
drop policy if exists "admin update images" on storage.objects;
drop policy if exists "admin delete images" on storage.objects;

create policy "public read settings" on public.site_settings for select using (true);
create policy "admin write settings" on public.site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "public read projects" on public.projects for select using (true);
create policy "admin write projects" on public.projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "public read skills" on public.skills for select using (true);
create policy "admin write skills" on public.skills for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "public read experience" on public.experience for select using (true);
create policy "admin write experience" on public.experience for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "public read testimonials" on public.testimonials for select using (true);
create policy "admin write testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "public send message" on public.messages for insert with check (true);
create policy "admin read messages" on public.messages for select using (auth.role() = 'authenticated');
create policy "admin update messages" on public.messages for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin delete messages" on public.messages for delete using (auth.role() = 'authenticated');
create policy "public read images" on storage.objects for select using (bucket_id = 'portfolio');
create policy "admin upload images" on storage.objects for insert with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "admin update images" on storage.objects for update using (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "admin delete images" on storage.objects for delete using (bucket_id = 'portfolio' and auth.role() = 'authenticated');

grant all privileges on table public.site_settings, public.projects, public.skills, public.experience, public.testimonials, public.messages to anon, authenticated;
grant all privileges on table storage.objects to anon, authenticated;

commit;
