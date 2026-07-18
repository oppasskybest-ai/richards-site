'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../layout'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import { BroadcastComposer, BroadcastPreview } from '@/components/admin/BroadcastComposer'
import { Broadcast } from '@/types/database'

interface ScheduledBroadcast {
  id: string
  source_type: 'book' | 'article' | 'event'
  subject: string
  body: string
  scheduled_for: string
  status: string
}

export default function AdminBroadcasts() {
  const { token } = useAdmin()
  const authFetch = useAuthFetch()

  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [pending, setPending] = useState<ScheduledBroadcast[]>([])
  const [loading, setLoading] = useState(true)
  const [composing, setComposing] = useState(false)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [preview, setPreview] = useState<Broadcast | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const [res, pendingRes] = await Promise.all([
      authFetch('/api/admin/broadcasts'),
      authFetch('/api/admin/scheduled-broadcasts?status=pending'),
    ])
    if (res.ok) {
      const d = await res.json()
      setBroadcasts(Array.isArray(d) ? d : [])
    }
    if (pendingRes.ok) {
      const d = await pendingRes.json()
      setPending(d.data || [])
    }
    setLoading(false)
  }, [authFetch])

  useEffect(() => { load() }, [load])

  const cancelPending = async (id: string) => {
    if (!confirm('Cancel this scheduled notification? Subscribers will not be emailed about it.')) return
    await authFetch(`/api/admin/scheduled-broadcasts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'cancel' }),
    })
    load()
  }

  const pushBack = async (id: string, minutes: number) => {
    await authFetch(`/api/admin/scheduled-broadcasts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ action: 'reschedule', delayMinutesFromNow: minutes }),
    })
    load()
  }

  const timeUntil = (iso: string) => {
    const ms = new Date(iso).getTime() - Date.now()
    if (ms <= 0) return 'sending shortly'
    const mins = Math.round(ms / 60000)
    if (mins < 60) return `in ${mins} min`
    if (mins < 1440) return `in ${Math.round(mins / 60)} hr`
    return `in ${Math.round(mins / 1440)} days`
  }

  const send = async (asDraft = false) => {
    if (!subject.trim() || !body.trim()) { alert('Subject and body required.'); return }
    if (!asDraft && !confirm('Send to all active subscribers?')) return
    setSending(true)
    const res = await authFetch('/api/admin/broadcasts', {
      method: 'POST',
      body: JSON.stringify({ subject, body, send: !asDraft }),
    })
    setSending(false)
    if (res.ok) { setComposing(false); setSubject(''); setBody(''); load() }
    else { const d = await res.json(); alert(d.error || 'Failed.') }
  }

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400 }}>Broadcasts</h1>
        <button onClick={() => setComposing(true)}
          style={{ padding: '0.65rem 1.4rem', background: '#0f5c73', color: 'white', border: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
          + New Broadcast
        </button>
      </div>

      {composing && (
        <BroadcastComposer
          subject={subject}
          body={body}
          sending={sending}
          token={token}
          onSubjectChange={setSubject}
          onBodyChange={setBody}
          onSaveDraft={() => send(true)}
          onSend={() => send(false)}
          onClose={() => setComposing(false)}
        />
      )}

      {/* PENDING AUTO-SCHEDULED */}
      {pending.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15,92,115,0.8)', marginBottom: '0.85rem' }}>
            Pending — auto-scheduled ({pending.length})
          </h2>
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Subject', 'Source', 'Sends', ''].map((h) => (
                    <th key={h} style={{ padding: '0.7rem 1rem', textAlign: 'left', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15,92,115,0.6)', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.8rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', maxWidth: '280px' }}>
                      <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.subject}</p>
                    </td>
                    <td style={{ padding: '0.8rem 1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' }}>{p.source_type}</td>
                    <td style={{ padding: '0.8rem 1rem', fontSize: '0.78rem', color: '#17798f' }}>{timeUntil(p.scheduled_for)}</td>
                    <td style={{ padding: '0.8rem 1rem', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                      <button onClick={() => pushBack(p.id, 60 * 24)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', cursor: 'pointer' }}>Push +1 day</button>
                      <button onClick={() => cancelPending(p.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.65)', fontSize: '0.72rem', cursor: 'pointer' }}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HISTORY */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading…</p>
        ) : broadcasts.length === 0 ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>No broadcasts yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Subject', 'Status', 'Recipients', 'Sent', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15,92,115,0.6)', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {broadcasts.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', maxWidth: '300px' }}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.subject}</p>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', borderRadius: '2px', background: b.status === 'sent' ? 'rgba(39,174,96,0.15)' : 'rgba(255,255,255,0.08)', color: b.status === 'sent' ? '#27ae60' : 'rgba(255,255,255,0.45)' }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>{b.recipient_count || '—'}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{b.sent_at?.slice(0, 10) || '—'}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button onClick={() => setPreview(b)} style={{ background: 'none', border: 'none', color: '#17798f', fontSize: '0.72rem', cursor: 'pointer' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {preview && (
        <BroadcastPreview broadcast={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  )
}
