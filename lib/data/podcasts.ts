import { supabaseAdmin } from '@/lib/supabase/server'
import { PODCASTS as STATIC_PODCASTS } from '@/lib/config/podcasts'
import type { PodcastData } from '@/types/podcasts'

export const revalidate = 60

// NOTE: the `podcasts` table (see supabase-schema.sql) exists so this reads
// live once Supabase is provisioned, but there is no /admin/podcasts tab yet
// to manage it through the UI -- see PROGRESS.md. Until then this always
// falls back to the static list below, which is fine: it's real content.
function toPodcastData(row: Record<string, unknown>): PodcastData {
  return {
    id: row.id as string,
    title: row.title as string,
    source: row.source as string,
    description: (row.description as string) || '',
    url: row.url as string,
    embedUrl: (row.embed_url as string) || undefined,
    image: (row.image as string) || undefined,
    date: (row.date as string) || undefined,
  }
}

export async function getAllPodcasts(): Promise<PodcastData[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('podcasts')
      .select('*')
      .order('order_index', { ascending: true })
    if (error || !data || data.length === 0) return STATIC_PODCASTS
    return data.map(toPodcastData)
  } catch {
    return STATIC_PODCASTS
  }
}
