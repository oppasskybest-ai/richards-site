import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'

// Lets Randy reply to a public comment from the admin panel. Posts as an
// approved, clearly-badged "owner reply" (is_owner_reply = true) nested
// under the comment he's replying to, so it shows up threaded on the
// public article page immediately.
export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { article_id, parent_id, body } = await req.json()
    if (!article_id || !parent_id || !body?.trim()) {
      return NextResponse.json({ error: 'article_id, parent_id, and body are required.' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin.from('comments').insert({
      article_id,
      parent_id,
      author_name: 'E. Randolph Richards',
      author_email: null,
      body: body.trim().slice(0, 2000),
      status: 'approved',
      is_owner_reply: true,
    }).select().single()

    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[API /admin/comments/reply POST]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
