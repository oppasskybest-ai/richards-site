'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../layout'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'
import ArticleForm from '@/components/admin/ArticleForm'
import { Article } from '@/types/database'
import { CATEGORY_LABELS, CATEGORY_SLUGS } from '@/types/journalism'

const EMPTY: Partial<Article> = {
  title: '', slug: '', publication: '', category: 'bible-culture',
  url: '', date: '', excerpt: '', image: '', featured: false, status: 'published',
  // Defaults to true so a new native article behaves like every seeded one
  // (see lib/config/articles.ts's `comments_enabled ?? true`) instead of
  // silently shipping with comments off -- still overridable via the
  // checkbox in ArticleForm for any post Randy wants to disable them on.
  content_type: 'external', content_html: null, pdf_url: null, comments_enabled: true,
}

const filterInputStyle: React.CSSProperties = {
  padding: '0.6rem 0.85rem', background: '#222', border: '1px solid rgba(255,255,255,0.1)',
  color: 'white', fontSize: '0.83rem', borderRadius: '2px', outline: 'none', boxSizing: 'border-box',
}

export default function AdminArticles() {
  const { token } = useAdmin()
  const authFetch = useAuthFetch()

  const [articles, setArticles] = useState<Article[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [editing, setEditing] = useState<Partial<Article> | null>(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    if (catFilter) params.set('category', catFilter)
    const res = await authFetch(`/api/admin/articles?${params}`)
    if (!res.ok) { setLoading(false); return }
    const d = await res.json()
    setArticles(d.data || [])
    setTotal(d.total || 0)
    setLoading(false)
  }, [page, search, catFilter, authFetch])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const isNew = !editing.id
    const url = isNew ? '/api/admin/articles' : `/api/admin/articles/${editing.id}`
    const method = isNew ? 'POST' : 'PUT'
    const slug = editing.slug || (editing.title || '').toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
    const payload = { ...editing, slug }
    const res = await authFetch(url, { method, body: JSON.stringify(payload) })
    setSaving(false)
    if (res.ok) { setEditing(null); load() }
    else { const d = await res.json(); alert(d.error || 'Save failed.') }
  }

  const del = async (id: string) => {
    if (!confirm('Delete this article?')) return
    await authFetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div style={{ padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.25rem' }}>Articles</h1>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>{total} total</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })}
          style={{ padding: '0.65rem 1.4rem', background: 'var(--gold)', color: 'white', border: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
          + Add Article
        </button>
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input placeholder="Search titles…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          style={{ ...filterInputStyle, width: '240px' }} />
        <select value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setPage(1) }}
          style={{ ...filterInputStyle, width: '180px' }}>
          <option value="">All categories</option>
          {CATEGORY_SLUGS.map((s) => <option key={s} value={s}>{CATEGORY_LABELS[s]}</option>)}
        </select>
      </div>

      {/* TABLE */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading…</p>
        ) : articles.length === 0 ? (
          <p style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>No articles found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Title', 'Publication', 'Category', 'Pub. Date', 'Posted', ''].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--gold-rgb),0.6)', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', maxWidth: '280px' }}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</p>
                    {a.featured && <span style={{ fontSize: '0.58rem', color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Featured</span>}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{a.publication}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(var(--gold-rgb),0.7)', whiteSpace: 'nowrap' }}>{CATEGORY_LABELS[a.category as keyof typeof CATEGORY_LABELS]}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>{a.date?.slice(0, 10)}</td>
                  <td style={{ padding: '0.85rem 1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{a.created_at?.slice(0, 10)}</td>
                  <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                    <button onClick={() => setEditing(a)} style={{ background: 'none', border: 'none', color: 'var(--gold-light)', fontSize: '0.72rem', cursor: 'pointer', marginRight: '0.75rem' }}>Edit</button>
                    <button onClick={() => del(a.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', fontSize: '0.72rem', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {total > 25 && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', alignItems: 'center' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '0.4rem 0.85rem', background: '#222', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: '2px', opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Page {page} of {Math.ceil(total / 25)}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 25)}
            style={{ padding: '0.4rem 0.85rem', background: '#222', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.72rem', cursor: 'pointer', borderRadius: '2px', opacity: page >= Math.ceil(total / 25) ? 0.4 : 1 }}>Next →</button>
        </div>
      )}

      {editing && (
        <ArticleForm
          article={editing}
          saving={saving}
          token={token}
          onChange={setEditing}
          onSave={save}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
