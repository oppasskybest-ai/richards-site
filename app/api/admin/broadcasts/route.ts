import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { sendBroadcast } from '@/lib/email/sendBroadcast'
import { isAuthenticated } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabaseAdmin.from('broadcasts').select('*').order('created_at', { ascending: false }).limit(50)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { subject, body, send } = await req.json()
  if (!subject || !body) return NextResponse.json({ error: 'Subject and body required.' }, { status: 400 })

  // Save draft first
  const { data: broadcast, error: insertErr } = await supabaseAdmin.from('broadcasts').insert({ subject, body, status: 'draft' }).select().single()
  if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 })

  if (send) {
    // Get active subscribers
    const { data: subs } = await supabaseAdmin.from('subscribers').select('email').eq('status', 'active')
    const emails = (subs || []).map((s: any) => s.email)

    if (emails.length > 0 && process.env.RESEND_API_KEY) {
      const { sent } = await sendBroadcast(emails, subject, body)
      await supabaseAdmin.from('broadcasts').update({ status: 'sent', sent_at: new Date().toISOString(), recipient_count: sent }).eq('id', broadcast.id)
    }
    return NextResponse.json({ ...broadcast, status: 'sent', recipient_count: emails.length })
  }

  return NextResponse.json(broadcast, { status: 201 })
}
