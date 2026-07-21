# PROGRESS.md — E. Randolph Richards Website
## Read this AND richards-master-prompt.md at the start of every session before touching any code.

This project started from a working Next.js + Supabase site built for a
different client ("duff-site") and is being reskinned + recontented for
Randy. The backend logic (comments, admin CRUD, contact form, subscriber
capture, auth) is real and functional -- it did not need to be rebuilt from
scratch. What follows is what's been changed, and what's genuinely still
missing.

---

# STATUS AT A GLANCE (2026-07-20)

Session 7: a large "make it actually work and look different everywhere"
pass, in response to Randy sending 10 screenshots of real, live pages and
flagging that most of the site beyond the homepage/Books had never been
touched. Found and fixed a real functional bug (every article 404'd),
found and fixed two leftover-template naming bugs ("Journalism" instead of
"Articles," in a page title, a breadcrumb, and an SEO description), found
that article body text had zero typography styling at all (raw browser
defaults), found and removed fabricated "as heard on" media names that
don't appear anywhere in the real scraped site, matched 14 more real
photos to their exact original posts, gave About/Articles/Category pages
genuinely distinct layouts instead of reusing the same card grid
everywhere, and built real playable YouTube/Vimeo/Spotify embeds on the
Podcasts page. Full detail in "SESSION 7" below.

---

# STATUS AT A GLANCE (2026-07-19, even later same day)

Session 6: found and fixed a real, sitewide bug -- not a design taste
disagreement. Every dark hero/section across the ENTIRE site (homepage x4,
Articles index, Articles category pages, article detail fallback, Events
x2, Contact x2, Books hero) was pointing at image files that don't exist
on disk -- some leftover from the original unrelated "duff-site" template
this project was cloned from (one literally named `the-firm.jpg`). With no
fallback background-color set anywhere, a 404'd background image means
the section renders on plain white, and white text on white = invisible.
That's what looked like "colors that don't fit, not readable" -- it wasn't
a color choice, it was broken references the whole time. All fixed with
real photos, thoughtfully placed per section (not the same one image
repeated everywhere), plus a defensive fallback background-color added so
this specific failure mode can't happen silently again. Full detail in
"SESSION 6" below.

---

# STATUS AT A GLANCE (2026-07-19, later same day)

Session 5: comments overhaul, real Amazon book data, and a Supabase Storage
gap Randy caught by asking why he was never told to create an image bucket
(he was right -- it's a required manual step that was never documented).
Full detail in "SESSION 5" below. Two real setup actions now required on
Randy's end before any of this is fully live -- see the "SUPABASE ACTION
ITEMS" callout right under the Session 5 heading.

---

Session 4: content-parity pass. Randy sent the real scraped site
(sorted-assets.zip) and flagged, correctly, that Sessions 1-3 had reskinned
the site but left it largely empty -- placeholder endorsements, no CV page,
no Podcasts, only 10 of 32+ real blog posts (as excerpts, not full text),
and only 4 of his 12 real/forthcoming books. All of that is now fixed with
real, word-for-word content recovered from the scrape. See "SESSION 4" below.
Remaining real gap: Podcasts has a public page + data layer but no admin
CRUD tab yet (see gap #1). A new visual direction (full-bleed scroll-driven
photo backgrounds) was requested and is designed but not yet built into the
codebase -- see gap #13.

---

## DONE THIS SESSION

**Design**
- New color palette applied site-wide: warm cream paper #f6f1e6, warm
  charcoal ink #1c1a17, deep teal primary accent #0f5c73 (sourced from
  the Misreading Scripture with Western Eyes cover), muted brick secondary
  #a8402f (sourced from Rediscovering Paul). Confirmed with Randy before
  implementing -- do not change without asking again.
- Reused the existing --gold CSS variable slot for the teal accent so ~40
  components already wired to it updated automatically; hardcoded hex values
  (#b8973a, #d4af5a, old ink/paper hex) swept and replaced across the
  whole codebase.

**Structure**
- /journalism -> /articles (route folder renamed, all internal links
  fixed -- found and fixed ~10 hardcoded /journalism/... links that would
  have 404'd).
- Collapsed Duff's 4 categories (wall-street, business-schools, consulting,
  and-the-rest) down to Randy's real 2: Bible & Culture, Family & Faith.
  Updated CategoryFilter, CategoryExpand, category page, article detail
  page, sitemap, types/database.ts, admin form defaults.
- Events page relabeled Conferences (matches his real live nav) -- it's a
  generic events-calendar feature and was already unbranded/generic.
- Reviews page relabeled Endorsements -- fabricated testimonials
  (attributed to fake people about fake books) replaced with an honest
  single placeholder. Do not publish fabricated quotes -- real ones need
  to come from Randy.

**Content**
- Full identity rebrand: name, tagline ("Biblical Thoughts" -- matches his
  real site header), email (e.randolph.richards@gmail.com, confirmed as
  the live contact-form send target), domain, SEO metadata, Navbar, Footer.
- Home/About/Hero bio copy rewritten using verified facts (web search,
  2026-07-18): PhD Southwestern Baptist Theological Seminary; Research
  Professor of NT at Palm Beach Atlantic University; former Dean and
  Provost/Chief Academic Officer; teaching since 1986 (Texas -> Indonesia
  missionary years -> Arkansas -> Florida); wife Stacia; two sons.
- Books (lib/config/books.ts): 4 real, verified titles with real cover
  images copied from the site scrape -- Misreading Scripture with Western
  Eyes, Rediscovering Jesus, Rediscovering Paul, A Little Book for New
  Biblical Scholars. Descriptions written fresh, not copied from jacket
  text. Reviewer quotes deliberately left empty rather than invented.
- Articles: 10 real posts seeded (lib/config/articles.ts +
  supabase-seed-articles-richards.sql) with real titles/dates/tags pulled
  from a screenshot of the live site. Only the short teaser excerpt is
  in there -- full post bodies still need to be added, see below.
- Portrait and book cover images copied from sorted-assets.zip into
  public/assets/images/.
- richards-master-prompt.md copied into project root.

---

# SESSION 2 AUDIT (2026-07-18, later same day)

Randy caught real gaps in session 1's rebrand and asked for a full audit.
He was right on every count. Here's exactly what was wrong and what was
fixed:

**1. Leftover Duff content in files session 1 never touched.** The first
rebrand pass only swept `.ts`/`.tsx`/`.json` files. It missed `.sql` files
entirely and didn't fully sweep `.md`. Found and fixed:
- `supabase-schema.sql` had `settings` table defaults still pointing at
  Duff (`site_title default 'The Duff Project'`, `contact_email default
  'duffmcd@mac.com'`, a full `agent_name`/`agent_email`/`agent_phone`/
  `agent_address` block with David Kuhn's real contact info, a
  `social_linkedin` default pointing at Duff's LinkedIn).
- `app/admin/settings/page.tsx` was **displaying** `dkuhn@aevitascreative.com`
  as "Agent Email" directly in Randy's own admin panel.
- **`app/(site)/contact/page.tsx` — the live public Contact page — had
  Duff's actual personal phone number `(845) 282-6918` sitting right next
  to Randy's email**, plus a full "Literary Agent" card with David Kuhn's
  name, address, and phone. This was the most serious leftover — it was
  public-facing. Both removed. No agent card, no invented phone number.
- `lib/utils/slugify.ts` had a publication-logo mapper still keyed to
  Vanity Fair/WIRED/Esquire/etc.; swapped to Randy's real media.
- `run-5-book-reviews-seed.sql`, `run-6-book-reviews-complete.sql`,
  `supabase-books-migration.sql` — three SQL files, 10-31KB each, entirely
  full of Duff's real books and fabricated reviews. **Deleted.** The one
  real schema piece buried in them (the `quotes` jsonb column on `books`,
  and the `book_reviews` table definition) was extracted and folded
  directly into `supabase-schema.sql` so nothing was lost.
- `supabase-articles-migration.sql` and a redundant hand-written
  `supabase-seed-articles-richards.sql` — folded the migration into the
  canonical schema and deleted the redundant seed file (see item 2 below
  for why having two separate seed paths was itself a bug).

**2. The seed system had a real bug, not just old data.** Randy correctly
identified that duff-site had a working "Run Seed" button in
Admin → Settings that seeds Supabase from static config and never
conflicts on re-run (checks existing slugs first, skips anything already
in the DB — so admin edits are never overwritten). That button is real
and intact in this project too, at `app/api/admin/seed/route.ts`, reading
from `lib/config/articles.ts` (`SEED_ARTICLES`) and `lib/config/books.ts`
(`BOOKS`) — the exact two files with Randy's real content.

But: the route was hardcoding `content_type: 'external'` on every article
regardless of what the source data said, and never inserted `content_html`　
at all (the column didn't even exist on the base schema — it lived in a
separate migration file that the seed route didn't know about). So even
though `SEED_ARTICLES` had 10 real articles marked `content_type: 'native'`,
running the seed button would have inserted them as external-link cards
with `url: null` and empty bodies — broken. Fixed by:
- Adding `content_html` to the `CardItem`/`ArticleData` type and writing
  it into all 10 seed articles (same real excerpt text, honestly marked
  as needing full post text).
- Fixing the seed route to pass through `article.content_type` and
  `article.content_html` instead of hardcoding.
- Fixing a slug mismatch in the skip-check (it compared against
  `article.id` while the insert payload used `article.slug || article.id`
  — meant re-running the seed after any manual edit could double-insert).
- Adding `buy_url_2` to the books seed payload (was silently dropped for
  the one book — Misreading Scripture — that has a second buy link).
- Folding the `content_type`/`content_html`/`pdf_url` columns directly
  into `supabase-schema.sql` so there's one schema file, not schema +
  migration + separate seed SQL.

**What's actually seeded right now, confirmed against the fixed route:**
4 books, 10 articles. Nothing else (subscribers/events/podcasts have no
static seed source — subscribers shouldn't be seeded with fake data
anyway, and Podcasts doesn't exist as a feature yet, see gap #1 below).

**3. Color scheme was scattered, not centralized.** Session 1 applied the
right colors but did it by find/replacing hex strings directly into ~40
component files, which meant the same hex value was duplicated dozens of
times instead of living in one place. Fixed:
- Every hardcoded hex for ink/paper/gold/gold-light/brick was replaced
  with `var(--token)` across `app/`, `components/`, `lib/` (79 files).
- Every `rgba(15,92,115,0.NN)`-style translucent variant was converted to
  `rgba(var(--gold-rgb),0.NN)` (and the same for brick/ink/paper), using
  new `--gold-rgb`, `--brick-rgb`, `--ink-rgb`, `--paper-rgb` channel
  tokens — 90+ occurrences.
- `styles/globals.css` now has a single, heavily commented palette block
  at the top explaining where each color came from and how to change it.
  **This is the only place color values should ever be written as literal
  hex again** (aside from `emails/*.tsx`, which intentionally keep literal
  hex — email clients like Gmail/Outlook don't reliably support CSS custom
  properties, so email templates can't use `var()`).
- Verified in the actual prerendered build output (`.next/server/app/*.html`)
  that `var(--gold)` and `rgba(var(--gold-rgb),...)` both render correctly,
  not as literal broken text.

**4. Next.js version confusion — resolved, and a real bug found underneath
it.** The project genuinely is Next.js 16 (`next@^16.2.9`, confirmed
installed as `16.2.10` — visible in every build log: "▲ Next.js 16.2.10").
The "seeing 14" was very likely `eslint-config-next` in `package.json`,
which was still pinned to `^14.2.35` — a real, two-major-version mismatch
against `next@16`. That mismatch also meant `npm run lint` was silently
crashing (`TypeError: Converting circular structure to JSON`) rather than
running — which is probably what looked like "many errors" if this was run
before or during a Vercel build. Fixed:
- Bumped `eslint-config-next` to `^16.2.10` (matches installed `next`).
- Bumped `eslint` from `8.57.1` to `^9.19.0` (eslint-config-next 16
  requires ESLint ≥9).
- Replaced the legacy `.eslintrc.json` with a flat `eslint.config.mjs`,
  importing eslint-config-next's native flat-config preset directly
  (`eslint-config-next/core-web-vitals`) rather than going through the
  `FlatCompat` legacy-config shim, which has a known circular-reference
  bug with the react-hooks plugin.
- Confirmed clean reinstall (`rm -rf node_modules package-lock.json`,
  fresh `npm install`) produces **zero peer-dependency conflicts**.
- **`next build` — what Vercel actually runs — succeeded cleanly both
  before and after this fix.** Next.js 16 does not hard-fail the build on
  ESLint errors by default, so this version mismatch was not, on its own,
  going to break a Vercel deploy. But it was real, worth fixing, and is
  very likely what you saw as version confusion / lint failures locally.
- `npm run lint` now actually runs (instead of crashing) and reports 17
  real findings, all pre-existing `react-hooks/set-state-in-effect`
  warnings from the original duff-site code (a stricter rule in the new
  eslint-config-next flags "fetch on mount" patterns that were fine under
  the old ruleset). These do not block the build. Not fixed in this pass —
  flagged here rather than silently left. The 3 unescaped-JSX-entity errors
  that were mine (introduced while rewriting bio copy) were fixed.

**5. Confirmed the audit's actual scope was right:** every one of the
"backend built but not reflected to the frontend" concerns pointed at the
same underlying issue (#2 above) — the disconnect between what the admin
seed system was capable of and what it was actually inserting. That's
fixed now. The remaining real gap is still Podcasts (see below) — that one
genuinely doesn't exist on either side, front or back.

---

# SESSION 3 (2026-07-18, same day) -- REMOVED AUTOMATED EMAIL SYSTEM, TRUE SQL CONSOLIDATION

Randy caught two more real things: an actual cron-based automated email
system still running in the codebase, and that "one SQL file" wasn't
really one file yet, plus color values weren't as centralized as claimed.

**1. Found and removed a full automated broadcast/cron system.** This was
explicitly out of scope per the master prompt ("Not in scope: automated
email workflows"), and it was real, working infrastructure, not just
leftover text:
- A `scheduled_broadcasts` table + pg_cron job (via Supabase Edge
  Functions, `supabase/functions/process-scheduled-broadcasts/`) that ran
  every 5 minutes and auto-emailed every subscriber whenever a book,
  article, or event was published -- with a configurable delay.
- A manual "Notify subscribers" button on the Events admin page that mass-
  emailed every active subscriber on demand.
- A full `/admin/broadcasts` compose-and-send newsletter UI.
- All of it deleted: `app/admin/broadcasts/`, `app/api/admin/broadcasts/`,
  `app/api/admin/scheduled-broadcasts/`, `app/api/admin/events/[id]/notify/`,
  `lib/broadcast/`, `lib/email/sendBroadcast.ts`, `emails/BroadcastEmail.tsx`,
  `components/admin/BroadcastComposer.tsx`,
  `supabase/functions/process-scheduled-broadcasts/`,
  `supabase-auto-broadcast-migration.sql`. Also removed the calls into this
  system from the articles/books/events create/update/delete API routes
  (they were importing and calling `scheduleAutoBroadcast`/
  `cancelScheduledBroadcast` on every save), the now-dead `broadcasts`
  table and its RLS policy, the dead `notified` column on `events`, and
  the "Notify subscribers after (minutes)" input that was still showing
  in the Articles/Books/Events admin forms even though nothing behind it
  worked anymore.
- **What's left, by design:** the `subscribers` table (people can still
  sign up) and CSV export from Admin -> Subscribers. No sending
  functionality at all -- exactly what the master prompt asked for
  ("Emails are stored and can be exported as a CSV... No automation, no
  send functionality. That's it.").

**2. Actually consolidated to one SQL file, and fixed a duplicate-table
bug in the process.** The earlier "single schema file" claim was true in
file *count* but the file itself had grown by accretion (a base schema
plus three appended sections from different points in duff-site's
history) and had genuinely duplicated the `book_reviews` table
definition with two different rating/status constraints. Also, two
migration files still existed alongside it
(`supabase-events-migration.sql`, `supabase-subscriber-preferences-migration.sql`)
that were 100% redundant -- everything in them already existed in the main
schema. Fixed: rewrote `supabase-schema.sql` from scratch as one
logically-sectioned file (core content -> comments -> testimonials -> RLS),
zero duplication, with a table-by-table comment explaining what each one
is for. Deleted both redundant migration files. There is now exactly one
`.sql` file in the project.

**3. Wrote `SUPABASE.md`** -- a single dedicated doc covering setup, a
table-by-table rundown, how RLS actually works here, and a full
walkthrough of exactly how the seed button avoids conflicts (traced
against the actual code, not asserted). `SETUP.md` now points to it
instead of duplicating instructions.

**4. Traced the actual Supabase -> frontend read path and found one more
real bug.** `lib/data/books.ts`'s `toBookData()` -- the function that
converts a database row back into what the public pages render -- was
silently dropping the `buy_url_2` field. That means even after fixing the
seed route in Session 2, once a book came back *from* Supabase (rather
than the static fallback), its second buy link would have vanished on
the live site. Fixed by adding the missing field to the mapper. This is
the same category of bug as the Session 2 seed-route issue: the database
had the right data, but a specific piece of frontend code wasn't reading
all of it back out.

**5. Verified -- not just claimed -- that the color scheme really is
single-source now.** Re-ran the hex-literal search after all of Session 3's
edits: zero hardcoded ink/paper/gold/gold-light/brick hex values remain in
`app/`, `components/`, or `lib/`. Every one is a `var(--token)` or
`rgba(var(--token-rgb),N)` reference back to the one documented block at
the top of `styles/globals.css`.

**6. `npm run lint` error count dropped from 17 to 13** as a side effect
of removing the broadcast admin page (it had its own `set-state-in-effect`
patterns). The remaining 13 are unchanged from Session 2 -- all
pre-existing patterns in code that wasn't touched, still non-blocking for
`next build`.

---

# SESSION 4 (2026-07-19) — content parity from the real scraped site

Randy sent two files: `richards-site.zip` (this project) and
`sorted-assets.zip` (an httrack scrape of the live randolphrichards.com --
465 files in `html/pages/`, mostly scraper-garbage-named, ~90% 404 pages,
but a real subset of full, live pages). This session mined that scrape for
actual content instead of working from screenshots, and used it to close
the gaps Session 3 had explicitly flagged rather than guessing.

**How the content was recovered.** Each scraped HTML file's
`<meta property="og:url">` tag still points at the real live URL (httrack
rewrites `rel=canonical` to a local filename, but leaves `og:url` alone) --
that's what made matching possible. Script: parse every file in
`html/pages/`, keep only ones with a real `og:url`, dedupe by URL keeping
the largest `entry-content` block, strip WordPress block-editor cruft
(wrapper divs, `data-*`/`class` attributes, comment markers) and trailing
share-button/comment-form HTML, unescape entities. Full methodology is
reproducible; nothing here was retyped by hand from a screenshot.

**1. Full article text — 32 real posts recovered (not 10 excerpts).**
`lib/config/articles.ts` rewritten from scratch. Every entry has real,
complete `content_html` (word-for-word from the scrape), a real date, and
a slug matching the live site's actual permalink exactly (e.g.
`/2016/07/21/a-scroll-with-seven-seals/`) for link parity. 22 posts that
existed on the live site but were never in this project at all are now
included (e.g. "Redefining Marriage?", "666: The Mark of the Beast",
"Render Unto Caesar", "The Antichrist", "Living in Trump's America").
Categories (Bible & Culture / Family & Faith) are still an editorial split
-- the original site never tagged posts by category -- documented as such
in the file's header comment.

**2. CV page — built from scratch.** `randolphrichards.com/cv/` is a real,
substantial nav item (full publication list: major/refereed publications,
refereed/invited presentations, educational administrative experience,
honors) that this project's nav didn't have at all. Recovered the full
text, cleaned it, wrote it to `lib/config/cv.ts` (`CV_HTML`, ~20KB, verbatim),
and built `app/(site)/cv/page.tsx` using the same hero + prose pattern as
About/Endorsements. Added to Navbar and Footer.

**3. Podcasts — built from scratch.** The 4th required content type from
the master prompt, previously nonexistent (Navbar had a TODO comment where
it should go). Recovered 9 real podcast/media appearances from
`randolphrichards.com/videos/` (his live site's actual "Podcasts" nav
label) -- Theology in the Raw, The Clarity Podcast, Lanier Theological
Library, Stone Chapel Podcast, Discover the Word series, etc. Built:
- `types/podcasts.ts`, `lib/config/podcasts.ts` (real static data)
- `lib/data/podcasts.ts` -- Supabase-first with static fallback, same
  pattern as `lib/data/books.ts`
- `app/(site)/podcasts/page.tsx` -- public card grid, links straight out
  to each episode (no embeds, so nothing to fail gracefully from)
- `podcasts` table + RLS policies added to `supabase-schema.sql`
- Added to Navbar and Footer.
**Not done when this was first written, added later the same session:**
an `/admin/podcasts` CRUD tab. Now built: `app/admin/podcasts/page.tsx`
(list/add/edit/delete, same pattern as `/admin/events`), API routes at
`app/api/admin/podcasts/route.ts` + `[id]/route.ts`, sidebar link in
`components/admin/Sidebar.tsx`, and the "Run Seed" button
(`app/api/admin/seed/route.ts`) now also seeds the 9 static podcasts into
Supabase (deduped by URL, since podcasts have no natural slug column).

**4. Endorsements — the fabricated single placeholder replaced with all 6
real quotes**, word-for-word from `randolphrichards.com/endorsements/`
(Kathy Skinner, Jon Stubblefield, Del Gann, Kelly Hardin, Johnny Ross,
Gregg Cudworth). `app/(site)/reviews/page.tsx` fallback array rewritten;
page heading changed from "Reader Reviews" to "What People Are Saying" to
match the real site's tone.

**5. Books — 4 titles expanded to 12 (10 finished + 2 forthcoming), all
pulled from Randy's real CV** (not invented): added Misreading Scripture
with Individualist Eyes, Paul Behaving Badly, the 1st edition of
Rediscovering Paul, Paul and First-Century Letter Writing, The Secretary in
the Letters of Paul, the forthcoming John WBC commentary, Inscriptions/
Papyri/Other Artifacts, and Rediscovering the New Testament.
- 6 covers matched with real confidence to actual files in the scrape
  (filename clearly matched title, e.g. `cover-wunt.png` ->
  The Secretary in the Letters of Paul, a WUNT-series book).
- 4 titles had only ambiguous candidates in the scrape (an unlabeled
  `book-cover.jpg` and two Amazon-thumbnail-style files, all uploaded in
  the same Feb-2015 batch, that could plausibly be any of several
  pre-2015 titles). Rather than guess and risk a wrong cover on a
  published book, generated clearly-labeled "COVER PENDING" placeholder
  images for those 4 (`public/assets/images/books/placeholder-*.jpg`).
  Same call Session 1 made on a smaller scale (see old gap #4) --
  extended consistently rather than reversed under time pressure.
- Reordered the array so the 3 books surfaced on the homepage
  ("topBooks", first 3 in `BOOKS`) are the ones with confirmed real
  covers, not a placeholder.

**6. Small bugs fixed while in this code:**
- `app/(site)/articles/page.tsx` said "pieces across four categories" when
  the site only has two -- pre-existing bug from the duff-site rebrand,
  fixed to "two categories."
- Confirmed the `/articles/[category]` pages have no article cap (only the
  homepage-style "Recent additions" grid on `/articles` caps at 12 by
  design, as a preview) -- so all 32 posts are actually reachable, not
  silently truncated.

---

# SESSION 5 (2026-07-19, later same day)

## >>> SUPABASE ACTION ITEMS -- required, not optional <<<
Two things only Randy can do (dashboard access, not code):

1. **Create the image upload bucket.** Every "upload image" button in the
   admin panel (article cover, rich-text inline images, book covers, event
   images) has always pointed at a Supabase Storage bucket named exactly
   `article-images`. That bucket was never created and, until this
   session, was never documented anywhere either -- Randy asked directly
   why nothing told him to do this, and he was right, it should have.
   Fixed: **SUPABASE.md** now has this as an explicit step 5, with exact
   settings (Dashboard -> Storage -> New bucket -> name it `article-images`
   -> Public bucket: ON), plus the two `storage.objects` RLS policies to
   run afterward (bottom of `supabase-schema.sql`, under "MIGRATIONS").
   Until this bucket exists, every image upload in the admin panel fails.
2. **Run the new migration statements.** Since Randy's Supabase project
   already existed before this session (tables already created from an
   earlier version of this schema), the updated `create table` statements
   in `supabase-schema.sql` won't retroactively apply to it. The
   "MIGRATIONS" section at the very bottom of `supabase-schema.sql` has
   the safe, idempotent `ALTER TABLE` statements to bring an existing
   database up to date: comments defaulting to auto-approved, the new
   `is_owner_reply` column, the `podcasts` table (if gap #1 from Session 4
   wasn't run yet), and the storage policies from item 1. Paste that whole
   section into the Supabase SQL Editor and run it once.

No other Supabase changes are needed beyond those two -- everything else
(tables, RLS policies, the `podcasts` table from Session 4) was already
covered by what Randy set up before this session.

## What changed

**1. Comments -- no more pre-approval, real threading, owner replies.**
Randy asked directly why comments needed approval before showing, and
wanted true nested reply-to-reply threading (not just one level), plus a
way to reply as himself from the admin panel. All three:
- `comments.status` now defaults to `approved` in the schema; the public
  POST route (`app/api/public/comments/route.ts`) inserts as `approved`
  instead of `pending` -- comments appear immediately, no moderation gate.
  Randy can still delete anything after the fact from `/admin/comments`.
- `components/journalism/ArticleComments.tsx` was rewritten from a
  one-level-deep reply list into a real recursive tree (`CommentThread`
  component calling itself) -- replies can have replies indefinitely, not
  capped at one level. Visual indent caps at 3 levels so deep threads
  don't run off-screen, but the underlying nesting has no depth limit.
  New comments append to the UI immediately rather than waiting on a
  refetch.
- New route `app/api/admin/comments/reply/route.ts` lets Randy post a
  reply in-thread from `/admin/comments`, badged `is_owner_reply: true` --
  shows as a gold "Randy" badge on the public page and "Your reply" in the
  admin list. `app/admin/comments/page.tsx` got a "Reply as yourself" box
  per comment to drive this.
- Schema: added `is_owner_reply boolean default false` to `comments`.
  `parent_id` already existed from an earlier session -- it just wasn't
  being used for anything beyond one level, and the frontend didn't
  support the depth.

**2. Real Amazon book data -- descriptions, buy links, and correct
attribution.** Randy sent 9 screenshots of each book's real Amazon
listing (`book1_bio.png`...`book9_bio.png`), a PDF of buy URLs
(`all_amazon_books.pdf`), and 9 high-resolution cover images
(`high_resolution_image.zip`, `book1.png`...`book9.png`, matched 1:1 to
the bio screenshots by number -- confirmed correct with Randy directly).
`lib/config/books.ts` rewritten again:
- Every description is now the real, official Amazon/publisher jacket
  copy, word-for-word from the screenshots -- not a paraphrase.
- Real Kindle buy links wired in for every title that had one.
- The 9 high-res covers were properly compressed (PIL, resized to 900px
  wide, real JPEG re-encode, not just a renamed PNG) and placed at
  `public/assets/images/books/*-hires.jpg` -- file sizes dropped from
  1-3MB raw PNGs to 68-315KB real JPEGs.
- **Attribution fix, specifically requested:** "Reading Romans with
  Eastern Eyes" is by Jackson Wu -- Randy only wrote the foreword. Adding
  it as a normal "his book" entry would misattribute someone else's work
  to him. Added a `role: 'foreword' | 'translation' | 'author'` field to
  `BookData` (types/books.ts). Foreword and translation editions (the
  German edition of Western Eyes) now render in a visually separate "Other
  Editions & Contributions" section on the Books page with an explicit
  colored badge ("Foreword only" / "Translated edition"), and the book
  detail page's JSON-LD structured data now credits Jackson Wu as
  `author` and Randy as `contributor` (role: Foreword) for that title --
  fixed so Google's search results don't misattribute authorship either.
- **Two-section Books page**, matching the real site's original structure
  (`/books/` vs `/books-im-working-on/`): `app/(site)/books/page.tsx` now
  splits `BOOKS` into `mainBooks` (finished, authored -- the big parallax
  showcase), `workingOnBooks` (`workingOn: true` -- forthcoming titles, a
  simpler card-grid section), and `otherEditions` (foreword/translation).
- Fixed a latent bug while in this file: the "Buy on Amazon" button
  rendered even when `buyUrl` was empty (dead link) for books with no
  purchase link yet (the 1991 monograph, 1st-edition Rediscovering Paul,
  forthcoming titles) -- now hidden when there's no real URL.
- Hero heading changed from a hardcoded "Five books." to a dynamic
  `{mainBooks.length} books.` so it can't silently go stale again the way
  the "four categories" bug did in Session 4.

**3. Storage bucket gap -- found via Randy's own question, not proactively
caught.** Randy asked directly: "have not seen anything pointing me to
create an image bucket in supabase." Correct -- there wasn't. Audited
every admin form for rich-editor and image-upload coverage:
- Articles: real Tiptap rich editor (bold/italic/headings/lists/
  blockquote/undo-redo) + inline image button + cover image upload, all
  confirmed wired to the `article-images` bucket.
- Books: cover image upload, confirmed wired.
- Events: cover image upload, confirmed wired.
- Podcasts: intentionally has no image field -- each entry links out to
  its own episode/video, which already has its own artwork on the source
  platform (Spotify, YouTube, etc.) -- not a gap.
- The actual gap was narrower than "rich editor missing": the editor and
  upload UI were always real and functional. What was missing was the
  bucket itself and any documentation telling Randy to create it. Fixed
  in `SUPABASE.md` (new step 5) and `supabase-schema.sql` (MIGRATIONS
  section) -- see the action items at the top of this section.

---

# SESSION 6 (2026-07-19, even later same day)

Randy pushed back hard, correctly, on two things: (1) the "scroll-driven
full-bleed photo" redesign discussed several messages ago had never
actually been built -- he was right, that conversation ended on a mockup
and the thread moved to content work and never came back to it; and (2)
"the colors aren't even fitting the design, not readable by human." This
session addressed both directly, in order.

## 1. The redesign mechanism already existed -- it just had no working images
Before writing new code, checked what `.page-hero` / `.section-bg-image`
in `styles/globals.css` actually do: `background-attachment: fixed` +
a dark `::before` overlay + one `backgroundImage` per section. That IS
the "backdrop switches per section while you scroll, text stays legible"
effect Randy asked for -- it was already built, correctly, sometime before
this session. So this was not a rebuild from zero.

## 2. The real bug: broken image paths, sitewide, with no fallback color
Audited every `/assets/images/...` path referenced anywhere in
`app/`, `components/`, `lib/` against what actually exists on disk.
Found 7 broken references, used in 12 different places across the site:
- `unsplash-image-cl1vms3jlue.jpg` -- homepage hero, article detail
  fallback, category page fallback, Books page CTA
- `photo-1639678343.jpg` -- homepage "Recent Work", Events CTA, Contact
- `screen-shot-2020-05-07-at-3.34.10-pm.png` -- Articles index hero
- `jfbl9593.jpg` -- Events hero, Contact hero
- `the-firm.jpg` -- **the Books page hero.** This filename doesn't match
  any of Randy's books because it isn't one -- it's a leftover reference
  from "duff-site," the unrelated template this project started from.
  Concrete evidence the base template was never fully swapped out, not
  just a vibe.
- `misc/og-default.jpg` and `misc/apple-touch-icon.png` -- sitewide
  metadata (social share preview image, favicon), also missing.

None of `.page-hero` / `.section-bg-image` had a fallback
`background-color`. A 404'd background image doesn't paint anything --
the section falls through to the plain page background (white), and
white headline text on white = invisible. That is exactly what Randy
saw and flagged. It was never a palette decision to defend.

## 3. What was fixed
- All 12 broken references replaced with real photos -- not the same one
  image copy-pasted everywhere; each section got a photo chosen for what
  it's introducing (hero -> speaking-photo.jpg, warmer/personal sections
  -> grandkids-2025.jpg or img_1958.jpg, the Books sections -> the real
  napkin-sketch photo that's literally the origin story of one of his
  books).
- Added `background-color: #0d0d0d` as a fallback on both `.page-hero`
  and `.section-bg-image` in `styles/globals.css` -- defense in depth, so
  a future broken path degrades to a dark section with visible text
  instead of silently going invisible again.
- Added a mobile media query (`max-width: 768px, hover: none`) that
  switches `background-attachment` from `fixed` to `scroll` -- fixed
  backgrounds are unreliable on iOS Safari and can cause scroll jank on
  touch devices generally; this wasn't reported as broken but was a real
  latent mobile bug found while in this code.
- Generated real `misc/og-default.jpg` (1200x630, real photo + name/title
  overlay) and `misc/apple-touch-icon.png` (monogram) so social link
  previews and the browser tab icon are no longer broken either.
- Fixed two more hardcoded-count staleness bugs matching the "four
  categories" bug from Session 4: the homepage said "All Five Books"
  (now dynamic, `{BOOKS.length}`).

## 4. Real photo inventory used this session (all from `sorted-assets.zip`,
matched to their original blog post/page via the scraped HTML's
`data-permalink` attribute, not guessed from filenames)
- `speaking-photo.jpg`, `grandkids-2025.jpg` -- already in the project.
- `img_1958.jpg` -- confirmed via HTML context as the featured photo for
  "Praying Them In Rather Than Out" (iPhone 7, 2021). Optimized in place
  from 1MB down to 272KB; a separate cropped copy also wired directly
  into that article's `image` field.
- `napkins-that-started-individualist-eyes.jpg` -- the real napkin-sketch
  photo from the Books page's "most great books start on napkins" story.
  Only available at 526x701 (no higher-res version exists in the scrape)
  -- used behind a heavy dark overlay so the lower resolution isn't
  visible at display size, not stretched as a bright, sharp hero.
- `richards-arms-crossed-smallest-size1ebf4.jpg`,
  `dsc001002dff.jpg`, `ecc75302-dd1f-4ade-9831-0d83f7f45512.jpg` -- wired
  directly into the `image` field of "4th of July in Philippi," "A
  Handshake Means Nothing?," and "The Reckless Love of God" respectively
  -- these were each that specific post's real original featured image,
  confirmed via `data-permalink` in the scraped HTML, not reused
  generically.
- Per Randy's instruction, book cover images were intentionally left out
  of this pass -- they stay on book pages only.

---



1. ~~Podcasts admin CRUD~~ -- DONE (see Session 4 addendum
   below). `/admin/podcasts` tab, API routes, sidebar link, and seed-button
   support all added.
2. ~~Ambiguous book cover images~~ -- MOSTLY DONE. Session 5's real
   high-res covers resolved 3 of the 4 (Individualist Eyes, Paul Behaving
   Badly, and Paul and First-Century Letter Writing now have real
   confirmed covers). Only "Rediscovering Paul (1st edition)" still uses
   a placeholder -- reasonable, since it's superseded by the 2nd edition
   and may not be worth a separate cover at all. Also still placeholder:
   the 2 forthcoming/under-contract titles and "Inscriptions, Papyri, and
   Other Artifacts" (no cover art exists yet for these because they're
   unpublished or Randy hasn't sent one).
3. ~~Buy links~~ -- MOSTLY DONE. Session 5 replaced every guessed link
   with real Kindle URLs from Randy's own Amazon Author Central page.
   Still correctly empty: the 2 forthcoming/under-contract titles and the
   1991 WUNT monograph (out of print, confirmed via Amazon listing itself
   showing "Currently unavailable").
   Double-check the rest before launch.
4. Media/podcast logo files -- PublicationBadge references logo filenames
   (e.g. stone-chapel-podcast.svg) that don't exist yet as actual assets.
   Falls back to plain text gracefully, but logos would look better once
   added.
5. Supabase not actually provisioned -- supabase-schema.sql is the single,
   complete schema file (now includes the `podcasts` table from this
   session). Ready to run, but no live Supabase project has been connected
   yet; .env values are still placeholders. After running the schema, use
   the "Run Seed" button in Admin -> Settings to load books + articles --
   podcasts will need a manual seed or the admin tab from gap #1, since the
   seed route (`app/api/admin/seed/route.ts`) wasn't extended to podcasts
   this session.
6. Real images still needed for most article cards and several homepage
   photo sections -- Randy said he has real image files and will upload
   them; only book covers and the two portrait photos already in
   `sorted-assets.zip` have been placed so far. Article cards currently
   show a placeholder.
7. New visual direction requested, not yet built. Randy asked for a
   different design language than the current one: full-bleed background
   photography per section that switches (crossfade or parallax, TBD) as
   the user scrolls, with text staying fixed/legible via a gradient overlay
   -- more cinematic/editorial, less "card grid on a page." This is a real
   visual redesign, not a copy fix, and hasn't been started in code yet.
   Needs Randy's real photos first (see gap #6) and a decision on
   crossfade vs. parallax scroll behavior before implementation.
8. Scope trim partially done (see Session 3). Still remaining, per the
   master prompt's budget rules: 5-star book reviews with a submission
   form, an events/conferences system, Goodreads RSS parsing. All of it
   currently works -- nothing is broken -- but it should be reviewed
   against the $500/zero-cost budget and trimmed before final handoff, per
   Rule 1 and Rule 2 in the master prompt. Flagging rather than deleting,
   since removal is a scope decision Randy should confirm.
9. No live QA yet -- mobile pass, full link check, a real end-to-end test
   of the contact form actually landing in Randy's Gmail, and a CSV export
   test all still need to happen once this is deployed somewhere.
10. `npm run lint` reports 17 pre-existing `react-hooks/set-state-in-effect`
    warnings (see Session 2 audit), unchanged this session -- "fetch on
    mount" patterns inherited from the original duff-site code. Don't
    block the build, worth cleaning up eventually.
11. Article category split (Bible & Culture / Family & Faith) for the 22
    newly-added posts is an editorial judgment call made this session, not
    scraped data -- the live site never tagged posts by category. Worth a
    quick sanity check from Randy since a couple (e.g. "4th of July in
    Philippi") are borderline.

---

## NEXT STEP
Get real images from Randy (headshots, book covers, church/speaking photos
-- he said he has these ready) and start the full-bleed scroll-driven
photo redesign (gap #6/#7) once he confirms crossfade vs. parallax. Also
worth a quick pass asking Randy to confirm the 4 ambiguous book covers
(gap #2).

---

# SESSION 7 (2026-07-20)

Randy sent 10 real screenshots (with visible URLs) of the live Vercel
deploy and a reference site (Henry Mintzberg's, for how video embeds
should work) and pushed back hard: the "complete redesign" conversation
had only ever touched the homepage and Books, everything else was
untouched, and several pages had real functional problems, not just style
issues. Went through his list in order.

## 1. Article detail pages 404'd for everyone -- real bug, not a Supabase gap
`getArticle()` queried Supabase only, with zero fallback. Since Supabase
either isn't seeded or a given row doesn't exist there yet, every one of
the 32 real articles' detail pages returned `notFound()`. Fixed with a
static fallback to `lib/config/articles.ts`, same pattern already used for
books/podcasts. Also guarded comments so a static-fallback article (which
has a slug, not a real database UUID) can't attempt to submit a comment
that would fail -- shows an honest "comments open once this article is
synced" note instead in that specific case.

## 2. ~80% of articles had no image -- confirmed and fixed properly
28 of 32 articles pointed at `/assets/images/articles/placeholder.jpg`,
which never existed. Matched 14 more real photos from the scrape to their
exact original posts, same rigorous method as before (each image's real
`data-permalink` in the scraped HTML, not filename guessing) -- the
antichrist illustration for "The Antichrist," the Roman coin for "Render
Unto Caesar," the mosque photo for "Thank God for the Mosque Down the
Street," etc. For the remaining 14 with no real photo anywhere in the
scrape, set `image: ''` instead of a broken path -- `ArticleCard` already
had a nice gradient-fallback design built in for this exact case, it just
never triggered because the broken placeholder path was truthy.

## 3. Conferences page said "no events" -- real data existed, wasn't wired
Added `lib/config/events.ts` with Randy's real keynote history (Mid-Winter
Bible Conference, Abide Conference, Network of Biblical Storytellers, ETS
Far West, Concordia) as a fallback when Supabase is empty, matching the
pattern used everywhere else. Note: exact days weren't in the source data
(only month/year), so dates are approximated to the 1st of the month --
flagged in the data file itself.

## 4. Endorsements page was nearly unreadable -- root cause found
The dark-mode-only `HomepageReviews` carousel component (white text at
low opacity, built for a dark section) was being reused on this page,
which sits on a light cream background. White-on-cream at 20-35% opacity
is why it looked broken. Replaced with a purpose-built light-theme card
grid (ink text, gold top-border accent, large italic pull-quote styling).

## 5. Contact page "collision" -- two stacked fixed-photo sections, no break
Not a scroll-timing coincidence -- two different `background-attachment:
fixed` photo sections were stacked directly on top of each other with no
visual separator, which reads as a collision especially mid-scroll.
Replaced the second section's photo background with a solid ink gradient
so there's a clean, intentional break between the hero and the form.

## 6. "As heard on" -- partly fabricated, and broken even for the real ones
Checked all 3 listed media names against the real scraped site: "The
Stone Chapel Podcast" and "The Clarity Podcast" are real (they're in
`lib/config/podcasts.ts`, pulled from the actual old site). "Moody Radio"
appears nowhere in the scrape -- invented by an earlier session, removed.
Separately, `PublicationBadge` had every name mapped to a logo SVG file
that doesn't exist, which is why even the 2 real ones rendered as blank
boxes instead of falling back to text (the text fallback only triggers
for names NOT in the logo map, which none of them were). Cleared the map
since no real logo assets exist yet.

## 7. Foreground redesign, started for real (not homepage/Books this time)
- **About page**: added a drop-cap opening paragraph, a pull-quote break
  using his own bio text, and a real career timeline strip (1986 -> 2022)
  built from actual CV dates -- none of this layout is reused elsewhere.
- **Articles listing page**: fixed a leftover-template bug -- the page
  title and hero both literally said "Journalism" (from the original
  portfolio template this project started from, never swapped). Rebuilt
  the layout: one large featured piece treated editorially, then the rest
  as tight list-rows -- distinct from the card grid used on the homepage.
- **Category pages**: replaced the plain card grid with an alternating
  zigzag layout (image/text sides swap every row) -- a third distinct
  browsing pattern, so the archive, a category, and the homepage all
  actually look different from each other now.
- **Article body typography**: found that `.article-prose` -- the class
  wrapping every single article's actual text, and the CV page -- had
  *zero* CSS anywhere in the codebase. Every real article has been
  rendering in raw unstyled browser defaults (default blue links, no
  paragraph rhythm, no blockquote treatment) this whole time. Added real
  editorial typography: serif body text, styled blockquotes, gold
  underlined links, proper heading scale. This affects the actual reading
  experience of all 32 articles, so arguably the highest-value single fix
  in this session even though it wasn't explicitly called out in Randy's
  list.
- Also fixed the same "Journalism" leftover in the article detail page's
  breadcrumb and in the category page's SEO description.

## 8. Podcasts -- real playable embeds, matching the Henry Mintzberg reference
Built `lib/utils/podcastEmbed.ts`: detects YouTube, Vimeo, and Spotify
episode URLs and returns a real embeddable iframe src (YouTube also gets
an automatic thumbnail via `img.youtube.com`, no asset needed). 3 of the 9
real podcast entries now play directly on the page instead of just
linking out. The other 6 (Apple Podcasts, Libsyn, a publisher's article
page, Discover the Word series pages) don't have a generic, reliable
embed pattern from a URL alone, so they correctly stay as "opens in a new
tab" cards -- with a real preview image where one exists (found and wired
in the one real podcast banner image in the scrape, for "Misreading Paul:
Podcast Series").
- Added `image` field to the podcast type/schema/admin form so future
  entries can have a manual preview image too.
- **Caught before it shipped broken**: `img.youtube.com` wasn't in
  `next.config.js`'s allowed image domains -- would have thrown a runtime
  error the first time a YouTube thumbnail tried to load. Added it.

## Not done this session (explicitly deferred, not forgotten)
- CV page style polish (Randy said "ok, but a better style would be
  preferable" -- lowest priority in his list, not started).
- Blog vs. "Articles" naming -- answered as a recommendation (keep
  Articles), not changed, since it wasn't a clear instruction either way.

---

## NEXT STEP
CV page polish, then a final pass confirming every page's foreground now
reads as genuinely different from the others (About / Articles archive /
category / homepage / Endorsements / Podcasts / Conferences / Contact),
not just re-skinned versions of the same template section.

---

# SESSION 7 ADDENDUM — CV page polish (2026-07-20)

Randy's last item: "the cv pages look ok but a better style would be more
preferable." Reused article-prose typography (fixed earlier this session)
but that alone treats a CV like a blog post -- one long linear scroll,
which isn't how anyone actually reads a CV (they jump to the section they
care about). Rebuilt properly:
- `app/(site)/cv/page.tsx` now parses `CV_HTML` into its 7 real sections
  at each `<h2>` (Major Publications, Refereed Publications, Refereed
  Presentations, Selected Presentations by Invitation, Educational
  Administrative Experience, Most Recent Honors and Awards, Ministerial
  Involvement) instead of rendering it as one undifferentiated blob.
- New `components/cv/CVSections.tsx`: sticky table-of-contents sidebar
  with scroll-based active-section highlighting (IntersectionObserver),
  numbered section headers, collapses to horizontal pill-tabs on mobile.
- No content was changed, only how it's organized and navigated -- still
  the same real, word-for-word CV text.

## NEXT STEP (updated)
All items from Randy's 10-screenshot list are now addressed. Next real
step is Randy's own review pass -- redeploy, click through every page,
and flag anything that still doesn't look right, since several of these
fixes (Endorsements contrast, Contact collision) were diagnosed from
static screenshots, not a live/interactive check.

---

# SESSION 7 ADDENDUM — CV page

The last remaining item from Randy's list. A CV is a reference document
people jump around in, not read start to finish -- reusing the generic
`.article-prose` linear treatment (built for blog posts) didn't serve it
well even after that typography got real styling.

Rebuilt properly: `lib/config/cv.ts`'s single `CV_HTML` blob is now parsed
server-side (`app/(site)/cv/page.tsx`) into 7 real sections at each
`<h2>` (Major Publications, Refereed Publications, Refereed Presentations,
Selected Presentations and Publications by Invitation, Educational
Administrative Experience, Most Recent Honors and Awards, Ministerial
Involvement). New `components/cv/CVSections.tsx` renders a sticky
table-of-contents sidebar with scroll-based active-section highlighting
(IntersectionObserver), numbered section headers, and jump-to-section
anchor links -- collapses to a horizontal pill nav on mobile instead of a
sidebar. No content was changed, only how it's organized and navigated.

This closes out every item from Randy's 10-screenshot list.

---

# SESSION 8 (2026-07-21)

Randy sent 4 more screenshots and pushed on a specific distinction: "redesign"
means replacing the underlying mechanism, not recoloring the existing one --
several sections (homepage hero, homepage "Recent Work", the Articles category
tiles) were the same interactive pattern he'd already used on another client's
site, just with different content in it.

## 1. Real content-loss bug found and fixed
"We had hoped that..." was missing its entire opening blockquote (Bernie
Cueto's Easter message). Root cause: an earlier session's HTML-cleaning
script had a blanket rule stripping all `<figure>` tags (intended to
remove image captions), but this one post used `<figure class=
"wp-block-table">` as a styled quote-box, so the whole quote got deleted
with it. Checked all 32 posts for the same pattern -- isolated to this
one. Went back to the raw scraped HTML and correctly re-extracted it.

## 2. Favicon -- found the real bug
`app/layout.tsx` metadata referenced `/assets/images/misc/favicon.ico`,
which never actually existed (only the apple-touch-icon had been made).
Generated a real multi-resolution `.ico`, and also added `app/icon.png`
at Next.js App Router's natively auto-detected icon location as a second,
more reliable path.

## 3. The color -- "--gold" was actually dark teal
`--gold: #0f5c73` was teal/cyan, not gold, despite the name -- exactly why
"BIBLICAL THOUGHTS" and other gold-labeled text kept vanishing against
dark backgrounds. Changed to a real warm gold (`#b8923a` / `#d4af5a`
light variant) at the single CSS variable definition, which cascades
through the entire site's borders, links, labels, and buttons
automatically. Also found and fixed 2 places where the old teal was
hardcoded directly instead of using the variable (would not have picked
up the fix otherwise).

## 4. Three mechanisms replaced, not just recolored
- **Homepage hero**: removed `HeroTypewriter` (a cycling-word animation
  that also hardcoded its own random color array, completely bypassing
  the site's color system -- this is why "Author." rendered salmon-pink
  regardless of any CSS change). Replaced with `HeroIntro`, a static,
  confident editorial headline. No animation gimmick.
- **Homepage "Recent Work"**: removed `HomeExpandStack` (cards that only
  revealed content on hover, expanding to fill the section). Replaced
  with directly-visible article preview cards -- nothing is hidden
  behind an interaction.
- **Articles category tiles**: removed `CategoryExpand` (same
  hover-to-reveal mechanism, same hardcoded color bypass). Replaced with
  `CategoryOverview` -- always-visible category cards showing real piece
  counts and the 3 most recent titles in each.
- All three old components were deleted from the codebase entirely, not
  just unused -- confirmed via grep that nothing else referenced them
  before removing.

## 5. Pagination added to category pages
Was previously unbounded -- every article in a category rendered on one
ever-growing page. `/articles/[category]` now takes a `?page=` param,
shows 10 per page, with real Prev/Next and numbered page links. The
"N pieces" count in the hero still shows the true total, not just the
current page's count.

## 6. Bible verse hover/click feature -- built end-to-end
Sourced a full public-domain KJV Bible (66 books, all chapters/verses,
~4.3MB JSON from a GitHub-hosted public-domain dataset) and stored it at
`lib/data/bible-kjv.json` -- lives in the project, works fully offline,
no external API calls or rate limits at runtime.
- `lib/utils/bibleBooks.ts` -- maps the real abbreviation styles used in
  Randy's actual article text ("Jn.", "1 Thess.", "Rom.", "Lk", "Phil.")
  to the dataset's own book codes.
- `app/api/bible-verse/route.ts` -- parses a reference (single verse or a
  range, e.g. "Phil 3:20-21"), looks it up, strips KJV's bracketed
  translator notes, returns clean text. Cached for a day per reference.
- `lib/utils/wrapBibleRefs.ts` -- server-side, scans an article's HTML
  for reference-shaped text and wraps matches in an interactive span --
  carefully operates only on text between tags, so it can never corrupt
  existing markup or match inside an href.
- `components/journalism/BibleVerseInteractive.tsx` -- client component,
  one set of event-delegated hover/click/focus listeners for the whole
  article (not one listener per reference). Shows the verse in a small
  popover near the reference; keyboard-focusable too, not just
  mouse-hover.
- Wired into the article detail page, wrapping the existing
  `.article-prose` render.

## 7. Cleanup found while in this code
The article detail page had its own local, page-scoped `.article-prose`
`<style>` block that predated Session 7's global typography work in
`globals.css` -- meaning articles actually did have real styling before
Session 7 (correction to that session's note, which said "zero CSS
anywhere" -- that was true for the CV page but not for article detail
pages specifically, which had their own local copy). Removed the
duplicate, consolidated everything into the one definition in
`globals.css` so there's a single source of truth going forward, and
carried over the `code`/`pre` block styling that was only in the local
copy.

## Validation method upgraded this session
Past sessions self-checked with a naive brace/paren counter, which
throws false positives on regex literals containing `{`/`}` as syntax
(hit this exact false alarm on the new Bible API route). Confirmed
`esbuild` is available in this environment and is a real parser --
switched to `npx esbuild <file> --bundle=false` for actual syntax
validation. Ran it across all 109 TS/TSX files in the project this
session; all pass.
