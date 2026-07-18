# SUPABASE.md — Everything about the database, in one place

This is the only doc you need for anything Supabase-related. The only SQL
file in the project is `supabase-schema.sql`, in the project root — it
creates every table, index, and security policy in one run.

---

## 1. One-time setup

1. Create a project at [supabase.com](https://supabase.com) (free tier is
   enough for this site's traffic).
2. Go to **SQL Editor** → paste the entire contents of `supabase-schema.sql`
   → **Run**. That's it — one file, one run. It's safe to run more than
   once; every statement is written to no-op if it already exists.
3. Go to **Settings → API** and copy three values into `.env.local`
   (copy `.env.local.example` to `.env.local` first):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` — keep this one secret, never put it in
     anything with `NEXT_PUBLIC_` in front, never commit it. It has full
     read/write access to every table, bypassing all security rules below.
4. Log into `/admin`, go to **Settings**, click **Run Seed**. This loads
   the 4 real books and 10 real articles that already live in
   `lib/config/books.ts` and `lib/config/articles.ts`. See section 4 below
   for exactly what this does and why it's safe to click more than once.

---

## 2. What's in the database — table by table

| Table              | What it's for                                            | Falls back to static config if empty? |
|---------------------|-----------------------------------------------------------|----------------------------------------|
| `books`             | The 4 books, editable at `/admin/books`                   | Yes — `lib/config/books.ts`            |
| `articles`          | The 10 articles, editable at `/admin/articles`             | Yes — `lib/config/articles.ts`         |
| `events`            | Conferences/talks, editable at `/admin/events`             | No                                      |
| `subscribers`       | Email signups from the site footer/popup                   | No                                      |
| `contact_messages`  | Submissions from `/contact` (also emailed via Resend)       | No                                      |
| `settings`          | A few site-wide text fields (currently barely used)         | No                                      |
| `comments`          | Comments on native articles                                 | No                                      |
| `reviews`           | Homepage/Endorsements testimonials                          | No                                      |
| `book_reviews`      | Reader reviews shown on each book's page                    | No                                      |

**"Falls back to static config" means:** if Supabase isn't set up yet, or
the table is empty, the public site still works and shows the real content
from `lib/config/`. This is why the site displayed correctly in every build
check in this project even before a live Supabase project existed — worth
knowing so it's not surprising.

---

## 3. Security (Row Level Security / RLS)

Every table has RLS turned on. There are exactly two kinds of access:

- **Public (anonymous) visitors** can only:
  - `INSERT` into `subscribers` (the signup form) and `contact_messages`
    (the contact form) — nothing else.
  - `SELECT` from `articles`/`comments`/`reviews`/`book_reviews` where
    `status = 'published'` or `'approved'` (drafts and pending items are
    invisible to the public), and freely from `books`/`events`.
- **The admin panel** uses the service role key server-side
  (`lib/supabase/server.ts`), which bypasses RLS entirely. All the actual
  public-facing pages (Home, Articles, Books, etc.) also currently read
  through this same service-role client rather than the anon key — this
  is safe because that code only ever runs on the server (Next.js Server
  Components, no `'use client'` directive), so the key is never sent to
  the browser. The RLS rules above still apply as a second layer of
  protection in case that ever changes.

---

## 4. How the "Run Seed" button works (Admin → Settings)

This is the same idempotent seed system from the base project, verified
end-to-end for this one:

1. It reads every existing `slug` already in the `articles` and `books`
   tables.
2. For each of the 10 articles / 4 books in `lib/config/`, it checks: is
   this slug already in the database? If yes, it's skipped — untouched,
   even if you've since edited it in the admin panel. If no, it's
   inserted.
3. Click it again any time (after adding more entries to `lib/config/`,
   for example) and only the genuinely new ones get added. Nothing is
   ever overwritten or duplicated.

You'll see a summary like `Seeded 10 articles (0 already existed, 0
errors) and 4 books (0 already existed, 0 errors)` — the numbers tell you
exactly what happened.

---

## 5. What's deliberately NOT here

No cron jobs, no scheduled sends, no automated email workflows of any
kind. An earlier version of this codebase (inherited from a different
client's project) had a full pg_cron-based system that auto-emailed every
subscriber whenever a book/article/event was published, plus a manual
"email everyone now" button. **All of that has been removed** — it's not
part of what was asked for. The `subscribers` table still exists so people
can sign up and you can export the list as a CSV (Admin → Subscribers →
Export to CSV) and email people manually whenever you want. That's the
whole feature, by design.

---

## 6. Adding real content later

To add an 11th article or 5th book permanently (not just through the admin
UI, but so it survives even if the database is ever reset): add it to
`lib/config/articles.ts` or `lib/config/books.ts`, then click **Run Seed**
again. That keeps the static config and the live database in sync as the
source of truth for anything that should never be lost.
