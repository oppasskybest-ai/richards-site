import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabaseAdmin.from('settings').select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data: existing } = await supabaseAdmin.from('settings').select('id').single()
  let result
  if (existing) {
    const { data, error } = await supabaseAdmin.from('settings').update({ ...body, updated_at: new Date().toISOString() }).eq('id', existing.id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    result = data
  } else {
    const { data, error } = await supabaseAdmin.from('settings').insert(body).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    result = data
  }
  return NextResponse.json(result)
}
