import { Resend } from 'resend'
import { render } from '@react-email/render'
import WelcomeEmail from '@/emails/WelcomeEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_ADDRESS = process.env.BROADCAST_FROM_EMAIL || 'E. Randolph Richards <hello@randolphrichards.com>'

export async function sendWelcomeEmail(email: string, firstName?: string): Promise<void> {
  try {
    const html = await render(
      WelcomeEmail({ email, firstName: firstName || 'there' })
    )
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Welcome to Biblical Thoughts',
      html,
    })
  } catch (error) {
    console.error('[lib/email/sendWelcomeEmail]', error)
    throw error
  }
}
