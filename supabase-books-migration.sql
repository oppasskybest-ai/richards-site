-- ============================================================
-- BOOKS MIGRATION — Item 2 (updated with correct quotes from original site)
-- Run this in the Supabase SQL editor.
-- Safe to run on your live DB — additive only.
-- The books table already exists. This adds the quotes column
-- and seeds the 5 books. ON CONFLICT means it won't duplicate.
-- ============================================================

-- 1. Add quotes column (jsonb array of {quote, attribution} objects)
alter table books add column if not exists quotes jsonb default '[]'::jsonb;

-- 2. Seed the 5 books (with correct quotes from original theduffproject.com)
insert into books (slug, title, year, subtitle, description, cover_image, buy_url, order_index, quotes)
values
  (
    'tickled',
    'Tickled',
    '2022',
    'A Commonsense Guide to the Present Moment',
    'Tickled is Duff McDonald''s most personal book — a meditation on presence, sobriety, and the strange joy of being alive. Written with the same wit and clarity he brings to business journalism, Tickled is a guide to finding the present moment and staying in it. It is about drinking and not drinking, about love and loss, about music and the ineffable. It is, as the subtitle says, a commonsense guide to the present moment.',
    '/assets/images/books/tickled.jpg',
    'https://www.amazon.com/Tickled-Commonsense-Guide-Present-Moment/dp/0063036894',
    1,
    '[
      {"quote": "Goddamn! This book is so fu*king smart & wise & good. It''s brilliant & profound, yet somehow utterly relatable. Almost every sentence blew my mind. It actually changed the way I look at the world.", "attribution": "Kristen Johnston, Emmy Award-winning actress and author of Guts"},
      {"quote": "Duff does something astonishing here—he relinquishes the body armor that made him so successful as a business journalist and writes from the heart. It is brave and true.", "attribution": "Hugo Lindgren, former editor of The New York Times Magazine"},
      {"quote": "An honest and heartfelt expression of one man''s search inside himself. I appreciate Duff''s difficult but joyous discovery of the sweet inner peace that comes from being fully present in the here and now.", "attribution": "Chade-Meng Tan, bestselling author of Search Inside Yourself"},
      {"quote": "Reading Tickled was a revelation for me; It helped me understand what I''ve been doing all along: I''ve been tickling myself in a way that happens to tickle others.", "attribution": "Chris Wink, Co-Founder of Blue Man Group"}
    ]'::jsonb
  ),
  (
    'the-golden-passport',
    'The Golden Passport',
    '2017',
    'Harvard Business School, the Limits of Capitalism, and the Moral Failure of the MBA Elite',
    'A richly reported, sweeping history of Harvard Business School that is also a searing indictment of its role in creating the winner-take-all capitalism that now defines America. McDonald chronicles the school''s rise from a modest vocational program in 1908 to the most powerful educational institution in the world — and asks whether that power has been used wisely.',
    '/assets/images/books/the-golden-passport.jpg',
    'https://www.amazon.com/Golden-Passport-Harvard-Business-Capitalism/dp/0062347179/ref=as_li_ss_tl?SubscriptionId=AKIAIOCEBIGP6NUBL47A&linkCode=sl1&tag=dufmcd-20&linkId=84239fe72c1adfdb7562c837b7eab3c1&language=en_US',
    2,
    '[
      {"quote": "[A] richly reported indictment of the school as a leading reason that corporate America is disdained by much of the country....in example after example, Mr. McDonald sets out his thesis that money and influence have distorted both the school''s curriculum and the worldview espoused by its professors.", "attribution": "Andrew Ross Sorkin, The New York Times"},
      {"quote": "This is serious history, broad in its sweep and meticulous in the detail.", "attribution": "Wall Street Journal"},
      {"quote": "Refreshingly substitutes skepticism for reverence, questioning the limits of business education and of capitalism in general.", "attribution": "Publishers Weekly"},
      {"quote": "A massively detailed history of Harvard Business School since its founding in 1908 and a searing critique of the school''s impact on American capitalism. McDonald''s deep research into the 100-plus years of HBS is undoubtedly impressive.", "attribution": "Kirkus Reviews"},
      {"quote": "In McDonald''s hands this history of the Harvard Business School, its successes and failures, misdeeds and misapprehensions, becomes a window into the increasingly corrupted soul of mercantile America.", "attribution": "The Globe and Mail"}
    ]'::jsonb
  ),
  (
    'the-firm',
    'The Firm',
    '2013',
    'The Story of McKinsey and Its Secret Influence on American Business',
    'The definitive history of McKinsey & Company — the most influential private company in the world. McDonald traces McKinsey''s rise from a small Chicago accounting firm to a global powerhouse that has shaped the strategy of virtually every major corporation and government on earth, for better and, as McDonald makes clear, often for worse.',
    '/assets/images/books/the-firm.jpg',
    'https://www.amazon.com/Firm-McKinsey-Influence-American-Business/dp/1439190984?SubscriptionId=AKIAIOCEBIGP6NUBL47A&camp=2025&creative=165953&creativeASIN=1439190984&linkCode=xm2&tag=dufmcd-20',
    3,
    '[
      {"quote": "McDonald has written the definitive history of McKinsey, and through McKinsey of the entire multibillion-dollar industry that is management consulting. It''s a heartbreaking tale of wasted talent.", "attribution": "Felix Salmon, finance blogger, Reuters"},
      {"quote": "Thought-provoking...a fascinating look behind the company''s success...[The Firm] chronicles McKinsey''s rise but also raises an important question about it that is applicable to the entire netherworld of consultants, advisers and other corporate hangers-on: ''Are they worth it or not?''", "attribution": "Andrew Ross Sorkin, The New York Times"},
      {"quote": "There have been other books about this American icon, but The Firm is an up-to-date, full-blown history, told with wit and clarity.", "attribution": "The Wall Street Journal"},
      {"quote": "Through an expert accretion of damning detail, McDonald builds a convincing case that, for better and (mostly) worse, McKinsey became the quintessential American business of the 20th century.", "attribution": "Bloomberg Businessweek"},
      {"quote": "A fascinating account of the rise of McKinsey. If you want to know what it is about the culture of the firm that sets it apart and has made it so successful, read this book.", "attribution": "Liaquat Ahamed, Pulitzer Prize-winning author of Lords of Finance"}
    ]'::jsonb
  ),
  (
    'last-man-standing',
    'Last Man Standing',
    '2009',
    'The Ascent of Jamie Dimon and JPMorgan Chase',
    'The story of Jamie Dimon''s remarkable ascent to become the most powerful banker in America. McDonald traces Dimon''s path from his years as right-hand man to Sandy Weill at Citigroup — where he was unceremoniously fired — through his triumphant comeback as CEO of JPMorgan Chase, the bank that emerged from the 2008 financial crisis stronger than any other.',
    '/assets/images/books/last-man-standing.jpg',
    'https://www.amazon.com/Last-Man-Standing-Ascent-JPMorgan-dp-1416599541/dp/1416599541/ref=as_li_ss_tl?_encoding=UTF8&me=&qid=1590094711&linkCode=sl1&tag=dufmcd-20&linkId=8b8178c654f4044da4f1e8a69df253fd&language=en_US',
    4,
    '[
      {"quote": "An intimate...three-dimensional portrait of the executive.", "attribution": "Mara Der Hovanesian, BusinessWeek"},
      {"quote": "[A] nicely crafted debut recounting JPMorgan Chase CEO Jamie Dimon''s climb to the pinnacle of American finance.", "attribution": "Kirkus Reviews"},
      {"quote": "Unlike so many business biographies whose authors labor to identify absorbing events and motives in the years leading up to the subject''s blossoming as a chief executive, Last Man Standing offers a genuinely memorable depiction of Dimon''s decade and a half as second banana to the merger-and-acquisition artist Weill.", "attribution": "The New York Times"}
    ]'::jsonb
  ),
  (
    'the-ceo',
    'The CEO',
    '2012',
    'An Interactive Book',
    'Co-written with Owen Burke, The CEO is an interactive choose-your-own-adventure novel set in the world of corporate America. What would you do if you discovered a rogue employee cooking the books? If your mistress threatened to expose your affair? If you found yourself at the center of an insider-trading scandal? Step up to the plate. What would you do if you were The CEO?',
    '/assets/images/books/the-ceo.jpg',
    'https://www.amazon.com/CEO-Interactive-Book-Owen-Burke/dp/1416900446/ref=as_li_ss_tl?dchild=1&keywords=the+ceo+duff+mcdonald&qid=1590094749&s=books&sr=1-4&linkCode=sl1&tag=dufmcd-20&linkId=22c23dceec55ea84b9e2baf3ed9456b4&language=en_US',
    5,
    '[
      {"quote": "it is the best book i have written, because it is about infinite choice and infinite possibility.", "attribution": "Duff McDonald"}
    ]'::jsonb
  )
