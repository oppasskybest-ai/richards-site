'use client'
import { useRef } from 'react'
import Modal from '@/components/ui/Modal'
import ImageUpload from '@/components/admin/ImageUpload'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { Article } from '@/types/database'
import { CATEGORY_LABELS, CATEGORY_SLUGS } from '@/types/journalism'

type ArticleDraft = Partial<Article>

interface ArticleFormProps {
  article: ArticleDraft
  saving: boolean
  token: string
  onChange: (updated: ArticleDraft) => void
  onSave: () => void
  onClose: () => void
}

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.85rem', background: '#222',
  border: '1px solid rgba(255,255,255,0.1)', color: 'white',
  fontSize: '0.83rem', borderRadius: '2px', outline: 'none', boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.62rem', color: 'rgba(15,92,115,0.7)',
  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem',
}

export default function ArticleForm({ article, saving, token, onChange, onSave, onClose }: ArticleFormProps) {
  const pdfInputRef = useRef<HTMLInputElement>(null)
  const isNew = !article.id
  const isNative = article.content_type === 'native'

  // For native mode, title is required. For external, title + url required.
  const canSave = !saving && !!article.title && (isNative ? !!article.content_html : !!article.url)

  const set = (patch: Partial<Article>) => onChange({ ...article, ...patch })

  const uploadPdf = async (file: File) => {
    const form = new FormData()
    form.append('file', file)
    form.append('bucket', 'article-files')
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    })
    const data = await res.json()
    if (res.ok) set({ pdf_url: data.url })
    else alert(data.error || 'PDF upload failed.')
    if (pdfInputRef.current) pdfInputRef.current.value = ''
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={isNew ? 'Add Article' : 'Edit Article'}
      maxWidth="760px"
    >
      {/* MODE TOGGLE */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Article Type</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => set({ content_type: 'external', content_html: null })}
            style={{
              flex: 1, padding: '0.7rem 1rem',
              background: !isNative ? 'rgba(15,92,115,0.18)' : 'rgba(255,255,255,0.04)',
              border: !isNative ? '1px solid rgba(15,92,115,0.45)' : '1px solid rgba(255,255,255,0.1)',
              color: !isNative ? '#e8c989' : 'rgba(255,255,255,0.45)',
              fontSize: '0.78rem', cursor: 'pointer', borderRadius: '2px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            🔗 Link Externally
            <p style={{ fontSize: '0.65rem', color: 'inherit', opacity: 0.7, marginTop: '0.2rem', marginBottom: 0 }}>
              Published elsewhere — links out to Christianity Today, The Gospel Coalition, etc.
            </p>
          </button>
          <button
            type="button"
            onClick={() => set({ content_type: 'native', url: '' })}
            style={{
              flex: 1, padding: '0.7rem 1rem',
              background: isNative ? 'rgba(15,92,115,0.18)' : 'rgba(255,255,255,0.04)',
              border: isNative ? '1px solid rgba(15,92,115,0.45)' : '1px solid rgba(255,255,255,0.1)',
              color: isNative ? '#e8c989' : 'rgba(255,255,255,0.45)',
              fontSize: '0.78rem', cursor: 'pointer', borderRadius: '2px',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            ✍️ Write Here
            <p style={{ fontSize: '0.65rem', color: 'inherit', opacity: 0.7, marginTop: '0.2rem', marginBottom: 0 }}>
              Published directly on randolphrichards.com
            </p>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

        {/* TITLE */}
        <div style={{ gridColumn: '1/-1' }}>
          <label style={labelStyle}>Title *</label>
          <input style={fieldStyle} value={article.title ?? ''} onChange={(e) => set({ title: e.target.value })} placeholder="Article title" />
        </div>

        {/* PUBLICATION (external only) */}
        {!isNative && (
          <div>
            <label style={labelStyle}>Publication *</label>
            <input style={fieldStyle} value={article.publication ?? ''} onChange={(e) => set({ publication: e.target.value })} placeholder="e.g. Christianity Today" />
          </div>
        )}

        {/* CATEGORY */}
        <div>
          <label style={labelStyle}>Category</label>
          <select style={fieldStyle} value={article.category ?? 'bible-culture'} onChange={(e) => set({ category: e.target.value as Article['category'] })}>
            {CATEGORY_SLUGS.map((s) => <option key={s} value={s}>{CATEGORY_LABELS[s]}</option>)}
          </select>
        </div>

        {/* EXTERNAL URL (external only) */}
        {!isNative && (
          <div style={{ gridColumn: '1/-1' }}>
            <label style={labelStyle}>URL *</label>
            <input style={fieldStyle} type="url" value={article.url ?? ''} onChange={(e) => set({ url: e.target.value })} placeholder="https://…" />
          </div>
        )}

        {/* DATES + STATUS */}
        {!isNative && (
          <div>
            <label style={labelStyle}>Publication Date</label>
            <input style={fieldStyle} type="date" value={article.date?.slice(0, 10) ?? ''} onChange={(e) => set({ date: e.target.value })} />
            <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.35rem', lineHeight: 1.5 }}>
              When the piece was originally published elsewhere.
            </p>
          </div>
        )}

        <div>
          <label style={labelStyle}>Status</label>
          <select style={fieldStyle} value={article.status ?? 'published'} onChange={(e) => set({ status: e.target.value as Article['status'] })}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {(article.status ?? 'published') === 'published' && (
          <div>
            <label style={labelStyle}>Notify subscribers after (minutes)</label>
            <input style={fieldStyle} type="number" min={5} max={10080}
              value={(article as any).send_delay_minutes ?? 30}
              onChange={(e) => set({ send_delay_minutes: parseInt(e.target.value) || 30 } as any)} />
            <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.35rem', lineHeight: 1.5 }}>
              Default 30. Range 5–10080 (7 days). Only fires once per article — editing again won't re-notify. Cancelled if unpublished or deleted first.
            </p>
          </div>
        )}

        {/* EXCERPT */}
        <div style={{ gridColumn: '1/-1' }}>
          <label style={labelStyle}>Excerpt</label>
          <textarea style={{ ...fieldStyle, minHeight: '70px', resize: 'vertical' }} value={article.excerpt ?? ''} onChange={(e) => set({ excerpt: e.target.value })} placeholder="Short description shown on archive cards" />
        </div>

        {/* COVER IMAGE — uses ImageUpload component */}
        <div style={{ gridColumn: '1/-1' }}>
          <ImageUpload
            value={article.image ?? ''}
            onChange={(url) => set({ image: url })}
            bucket="article-images"
            label="Cover Image"
            token={token}
          />
        </div>

        {/* FEATURED */}
        <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <input type="checkbox" id="article-featured" checked={article.featured ?? false} onChange={(e) => set({ featured: e.target.checked })} style={{ accentColor: '#0f5c73', width: '14px', height: '14px' }} />
          <label htmlFor="article-featured" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
            Featured — shows on homepage
          </label>
        </div>

        {/* COMMENTS TOGGLE — native articles only */}
        {isNative && (
          <div style={{ gridColumn: '1/-1', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <input type="checkbox" id="article-comments" checked={article.comments_enabled ?? false} onChange={(e) => set({ comments_enabled: e.target.checked })} style={{ accentColor: '#0f5c73', width: '14px', height: '14px' }} />
            <label htmlFor="article-comments" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
              Enable comments on this article
            </label>
          </div>
        )}
      </div>

      {/* RICH EDITOR — native mode only */}
      {isNative && (
        <div style={{ marginTop: '1.25rem' }}>
          <label style={{ ...labelStyle, marginBottom: '0.6rem' }}>Content *</label>
          <RichTextEditor
            content={article.content_html ?? ''}
            onChange={(html) => set({ content_html: html })}
            token={token}
            bucket="article-images"
          />
        </div>
      )}

      {/* PDF UPLOAD — native mode only */}
      {isNative && (
        <div style={{ marginTop: '1.25rem' }}>
          <label style={labelStyle}>PDF Attachment (optional)</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input ref={pdfInputRef} type="file" accept=".pdf" style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPdf(f) }} />
            <button type="button"
              onClick={() => pdfInputRef.current?.click()}
              style={{ padding: '0.55rem 1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', cursor: 'pointer', borderRadius: '2px', flexShrink: 0 }}>
              ↑ Upload PDF
            </button>
            <input type="text" value={article.pdf_url ?? ''}
              onChange={(e) => set({ pdf_url: e.target.value })}
              placeholder="or paste PDF URL…"
              style={{ flex: 1, padding: '0.55rem 0.85rem', background: '#222', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.8rem', borderRadius: '2px', outline: 'none', boxSizing: 'border-box' }} />
            {article.pdf_url && (
              <button type="button" onClick={() => set({ pdf_url: '' })}
                style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)', cursor: 'pointer', fontSize: '0.72rem', flexShrink: 0 }}>
                Remove
              </button>
            )}
          </div>
          {article.pdf_url && (
            <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem' }}>
              PDF attached — readers will see a download link at the end of the article.
            </p>
          )}
        </div>
      )}

      {/* ACTIONS */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', justifyContent: 'flex-end' }}>
        <button onClick={onClose}
          style={{ padding: '0.65rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
          Cancel
        </button>
        <button onClick={onSave} disabled={!canSave}
          style={{ padding: '0.65rem 1.5rem', background: '#0f5c73', color: 'white', border: 'none', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: canSave ? 'pointer' : 'not-allowed', borderRadius: '2px', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : 'Save Article'}
        </button>
      </div>
    </Modal>
  )
}
