'use client'
import { useState } from 'react'
import { useAdmin } from '../layout'
import { useAuthFetch } from '@/lib/hooks/useAuthFetch'

function SeedSection() {
  const authFetch = useAuthFetch()
  const [seeding, setSeeding] = useState(false)
  const [result, setResult] = useState('')

  const handleSeed = async () => {
    if (!confirm(
      '⚠️ SEED DATA\n\nThis will insert all static articles and books into the database.\n\nArticles/books already in the database (by slug) will be SKIPPED — your admin edits are safe.\n\nRun the seed?'
    )) return

    setSeeding(true)
    setResult('')
    try {
      const res = await authFetch('/api/admin/seed', { method: 'POST' })
      const data = await res.json()
      setResult(data.message || (res.ok ? 'Done.' : 'Something went wrong.'))
    } catch {
      setResult('Request failed. Please try again.')
    }
    setSeeding(false)
  }

  return (
    <div style={{
      background: '#1a1a1a',
      border: '1px solid rgba(255,80,80,0.15)',
      borderRadius: '4px',
      padding: '1.75rem',
      marginBottom: '1.5rem',
    }}>
      <p style={{
        fontSize: '0.62rem', color: 'rgba(255,140,80,0.8)',
        letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.75rem',
      }}>
        ⚠ Seed Static Data
      </p>
      <p style={{
        fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '560px',
      }}>
        Inserts all hardcoded articles and books into Supabase so they appear on the public
        site and become editable from this admin panel. Items already in the database
        (matched by slug) are <strong style={{ color: 'rgba(255,255,255,0.75)' }}>always skipped</strong> —
        running this more than once is safe and will never overwrite changes you have
        already made from the admin panel.
      </p>
      <button
        onClick={handleSeed}
        disabled={seeding}
        style={{
          padding: '0.7rem 1.5rem',
          background: seeding ? 'rgba(255,140,80,0.15)' : 'rgba(255,140,80,0.12)',
          border: '1px solid rgba(255,140,80,0.3)',
          color: seeding ? 'rgba(255,140,80,0.4)' : 'rgba(255,140,80,0.85)',
          fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          cursor: seeding ? 'not-allowed' : 'pointer', borderRadius: '2px',
        }}
      >
        {seeding ? 'Seeding…' : 'Run Seed'}
      </button>
      {result && (
        <p style={{
          marginTop: '1rem', fontSize: '0.8rem',
          color: result.includes('error') || result.includes('failed')
            ? '#e74c3c' : 'rgba(90,216,138,0.85)',
          lineHeight: 1.6,
        }}>
          {result}
        </p>
      )}
    </div>
  )
}

export default function AdminSettings() {
  const { logout } = useAdmin()

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwError, setPwError] = useState('')

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.7rem 0.9rem', background: '#222',
    border: '1px solid rgba(255,255,255,0.1)', color: 'white',
    fontSize: '0.85rem', borderRadius: '2px', outline: 'none', boxSizing: 'border-box',
  }

  const changePassword = async () => {
    if (newPassword.length < 8) { setPwError('Min 8 characters.'); return }
    if (newPassword !== confirmPassword) { setPwError('Passwords do not match.'); return }
    setPwError('')
    // In production, this would call an API to update the env var or settings table
    alert('To change the admin password, update the ADMIN_PASSWORD environment variable in your deployment settings, then redeploy.')
    setNewPassword(''); setConfirmPassword('')
  }

  return (
    <div style={{ padding: '2.5rem' }}>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.5rem' }}>Settings</h1>
      <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', marginBottom: '2.5rem' }}>Site configuration and account settings.</p>

      {/* SITE INFO */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '1.75rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.62rem', color: 'rgba(15,92,115,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Site Information</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { label: 'Site URL', value: 'randolphrichards.com' },
            { label: 'Admin Email', value: 'e.randolph.richards@gmail.com' },
            { label: 'From Email', value: 'hello@randolphrichards.com' },
            { label: 'Agent Email', value: 'dkuhn@aevitascreative.com' },
          ].map((f) => (
            <div key={f.label}>
              <p style={{ fontSize: '0.62rem', color: 'rgba(15,92,115,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{f.label}</p>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.06)' }}>{f.value}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', marginTop: '1rem', lineHeight: 1.6 }}>
          Update site information in the <code style={{ color: '#17798f' }}>.env.local</code> file or via your deployment platform environment variables.
        </p>
      </div>

      {/* ENV VARS REMINDER */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '1.75rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.62rem', color: 'rgba(15,92,115,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Required Environment Variables</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            'NEXT_PUBLIC_SUPABASE_URL',
            'NEXT_PUBLIC_SUPABASE_ANON_KEY',
            'SUPABASE_SERVICE_ROLE_KEY',
            'RESEND_API_KEY',
            'ADMIN_USERNAME',
            'ADMIN_PASSWORD',
            'ADMIN_SESSION_SECRET',
          ].map((v) => (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <code style={{ fontSize: '0.78rem', color: '#17798f', fontFamily: '"JetBrains Mono", monospace' }}>{v}</code>
            </div>
          ))}
        </div>
      </div>

      {/* SECURITY */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '1.75rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.62rem', color: 'rgba(15,92,115,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Session</p>
        <button onClick={logout} style={{ padding: '0.65rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,80,80,0.25)', color: 'rgba(255,100,100,0.7)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}>
          Sign Out
        </button>
      </div>

      {/* SEED DATA */}
      <SeedSection />
    </div>
  )
}
