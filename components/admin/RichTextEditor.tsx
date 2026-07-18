'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useRef, useState } from 'react'

interface Props {
  content: string
  onChange: (html: string) => void
  token: string        // admin Bearer token for image upload
  bucket?: string      // Supabase Storage bucket (default: article-images)
}

const TOOLBAR_BTN: React.CSSProperties = {
  padding: '0.35rem 0.65rem',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.78rem',
  cursor: 'pointer',
  borderRadius: '2px',
  transition: 'background 0.15s ease, color 0.15s ease',
  lineHeight: 1,
}

const TOOLBAR_BTN_ACTIVE: React.CSSProperties = {
  ...TOOLBAR_BTN,
  background: 'rgba(var(--gold-rgb),0.25)',
  border: '1px solid rgba(var(--gold-rgb),0.4)',
  color: '#e8c989',
}

export default function RichTextEditor({
  content,
  onChange,
  token,
  bucket = 'article-images',
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        style: [
          'min-height: 320px',
          'padding: 1.25rem 1.5rem',
          'outline: none',
          'color: rgba(255,255,255,0.85)',
          'font-size: 0.95rem',
          'line-height: 1.8',
          'font-family: "Playfair Display", Georgia, serif',
        ].join(';'),
      },
    },
  })

  const uploadImage = async (file: File) => {
    setUploadError('')
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
        setUploadError(data.error || 'Image upload failed.')
      } else {
        editor?.chain().focus().setImage({ src: data.url }).run()
      }
    } catch {
      setUploadError('Image upload failed. Please try again.')
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  if (!editor) return (
    <div style={{ padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
      Loading editor…
    </div>
  )

  const btn = (active: boolean) => active ? TOOLBAR_BTN_ACTIVE : TOOLBAR_BTN

  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '3px',
      overflow: 'hidden',
      background: '#1a1a1a',
    }}>
      {/* TOOLBAR */}
      <div style={{
        background: '#222',
        padding: '0.5rem 0.75rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.35rem',
        alignItems: 'center',
      }}>
        {/* FORMAT */}
        <button type="button" style={btn(editor.isActive('bold'))}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </button>
        <button type="button" style={btn(editor.isActive('italic'))}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </button>

        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

        {/* HEADINGS */}
        <button type="button" style={btn(editor.isActive('heading', { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" style={btn(editor.isActive('heading', { level: 3 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>

        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

        {/* LISTS */}
        <button type="button" style={btn(editor.isActive('bulletList'))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button type="button" style={btn(editor.isActive('orderedList'))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </button>

        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

        {/* BLOCKS */}
        <button type="button" style={btn(editor.isActive('blockquote'))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          &quot; Quote
        </button>
        <button type="button" style={btn(editor.isActive('codeBlock'))}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          {'</>'}
        </button>
        <button type="button" style={TOOLBAR_BTN}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          ─ HR
        </button>

        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

        {/* IMAGE UPLOAD */}
        <button
          type="button"
          style={{ ...TOOLBAR_BTN, color: uploading ? 'rgba(255,255,255,0.35)' : TOOLBAR_BTN.color }}
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Insert image"
        >
          {uploading ? 'Uploading…' : '🖼 Image'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) uploadImage(file)
          }}
        />

        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

        {/* UNDO / REDO */}
        <button type="button" style={TOOLBAR_BTN}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}>
          ↩ Undo
        </button>
        <button type="button" style={TOOLBAR_BTN}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}>
          ↪ Redo
        </button>
      </div>

      {uploadError && (
        <p style={{
          padding: '0.5rem 1rem', margin: 0,
          background: 'rgba(231,76,60,0.12)',
          color: '#e74c3c', fontSize: '0.78rem',
          borderBottom: '1px solid rgba(231,76,60,0.2)',
        }}>
          {uploadError}
        </p>
      )}

      {/* EDITOR AREA */}
      <EditorContent editor={editor} />

      {/* PROSE STYLES — scoped to this editor */}
      <style>{`
        .ProseMirror h2 {
          font-family: "Playfair Display", serif;
          font-size: 1.5rem; font-weight: 400;
          color: white; margin: 1.5rem 0 0.75rem;
        }
        .ProseMirror h3 {
          font-family: "Playfair Display", serif;
          font-size: 1.15rem; font-weight: 400;
          color: white; margin: 1.25rem 0 0.6rem;
        }
        .ProseMirror p { margin-bottom: 1rem; }
        .ProseMirror strong { color: white; }
        .ProseMirror em { color: rgba(255,255,255,0.75); }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem; margin-bottom: 1rem;
          color: rgba(255,255,255,0.82);
        }
        .ProseMirror li { margin-bottom: 0.35rem; }
        .ProseMirror blockquote {
          border-left: 3px solid var(--gold);
          margin: 1.25rem 0; padding: 0.5rem 0 0.5rem 1.25rem;
          color: rgba(255,255,255,0.65); font-style: italic;
        }
        .ProseMirror code {
          background: rgba(255,255,255,0.08);
          padding: 0.1rem 0.35rem; border-radius: 2px;
          font-family: monospace; font-size: 0.88em;
          color: #e8c989;
        }
        .ProseMirror pre {
          background: rgba(0,0,0,0.35); border-radius: 3px;
          padding: 1rem 1.25rem; margin-bottom: 1rem; overflow-x: auto;
        }
        .ProseMirror pre code {
          background: none; padding: 0; color: rgba(255,255,255,0.8);
        }
        .ProseMirror hr {
          border: none; border-top: 1px solid rgba(255,255,255,0.12);
          margin: 1.5rem 0;
        }
        .ProseMirror img {
          max-width: 100%; height: auto;
          border-radius: 3px; margin: 1rem 0;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: rgba(255,255,255,0.2);
          pointer-events: none; float: left; height: 0;
        }
      `}</style>
    </div>
  )
}
