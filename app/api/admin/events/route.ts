import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'

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

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('[API /admin/events POST]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
