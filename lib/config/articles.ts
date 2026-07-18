import { CardItem, JournalismCategory } from '@/types/journalism'

export interface ArticleData extends CardItem {
  category: JournalismCategory
  featured?: boolean
}

// Fallback/seed list, used only if the `articles` table in Supabase is empty
// or unreachable. Real posts should live in Supabase (seeded via
// supabase-articles-migration.sql, then edited from /admin/articles) so the
// full text, comments, and admin editing all work end-to-end.
//
// The excerpts below are taken from Randy's own blog (they're his own
// content, not third-party material) — pulled from a screenshot of the live
// site on 2026-07-17. Full post bodies still need to be pulled from the
// site/HTML backup and entered as native articles for each of these to be
// readable in full — see PROGRESS.md.

const IMG = (f: string) => `/assets/images/articles/${f}`

export const SEED_ARTICLES: ArticleData[] = [
  {
    id: 'we-had-hoped-that',
    category: 'bible-culture',
    title: 'We had hoped that…',
    publication: 'randolphrichards.com',
    slug: 'we-had-hoped-that',
    url: '',
    date: '2025-04-19',
    image: IMG('placeholder.jpg'),
    excerpt: 'The pastor-scholar Dr. Bernie Cueto had posted this Easter message: The disciples on the road to Emmaus had hoped that Jesus would improve their situation: "we had hoped that he was the one who was going to redeem Israel" (Lk 24:21). They had hoped to be delivered from Roman oppression, that Jesus would free them…',
    featured: true,
    content_type: 'native',
  },
  {
    id: 'the-reckless-love-of-god',
    category: 'bible-culture',
    title: 'The Reckless Love of God?',
    publication: 'randolphrichards.com',
    slug: 'the-reckless-love-of-god',
    url: '',
    date: '2024-12-17',
    image: IMG('placeholder.jpg'),
    excerpt: "Reckless Love First, let me say I love Cory Asbury's title song on his debut album. Cory sings about the overwhelming, never-ending, love of God. How God's love chases us down and finds us…",
    featured: true,
    content_type: 'native',
  },
  {
    id: 'dewesternizing-christmas-post-3',
    category: 'bible-culture',
    title: 'DeWesternizing the Christmas Story – Post 3: The Main vs. the Minor Characters',
    publication: 'randolphrichards.com',
    slug: 'dewesternizing-christmas-post-3',
    url: '',
    date: '2023-12-25',
    image: IMG('placeholder.jpg'),
    excerpt: 'Who we think are the major players may not be whom God wanted highlighted. The Christmas story was an event of cosmic proportions, played out in the most unassuming of settings…',
    featured: false,
    content_type: 'native',
  },
  {
    id: 'dewesternizing-christmas-post-2',
    category: 'bible-culture',
    title: 'DeWesternizing the Christmas Story – Post 2: The Church Christmas Play versus God\u2019s Cosmic Drama',
    publication: 'randolphrichards.com',
    slug: 'dewesternizing-christmas-post-2',
    url: '',
    date: '2023-12-23',
    image: IMG('placeholder.jpg'),
    excerpt: "The little church where I grew up had an annual Christmas Play but couldn't afford to have multiple set designs. In fact, keeping it simple was the theme…",
    featured: false,
    content_type: 'native',
  },
  {
    id: 'dewesternizing-christmas-post-1',
    category: 'bible-culture',
    title: 'DeWesternizing the Christmas Story – Post 1',
    publication: 'randolphrichards.com',
    slug: 'dewesternizing-christmas-post-1',
    url: '',
    date: '2023-12-22',
    image: IMG('placeholder.jpg'),
    excerpt: "Our modern understanding of the Christmas Story is a mix of the biblical stories told by Matthew and Luke, plus centuries of adding on traditions. We then fill in any gaps with modern, Western, individualist assumptions…",
    featured: false,
    content_type: 'native',
  },
  {
    id: 'praying-them-in-rather-than-out',
    category: 'family-faith',
    title: 'Praying them in rather than out',
    publication: 'randolphrichards.com',
    slug: 'praying-them-in-rather-than-out',
    url: '',
    date: '2022-06-18',
    image: IMG('placeholder.jpg'),
    excerpt: 'When our two boys were very little, a mentor commented that fathers often pray when an adult child has made bad decisions or is in an unhealthy relationship. We should certainly pray then, but he commented, "How much wiser is it to pray earlier, for a young father to pray that the child will grow…"',
    featured: true,
    content_type: 'native',
  },
  {
    id: 'my-yoke-is-easy',
    category: 'bible-culture',
    title: 'My yoke is easy …',
    publication: 'randolphrichards.com',
    slug: 'my-yoke-is-easy',
    url: '',
    date: '2020-09-22',
    image: IMG('placeholder.jpg'),
    excerpt: 'Jesus noted in Matthew 11: 28 "Come to me, all you who are weary and burdened, and I will give you rest. 29 Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. 30 For my yoke is easy and my burden is light." It is commonly…',
    featured: false,
    content_type: 'native',
  },
  {
    id: 'mary-and-martha',
    category: 'bible-culture',
    title: 'Mary and Martha (Lk 10:38-42)',
    publication: 'randolphrichards.com',
    slug: 'mary-and-martha',
    url: '',
    date: '2017-10-13',
    image: IMG('placeholder.jpg'),
    excerpt: 'We all have heard sermons that Martha should have stopped cooking and sat down with Mary at the feet of Jesus. "Turn off the oven and sit down, Martha!" Not exactly. Someone needs to cook…',
    featured: false,
    content_type: 'native',
  },
  {
    id: 'crown-of-righteousness',
    category: 'bible-culture',
    title: 'Crown of Righteousness',
    publication: 'randolphrichards.com',
    slug: 'crown-of-righteousness',
    url: '',
    date: '2017-06-10',
    image: IMG('placeholder.jpg'),
    excerpt: 'In my previous post, I quoted Paul\u2019s verse from 2 Timothy: Now there is in store for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that day (2 Tim. 4:8). When we hear "crown," we often have a mental image of the crown of a king…',
    featured: false,
    content_type: 'native',
  },
  {
    id: 'lost-her-battle-with-cancer',
    category: 'family-faith',
    title: 'Lost her Battle with Cancer',
    publication: 'randolphrichards.com',
    slug: 'lost-her-battle-with-cancer',
    url: '',
    date: '2017-06-06',
    image: IMG('placeholder.jpg'),
    excerpt: '"Aunt Betty lost her battle with cancer." We often hear a phrase like this, commonly murmured respectfully in church. It meant this wonderful Christian woman, my wife\u2019s Aunt Betty, died. I hate this expression…',
    featured: false,
    content_type: 'native',
  },
]
