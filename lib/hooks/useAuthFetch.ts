'use client'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/app/admin/layout'

/**
 * useAuthFetch — wraps fetch() with the admin Bearer token and handles
 * 401 responses globally: clears the stale session and redirects to
 * /admin/login instead of silently failing / showing empty data.
 *
 * Usage:
 *   const authFetch = useAuthFetch()
 *   const res = await authFetch('/api/admin/articles')
 *   const data = await res.json()
 */
export function useAuthFetch() {
  const { token, logout } = useAdmin()
  const router = useRouter()

  return useCallback(
    async (input: string, init: RequestInit = {}): Promise<Response> => {
      const headers = {
        ...(init.headers || {}),
        Authorization: `Bearer ${token}`,
        ...(init.body && !(init.headers as any)?.['Content-Type'] ? { 'Content-Type': 'application/json' } : {}),
      }

      const res = await fetch(input, { ...init, headers })

      if (res.status === 401) {
        // Session expired or invalid — clear it and bounce to login
        sessionStorage.removeItem('admin_token')
        logout()
        router.replace('/admin/login')
      }

      return res
    },
    [token, logout, router]
  )
}
