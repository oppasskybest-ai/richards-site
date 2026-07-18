// This layout wraps /admin/login only.
// It deliberately does NOT extend the admin layout,
// so the login page renders as a standalone full-screen page.
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Biblical Thoughts Admin',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