on conflict (slug) do update set
  quotes = excluded.quotes,
  description = excluded.description;

-- ============================================================
-- PATCH 2 — Add Frictionless book + fix all Tickled/LMS quotes
-- Run AFTER the original migration above.
-- ============================================================

-- Upsert Frictionless (new book)
insert into books (slug, title, year, subtitle, description, cover_image, buy_url, order_index, quotes)
values (
  'frictionless',
  'Frictionless',
  '2020',
  'Why the Future of Everything Will Be Fast, Fluid, & Made Just for You',
  'Co-written with Christiane Lemieux. Frictionless examines how the future of commerce, design, and everyday life is being shaped by the removal of friction between people and the things they want.',
  '/assets/images/books/frictionless.jpg',
  'https://www.amazon.co.uk/Frictionless-Future-Everything-Will-Fluid/dp/006289367X',
  5,
  '[{"quote": "Christiane has gathered opinions from some of the best thinkers, from whom we all could learn a lesson or two on dissolving the barriers between people and their passions.", "attribution": "Christy Turlington Burns, Founder of Every Mother Counts"}]'::jsonb
)
on conflict (slug) do update set
  quotes = excluded.quotes,
  description = excluded.description,
  order_index = excluded.order_index;

-- Fix order_index for the-ceo (push it after frictionless)
update books set order_index = 6 where slug = 'the-ceo';

