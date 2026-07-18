-- ============================================================
-- EVENTS FEATURE — ADDITIVE MIGRATION ONLY
-- Run this in the Supabase SQL editor. This does NOT touch any
-- existing table, data, or policy. Safe to run on your live DB.
-- This is the ONLY new part of supabase-schema.sql — everything
-- else in that file already exists in your database from before.
-- ============================================================

-- TABLE
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

-- INDEXES
create index if not exists events_date_idx on events(event_date desc);
create index if not exists events_status_idx on events(status);

-- ROW LEVEL SECURITY
alter table events enable row level security;

-- POLICIES
-- NOTE: if you run this twice, these two lines specifically will error
-- ("policy already exists") — that's expected and harmless, it just
-- means this part already ran successfully the first time.
create policy "service_all_events" on events for all to service_role using (true) with check (true);
create policy "public_read_events" on events for select to anon using (status != 'cancelled');
