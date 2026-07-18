import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { cancelScheduledBroadcast } from '@/lib/broadcast/scheduleBroadcast'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const body = await req.json()
    const { data, error } = await supabaseAdmin.from('books').update(body).eq('id', id).select().single()
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[API /admin/books/[id] PUT]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const { error } = await supabaseAdmin.from('books').delete().eq('id', id)
    if (error) throw error
    await cancelScheduledBroadcast('book', id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API /admin/books/[id] DELETE]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
