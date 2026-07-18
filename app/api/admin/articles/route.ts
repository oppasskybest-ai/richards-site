import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { scheduleAutoBroadcast } from '@/lib/broadcast/scheduleBroadcast'

function buildArticleLink(article: { content_type?: string; category: string; slug?: string | null; url: string }) {
  if (article.content_type === 'native' && article.slug) {
    return `https://randolphrichards.com/articles/${article.category}/${article.slug}`
  }
  return article.url
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1')
  const pageSize = 25
  const category = req.nextUrl.searchParams.get('category') || null
  const search = req.nextUrl.searchParams.get('search') || null

  let query = supabaseAdmin.from('articles').select('*', { count: 'exact' }).order('date', { ascending: false })
  if (category) query = query.eq('category', category)
  if (search) query = query.ilike('title', `%${search}%`)
  query = query.range((page - 1) * pageSize, page * pageSize - 1)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, total: count, page, pageSize })
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const rawBody = await req.json()
    const { send_delay_minutes, ...body } = rawBody
    // Auto-generate slug from title if blank
    if (!body.slug?.trim() && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
    }
    // Postgres date column rejects empty string — must be null
    if (body.date === '' || body.date === undefined) body.date = null
    // External URL not required for native articles — send null not ""
    if (body.url === '') body.url = null

    const { data, error } = await supabaseAdmin.from('articles').insert(body).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    if (data.status === 'published') {
      const subject = `New article: ${data.title}`
      const bodyParts = [data.excerpt || '', `Read it: ${buildArticleLink(data)}`].filter(Boolean)
      await scheduleAutoBroadcast({
        sourceType: 'article',
        sourceId: data.id,
        subject,
        body: bodyParts.join('\n\n'),
        preferenceColumn: 'wants_article_updates',
        delayMinutes: send_delay_minutes,
      })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('[API /admin/articles POST]', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
