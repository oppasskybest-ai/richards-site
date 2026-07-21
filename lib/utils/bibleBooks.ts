// Maps the many ways a book is abbreviated in real prose (Randy's actual
// article text uses things like "Jn.", "1 Thess.", "Rom.", "Lk", "Phil.",
// "Col.") to the 66-book dataset's own short codes (lib/data/bible-kjv.json,
// public-domain KJV, sourced once and stored locally -- no external API
// calls at runtime, so this works offline and never rate-limits).
export const BOOK_ALIASES: Record<string, string> = {
  genesis: 'gn', gen: 'gn', gn: 'gn',
  exodus: 'ex', exod: 'ex', ex: 'ex',
  leviticus: 'lv', lev: 'lv',
  numbers: 'nm', num: 'nm',
  deuteronomy: 'dt', deut: 'dt',
  joshua: 'js', josh: 'js',
  judges: 'jud', judg: 'jud',
  ruth: 'rt',
  '1samuel': '1sm', '1sam': '1sm', '1sm': '1sm', 'isamuel': '1sm',
  '2samuel': '2sm', '2sam': '2sm', '2sm': '2sm',
  '1kings': '1kgs', '1kgs': '1kgs',
  '2kings': '2kgs', '2kgs': '2kgs',
  '1chronicles': '1ch', '1chron': '1ch', '1chr': '1ch',
  '2chronicles': '2ch', '2chron': '2ch', '2chr': '2ch',
  ezra: 'ezr',
  nehemiah: 'ne', neh: 'ne',
  esther: 'et', esth: 'et',
  job: 'job',
  psalm: 'ps', psalms: 'ps', ps: 'ps', psa: 'ps',
  proverbs: 'prv', prov: 'prv',
  ecclesiastes: 'ec', eccl: 'ec',
  songofsolomon: 'so', song: 'so', sos: 'so',
  isaiah: 'is', isa: 'is',
  jeremiah: 'jr', jer: 'jr',
  lamentations: 'lm', lam: 'lm',
  ezekiel: 'ez', ezek: 'ez',
  daniel: 'dn', dan: 'dn',
  hosea: 'ho', hos: 'ho',
  joel: 'jl',
  amos: 'am',
  obadiah: 'ob', obad: 'ob',
  jonah: 'jn_ot', jon: 'jn_ot', // disambiguated from John below
  micah: 'mi', mic: 'mi',
  nahum: 'na', nah: 'na',
  habakkuk: 'hk', hab: 'hk',
  zephaniah: 'zp', zeph: 'zp',
  haggai: 'hg', hag: 'hg',
  zechariah: 'zc', zech: 'zc',
  malachi: 'ml', mal: 'ml',
  matthew: 'mt', matt: 'mt', mt: 'mt',
  mark: 'mk', mk: 'mk',
  luke: 'lk', lk: 'lk',
  john: 'jo', jn: 'jo', jhn: 'jo',
  acts: 'act',
  romans: 'rm', rom: 'rm',
  '1corinthians': '1co', '1cor': '1co',
  '2corinthians': '2co', '2cor': '2co',
  galatians: 'gl', gal: 'gl',
  ephesians: 'eph', eph: 'eph',
  philippians: 'ph', phil: 'ph', phlp: 'ph',
  colossians: 'cl', col: 'cl',
  '1thessalonians': '1ts', '1thess': '1ts', '1th': '1ts',
  '2thessalonians': '2ts', '2thess': '2ts', '2th': '2ts',
  '1timothy': '1tm', '1tim': '1tm',
  '2timothy': '2tm', '2tim': '2tm',
  titus: 'tt', tit: 'tt',
  philemon: 'phm',
  hebrews: 'hb', heb: 'hb',
  james: 'jm', jas: 'jm',
  '1peter': '1pe', '1pet': '1pe', '1pt': '1pe',
  '2peter': '2pe', '2pet': '2pe', '2pt': '2pe',
  '1john': '1jo', '1jn': '1jo',
  '2john': '2jo', '2jn': '2jo',
  '3john': '3jo', '3jn': '3jo',
  jude: 'jd',
  revelation: 're', rev: 're',
}

// jn_ot (Jonah) isn't a real dataset code -- the dataset uses "jn" for Jonah
// AND has no separate code collision with John ("jo"), so just point both at
// the dataset's real codes directly.
BOOK_ALIASES['jonah'] = 'jn'
BOOK_ALIASES['jon'] = 'jn'
delete BOOK_ALIASES['jn_ot']

export function normalizeBookName(raw: string): string | null {
  const key = raw.toLowerCase().replace(/[.\s]/g, '')
  return BOOK_ALIASES[key] || null
}
