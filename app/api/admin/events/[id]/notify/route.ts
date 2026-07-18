import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { sendBroadcast } from '@/lib/email/sendBroadcast'
import { cancelScheduledBroadcast } from '@/lib/broadcast/scheduleBroadcast'

function formatEventDate(dateStr: string, timeStr: string | null) {
  const d = new Date(dateStr + 'T00:00:00')
  const formatted = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  return timeStr ? `${formatted} at ${timeStr}` : formatted
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  try {
    const { data: event, error: fetchErr } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    if (fetchErr || !event) {
      return NextResponse.json({ success: false, message: 'Event not found.' }, { status: 404 })
    }

    const { data: subs, error: subsErr } = await supabaseAdmin
      .from('subscribers')
      .select('email')
      .eq('status', 'active')
    if (subsErr) throw subsErr

    const emails = (subs || []).map((s: { email: string }) => s.email)
    if (emails.length === 0) {
      return NextResponse.json({ success: false, message: 'No active subscribers to notify.' }, { status: 400 })
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: false, message: 'Email sending is not configured.' }, { status: 500 })
    }

    const subject = `New event: ${event.title}`
    const whenLine = formatEventDate(event.event_date, event.event_time)
    const whereLine = [event.venue, event.location].filter(Boolean).join(', ')
    const bodyParts = [
      event.subtitle || '',
      `When: ${whenLine}`,
      whereLine ? `Where: ${whereLine}` : '',
      event.description || '',
      event.register_url ? `More details and registration: ${event.register_url}` : '',
    ].filter(Boolean)
    const body = bodyParts.join('\n\n')

    const { sent } = await sendBroadcast(emails, subject, body)

    await supabaseAdmin
      .from('events')
      .update({ notified: true })
      .eq('id', id)

    // Log this as a broadcast too, so it shows in the broadcasts history
    await supabaseAdmin.from('broadcasts').insert({
      subject,
      body,
      status: 'sent',
      sent_at: new Date().toISOString(),
      recipient_count: sent,
    })

    // Prevent a double-send: if the 30-min auto-broadcast for this event
    // hasn't fired yet, cancel it now that it's been sent manually.
    await cancelScheduledBroadcast('event', id)

    return NextResponse.json({ success: true, sent })
  } catch (error) {
    console.error('[API /admin/events/[id]/notify POST]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
