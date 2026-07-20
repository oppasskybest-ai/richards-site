'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../layout'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import Modal from '@/components/ui/Modal'
import ImageUpload from '@/components/admin/ImageUpload'
import type { PodcastData } from '@/types/podcasts'

type PodcastRow = Partial<PodcastData> & { order_index?: number }

const EMPTY: PodcastRow = {
  title: '', source: '', description: '', url: '', embedUrl: '', image: '', date: '', order_index: 0,
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

export default function AdminPodcasts() {
  const { token } = useAdmin()
  const authFetch = useAuthFetch()

  const [podcasts, setPodcasts] = useState<PodcastRow[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<PodcastRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500) }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authFetch('/api/admin/podcasts')
      if (!res.ok) { setLoading(false); return }
      const d = await res.json()
      setPodcasts(Array.isArray(d) ? d : d.data || [])
    } catch { showToast('Could not load podcasts.') }
    setLoading(false)
  }, [authFetch])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const isNew = !editing.id
    const url = isNew ? '/api/admin/podcasts' : `/api/admin/podcasts/${editing.id}`
    const method = isNew ? 'POST' : 'PUT'
    try {
      const res = await authFetch(url, { method, body: JSON.stringify(editing) })
      const d = await res.json()
      if (res.ok) { setEditing(null); load(); showToast(isNew ? 'Podcast added.' : 'Podcast updated.') }
      else showToast(d.message || d.error || 'Save failed.')
    } catch { showToast('Save failed.') }
    setSaving(false)
  }

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await authFetch(`/api/admin/podcasts/${id}`, { method: 'DELETE' })
      showToast('Podcast deleted.')
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
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Podcasts</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
            {podcasts.length} total {podcasts.length === 0 && '· public page shows the built-in fallback list until Supabase is connected'}
          </p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })}
          style={{ padding: '0.65rem 1.4rem', background: 'var(--gold)', color: 'white', border: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
          + Add Podcast
        </button>
      </div>

      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading…</p>
        ) : podcasts.length === 0 ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
            No podcasts in the database yet. The public page falls back to the
            9 real entries in <code>lib/config/podcasts.ts</code> — add one
            here once Supabase is connected to start managing them from this
            table instead.
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Title', 'Source', 'URL', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--gold-rgb),0.6)', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {podcasts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', maxWidth: '260px' }}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{p.source}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(var(--gold-rgb),0.7)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.url}</td>
                  <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                    <button onClick={() => setEditing(p)} style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontSize: '0.72rem', cursor: 'pointer', marginRight: '0.75rem' }}>Edit</button>
                    <button onClick={() => del(p.id as string, p.title as string)} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', fontSize: '0.72rem', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <Modal open onClose={() => setEditing(null)} title={editing.id ? 'Edit Podcast' : 'Add Podcast'} maxWidth="640px">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Title *</label>
              <input style={fieldStyle} value={editing.title ?? ''} onChange={(e) => setEditing(v => ({ ...v, title: e.target.value }))} placeholder="Episode title" />
            </div>

            <div>
              <label style={labelStyle}>Source / Show *</label>
              <input style={fieldStyle} value={editing.source ?? ''} onChange={(e) => setEditing(v => ({ ...v, source: e.target.value }))} placeholder="e.g. Theology in the Raw" />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input style={fieldStyle} type="date" value={editing.date ?? ''} onChange={(e) => setEditing(v => ({ ...v, date: e.target.value }))} />
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...fieldStyle, minHeight: '90px', resize: 'vertical' }} value={editing.description ?? ''} onChange={(e) => setEditing(v => ({ ...v, description: e.target.value }))} placeholder="What this episode is about…" />
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Listen / Watch URL *</label>
              <input style={fieldStyle} type="url" value={editing.url ?? ''} onChange={(e) => setEditing(v => ({ ...v, url: e.target.value }))} placeholder="https://…" />
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <ImageUpload
                value={editing.image ?? ''}
                onChange={(url) => setEditing(v => ({ ...v, image: url }))}
                bucket="article-images"
                label="Preview Image (optional — YouTube/Vimeo/Spotify links get an automatic preview instead)"
                token={token}
              />
            </div>

            <div style={{ gridColumn: '1/-1' }}>
              <label style={labelStyle}>Embed URL (optional)</label>
              <input style={fieldStyle} type="url" value={editing.embedUrl ?? ''} onChange={(e) => setEditing(v => ({ ...v, embedUrl: e.target.value }))} placeholder="Leave blank to just link out — safest default" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setEditing(null)}
              style={{ padding: '0.65rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
              Cancel
            </button>
            <button onClick={save} disabled={saving || !editing.title || !editing.source || !editing.url}
              style={{ padding: '0.65rem 1.5rem', background: 'var(--gold)', color: 'white', border: 'none', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Save Podcast'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
