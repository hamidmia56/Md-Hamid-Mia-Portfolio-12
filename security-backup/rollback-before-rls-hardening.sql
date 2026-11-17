-- SECURITY ROLLBACK SNAPSHOT
-- Captured 2026-11-17 before single-admin RLS hardening.
-- Restore only if intentionally rolling back the security policy/grant changes.
-- This is NOT a full database/data backup.

-- Original public table grants observed before hardening:
GRANT ALL PRIVILEGES ON TABLE public.site_settings, public.projects, public.skills, public.experience, public.testimonials, public.messages TO anon, authenticated;

-- Original public content policies:
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "public read experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT USING (true);

-- Original authenticated-role policies (restored as recorded):
CREATE POLICY "admin write settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin write projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin write skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin write experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin write testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "public send message" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read messages" ON public.messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admin update messages" ON public.messages FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "admin delete messages" ON public.messages FOR DELETE USING (auth.role() = 'authenticated');

-- Original Storage policies:
CREATE POLICY "public read images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "admin upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "admin update images" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "admin delete images" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Existing table RLS was enabled on all six public tables before hardening.
