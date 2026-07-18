-- ============================================================
-- ARTICLES CONTENT TYPE MIGRATION — Items 1 + 3
-- Run this in the Supabase SQL editor.
-- Additive only — adds 3 new columns to the existing articles table.
-- Existing rows default to content_type='external' (Mode B, current behaviour).
-- Safe to run on your live DB.
-- ============================================================

alter table articles
  add column if not exists content_type text not null default 'external'
    check (content_type in ('external', 'native')),
  add column if not exists content_html text,
  add column if not exists pdf_url text;

-- Also need a storage bucket for uploads.
-- Go to Supabase dashboard → Storage → New bucket:
--   Name: article-images
--   Public: YES (toggle on)
-- And a second bucket:
--   Name: article-files  (for PDF uploads)
--   Public: YES
-- These cannot be created via SQL — must be done in the dashboard UI.
