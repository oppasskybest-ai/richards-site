import { Resend } from 'resend'
import { render } from '@react-email/render'
import BroadcastEmail from '@/emails/BroadcastEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
// Configurable so you can point sending at a verified test domain without
// touching code — set BROADCAST_FROM_EMAIL in Vercel env vars to override.
const FROM_ADDRESS = process.env.BROADCAST_FROM_EMAIL || 'E. Randolph Richards <hello@randolphrichards.com>'

interface BroadcastResult {
  sent: number
  errors: number
}

export async function sendBroadcast(
  emails: string[],
  subject: string,
  body: string
): Promise<BroadcastResult> {
  let sent = 0
  let errors = 0

  // Send in batches of 50 to stay within Resend rate limits
  const batches: string[][] = []
  for (let i = 0; i < emails.length; i += 50) {
    batches.push(emails.slice(i, i + 50))
  }

  for (const batch of batches) {
    for (const email of batch) {
      try {
        const html = await render(
          BroadcastEmail({ subject, body, email })
        )
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: email,
          subject,
          html,
        })
        sent++
      } catch (error) {
        console.error('[lib/email/sendBroadcast] Failed to send to', email, error)
        errors++
      }
    }
  }

  return { sent, errors }
}
