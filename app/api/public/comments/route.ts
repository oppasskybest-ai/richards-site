import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// GET /api/public/comments?article_id=xxx
export async function GET(req: NextRequest) {
  const article_id = req.nextUrl.searchParams.get('article_id')
  if (!article_id) return NextResponse.json({ error: 'article_id required' }, { status: 400 })

  try {
    const { data, error } = await supabaseAdmin
      .from('comments')
      .select('id, author_name, body, parent_id, created_at')
      .eq('article_id', article_id)
      .eq('status', 'approved')
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json({ data: data || [] })
  } catch (err) {
    console.error('[GET /api/public/comments]', err)
    return NextResponse.json({ error: 'Failed to load comments.' }, { status: 500 })
  }
}

// POST /api/public/comments
export async function POST(req: NextRequest) {
  try {
    const { article_id, author_name, author_email, body, parent_id } = await req.json()

    if (!article_id || !author_name?.trim() || !body?.trim()) {
      return NextResponse.json({ error: 'Name and comment are required.' }, { status: 400 })
    }

    // Verify article exists and has comments enabled
    const { data: article, error: artErr } = await supabaseAdmin
      .from('articles')
      .select('id, comments_enabled')
      .eq('id', article_id)
      .single()

    if (artErr || !article) return NextResponse.json({ error: 'Article not found.' }, { status: 404 })
    if (!article.comments_enabled) return NextResponse.json({ error: 'Comments are disabled for this article.' }, { status: 403 })

    const { error } = await supabaseAdmin.from('comments').insert({
      article_id,
      author_name: author_name.trim().slice(0, 80),
      author_email: author_email?.trim().slice(0, 120) || null,
      body: body.trim().slice(0, 2000),
      parent_id: parent_id || null,
      status: 'pending',
    })

    if (error) throw error
    return NextResponse.json({ ok: true, message: 'Comment submitted and awaiting approval.' })
  } catch (err) {
    console.error('[POST /api/public/comments]', err)
    return NextResponse.json({ error: 'Failed to submit comment.' }, { status: 500 })
  }
}
