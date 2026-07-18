# process-scheduled-broadcasts — deployment steps (dashboard only, no CLI)

This function is what actually sends auto-scheduled book/article/event
notifications once their delay has elapsed. Everything below is done
inside the Supabase web dashboard — nothing to install locally.

## Step 1 — Create the function

1. Supabase Dashboard -> your project -> left sidebar -> **Edge Functions**
2. Click **Deploy a new function** (or "Create a new function")
3. Name it exactly: `process-scheduled-broadcasts`
4. It opens a code editor. Delete anything in it, then paste in the full
   contents of `index.ts` from this same folder.
5. Click Deploy / Save.

## Step 2 — Secrets: mostly automatic, one you'll add later

Good news, confirmed from your dashboard: `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` are **"Default secrets"** — Supabase
provides these to every Edge Function automatically. You don't need to
add them yourself. (You'll notice `SUPABASE_SERVICE_ROLE_KEY` shows a
"Deprecated" tag pointing to a newer `SUPABASE_SECRET_KEYS` format —
that's just Supabase signaling a future change; the old one still
works fine today, nothing for you to do about it.)

The **only** secret you'll ever add manually here is:
- `RESEND_API_KEY` — skip this for now if you don't have it yet.
  Nothing breaks. The function just can't actually send email until
  it's added later — add it whenever the real key is ready, no
  redeploy needed. (Add it via Edge Functions -> Secrets, same screen
  as your screenshot — Name: `RESEND_API_KEY`, Value: the key.)

## Step 3 — Enable two extensions

1. Supabase Dashboard -> **Database** -> **Extensions**
2. Search for `pg_cron` -> toggle it on
3. Search for `pg_net` -> toggle it on

## Step 4 — Run the migration (if you haven't already)

1. Supabase Dashboard -> **SQL Editor** -> New query
2. Paste in the full contents of `supabase-auto-broadcast-migration.sql`
   and run it. (Safe to run even if you already ran it before — the
   cron part at the bottom is commented out and does nothing until
   Step 5.)

## Step 5 — Turn on the actual 5-minute schedule

**This part needs the project ref and service role key typed in
directly — it's not related to the automatic secrets from Step 2.**
That's because this SQL block runs inside the database itself (Postgres
making a raw web request to your function), which has no access to the
Edge Function's secrets at all. So this is the one place those two
values get pasted in as plain text in the SQL.

1. Open `supabase-auto-broadcast-migration.sql` again, scroll to the
   block that starts with `-- select cron.schedule(`
2. Copy just that block (from `select cron.schedule(` down to the
   closing `);`) into a new query in the SQL Editor
3. Remove the `--` at the start of each of those lines (that's what
   "uncomment" means — it turns it from a comment into real, active SQL)
4. Replace `YOUR_PROJECT_REF` with the `xxxxxxxx` part of your project
   URL (**Project Settings -> API**, looks like `https://xxxxxxxx.supabase.co`)
5. Replace `YOUR_SERVICE_ROLE_KEY` with the **service_role** key from
   that same **Project Settings -> API** page
6. Run it in the SQL Editor

## Step 6 — Verify it's actually running

In the SQL Editor, run:
```sql
select * from cron.job;
```
You should see one row named `process-scheduled-broadcasts`.

Wait 5-10 minutes, then run:
```sql
select * from cron.job_run_details order by start_time desc limit 10;
```
You should see recent run entries appearing every 5 minutes. If
`RESEND_API_KEY` isn't set yet, runs will still show up here — they'll
just report `{"processed": 0}` whenever nothing is due, and the emails
themselves won't send until that key is added.

## To pause or remove it later

```sql
select cron.unschedule('process-scheduled-broadcasts');
```
