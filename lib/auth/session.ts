import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.ADMIN_SESSION_SECRET || 'richards-site-admin-secret-2026'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'RichardsAdmin2026!'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'randy'

export function verifyAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export function generateToken(): string {
  return jwt.sign({ admin: true, user: ADMIN_USERNAME }, JWT_SECRET, { expiresIn: '30d' })
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return verifyToken(authHeader.slice(7))
  }
  const cookie = request.cookies.get('admin_token')
  if (cookie?.value) return verifyToken(cookie.value)
  return false
}
