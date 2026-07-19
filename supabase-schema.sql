-- ============================================================
-- RANDOLPH RICHARDS — BIBLICAL THOUGHTS
-- Supabase Schema — SINGLE FILE, run once in the Supabase SQL Editor
-- ============================================================
-- This is the only SQL file in the project. It creates every table,
-- index, and Row Level Security (RLS) policy the app needs. Safe to
-- re-run any time — every statement uses "if not exists" or
-- "create or replace", so running it twice does nothing destructive.
--
-- After running this:
--   1. Copy your Project URL + anon key + service role key into
--      .env.local (see .env.local.example).
--   2. Log into /admin and go to Settings → "Run Seed" to load the
--      4 real books and 10 real articles from lib/config/. That
--      button is idempotent too — safe to click more than once.
--
-- Table of contents:
--   1. Core content:     subscribers, contact_messages, articles,
--                        books, events, settings
--   2. Comments:         comments (on articles)
--   3. Testimonials:     reviews (homepage/endorsements),
--                        book_reviews (per-book reader reviews)
--   4. Row Level Security policies for all of the above
-- ============================================================


-- ============================================================
-- 1. CORE CONTENT
-- ============================================================

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  -- What they've opted into. No automated sending exists in this project —
  -- these are just filters for when Randy exports the CSV to email people
  -- manually (per the master prompt: no automation, no send functionality).
  wants_newsletter boolean not null default true,
  wants_book_updates boolean not null default true,
  wants_article_updates boolean not null default true,
  wants_event_updates boolean not null default true,
  created_at timestamptz default now()
);
create index if not exists subscribers_email_idx on subscribers(email);
create index if not exists subscribers_status_idx on subscribers(status);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read', 'replied')),
  created_at timestamptz default now()
);
create index if not exists contact_messages_status_idx on contact_messages(status);

-- Falls back to the static list in lib/config/articles.ts if this table is
-- empty or unreachable, so the site works even before Supabase is wired up.
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  publication text not null,
  category text not null check (category in ('bible-culture','family-faith')),
  url text,
  date date,
  excerpt text default '',
  image text default '',
  featured boolean default false,
  status text not null default 'published' check (status in ('published','draft')),
  content_type text not null default 'external' check (content_type in ('external', 'native')),
  content_html text,          -- full post body, used when content_type = 'native'
  pdf_url text,
  comments_enabled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists articles_category_idx on articles(category);
create index if not exists articles_date_idx on articles(date desc);
create index if not exists articles_featured_idx on articles(featured);

-- Falls back to the static list in lib/config/books.ts if this table is
-- empty or unreachable.
create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  year text,
  subtitle text,
  description text,
  cover_image text,
  buy_url text,
  buy_url_2 text,
  badge text,
  quotes jsonb default '[]'::jsonb,
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text,
  event_date date not null,
  event_time text,
  end_date date,
  venue text,
  location text,
  event_type text default 'Talk',
  register_url text,
  image text,
  status text not null default 'upcoming' check (status in ('upcoming','past','cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists events_date_idx on events(event_date desc);
create index if not exists events_status_idx on events(status);

-- Podcasts / media appearances -- one of the 4 required content types in
-- richards-master-prompt.md. Table exists and lib/data/podcasts.ts reads
-- from it (falling back to lib/config/podcasts.ts if empty), but there is
-- no /admin/podcasts CRUD tab yet -- see PROGRESS.md.
create table if not exists podcasts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source text not null,
  description text,
  url text not null,
  embed_url text,
  date date,
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists podcasts_order_idx on podcasts(order_index);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  site_title text default 'Biblical Thoughts',
  site_description text,
  hero_headline text,
  hero_subline text,
  about_bio text,
  contact_email text default 'e.randolph.richards@gmail.com',
  social_academia text default 'https://independent.academia.edu/ERandolphRichards',
  admin_password_hash text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);


-- ============================================================
-- 2. COMMENTS (on articles)
-- ============================================================

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  author_name text not null,
  author_email text,
  body text not null,
  -- Comments show immediately (no pre-moderation) -- Randy asked for this
  -- explicitly rather than the original pending-approval-first flow.
  -- He can still delete/reject anything from /admin/comments after the fact.
  status text not null default 'approved' check (status in ('pending','approved','rejected')),
  parent_id uuid references comments(id) on delete cascade,
  -- true when this row was posted by Randy himself replying in the admin
  -- panel, not a public commenter -- lets the frontend badge it distinctly.
  is_owner_reply boolean not null default false,
  created_at timestamptz default now()
);
create index if not exists comments_article_id_idx on comments(article_id);
create index if not exists comments_status_idx on comments(status);
create index if not exists comments_parent_id_idx on comments(parent_id);


-- ============================================================
-- 3. TESTIMONIALS
-- ============================================================

