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

## NOT DONE -- REAL GAPS, NOT JUST POLISH

1. Podcasts -- doesn't exist yet. No Supabase table, no admin tab, no
   public page. This is one of the 4 required content types in the master
   prompt and one of the 3 things Randy said he cares about. This is the
   next thing to build, not a copy/text fix. The Navbar currently has a
   TODO comment where this needs to slot in.
2. CV page -- his real live nav has one, this project doesn't yet.
3. Full article text -- only teaser excerpts exist for all 10 seeded
   posts. Either pull full text from the 465-page richards-backup HTML
   clone (most of those files have scraper-garbage names like
   GET__10744.html and need to be matched to real posts first -- many are
   likely 404s per the earlier scrape check) or have Randy paste in the
   full text via /admin/articles.
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
8. Supabase not actually provisioned in this pass -- supabase-schema.sql,
   supabase-articles-migration.sql, and the new
   supabase-seed-articles-richards.sql exist and are ready to run, but no
   live Supabase project has been connected yet. .env values are still
   placeholders.
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

---

## NEXT STEP
Build the Podcasts content type (Supabase table + admin tab + public grid
page with graceful embed fallback, per master prompt Content Scope item 4).
