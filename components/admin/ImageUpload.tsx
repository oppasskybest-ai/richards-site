'use client'
import { useRef, useState } from 'react'

interface ImageUploadProps {
  value: string        // current image URL
  onChange: (url: string) => void
  bucket?: string      // Supabase Storage bucket name (default: article-images)
  label?: string
  token: string        // admin Bearer token for the upload API
}

export default function ImageUpload({
  value,
  onChange,
  bucket = 'article-images',
  label = 'Image',
  token,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    setError('')
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('bucket', bucket)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Upload failed.')
      } else {
        onChange(data.url)
      }
    } catch {
      setError('Upload failed. Please try again.')
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label style={{
        display: 'block', fontSize: '0.62rem', color: 'rgba(15,92,115,0.7)',
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem',
      }}>
        {label}
      </label>

      {/* PREVIEW */}
      {value && (
        <div style={{
          position: 'relative', marginBottom: '0.75rem',
          width: '120px', height: '120px',
          background: '#1a1a1a', borderRadius: '3px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <img
            src={value}
            alt="Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3' }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              position: 'absolute', top: '4px', right: '4px',
              background: 'rgba(0,0,0,0.7)', border: 'none',
              color: 'white', width: '22px', height: '22px',
              borderRadius: '50%', cursor: 'pointer', fontSize: '0.75rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            title="Remove image"
          >
            ✕
          </button>
        </div>
      )}

      {/* UPLOAD + URL ROW */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '0.55rem 1rem',
            background: uploading ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: uploading ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.75)',
            fontSize: '0.72rem', letterSpacing: '0.08em',
            cursor: uploading ? 'not-allowed' : 'pointer',
            borderRadius: '2px', flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {uploading ? 'Uploading…' : '↑ Upload'}
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or paste URL here…"
          style={{
            flex: 1, padding: '0.55rem 0.85rem', background: '#222',
            border: '1px solid rgba(255,255,255,0.1)', color: 'white',
            fontSize: '0.8rem', borderRadius: '2px', outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {error && (
        <p style={{ color: '#e74c3c', fontSize: '0.75rem', marginTop: '0.4rem' }}>{error}</p>
      )}
    </div>
  )
}
