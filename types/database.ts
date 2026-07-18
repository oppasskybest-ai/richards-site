export interface Article {
  id: string
  title: string
  slug: string
  publication: string
  category: 'bible-culture' | 'family-faith'
  url: string
  date: string
  excerpt: string
  image: string
  featured: boolean
  status: 'published' | 'draft'
  content_type: 'external' | 'native'
  content_html: string | null
  pdf_url: string | null
  comments_enabled: boolean
  created_at: string
  updated_at: string
}

export interface Book {
  id: string
  slug: string
  title: string
  year: string
  subtitle: string
  description: string
  cover_image: string
  buy_url: string
  buy_url_2: string
  badge: string
  order_index: number
  quotes: Array<{ quote: string; attribution: string }>
  created_at: string
  updated_at: string
}

export interface Subscriber {
  id: string
  email: string
  first_name: string
  status: 'active' | 'unsubscribed'
  created_at: string
}

export interface ContactMessage {
  id: string
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

export interface Broadcast {
  id: string
  subject: string
  body: string
  sent_at: string | null
  recipient_count: number
  status: 'draft' | 'sent'
  created_at: string
}

export interface Event {
  id: string
  title: string
  subtitle: string
  description: string
  event_date: string
  event_time: string
  end_date: string | null
  venue: string
  location: string
  event_type: string
  register_url: string
  image: string
  status: 'upcoming' | 'past' | 'cancelled'
  notified: boolean
  created_at: string
  updated_at: string
}

export interface Settings {
  id: string
  site_title: string
  site_description: string
  hero_headline: string
  hero_subline: string
  about_bio: string
  contact_email: string
  agent_name: string
  agent_email: string
  agent_phone: string
  agent_address: string
  social_linkedin: string
  admin_password_hash: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  article_id: string
  author_name: string
  author_email: string | null
  body: string
  status: 'pending' | 'approved' | 'rejected'
  parent_id: string | null
  created_at: string
}

export interface ReviewRow {
  id: string
  quote: string
  name: string
  location: string | null
  rating: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}
