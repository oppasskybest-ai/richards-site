-- ============================================================
-- Auto-broadcast queue — books, articles, and events each get an
-- automatically-scheduled subscriber notification, with a per-post
-- delay (default 30 minutes, editable 5 min -> 7 days), cancelled
-- automatically if the post is deleted (or unpublished, for articles)
-- before it sends.
--
-- Safe to re-run: create table/column "if not exists" throughout.
-- ============================================================

-- Events didn't have their own preference checkbox yet — adding it now
-- so event notifications can be opted into/out of separately from
-- newsletter/books/articles.
alter table subscribers
  add column if not exists wants_event_updates boolean not null default true;

create table if not exists scheduled_broadcasts (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('book', 'article', 'event')),
  source_id uuid not null,
  subject text not null,
  body text not null,
  -- which subscribers column gates delivery: wants_book_updates / wants_article_updates / wants_event_updates
  preference_column text not null check (preference_column in ('wants_book_updates', 'wants_article_updates', 'wants_event_updates')),
  scheduled_for timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'sending', 'sent', 'cancelled')),
  recipient_count int default 0,
  created_at timestamptz default now(),
  sent_at timestamptz
);

create index if not exists scheduled_broadcasts_status_idx on scheduled_broadcasts(status, scheduled_for);
create index if not exists scheduled_broadcasts_source_idx on scheduled_broadcasts(source_type, source_id);

-- ============================================================
-- pg_cron + pg_net wiring — runs every 5 minutes, calls the Edge
-- Function that actually sends due broadcasts.
--
-- BEFORE RUNNING THE cron.schedule() CALL BELOW:
--   1. Enable the pg_cron and pg_net extensions:
--      Supabase Dashboard -> Database -> Extensions -> enable both.
--   2. Deploy the Edge Function in supabase/functions/process-scheduled-broadcasts
--      (see that folder's README for the exact CLI commands).
--   3. Replace YOUR_PROJECT_REF and YOUR_SERVICE_ROLE_KEY below with your
--      actual values before running this part.
-- ============================================================

-- select cron.schedule(
--   'process-scheduled-broadcasts',
--   '*/5 * * * *',
--   $$
--   select net.http_post(
--     url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-scheduled-broadcasts',
--     headers := jsonb_build_object(
--       'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY',
--       'Content-Type', 'application/json'
--     )
--   );
--   $$
-- );

-- To check it's running: select * from cron.job;
-- To check recent runs: select * from cron.job_run_details order by start_time desc limit 10;
-- To remove it later: select cron.unschedule('process-scheduled-broadcasts');
