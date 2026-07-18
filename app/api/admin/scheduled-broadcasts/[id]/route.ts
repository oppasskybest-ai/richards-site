import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { clampDelayMinutes } from '@/lib/broadcast/scheduleBroadcast'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const { action, delayMinutesFromNow } = await req.json()

    if (action === 'cancel') {
      const { error } = await supabaseAdmin
        .from('scheduled_broadcasts')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('status', 'pending')
      if (error) throw error
      return NextResponse.json({ success: true })
    }

    if (action === 'reschedule') {
      const minutes = clampDelayMinutes(delayMinutesFromNow)
      const scheduledFor = new Date(Date.now() + minutes * 60_000).toISOString()
      const { data, error } = await supabaseAdmin
        .from('scheduled_broadcasts')
        .update({ scheduled_for: scheduledFor })
        .eq('id', id)
        .eq('status', 'pending')
        .select()
        .single()
      if (error) throw error
      return NextResponse.json({ success: true, data })
    }

    return NextResponse.json({ success: false, message: 'Unknown action.' }, { status: 400 })
  } catch (error) {
    console.error('[API /admin/scheduled-broadcasts/[id] PATCH]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
