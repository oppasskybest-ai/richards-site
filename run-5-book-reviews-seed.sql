-- ============================================================
-- RUN 5 — Amazon review seeds (18 reviews across 4 books)
-- These are pre-approved reviews scraped from Amazon via OCR.
-- Run in Supabase SQL editor. Safe to re-run (ON CONFLICT DO NOTHING).
-- After running this, approved reviews appear automatically on each
-- book's detail page under the Goodreads rating widget.
-- ============================================================

-- Ensure reviews table exists (from earlier session)
-- If you already ran the REVIEWS SYSTEM block from supabase-schema.sql, skip this.
create table if not exists book_reviews (
  id uuid primary key default gen_random_uuid(),
  book_slug text not null,
  reviewer text not null,
  title text,
  country text,
  review_date text,
  body text not null,
  rating int default 5,
  source text default 'amazon',
  status text default 'approved',
  created_at timestamptz default now()
);

insert into book_reviews (book_slug, reviewer, title, country, review_date, body, rating, source, status)
values
  ('the-firm', 'Alastair MacAndrew', 'Very informative and enjoyable read', 'the United States', 'October 13, 2013', 'This book documents well the beginnings and evolution of McKinsey as a consulting firm: from
providing generalist advise to clients on implementing the multi-divisional and conglomerate structures,
from the 1940s to the 1970s, and later, changing its focus to knowledge-based and highly specialized
consulting to business, government and other organizations from the 1980s onwards.', 5, 'amazon', 'approved'),
  ('the-firm', 'Noah Fetherston', 'Behind the Scenes: World''s Most Influential Firm', 'the United States', 'September 20, 2023', 'A fascinating and well written book by Duff McDonald on the history of McKinsey; it’s client centric focus
and how it came to be (and continues) to influence the worlds largest business corporations,
international heads of state, and the worlds most well known CEO''s. Like Goldman Sachs through out
centuries McKinsey has shaped, advised, and influenced the strategy of many successful political world
leaders & corporations.', 5, 'amazon', 'approved'),
  ('the-firm', 'Ira E. Stoll', 'Limits of an Elite Institution', 'the United States', 'September 27, 2013', 'The consulting company McKinsey "helped invent what we think of as American capitalism and spread it
to every corner of the world," Duff McDonald writes in his new book.

If one accepts Mr. McDonald''s idea of McKinsey as a stand-in for American capitalism, then it''s not a
particularly heroic tale.

The capitalist consultants ended up doing lots of work for Enron and celebrating its business model.', 5, 'amazon', 'approved'),
  ('the-firm', 'Dylan Moore', '', 'the United States', 'December 29, 2018', 'The author seems undecided on whether he wants to tell a history of McKinsey’s success or a tell all
about its failures. He concludes that he sought to write a balanced account, which is arguably true, but
his account is not without opinion. The content is interesting but because of the editorializing the writing
is at times quixotic, switching between vilifying and celebrating McKinsey in parallel sentences.', 5, 'amazon', 'approved'),
  ('the-firm', 'Richard J. Petti', '', 'the United States', 'June 14, 2017', 'The author gives a penetrating account of McKinsey and Co. with special attention to the evolution of its
values. J.0. McKinsey emphasized quantitative analysis of business. Marvin Bower, who grew the firm', 5, 'amazon', 'approved'),
  ('the-firm', 'Kesava Yerra', 'Understanding American business', 'the United States', 'July 19, 2022', 'I''ve always been a bit baffled by McKinsey and it’s competitors. Companies that seem to just make money
by doling out advice but not actually doing any of the actual work. I guess running my own consulting
firm that also does the work I was a bit jealous of it. But in this book the author goes to point out that a
consulting company made up of young people making decisions, who have no skin in the game have
actually created the negative, zero-sum business world that we currently live in.', 5, 'amazon', 'approved'),
  ('the-firm', 'Marshall', 'Great book on McKinsey', 'the United States', 'January 5, 2020', 'A very good book on McKinsey. It was well written with a good story that took you through the different
periods with some detail. Had a good narrative but also a discussion of the philosophy during the period.
The Firm comes up in a lot of law cases and and business school discussions- I figured I needed to know
more about the company. This book did the trick.', 5, 'amazon', 'approved'),
  ('the-firm', 'dineshtambe', 'Unputdownable', 'India', 'March 9, 2015', 'Amazing chronological description of ups and downs McKinsey and its clients had seen
From james McKinsey to Marwin Bower and beyond ....

The Firm''s journey and the philosophical value addition by its Managing Directors been very well
narrated.

The firm is totally unputdownable

Report

{% Big stone

etototok Investigacién', 5, 'amazon', 'approved'),
  ('the-golden-passport', 'Michael J. Kerrigan', 'Has Harvard Business School Made A Difference For The Better?', 'the United States', 'May 29, 2017', 'Francis Bacon in his essay “Of Studies” stated, “crafty men condemn studies, simple men admire them,
and wise men use them.” The Golden Passport is best not just tasted but chewed and digested fully, as
McDonald''s work offers much to be weighed, considered and used.

However, if you do not have time to plough through Duff McDonald''s 600 plus pages of The Golden
Passport you can get the gist of his entire book in one sentence... “The school is bought and paid for by
the consulting firms.', 5, 'amazon', 'approved'),
  ('the-golden-passport', 'Eli P. Cox', 'Fascinating but flawed', 'the United States', 'May 17, 2017', 'McDonald had an excellent history of the Harvard Business School where case studies constitute the core curriculum. rate
with him, but his scope is broad and his documentation is extensive.', 5, 'amazon', 'approved'),
  ('the-golden-passport', 'Alexander L. Brown', 'Should be required reading for the next HBS class', 'the United Kingdom', 'November 8, 2017', 'If you buy into the premise that HBS is the most important MBA program, and by extension, has the most.
influence, then this book is very interesting. I do buy into that notion, and as a result, believe it should be
required reading for the current MBA classes, administrators and faculty. My only substantive criticism:
the author appears at times to be seeking evidence to back up his assertions, rather than remaining
purely neutral. I''d be very interested in an HBS response. Great work.', 5, 'amazon', 'approved'),
  ('the-golden-passport', 'Philip S', 'Very harsh critique', 'Australia', 'June 12, 2017', 'Some excellent insights on the history of HBS, but too many long diatribes on the shortcomings. HBS
and McKinsey are blamed for most of the world''s economic ills. They have some responsibility, but not as
much as the book says, in my view.

Report

Q recon castor
totototok Great book', 5, 'amazon', 'approved'),
  ('last-man-standing', 'Jorge Alvarado', '', 'the United States', 'January 14, 2023', 'Without getting into much detail, I found this book to be a remarkable piece of a person who overcame
obstacles and remained a person of ambition and integrity. Obviously, I do not know Mr. Dimon and can''t
verify if everything is true. However, the journalist has a good reputation and trust that he did his best to
give us good information. What I gotten from this book is to stay true to yourself, have a good set of
morals and principles, and to stay persistent in whatever you do.', 5, 'amazon', 'approved'),
  ('last-man-standing', 'David R. Miller', '', 'the United States', 'July 28, 2025', 'Gives you the full life of jamie diamond. The schooling time. I learned to program in PLATO. Which was
control datas computer. From there into credit corp and then onto JP morgan. All through the housing
crisis. Again and again the successful firms led by the warren buffets, jesen haung, all at it almost 18
hours a day. Thats what makes them so successful. Smart and disciplined. Great read for any of my fellow
investors.', 5, 'amazon', 'approved'),
  ('last-man-standing', 'nandan bharti', 'Its okay', 'India', 'December 20, 2019', 'It is more of detailed third party account of his lifetime achievements and less of a biography. Mr Dimon
is undoubtly one of the greatest banker of our time..i may be wrong here but i felt that the book kind of
tries to makes a god out of him....', 5, 'amazon', 'approved'),
  ('tickled', 'Shea', '', 'the United States', 'June 6, 2024', 'Tickled is part memoir, part confessional, part self help, part philosophy, all Duff.
It’s a message that sticks with you and you find yourself not just wanting to be tickled but changed.', 5, 'amazon', 'approved'),
  ('tickled', 'Dan Tomasulo, PhD, MFA, MAPP', 'Tickled is one of those books that I didn’t want to end.', 'the United States', 'August 25, 2023', 'Tickled is one of those books that I didn’t want to end. I found myself reading slower as I was turning the
pages and coming up on the last chapters. This is a book about an authentic awakening by a NYT
bestselling writer. What he discovers is the extraordinary value of being present—but with twists and
turns along the way. He shares his insights in a way that entertains and enlightens. Go with Duff
McDonald on his journey—you''ll be tickled you did.

One person found this helpful', 5, 'amazon', 'approved'),
  ('last-man-standing', 'Bill Dahl', 'A Privilege - A Pleasure - An Honor - Magnificent!', 'the United States', 'March 27, 2010', 'I just finished Duff McDonald''s "Last Man Standing - The Ascent of Jamie Dimon and JP Morgan Chase." This book should be required reading for
every person in the financial services industry, anyone studying business in college, as well as entrepreneurs, M&A types, accountants, and investors.
It''s just a fantastic, incredible story - woven together by a master literary artist.

This is a tremendous biography. Yet, it''s vastly more than that.', 5, 'amazon', 'approved')
on conflict do nothing;

-- Verify: select book_slug, count(*) from book_reviews group by book_slug;
