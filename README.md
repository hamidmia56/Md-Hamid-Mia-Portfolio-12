# Portfolio Website + Admin Panel

A complete, ready-to-deploy personal portfolio with a built-in admin panel.
Built with **Next.js 14**, **Tailwind CSS** and **Supabase** (database, auth,
image storage). Deploy it free on **Vercel**.

Everything on the website — name, bio, photo, skills, projects, experience,
testimonials, social links, accent color, SEO — is managed from the `/admin`
panel. No code changes needed after setup.

---

## 1. Create the Supabase backend (5 minutes)

1. Go to [supabase.com](https://supabase.com) → **New project** (free plan is fine).
2. Choose a name (e.g. `portfolio`), a strong database password, and a region near you.
3. When the project is ready, open **SQL Editor** → **New query**.
4. Open `supabase/schema.sql` from this repo, copy **the whole file**, paste it
   into the SQL editor and click **Run**.
   This creates all tables, security rules (RLS), the image storage bucket,
   and sample data.
5. Go to **Authentication → Providers → Email** and make sure it's enabled.
   (Optional: disable "Confirm email" for easier signup.)
6. Create your admin account: **Authentication → Users → Add user**.
   Enter your email + password and check **Auto Confirm User**.
   This email/password is what you'll use to log in at `/admin`.
7. Go to **Project Settings → API** and copy two values:
   - **Project URL**
   - **anon / public key**

## 2. Run locally (optional)

```bash
npm install
cp .env.example .env.local
# paste your Supabase URL and anon key into .env.local
npm run dev
```

- Website: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## 3. Deploy to Vercel (3 minutes)

1. Push this repo to GitHub (or ask your assistant to do it).
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected). Don't change build settings.
4. Under **Environment Variables**, add both:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon/public key |

5. Click **Deploy**. Done — your site is live at `https://your-project.vercel.app`.

Every future `git push` automatically redeploys the site.

> Note: the anon key is safe to expose in the browser — Row Level Security
> (already configured by `schema.sql`) makes portfolio content publicly
> readable, but only your logged-in admin account can change anything or read
> visitor messages.

## 4. Managing the website

Log in at **`your-domain.com/admin`** with the account created in step 1.7.

| Section | What you control |
|---|---|
| **Settings** | Name, photo, headline, bio, about text, email, phone, location, resume link, social links, accent color, SEO title/description |
| **Projects** | Add/edit/delete projects with images, tags, live & repo links, featured flag, ordering |
| **Skills** | Skills grouped by category with level bars and ordering |
| **Experience** | Work history timeline entries |
| **Testimonials** | Quotes from clients/colleagues |
| **Messages** | Contact-form submissions from visitors (read/unread, delete) |

Changes appear on the website within ~60 seconds (or instantly after a redeploy).

## Project structure

```
app/
  page.tsx                  # public portfolio (single page, all sections)
  admin/login/              # admin sign-in
  admin/(dashboard)/        # protected admin panel (sidebar layout)
    projects/ skills/ experience/ testimonials/ messages/ settings/
components/                 # public sections + admin widgets
lib/
  supabase/                 # Supabase browser & server clients
  data.ts                   # public data fetching with fallbacks
  types.ts                  # shared TypeScript types
supabase/schema.sql         # one-click database setup (run in SQL Editor)
middleware.ts               # protects all /admin routes
```
