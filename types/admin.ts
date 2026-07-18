export interface AdminSession {
  admin: boolean
  user: string
  iat: number
  exp: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