-- Fix Tickled quotes (full versions from original site)
update books set quotes = '[
  {"quote": "Goddamn! This book is so fu*king smart & wise & good. It''s brilliant & profound, yet somehow utterly relatable. Almost every sentence blew my mind. It actually changed the way I look at the world.", "attribution": "Kristen Johnston, Emmy Award-winning actress and author of Guts: The Endless Follies and Tiny Triumphs of a Giant Disaster"},
  {"quote": "Given the choice, we''d presumably all do what we want all day every day forever. The problem is figuring out what that that is. Duff McDonald, one of the most acute chroniclers of this confusing time, has, in these pages, for the greater good, ditched habits that trap him in the slog, freeing himself to pursue, pursue, pursue, composing perhaps the most American book ever — what''s more American than a pursuit of happiness? — in the process. Tickled is a new kind of a travel diary, a cultural exploration into the preconceptions and inherited beliefs that prevent us from reaching our potential and being free. A lot of us think we know exactly who and where we are. Duff McDonald is still on the road, heading for another joint.", "attribution": "Rich Cohen, author of The Fish That Ate The Whale and Pee Wees"},
  {"quote": "With heart-centered honesty and an unflinching eye for the truth of his own failings, Duff takes us on his journey from skeptical cynic to loving adult. Driven by a fierce love and appreciation for his daughter, the wizardly M., Duff shares the story of being forced by the pandemic to stand still long enough to see his real work. Tickled may not have been the book he set out to write, but it''s definitely the book we''re meant to read.", "attribution": "Jerry Colonna, author, Reboot: Leadership and the Art of Growing Up"},
  {"quote": "Duff does something astonishing here—he relinquishes the body armor that made him so successful as a business journalist and writes from the heart. It is brave and true.", "attribution": "Hugo Lindgren, former editor of The New York Times Magazine"},
  {"quote": "An honest and heartfelt expression of one man''s search inside himself. I appreciate Duff''s difficult but joyous discovery of the sweet inner peace that comes from being fully present in the here and now.", "attribution": "Chade-Meng Tan, bestselling author of Search Inside Yourself and Joy on Demand"},
  {"quote": "Reading Tickled was a revelation for me; It helped me understand what I''ve been doing all along: I''ve been tickling myself in a way that happens to tickle others. This is a very serious book about how to live our lives much less seriously.", "attribution": "Chris Wink, Co-Founder of Blue Man Group and creator of Wink World"}
]'::jsonb where slug = 'tickled';

-- Fix Last Man Standing — add Fortune quote + full NYT quote
update books set quotes = '[
  {"quote": "An intimate...three-dimensional portrait of the executive.", "attribution": "Mara Der Hovanesian, BusinessWeek"},
  {"quote": "[A] nicely crafted debut recounting JPMorgan Chase CEO Jamie Dimon''s climb to the pinnacle of American finance.", "attribution": "Kirkus Reviews"},
  {"quote": "The 53-year-old CEO of JPMorgan Chase gets a thorough biographical treatment...in the new book Last Man Standing: The Ascent of Jamie Dimon and JPMorgan Chase.", "attribution": "Fortune"},
  {"quote": "Unlike so many business biographies whose authors labor to identify absorbing events and motives in the years leading up to the subject''s blossoming as a chief executive, Last Man Standing offers a genuinely memorable depiction of Dimon''s decade and a half as second banana to the merger-and-acquisition artist Weill. In the late-1980s and ''90s, Weill and Dimon, a Harvard MBA boy genius, struck a series of deals that culminated in 1998 in the formation of Citigroup, a financial services behemoth of unprecedented heft and breadth.", "attribution": "The New York Times"}
]'::jsonb where slug = 'last-man-standing';
