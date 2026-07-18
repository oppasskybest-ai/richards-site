import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { sendContactNotification } from '@/lib/email/sendContactNotification'
import { validateEmail } from '@/lib/utils/validateEmail'

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json()

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'First name, email, and message are required.' }, { status: 400 })
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('contact_messages').insert({
      first_name: firstName,
      last_name: lastName || null,
      email: email.toLowerCase().trim(),
      subject: subject || '(no subject)',
      message,
      status: 'unread',
    })

    if (error) throw error

    if (process.env.RESEND_API_KEY) {
      sendContactNotification({ firstName, lastName, email, subject, message }).catch(console.error)
    }

    return NextResponse.json({ message: 'Message sent.' }, { status: 200 })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
