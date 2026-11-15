-- ============================================================
-- PORTFOLIO + ADMIN PANEL — FULL SUPABASE SETUP
-- Run this whole file once in: Supabase Dashboard > SQL Editor
-- ============================================================

-- ---------- TABLES ----------

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  full_name text not null default 'Your Name',
  headline text not null default 'Full Stack Developer',
  bio text not null default 'Write a short intro about yourself here.',
  about_text text not null default 'Write a longer "About Me" text here from the admin panel.',
  email text not null default 'you@example.com',
  phone text not null default '',
  location text not null default '',
  resume_url text not null default '',
  avatar_url text not null default '',
  github_url text not null default '',
  linkedin_url text not null default '',
  twitter_url text not null default '',
  instagram_url text not null default '',
  accent_color text not null default '56 189 248',
  seo_title text not null default 'My Portfolio',
  seo_description text not null default 'Personal portfolio website',
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  image_url text not null default '',
  tags text[] not null default '{}',
  live_url text not null default '',
  repo_url text not null default '',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null default 'Other',
  level int not null default 80 check (level between 0 and 100),
  sort_order int not null default 0
);

create table if not exists public.experience (
  id bigint generated always as identity primary key,
  role text not null,
  company text not null default '',
  description text not null default '',
  start_date text not null default '',
  end_date text not null default '',
  is_current boolean not null default false,
  sort_order int not null default 0
);

create table if not exists public.testimonials (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null default '',
  quote text not null default '',
  sort_order int not null default 0
);

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text not null default '',
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- ROW LEVEL SECURITY ----------

alter table public.site_settings enable row level security;
alter table public.projects      enable row level security;
alter table public.skills        enable row level security;
alter table public.experience    enable row level security;
alter table public.testimonials  enable row level security;
alter table public.messages      enable row level security;

-- Public website can READ portfolio content
create policy "public read settings"     on public.site_settings for select using (true);
create policy "public read projects"     on public.projects     for select using (true);
create policy "public read skills"       on public.skills       for select using (true);
create policy "public read experience"   on public.experience   for select using (true);
create policy "public read testimonials" on public.testimonials for select using (true);

-- Only logged-in admin can change content
create policy "admin write settings"     on public.site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write projects"     on public.projects     for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write skills"       on public.skills       for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write experience"   on public.experience   for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Visitors can SEND messages, only admin can read/manage them
create policy "public send message" on public.messages for insert with check (true);
create policy "admin read messages"   on public.messages for select using (auth.role() = 'authenticated');
create policy "admin update messages" on public.messages for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin delete messages" on public.messages for delete using (auth.role() = 'authenticated');

-- ---------- STORAGE (images) ----------

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "public read images" on storage.objects for select
using (bucket_id = 'portfolio');

create policy "admin upload images" on storage.objects for insert
with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');

create policy "admin update images" on storage.objects for update
using (bucket_id = 'portfolio' and auth.role() = 'authenticated');

create policy "admin delete images" on storage.objects for delete
using (bucket_id = 'portfolio' and auth.role() = 'authenticated');

-- ---------- SEED SAMPLE DATA ----------

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

insert into public.projects (title, description, tags, live_url, repo_url, featured, sort_order) values
  ('Sample Project One', 'Short description of your first project. Edit or delete this from the admin panel.', '{"React","Supabase"}', 'https://example.com', 'https://github.com', true, 1),
  ('Sample Project Two', 'Short description of your second project.', '{"Next.js","Tailwind"}', '', 'https://github.com', false, 2)
on conflict do nothing;

insert into public.skills (name, category, level, sort_order) values
  ('JavaScript', 'Languages', 90, 1),
  ('TypeScript', 'Languages', 85, 2),
  ('React', 'Frontend', 90, 3),
  ('Next.js', 'Frontend', 85, 4),
  ('Node.js', 'Backend', 80, 5),
  ('PostgreSQL', 'Database', 75, 6)
on conflict do nothing;

insert into public.experience (role, company, description, start_date, end_date, is_current, sort_order) values
  ('Your Role', 'Company Name', 'What you did and achieved in this role.', 'Jan 2023', '', true, 1)
on conflict do nothing;

insert into public.testimonials (name, role, quote, sort_order) values
  ('Client Name', 'CEO, Company', 'A short testimonial quote goes here. Edit from admin panel.', 1)
on conflict do nothing;
