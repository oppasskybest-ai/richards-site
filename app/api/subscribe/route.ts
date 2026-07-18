import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { sendWelcomeEmail } from '@/lib/email/sendWelcomeEmail'
import { validateEmail } from '@/lib/utils/validateEmail'

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, preferences } = await req.json()

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    // preferences is optional so existing callers (e.g. the footer SubscribeForm)
    // keep working unchanged — defaults to "everything" when omitted.
    const wantsNewsletter = preferences?.newsletter ?? true
    const wantsBookUpdates = preferences?.bookUpdates ?? true
    const wantsArticleUpdates = preferences?.articleUpdates ?? true
    const wantsEventUpdates = preferences?.eventUpdates ?? true

    // Check if already subscribed
    const { data: existing } = await supabaseAdmin
      .from('subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({ message: 'You\'re already on the list.' }, { status: 200 })
      }
      // Re-subscribe
      await supabaseAdmin
        .from('subscribers')
        .update({
          status: 'active',
          first_name: firstName || null,
          wants_newsletter: wantsNewsletter,
          wants_book_updates: wantsBookUpdates,
          wants_article_updates: wantsArticleUpdates,
          wants_event_updates: wantsEventUpdates,
        })
        .eq('id', existing.id)
      return NextResponse.json({ message: 'Welcome back.' }, { status: 200 })
    }

    // New subscriber
    const { error } = await supabaseAdmin.from('subscribers').insert({
      email: email.toLowerCase().trim(),
      first_name: firstName || null,
      status: 'active',
      wants_newsletter: wantsNewsletter,
      wants_book_updates: wantsBookUpdates,
      wants_article_updates: wantsArticleUpdates,
      wants_event_updates: wantsEventUpdates,
    })

    if (error) throw error

    // Send welcome email (non-blocking)
    if (process.env.RESEND_API_KEY) {
      sendWelcomeEmail(email, firstName).catch(console.error)
    }

    return NextResponse.json({ message: 'You\'re in.' }, { status: 200 })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
