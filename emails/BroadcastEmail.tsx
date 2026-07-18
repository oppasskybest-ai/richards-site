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

interface BroadcastEmailProps {
  subject: string
  body: string
  email: string
}

export default function BroadcastEmail({ subject, body, email }: BroadcastEmailProps) {
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
        {/* Rich-text content styling — the body below is HTML authored in the
            admin panel's rich editor (headings, quotes, lists, images) */}
        <style>{`
          .broadcast-rich-body h2 { font-family: "Playfair Display", Georgia, serif; font-size: 1.35rem; font-weight: 400; color: #1c1a17; margin: 1.5rem 0 0.75rem; }
          .broadcast-rich-body h3 { font-family: "Playfair Display", Georgia, serif; font-size: 1.1rem; font-weight: 400; color: #1c1a17; margin: 1.25rem 0 0.6rem; }
          .broadcast-rich-body p { margin: 0 0 1.1rem; }
          .broadcast-rich-body strong { color: #1c1a17; }
          .broadcast-rich-body ul, .broadcast-rich-body ol { padding-left: 1.4rem; margin: 0 0 1.1rem; }
          .broadcast-rich-body li { margin-bottom: 0.35rem; }
          .broadcast-rich-body blockquote { border-left: 3px solid #0f5c73; margin: 1.25rem 0; padding: 0.4rem 0 0.4rem 1.1rem; color: #6b6b6b; font-style: italic; }
          .broadcast-rich-body img { max-width: 100%; height: auto; border-radius: 3px; margin: 1rem 0; }
          .broadcast-rich-body hr { border: none; border-top: 1px solid rgba(0,0,0,0.12); margin: 1.5rem 0; }
        `}</style>
      </Head>
      <Body style={body_}>
        <Container style={container}>

          {/* GOLD RULE LINE */}
          <Section style={ruleSection}>
            <div style={ruleLine} />
          </Section>

          {/* HEADER */}
          <Section style={headerSection}>
            <Text style={siteName}>Biblical Thoughts</Text>
            <Text style={subjectLine}>{subject}</Text>
          </Section>

          {/* BODY — rich HTML authored in the admin panel's rich-text editor */}
          <Section style={bodySection}>
            <div
              className="broadcast-rich-body"
              style={paragraph}
              dangerouslySetInnerHTML={{ __html: body }}
            />

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
              You received this because you subscribed at randolphrichards.com.{' '}
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

const body_: React.CSSProperties = {
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
  fontSize: '0.65rem',
  color: 'rgba(15,92,115,0.75)',
  margin: '0 0 0.5rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 400,
}

const subjectLine: React.CSSProperties = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: '1.6rem',
  color: '#ffffff',
  margin: 0,
  fontWeight: 400,
  lineHeight: '1.2',
  letterSpacing: '-0.01em',
}

const bodySection: React.CSSProperties = {
  padding: '2.5rem',
}

const paragraph: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#3a3a3a',
  lineHeight: '1.8',
  marginBottom: '1.1rem',
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
