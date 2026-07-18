-- ============================================================
-- SEEDS 10 REAL ARTICLES FROM RANDY'S EXISTING BLOG
-- Run AFTER supabase-schema.sql and supabase-articles-migration.sql.
--
-- IMPORTANT: content_html below is only the short teaser excerpt visible in
-- the site screenshot we captured on 2026-07-17 (WordPress cuts posts off at
-- "Read more here"). The FULL body text of each post still needs to be
-- pulled from the richards-backup HTML clone (or copy/pasted by Randy) and
-- pasted into the admin Articles editor before these go live — see
-- PROGRESS.md, "Content still needed" section.
-- ============================================================

insert into articles (title, slug, publication, category, url, date, excerpt, image, featured, status, content_type, content_html)
values
('We had hoped that…', 'we-had-hoped-that', 'randolphrichards.com', 'bible-culture', '', '2025-04-19',
 'The pastor-scholar Dr. Bernie Cueto had posted this Easter message: The disciples on the road to Emmaus had hoped that Jesus would improve their situation…',
 '', true, 'published', 'native',
 '<p>The pastor-scholar Dr. Bernie Cueto had posted this Easter message: The disciples on the road to Emmaus had hoped that Jesus would improve their situation: "we had hoped that he was the one who was going to redeem Israel" (Lk 24:21). They had hoped to be delivered from Roman oppression, that Jesus would free them…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('The Reckless Love of God?', 'the-reckless-love-of-god', 'randolphrichards.com', 'bible-culture', '', '2024-12-17',
 'Reckless Love — First, let me say I love Cory Asbury''s title song on his debut album…',
 '', true, 'published', 'native',
 '<p>Reckless Love — First, let me say I love Cory Asbury''s title song on his debut album. Cory sings about the overwhelming, never-ending, love of God. How God''s love chases us down and finds us…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('DeWesternizing the Christmas Story – Post 3: The Main vs. the Minor Characters', 'dewesternizing-christmas-post-3', 'randolphrichards.com', 'bible-culture', '', '2023-12-25',
 'Who we think are the major players may not be whom God wanted highlighted…',
 '', false, 'published', 'native',
 '<p>Who we think are the major players may not be whom God wanted highlighted. The Christmas story was an event of cosmic proportions, played out in the most unassuming of settings. Did God not know that a birth in Rome, or at least in the palace in Jerusalem, would have been more suitable for the…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('DeWesternizing the Christmas Story – Post 2: The Church Christmas Play versus God''s Cosmic Drama', 'dewesternizing-christmas-post-2', 'randolphrichards.com', 'bible-culture', '', '2023-12-23',
 'The little church where I grew up had an annual Christmas Play but couldn''t afford to have multiple set designs…',
 '', false, 'published', 'native',
 '<p>The little church where I grew up had an annual Christmas Play but couldn''t afford to have multiple set designs. In fact, keeping it simple was the theme. Our one little manger scene at the front of that small church was packed with Mary and Jesus, surrounded by Joseph, three Kings, some shepherds, a cow…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('DeWesternizing the Christmas Story – Post 1', 'dewesternizing-christmas-post-1', 'randolphrichards.com', 'bible-culture', '', '2023-12-22',
 'Our modern understanding of the Christmas Story is a mix of the biblical stories told by Matthew and Luke, plus centuries of adding on traditions…',
 '', false, 'published', 'native',
 '<p>Our modern understanding of the Christmas Story is a mix of the biblical stories told by Matthew and Luke, plus centuries of adding on traditions. We then fill in any gaps with modern, Western, individualist assumptions. Let''s ponder a few with three postings this week…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('Praying them in rather than out', 'praying-them-in-rather-than-out', 'randolphrichards.com', 'family-faith', '', '2022-06-18',
 'When our two boys were very little, a mentor commented that fathers often pray when an adult child has made bad decisions…',
 '', true, 'published', 'native',
 '<p>When our two boys were very little, a mentor commented that fathers often pray when an adult child has made bad decisions or is in an unhealthy relationship. We should certainly pray then, but he commented, "How much wiser is it to pray earlier, for a young father to pray that the child will grow…"</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('My yoke is easy …', 'my-yoke-is-easy', 'randolphrichards.com', 'bible-culture', '', '2020-09-22',
 'Jesus noted in Matthew 11:28-30, "Come to me, all you who are weary and burdened, and I will give you rest…"',
 '', false, 'published', 'native',
 '<p>Jesus noted in Matthew 11: 28 "Come to me, all you who are weary and burdened, and I will give you rest. 29 Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. 30 For my yoke is easy and my burden is light." It is commonly…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('Mary and Martha (Lk 10:38-42)', 'mary-and-martha', 'randolphrichards.com', 'bible-culture', '', '2017-10-13',
 'We all have heard sermons that Martha should have stopped cooking and sat down with Mary at the feet of Jesus…',
 '', false, 'published', 'native',
 '<p>We all have heard sermons that Martha should have stopped cooking and sat down with Mary at the feet of Jesus. "Turn off the oven and sit down, Martha!" Not exactly. Someone needs to cook. When Jesus was finished talking, everyone expected to eat. So, why was Mary correct and Martha wrong? We need to…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('Crown of Righteousness', 'crown-of-righteousness', 'randolphrichards.com', 'bible-culture', '', '2017-06-10',
 'In my previous post, I quoted Paul''s verse from 2 Timothy: Now there is in store for me the crown of righteousness…',
 '', false, 'published', 'native',
 '<p>In my previous post, I quoted Paul''s verse from 2 Timothy: Now there is in store for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that day (2 Tim. 4:8). When we hear "crown," we often have a mental image of the crown of a king or…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>'),

('Lost her Battle with Cancer', 'lost-her-battle-with-cancer', 'randolphrichards.com', 'family-faith', '', '2017-06-06',
 '"Aunt Betty lost her battle with cancer." We often hear a phrase like this, commonly murmured respectfully in church…',
 '', false, 'published', 'native',
 '<p>"Aunt Betty lost her battle with cancer." We often hear a phrase like this, commonly murmured respectfully in church. It meant this wonderful Christian woman, my wife''s Aunt Betty, died. I hate this expression. It suggests that we win the battle with cancer when we live (through some treatment) or the cancer is in remission…</p><p><em>[Full post text to be added — see PROGRESS.md]</em></p>')
on conflict (slug) do nothing;
