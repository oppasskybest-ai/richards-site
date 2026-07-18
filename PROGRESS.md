# PROGRESS.md — E. Randolph Richards Website
## Read this AND richards-master-prompt.md at the start of every session before touching any code.

This project started from a working Next.js + Supabase site built for a
different client ("duff-site") and is being reskinned + recontented for
Randy. The backend logic (comments, admin CRUD, contact form, subscriber
capture, auth) is real and functional -- it did not need to be rebuilt from
scratch. What follows is what's been changed, and what's genuinely still
missing.

---

# STATUS AT A GLANCE (2026-07-18)

Rebrand + recolor pass complete. Podcasts content type still needs to be
built from scratch -- that's the biggest real gap before this is launchable.

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



1. Podcasts -- doesn't exist yet. No Supabase table, no admin tab, no
   public page. This is one of the 4 required content types in the master
   prompt and one of the 3 things Randy said he cares about. This is the
   next thing to build, not a copy/text fix. The Navbar currently has a
   TODO comment where this needs to slot in.
2. CV page -- his real live nav has one, this project doesn't yet.
3. Full article text -- only teaser excerpts exist for all 10 seeded
   posts (now correctly stored as content_html on native articles -- the
   seed button will insert them properly, see Session 2 audit above).
   Either pull full text from the 465-page richards-backup HTML clone
   (most of those files have scraper-garbage names like GET__10744.html
   and need to be matched to real posts first -- many are likely 404s per
   the earlier scrape check) or have Randy paste in the full text via
   /admin/articles.
4. Ambiguous book cover images -- a few files in the scrape
   (101ce-dtwmisreadingpaul.jpg, two Amazon-thumbnail-style covers,
   john-wbc-by-beasley-murray.jpg) weren't confidently identifiable and
   were NOT used, rather than guessing. Worth asking Randy directly -- he
   may have more books than the 4 currently listed (e.g. Misreading
   Scripture with Individualist Eyes, Paul Behaving Badly).
5. Endorsements / testimonials -- currently a single honest placeholder,
   both on the homepage and the Endorsements page. Needs real blurbs from
   Randy (back cover copy, a colleague's note, etc.) -- do not fill with
   invented quotes.
6. Buy links -- the 4 books point to plausible-looking IVP/Amazon URLs
   that have not been individually verified against the live retailer
   pages. Double-check before launch.
7. Media/podcast logo files -- PublicationBadge references logo filenames
   (e.g. stone-chapel-podcast.svg) that don't exist yet as actual assets.
   It gracefully falls back to plain text in the meantime, so nothing is
   broken, but logos would look better once added.
8. Supabase not actually provisioned in this pass -- supabase-schema.sql
   is now the single, complete schema file (includes the articles
   content_type/content_html columns and the books quotes column that
   used to live in separate migration files). Ready to run, but no live
   Supabase project has been connected yet. .env values are still
   placeholders. After running the schema, use the "Run Seed" button in
   Admin -> Settings to load the 4 books + 10 articles -- don't run any
   old SQL seed files, there aren't any anymore, that's now the one path.
9. Only reviewed the content visible in the one PDF screenshot (page 1 of
   his blog) plus image-map.txt -- the rest of the 465-page HTML scrape
   hasn't been sorted for additional usable blog history yet.
10. Scope trim not done. Per the master prompt's budget rules, this
    codebase (inherited from a different, bigger project) still includes
    features beyond Randy's 4-type scope: broadcast/newsletter emails,
    5-star book reviews with a submission form, an events/conferences
    system, Goodreads RSS parsing. All of it currently works -- nothing is
    broken -- but it should be reviewed against the $500/zero-cost budget
    and trimmed before final handoff, per Rule 1 and Rule 2 in the master
    prompt. Flagging rather than deleting, since removal is a scope
    decision, not a build task.
11. No live QA yet -- mobile pass, full link check, a real end-to-end test
    of the contact form actually landing in Randy's Gmail, and a CSV
    export test all still need to happen once this is deployed somewhere.
12. `npm run lint` reports 17 pre-existing `react-hooks/set-state-in-effect`
    warnings (see Session 2 audit) -- all "fetch on mount" patterns
    inherited from the original duff-site code, now flagged by a stricter
    rule in the current eslint-config-next. They don't block the build,
    but worth cleaning up eventually for code health.

---

## NEXT STEP
Build the Podcasts content type (Supabase table + admin tab + public grid
page with graceful embed fallback, per master prompt Content Scope item 4).
