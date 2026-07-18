-- ============================================================
-- RUN 6 — Complete Amazon review re-audit (all 6 books)
-- Replaces run-5-book-reviews-seed.sql entirely.
--
-- WHY THIS FILE EXISTS:
-- The run-5 file claimed "safe to re-run (ON CONFLICT DO NOTHING)" but
-- book_reviews.id is a freshly-random uuid with no unique constraint on
-- any other column, so ON CONFLICT could never actually match anything.
-- Re-running run-5 would have silently duplicated every row.
--
-- This file instead does DELETE (scoped to source='amazon') + INSERT for
-- every book below, inside a single transaction. That makes it genuinely
-- safe to re-run as many times as you want — each run wipes only the
-- Amazon-sourced rows for these six books and replaces them with the
-- current clean set. It never touches visitor-submitted reviews (the
-- separate `reviews` table), and never touches Amazon rows for a book
-- not listed in this file.
--
-- WHAT WAS FIXED FROM run-5:
--   - Several star ratings in run-5 were wrong (everything had been
--     defaulted to 5-star regardless of the actual Amazon rating shown).
--   - One "the-firm" review (dineshtambe) had OCR garbage appended to it
--     that turned out to be a fragment of a different, Spanish-language
--     review — split out and excluded as foreign-language.
--   - Non-English and pure-filler reviews ("Product arrived as advertised")
--     are excluded, consistent with the original filtering rule.
--   - The Firm: 8 -> 10 reviews. Last Man Standing: 3 -> 10. Golden
--     Passport: 4 -> 11. Tickled: 2 -> 8. The CEO: 0 -> 5 (all 5 of its
--     global ratings). Frictionless: 0 -> 6.
--   - TOTAL: 18 -> 50 reviews across all 6 books.
--
-- Run this in the Supabase SQL editor. After running, reviews appear on
-- each book's detail page and in the homepage/reviews carousel within
-- 60 seconds (ISR cache).
-- ============================================================

begin;

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

-- Wipe only the Amazon-sourced rows for the six books covered by this file.
delete from book_reviews
where source = 'amazon'
  and book_slug in ('the-firm', 'last-man-standing', 'the-golden-passport', 'tickled', 'the-ceo', 'frictionless');

insert into book_reviews (book_slug, reviewer, title, country, review_date, body, rating, source, status)
values

