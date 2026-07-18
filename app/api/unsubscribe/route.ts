import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) {
    return new NextResponse('Missing email', { status: 400 })
  }
  await supabaseAdmin
    .from('subscribers')
    .update({ status: 'unsubscribed' })
    .eq('email', email.toLowerCase().trim())

  return new NextResponse(
    `<html><body style="font-family:Georgia,serif;max-width:500px;margin:4rem auto;color:#1a1a1a;padding:2rem">
      <h2 style="font-size:1.5rem;margin-bottom:1rem">Unsubscribed</h2>
      <p style="line-height:1.7;color:#555">You've been removed from the list. No hard feelings.</p>
      <p style="margin-top:1.5rem"><a href="https://randolphrichards.com" style="color:var(--gold)">← Back to the site</a></p>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  )
}
