# Randolph Richards — Biblical Thoughts — randolphrichards.com

Personal site for E. Randolph Richards, journalist and author. Built with Next.js 16, Supabase, Resend, and Tailwind CSS v4.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.9 (Turbopack, App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Database | Supabase (PostgreSQL) |
| Email | Resend + React Email |
| Auth | JWT via `jose` (edge-compatible) |
| Animation | GSAP + VanillaTilt.js |
| Deployment | Vercel |

---

## Project Structure

```
richards-site/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── about/page.tsx          # About Randy
│   ├── books/
│   │   ├── page.tsx            # All books
│   │   └── [slug]/page.tsx     # Individual book page
│   ├── articles/
│   │   ├── page.tsx            # Full articles archive
│   │   └── [category]/page.tsx # Category filtered view
│   ├── contact/page.tsx        # Contact form
│   ├── admin/                  # Password-protected admin panel
│   │   ├── login/page.tsx      # Standalone login page
│   │   ├── articles/           # Manage articles
│   │   ├── books/              # Manage books
│   │   ├── subscribers/        # Subscriber list
│   │   ├── messages/           # Contact form submissions
│   │   └── settings/           # Site settings
│   └── api/                    # API routes
│       ├── subscribe/          # POST — subscribe
│       ├── unsubscribe/        # GET — unsubscribe via link
│       ├── contact/            # POST — contact form
│       └── admin/              # Admin CRUD endpoints
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── home/                   # Homepage sections
│   ├── books/                  # BookCard, QuoteDisplay
│   ├── articles/             # ArticleCard, CardStack, CategoryFilter
│   ├── subscribe/              # SubscribeForm
│   ├── contact/                # ContactForm
│   └── ui/                     # Button, Input, LoadingSpinner, ErrorMessage
├── emails/                     # React Email templates
│   ├── WelcomeEmail.tsx
│   ├── (no BroadcastEmail.tsx — see PROGRESS.md, that feature was removed)
│   └── ContactNotification.tsx
├── lib/
│   ├── auth/session.ts         # JWT helpers
│   ├── config/                 # Static seed data (articles, books)
│   ├── email/                  # Resend send functions
│   ├── supabase/               # Supabase clients
│   └── utils/                  # validateEmail
├── styles/globals.css          # Tailwind v4 + design tokens
├── types/                      # TypeScript types
├── proxy.ts                    # Edge auth proxy (replaces middleware in Next 16)
├── supabase-schema.sql         # Full DB schema
└── SETUP.md                    # Step-by-step environment setup
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/richards-site.git
cd richards-site
npm install --legacy-peer-deps
```

### 2. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=         # From Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # From Supabase project settings
SUPABASE_SERVICE_ROLE_KEY=        # From Supabase project settings (keep secret)
RESEND_API_KEY=                   # From resend.com dashboard
ADMIN_USERNAME=                   # Choose your admin login username
ADMIN_PASSWORD=                   # Choose a strong password
ADMIN_SESSION_SECRET=             # Random string, 32+ chars
NEXT_PUBLIC_SITE_URL=             # https://randolphrichards.com (or your Vercel URL)
AMAZON_ASSOCIATES_TAG=            # Optional — your Amazon affiliate tag
```

### 3. Set up the database

In your Supabase project, open the SQL editor and run `supabase-schema.sql` in full.

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Admin Panel

The admin panel lives at `/admin`. Access requires the credentials set in your environment variables.

| Section | Path | Purpose |
|---|---|---|
| Articles | `/admin/articles` | Add, edit, delete articles pieces |
| Books | `/admin/books` | Manage book listings |
| Subscribers | `/admin/subscribers` | View and manage email list |
| Messages | `/admin/messages` | Read contact form submissions |
| Settings | `/admin/settings` | Site-wide settings |

---

## Deploying to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Add all environment variables from `.env.local.example` under **Settings → Environment Variables**
4. Deploy

For the custom domain, go to **Settings → Domains** and add `randolphrichards.com`.

---

## Key Design Decisions

**No CMS lock-in.** Content lives in Supabase — fully owned, fully portable. Static seed data in `lib/config/` bootstraps the site before the DB is populated.

**Edge-safe auth.** `proxy.ts` uses `jose` for JWT verification at the edge. `jsonwebtoken` is Node.js-only and cannot run in Next.js proxy/middleware.

**Tailwind v4.** Uses `@import "tailwindcss"` and `@theme {}` in CSS rather than a `tailwind.config.js`. Design tokens are CSS custom properties so they work in both Tailwind utilities and inline styles.

**React Email.** Transactional emails (welcome email, contact notification) use typed React components rendered server-side via `@react-email/render`.

---

## Dependencies

```json
next@16.2.9
react@18
@supabase/supabase-js@latest
@react-email/components@latest
@react-email/render@latest
resend@latest
jose@latest
jsonwebtoken@latest
bcryptjs@latest
cookies-next@latest
react-hot-toast@latest
date-fns@latest
gsap@latest
vanilla-tilt@latest
@tailwindcss/postcss@latest
```

---

## What's Left to Build

- Homepage component split (extract `HeroSection`, `RecentWork`, `BooksShowcase`, `SubscribeSection`)
- Goodreads RSS feed + `ReviewCard` on book pages
- JSON-LD structured data on book pages
- Publication logos on About page (`/public/assets/publications/`)
- Drag-and-drop article reordering (`@dnd-kit/core`)
- Maintenance mode toggle
- Content migration (seed articles → Supabase)
- Lighthouse audit (target: 90+ all categories)
- DNS setup for `randolphrichards.com`
