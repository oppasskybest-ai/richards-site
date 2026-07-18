// Supabase Edge Function: process-scheduled-broadcasts
//
// Triggered every 5 minutes by pg_cron (see supabase-auto-broadcast-migration.sql).
// Finds any scheduled_broadcasts rows whose delay has elapsed, sends them via
// Resend to the correctly-filtered subscriber segment, and marks them sent.
//
// Required secrets (set with `supabase secrets set NAME=value`):
//   SUPABASE_URL               — your project URL
//   SUPABASE_SERVICE_ROLE_KEY  — service role key (bypasses RLS, needed to read all subscribers)
//   RESEND_API_KEY             — same key used by the Next.js app

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SITE_URL = 'https://randolphrichards.com'
const FROM_ADDRESS = Deno.env.get('BROADCAST_FROM_EMAIL') || 'E. Randolph Richards <hello@randolphrichards.com>'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

function buildEmailHtml(subject: string, body: string, email: string) {
  const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`
  const paragraphs = body
    .split('\n\n')
    .filter(Boolean)
    .map((p) => `<p style="margin:0 0 1.1em;line-height:1.7;color:#2a2a2a;font-size:15px;">${escapeHtml(p).replace(/\n/g, '<br/>')}</p>`)
    .join('')

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f6f1e6;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:0 auto;padding:2.5rem 1.5rem;">
    <div style="width:40px;height:2px;background:#0f5c73;margin-bottom:1.5rem;"></div>
    <p style="font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;color:#0f5c73;margin:0 0 0.5rem;">Biblical Thoughts</p>
    <h1 style="font-size:1.4rem;color:#1c1a17;margin:0 0 1.5rem;font-weight:400;">${escapeHtml(subject)}</h1>
    ${paragraphs}
    <hr style="border:none;border-top:1px solid rgba(0,0,0,0.08);margin:2rem 0 1.25rem;" />
    <p style="font-size:0.72rem;color:rgba(0,0,0,0.4);">
      <a href="${unsubscribeUrl}" style="color:rgba(0,0,0,0.4);">Unsubscribe</a>
    </p>
  </div>
</body>
</html>`
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function sendOne(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
  })
  return res.ok
}

Deno.serve(async () => {
  const now = new Date().toISOString()

  // Find due, still-pending broadcasts (small batch per run — plenty for this site's volume)
  const { data: due, error: dueErr } = await supabase
    .from('scheduled_broadcasts')
    .select('*')
    .eq('status', 'pending')
    .lte('scheduled_for', now)
    .limit(10)

  if (dueErr) {
    return new Response(JSON.stringify({ error: dueErr.message }), { status: 500 })
  }
  if (!due || due.length === 0) {
    return new Response(JSON.stringify({ processed: 0 }), { status: 200 })
  }

  const results = []

  for (const broadcast of due) {
    // Atomically claim this row (pending -> sending) so an overlapping run can't double-send it.
    const { data: claimed } = await supabase
      .from('scheduled_broadcasts')
      .update({ status: 'sending' })
      .eq('id', broadcast.id)
      .eq('status', 'pending')
      .select()
      .maybeSingle()

    if (!claimed) continue // another run already claimed it

    try {
      const { data: subs, error: subsErr } = await supabase
        .from('subscribers')
        .select('email')
        .eq('status', 'active')
        .eq(broadcast.preference_column, true)

      if (subsErr) throw subsErr

      const emails = (subs || []).map((s: { email: string }) => s.email)
      let sent = 0

      for (const email of emails) {
        const html = buildEmailHtml(broadcast.subject, broadcast.body, email)
        const ok = await sendOne(email, broadcast.subject, html)
        if (ok) sent++
      }

      await supabase
        .from('scheduled_broadcasts')
        .update({ status: 'sent', sent_at: new Date().toISOString(), recipient_count: sent })
        .eq('id', broadcast.id)

      // Log into the same broadcasts table the manual composer uses, so it shows in one history list.
      await supabase.from('broadcasts').insert({
        subject: broadcast.subject,
        body: broadcast.body,
        status: 'sent',
        sent_at: new Date().toISOString(),
        recipient_count: sent,
      })

      results.push({ id: broadcast.id, sent })
    } catch (err) {
      // Put it back to pending so the next run retries it, rather than losing it silently.
      await supabase.from('scheduled_broadcasts').update({ status: 'pending' }).eq('id', broadcast.id)
      results.push({ id: broadcast.id, error: String(err) })
    }
  }

  return new Response(JSON.stringify({ processed: results.length, results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
