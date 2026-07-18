import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const rawBody = await req.json()
    const { send_delay_minutes, ...body } = rawBody
    // Same sanitization as POST
    if (!body.slug?.trim() && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
    }
    if (body.date === '' || body.date === undefined) body.date = null
    if (body.url === '') body.url = null

    const { data, error } = await supabaseAdmin
      .from('articles').update(body).eq('id', id).select().single()
    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[API /admin/articles/[id] PUT]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const { error } = await supabaseAdmin.from('articles').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API /admin/articles/[id] DELETE]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
