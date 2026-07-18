import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1')
  const pageSize = 50
  const status = req.nextUrl.searchParams.get('status') || 'active'
  const search = req.nextUrl.searchParams.get('search') || null

  let query = supabaseAdmin.from('subscribers').select('*', { count: 'exact' }).eq('status', status).order('created_at', { ascending: false })
  if (search) query = query.ilike('email', `%${search}%`)
  query = query.range((page - 1) * pageSize, page * pageSize - 1)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, total: count, page, pageSize })
}
