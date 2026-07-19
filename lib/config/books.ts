import { BookData } from '@/types/books'

// Real book descriptions, taken word-for-word from each book's own Amazon
// listing (Randy's real Author Central page + individual product pages,
// screenshotted and sent 2026-07-19). Real Kindle buy links included where
// he sent one. Cover art: 9 books got real high-res covers
// (public/assets/images/books/*-hires.jpg); the rest still use covers
// matched from the original site scrape or a "cover pending" placeholder
// -- see PROGRESS.md for which is which.
//
// ATTRIBUTION: `role` distinguishes books he actually wrote ('author',
// the default) from a book he only wrote the foreword for ('foreword') and
// a foreign-language edition of his own book ('translation'). This matters
// -- crediting him as "author" of a book he only wrote a foreword for
// would misrepresent his work. Both edge cases are flagged below and
// should render with a visibly different badge/byline on the book card
// and detail page, not just different text.
//
// SECTIONS: `workingOn: true` books render in the "Books I'm Working On"
// section of the Books page; everything else renders in "All Books" --
// matching the two-part structure the real site had
// (/books/ vs /books-im-working-on/).

export const BOOKS: BookData[] = [
  {
    slug: 'misreading-scripture-with-western-eyes',
    title: 'Misreading Scripture with Western Eyes',
    year: '2012',
    subtitle: 'Removing Cultural Blinders to Better Understand the Bible',
    description: `What was clear to the original readers of Scripture is not always clear to us. Because of the cultural distance between the biblical world and our contemporary setting, we often bring modern Western biases to the text. For example: when Western readers hear Paul exhorting women to "dress modestly," we automatically think in terms of sexual modesty -- but most women in that culture would never wear racy clothing; the context suggests Paul is likely more concerned about economic modesty, that Christian women not flaunt their wealth through expensive clothes, braided hair, and gold jewelry. As Westerners, we tend to give much attention to avoiding vices and not much to developing virtues -- we tend to think virtuous acts are spontaneous, but what went without saying in Paul's day was that it is not enough to remove vices; you must acquire virtues to replace them, just like changing clothes (Col. 3:12). Western individualism leads us to assume that Mary and Joseph traveled alone to Bethlehem -- what went without saying was that they were likely accompanied by a large entourage of extended family. Biblical scholars Brandon O'Brien and Randy Richards shed light on the ways that Western readers often misunderstand the cultural dynamics of the Bible. They identify nine key areas where modern Westerners have significantly different assumptions about what might be going on in a text. Drawing on their own cross-cultural experience in global mission, O'Brien and Richards show how better self-awareness and understanding of cultural differences in language, time, and social mores allow us to see the Bible in fresh and unexpected ways. Over 150,000 copies sold worldwide.`,
    coverImage: '/assets/images/books/misreading-scripture-with-western-eyes-hires.jpg',
    buyUrl: 'https://www.amazon.com/Misreading-Scripture-Western-Eyes-Understand-ebook/dp/B00BL3JXYE',
    role: 'author',
    quotes: [],
  },
  {
    slug: 'misreading-scripture-with-individualist-eyes',
    title: 'Misreading Scripture with Individualist Eyes',
    year: '2020',
    subtitle: 'Patronage, Honor, and Shame in the Biblical World',
    description: `The Bible was written within collectivist cultures. When Westerners, immersed in individualism, read the Bible, it's easy to misinterpret important elements -- or miss them altogether. In any culture, the most important things usually go without being said. So to read Scripture well we benefit when we uncover the unspoken social structures and values of its world. We need to recalibrate our vision. Combining the expertise of a biblical scholar and a missionary practitioner, Misreading Scripture with Individualist Eyes is an essential guidebook to the cultural background of the Bible and how it should inform our reading. E. Randolph Richards and Richard James explore deep social structures of the ancient Mediterranean -- kinship, patronage, and brokerage -- along with their key social tools -- honor, shame, and boundaries -- that the biblical authors lived in and lie below the surface of each text. From Abraham, Sarah, and Hagar to Peter's instructions to elders, the authors strip away individualist assumptions and bring the world of the biblical writers to life. Expanding on the popular Misreading Scripture with Western Eyes, this book makes clear how understanding collectivism will help us better understand the Bible, which in turn will help us live more faithfully in an increasingly globalized world.`,
    coverImage: '/assets/images/books/misreading-scripture-with-individualist-eyes-hires.jpg',
    buyUrl: 'https://www.amazon.com/Misreading-Scripture-Individualist-Eyes-Patronage-ebook/dp/B085FQG1D3',
    role: 'author',
    quotes: [],
  },
  {
    slug: 'rediscovering-jesus',
    title: 'Rediscovering Jesus',
    year: '2015',
    subtitle: 'An Introduction to Biblical, Religious and Cultural Perspectives on Christ',
    description: `Who is your Jesus? Matthew's teacher? John's Word made flesh? Hebrews' great high priest? What if it turned out that your Jesus is a composite of your favorite selections from the New Testament buffet, garnished with some Hollywood and Americana? Rediscovering Jesus takes us on a gallery tour of biblical portraits of Jesus, from Matthew through Revelation. Our expert guides point out the background and highlights of each New Testament image of Jesus. Then we hit the streets to visit other houses of worship and their scriptures, examining the Jesus of the Book of Mormon and the Qur'an. Popping into a bookstore, we browse the latest on the Gnostic and the historical Jesus. Then we're off on a walking tour of Jesus in America, followed by a film festival of Jesus movies. All along the way our tour guides describe and interpret, but also raise questions: How is this Jesus different from other portraits? If this were our only portrait of Jesus, what would our faith be like? Rediscovering Jesus is an enjoyable, informative and challenging look at how we encounter Jesus in Scripture and our culture. With ample sidebars exploring contexts and the "so what?" questions, it takes us beyond other surveys by probing how our understanding of Jesus can make a difference for faith and life. From the authors of Rediscovering Paul, this is a textbook introduction to Jesus that guides us in our pilgrimage toward seeing Jesus truly. Readers' Choice Awards Honorable Mention. One of Nijay Gupta's Best Academic New Testament Books.`,
    coverImage: '/assets/images/books/rediscovering-jesus-hires.jpg',
    buyUrl: 'https://www.amazon.com/Rediscovering-Jesus-Introduction-Religious-Perspectives-ebook/dp/B013U7NNWG',
    role: 'author',
    authorsLine: 'with David B. Capes and Rodney Reeves',
    quotes: [],
  },
  {
    slug: 'paul-behaving-badly',
    title: 'Paul Behaving Badly',
    year: '2016',
    subtitle: 'Was the Apostle a Racist, Chauvinist Jerk?',
    description: `The apostle Paul was kind of a jerk. He was arrogant and stubborn. He called his opponents derogatory, racist names. He legitimized slavery and silenced women. He was a moralistic, homophobic killjoy who imposed his narrow religious views on others. Or was he? Randolph Richards and Brandon O'Brien explore the complicated persona and teachings of the apostle Paul. Unpacking his personal history and cultural context, they show how Paul both offended Roman perspectives and scandalized Jewish sensibilities. His vision of Christian faith was deeply disturbing to those in his day and remains so in ours. Paul behaved badly, but not just in the ways we might think. Take another look at Paul and see why this "worst of sinners" dares to say, "Follow my example, as I follow the example of Christ."`,
    coverImage: '/assets/images/books/paul-behaving-badly-hires.jpg',
    buyUrl: 'https://www.amazon.com/Paul-Behaving-Badly-Apostle-Chauvinist-ebook/dp/B01N3Y59WZ',
    role: 'author',
    authorsLine: 'with Brandon J. O\u2019Brien',
    quotes: [],
  },
  {
    slug: 'rediscovering-paul',
    title: 'Rediscovering Paul',
    year: '2017',
    subtitle: 'An Introduction to His World, Letters and Theology (2nd ed.)',
    description: `For some of us, the apostle Paul is intimidating, like a distant and difficult uncle. Maybe not someone you'd like to hang out with at a coffee shop on a rainy day. He'd make a scene, evangelize the barista, and arouse looks across the room. For amid-morning latte, we'd prefer Jesus over Paul. But Paul is actually the guy who -- from Ephesus to Athens -- was the talk of the marketplace, the raconteur of the Parthenon. He knew everyone, founded emerging churches, loved the difficult people, and held his own against the intellectuals of his day. If you're willing to give Paul a try, Rediscovering Paul is your reliable guide. This is a book that reacquaints us with Paul, as if for the first time. Drawing on the best of contemporary scholarship, and with language shaped by teaching and conversing with today's students, Rediscovering Paul is a textbook that has passed the test. Now in a reworked edition, it's better than ever. There are fresh discussions of Paul's letter writing and how those letters were received in the churches, new considerations of pseudonymity and the authenticity of Paul's letters, and updated coverage of recent developments in interpreting Paul. From Paul's conversion and call to his ongoing impact on church and culture, this second edition of Rediscovering Paul comes enthusiastically recommended.`,
    coverImage: '/assets/images/books/rediscovering-paul-hires.jpg',
    buyUrl: 'https://www.amazon.com/Rediscovering-Paul-Introduction-Letters-Theology-ebook/dp/B07CP835GQ',
    role: 'author',
    authorsLine: 'with David B. Capes and Rodney Reeves',
    quotes: [],
  },
  {
    slug: 'rediscovering-paul-1st-edition',
    title: 'Rediscovering Paul (1st edition)',
    year: '2007',
    subtitle: 'An Introduction to His World, Letters and Theology',
    description: `The original edition of Rediscovering Paul, co-authored with David B. Capes and Rodney Reeves, later revised and updated in 2017. No separate current Amazon listing -- superseded by the 2nd edition above.`,
    coverImage: '/assets/images/books/placeholder-rediscovering-paul-1st-ed.jpg',
    buyUrl: '',
    role: 'author',
    authorsLine: 'with David B. Capes and Rodney Reeves',
    quotes: [],
  },
  {
    slug: 'a-little-book-for-new-biblical-scholars',
    title: 'A Little Book for New Biblical Scholars',
    year: '2015',
    subtitle: 'Why and How to Study the Bible',
    description: `Many young Bible scholars are passionate for the Scriptures. But is passion enough? In A Little Book for New Bible Scholars, Randolph Richards and Joseph Dodson encourage young students of the Bible to add substance to their zeal -- the kind of substance that comes from the sweat and toil of hard study. "Just as we should avoid knowledge without love," they write, "we should also avoid love without knowledge." Aimed at beginners, this concise overview offers a wealth of good advice, warns of potential pitfalls, and includes wisdom from a variety of other biblical scholars as well as stories from the authors' own long experience in the guild. Full of warmth, humor, and an infectious love for Scripture, this book invites a new generation of young scholars to roll up their sleeves and dig into the complex, captivating world of the Bible.`,
    coverImage: '/assets/images/books/a-little-book-for-new-biblical-scholars-hires.jpg',
    buyUrl: 'https://www.amazon.com/Little-Book-Bible-Scholars-Books-ebook/dp/B0749R5GLB',
    role: 'author',
    authorsLine: 'with Joseph R. Dodson',
    quotes: [],
  },
  {
    slug: 'paul-and-first-century-letter-writing',
    title: 'Paul and First-Century Letter Writing',
    year: '2004',
    subtitle: 'Secretaries, Composition and Collection',
    description: `Traditional Christian art depicts Paul the letter writer, pen in hand, attentive to the Spirit. We might think we know better and imagine him pacing in agitation as he rapidly dictates his letter to the Galatians. But in reality neither of these pictures is accurate. In Paul's day, producing a letter was a time-consuming and costly business. And we have ample resources from the ancient world to piece together what it must have been like. A secretary was usually part of the picture. But so were notes, drafts, corrections and careful rewrites, not to speak of scratchy pens, sooty ink and coarse papyrus. Interestingly, there is evidence that Paul involved his missionary team in the writing of letters. And then came the delivery over land and sea, the reading and circulation, as well as the epistolary afterlife of copying, collecting and storing. E. Randolph Richards has extensively studied ancient letter writing and secretaries. Informed by the historical evidence and with a sharp eye for telltale clues in Paul's letters, he takes us into this world and places us on the scene with Paul the letter writer. What first appears to be just a study of secretaries and stationery turns out to be an intriguing glimpse of Paul the letter writer that overthrows our preconceptions and offers a new perspective on how this important portion of Christian Scripture came to be.`,
    coverImage: '/assets/images/books/paul-and-first-century-letter-writing-hires.jpg',
    buyUrl: 'https://www.amazon.com/Paul-First-Century-Letter-Writing-Secretaries-ebook/dp/B0FGHQB4HH',
    role: 'author',
    quotes: [],
  },
  {
    slug: 'the-secretary-in-the-letters-of-paul',
    title: 'The Secretary in the Letters of Paul',
    year: '1991',
    subtitle: 'Wissenschaftliche Untersuchungen zum Neuen Testament, 2/42',
    description: `Randy's doctoral monograph, edited by Martin Hengel for the WUNT series (T\u00fcbingen: Mohr/Siebeck) -- the scholarly foundation for his later, more accessible work on Paul's letter-writing practices. Currently unavailable to buy new; listed as out of print on Amazon.`,
    coverImage: '/assets/images/books/cover-wunt.png',
    buyUrl: '',
    role: 'author',
    quotes: [],
  },
  {
    slug: 'reading-romans-with-eastern-eyes',
    title: 'Reading Romans with Eastern Eyes',
    year: '2019',
    subtitle: "Honor and Shame in Paul's Message and Mission",
    description: `Christianity Today's 2020 Book of the Year Award of Merit -- Biblical Studies. Biblical Foundations Award Finalist. Combining research from Asian scholars with his many years of experience living and working in East Asia, Jackson Wu directs our attention to Paul's letter to the Romans. He argues that some traditional East Asian cultural values are closer to those of the first-century biblical world than common Western cultural values. As readers, we bring our own cultural fluencies and values to the text -- our biases and background influence what we observe, and what we overlook. This book helps us consider ways we sometimes miss valuable insights because of widespread cultural blind spots. In Reading Romans with Eastern Eyes, Vaughn demonstrates how paying attention to East Asian culture provides a helpful lens for interpreting Paul's most complex letter.`,
    coverImage: '/assets/images/books/reading-romans-with-eastern-eyes-hires.jpg',
    buyUrl: 'https://www.amazon.com/Reading-Romans-Eastern-Eyes-Message-ebook/dp/B07R6B5MJZ',
    role: 'foreword',
    authorsLine: 'by Jackson Wu \u2014 foreword by E. Randolph Richards',
    quotes: [],
  },
  {
    slug: 'mit-den-augen-der-apostel',
    title: 'Mit den Augen der Apostel',
    year: '2023',
    subtitle: 'German edition of Misreading Scripture with Western Eyes',
    description: `Was f\u00fcr die Menschen zur Zeit der Bibel noch ganz selbstverst\u00e4ndlich mitgedacht wurde, ist f\u00fcr uns heute nicht mehr offensichtlich. Unsere westliche Kultur heute denkt anders \u00fcber Gesellschaft, Individualismus, Beziehungen, Tugenden und Laster als es in biblischen Zeiten \u00fcblich war. Unsere kulturelle Pr\u00e4gung hat gro\u00dfe Auswirkungen auf unser Denken, unsere Werte und auch darauf, wie wir die Bibel verstehen. Mit vielf\u00e4ltigen Beispielen sch\u00e4rfen die Autoren den Blick f\u00fcr den biblischen Kontext wie auch f\u00fcr die eigenen Pr\u00e4gungen und er\u00f6ffnen so eine neue Sicht auf bekannte Texte. (German-language edition of Misreading Scripture with Western Eyes, published by R. Brockhaus.)`,
    coverImage: '/assets/images/books/mit-den-augen-der-apostel-german-edition-hires.jpg',
    buyUrl: 'https://www.amazon.com/Mit-den-Augen-Apostel-kulturbedingten-ebook/dp/B0C542Y35X',
    role: 'translation',
    authorsLine: 'German edition, with Brandon J. O\u2019Brien',
    quotes: [],
  },
  {
    slug: 'john-word-biblical-commentary',
    title: 'John',
    year: 'forthcoming',
    subtitle: 'Word Biblical Commentary series, 2 vols. (under contract, Zondervan)',
    description: `Randy's forthcoming two-volume commentary on the Gospel of John for the Word Biblical Commentary series, succeeding the existing volume by George R. Beasley-Murray.`,
    coverImage: '/assets/images/books/john-wbc-by-beasley-murray.jpg',
    buyUrl: '',
    role: 'author',
    workingOn: true,
    quotes: [],
  },
  {
    slug: 'inscriptions-papyri-and-other-artifacts',
    title: 'Inscriptions, Papyri, and Other Artifacts',
    year: '2023',
    subtitle: 'Vol. 10, Ancient Literature for New Testament Studies (Zondervan)',
    description: `Co-edited with James R. Harrison, general editors Craig Evans and Cecilia Wass\u00e9n \u2014 a scholarly volume on inscriptions, papyri, and other documentary artifacts for New Testament study.`,
    coverImage: '/assets/images/books/placeholder-inscriptions-papyri.jpg',
    buyUrl: '',
    role: 'author',
    workingOn: true,
    quotes: [],
  },
  {
    slug: 'rediscovering-the-new-testament',
    title: 'Rediscovering the New Testament',
    year: 'under contract',
    subtitle: 'with David Capes and Rodney Reeves (InterVarsity Press)',
    description: `An innovative new introduction to the New Testament, co-authored with David Capes and Rodney Reeves \u2014 currently under contract with InterVarsity Press.`,
    coverImage: '/assets/images/books/placeholder-rediscovering-nt.jpg',
    buyUrl: '',
    role: 'author',
    workingOn: true,
    quotes: [],
  },
]

export function getBookBySlug(slug: string): BookData | undefined {
  return BOOKS.find((b) => b.slug === slug)
}
