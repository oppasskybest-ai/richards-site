'use client'
import Link from 'next/link'
import Image from 'next/image'
import { BookData } from '@/types/books'

interface Props {
  book: BookData
  featured?: boolean
}

export default function BookCard({ book, featured = false }: Props) {
  return (
    <Link href={`/books/${book.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div style={{
        display: 'flex', flexDirection: featured ? 'row' : 'column',
        gap: featured ? '2rem' : '1.25rem',
        padding: '0',
        transition: 'all 0.2s ease',
      }} className="book-card-inner">
        {/* COVER */}
        <div style={{
          flexShrink: 0,
          width: featured ? '140px' : '100%',
          maxWidth: featured ? '140px' : '160px',
          margin: featured ? '0' : '0 auto',
        }}>
          <div className="book-cover-shadow" style={{ borderRadius: '2px', overflow: 'hidden', lineHeight: 0 }}>
            <Image
              src={book.coverImage}
              alt={book.title}
              width={featured ? 140 : 160}
              height={featured ? 210 : 240}
              style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
        </div>

        {/* INFO */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', marginBottom: '0.4rem' }}>
            {book.year}
          </p>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: featured ? '1.4rem' : '1.1rem', lineHeight: 1.2, marginBottom: '0.4rem', color: 'var(--ink)' }}>
            {book.title}
          </h3>
          {book.subtitle && (
            <p style={{ fontSize: '0.78rem', color: '#6b6b6b', lineHeight: 1.5, marginBottom: '0.75rem', fontStyle: 'italic' }}>
              {book.subtitle}
            </p>
          )}
          {featured && (
            <p style={{ fontSize: '0.85rem', color: '#3a3a3a', lineHeight: 1.7, marginBottom: '1rem' }}>
              {book.description.slice(0, 180)}…
            </p>
          )}
          {featured && book.quotes[0] && (
            <blockquote style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '0.75rem', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#6b6b6b', lineHeight: 1.6, fontStyle: 'italic' }}>
                &ldquo;{book.quotes[0].quote.slice(0, 120)}{book.quotes[0].quote.length > 120 ? '…' : ''}&rdquo;
              </p>
              <cite style={{ fontSize: '0.68rem', color: '#999', fontStyle: 'normal', display: 'block', marginTop: '0.3rem' }}>
                — {book.quotes[0].attribution}
              </cite>
            </blockquote>
          )}
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>
            Learn more →
          </span>
        </div>
      </div>
    </Link>
  )
}
