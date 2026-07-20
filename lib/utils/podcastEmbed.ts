// Detects whether a podcast/media URL can be played directly on the page
// (YouTube, Vimeo, Spotify episode) and returns an embeddable iframe src,
// plus a real preview thumbnail where one is predictably derivable.
// Anything else (Apple Podcasts, Libsyn, a publisher's article page, etc.)
// returns null and the UI falls back to a normal "opens in new tab" card --
// there's no generic, reliable way to embed those from a URL alone.

export interface EmbedInfo {
  type: 'youtube' | 'vimeo' | 'spotify'
  embedUrl: string
  thumbnail?: string
  aspectRatio: string
}

export function getEmbedInfo(url: string): EmbedInfo | null {
  try {
    const u = new URL(url)

    // YouTube: youtube.com/watch?v=ID or youtu.be/ID
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      const id = u.searchParams.get('v')!
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${id}`,
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        aspectRatio: '16/9',
      }
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1)
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${id}`,
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        aspectRatio: '16/9',
      }
    }

    // Vimeo: vimeo.com/12345678
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0]
      if (id && /^\d+$/.test(id)) {
        return {
          type: 'vimeo',
          embedUrl: `https://player.vimeo.com/video/${id}`,
          aspectRatio: '16/9',
        }
      }
    }

    // Spotify: open.spotify.com/episode/ID
    if (u.hostname.includes('open.spotify.com') && u.pathname.includes('/episode/')) {
      const id = u.pathname.split('/episode/')[1]?.split('/')[0]
      if (id) {
        return {
          type: 'spotify',
          embedUrl: `https://open.spotify.com/embed/episode/${id}`,
          aspectRatio: '152/232', // Spotify's compact episode embed is tall, not 16:9
        }
      }
    }

    return null
  } catch {
    return null
  }
}
