'use client'
import { useState, useEffect } from 'react'
import { useAdmin } from './layout'

interface Stats {
  subscribers: number
  articles: number
  messages: number
  events: number
}

function StatCard({ label, value, icon }: { label: string; value: number | string; icon: string }) {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <span style={{ fontSize: '1.1rem' }}>{icon}</span>
      <p style={{ fontSize: '1.8rem', color: 'white', fontFamily: '"Playfair Display", serif', fontWeight: 400 }}>{value}</p>
      <p style={{ fontSize: '0.65rem', color: 'rgba(var(--gold-rgb),0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const { token } = useAdmin()
  const [stats, setStats] = useState<Stats>({ subscribers: 0, articles: 0, messages: 0, events: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }
    Promise.all([
      fetch('/api/admin/subscribers?page=1', { headers }).then(r => r.json()),
      fetch('/api/admin/articles?page=1', { headers }).then(r => r.json()),
      fetch('/api/admin/messages', { headers }).then(r => r.json()),
      fetch('/api/admin/events', { headers }).then(r => r.json()),
    ]).then(([subs, arts, msgs, events]) => {
      setStats({
        subscribers: subs.total || 0,
        articles: arts.total || 0,
        messages: msgs.total || 0,
        events: events.data?.length || 0,
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [token])

  return (
    <div style={{ padding: '2.5rem' }}>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: 'white', fontWeight: 400, marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: '2.5rem' }}>
        Welcome back. Here&rsquo;s what&rsquo;s going on.
      </p>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading…</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          <StatCard icon="◎" label="Active Subscribers" value={stats.subscribers} />
          <StatCard icon="✦" label="Articles" value={stats.articles} />
          <StatCard icon="◇" label="Contact Messages" value={stats.messages} />
          <StatCard icon="◆" label="Conferences" value={stats.events} />
        </div>
      )}

      {/* QUICK LINKS */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '1.5rem' }}>
        <p style={{ fontSize: '0.65rem', color: 'rgba(var(--gold-rgb),0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Quick Actions</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Add Article', href: '/admin/articles' },
            { label: 'View Messages', href: '/admin/messages' },
            { label: 'Manage Books', href: '/admin/books' },
            { label: 'Manage Conferences', href: '/admin/events' },
          ].map((l) => (
            <a key={l.label} href={l.href} style={{ padding: '0.6rem 1.1rem', background: 'rgba(var(--gold-rgb),0.1)', border: '1px solid rgba(var(--gold-rgb),0.2)', color: 'var(--gold-light)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(var(--gold-rgb),0.2)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(var(--gold-rgb),0.1)' }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
