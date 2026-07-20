import { PodcastData } from '@/types/podcasts'

// Real podcast/media appearances, recovered word-for-word from
// randolphrichards.com/videos/ (his real live nav labels this "Podcasts").
// Used as the fallback when the `podcasts` table in Supabase is empty or
// unreachable -- same pattern as lib/config/books.ts and articles.ts.
//
// Every entry links straight out to the original episode/video rather than
// embedding, per the master prompt ("clean styled cards that degrade
// gracefully -- a direct link button -- if an embedded player fails").

export const PODCASTS: PodcastData[] = [
  {
    id: 'theology-in-the-raw-phoebe',
    title: 'Misreading Scripture and Phoebe the Letter Carrier (and Interpreter?)',
    source: 'Theology in the Raw',
    description: `Randy is a world renowned expert on several theological and historical subjects related to the New Testament. In this conversation, they talk about misreading the Bible through western eyes and letter writing and carrying in the ancient world as it applies to the question of Phoebe.`,
    url: 'https://theologyintheraw.com/podcast/misreading-scripture-and-phoebe-the-letter-carrier-and-interpreter-dr-e-randy-richards/',
  },
  {
    id: 'discover-the-word-saul-paul',
    title: 'Saul did not change his name to Paul',
    source: 'Discover the Word (Spotify)',
    description: `A conversation with special guest Randy Richards on the common misconception that Saul changed his name to Paul.`,
    url: 'https://open.spotify.com/episode/2D8CAZEe8bgxpLZm89dmyb',
  },
  {
    id: 'exegetically-speaking-this-stuff-owns-me',
    title: 'This Stuff Owns Me (Luke 12:16-21)',
    source: 'Exegetically Speaking -- Wheaton College & Lanier Theological Library',
    description: `Luke 12:20 is often translated something like, "Your soul will be required of you." But the Greek verb is active and plural: "They will demand your soul from you." Who or what is "they"?`,
    url: 'https://exegeticallyspeaking.libsyn.com/this-stuff-owns-me-with-e-randolph-richards-luke-1216-21',
  },
  {
    id: 'the-clarity-podcast-individualist-eyes',
    title: 'Misreading Scripture Through Individualist Eyes',
    source: 'The Clarity Podcast',
    description: `Randy Richards returns to the podcast to continue the discussion on Misreading Scripture -- diving into individualist and collectivist cultures and how they shape our perspective.`,
    url: 'https://podcasts.apple.com/us/podcast/the-clarity-podcast/id1498500888?i=1000599207359',
  },
  {
    id: 'lanier-christianity-on-trial',
    title: 'Christianity on Trial, with David Fleming and Randy Richards',
    source: 'Lanier Theological Library',
    description: `A panel conversation recorded at the Lanier Theological Library.`,
    url: 'https://www.youtube.com/watch?v=avPiGtPXmVQ',
  },
  {
    id: 'stone-chapel-podcast-david-capes',
    title: 'Misreading Scripture with Western Eyes',
    source: 'The Stone Chapel Podcast, with David Capes',
    description: `Randy joins David Capes to talk about Misreading Scripture with Western Eyes (with Brandon J. O'Brien, IVP 2012), subtitled "Removing Cultural Blinders to Better Understand the Bible." Drawing on his years as a missionary in Indonesia, Randy discusses what goes without being said -- in both our culture and the Scriptures -- using examples from the Joseph story and Paul's admonition in 1 Timothy.`,
    url: 'https://www.laniertheologicallibrary.org/news/episode-095-misreading-scripture-with-western-eyes-with-randy-richards/',
  },
  {
    id: 'misreading-paul-series',
    title: 'Misreading Paul: Podcast Series',
    source: 'Discover the Word',
    description: `Randy Richards and co-author Brandon O'Brien discuss how our cultural lenses can cause us to misinterpret the writings of the apostle Paul -- and what to do about it.`,
    url: 'https://discovertheword.org/series/misreading-paul/',
    image: '/assets/images/podcasts/misreading-paul-series.jpg',
  },
  {
    id: 'misreading-scripture-western-eyes-series',
    title: 'Misreading Scripture with Western Eyes: Podcast Series',
    source: 'Discover the Word',
    description: `Randy Richards and co-author Brandon O'Brien maintain that living in a Western culture can put blinders on us that affect how we read the Bible. In this series, they help the hosts remove those blinders by shedding light on the ways Western readers often misunderstand the Eastern cultural dynamics of the Bible.`,
    url: 'https://discovertheword.org/series/misreading-scripture-with-western-eyes/',
  },
  {
    id: 'rediscovering-jesus-conversation',
    title: "Why We Wrote Rediscovering Jesus",
    source: 'with David Capes and Rodney Reeves',
    description: `David Capes, Rodney Reeves and Randy discuss why they decided to write Rediscovering Jesus (IVP, 2015).`,
    url: 'https://vimeo.com/132371990',
  },
]

export function getPodcastById(id: string): PodcastData | undefined {
  return PODCASTS.find((p) => p.id === id)
}