-- Homepage / Endorsements page quotes. Currently a single honest
-- placeholder is shown until real quotes are added — see PROGRESS.md.
-- Do not seed this with invented quotes.
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  location text,
  rating int not null default 5 check (rating between 1 and 5),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);
create index if not exists reviews_status_idx on reviews(status);

-- Per-book reader reviews, shown on each book's detail page.
create table if not exists book_reviews (
  id uuid primary key default gen_random_uuid(),
  book_slug text not null,
  reviewer text not null,
  title text,
  country text,
  review_date text,
  body text not null,
  rating int default 5 check (rating between 1 and 5),
  source text default 'reader',
  status text not null default 'approved' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);
create index if not exists book_reviews_slug_idx on book_reviews(book_slug);
create index if not exists book_reviews_status_idx on book_reviews(status);


-- ============================================================
-- 4. ROW LEVEL SECURITY
-- ============================================================
-- Public (anon) visitors can only INSERT into subscribers/contact_messages
-- and SELECT published/approved content. Every write from the admin panel
-- goes through the service role key on the server, which bypasses RLS —
-- that's what supabaseAdmin in lib/supabase/server.ts uses.

alter table subscribers enable row level security;
alter table contact_messages enable row level security;
alter table articles enable row level security;
alter table books enable row level security;
alter table events enable row level security;
alter table podcasts enable row level security;
alter table settings enable row level security;
alter table comments enable row level security;
alter table reviews enable row level security;
alter table book_reviews enable row level security;

-- Public inserts (subscribe form, contact form)
create policy "public_insert_subscribers" on subscribers for insert to anon with check (true);
create policy "public_insert_contact" on contact_messages for insert to anon with check (true);

-- Public reads (published/approved content only)
create policy "public_read_articles" on articles for select to anon using (status = 'published');
create policy "public_read_books" on books for select to anon using (true);
create policy "public_read_events" on events for select to anon using (status != 'cancelled');
create policy "public_read_podcasts" on podcasts for select to anon using (true);
create policy "public_read_comments" on comments for select using (status = 'approved');
create policy "public_read_reviews" on reviews for select using (status = 'approved');
create policy "public_read_book_reviews" on book_reviews for select using (status = 'approved');

-- Service role bypass (admin panel — all tables, all operations)
create policy "service_all_subscribers" on subscribers for all to service_role using (true) with check (true);
create policy "service_all_contact" on contact_messages for all to service_role using (true) with check (true);
create policy "service_all_articles" on articles for all to service_role using (true) with check (true);
create policy "service_all_books" on books for all to service_role using (true) with check (true);
create policy "service_all_events" on events for all to service_role using (true) with check (true);
create policy "service_all_podcasts" on podcasts for all to service_role using (true) with check (true);
create policy "service_all_settings" on settings for all to service_role using (true) with check (true);
create policy "service_all_comments" on comments for all using (true);
create policy "service_all_reviews" on reviews for all using (true);
create policy "service_all_book_reviews" on book_reviews for all using (true);


-- ============================================================
-- MIGRATIONS -- run these ONLY if your database was already created
-- from an earlier version of this file (safe/idempotent to re-run).
-- If you're setting up Supabase fresh, ignore this section -- the
-- CREATE TABLE statements above already include everything.
-- ============================================================

-- Comments no longer require pre-approval before showing publicly.
alter table comments alter column status set default 'approved';
alter table comments add column if not exists is_owner_reply boolean not null default false;
create index if not exists comments_parent_id_idx on comments(parent_id);

-- Podcasts table + policies, if you ran the schema before Session 4 added it.
create table if not exists podcasts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source text not null,
  description text,
  url text not null,
  embed_url text,
  date date,
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists podcasts_order_idx on podcasts(order_index);
alter table podcasts enable row level security;
drop policy if exists "public_read_podcasts" on podcasts;
create policy "public_read_podcasts" on podcasts for select to anon using (true);
drop policy if exists "service_all_podcasts" on podcasts;
create policy "service_all_podcasts" on podcasts for all to service_role using (true) with check (true);

-- Image uploads: RichTextEditor and ImageUpload (used across every admin
-- form -- articles, books, events, podcasts) POST to /api/admin/upload,
-- which uploads into a Supabase Storage bucket named EXACTLY "article-images".
-- That bucket does not exist by default and can't be created with plain SQL
-- in most Supabase projects -- create it once from:
--   Dashboard -> Storage -> New bucket -> name it "article-images" exactly
--   -> Public bucket: ON
-- Until that bucket exists, every image upload in the admin panel will fail
-- silently or with a storage error -- this is not a code bug, it's a required
-- one-time manual setup step. Once the bucket exists, run this:
--
-- create policy "public_read_article_images" on storage.objects for select
--   to public using (bucket_id = 'article-images');
-- create policy "service_write_article_images" on storage.objects for all
--   to service_role using (bucket_id = 'article-images') with check (bucket_id = 'article-images');