-- ============================================================
-- THE FIRM (10 reviews)
-- ============================================================
('the-firm', 'Mr D', 'Great book', 'the United States', 'May 11, 2014', 'A must read book for anyone in corporate America. A very interesting and informative book on how to market and insulate yourself from accountability while generating hugh consulting bills from "overpaid, egotistical, insecure and many times ineffective corporate execs". i.e.- Enron, GM, K-mart, Sears, etc.

I learned McKinsey does a fantastic job marketing and networking themselves. When you read about it you''ll marvel at how incredibly simple yet extremely effective it is.

Interesting the original founder of the firm took a job as CEO at Marshall Fields in the 1930''s and died two years later acknowledging it''s much easier to give advice than successfully implement it. It''s believed stress was factor in his ailing health. McKinsey is also widely credited for creating the current excessive executive pay programs for CEO''s.

It''s also been said they accounted for more layoffs in corporate America than any other organization. I wonder if they invented the term "Human Capital" that corporate America is using. Thank you McKinsey!', 5, 'amazon', 'approved'),

('the-firm', 'Alastair MacAndrew', 'very informative and enjoyable read', 'the United States', 'October 13, 2013', 'This book documents well the beginnings and evolution of McKinsey as a consulting firm: from providing generalist advise to clients on implementing the multi-divisional and conglomerate structures, from the 1940s to the 1970s, and later, changing its focus to knowledge-based and highly specialized consulting to business, government and other organizations from the 1980s onwards. The author points out the changing strategies but the relatively constant cultural values which drove them: an unrelenting and self-effacing devotion to client needs, selectivity in human resources and clientele, adaptability to changing demands, prizing teamwork over individual achievement, continuous culling of the workforce, and a capacity to bring rigorous analytic thinking to customer''s decision-making processes.

He also points out that McKinsey managed to deftly balance the two opposing facets of a professional service organization, which are to maintain the professional values of providing sound and objective advise to clients, and at the same time, ensure the economics of the business itself are optimized. This balance was seriously compromised during the 1990s and early noughties, when under the leadership of Rajat Gupta the firm shifted its focus in favor of more commercial goals, and growth at any cost.

The reason why I gave four stars instead of five is because I feel the author needed to include a couple of examples of McKinsey''s work, showing their thought-process, procedure, their conclusions and recommendations.', 4, 'amazon', 'approved'),

('the-firm', 'Noah Fetherston', 'Behind the Scenes: World''s Most Influential Firm', 'the United States', 'September 20, 2023', 'A fascinating and well written book by Duff McDonald on the history of McKinsey; it''s client centric focus and how it came to be (and continues) to influence the worlds largest business corporations, international heads of state, and the worlds most well known CEO''s. Like Goldman Sachs through out centuries McKinsey has shaped, advised, and influenced the strategy of many successful political world leaders & corporations. The only book available today that provides a balanced inside look into the workings of McKinsey, how it''s changed and remains much the same under the leadership of its many managing directors.', 5, 'amazon', 'approved'),

('the-firm', 'Ira E. Stoll', 'The Limits of an Elite Institution', 'the United States', 'September 27, 2013', 'The consulting company McKinsey "helped invent what we think of as American capitalism and spread it to every corner of the world," Duff McDonald writes in his new book.

If one accepts Mr. McDonald''s idea of McKinsey as a stand-in for American capitalism, then it''s not a particularly heroic tale. The capitalist consultants ended up doing lots of work for Enron and celebrating its business model.

Mr. McDonald also suggests, but doesn''t come quite out and say so directly, that the problems at McKinsey may be read not only as those of American capitalism but of American elites. Mr. McDonald''s book shows that kind of focus has its virtues, but also has its limits.', 3, 'amazon', 'approved'),

('the-firm', 'Dylan Moore', 'Good history of McKinsey, ok writing', 'the United States', 'December 29, 2018', 'The author seems undecided on whether he wants to tell a history of McKinsey''s success or a tell all about its failures. He concludes that he sought to write a balanced account, which is arguably true, but his account is not without opinion. The content is interesting but because of the editorializing the writing is at times quixotic, switching between vilifying and celebrating McKinsey in parallel sentences.

However it is an interesting read for anyone who wants to learn more about how McKinsey got to where it is today.', 4, 'amazon', 'approved'),

('the-firm', 'Richard J. Petti', 'A story of two kinds of success', 'the United States', 'June 14, 2017', 'The author gives a penetrating account of McKinsey and Co. with special attention to the evolution of its values. J.0. McKinsey emphasized quantitative analysis of business. Marvin Bower, who grew the firm (and management consulting) from a fringe to a fabulously successful and influential institution, focused on addressing generalist issues that supersede the concerns of functional managers.

As a consultant at McKinsey''s NY and London offices in 1980-81, I saw the value conflicts first-hand. I had lunch with Marvin Bower, who met all the new recruits. At the end of that year, I resigned, despite being told by a very senior partner "You are the best analyst in the Firm," and despite a multi-party attempt to persuade me to stay. The author frames those value conflicts with a rich background of information.', 5, 'amazon', 'approved'),

('the-firm', 'Kesava Yerra', 'understanding American business', 'the United States', 'July 19, 2022', 'I''ve always been a bit baffled by McKinsey and it''s competitors. Companies that seem to just make money by doling out advice but not actually doing any of the actual work. But in this book the author goes to point out that a consulting company made up of young people making decisions, who have no skin in the game have actually created the negative, zero-sum business world that we currently live in. This includes the excess of the Enron, the financial crisis, GM, and many more have all been linked to McKinsey in some way.

Overall a good and detailed read, but it could have used a bit of cutting maybe 50 pages or so.', 4, 'amazon', 'approved'),

('the-firm', 'Marshall', 'Great book on McKinsey', 'the United States', 'January 5, 2020', 'A very good book on McKinsey. It was well written with a good story that took you through the different periods with some detail. Had a good narrative but also a discussion of the philosophy during the period. The Firm comes up in a lot of law cases and business school discussions - I figured I needed to know more about the company. This book did the trick.', 5, 'amazon', 'approved'),

('the-firm', 'W.P.', 'A well written and informative account', 'the United Kingdom', 'May 3, 2017', 'Working for one of the competitors mentioned in the book, the book has come as an interesting read. Not only does it provide a gentle insight into the company, it provides a foundation for the context of consulting as a whole; outlining the principles of the occupation and the challenges continually placed on the employee in order to please the corporate leadership.', 5, 'amazon', 'approved'),

('the-firm', 'dineshtambe', 'Unputdownable !!!!!', 'India', 'March 9, 2015', 'Amazing chronological description of ups and downs McKinsey and its clients had seen.

From James McKinsey to Marvin Bower and beyond....

The Firm''s journey and the philosophical value addition by its Managing Directors been very well narrated.

The firm is totally unputdownable !!!!!', 5, 'amazon', 'approved'),

-- ============================================================
-- LAST MAN STANDING (10 reviews)
-- ============================================================
('last-man-standing', 'Bill Dahl', 'A Privilege - A Pleasure - An Honor - Magnificent!!!', 'the United States', 'March 27, 2010', 'I just finished Duff McDonald''s "Last Man Standing - The Ascent of Jamie Dimon and JP Morgan Chase." This book should be required reading for every person in the financial services industry, anyone studying business in college, as well as entrepreneurs, M&A types, accountants, and investors. It''s just a fantastic, incredible story - woven together by a master literary artist.

This is a tremendous biography. Yet, it''s vastly more than that. It is a crucial contribution to the burgeoning insights into the development of the financial services industry in the U.S.

The writing by Duff McDonald is balanced, provides the reader with a tremendous sense of Jamie Dimon as a human being, as well as financier/CEO.

Of course the years as Sandy Weill''s protege are well documented and shared frankly, yet with uncanny dignity. The Dimon family''s dedication to giving back to community is well documented in the book.

Frankly, after 328 pages of absolutely wonderful investigative journalism, the obvious discipline of a superb historical biographer, and being immersed in the rare literary talents of a master story-teller (I am referring here to author Duff McDonald) -- I unequivocally agree!!!

To the reader - Buy This Book - One of the Best I''ve devoured in 2010 and likely to make my Top 10 for 2010. ENJOY!', 5, 'amazon', 'approved'),

('last-man-standing', 'Jorge Alvarado', 'It''s a great but for the ambitious person!', 'the United States', 'January 14, 2023', 'Without getting into much detail, I found this book to be a remarkable piece of a person who overcame obstacles and remained a person of ambition and integrity. Obviously, I do not know Mr. Dimon and can''t verify if everything is true. However, the journalist has a good reputation and trust that he did his best to give us good information.

What I gotten from this book is to stay true to yourself, have a good set of morals and principles, and to stay persistent in whatever you do. Go after your dreams and do not give up even when the tough times get tough. Just know this book had betrayal, failures, and difficulties but despite that, he came through and became the GOAT of the banking industry where his own idol, Warren Buffet, praised him. Loved it!', 5, 'amazon', 'approved'),

('last-man-standing', 'StrikerNI', 'Good read!', 'the United States', 'January 11, 2026', 'Very interesting read on Jamie Diamond and the US banking sector. Easy to read, even though I would have wanted more management best practices.', 4, 'amazon', 'approved'),

('last-man-standing', 'Thomas J.', 'Only the first of many chapters yet to be written about Jamie', 'the United States', 'October 8, 2009', 'There will be obvious bias in this review. I have been with the bank for over 12 years. Having met Jamie on a couple of occasions, his attention to detail blows my mind. He asked the group about the system issue and whether or not it was causing any customer service quality issues. He cared. Each time, I walked away more inspired. He has that effect on people. His drive and determination is infectious. He cares. He listens. He motivates and inspires.

Duff''s account of Jamie''s career is a must read for any aspiring manager/leader. From his detailed account of Jamie''s early career to the more recent events, this book is an easy, addictive read. It''s hard to put it down. Strongly recommended.', 5, 'amazon', 'approved'),

('last-man-standing', 'David R. Miller', 'Great read for any investor', 'the United States', 'July 28, 2025', 'Gives you the full life of jamie diamond. The schooling time. I learned to program in PLATO. Which was control datas computer. From there into credit corp and then onto JP morgan. All through the housing crisis. Again and again the successful firms led by the warren buffets, jesen haung, all at it almost 18 hours a day. Thats what makes them so successful. Smart and disciplined. Great read for any of my fellow investors.', 5, 'amazon', 'approved'),

('last-man-standing', 'nefrocito', 'Biography book', 'the United States', 'January 25, 2026', 'Pleasure to read', 5, 'amazon', 'approved'),

('last-man-standing', 'Pat', 'A very good book covering more than just Jamie Dimon!', 'the United States', 'August 24, 2015', 'Jamie Dimon is a business leader of whom I had read very little prior to this book. He is not a shadow figure; rather he is a forceful, very visible presence in almost any situation.

The book offered many insights about Dimon, Sandy Weill, Warren Buffett and others which broadened my knowledge base. It was a worthwhile purchase and belongs in any well-rounded business library, including yours!', 4, 'amazon', 'approved'),

('last-man-standing', 'mark kao', 'Lead by example', 'the United States', 'October 26, 2025', 'A great lesson in leadership and loyalty, and the pros and cons of both', 5, 'amazon', 'approved'),

('last-man-standing', 'nandan bharti', 'Its okay', 'India', 'December 20, 2019', 'It is more of detailed third party account of his lifetime achievements and less of a biography. Mr Dimon is undoubtly one of the greatest banker of our time..i may be wrong here but i felt that the book kind of tries to makes a god out of him....', 3, 'amazon', 'approved'),

('last-man-standing', 'robert s', 'Great read', 'the United Kingdom', 'April 21, 2025', 'Great read', 5, 'amazon', 'approved'),

-- ============================================================
-- THE GOLDEN PASSPORT (11 reviews)
-- ============================================================
('the-golden-passport', 'tedbrandewieDOTcom', 'Insightful history describing the eras of American business and its most important participants, including Doriot, Porter, Jensen', 'the United States', 'May 17, 2017', 'Well researched book! It covers all the time periods of the School. I went there 20+ years ago but the book taught me a great deal about the place, especially the periods before I got there. It''s a troubling read, as so many graduates have utilized their "passport" for nefarious deeds.

The author especially and exhaustively criticizes Michael Jensen for steering the School and its students onto strictly shareholder value in the late 80''s and the resulting ballooning of CEO compensation and wealth transfer from workers to executives.

I recommend the book for those wishing to understand HBS.', 5, 'amazon', 'approved'),

('the-golden-passport', 'Michael J. Kerrigan', 'Has Harvard Business School Made A Difference For The Better?', 'the United States', 'May 29, 2017', 'Francis Bacon in his essay "Of Studies" stated, "crafty men condemn studies, simple men admire them, and wise men use them." The Golden Passport is best not just tasted but chewed and digested fully, as McDonald''s work offers much to be weighed, considered and used.

For me, three chapters in the book make the long read most worthwhile, namely: Chapters 36 (Can Leaders Be Manufactured), 47 (Self-interest with a Side Dish of Ethics) and 51 (A Thorn in Their Side.) McDonald''s forays into these chapters on the timely topics of leadership and ethics are timely and insightful.

McDonald strongly suggests HBS has failed to develop a strong moral compass in their students.', 4, 'amazon', 'approved'),

('the-golden-passport', 'Dr. Patricia Rupert', 'A must read for those without MBA''s who are concerned with the demise of the healthy American way of life we once experienced.', 'the United States', 'April 30, 2017', 'If I had only read the Amazon reviews of this book, I would not have purchased it. It is an amazing if not lengthy book. Succinctly, what makes this book a must read for those of us without MBAs, is summarized in a quote from a Wall Street Journal review: "It''s no mystery what happens when government falls captive to the industries it is supposed to regulate; the big story here is what happens when education, too, slips on the golden handcuffs and jumps into bed."', 5, 'amazon', 'approved'),

('the-golden-passport', 'Eli P. Cox III', 'Fascinating but flawed.', 'the United States', 'May 17, 2017', 'McDonald''s book is a case history of the Harvard Business School where case studies constitute the school''s distinctive method of instruction. The school''s administration and faculty refused to cooperate with him, but his scope is broad and his documentation is extensive.

The Golden Passport is a fascinating story, but flawed in its telling. McDonald''s frequent use of color commentary and the occasional appearance of locker room language undermine his arguments concerning issues worthy of careful consideration.', 3, 'amazon', 'approved'),

('the-golden-passport', 'Richard Kent', 'Basically a Rant', 'the United States', 'April 29, 2017', 'I had higher hopes for this book. As an HBS student I thought an informed analysis by an outsider would be interesting and provide a perspective I hadn''t previously heard, but sadly the book ends up being a temper tantrum of epic proportions.

While there is plenty to criticize HBS about, this book wastes that opportunity by inserting too many essentially personal views without any evidence to back them up.', 2, 'amazon', 'approved'),

('the-golden-passport', 'Ken S.', 'I found the book thoughtful and useful, but felt the author''s bias was too transparent ...', 'the United States', 'September 18, 2017', 'I am not a Harvard or business school graduate. I read the book as a source for social change and the role of corporations in American society. I found the book thoughtful and useful, but felt the author''s bias was too transparent in reviewing the missed opportunities of HBS to instill or develop a sense of social responsibility in its students.

The book itself was very readable and addressed an important question regarding the responsibility of HBS to have a more developed strategy for its social responsibility, given the importance of the institution in the global economy.', 4, 'amazon', 'approved'),

('the-golden-passport', 'Richard J. Petti', 'HBS and the evolution from making products and profits to maximizing shareholder value', 'the United States', 'June 14, 2017', 'The author recounts the fascinating history of HBS from before its founding in 1907 to the present, and the tensions with Harvard University that felt it had a higher mission. The subtitle of the book captures its main conclusion about HBS: "... the moral failure of the MBA elite."

This book tackles a fundamental issue in American society: how American business evolved from making things society needed and a lot of money in the process, to extracting the maximum wealth possible from the host society.', 5, 'amazon', 'approved'),

('the-golden-passport', 'RW', 'Entertaining, Informative, Fair', 'the United States', 'May 27, 2017', 'I graduated from HBS and had both Jensen and Porter for professors. I have read the book. The reviews in The New York Times and The Globe and Mail are well written and spot on.', 5, 'amazon', 'approved'),

('the-golden-passport', 'Alexander L. Brown', 'Should be required reading for the next HBS class', 'the United Kingdom', 'November 8, 2017', 'If you buy into the premise that HBS is the most important MBA program, and by extension, has the most influence, then this book is very interesting. My only substantive criticism: the author appears at times to be seeking evidence to back up his assertions, rather than remaining purely neutral. I''d be very interested in an HBS response. Great work.', 5, 'amazon', 'approved'),

('the-golden-passport', 'Philip S', 'Very harsh critique', 'Australia', 'June 12, 2017', 'Some excellent insights on the history of HBS, but too many long diatribes on the shortcomings. HBS and McKinsey are blamed for most of the world''s economic ills. They have some responsibility, but not as much as the book says, in my view.', 4, 'amazon', 'approved'),

('the-golden-passport', 'Dingbat McDougal', 'very good book: why Harvard Business School promotes Greed is Good', 'the United Kingdom', 'January 21, 2019', 'how old style "caring" corporate capitalism got overtaken by individual greed', 5, 'amazon', 'approved'),

-- ============================================================
-- TICKLED (8 reviews)
-- ============================================================
('tickled', 'alexandra klausner', 'Magic read', 'the United States', 'March 5, 2025', 'This book reminds us all to find the beauty in the now! It''s not just a love letter to family and all the little things, it''s a reminder of one big thing: we''re going to be ok - if we all decide to be. Magic is real. Beautiful words.', 5, 'amazon', 'approved'),

('tickled', 'S. Bhatnagar', 'Igniting the Spark of Life', 'the United States', 'May 21, 2023', 'The author''s profound understanding of human nature and his genuine desire to uplift and inspire shines through every page. He reminds us that life is an extraordinary gift filled with infinite possibilities. It serves as a gentle yet powerful reminder to live each moment to the fullest, embracing the beauty that surrounds us and unlocking our true potential.', 5, 'amazon', 'approved'),

('tickled', 'Lee', 'A timely and courageous work', 'the United States', 'October 22, 2021', 'Part spiritual manifesto, part personal memoir, Tickled is unlike any book I have every read. And it found its way to my core. Hats off to Duff McDonald for condensing these concepts of ultimate importance into an easily digestible and enjoyable package, and for having the courage to tell his story with such refreshing candor.', 5, 'amazon', 'approved'),

('tickled', 'Betty McKeon', 'Eat, Pray, Love for Men!', 'the United States', 'November 20, 2021', 'I found this book drew me in immediately with easy reading. I think this is a male version of Eat, Pray, Love for men but much more! It gave to me insight into how men think and process things. Mr. McDonald expresses an honesty I find lacking in most books. The ending of the book is so uplifting! I truly enjoyed this book!', 5, 'amazon', 'approved'),

('tickled', 'Russell S', 'Hard to read', 'the United States', 'March 6, 2023', 'The authors writing style is obnoxious. Could not get through the first chapter', 1, 'amazon', 'approved'),

('tickled', 'Luke', 'What I''ve Been Missing', 'the United States', 'January 7, 2022', 'Tickled is a book unlike any I''ve read before. What I found most compelling was how McDonald presented a new perspective without asserting that it was the only one to live by. It got to be so frequent that we decided to take turns reading the book out loud to one another, like in a high school English class. Do yourself a favor and discover what tickles you. You might be surprised where it takes you!', 5, 'amazon', 'approved'),

('tickled', 'Shea', 'Not ur typical memoir.', 'the United States', 'June 6, 2024', 'Tickled is part memoir, part confessional, part self help, part philosophy, all Duff. It''s a message that sticks with you and you find yourself not just wanting to be tickled but changed.', 5, 'amazon', 'approved'),

('tickled', 'Dan Tomasulo, PhD, MFA, MAPP', 'Tickled is one of those books that I didn''t want to end.', 'the United States', 'August 25, 2023', 'Tickled is one of those books that I didn''t want to end. I found myself reading slower as I was turning the pages and coming up on the last chapters. This is a book about an authentic awakening by a NYT bestselling writer. Go with Duff McDonald on his journey - you''ll be tickled you did.', 5, 'amazon', 'approved'),

-- ============================================================
-- THE CEO (5 reviews — all 5 of its global ratings)
-- ============================================================
('the-ceo', 'Jason Davis', 'A fine book in paper', 'the United States', 'May 6, 2013', 'But not made for the kindle. Do not waste you money. The paper version is a nicely written choose your own adventure book.', 1, 'amazon', 'approved'),

('the-ceo', 'C&E', 'Fun! Yet, intelligent', 'the United States', 'July 9, 2005', 'I miss my choose your adventures from days of old - now I can experience it again as an adult and feel somewhat intelligent at the same time. Sorry bud - it is a funny book!', 4, 'amazon', 'approved'),

('the-ceo', 'J.H. Glove', 'Original, Funny and Awesome!!!', 'the United States', 'April 24, 2005', 'CEO is an awesome read! It''s fun, never boring and sooooo creative. Owen Burke is an amazing comedian and now he''s proven himself to be an outstanding author. I was extremely pleased with this book and I would highly recommend it to anyone who enjoys laughing and appreciates creativity.', 5, 'amazon', 'approved'),

('the-ceo', 'caleeg', 'Why is this guy everywhere?', 'the United States', 'March 24, 2005', 'I get the connection. The same unfunny guy from that VH1 90s show has now written a completely unfunny book. The untalented continue to fall up. I got passed an advanced copy of this shlock. Don''t bother.', 1, 'amazon', 'approved'),

('the-ceo', 'Laura', 'Entertaining way to illustrate the implications of actions', 'the United States', 'May 11, 2005', 'This book made an otherwise boring and long flight fun. The humor is witty. Not only is it entertaining but it gives you a perspective on some of the pressures and tough decisions that executives may have to face. Also, it illustrates the consequences of the decisions after you make them.', 4, 'amazon', 'approved'),

-- ============================================================
-- FRICTIONLESS (6 reviews)
-- ============================================================
('frictionless', 'Usha', 'A breath of fresh air', 'the United States', 'August 5, 2020', 'If I had read this book coming out of college I would have become an entrepreneur. Through story after story of innovative people who discovered a way to make life run more smoothly and joyfully in these challenging but exhilarating times, Frictionless shows that necessity is again the mother of invention.', 5, 'amazon', 'approved'),

('frictionless', 'Betty McKeon', 'A must read for business people', 'the United States', 'August 27, 2020', 'This book is an easy read! It kept me engaged. As business woman, I think it should be a must read in all business courses. Bravo and great advice!', 5, 'amazon', 'approved'),

('frictionless', 'Tom Ryan', 'Great business/strategy book but also a ~250 page advertisement for the author''s new company', 'the United States', 'August 23, 2020', 'The book is really interesting and well written once you get past the self-serving advertisement for the author''s new company, The Inside, mentioned throughout. Christiane totally oversold her company''s capabilities and service model, but did manage to write a really compelling business/strategy book.', 4, 'amazon', 'approved'),

('frictionless', 'Amish Gandhi', 'Super Informative and Frictionless Read', 'the United States', 'June 29, 2020', 'I listened to this as an audiobook. I like that there are perspectives from many constituents: operators, investors, consumers. The best part for me is that there are so many real stories from several current and relevant successful companies including Bonobos, Farmer''s Dog, Minted, Capsule, Stash, Hims, etc. This is a super informative and frictionless read which I highly recommend!', 5, 'amazon', 'approved'),

('frictionless', 'Michael Rigsby', 'What would cody do', 'the United States', 'October 23, 2020', 'Live frictionlessly', 5, 'amazon', 'approved'),

('frictionless', 'Bryan', 'Cody Ko saved my life', 'the United States', 'January 2, 2021', 'Having this book made me realize how much friction was in my life. Not anymore. Thanks Cody Ko', 5, 'amazon', 'approved');

commit;

-- Verify counts per book (should be 10, 10, 11, 8, 5, 6 = 50 total):
-- select book_slug, count(*) from book_reviews where source = 'amazon' group by book_slug order by book_slug;
