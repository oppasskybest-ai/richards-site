# Randolph Richards — Biblical Thoughts — Setup Guide

## Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Styling**: Tailwind CSS + inline styles
- **Auth**: JWT (cookie + sessionStorage)
- **Hosting**: Vercel (recommended)

---

## 1. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the entire contents of `supabase-schema.sql`
3. Copy your project URL and API keys from **Settings → API**

---

## 2. Resend Setup

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your domain (`randolphrichards.com`)
3. Create an API key
4. Update the **from email** in `lib/email/sendWelcomeEmail.ts` if needed

---

## 3. Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase project settings
- `SUPABASE_SERVICE_ROLE_KEY` — from Supabase project settings (keep secret!)
- `RESEND_API_KEY` — from Resend dashboard
- `ADMIN_USERNAME` — your chosen admin username
- `ADMIN_PASSWORD` — a strong password (min 12 chars recommended)
- `ADMIN_SESSION_SECRET` — any long random string (32+ chars)

---

## 4. Assets

Place the following files in `public/assets/images/`:

```
books/
  tickled.jpg
  the-golden-passport.jpg
  the-firm.jpg
  last-man-standing.jpg
  the-ceo.jpg

portraits/
  speaking-photo.jpg

misc/
  favicon.ico
```

These can be sourced from the original `randolphrichards.com` scraped assets.

---

## 5. Install & Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## 6. Admin Panel

Go to `/admin`. Default credentials are set via env vars:
- Username: value of `ADMIN_USERNAME`
- Password: value of `ADMIN_PASSWORD`

### What the admin panel does:
- **Articles** — Add, edit, delete journalism pieces (overrides static config)
- **Books** — View the static book configuration
- **Subscribers** — View, search, export active/unsubscribed list
- **Broadcasts** — Compose and send email newsletters to all active subscribers
- **Messages** — Read and reply to contact form submissions
- **Settings** — View site config and env var requirements

---

## 7. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all `.env.local` variables in your Vercel project's Environment Variables settings.

---

## 8. Article Data

The site ships with ~60 seed articles in `lib/config/articles.ts` pulled from the original Randy Project site. These render immediately without any database setup.

To use the database instead (for live CMS editing):
- Add articles via `/admin/articles`
- The API routes at `/api/admin/articles` read from Supabase, overriding the static config

---

## Folder Structure

```
app/
  page.tsx              — Homepage
  about/page.tsx        — About
  books/
    page.tsx            — All books
    [slug]/page.tsx     — Individual book
  journalism/
    page.tsx            — All journalism
    [category]/page.tsx — Category filtered view
  contact/page.tsx      — Contact form
  admin/
    layout.tsx          — Admin shell + login
    page.tsx            — Dashboard
    articles/page.tsx
    books/page.tsx
    subscribers/page.tsx
    broadcasts/page.tsx
    messages/page.tsx
    settings/page.tsx
  api/                  — All API routes

components/
  layout/               — Navbar, Footer
  journalism/           — ArticleCard, CardStack, CategoryFilter
  books/                — BookCard, QuoteDisplay
  subscribe/            — SubscribeForm
  contact/              — ContactForm

lib/
  supabase/             — Supabase client + admin client
  auth/                 — JWT session utilities
  email/                — Resend email functions
  config/               — Static articles + books data
  utils/                — slugify, validateEmail, formatDate

types/                  — TypeScript interfaces
public/assets/          — Images
supabase-schema.sql     — Database schema
```
