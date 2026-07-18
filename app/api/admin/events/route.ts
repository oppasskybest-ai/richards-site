import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { scheduleAutoBroadcast } from '@/lib/broadcast/scheduleBroadcast'

function formatEventDate(dateStr: string, timeStr: string | null) {
  const d = new Date(dateStr + 'T00:00:00')
  const formatted = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  return timeStr ? `${formatted} at ${timeStr}` : formatted
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .order('event_date', { ascending: false })
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    console.error('[API /admin/events GET]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const rawBody = await req.json()
    const { send_delay_minutes, ...body } = rawBody
    if (!body.title || !body.event_date) {
      return NextResponse.json({ success: false, message: 'Title and event date are required.' }, { status: 400 })
    }
    const { data, error } = await supabaseAdmin.from('events').insert(body).select().single()
    if (error) throw error

    if (data.status === 'upcoming') {
      const subject = `New event: ${data.title}`
      const whenLine = formatEventDate(data.event_date, data.event_time)
      const whereLine = [data.venue, data.location].filter(Boolean).join(', ')
      const bodyParts = [
        data.subtitle || '',
        `When: ${whenLine}`,
        whereLine ? `Where: ${whereLine}` : '',
        data.description || '',
        data.register_url ? `More details and registration: ${data.register_url}` : '',
      ].filter(Boolean)
      await scheduleAutoBroadcast({
        sourceType: 'event',
        sourceId: data.id,
        subject,
        body: bodyParts.join('\n\n'),
        preferenceColumn: 'wants_event_updates',
        delayMinutes: send_delay_minutes,
      })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('[API /admin/events POST]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
