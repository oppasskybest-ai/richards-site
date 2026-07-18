import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: 'var(--gold)',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://randolphrichards.com'),
  title: { default: 'E. Randolph Richards | Biblical Thoughts', template: '%s | E. Randolph Richards' },
  description: 'E. Randolph Richards, Ph.D., is a retired Professor of New Testament and former Provost. Author of Misreading Scripture with Western Eyes, Rediscovering Paul, Rediscovering Jesus, and other books.',
  keywords: ['E. Randolph Richards', 'Misreading Scripture with Western Eyes', 'Rediscovering Paul', 'Rediscovering Jesus', 'New Testament', 'biblical studies', 'Palm Beach Atlantic University'],
  authors: [{ name: 'E. Randolph Richards', url: 'https://randolphrichards.com' }],
  creator: 'E. Randolph Richards',
  publisher: 'Biblical Thoughts',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: 'E. Randolph Richards | Biblical Thoughts',
    description: 'Retired Professor of New Testament and former Provost. Author of Misreading Scripture with Western Eyes, Rediscovering Paul, and other books.',
    url: 'https://randolphrichards.com',
    siteName: 'Biblical Thoughts',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/assets/images/misc/og-default.jpg', width: 1200, height: 630, alt: 'E. Randolph Richards' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E. Randolph Richards | Biblical Thoughts',
    description: 'Retired Professor of New Testament. Author of Misreading Scripture with Western Eyes and other books.',
    images: ['/assets/images/misc/og-default.jpg'],
  },
  icons: {
    icon: '/assets/images/misc/favicon.ico',
    shortcut: '/assets/images/misc/favicon.ico',
    apple: '/assets/images/misc/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://randolphrichards.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
