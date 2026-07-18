import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { isAuthenticated } from '@/lib/auth/session'
import { scheduleAutoBroadcast, cancelScheduledBroadcast } from '@/lib/broadcast/scheduleBroadcast'

function buildArticleLink(article: { content_type?: string; category: string; slug?: string | null; url: string }) {
  if (article.content_type === 'native' && article.slug) {
    return `https://randolphrichards.com/articles/${article.category}/${article.slug}`
  }
  return article.url
}

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

    const { data: before } = await supabaseAdmin.from('articles').select('status').eq('id', id).single()

    const { data, error } = await supabaseAdmin
      .from('articles').update(body).eq('id', id).select().single()
    if (error) throw error

    if (before?.status !== 'published' && data.status === 'published') {
      // Newly published (was draft) — schedule the notification.
      // scheduleAutoBroadcast is idempotent per source, so this never double-fires
      // if the article gets published/unpublished/republished repeatedly.
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
    } else if (data.status !== 'published') {
      // Unpublished (back to draft) — cancel if still pending.
      await cancelScheduledBroadcast('article', id)
    }

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
    await cancelScheduledBroadcast('article', id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API /admin/articles/[id] DELETE]', error)
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
