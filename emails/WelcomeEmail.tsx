import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Font,
} from '@react-email/components'

interface WelcomeEmailProps {
  firstName?: string
  email: string
}

export default function WelcomeEmail({ firstName = 'there', email }: WelcomeEmailProps) {
  const unsubscribeUrl = `https://randolphrichards.com/api/unsubscribe?email=${encodeURIComponent(email)}`

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Playfair Display"
          fallbackFontFamily="Georgia"
          webFont={{
            url: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body style={body}>
        <Container style={container}>

          {/* GOLD RULE LINE */}
          <Section style={ruleSection}>
            <div style={ruleLine} />
          </Section>

          {/* HEADER */}
          <Section style={headerSection}>
            <Text style={siteName}>Biblical Thoughts</Text>
          </Section>

          {/* BODY */}
          <Section style={bodySection}>
            <Text style={greeting}>Hi {firstName},</Text>

            <Text style={paragraph}>
              Thanks for subscribing. You&rsquo;re now on the list.
            </Text>

            <Text style={paragraph}>
              I&rsquo;ll be in touch when I publish something new — journalism, essays, and the
              occasional thing I&rsquo;m too proud not to share. I don&rsquo;t send a lot of emails.
              When I do, I try to make them worth your time.
            </Text>

            <Text style={paragraph}>
              In the meantime, the archive is yours to explore.
            </Text>

            <Text style={signature}>— Randy</Text>
          </Section>

          <Hr style={divider} />

          {/* FOOTER */}
          <Section style={footerSection}>
            <Text style={footerText}>
              Biblical Thoughts &middot;{' '}
              <Link href="https://randolphrichards.com" style={footerLink}>
                randolphrichards.com
              </Link>
            </Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#f8f6f1',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  margin: 0,
  padding: '2rem 0',
}

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  maxWidth: '600px',
  margin: '0 auto',
  borderRadius: '2px',
  border: '1px solid rgba(0,0,0,0.08)',
  overflow: 'hidden',
}

const ruleSection: React.CSSProperties = {
  backgroundColor: '#1c1a17',
  padding: '2rem 2.5rem 0',
}

const ruleLine: React.CSSProperties = {
  width: '36px',
  height: '2px',
  backgroundColor: '#0f5c73',
  marginBottom: '1.25rem',
}

const headerSection: React.CSSProperties = {
  backgroundColor: '#1c1a17',
  padding: '0 2.5rem 2rem',
}

const siteName: React.CSSProperties = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: '1.4rem',
  color: '#ffffff',
  margin: 0,
  fontWeight: 400,
  letterSpacing: '-0.01em',
}

const bodySection: React.CSSProperties = {
  padding: '2.5rem',
}

const greeting: React.CSSProperties = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: '1.1rem',
  color: '#1c1a17',
  fontStyle: 'italic',
  marginBottom: '1.25rem',
  fontWeight: 400,
}

const paragraph: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#3a3a3a',
  lineHeight: '1.8',
  marginBottom: '1rem',
  fontWeight: 300,
}

const signature: React.CSSProperties = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: '1rem',
  color: '#1c1a17',
  marginTop: '1.75rem',
  fontWeight: 400,
}

const divider: React.CSSProperties = {
  borderColor: 'rgba(0,0,0,0.08)',
  margin: '0 2.5rem',
}

const footerSection: React.CSSProperties = {
  padding: '1.5rem 2.5rem',
}

const footerText: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#999999',
  margin: '0 0 0.35rem',
  lineHeight: '1.6',
}

const footerLink: React.CSSProperties = {
  color: '#0f5c73',
  textDecoration: 'none',
}

const unsubscribeLink: React.CSSProperties = {
  color: '#999999',
  textDecoration: 'underline',
}
