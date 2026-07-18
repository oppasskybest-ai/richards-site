# MASTER BUILD PROMPT — E. RANDOLPH RICHARDS WEBSITE
# For use with AI coding assistant (Cursor, Claude, Copilot etc)
# Read every word of this before touching a single file.

---

## BUDGET CONTEXT — READ THIS FIRST

This is a $500 build. Randy is retired, budget conscious, and explicitly said this needs to stay simple. He is not paying for anything he doesn't need. Do not add features, paid services, or infrastructure beyond what is listed here, even if it seems like an obvious improvement.

He confirmed three things caught his interest: zero monthly cost, some ability to update his own content, and beautifully styled articles. Everything in this build should serve those three things. Nothing else.

---

## WHO THIS IS FOR

E. Randolph Richards, Ph.D., is a retired Professor of New Testament, author of "Misreading Scripture with Western Eyes" and other books, and former Provost. He does not use his site for income. Students and colleagues use it mainly to find him and his work; his Academia.edu page gets more traffic than his personal site. His current site (randolphrichards.com) is a standard WordPress.com free-tier blog.

---

## WHAT YOU ARE BUILDING

A custom, lightweight Next.js site to replace his current WordPress.com blog. It runs at absolute $0 per month except his yearly domain renewal, which he already pays regardless.

This is not a full marketing platform. It is a clean, fast, good-looking personal site with a small admin area so Randy can update the specific things he actually cares about, without needing you every time.

---

## CRITICAL RULES — NEVER BREAK THESE

**RULE 1: KEEP IT MINIMAL**
Randy explicitly said the previous, bigger pitch (automated subscriber workflows, full dynamic marketing platform) was more than he needs. If a feature isn't listed in the scope below, don't build it, even if it would be easy to add.

**RULE 2: NO PAID OR RECURRING SERVICES WITHOUT ASKING**
Zero monthly cost is the entire pitch. Any service used must have a free tier that comfortably covers his actual usage (low traffic, small subscriber list). Flag anything that risks crossing into a paid tier.

**RULE 3: PRESERVE HIS CONTENT AND TONE**
His book descriptions, article text, and personal touches (like the handwritten napkin notes on his books page) are part of what makes the site his. Extract and preserve them accurately. Don't rewrite his voice.

**RULE 4: MOBILE FIRST**
Students and colleagues will view this on their phones. Every page must work cleanly on a 375px screen before desktop polish matters.

**RULE 5: MINIMAL ADMIN, NOT NO ADMIN**
He should be able to log in and update books, upcoming releases, podcasts, and articles himself. This is not a fully static site like a stripped-down build — a small real backend is part of the deal. Just keep it to exactly these four content types. Do not build a general page builder.

---

## THE CLONED SITE — HOW TO USE IT

The current site has already been cloned locally for reference:

```
/home/oppasskybest/dev/dev/clone-website-pitch/richards-backup/
```

This contains his existing book cover images, article/blog text, and CSS structure pulled via httrack. Use it to extract his actual content and image assets. Ignore all WordPress-generated markup, shortcodes, and theme CSS — pull out only the real text and images. Do not carry over any WordPress class names, plugin scripts, or "Blog at WordPress.com" branding.

---

## CONTENT SCOPE — WHAT ACTUALLY GETS BUILT

1. **Home page** — clean academic hero section (photo, credentials, welcoming statement), featured/latest book, links to his Academia.edu profile and contact section.
2. **Books & Publications** — book cards with cover image, description, buy links (Amazon, IVP, Zondervan etc as applicable), and upcoming release info. Editable from the admin area.
3. **Articles** — his theological articles and essays, styled with strong typography for a comfortable, book-like reading experience. Editable from the admin area.
4. **Podcasts** — grid of podcast/conference appearances, using clean styled cards that degrade gracefully (a direct link button) if an embedded player fails to load. Editable from the admin area.
5. **Contact form** — name, email, message. Submissions forward directly to his personal Gmail (e.randolph.richards@gmail.com) via a serverless function. He should never need to log into the site just to check messages.
6. **Subscriber capture (optional, lightweight)** — a simple email signup box. No automated email sequences. Emails are stored and can be exported as a CSV from the admin area whenever he wants to email people manually.

Not in scope: automated email workflows, live syncing of social media posts, pulling in live Amazon/Goodreads review data, blog comment systems, full CMS page builder, analytics dashboards.

---

## DESIGN DIRECTION

**Tone:** Academic, warm, credible. Reflects a career scholar and author, not a startup or a sales page.

**Typography:** This is one of the three things he cares about most. Use a serif for headings (e.g. Lora or Georgia) and a clean, highly readable sans-serif for body text, generous line height, comfortable measure for long-form article reading — should feel like reading a well-set book, not a blog.

**Colours:** Simple, restrained palette. Avoid anything that reads as flashy or commercial. Warm off-white background, dark neutral text, one understated accent colour for links/buttons.

**Layout:** Single column reading experience for articles, clear book grid for publications, no carousels, no autoplay, no clutter.

**Navigation:** Home, Books, Articles, Podcasts, About/Contact. Simple, no mega-menus.

---

## TECHNICAL STACK

- Next.js (App Router), Tailwind CSS
- Supabase (free tier) for the four content tables (books, articles, podcasts, subscribers) and simple auth restricted to his login only
- Contact form: serverless API route using a free-tier email sender (e.g. Resend, well within its free monthly limit for this traffic level) to forward messages straight to his Gmail
- Deployment: GitHub + Vercel, $0/month
- Images: next/image, sourced from the cloned assets in richards-backup, optimized on build

---

## MINIMAL ADMIN DASHBOARD (/admin)

- Simple login screen, restricted to his email only
- **Books tab** — add/edit/delete book entries: title, description, cover image, buy links, upcoming toggle
- **Articles tab** — add/edit/delete articles with a basic text/markdown editor
- **Podcasts tab** — add/edit/delete entries with embed code or external link
- **Subscribers tab** — list of captured emails with a single "Export to CSV" button. No automation, no send functionality. That's it.

Keep this dashboard visually simple. It doesn't need to be beautiful, it needs to be obvious and hard to break.

---

## BUILD ORDER

1. Project setup — Next.js, Tailwind, fonts, colour variables, base layout.
2. Navigation and page shells — no content yet.
3. Extract content and images from richards-backup for books, articles, podcasts, and the home page.
4. Home page — built from extracted content.
5. Books section — index and individual book display, styled cards.
6. Articles section — index and individual article pages with the typography treatment.
7. Podcasts section — grid with graceful fallback for failed embeds.
8. Contact form — wire the forward-to-Gmail route.
9. Subscriber capture form — simple signup, stores to Supabase.
10. Supabase setup — four tables, auth restricted to his account.
11. Admin dashboard — four tabs (books, articles, podcasts, subscribers with CSV export).
12. Full review — every page, every link, mobile check, confirm contact form actually delivers to Gmail, confirm CSV export works.

---

## BEFORE EVERY SESSION

Paste this prompt in full at the start of each new AI session and state which step you're on and what was last completed. The AI has no memory between sessions.

---

## A NOTE ON SCOPE DISCIPLINE

Randy already flagged that a bigger platform felt like more than he needs. The win here is a fast, well-typeset, credible site that he can update himself in the four ways he actually asked for, for $500 and zero ongoing cost. Resist adding anything beyond that, even if it would technically be an improvement.
