import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { scheduleAutoBroadcast } from '@/lib/broadcast/scheduleBroadcast'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabaseAdmin.from('books').select('*').order('order_index')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rawBody = await req.json()
  // send_delay_minutes is a scheduling instruction, not a books table column
  const { send_delay_minutes, ...bookData } = rawBody

  const { data, error } = await supabaseAdmin.from('books').insert(bookData).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const subject = `New book: ${data.title}`
  const bodyParts = [
    data.subtitle || '',
    data.description || '',
    data.buy_url ? `Get it here: ${data.buy_url}` : '',
  ].filter(Boolean)
  await scheduleAutoBroadcast({
    sourceType: 'book',
    sourceId: data.id,
    subject,
    body: bodyParts.join('\n\n'),
    preferenceColumn: 'wants_book_updates',
    delayMinutes: send_delay_minutes,
  })

  return NextResponse.json(data, { status: 201 })
}
