'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../layout'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import Modal from '@/components/ui/Modal'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Event } from '@/types/database'

const EMPTY: Partial<Event> = {
  title: '', subtitle: '', description: '',
  event_date: '', event_time: '', end_date: '',
  venue: '', location: '', event_type: 'Talk',
  register_url: '', image: '', status: 'upcoming',
}

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.85rem', background: '#222',
  border: '1px solid rgba(255,255,255,0.1)', color: 'white',
  fontSize: '0.83rem', borderRadius: '2px', outline: 'none', boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.62rem', color: 'rgba(var(--gold-rgb),0.7)',
  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem',
}

function formatDate(d?: string | null) {
  if (!d) return '—'
  return d.slice(0, 10)
}

export default function AdminEvents() {
  const { token } = useAdmin()
  const authFetch = useAuthFetch()

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Event> | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500) }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authFetch('/api/admin/events')
      if (!res.ok) { setLoading(false); return }
      const d = await res.json()
      setEvents(d.data || [])
    } catch { showToast('Could not load events.') }
    setLoading(false)
  }, [authFetch])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const isNew = !editing.id
    const url = isNew ? '/api/admin/events' : `/api/admin/events/${editing.id}`
    const method = isNew ? 'POST' : 'PUT'
    try {
      const res = await authFetch(url, { method, body: JSON.stringify(editing) })
      const d = await res.json()
      if (res.ok) { setEditing(null); load(); showToast(isNew ? 'Event created.' : 'Event updated.') }
      else showToast(d.message || 'Save failed.')
    } catch { showToast('Save failed.') }
    setSaving(false)
  }

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await authFetch(`/api/admin/events/${id}`, { method: 'DELETE' })
      showToast('Event deleted.')
      load()
    } catch { showToast('Delete failed.') }
  }

  return (
    <div style={{ padding: '2.5rem' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem',
          background: 'var(--gold)', color: 'white', padding: '0.85rem 1.5rem',
          zIndex: 600, fontSize: '0.85rem', borderRadius: '2px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Events</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{events.length} total</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })}
          style={{ padding: '0.65rem 1.4rem', background: 'var(--gold)', color: 'white', border: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
          + Add Event
        </button>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading…</p>
        ) : events.length === 0 ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            No events yet. The public events page shows a &quot;stay tuned&quot; message until you add one.
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Title', 'Date', 'Type', 'Status', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--gold-rgb),0.6)', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', maxWidth: '260px' }}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</p>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
                    {formatDate(ev.event_date)}{ev.event_time ? ` · ${ev.event_time}` : ''}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(var(--gold-rgb),0.7)', whiteSpace: 'nowrap' }}>{ev.event_type}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                    <span style={{
                      color: ev.status === 'upcoming' ? '#5ad88a' : ev.status === 'past' ? 'rgba(255,255,255,0.4)' : '#d85a5a',
                    }}>
                      {ev.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                    <button onClick={() => setEditing(ev)} style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontSize: '0.72rem', cursor: 'pointer', marginRight: '0.75rem' }}>Edit</button>
                    <button onClick={() => del(ev.id, ev.title)} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', fontSize: '0.72rem', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <Modal open onClose={() => setEditing(null)} title={editing.id ? 'Edit Event' : 'Add Event'} maxWidth="680px">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Title *</label>
              <input style={fieldStyle} value={editing.title ?? ''} onChange={(e) => setEditing(v => ({ ...v, title: e.target.value }))} placeholder="Event title" />
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Subtitle</label>
              <input style={fieldStyle} value={editing.subtitle ?? ''} onChange={(e) => setEditing(v => ({ ...v, subtitle: e.target.value }))} placeholder="Short tagline (optional)" />
            </div>

            <div>
              <label style={labelStyle}>Event Date *</label>
              <input style={fieldStyle} type="date" value={editing.event_date ?? ''} onChange={(e) => setEditing(v => ({ ...v, event_date: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Event Time</label>
              <input style={fieldStyle} type="time" value={editing.event_time ?? ''} onChange={(e) => setEditing(v => ({ ...v, event_time: e.target.value }))} />
            </div>

            <div>
              <label style={labelStyle}>End Date</label>
              <input style={fieldStyle} type="date" value={editing.end_date ?? ''} onChange={(e) => setEditing(v => ({ ...v, end_date: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Type</label>
              <select style={fieldStyle} value={editing.event_type ?? 'Talk'} onChange={(e) => setEditing(v => ({ ...v, event_type: e.target.value }))}>
                <option value="Talk">Talk</option>
                <option value="Reading">Reading</option>
                <option value="Panel">Panel</option>
                <option value="Signing">Book Signing</option>
                <option value="Workshop">Workshop</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Venue</label>
              <input style={fieldStyle} value={editing.venue ?? ''} onChange={(e) => setEditing(v => ({ ...v, venue: e.target.value }))} placeholder="e.g. 92nd Street Y" />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input style={fieldStyle} value={editing.location ?? ''} onChange={(e) => setEditing(v => ({ ...v, location: e.target.value }))} placeholder="e.g. New York, NY" />
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...fieldStyle, minHeight: '90px', resize: 'vertical' }} value={editing.description ?? ''} onChange={(e) => setEditing(v => ({ ...v, description: e.target.value }))} placeholder="What this event is about…" />
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Registration / Details URL</label>
              <input style={fieldStyle} type="url" value={editing.register_url ?? ''} onChange={(e) => setEditing(v => ({ ...v, register_url: e.target.value }))} placeholder="https://…" />
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <ImageUpload
                value={editing.image ?? ''}
                onChange={(url) => setEditing(v => ({ ...v, image: url }))}
                bucket="article-images"
                label="Event Image"
                token={token}
              />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select style={fieldStyle} value={editing.status ?? 'upcoming'} onChange={(e) => setEditing(v => ({ ...v, status: e.target.value as Event['status'] }))}>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setEditing(null)}
              style={{ padding: '0.65rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
              Cancel
            </button>
            <button onClick={save} disabled={saving || !editing.title || !editing.event_date}
              style={{ padding: '0.65rem 1.5rem', background: 'var(--gold)', color: 'white', border: 'none', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Save Event'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
