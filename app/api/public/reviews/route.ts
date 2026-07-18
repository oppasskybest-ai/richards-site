import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// GET /api/public/reviews — approved reviews for homepage display
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('id, quote, name, location, rating, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(12)

    if (error) throw error
    return NextResponse.json({ data: data || [] })
  } catch (err) {
    console.error('[GET /api/public/reviews]', err)
    return NextResponse.json({ error: 'Failed to load reviews.' }, { status: 500 })
  }
}

// POST /api/public/reviews — visitor submits a review, held for moderation
export async function POST(req: NextRequest) {
  try {
    const { quote, name, location, rating } = await req.json()

    if (!quote?.trim() || !name?.trim()) {
      return NextResponse.json({ error: 'Please fill in your review and name.' }, { status: 400 })
    }

    const safeRating = Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : 5

    const { error } = await supabaseAdmin.from('reviews').insert({
      quote: quote.trim().slice(0, 1000),
      name: name.trim().slice(0, 80),
      location: location?.trim().slice(0, 80) || null,
      rating: safeRating,
      status: 'pending',
    })

    if (error) throw error
    return NextResponse.json({ ok: true, message: 'Thank you — your review has been submitted and is awaiting approval.' })
  } catch (err) {
    console.error('[POST /api/public/reviews]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
