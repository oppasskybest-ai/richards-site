-- ============================================================
-- Randolph Richards — Biblical Thoughts — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- SUBSCRIBERS
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  created_at timestamptz default now()
);
create index if not exists subscribers_email_idx on subscribers(email);
create index if not exists subscribers_status_idx on subscribers(status);

-- CONTACT MESSAGES
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

-- BROADCASTS
create table if not exists broadcasts (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  body text not null,
  status text not null default 'draft' check (status in ('draft', 'sent')),
  sent_at timestamptz,
  recipient_count int default 0,
  created_at timestamptz default now()
);

-- ARTICLES (for CMS override — site falls back to static config if table empty)
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
  content_html text,
  pdf_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists articles_category_idx on articles(category);
create index if not exists articles_date_idx on articles(date desc);
create index if not exists articles_featured_idx on articles(featured);

-- BOOKS (for CMS override — site falls back to static config if table empty)
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

-- Reader/press reviews attached to a book (shown on the book detail page).
-- Randy's real reviews still need to be added — see PROGRESS.md.
create table if not exists book_reviews (
  id uuid primary key default gen_random_uuid(),
  book_slug text not null,
  reviewer text not null,
  title text,
  country text,
  review_date text,
  body text not null,
  rating int default 5,
  source text default 'reader',
  status text default 'approved',
  created_at timestamptz default now()
);

-- EVENTS
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
  notified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists events_date_idx on events(event_date desc);
create index if not exists events_status_idx on events(status);

-- SETTINGS
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

-- RLS: allow anon inserts on subscribers and messages; service role handles everything else
alter table subscribers enable row level security;
alter table contact_messages enable row level security;
alter table broadcasts enable row level security;
alter table articles enable row level security;
alter table books enable row level security;
alter table events enable row level security;
alter table settings enable row level security;

-- Public can insert subscribers
create policy "public_insert_subscribers" on subscribers for insert to anon with check (true);
-- Public can insert contact messages
create policy "public_insert_contact" on contact_messages for insert to anon with check (true);
-- Service role bypass (all tables)
create policy "service_all_subscribers" on subscribers for all to service_role using (true) with check (true);
create policy "service_all_contact" on contact_messages for all to service_role using (true) with check (true);
create policy "service_all_broadcasts" on broadcasts for all to service_role using (true) with check (true);
create policy "service_all_articles" on articles for all to service_role using (true) with check (true);
create policy "service_all_books" on books for all to service_role using (true) with check (true);
create policy "service_all_events" on events for all to service_role using (true) with check (true);
create policy "service_all_settings" on settings for all to service_role using (true) with check (true);

-- Public read for articles (published only)
create policy "public_read_articles" on articles for select to anon using (status = 'published');
-- Public read for books
create policy "public_read_books" on books for select to anon using (true);
-- Public read for events (upcoming and past, not cancelled)
create policy "public_read_events" on events for select to anon using (status != 'cancelled');

-- ============================================================
-- COMMENTS SYSTEM (Item 5) — run this block in Supabase SQL editor
-- ============================================================

-- 1. Add comments_enabled toggle to articles table
alter table articles add column if not exists comments_enabled boolean default false;

-- 2. Comments table
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  author_name text not null,
  author_email text,
  body text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  parent_id uuid references comments(id) on delete cascade,
  created_at timestamptz default now()
);

-- 3. RLS
alter table comments enable row level security;

-- Public can read approved comments only
create policy "Public read approved comments" on comments
  for select using (status = 'approved');

-- Service role full access
create policy "Service role full access comments" on comments
  for all using (true);

-- Index for lookups
create index if not exists comments_article_id_idx on comments(article_id);
create index if not exists comments_status_idx on comments(status);

-- ============================================================
-- REVIEWS SYSTEM (Item 4) — run this block in Supabase SQL editor
-- ============================================================

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  location text,
  rating int not null default 5 check (rating between 1 and 5),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

alter table reviews enable row level security;

create policy "Public read approved reviews" on reviews
  for select using (status = 'approved');

create policy "Service role full access reviews" on reviews
  for all using (true);

create index if not exists reviews_status_idx on reviews(status);

-- ============================================================
-- BOOK REVIEWS TABLE (Amazon reader reviews per book)
-- ============================================================
create table if not exists book_reviews (
  id uuid primary key default gen_random_uuid(),
  book_slug text not null,
  reviewer text not null,
  title text,
  country text,
  review_date text,
  body text not null,
  rating int default 5,
  source text default 'amazon',
  status text default 'approved' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now()
);

alter table book_reviews enable row level security;

create policy "Public read approved book reviews" on book_reviews
  for select using (status = 'approved');

create policy "Service role full access book reviews" on book_reviews
  for all using (true);

create index if not exists book_reviews_slug_idx on book_reviews(book_slug);
create index if not exists book_reviews_status_idx on book_reviews(status);
