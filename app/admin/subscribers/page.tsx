'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../layout'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import { Subscriber } from '@/types/database'

export default function AdminSubscribers() {
  const { token } = useAdmin()
  const authFetch = useAuthFetch()

  const [subs, setSubs] = useState<Subscriber[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'active' | 'unsubscribed'>('active')

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), status: tab })
    if (search) params.set('search', search)
    const res = await authFetch(`/api/admin/subscribers?${params}`)
    if (!res.ok) { setLoading(false); return }
    const d = await res.json()
    setSubs(d.data || [])
    setTotal(d.total || 0)
    setLoading(false)
  }, [page, search, tab, authFetch])

  useEffect(() => { load() }, [load])

  const unsubscribe = async (id: string) => {
    if (!confirm('Permanently delete this subscriber? This cannot be undone — use "Mark unsubscribed" instead if you just want to stop emailing them.')) return
    await authFetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' })
    load()
  }

  const setStatus = async (id: string, status: 'active' | 'unsubscribed') => {
    await authFetch(`/api/admin/subscribers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    load()
  }

  const exportCSV = () => {
    const rows = [['Email', 'First Name', 'Status', 'Subscribed']].concat(
      subs.map((s) => [s.email, s.first_name || '', s.status, s.created_at?.slice(0, 10) || ''])
    )
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `subscribers-${tab}-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Subscribers</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{total} {tab}</p>
        </div>
        <button onClick={exportCSV} style={{ padding: '0.6rem 1.2rem', background: 'transparent', border: '1px solid rgba(15,92,115,0.4)', color: '#17798f', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
          Export CSV
        </button>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {(['active', 'unsubscribed'] as const).map((t) => (
          <button key={t} onClick={() => { setTab(t); setPage(1) }}
            style={{ padding: '0.7rem 1.25rem', background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? '#0f5c73' : 'transparent'}`, color: tab === t ? '#17798f' : 'rgba(255,255,255,0.35)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '-1px' }}>
            {t}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input placeholder="Search by email…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          style={{ padding: '0.6rem 0.85rem', background: '#222', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.83rem', borderRadius: '2px', outline: 'none', width: '280px' }} />
      </div>

      {/* TABLE */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading…</p>
        ) : subs.length === 0 ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>No subscribers found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Email', 'Name', 'Subscribed', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(15,92,115,0.6)', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                  <td style={{ padding: '0.8rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>{s.email}</td>
                  <td style={{ padding: '0.8rem 1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>{s.first_name || '—'}</td>
                  <td style={{ padding: '0.8rem 1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>{s.created_at?.slice(0, 10)}</td>
                  <td style={{ padding: '0.8rem 1rem', display: 'flex', gap: '0.9rem' }}>
                    {tab === 'active' ? (
                      <button onClick={() => setStatus(s.id, 'unsubscribed')} style={{ background: 'none', border: 'none', color: 'rgba(212,175,90,0.75)', fontSize: '0.72rem', cursor: 'pointer' }}>Mark unsubscribed</button>
                    ) : (
                      <button onClick={() => setStatus(s.id, 'active')} style={{ background: 'none', border: 'none', color: 'rgba(212,175,90,0.75)', fontSize: '0.72rem', cursor: 'pointer' }}>Reactivate</button>
                    )}
                    <button onClick={() => unsubscribe(s.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', fontSize: '0.72rem', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {total > 50 && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', alignItems: 'center' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '0.4rem 0.85rem', background: '#222', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: '2px', opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Page {page} of {Math.ceil(total / 50)}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 50)}
            style={{ padding: '0.4rem 0.85rem', background: '#222', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: '2px', opacity: page >= Math.ceil(total / 50) ? 0.4 : 1 }}>Next →</button>
        </div>
      )}
    </div>
  )
}
