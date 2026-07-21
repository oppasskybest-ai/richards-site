import { supabaseAdmin } from '@/lib/supabase/server'
import { PODCASTS as STATIC_PODCASTS } from '@/lib/config/podcasts'
import type { PodcastData } from '@/types/podcasts'

export const revalidate = 60

// The `podcasts` table (see supabase-schema.sql) is managed through the
// /admin/podcasts tab. Live Supabase rows are merged with the static list
// below by matching on title+source (podcasts don't have a slug column) --
// a Supabase row wins if it matches; anything not yet added through the
// admin is kept from the static list rather than dropped. This replaces an
// all-or-nothing fallback that made the entire static list disappear the
// instant a single podcast was added through the admin panel.
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

function mergePodcasts(dbPodcasts: PodcastData[], staticPodcasts: PodcastData[]): PodcastData[] {
  const dbKeys = new Set(dbPodcasts.map((p) => `${p.title}::${p.source}`))
  const missingFromDb = staticPodcasts.filter((p) => !dbKeys.has(`${p.title}::${p.source}`))
  return [...dbPodcasts, ...missingFromDb]
}

export async function getAllPodcasts(): Promise<PodcastData[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('podcasts')
      .select('*')
      .order('order_index', { ascending: true })
    if (error || !data) return STATIC_PODCASTS
    return mergePodcasts(data.map(toPodcastData), STATIC_PODCASTS)
  } catch {
    return STATIC_PODCASTS
  }
}
