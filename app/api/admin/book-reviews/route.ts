import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'

// Per-book reader reviews (shown on each book's detail page). Unlike the
// homepage `reviews` (testimonials) table, there is no public submission
// form for this one -- Randy curates these himself from reviews he's
// gathered elsewhere (Amazon, Goodreads, etc), so there's no pending/
// approved/rejected moderation queue here, just direct add/edit/delete.
// Table default status is 'approved', so anything saved here is live
// immediately.

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabaseAdmin
    .from('book_reviews')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await supabaseAdmin.from('book_reviews').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
