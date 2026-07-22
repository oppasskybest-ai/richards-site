// Normalizes a user-entered URL so it's always rendered as an absolute
// link, never a relative one.
//
// The bug this fixes: an <a href="www.amazon.com/dp/xyz"> (or
// "amazon.com/dp/xyz", no protocol) is a RELATIVE href as far as the
// browser is concerned. Clicking it doesn't go to Amazon -- it navigates
// to https://your-site.com/www.amazon.com/dp/xyz, appended onto whatever
// page the link was clicked from, which 404s. This is exactly what
// happened with a book's buy link entered as "www.amazon.com/..." instead
// of "https://www.amazon.com/...".
//
// Applied at the data-read layer (not just on the admin form) so it also
// repairs any URL that was already saved without a protocol before this
// fix existed, for every field that holds a user-entered external link:
// book buy links, podcast URLs, event registration links, and article
// external URLs.
export function toAbsoluteUrl(url: string | null | undefined): string {
  if (!url) return ''
  const trimmed = url.trim()
  if (!trimmed) return ''
  // Already absolute (http/https), protocol-relative (//example.com), a
  // mailto/tel link, or a same-site relative path (starts with /) -- leave
  // those alone.
  if (/^([a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}
