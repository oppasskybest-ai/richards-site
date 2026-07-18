-- ============================================================
-- Subscriber preferences — adds newsletter / new book / new article
-- opt-in columns to the existing subscribers table.
-- Safe to re-run: "add column if not exists" is a no-op if already applied.
-- ============================================================

alter table subscribers
  add column if not exists wants_newsletter boolean not null default true,
  add column if not exists wants_book_updates boolean not null default true,
  add column if not exists wants_article_updates boolean not null default true;

-- Existing rows (subscribed before this migration) default to true for all
-- three, i.e. they keep getting everything they already signed up for.
