import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const status = req.nextUrl.searchParams.get('status') || 'pending'
  const { data, error } = await supabaseAdmin
    .from('scheduled_broadcasts')
    .select('*')
    .eq('status', status)
    .order('scheduled_for', { ascending: true })
    .limit(100)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
