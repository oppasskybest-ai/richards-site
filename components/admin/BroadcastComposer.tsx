'use client'
import Modal from '@/components/ui/Modal'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { Broadcast } from '@/types/database'

// ── COMPOSE MODAL ────────────────────────────────────────────────────────────

interface ComposeProps {
  subject: string
  body: string
  sending: boolean
  token: string
  onSubjectChange: (v: string) => void
  onBodyChange: (v: string) => void
  onSaveDraft: () => void
  onSend: () => void
  onClose: () => void
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.7rem 0.9rem',
  background: '#222',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'white',
  fontSize: '0.85rem',
  borderRadius: '2px',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.62rem',
  color: 'rgba(15,92,115,0.7)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '0.4rem',
}

export function BroadcastComposer({
  subject,
  body,
  sending,
  token,
  onSubjectChange,
  onBodyChange,
  onSaveDraft,
  onSend,
  onClose,
}: ComposeProps) {
  // Strip HTML tags to check for actual text content before allowing send
  const hasBodyContent = body.replace(/<[^>]*>/g, '').trim().length > 0
  const canSend = !sending && subject.trim().length > 0 && hasBodyContent

  return (
    <Modal open onClose={onClose} title="New Broadcast" maxWidth="680px">
      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>Subject *</label>
        <input
          style={fieldStyle}
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Subject line…"
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ ...labelStyle, marginBottom: '0.6rem' }}>Body *</label>
        <RichTextEditor
          content={body}
          onChange={onBodyChange}
          token={token}
          bucket="article-images"
        />
      </div>

      <p style={{
        fontSize: '0.72rem',
        color: 'rgba(255,255,255,0.3)',
        marginBottom: '1.25rem',
        lineHeight: 1.6,
      }}>
        Formatted rich-text email — add headings, quotes, lists, and images just like an article. An unsubscribe link is added automatically to every email.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button
          onClick={onSaveDraft}
          disabled={sending}
          style={{
            padding: '0.65rem 1.25rem',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.7rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px',
          }}
        >
          Save Draft
        </button>
        <button
          onClick={onSend}
          disabled={!canSend}
          style={{
            padding: '0.65rem 1.5rem',
            background: '#0f5c73', color: 'white', border: 'none',
            fontSize: '0.7rem', letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: canSend ? 'pointer' : 'not-allowed',
            borderRadius: '2px',
            opacity: sending ? 0.7 : 1,
          }}
        >
          {sending ? 'Sending…' : 'Send Now'}
        </button>
      </div>
    </Modal>
  )
}

// ── PREVIEW MODAL ─────────────────────────────────────────────────────────────

interface PreviewProps {
  broadcast: Broadcast
  onClose: () => void
}

export function BroadcastPreview({ broadcast, onClose }: PreviewProps) {
  return (
    <Modal open onClose={onClose} maxWidth="600px">
      <p style={{
        fontSize: '0.62rem',
        color: 'rgba(15,92,115,0.7)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '0.75rem',
      }}>
        Broadcast Preview
      </p>
      <h3 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '1.1rem', color: 'white', fontWeight: 400,
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        {broadcast.subject}
      </h3>
      <div
        className="broadcast-preview-prose"
        style={{
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.75,
        }}
        dangerouslySetInnerHTML={{ __html: broadcast.body }}
      />

      <style>{`
        .broadcast-preview-prose h2 { font-family: "Playfair Display", serif; font-size: 1.3rem; font-weight: 400; color: white; margin: 1.25rem 0 0.6rem; }
        .broadcast-preview-prose h3 { font-family: "Playfair Display", serif; font-size: 1.05rem; font-weight: 400; color: white; margin: 1rem 0 0.5rem; }
        .broadcast-preview-prose p { margin-bottom: 0.9rem; }
        .broadcast-preview-prose strong { color: white; }
        .broadcast-preview-prose em { color: rgba(255,255,255,0.75); }
        .broadcast-preview-prose ul, .broadcast-preview-prose ol { padding-left: 1.4rem; margin-bottom: 0.9rem; }
        .broadcast-preview-prose blockquote { border-left: 3px solid #0f5c73; margin: 1rem 0; padding: 0.4rem 0 0.4rem 1.1rem; color: rgba(255,255,255,0.6); font-style: italic; }
        .broadcast-preview-prose img { max-width: 100%; height: auto; border-radius: 3px; margin: 0.85rem 0; }
        .broadcast-preview-prose hr { border: none; border-top: 1px solid rgba(255,255,255,0.12); margin: 1.25rem 0; }
      `}</style>
    </Modal>
  )
}
