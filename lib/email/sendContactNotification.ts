import { Resend } from 'resend'
import { render } from '@react-email/render'
import ContactNotification from '@/emails/ContactNotification'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export async function sendContactNotification(data: ContactData): Promise<void> {
  try {
    const html = await render(
      ContactNotification({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        subject: data.subject,
        message: data.message,
      })
    )
    await resend.emails.send({
      from: 'Biblical Thoughts <hello@randolphrichards.com>',
      to: 'e.randolph.richards@gmail.com',
      replyTo: data.email,
      subject: `[Contact] ${data.subject || '(no subject)'} — from ${data.firstName} ${data.lastName}`,
      html,
    })
  } catch (error) {
    console.error('[lib/email/sendContactNotification]', error)
    throw error
  }
}
