import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const status = req.nextUrl.searchParams.get('status') || 'pending'
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json({ data: data || [] })
  } catch (err) {
    console.error('[GET /api/admin/reviews]', err)
    return NextResponse.json({ error: 'Failed to load reviews.' }, { status: 500 })
  }
}
