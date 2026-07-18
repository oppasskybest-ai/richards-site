'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../layout'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import { ContactMessage } from '@/types/database'

export default function AdminMessages() {
  const { token } = useAdmin()
  const authFetch = useAuthFetch()

  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'unread' | 'read' | 'replied'>('unread')
  const [open, setOpen] = useState<ContactMessage | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await authFetch(`/api/admin/messages?status=${tab}`)
    if (!res.ok) { setLoading(false); return }
    const d = await res.json()
    setMessages(d.data || [])
    setTotal(d.total || 0)
    setLoading(false)
  }, [tab, authFetch])

  useEffect(() => { load() }, [load])

  const updateStatus = async (id: string, status: string) => {
    await authFetch(`/api/admin/messages/${id}`, { method: 'PUT', body: JSON.stringify({ status }) })
    load()
    if (open?.id === id) setOpen(null)
  }

  const del = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await authFetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    load()
    if (open?.id === id) setOpen(null)
  }

  const openMsg = async (msg: ContactMessage) => {
    setOpen(msg)
    if (msg.status === 'unread') {
      await updateStatus(msg.id, 'read')
    }
  }

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Messages</h1>
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{total} {tab}</p>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {(['unread', 'read', 'replied'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '0.7rem 1.25rem', background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--gold)' : 'transparent'}`, color: tab === t ? 'var(--gold-light)' : 'rgba(255,255,255,0.35)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '-1px' }}>
            {t}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading…</p>
        ) : messages.length === 0 ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>No {tab} messages.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['From', 'Subject', 'Date', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--gold-rgb),0.6)', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  onClick={() => openMsg(m)}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <p style={{ fontSize: '0.82rem', color: 'white', marginBottom: '2px' }}>{m.first_name} {m.last_name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{m.email}</p>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', maxWidth: '240px' }}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.subject}</p>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>{m.created_at?.slice(0, 10)}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button onClick={(e) => { e.stopPropagation(); del(m.id) }} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', fontSize: '0.72rem', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* OPEN MESSAGE */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', width: '100%', maxWidth: '600px', maxHeight: '85vh', overflow: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.62rem', color: 'rgba(var(--gold-rgb),0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Message</p>
              <button onClick={() => setOpen(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: '0.85rem', color: 'white', marginBottom: '4px' }}>{open.first_name} {open.last_name}</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: '4px' }}>{open.email}</p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>{open.created_at?.slice(0, 10)}</p>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>{open.subject}</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{open.message}</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${open.email}?subject=Re: ${open.subject}`}
                onClick={() => updateStatus(open.id, 'replied')}
                style={{ padding: '0.65rem 1.25rem', background: 'var(--gold)', color: 'white', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', textDecoration: 'none' }}>
                Reply via Email
              </a>
              {open.status !== 'replied' && (
                <button onClick={() => updateStatus(open.id, 'replied')} style={{ padding: '0.65rem 1.1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
                  Mark Replied
                </button>
              )}
              <button onClick={() => del(open.id)} style={{ padding: '0.65rem 1.1rem', background: 'transparent', border: '1px solid rgba(255,80,80,0.2)', color: 'rgba(255,100,100,0.7)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
