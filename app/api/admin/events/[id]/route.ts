import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { cancelScheduledBroadcast } from '@/lib/broadcast/scheduleBroadcast'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const body = await req.json()
    const { data, error } = await supabaseAdmin
      .from('events')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    if (data.status === 'cancelled') {
      await cancelScheduledBroadcast('event', id)
    }
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[API /admin/events/[id] PUT]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const { error } = await supabaseAdmin.from('events').delete().eq('id', id)
    if (error) throw error
    await cancelScheduledBroadcast('event', id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API /admin/events/[id] DELETE]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
