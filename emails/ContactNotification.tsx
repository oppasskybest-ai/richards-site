import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components'

interface ContactNotificationProps {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export default function ContactNotification({
  firstName,
  lastName,
  email,
  subject,
  message,
}: ContactNotificationProps) {
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  const replyUrl = `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`

  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>

          {/* HEADER */}
          <Section style={headerSection}>
            <div style={ruleLine} />
            <Text style={siteName}>Biblical Thoughts</Text>
            <Text style={headerTitle}>New Message</Text>
          </Section>

          {/* SENDER META */}
          <Section style={metaSection}>
            <div style={metaRow}>
              <Text style={metaLabel}>From</Text>
              <Text style={metaValue}>
                {fullName}{' '}
                <Link href={`mailto:${email}`} style={emailLink}>
                  &lt;{email}&gt;
                </Link>
              </Text>
            </div>
            <div style={metaRow}>
              <Text style={metaLabel}>Subject</Text>
              <Text style={metaValue}>{subject || '(no subject)'}</Text>
            </div>
          </Section>

          <Hr style={divider} />

          {/* MESSAGE BODY */}
          <Section style={messageSection}>
            <Text style={messageLabel}>Message</Text>
            {message.split('\n').filter(Boolean).map((line, i) => (
              <Text key={i} style={messageParagraph}>
                {line}
              </Text>
            ))}
          </Section>

          <Hr style={divider} />

          {/* REPLY CTA */}
          <Section style={footerSection}>
            <Link href={replyUrl} style={replyButton}>
              Reply to {firstName} →
            </Link>
            <Text style={footerNote}>
              This message was submitted via the contact form at randolphrichards.com.
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

const headerSection: React.CSSProperties = {
  backgroundColor: '#1c1a17',
  padding: '2rem 2.5rem',
}

const ruleLine: React.CSSProperties = {
  width: '36px',
  height: '2px',
  backgroundColor: '#0f5c73',
  marginBottom: '1.25rem',
}

const siteName: React.CSSProperties = {
  fontSize: '0.62rem',
  color: 'rgba(15,92,115,0.7)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  margin: '0 0 0.35rem',
  fontWeight: 400,
}

const headerTitle: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: '1.5rem',
  color: '#ffffff',
  margin: 0,
  fontWeight: 400,
  letterSpacing: '-0.01em',
}

const metaSection: React.CSSProperties = {
  padding: '1.75rem 2.5rem',
  backgroundColor: '#fafaf8',
}

const metaRow: React.CSSProperties = {
  marginBottom: '0.6rem',
}

const metaLabel: React.CSSProperties = {
  fontSize: '0.62rem',
  color: '#0f5c73',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  margin: '0 0 0.2rem',
  fontWeight: 500,
}

const metaValue: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#1c1a17',
  margin: 0,
  lineHeight: '1.5',
}

const emailLink: React.CSSProperties = {
  color: '#0f5c73',
  textDecoration: 'none',
}

const divider: React.CSSProperties = {
  borderColor: 'rgba(0,0,0,0.08)',
  margin: 0,
}

const messageSection: React.CSSProperties = {
  padding: '2rem 2.5rem',
}

const messageLabel: React.CSSProperties = {
  fontSize: '0.62rem',
  color: '#0f5c73',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  margin: '0 0 1rem',
  fontWeight: 500,
}

const messageParagraph: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#3a3a3a',
  lineHeight: '1.75',
  marginBottom: '0.75rem',
  fontWeight: 300,
}

const footerSection: React.CSSProperties = {
  padding: '1.75rem 2.5rem',
}

const replyButton: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.75rem 1.75rem',
  backgroundColor: '#0f5c73',
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
  borderRadius: '2px',
  marginBottom: '1.25rem',
}

const footerNote: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#999999',
  margin: 0,
  lineHeight: '1.6',
}
