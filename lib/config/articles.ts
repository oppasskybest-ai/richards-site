import { CardItem, JournalismCategory } from '@/types/journalism'

export interface ArticleData extends CardItem {
  category: JournalismCategory
  featured?: boolean
  comments_enabled?: boolean
}

// Fallback/seed list, used only if the `articles` table in Supabase is empty
// or unreachable. All 32 posts below have FULL real post text (word-for-word,
// HTML-cleaned) recovered from the httrack scrape of randolphrichards.com
// (sorted-assets.zip, html/pages/*.html, matched via each page's og:url meta
// tag and de-duplicated). Slugs match the live site's real permalink slugs
// exactly (e.g. /2016/07/21/a-scroll-with-seven-seals/) for link parity.
// Categories are a best-effort split into the site's two real categories
// (Bible & Culture / Family & Faith) -- the original site did not tag posts
// by category, so this is an editorial judgment call, not scraped data.

const IMG = (f: string) => `/assets/images/articles/${f}`

export const SEED_ARTICLES: ArticleData[] = [
  {
    id: 'we-had-hoped-that',
    category: 'bible-culture',
    title: `We had hoped that…`,
    publication: 'randolphrichards.com',
    slug: 'we-had-hoped-that',
    content_html: `<p>The pastor-scholar Dr. Bernie Cueto had posted this Easter message: </p>
<blockquote>
<blockquote>
</blockquote>
</blockquote>
<p>The disciples on the road to Emmaus had hoped that Jesus would improve their situation: “we had hoped that he was the one who was going to redeem Israel” (Lk 24:21). They had hoped to be delivered from Roman oppression, that Jesus would free them from the cruel hand of Rome. Yet, Rome remained during their entire lifetime. In fact, it got worse. Within 40 years Rome crushed their nation and destroyed their city, leveling the Temple. For these disciples, their hopes for deliverance from Rome seemed to go unanswered. So also in your own life, you have perhaps asked Jesus to free you from an illness, a failing marriage, financial hardships, and yet, the next day arrives and your “Rome” still remains. The problem is still there. You sigh and say like them, “We had hoped that…”</p>
<p>Let the message of Easter speak to you as it did to those early disciples. They were looking for salvation only within the boundaries of this life. For them, “redeeming Israel” meant freedom from Rome in this life. Jesus had bigger plans. Salvation wasn’t merely deliverance from the challenges of this earthly life. As my friend Bernie said, “more than comfort, not a temporary fix.” God’s plans are bigger than ours. His viewpoint is beyond the next few decades. His goal for us ultimately happens on “the Day of the Lord” (1 Thess. 4:13–5:11). Easter is about <em>resurrection</em>. Jesus will return for each of us, <em>resurrect </em>us, and take us to the “place he has prepared for us” (Jn 14:1-3). He is risen indeed–and some day, so will we!</p>
<p></p>`,
    url: '',
    date: '2025-04-19',
    image: IMG('placeholder.jpg'),
    excerpt: `The pastor-scholar Dr. Bernie Cueto had posted this Easter message: The disciples on the road to Emmaus had hoped that Jesus would improve their situation: “we had hoped that he was the one who was going to redeem Israel” (Lk 24:21). They had hoped to be delivered from Roman…`,
    featured: true,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'the-reckless-love-of-god',
    category: 'bible-culture',
    title: `The Reckless Love of God?`,
    publication: 'randolphrichards.com',
    slug: 'the-reckless-love-of-god',
    content_html: `<p><strong>Reckless Love</strong></p>
<p>First, let me say I love Cory Asbury’s title song on his debut album. You can listen to it here, if you aren’t familiar: </p>
<p><a href="https://www.youtube.com/watch?v=Sc6SSHuZvQE"></a></p>
<p><a href="https://www.youtube.com/watch?v=Sc6SSHuZvQE">Reckless Love (Official Lyric Video)YouTube · Bethel MusicJan 19, 2018</a></p>
<p>Cory sings about the overwhelming, never-ending, love of God. How God’s love chases us down and finds us. Cory notes that while we were still God’s foe (enemy), God fought for us (see Rom. 5:10). I agree with Cory, that we can’t earn God’s love; we don’t deserve it. (It’s a great song.) </p>
<p>Allow me to quibble on two points. </p>
<p>First, God’s love is not and has never been reckless. This is actually an English problem—not a theology one. To be “reckless” means that you did not “reckon” the cost or consequences of something before you did it. Scripture is very clear that God is not reckless. He knew the cost of saving mankind before he laid the foundations of the earth. Jesus himself ridicules being reckless: </p>
<p>For which one of you, when he wants to build a tower, does not first sit down and calculate the cost to see if he has enough to complete it? Otherwise, when he has laid a foundation and is not able to finish, all who observe it begin to ridicule him, saying, ‘This man began to build and was not able to finish.’ (Lk 14:28-30, NASB). </p>
<p>I think what Cory meant was the lavish love of God. </p>
<p>My second quibble point is his line: “fights ‘til I’m found, leaves the ninety-nine.” Clearly, Cory is referring to Jesus’ beautiful parable found a few verses later in Lk 15:4-7,</p>
<p>What man among you, if he has a hundred sheep and has lost one of them, does not leave the ninety-nine in the open pasture and go after the one which is lost until he finds it? When he has found it, he lays it on his shoulders, rejoicing. And when he comes home, he calls together his friends and his neighbors, saying to them, ‘Rejoice with me, for I have found my sheep which was lost!’ I tell you that in the same way, there will be <em>more</em> joy in heaven over one sinner who repents than over ninety-nine righteous persons who need no repentance. (NASB)</p>
<p>So, the point in Jesus’ parable* about the lost sheep is the primary point made in Cory’s song. God’s love is lavish and he will go to any extreme to find us and then rejoice when we are found. The emphasis is not on abandoning the 99. We are pushing the parable in unintended ways, when we emphasize leaving the 99. Rather, Jesus’ point was that the Good Shepherd doesn’t say, “Well, I still have 99, so that’s good enough.” No, as Peter reminds us, God does not want a single one to perish (2 Pet 3:9).</p>
<p>Enjoy singing Cory’s song (although I wish he would change the lyrics to “lavish love of God.”) </p>
<p>_____________________ </p>
<ul>
<li>Ever since J. Jeremias’ work on parables, we emphasize that a parable (an earthly story with a heavenly meaning) is a story is designed to illustrate something we may not understand well, such as the Kingdom of God, by using some part of everyday life that people did understand, like farming or shepherding. Thus, while a parable might contain multiple characters or details, the central message remains singular. We do not want to push every detail in a parable—otherwise, we have 99% of people not needing to repent, or we have God praising dishonesty (Lk 16:1-17)  or folks going to heaven or hell without a judgement day (Lk 16:23). In a parable, we look for the main point. </li>
<li>The image is AI-generated and so free of copyright, but incorrectly portrays Jesus with long hair, Caucasian features, and some background that clearly isn’t first-century Palestine. </li>
</ul>`,
    url: '',
    date: '2024-12-17',
    image: IMG('placeholder.jpg'),
    excerpt: `Reckless Love First, let me say I love Cory Asbury’s title song on his debut album. You can listen to it here, if you aren’t familiar: Reckless Love (Official Lyric Video)YouTube · Bethel MusicJan 19, 2018 Cory sings about the overwhelming, never-ending, love of God. How God’s…`,
    featured: true,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'dewesternizing-the-christmas-story-post-3-the-main-vs-the-minor-characters',
    category: 'bible-culture',
    title: `DeWesternizing the Christmas Story – Post 3: The Main vs. the Minor Characters`,
    publication: 'randolphrichards.com',
    slug: 'dewesternizing-the-christmas-story-post-3-the-main-vs-the-minor-characters',
    content_html: `<p>Who we think are the major players may not be whom God wanted highlighted.</p>
<p>The Christmas story was an event of cosmic proportions, played out in the most unassuming of settings. Did God not know that a birth in Rome, or at least in the palace in Jerusalem, would have been more suitable for the “King of Kings”? Surely, God could have found a more suitable location than a suburb of a minor provincial capital in the backwaters of the Empire. It makes one wonder if God’s map of the world is different from ours! Did God not know that shepherds in Palestine were not considered reliable witnesses? Did God just happen upon them and invite them on a whim? Were they an afterthought or an impulse?</p>
<p>Oh, also let the innkeeper off the hook. First, the word likely means “guestroom” not “inn.” He was being kind to allow them to stay there. In any event, Mary would have been joined by aunts, female cousins and a family midwife (if there was one). It was not a sweet scene of just Mary and Joseph, in a lovely, wooden (European-style) stable. Most stables in that area were caves. <a href="https://biblicalisraeltours.com/2014/12/the-manger/">Mangers</a> (feeding troughs) were carved from stone. In any case, a humble beginning, unlike many modern images. </p>
<p>While we are at it. As protestants, let us not downplay the sacrifices of Mary. I don’t mean that she had to walk to Bethlehem (which she almost certainly did, because all but the ultra-wealthy walked everywhere), even though she was 9-months pregnant. She went with Joseph knowing delivery was imminent—ancients could count to nine. Why go? Because their families all went. If Joseph had to report, so did his brothers, uncles, etc. Likewise with Mary, her family was going. Thus, her support system was heading to Bethlehem, and she had to go as well. To be frank, Mary’s condition likely played no factor in the family’s planning. Caesar would have provided a window of time to report for the tax rolls. Caesar would not have wanted the entire Empire to uproot and travel on the same weekend. The extended family likely planned a time convenient for a pilgrimage to Jerusalem (such as Passover), since Bethlehem was only one day’s walk from Jerusalem. It was “unfortunate” for Mary that she was expecting at the time. On the other hand, probably whenever the journey was made, someone in the extended family would have been expecting. So, what was her sacrifice? At least one part was when she consented to bear the Christ-child (Lk 1:38). Let’s face it. No one believed her story, any more than you would believe your neighbor’s daughter if she used a similar story. The shadow over his parentage became well known. Over 30 years later, Jesus was cruelly ridiculed over it (Jn 8:41). Likely, people finally believed Mary’s story only after Jesus’ resurrection. She carried a heavy burden for nearly 40 years.</p>
<p>This part of the story can speak to us as well. It reminds us that God views people and the world differently than we do. We want to make “kings” the heroes (and heroes into kings). Shepherds seem “nice” (and we want to include them), but we tend to make them “extras” in the drama. Clearly, they are second-fiddle to the magi in our modern drama. I think God would reverse that. If we were rewriting Christmas, we would want to change the setting as well as the characters to make it all more royal.  </p>
<p>I suggest we let Jesus’ story encourage us. God likes the ordinary. He prefers shepherds and fishermen over princes and patrons. You may feel “forgotten” or “sidelined,” or that your life is being played out only on some minor stage. The Christmas Story suggests we take another perspective. While the world may not value who and where you are, God has different priorities!</p>
<p>Lastly, how shall we react to the Christmas news this year? He is still immanu-El. After the event, the magi “returned” (Mt. 2:12); likewise, the shepherds also “returned.” Life after Christmas always returns. Work, children, school, <em>bills,</em> all return, but the shepherds returned, “glorifying and praising God for all the things they had heard and seen” (Luk 2:20). As this Christmas comes and goes, how will we return after Christmas? </p>
<p>I wish you and yours the merriest of Christmases this year. </p>`,
    url: '',
    date: '2023-12-25',
    image: IMG('placeholder.jpg'),
    excerpt: `Who we think are the major players may not be whom God wanted highlighted. The Christmas story was an event of cosmic proportions, played out in the most unassuming of settings. Did God not know that a birth in Rome, or at least in the palace in Jerusalem, would have been more…`,
    featured: true,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'dewesternizing-the-christmas-story-post-2-the-church-christmas-play-versus-gods-cosmic-drama',
    category: 'bible-culture',
    title: `DeWesternizing the Christmas Story – Post 2: The Church Christmas Play versus God’s Cosmic Drama`,
    publication: 'randolphrichards.com',
    slug: 'dewesternizing-the-christmas-story-post-2-the-church-christmas-play-versus-gods-cosmic-drama',
    content_html: `<p>The little church where I grew up had an annual Christmas Play but couldn’t afford to have multiple set designs. In fact, keeping it simple was the theme. Our one little manger scene at the front of that small church was packed with Mary and Jesus, surrounded by Joseph, three Kings, some shepherds, a cow and a half-dozen sheep (kids in costumes).</p>
<p>The original manger scene was probably also crowded but not with sheep and Wise Men. By the way, there were not three and they were not kings. (In my culture, everybody brings one gift, so three gifts implies to me there must have been three givers.) A caravan of three with expensive gifts probably wouldn’t have gotten out of Babylon before being robbed! While the wise men didn’t appear that first night, shepherds did, but without dragging their herds along. Luke’s shepherd story, though, is a powerful one. (Luke likes to talk about the disenfranchised.) God told the shepherds precisely where to find the baby. The Angel of the Lord (apparently alone) announced the good news to the shepherds, and I think that was likely when the rest of heaven found out. Luke tells us “suddenly” the “hosts of heaven” appear (Lk 2:13). I assume they were surprised by the good news, but they are clearly ecstatic about it.</p>
<p>I suspect this is also when Satan found out about it. I think Satan then arranges for the Wise Men to come. Think about it. What did the visit of the Wise Men accomplish? The death of innocent babies in Bethlehem. Herod already had a reputation for killing anyone with aspirations for his throne (<a href="https://historycollection.com/historys-deadliest-relatives/3/">examples</a>, ##27-29), so Herod’s response was entirely predictable. I can also add, astrology (using the stars to predict events, as a form of divination) is forbidden in Scripture (Lev. 19:26), also see for example, Isa. 47:13-15 or Deut. 18:9-14, where it is called “detestable.” While we assume it, Scripture never says God sent the star . The magi saw some astrological sign that they interpreted to mean the birth of a new Jewish king.<a href="#_ftn1">[1]</a> The original sign to the wise men, a star ἐν τῇ ἀνατολῇ, <em>en tê anatolê </em>(in the east or in Anatolia or when it rose), was gone. They had no idea where to find the baby. They had assumed it would be in the Royal Nursery in Jerusalem; hence they appeared before Herod. Once the magi (one can question how “wise” they were) alerted Herod, the die was cast. Herod acts without any further assistance from the magi. Their original announcement put into motion the death of the babies. After the magi leave, another star (apparently in the south) guides them to the Babe. Perhaps God sent this one; perhaps God did not. Scripture doesn’t say. In any case, their gifts probably funded the family’s escape to Egypt, but I would not want to suggest they were God’s only option for funding. The magi do not return to Herod because God warned them in a dream (not with a star). </p>
<p>So, were the magi just a disaster and nothing else? Matthew mentions the story because he wants to highlight that the entire world recognized the gospel, as Isaiah frequently noted, the nations will bring gifts to Zion. Matthew then ends his story with the Great Commission. Also, Scripture constantly reminds us that what someone intended for evil, God used for good (Gen. 50:20). I suspect one of Satan’s greatest frustrations is that God is constantly pulling good out of the evil that Satan wrought. Nonetheless, the magi story is very different from the other parts of the biblical story. In the other stories, when God gave directions, he used angels and dreams, not astrology. I think the Revelation is referring to Satan, the magi, and Herod when it says the Dragon tried to kill the baby when it was born (Rev 12:1-6). It would have succeeded, except God warned Joseph (in a dream) to flee.</p>
<p>In any event, the magi don’t show up on the birth night. We are told by Matthew that they visit the “child” (not babe) in the “house” (not stable). Perhaps Matthew was being less precise in his terminology, but we also can note when Jesus is dedicated in the Temple at 40 days old, his parents don’t yet have the gifts of the magi. They offer only the “poor” gift (Lev 12:8). After Herod determined the timing of the sign appearing to the magi, Herod orders all boys under two to be killed. It seems likely it it was a year or more after his birth when the magi visited. So, why was Joseph still in Bethlehem? Initially, Mary didn’t return with the rest of the family because she was in recovery. It was also nice to be able to wait for a Temple dedication, since Galileans generally didn’t get to do that. The stay likely extended afterwards because Joseph was a builder, <em>tektôn, </em>an artisan in stone, metal or wood. While in Europe, builders were carpenters, in Palestine, it generally meant stone, (adobe) bricks, ceiling (joist) joints, and roofing–what was needed to build a house (Epict. <em>Diss.</em> 3.21.4.1). Joseph likely found work in the area and stayed there as long as the jobs lasted. (Many folks in the majority world would find this quite normal even today.)</p>
<p>So, what can we draw from this? Christmas is a rescue story. God is rescuing humanity from their sins. God is rescuing Jesus from the Dragon. God is rescuing Mary and Joseph from the hand of Herod. While the Dragon in Rev. 12 didn’t make it into my Church’s Christmas play, it is a part of God’s Cosmic Drama. The story in the Revelation isn’t just “color commentary” to enliven the Christmas event. It tells us that Christmas isn’t just about a young teenage bride. It isn’t a Church play with cute little kids forgetting their lines to an audience of giggling parents. No. The Bible says Christmas is about dragons, danger, and divine rescues. Christmas is a serious adult story; Christmas isn’t just for kids.</p>
<hr />
<p><a href="#_ftnref1">[1]</a> There are several technical descriptions of the various theories noting the intersection of Babylonian astrology (which scholars know a bit about) and actual astronomical events at the time, such as the conjunction of the planets Jupiter and Saturn. A simpler discussion can be found at S. Begley, “The Christmas star–or was it planets: New astronomical theories of the Magi’s beacon,” <em>Newsweek</em> 118/27 (1991):54-55. Such theories require that the “star” be an actual physical event (something any Joe-Schmo could have looked up and seen) versus a visionary sign that only select individuals saw. If it was a physical sighting in the sky that all could see, then we are justified to compare it with ancient records of astronomical sights. If it was a vision, then all bets are off.</p>
<p></p>`,
    url: '',
    date: '2023-12-23',
    image: IMG('placeholder.jpg'),
    excerpt: `The little church where I grew up had an annual Christmas Play but couldn’t afford to have multiple set designs. In fact, keeping it simple was the theme. Our one little manger scene at the front of that small church was packed with Mary and Jesus, surrounded by Joseph, three…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'dewesternizing-the-christmas-story-post-1',
    category: 'bible-culture',
    title: `DeWesternizing the Christmas Story – Post 1`,
    publication: 'randolphrichards.com',
    slug: 'dewesternizing-the-christmas-story-post-1',
    content_html: `<p>Our modern understanding of the Christmas Story is a mix of the biblical stories told by Matthew and Luke, plus centuries of adding on traditions. We then fill in any gaps with modern, Western, individualist assumptions. Let’s ponder a few with three postings this week:</p>
<ul>
<li>Post 1: Everybody knows when to celebrate Christmas</li>
<li>Post 2: My Church Christmas Play versus God’s Cosmic Drama</li>
<li>Post 3: The Characters in the Christmas Story (versus the child actors in my church play)</li>
</ul>
<p>Post 1: Everybody knows when to celebrate Christmas, right?</p>
<p>(Source: <a href="https://movie-screencaps.com/back-to-the-future-1985/page/17#foobox-1/57/backtothefuture-movie-screencaps.com-2938.jpg?ssl=1">https://movie-screencaps.com/back-to-the-future-1985/page/17#foobox-1/57/backtothefuture-movie-screencaps.com-2938.jpg?ssl=1</a>) </p>
<p>Despite what <a href="https://www.youtube.com/watch?v=67hwPu4zwLQ&ab_channel=ImagineFalkor"><em>Back to the Future</em></a><em> </em>suggested, Jesus was not born on Dec. 25, 0000. There is no year Zero. The Arabs hadn’t yet invented the number zero at the time <a href="https://www.britannica.com/biography/Dionysius-Exiguus">Denis the Little</a> created our Christian calendar. (Since there was no zero in our Christian calendar, the year 1 BC is followed by AD 1). Instead of critiquing Denis for not knowing a mathematical marvel, we should admire him for doing such a great job estimating the birth year (nearly 600 years after the fact). Denis only missed it a little. Jesus was likely born about 7 BC. Herod (who ordered the death of the babies) died in 4 BC.</p>
<p>As to the month and date, Emperor Constantine (in AD 336) established December 25 as the date to celebrate Christmas. Scholars argue why Constantine picked that date. Most think he was putting a Christian holiday in place to outshine <a href="https://en.wikipedia.org/wiki/Sol_Invictus">Sol Invictus</a> (the pagan festival for winter solstice and the “re-birth” of the sun god). Jews were already celebrating the Rededication of the Temple (Kislev 15, 164 bc). In the Gospel of John (10:22-42), we can see some fun <a href="https://www.thegospelcoalition.org/article/feast-dedication-jesus-hanukkah/">parallels</a> between Jesus and this Jewish festival. In any event, Constantine picked a date that was already a popular holiday time. So, Christmas Day is the date set aside annually to celebrate the Incarnation of our Lord.</p>
<p>If it isn’t actually the birth date, do Christians at least agree on the modern date for Christmas? Actually, not yet. Most Western Christians use the <a href="https://en.wikipedia.org/wiki/Gregorian_calendar">Gregorian</a> calendar and celebrate on Dec. 25. In 1582, Pope Gregory XIII made it the “official calendar,” but Christians in the East weren’t under his authority and kept the older <a href="https://en.wikipedia.org/wiki/Julian_calendar">Julian</a> calendar. Thus, they celebrate on Jan. 7. The reasons for picking one date over another is probably political more than religious. Just recently, Ukrainian Christians switched from Jan. 7 to Dec. 25 because they want to be different from their Russian Christian family and more like their Western Christian family. I’ll leave you to decide their motives.</p>
<p>While we have superimposed a lot of our own worldview into the Christmas Story, nonetheless, the basic meaning hasn’t been lost. It is the story of “immanu-El” (עִמָּנוּאֵל, Isa 7:14; ἐμμανουήλ; Mt 1:23), which literally means “God-with-us.” It has been God’s constant message to us. He comforted Isaac (Gen. 26:3), encouraged Moses (Ex. 3:12), fortified Joshua (Josh. 1:5) and Gideon (Jdg. 6:16), and edified Solomon (1 Kg. 11:38). But it was the word of comfort and assurance to all of God’s people (Isa. 43:2). Matthew tells us it was Jesus’ final word to us: “surely I am with you always, to the very end of the age” (Mt. 28:20). The ultimate example of Immanuel (God-with-us) is Jesus. The story that began with Abraham and a Promised Seed (Gal. 3:16), nay, even earlier with a promise to Eve that her offspring will crush the Serpent (Gen 3:15) was culminated on that beautiful Christmas Day. The biblical story remains our story. Immanuel then is Immanuel now. God was with them then and is with us now.</p>`,
    url: '',
    date: '2023-12-22',
    image: IMG('placeholder.jpg'),
    excerpt: `Our modern understanding of the Christmas Story is a mix of the biblical stories told by Matthew and Luke, plus centuries of adding on traditions. We then fill in any gaps with modern, Western, individualist assumptions. Let’s ponder a few with three postings this week: Post 1:…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'praying-them-in-rather-than-out',
    category: 'family-faith',
    title: `Praying them in rather than out`,
    publication: 'randolphrichards.com',
    slug: 'praying-them-in-rather-than-out',
    content_html: `<p><span>When our two boys were very little, a mentor commented that fathers often pray when an adult child has made bad decisions or is in an unhealthy relationship. We should certainly pray then, but he commented, “How much wiser is it to pray earlier, for a young father to pray that the child will grow up into good decisions and good relationships, to pray them into blessings rather than out of trouble.”</span></p>
<p>Well, our sons couldn’t have been much younger. The first day I started praying and asked for all kinds of things: good careers, a prosperous life, health, etc. As I was praying I thought, “Does that one really matter?” I kept striking items off the list, ending with one request: “May he grow up to be a fine Christian man who marries a fine Christian woman.”</p>
<p>I’d like to say I prayed it every day for each of my two children. I am confident I missed many days, but I tried. As each son married, I announced at his wedding that my prayer had been answered: he was a fine Christian man and he was marrying a fine Christian woman. Stacia and I were blessed indeed.</p>
<p>In 2020, each son gave us a first child. I have begun praying that each grandson would grow up to be a fine Christian man who marries a fine Christian woman.</p>
<p>May I encourage you, whatever their age and stage, to pray your children into blessings? Keep your list short; focus on what really matters. It is the best gift you can give them.</p>`,
    url: '',
    date: '2022-06-18',
    image: IMG('placeholder.jpg'),
    excerpt: `When our two boys were very little, a mentor commented that fathers often pray when an adult child has made bad decisions or is in an unhealthy relationship. We should certainly pray then, but he commented, “How much wiser is it to pray earlier, for a young father to pray that…`,
    featured: true,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'my-yoke-is-easy',
    category: 'bible-culture',
    title: `My yoke is easy …`,
    publication: 'randolphrichards.com',
    slug: 'my-yoke-is-easy',
    content_html: `<p>Jesus noted in Matthew 11: </p>
<p><sup>28 </sup>“Come to me, all you who are weary and burdened, and I will give you rest. <sup>29 </sup>Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. <sup>30 </sup>For my yoke is easy and my burden is light.”</p>
<p>It is commonly thought that Jesus is using the standard Jewish reference to Torah (the Law) as a “yoke.” While we might perceive a yoke in a negative way, ancients viewed yokes positively. It allowed two oxen to work together, for example. Thus, Torah enabled the Jewish people to work together. Normally, the phrase was used most commonly for those who forsook Judaism. They were said to have “cast off the yoke.”</p>
<p>When Jesus was saying his yoke was easy and his burden was light, he was contrasting his view of the Law with the burdensome interpretation of many scribes in his day. They read Torah (the yoke) in a way that made it heavy and a burden. The imagery was a yoke that was so heavy and large that it wasn’t helping the oxen to work together but rather burdened them so much that the oxen could scarcely work at all. </p>
<p>Jesus was suggesting that his Way was not burdensome. It shouldn’t make life more difficult. It should enable God’s people to work together better. As we teach others to be followers of Christ, let’s make sure that we keep Jesus’ yoke easy and light. </p>`,
    url: '',
    date: '2020-09-22',
    image: IMG('placeholder.jpg'),
    excerpt: `Jesus noted in Matthew 11: 28 “Come to me, all you who are weary and burdened, and I will give you rest. 29 Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. 30 For my yoke is easy and my burden is light.” It is…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'mary-and-martha-lk-1038-42',
    category: 'bible-culture',
    title: `Mary and Martha (Lk 10:38-42)`,
    publication: 'randolphrichards.com',
    slug: 'mary-and-martha-lk-1038-42',
    content_html: `<p>We all have heard sermons that Martha should have stopped cooking and sat down with Mary at the feet of Jesus. “Turn off the oven and sit down, Martha!”</p>
<p>Not exactly.</p>
<p>Someone needs to cook. When Jesus was finished talking, everyone expected to eat. So, why was Mary correct and Martha wrong? We need to look more closely at their situation.</p>
<p>We are told that Mary and Martha lived with their brother Lazarus. Traditionally, grown women lived with their husbands—something we still encourage, by the way.</p>
<p>Could they have been single women? In the New Testament world, men and women married. It was normal and expected. Since Mary and Martha are old enough to travel about on their own, make decisions, etc., and since no special comments are made about being single, the far more likely explanation is that they were both widows. It was very common in the ancient world, particularly since husbands were often much older than their wives. For two widows to live with their brother would have been quite ordinary.</p>
<p>We also need to notice their family is wealthy—quite wealthy. John 12 tells us that Mary later anointed Jesus’ feet with a pound of nard, a very expensive perfume. John tells us it cost a year’s wages. Most of us don’t keep 30-40 thousand dollars’ worth of perfume around.  We can discuss the extravagance of the gift some other time. Just to afford the perfume indicates the family had great wealth.</p>
<p>Thus, we have two wealthy widows, Mary and Martha. Luke tells us:</p>
<p>Martha was distracted by all the preparations that had to be made (Luke 10:40).</p>
<p>We are <em>not</em> supposed to imagine Martha in the kitchen spreading peanut butter on sandwiches. There would be staff working away to prepare a meal for this special guest, Jesus, and for his band of disciples. Martha was fretting away in the kitchen, managing the staff. This is not to belittle the work of a hostess. There are thousands of details to arrange, if one is to have a successful event.</p>
<p>On this occasion, though, Jesus wasn’t interested in Martha successfully hosting an event—even though a successful dinner party can be a worthwhile goal. This occasion wasn’t just a dinner party. Jesus wasn’t just a guest. Something rare was happening. Mary had noticed it; Martha had not.</p>
<p>“Martha, Martha,” the Lord answered, “you are worried and upset about many things, but few things are needed—or indeed only one. Mary has chosen what is better, and it will not be taken away from her.” (Luke 10:41-42)</p>
<p>Jesus noted only one thing was needed for the event (food). The staff was handling that. It would happen without Martha hovering over it. Probably it wouldn’t be quite as neat, quite as nice, quite as successful, but something better was happening.</p>
<p>Elsewhere, Jesus says the same thing. Fasting is good but it is to be done when the bridegroom is gone (Mk. 2:19-20). There are plenty of occasions for handling the ordinary events of life. When we recognize the Lord is present and at work, we should prioritize his presence.</p>
<p>Sometimes we need to stop whatever task we are doing. The Lord is present. Whatever the task, likely it can be completed on another occasion. We need to choose “what is better,” listen to what the Lord is doing, and prioritize his presence. Someone stops by to talk or calls on the phone. You realize this isn’t an ordinary call. The Lord is present in the conversation. We need to stop the normal busy-ness of life and pay attention to what the Lord is doing.</p>
<p>Handling the good was making Martha miss the better.</p>
<p>This wasn’t just an appeal to Martha. While I am working away in the kitchens of life, there are occasions I hear a voice calling out to me: “you are worried and upset about many things.” With my head in my (good) work, I had failed to notice the better, that something more significant was happening. Whatever important thing I was doing needs to be set aside for the moment.</p>
<p>The Lord has shown up and I was failing to notice.</p>`,
    url: '',
    date: '2017-10-13',
    image: IMG('placeholder.jpg'),
    excerpt: `We all have heard sermons that Martha should have stopped cooking and sat down with Mary at the feet of Jesus. “Turn off the oven and sit down, Martha!” Not exactly. Someone needs to cook. When Jesus was finished talking, everyone expected to eat. So, why was Mary correct and…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'crown-of-righteousness',
    category: 'bible-culture',
    title: `Crown of Righteousness`,
    publication: 'randolphrichards.com',
    slug: 'crown-of-righteousness',
    content_html: `<p>In my previous post, I quoted Paul’s verse from 2 Timothy:</p>
<p>Now there is in store for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that day (2 Tim. 4:8).</p>
<p>When we hear “crown,” we often have a mental image of the crown of a king or queen. The crown symbolizes authority, rule, control, etc. We could interpret the phrase “crown of righteousness” as some heavenly reward where we will have rule or authority over some group.</p>
<p>That is not what Paul meant.</p>
<p>There are two things to keep in mind. First, when Paul wrote “crown,” he was thinking of the laurel wreath that was given to the winner of a race. Paul had just said, “I have finished the race.” He envisions Christians not just finishing the race like the weary marathon runner who finishes hours after everyone else. The party is over, the crews are cleaning up, and here comes a battered, weary runner who drags his exhausted body across the finish line. Everyone is happy for him, but …</p>
<p>No, Paul is imagining himself and all believers as winners. They receive the crown. The woven laurel that was given to the winner.</p>
<p>Second, in Greek the expression “of righteousness” can indicated what the crown is. In other words, Paul is saying the winner receives a crown, that is, righteousness. What we all will earn from finishing the race is “righteousness.”</p>
<p>By the way, righteousness is not godliness. I often confused the two. Righteousness refers to God making things right. Christ has “made right” (has straightened out) my relationship with God. Things are now “right” between me and God. That is the crown, the reward that comes.</p>
<p>Let’s look again at what Paul said:</p>
<p>I have fought the good fight, I have finished the race, I have kept the faith. Now there is in store for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that day (2 Tim. 4:7-8).</p>
<p>“That day” refers to the Day of the Lord, the return of Christ. On that day, we will all be rewarded with righteousness. So, let’s keep the faith and finish the race. Righteousness awaits.</p>`,
    url: '',
    date: '2017-06-10',
    image: IMG('placeholder.jpg'),
    excerpt: `In my previous post, I quoted Paul’s verse from 2 Timothy: Now there is in store for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that day (2 Tim. 4:8). When we hear “crown,” we often have a mental image of the crown of a king or queen.…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'lost-her-battle-with-cancer',
    category: 'family-faith',
    title: `Lost her Battle with Cancer`,
    publication: 'randolphrichards.com',
    slug: 'lost-her-battle-with-cancer',
    content_html: `<p>“Aunt Betty lost her battle with cancer.” We often hear a phrase like this, commonly murmured respectfully in church. It meant this wonderful Christian woman, my wife’s Aunt Betty, died.</p>
<p>I hate this expression. It suggests that we win the battle with cancer when we live (through some treatment) or the cancer is in remission (for a while) or the operation removed all the cancer (as in my case). Thus, if the person dies, “they lost.”</p>
<p>Well, not to be insensitive, but everybody dies. As Billy Graham cleverly quipped, “The death rate is 100%.” By saying that death is losing, then everybody eventually loses.</p>
<p>That is not the Biblical view. Did Paul lose his battle? He certainly didn’t talk like he lost:</p>
<p>For I am already being poured out like a drink offering, and the time for my departure is near. I have fought the good fight, I have finished the race, I have kept the faith. Now there is in store for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that day (2 Tim. 4:6-8).</p>
<p>We win the battle with cancer (or any other disease) when we keep the faith. When the disease doesn’t make us bitter, when we don’t lose our confidence in the goodness of the Lord, when we remain faithful followers of Jesus, then we have won the battle.</p>
<p>Aunt Betty was a godly Christian woman until her last breath. Cancer didn’t defeat her faith. Even though Aunt Betty died of cancer, she won her battle.</p>`,
    url: '',
    date: '2017-06-06',
    image: IMG('placeholder.jpg'),
    excerpt: `“Aunt Betty lost her battle with cancer.” We often hear a phrase like this, commonly murmured respectfully in church. It meant this wonderful Christian woman, my wife’s Aunt Betty, died. I hate this expression. It suggests that we win the battle with cancer when we live (through…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'faith-that-moves-mountains',
    category: 'bible-culture',
    title: `Faith that Moves Mountains`,
    publication: 'randolphrichards.com',
    slug: 'faith-that-moves-mountains',
    content_html: `<p>We all know well the statement by Jesus:</p>
<p>For truly I tell you, if you have faith the size of a mustard seed, you will say to this mountain, “Move from here to there,” and it will move; and nothing will be impossible for you. (Matt. 17:20)</p>
<p>Personally, I have never seen a mountain move. In fact, I have never heard of someone moving a mountain.</p>
<p>Ever.</p>
<p>As in, ever in the history of the world, ever.</p>
<p>I can’t speak for certain, but I suspect that someone rearranging geography is the kind of thing that would make the news.</p>
<p>Many of us, when we read what Jesus said (and believe it) and then we look at the world, we are left concluding: “No one has much faith.” When preachers remind us how teeny-tiny a mustard seed is, we get even more discouraged. “Wow, we really stink, when it comes to faith.”</p>
<p>What Jesus said to encourage us has actually turned into a statement that discourages. What happened?</p>
<p>Let me suggest a different reading. Jesus wasn’t talking about moving an actual mountain. There is some scant evidence there may have been an ancient Jewish figure of speech connecting mountains with challenges. Rabbah was known as an “uprooter of mountains” (b.Ber. 64a). In a fierce rabbinic debate on the qualifications of witnesses, “One who saw Resh Lakish engaged in debate would think he was uprooting mountains” (b. Sanh. 24a).</p>
<p>While we can’t be certain quite how the idiom was used, I suspect “There’s a mountain in the way” would be equivalent to our “I hit a brick wall.” It referred to an obstacle. (If you have been to the Holy Land, you may have noticed that sometimes there were mountains in the way.)</p>
<p>Perhaps moving a mountain meant removing an obstacle. Now suddenly an impossible saying that never ever happened in the history of the world turns into a saying that likely has <em>already happened in your</em> world. Have you prayed and God removed an obstacle? I think that’s what Jesus meant.</p>
<p>Jesus gave us this saying, not to discourage us, but to embolden us.</p>
<p>Prayer matters.</p>
<p>It removes obstacles.</p>
<p>So, go out there and move a few mountains!</p>`,
    url: '',
    date: '2017-02-09',
    image: IMG('placeholder.jpg'),
    excerpt: `We all know well the statement by Jesus: For truly I tell you, if you have faith the size of a mustard seed, you will say to this mountain, “Move from here to there,” and it will move; and nothing will be impossible for you. (Matt. 17:20) Personally, I have never seen a mountain…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'the-antichrist',
    category: 'bible-culture',
    title: `The Antichrist`,
    publication: 'randolphrichards.com',
    slug: 'the-antichrist',
    content_html: `<p>When we hear “antichrist,” we usually think of the Revelation, End-Times, multi-headed beasts and other weird stuff. Yet, John mentions there are many antichrists:</p>
<p>Dear children, this is the last hour; and as you have heard that the antichrist is coming, even now many antichrists have come. This is how we know it is the last hour. (1 Jn. 2:18)</p>
<p>Apparently, there will be many antichrists throughout history until we get to the worst one, the last one, the one we normally think of as <u>the</u> Anti-Christ. By the way, how will we know when we have gotten to the worst one? I’m sure many Christians thought it couldn’t get any worse than Hitler. We may not know the worst one has come until God announces the end with “the voice of the archangel and with the trumpet call of God” (1 Th 4:16).</p>
<p>Well, if we don’t know <em>when</em>, we at least think we have a good idea <em>what</em> an antichrist will be like: the one speaking and acting “against Christ.” Well, maybe not.</p>
<p>In English, “anti” means “against,” such as antifreeze, antidepressant, or antitheft. The Greek prefix “anti” means “in place of” or “instead of.” So in the New Testament, an antichrist isn’t someone ‘against’ Christ but someone trying to take the place of Christ. (Of course, such an action is against Christ but an antichrist’s rhetoric might not include any “down with Jesus” speeches.) An antichrist could talk about God and goodness and about making the world a better place (but he will leave Jesus out of it).</p>
<p>We may recognize a particular TV show as being antichrist because it is trying to debunk the Bible or to undermine a Christian’s faith. Yet, what about the TV show that talks about how much God loves us and will take care of us, but doesn’t mention Jesus? In such a show, God sends angels out as supernatural social workers, who help us handle the challenges of life. Yet, no one (for the entire show) ever mentions Jesus. In fact, there is no gospel at all. No one needs to be rescued from their sins. In fact, no one mentions anything as negative sounding as sin. No, we just need to recognize how much God loves us all. The Good News becomes an angelic pep talk with perhaps a little supernatural assistance to overcome some interpersonal challenge. Tada! Everybody feels better about themselves, about God, and the world.</p>
<p>And Jesus isn’t mentioned.</p>
<p>God is mentioned, angels are featured, problems are solved, and no one needed Jesus.</p>
<p>Antichrist.</p>`,
    url: '',
    date: '2017-02-07',
    image: IMG('placeholder.jpg'),
    excerpt: `When we hear “antichrist,” we usually think of the Revelation, End-Times, multi-headed beasts and other weird stuff. Yet, John mentions there are many antichrists: Dear children, this is the last hour; and as you have heard that the antichrist is coming, even now many…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'the-widows-mites',
    category: 'bible-culture',
    title: `The Widow’s Mites`,
    publication: 'randolphrichards.com',
    slug: 'the-widows-mites',
    content_html: `<h4>Jesus’ teaching about the widow who gave two pennies* into the Temple offering is one of the most beloved stories of Jesus. Who among us hasn’t had his or her heart stirred by a sermon about the sacrifice of the widow who gave all she had to the Temple? No church building campaign would be complete without at least one message about the widow. Pastoral challenges to give more sacrificially carry more punch with the Sunday faithful if we sprinkle in a reminder about this poor widow, praised by Jesus.</h4>
<h4>As Jesus looked up, he saw the rich putting their gifts into the temple treasury. He also saw a poor widow put in two very small copper coins. “Truly I tell you,” he said, “this poor widow has put in more than all the others. All these people gave their gifts out of their wealth; but she out of her poverty put in all she had to live on.” (Luke 21:1-4)</h4>
<h4>Certainly, Jesus’ point was that the size of the gift doesn’t matter to God. What matters is the heart of the giver. This foundational lesson must never be forgotten. God looks at the heart and not at the number of zeroes in front of the decimal point.</h4>
<h4>Nonetheless, we should not overlook what Luke is <em>also</em> saying. Luke sandwiches this story of the widow between two other stories in order to also give a sober warning to religious leaders: Do not exploit the piety of the poor to squeeze every last dime out of them. Unfortunately, many preachers use the widow’s story to do the very thing that Luke’s Gospel tells us not to do.</h4>
<h4>How do we see Luke’s warning? It’s subtle, but it is where teachers and preachers should be able to find it. In Bible Interpretation 101, students are told one of the most foundational principles is context, context, context. You look at what is said right before and right after your passage. So, let’s do it here.</h4>
<h4>In the verse right before this, Jesus warns the crowd about religious elite: <strong><sup> </sup></strong></h4>
<h4>“Beware of the teachers of the law. They like to walk around in flowing robes and love to be greeted with respect in the marketplaces and have the most important seats in the synagogues and the places of honor at banquets. <strong><sup> </sup></strong><em>They devour widows’ houses** </em>and for a show make lengthy prayers. These men will be punished most severely.” (Luke 20:46-47)</h4>
<h4>Then in the very next verse, Jesus points out a widow giving <em>everything she has</em> to the Temple. (There will be no money left to pay any debts.) “Ah,” we might protest, “but she is giving it to a noble cause. It’s a gift to God’s Temple.” Good point. So, in the very next verse, Luke comments on the Temple:</h4>
<h4>Some of his disciples were remarking about how the temple was adorned with beautiful stones and with gifts dedicated to God. But Jesus said,<strong><sup> </sup></strong>“As for what you see here, the time will come when not one stone will be left on another; every one of them will be thrown down.” (Luke 21:5-6)</h4>
<h4>Our Bibles may put headings in between these stories, but Luke didn’t. Clearly he connected these stories by linking them with the words ‘widow’ and ‘temple’. Of course, we don’t want to lose sight of Jesus’ basic point. What makes a great gift to God isn’t the size of the gift; it’s the heart of the giver. God loves a cheerful giver. But for those who should be able to see it, Luke has another message.</h4>
<h4>Luke warns the religious elite (as he often does). Those of us who preach and teach the Word need to be careful. (James warns that those who teach are held to a higher standard; Ja. 3:1.) We should not use someone’s piety as a means of milking more money out of them. How many times has this story been used in a church campaign to raise money to embellish some part of a church building? The widow’s coins went to the Temple and were used to make the Temple more beautiful. Even Galilean fishermen were impressed by the beauty of the Temple: “Some of his disciples were remarking about how the temple was adorned with beautiful stones and with gifts dedicated to God [like the widow’s].”</h4>
<h4>Jesus harrumphed and said, “it won’t last.”</h4>
<h6>_____________</p>
<p>*The widow gave two bronze <em>lepta</em>, which together equaled the smallest Roman coin, somewhat equivalent to a penny today. In old English the smallest coin they knew was a Dutch copper mite, so older English translations used “mite.”</p>
<p>**Obviously, the religious leaders weren’t termites. They consumed the property of the poor by foreclosing on debt. What Jesus’ hearers knew (that many of us today don’t) is that the Temple was one of the largest money lenders. The Temple wanted to make sure that foreclosed property would be sold to another Jew (who would tithe) rather than to a Gentile. So the poor were often in debt, and in debt to the Temple.</p>
<p>Jesus’ remark about the widow probably wasn’t praise for her generosity but compassion for her plight: she has given everything she has. But he also uses her example as a teachable moment for his disciples to show that God doesn’t look at the size of the gift but the heart of the giver.</h6>`,
    url: '',
    date: '2017-01-15',
    image: IMG('placeholder.jpg'),
    excerpt: `Jesus’ teaching about the widow who gave two pennies* into the Temple offering is one of the most beloved stories of Jesus. Who among us hasn’t had his or her heart stirred by a sermon about the sacrifice of the widow who gave all she had to the Temple? No church building…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'complegalitarian',
    category: 'bible-culture',
    title: `Complegalitarian`,
    publication: 'randolphrichards.com',
    slug: 'complegalitarian',
    content_html: `<p>On the topic of “women in ministry,” we typically discuss two viewpoints: complementarian and egalitarian. Like a good Westerner, there are of course two options. Whenever I hear there are two options, it makes me nervous. I wonder if we are squeezing the topic into a western mold.</p>
<p>Let me use a different example. In the old days, when I was a young minister (and dinosaurs roamed the earth), we said there were two Baptist views on the Lord’s Supper: Open and Closed. “Open Communion” meant anyone could participate. “Closed Communion” meant only <em>members</em> could participate. The problem was that for some “closed communion” folks, <em>members</em> meant only members of that specific local church. Others meant only members of another Baptist church or a church of like faith and order. Thus, there were really three positions: open, close, and closed communion.</p>
<p>Now to go back to the complementarian and egalitarian debate.</p>
<p>I have lots of female students who believe God has called them to ministry, but they insist (in strong terms) that this never meant a senior pastor. Some of those students call themselves complementarian; some of them call themselves egalitarian. Interestingly, my staunch complementarians don’t want them because they insist God has called them to ministry. Some of my staunch egalitarians don’t want them because they have excluded senior pastor from their list of options. The egalitarians insist these women are complementarians while the complementarians insist they are egalitarian.</p>
<p>So, perhaps there is a third option. I have decided to call them complegalitarians.</p>`,
    url: '',
    date: '2016-12-15',
    image: IMG('placeholder.jpg'),
    excerpt: `On the topic of “women in ministry,” we typically discuss two viewpoints: complementarian and egalitarian. Like a good Westerner, there are of course two options. Whenever I hear there are two options, it makes me nervous. I wonder if we are squeezing the topic into a western…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'thanksgiving',
    category: 'bible-culture',
    title: `Thanksgiving`,
    publication: 'randolphrichards.com',
    slug: 'thanksgiving',
    content_html: `<p>Dr. Bernie Cueto preached a great sermon this past Sunday on Thanksgiving. He reminded us that we should be thankful whether we feel it or not. Our Thanksgiving is based on the facts of what God has done and is doing in our lives, not on whether I happen to feel thankful at this moment.</p>
<p>Thanksgiving based on facts instead of feelings reminded me of the old Campus Crusade for Christ (CRU) illustration of an 1800’s steam train. I love this old train illustration with its steam engine, coal car, and caboose. The basic idea is that our salvation (the very basis of what we are thankful for) is driven by the “fact” of what God has done for us in Christ. The fuel comes from our “faith” in Christ. Our feelings are pulled along by the fact of what God has done.</p>
<p>In fact, in the old days the caboose had the guy who was in charge of the brakes. I have found that feelings function best in that role. Feelings are often very good at putting the brakes on something. How many times have I had “a bad feeling about this” and it put the brakes on something and kept me from making a mistake.</p>
<p>Whatever other roles feelings have, they belong <u>behind</u> facts and faith. How silly to imagine the caboose pushing the train! Feelings should follow, not lead. We shouldn’t allow our feelings to drive how we act, including during this time of Thanksgiving. Actually, I have found that feelings usually follow my actions.</p>
<p>If I act based on the facts of what God has done for me, (grateful) feelings will trail along. There is an old quote, “It is easier to act your way into a feeling than to feel your way into an action.”<a href="#_ftn1" name="_ftnref1">1</a> We need to stop waiting for thankful feelings to well up in us before we speak thanksgivings.</p>
<p>Whether or not we feel thankful at this particular moment, there is something (and often many things) for which to be thankful. Thankfulness is a decision we can choose to make.</p>
<p>This Thanksgiving, make the extra effort to express to God, family and friends how thankful you are. It’ll be good for your heart.</p>
<p>______________</p>
<p>1I’ve heard it attributed to Elton Trueblood but I can’t find the original source.</p>`,
    url: '',
    date: '2016-11-20',
    image: IMG('placeholder.jpg'),
    excerpt: `Dr. Bernie Cueto preached a great sermon this past Sunday on Thanksgiving. He reminded us that we should be thankful whether we feel it or not. Our Thanksgiving is based on the facts of what God has done and is doing in our lives, not on whether I happen to feel thankful at this…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'living-in-trumps-america',
    category: 'bible-culture',
    title: `Living in Trump’s America`,
    publication: 'randolphrichards.com',
    slug: 'living-in-trumps-america',
    content_html: `<p>Paul and Trump don’t share a lot in common on the surface. Paul was a Mediterranean Jew; Trump is a New York Presbyterian. Paul was an itinerate preacher; Trump a real estate magnate. But for all their differences, they do share this: they have both been labeled “misogynist.” And “chauvinist.” And “racist.” And a threat to civilized society. Both the Apostle Paul and our President-Elect have been accused of telling the crowds whatever they wanted to hear, of being a hypocrite and a threat to the nation’s morality. Both Paul and Trump have been accused of misbehaving. We just published a book on <a href="http://www.ivpress.com/cgi-ivpress/book.pl/code=4472">Paul Behaving Badly</a>.</p>
<p>In spite of numerous stories of misbehavior, Trump was elected president. Like this poster from a Trump rally, some American Christians may be celebrating the arrival of the Kingdom of God on earth. But other American Christians are grieving the end of civilization. We need a bit of perspective. As Scot McKnight noted in his <a href="http://www.patheos.com/blogs/jesuscreed/2016/11/09/our-hope-and-our-politics/">blog</a>, I can’t imagine early Christians campaigning for either Nero or Brittannicus to be the emperor to succeed Claudius. While one or the other may have been better for Christians, they would not have put their hopes for the future on either one. Their hopes were elsewhere.</p>
<p>There may or may not have ever been a time when America was a “Christian nation,” but most would agree that it certainly isn’t now. Christian values are no longer part and parcel of American culture. So, where do we go from here?</p>
<p>Paul didn’t have this problem. Rome wasn’t friendly to Christians (or to Jews, for that matter). There were no general elections, no voice of the everyman. And the sort of sign-carrying, slogan-shouting demonstrations Americans love to be involved in would get you killed in Paul’s Rome. Indeed Paul was killed for less than that.</p>
<p>Although Paul never had our problem, he still plots a map for us. Paul encouraged Christians to pray for those in authority (1 Tim. 2:2), recognizing that at the time this meant the pagan, Nero. But Paul goes further and tells us to be obedient to these authorities (Tit. 3:1). I am confident Paul would encourage American Christians are to work at being good at both–being good Americans and being good Christians.</p>
<p>“But what if it’s a <em>bad</em> government?” we might protest. The one Paul was talking about wasn’t good Christian government. Trump on his worst day will still be friendlier to Christianity than Nero was on his best day. The rules don’t change when government changes. For Paul, we were unquestionably to be loyal members of the empire—pay our taxes and keep the laws.</p>
<p>But <em>most importantly,</em> we need to remember where our highest loyalty lies: “<em>Our </em>citizenship is in heaven” (Phil. 3:20). This past election, one group of Christians sold their soul to the Republican Party, while another group sold their soul to the Democratic Party. The real problem was that Christians had sold their souls. If we put our hopes for a future on any American President, then we have our hopes on the wrong King.</p>
<h6>(This post is a modification of a couple of blog posts by Brandon J. O’Brien and E. Randolph Richards, written for the Patheos <a href="http://www.patheos.com/Books/Book-Club/Richards-OBrien-Paul-Behaving-Badly">Book Club</a>‘s promotion of their book, <em>Paul Behaving Badly.</em>)</h6>`,
    url: '',
    date: '2016-11-09',
    image: IMG('placeholder.jpg'),
    excerpt: `Paul and Trump don’t share a lot in common on the surface. Paul was a Mediterranean Jew; Trump is a New York Presbyterian. Paul was an itinerate preacher; Trump a real estate magnate. But for all their differences, they do share this: they have both been labeled “misogynist.”…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'the-wasteful-prodigal-son',
    category: 'bible-culture',
    title: `The Wasteful (Prodigal) Son`,
    publication: 'randolphrichards.com',
    slug: 'the-wasteful-prodigal-son',
    content_html: `<p>Historically, particularly in eastern Christianity, this parable has been understood to be about a son who wastes what his father has given him. The English word “prodigal” means “wastefully extravagant.”</p>
<p>We are all familiar with the scandal of the younger son’s request, “Give me my inheritance.” His share was indeed his, but he should await his father’s death. In Jewish law, no deal was settled until the father’s death. A deal could be struck; the property could be sold and money could change hands, but the buyer was not allowed to take possession of the land until the father died (m. Baba Bathra 8:7).<a href="#_ftn1" name="_ftnref1">[1]</a> Jewish law did this to protect parents in their old age.</p>
<p>Thus the younger son was able to sell his share and get the money, but the actual property would stay in the possession of the father until the father died. The deal was done, though, and couldn’t be undone.</p>
<p>So, the intentions of the younger son are clear to the father the moment the son asked. If he intended to stay put and to work the farm, then there was no reason to ask. It is important to note, though, it was the father who actually had to negotiate the sale of the younger son’s share. Sometimes we imagine the father stood to the sidelines and watched in disappointment.</p>
<p>Jesus tells us that the younger son went far away and then squandered his money. He was prodigal (wasteful).When he repents and returns, the waiting father forgives the wasteful son. Completely, totally. It is one of the most beautiful passages in Scripture. It is why we all love it.</p>
<p>We often overlook a point. When the older brother complains, the father notes, “Everything I have is yours” (Luke 15:31). That’s correct. Everything that is left belongs to the older son. The younger son has wasted what was his share.</p>
<p>This week in church we sang a lovely song that includes a line, “He welcomes me back, like I had never left.” Well, Jesus certainly welcomes us back with no condemnation. But in the case of Jesus’ parable, the actions of the younger son had repercussions. When he returned home, he didn’t get his share of the inheritance back. He had squandered it.</p>
<p>Jesus tells other parables that warn his listeners not to waste the gifts our heavenly Father has given us. We are not to take a talent he has given us and bury it. He gives us talents <em>in order for them to be used.</em> In fact, in one parable, the person had buried his talent (not used it) and it was taken from him and given to another—a sobering thought.</p>
<p>So, the beautiful parable of the wasteful son provides us with at least two lessons. First, a warning against wasting what God has given us. For example, if he has given you a beautiful voice, use it for his glory. If he created you the kind of person who connects well with people, use it to be his ambassador. If you empathize with another’s pain, use it to be the presence of Christ in a hurting person’s life. If you can write songs that stir someone’s soul, that captures the zeitgeist of the time, that moves someone to say, “yeah, that’s exactly how I am feeling,” use it for the glory of God, <em>or</em> he may take that talent from you and give it to someone who will use it. But it is not just talents. He also gives us opportunities. Some are given financial resources (like the sons in this parable). Whatever God has given you, don’t waste it.</p>
<p>The second lesson, the one more familiar to us, reminds us that God forgives us and welcomes us back. You are fully restored. You can’t however have the wasted years or the squandered opportunity back. We don’t get a “do-over.” Like the younger son, what we wasted is gone. Sometimes it’s opportunities, sometimes relationships, sometimes resources. Nonetheless, the Father forgives us. Forget what is behind. Don’t live in regret. Look forward. Like the waiting father in this parable, we serve a God who welcomes us <em>home</em>.</p>
<p>________________</p>
<p><a href="#_ftnref1" name="_ftn1">[1]</a> Brad H. Young, <em>The Parables: Jewish Tradition and Christian Interpretation</em> (Peabody: Hendrickson, 2002), 130-157.</p>`,
    url: '',
    date: '2016-08-05',
    image: IMG('placeholder.jpg'),
    excerpt: `Historically, particularly in eastern Christianity, this parable has been understood to be about a son who wastes what his father has given him. The English word “prodigal” means “wastefully extravagant.” We are all familiar with the scandal of the younger son’s request, “Give…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'a-scroll-with-seven-seals',
    category: 'bible-culture',
    title: `A Scroll with Seven Seals`,
    publication: 'randolphrichards.com',
    slug: 'a-scroll-with-seven-seals',
    content_html: `<p>I was invited to contribute an article for a popular Christian magazine about reading the Bible better. I suggest “What this verse means to me is …” can be a very poor way to start a Bible study discussion. It implies a verse can mean one thing to one person and something else to another. Rather, we should start with “What did the verse mean back then?” and then ask, “How does that meaning apply to me today?” If we do not <u>intentionally</u> think about <em>their</em> situation, we will <u>unintentionally</u> assume <em>ours.</em> This is the danger of musing about what a verse could mean instead of doing a bit of research.</p>
<p>In a heavenly vision, we are told:</p>
<p>Then I saw in the right hand of him who sat on the throne a scroll with writing on both sides and sealed with seven seals. And I saw a mighty angel proclaiming in a loud voice, “Who is worthy to break the seals and open the scroll?” But no one in heaven or on earth or under the earth could open the scroll or even look inside it. I wept and wept because no one was found who was worthy to open the scroll or look inside. (Rev. 5:1-4)</p>
<p>Why would a scroll have seven seals? If I just wrinkle my brow and ponder why an ancient scroll might have seven seals, I could (wrongly) conclude seven seals meant “sealed really well.” Or maybe, I might spiritualize it and say that maybe seven seals meant “spiritually sealed.” Rather than just pondering, I should research it. Recently, I did that.<a href="#_edn1" name="_ednref1">[i]</a> Someone hearing this story in the first century would have thought, “Seven seals? Oh, it was a will.”</p>
<p>In the Roman Empire, wills (as in a Last Will and Testament) were officially registered and filed at the government office. This was too expensive and official for most folks. There was another method (<em>Gaius</em> 2.147). A person invited the heir, the executor and (usually) five witnesses to attend. He dictated his will to a secretary. When the document was finished, it was rolled up. Each person attested that it was correct and official by wrapping a string around it, tying it, putting a drop of wax on his knot and then pressing his seal into the wax. Thus the will would have seven seals.</p>
<p>When it was time to make the inheritance official, the heir and the executor had to be there and a majority of the witnesses. A papyrus from A.D. 325 actually describes the opening of a will:</p>
<p>The executor says to the secretary: “In the presence of whom did you make out the will?”</p>
<p>The notary answers: “The signatories.”</p>
<p>The executor asks, “How many signatories are there?”</p>
<p>The notary answers, “Seven, and four are present.”</p>
<p>The executor says, “Let the four subscribe that they have recognized their own seals.”</p>
<p>After the signatories present had subscribed that they recognized their own seals, the will was opened and read.<a href="#_edn2" name="_ednref2">[ii]</a></p>
<p>Now, we understand <em>their</em> background (rather than reading ours into the text). Revelation 5 is about the opening of a will. We are also told that even rolled up, you could see the book was written on both sides, indicating that the entire document was full of text; it’s a will with a lot of stuff in it. The setting in the Revelation is a heavenly throne scene. The will is the Will and Testament of the Father.</p>
<p>John weeps because none of the seven were there to open the will. Then the Lamb steps forward. He opens all seven—<em>that</em> was the part we were to supposed to notice. He is the Heir <em>and</em> the Executor of the will. More than that, he is all five witnesses. The Will of the Father was written before anyone else was around, since there had been no one else to witness it. We see in visionary form what other Scriptures also tell us. The Father’s plan was made before creation and the Son will inherit everything.</p>
<p>A little research can throw a lot of light on a verse.</p>
<p>________________________</p>
<h6><a href="#_ednref1" name="_edn1">[i]</a> E. Randolph Richards, “Scrolls, Books and Seals,” <em>The Biblical Illustrator</em> (Summer 2015): 90-92.</h6>
<h6><a href="#_ednref2" name="_edn2">[ii]</a> Condensed from POxy. LIV 3758.</h6>
<h6>The beautiful image of a scroll is from <span dir="ltr"><a href="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj9oMim1ITOAhULph4KHTXGAZsQjB0IBg&url=https%3A%2F%2F924jeremiah.wordpress.com%2F2015%2F07%2F08%2Fapplying-revelation-5-jesus-is-awesome%2F&psig=AFQjCNFjkEYa1pDwkeCDEDri4Y_QpG9ygA&ust=1469194002381548" target="_blank" rel="noopener">924jeremiah.wordpress.com</a>. </span></h6>`,
    url: '',
    date: '2016-07-21',
    image: IMG('placeholder.jpg'),
    excerpt: `I was invited to contribute an article for a popular Christian magazine about reading the Bible better. I suggest “What this verse means to me is …” can be a very poor way to start a Bible study discussion. It implies a verse can mean one thing to one person and something else…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'lex-talionis',
    category: 'bible-culture',
    title: `Lex talionis`,
    publication: 'randolphrichards.com',
    slug: 'lex-talionis',
    content_html: `<p>The <em>lex talionis </em>(Latin for the law of retaliation), popularly known as “an eye for an eye,” was the ancient law to curb escalation. Culturally, when someone hurt your brother, you killed that person. If someone killed your brother, you killed him plus a couple more. This “reciprocation+some” might have been intended as a deterrent, but it usually resulted in merely escalating violence. The <em>lex talionis</em> spoke into this and attempted to limit escalation. The part that “went without being said” (which is usually the most important part) was “an eye for an eye <em>and nothing more.</em>”</p>
<p>The <em>lex talionis </em>is found in the Old Testament law:</p>
<p>But if there is serious injury, you are to take life for life, eye for eye, tooth for tooth, hand for hand, foot for foot, burn for burn, wound for wound, bruise for bruise. (Exod. 21: 23-25)</p>
<p>The biblical context shows it was to <u>limit</u> the retaliation.</p>
<p>In a recent radio interview on WHAM 1180AM, one presidential candidate cited “an eye for an eye” as a favorite Bible verse, adding that considering “how people are taking advantage of us … we can learn a lot from the Bible.” (I left out the name of the candidate because I don’t want this blog to be about politics.)</p>
<p>So, is this a lesson to learn from the Bible? Actually, the <em>lex talionis </em>is one of the few Old Testament commands that Jesus directly <u>overturns</u>:</p>
<p>“You have heard that it was said, ‘Eye for eye, and tooth for tooth.’<strong><sup> </sup></strong>But I tell you, do not resist an evil person. If anyone slaps you on the right cheek, turn to them the other cheek also.” (Matt. 5:38-39)</p>
<p>Jesus exchanges the <em>lex talionis</em> for the gospel of love and forgiveness.</p>
<p>This brings us back to a radio interview. Instead of googling to see who the offender was, so that you can decide if you like this blog post or not, maybe we can learn a better lesson. (Read the posting on Nov. 15 to see the difference between the government punishing wrongdoers and vengeance/retaliation.)</p>
<p>Some might say: “Well, we do live in a crazy world and people <em>are</em> trying to take advantage of us … <em>and </em>really the message of Jesus sounds great, but it doesn’t work in the real world.” Did this thought also cross your mind? Jesus wasn’t offering a suggestion. Paul reminds us the gospel is foolishness to the world: “For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God” (1 Cor. 1:18). The old saying is “the proof of the pudding is in the tasting.” Rome did not turn the other cheek; Jesus did. Who changed the world?</p>
<p>The <em>lex talionis</em> wasn’t Jesus’ favorite verse.</p>
<p> </p>`,
    url: '',
    date: '2016-04-21',
    image: IMG('placeholder.jpg'),
    excerpt: `The lex talionis (Latin for the law of retaliation), popularly known as “an eye for an eye,” was the ancient law to curb escalation. Culturally, when someone hurt your brother, you killed that person. If someone killed your brother, you killed him plus a couple more. This…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'render-unto-caesar',
    category: 'bible-culture',
    title: `Render unto Caesar`,
    publication: 'randolphrichards.com',
    slug: 'render-unto-caesar',
    content_html: `<p>Opponents of Jesus ask a question trying to trap Jesus:</p>
<p><strong><sup>15 </sup></strong>Then the Pharisees went and plotted to entrap him in what he said. <strong><sup>16 </sup></strong>So they sent their disciples to him, along with the Herodians, saying, “Teacher, we know that you are sincere, and teach the way of God in accordance with truth, and show deference to no one; for you do not regard people with partiality. <strong><sup>17 </sup></strong>Tell us, then, what you think. Is it lawful to pay taxes to the emperor, or not?” <strong><sup>18 </sup></strong>But Jesus, aware of their malice, said, “Why are you putting me to the test, you hypocrites? <strong><sup>19 </sup></strong>Show me the coin used for the tax.” And they brought him a denarius. <strong><sup>20 </sup></strong>Then he said to them, “Whose head is this, and whose title?” <strong><sup>21 </sup></strong>They answered, “The emperor’s.” Then he said to them, “Give therefore to the emperor the things that are the emperor’s, and to God the things that are God’s.” <strong><sup>22 </sup></strong>When they heard this, they were amazed; and they left him and went away. (Matt. 22:15-22, NRSV)</p>
<p>Why would a Jew have a denarius with Caesar’s image, especially in the Temple (Matt. 22:20)? In theory, one major purpose of the moneychangers was to keep coins with a “graven image” out of the Temple. The <a href="https://en.wikipedia.org/wiki/Tiberius#/media/File:Emperor_Tiberius_Denarius_-_Tribute_Penny.jpg">coin</a> was engraved with Caesar’s image and this inscription:</p>
<p>Ti[berivs] Caesar Divi Avg[vsti] F[ilivs] Avgvstvs</p>
<p>“Caesar Augustus Tiberius, son of the Divine Augustus”</p>
<p>It was a classic example of breaking the Second Commandment.</p>
<p>Why would any Jew have such a coin, since there were other options? Rome allowed many provincial cities around the empire to mint cheaper bronze coins, including 38 cities in Judea or Palestine. But only a few select cities outside of Rome were allowed to mint the gold aureus and the silver denarius<a href="#_edn1" name="_ednref1">[i]</a>; only Caesarea Philippi in Palestine. Rome carefully oversaw these coins.</p>
<p>Gold and silver coins were always at risk of shaving or “clipping.” Thieves sought to discreetly remove a bit from the edges of these coins and then pass the coins along. The industrial revolution produced machined coins that could have milling or reeding. Our American dimes and quarters were originally of precious metal and still have milling—the ridges on the edges of coins. Machines also made perfectly round coins. All these things reduced the chance of clipping. Shaving, clipping and plugging coins was a big problem, even in antiquity. How did ancients avoid this? Mainly, it was <em>caveat emptor</em>: let the buyer beware. Have you seen old movies where people held up coins to look at them (to check for clipping) or bit them to see if they were soft metal (to check if it was real gold or silver)? Rome had another method as well. They fiercely pursued those who counterfeited or clipped coins. Roman coins were preferred to provincial ones because Rome enforced honest coins (brutally with the sword). Rome also kept the highways safe from bandits and the seas safe from pirates, also brutally. Roman soldiers were everywhere. Jesus tells the Temple crowd, if you want Caesar to keep the money honest, then you have to pay his taxes (Matt. 22:21).</p>
<p>The Kingdom of God, where no one cheats his neighbor, is the other way to ensure honest money and safe roads. When Jesus said, “Render unto Caesar the things that are Caesar’s, and to God the things that are God’s,” he wasn’t saying some things belong to Caesar and some belong to God. No. (Everything belongs to God.) He was contrasting the two kingdoms: Caesar’s and God’s. Both can offer honest money and safe roads.</p>
<p>There in God’s Temple, Jesus was challenging them to pick which king and kingdom they wanted. Today was tax day in America. Hopefully, you were honest on your taxes. The bigger question is what kept you honest, fear of God or fear of Caesar?</p>
<p>Who’s your king?</p>
<p>________________</p>
<p><a href="#_ednref1" name="_edn1">[i]</a> The aureus and the denarius may have started out as bullion, coins where the value of the metal matched the coin’s value. Theoretically, a silver denarius contained a denarius’ worth of silver. Initially (in 211 BC) the denarius contained 4.5 grams of silver. By the time of Jesus, it was 3.9 grams. By the time of Paul, Nero further debased it to 3.4 grams and reduced the purity from 98% to 93.5%. The Roman denarius is commonly said to be worth one day’s wage. The sole basis for this claim is Jesus’ parable (Matt. 20:2). Jesus’ parable was stressing the generosity of the landowner at harvest. A half-denarius was more commonly a day’s wage. Translating to today’s wages, a denarius was about $125. For more information about the value of a denarius, see <em>Paul and First Century Letter Writing</em> (Downers Grove: InterVarsity Press, 2004), pp. 51-52, 165-69.</p>`,
    url: '',
    date: '2016-04-18',
    image: IMG('placeholder.jpg'),
    excerpt: `Opponents of Jesus ask a question trying to trap Jesus: 15 Then the Pharisees went and plotted to entrap him in what he said. 16 So they sent their disciples to him, along with the Herodians, saying, “Teacher, we know that you are sincere, and teach the way of God in accordance…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'vengeance',
    category: 'bible-culture',
    title: `Vengeance`,
    publication: 'randolphrichards.com',
    slug: 'vengeance',
    content_html: `<p>Vengeance is wrong, right? After all, Paul states: “If possible, so far as it depends on you, be at peace with all men” (Rom. 12:18, NASB). Yet, when we see a great injustice, such as the slaying of innocents, terrorist bombings, the killing of children, our hearts cry out to see vengeance done. Is that sin? Actually, I don’t think so. The problem isn’t vengeance, but who dispenses it.</p>
<p>In the <em>very next </em>verse, Paul says: “Never take your own revenge, beloved, but leave room for the wrath of God, for it is written, ‘Vengeance is Mine, I will repay,’ says the Lord” (Rom. 12:19). Paul recognized it wasn’t possible to live at peace with some folks: “If possible,” he said. Usually it is; sometimes it isn’t. Some people in France just announced that they don’t want to live at peace with us. So, do we whip out a can of … vengeance?</p>
<p>No, vengeance is due, but it is not ours to dispense. “‘Vengeance is Mine, I will repay,’ says the Lord” (Rom. 12:19). Vengeance and wrath belong to the Lord and He dispenses it.</p>
<p>“Oh, here we go”—is what some of you are thinking. “Judgment Day is a too far away. What about <em>now</em>? Is nothing done?” We should not miss Paul’s point, just because a chapter division is in our way. Paul mentioned, “leave room for the wrath of God” (Rom. 12:19). Our Bibles have a chapter end and a new section heading. Paul didn’t have chapters or headings. He is still talking about the wrath of God, when he starts talking about government in the next verses.</p>
<p>In Romans 13:4, Paul states: “for it [government] is a minister of God to you for good. But if you do what is evil, be afraid; for it does not bear the sword for nothing; for it is a minister of God, an avenger who brings <u>wrath</u> on the one who practices evil.” Paul hasn’t changed subjects. The word “wrath” bookends his discussion. (The technical term is an inclusio.) God has appointed <u>governments</u> to be the agent of his wrath. God uses government to be his sword, to bring his judgment and wrath upon evildoers.</p>
<p>As an individual, it is not my job to be the agent of God’s wrath. (Some of you are soldiers and you may be an agent to carry the sword of God’s wrath but only in an official government role.) So, what is my individual role? What Paul said at the beginning: “If possible, so far as it depends on you, be at peace with all men.” Most of the time it actually is possible. Paul reminds us to overcome evil with good (Rom. 12:21). On rare occasions, evildoers do arise. For those, God has established government authorities (Rom. 13:1-3).</p>
<p>God established governments to maintain law and order. But as individuals we need to guard our hearts. When my heart laughs with glee over news footage of planes dropping bombs on evildoers, I am a long way from loving our enemies. When we want to bomb them all to h-ll, we are not reflecting the Gospel. Governments have a necessary role to play. God ordained them. But, friends, which of these is going to change the hearts of men?</p>`,
    url: '',
    date: '2015-11-15',
    image: IMG('placeholder.jpg'),
    excerpt: `Vengeance is wrong, right? After all, Paul states: “If possible, so far as it depends on you, be at peace with all men” (Rom. 12:18, NASB). Yet, when we see a great injustice, such as the slaying of innocents, terrorist bombings, the killing of children, our hearts cry out to…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'peacemaking-and-honoring-veterans',
    category: 'bible-culture',
    title: `Peacemaking and Honoring Veterans`,
    publication: 'randolphrichards.com',
    slug: 'peacemaking-and-honoring-veterans',
    content_html: `<p>All of us are familiar with Jesus’ teachings about peacemaking: <em>“Blessed are the peacemakers.”</em> Peacemaking is a path to being called children of God (Mt. 5:9). Likewise, Paul exhorts us to peacemaking: <em>“If it is possible, as far as it depends on you, live at peace with everyone”</em> (Rom. 12:18).</p>
<p>And then along comes Veterans Day.</p>
<p>Many of us have beloved family members who are veterans. Many have family and friends who are active duty military. So, how do we love our soldiers and still obey the Christian commands to peacemaking? The simplistic answer is that soldiers are peacemakers, that wars are fought to bring peace. Were that always true! Yet, many wars are fought for less noble reasons, such as James notes, “What causes fights and quarrels among you? Don’t they come from your desires that battle within you? You desire but do not have, so you kill. You covet but you cannot get what you want, so you quarrel and fight” (Ja. 4:1-2).</p>
<p>So, if we believe in peacemaking, are we required to be anti-soldiers? By no means!</p>
<p>In fact, Paul, who argues for peacemaking, likes to use soldiers as a <em>positive</em> metaphor: “Join with me in suffering, like a good soldier of Christ Jesus” (2 Tim. 2:3).</p>
<p>How do we respect veterans and honor the sacrifices of our soldiers, and yet speak for peace? More significantly, how can a Christian critique a particular war without being considered a soldier-hater or accused of not being patriotic?</p>
<p>It can start by recognizing an important truth.</p>
<p>Soldiers don’t decide about wars. The decision to go to war is made by elected <u>civilians</u>. A soldier does not have the right to decide whether a war is just. Such would be treason (in addition to chaos). Soldiers do as they are commanded. Obedience is an essential element of soldiering.</p>
<p>Debating the justice of a war is independent of loving and supporting our soldiers. If I were to say that a particular war in such-n-such a place is unjust and we have no business being there, I am NOT critiquing the soldiers who are sacrificing to be there. I am not belittling the families who are undergoing hardships because their soldier is there. Rather, I am critiquing <em>Congress</em>. Soldiers didn’t decide to go there; Congress decided to send them here. Tomorrow, the soldier may be deployed elsewhere. Congress may announce that yesterday’s enemies are today’s allies. If so, the soldier climbs out of one foxhole and into the other. The person he was shooting at yesterday is now the person he is training today. Tomorrow, Congress may announce that they are the “enemy” again. In any case, soldiers do as commanded. Paul notes a soldier works “to please his commanding officer” (2 Tim. 2:4). Ironically, wars are civilian matters, even when soldiers are the ones carrying it out.</p>
<p>Loving our soldiers, supporting our military, and honoring our veterans should be done. Yet they must <u>never</u> be used as a hammer to silence Christians on peacemaking. Speak up for peace. Speak your convictions about whether we should or should not be engaged in a particular war. Critiquing a war is not critiquing soldiers, but a <em>civilian</em> decision. It is possible to honor our veterans without glorifying war.</p>
<p>Honor our vets today and with the same breath, speak for peace.</p>`,
    url: '',
    date: '2015-11-11',
    image: IMG('placeholder.jpg'),
    excerpt: `All of us are familiar with Jesus’ teachings about peacemaking: “Blessed are the peacemakers.” Peacemaking is a path to being called children of God (Mt. 5:9). Likewise, Paul exhorts us to peacemaking: “If it is possible, as far as it depends on you, live at peace with everyone”…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'doing-right-wrong',
    category: 'bible-culture',
    title: `Doing Right Wrong`,
    publication: 'randolphrichards.com',
    slug: 'doing-right-wrong',
    content_html: `<p><span>Is it possible to do that right thing for the wrong reason? Yep. We can do right wrong. Jesus noted this problem. The Pharisees fasted and tithed. Jesus said those were right things to do, but the Pharisees were doing them for the wrong reason (Matt. 6:16-18). As followers of Jesus, we need to do the right thing <i>and</i> we need to do it for the right reasons. When I was a kid growing up in a Baptist church in Texas, our pastor would tell us not to read our horoscope in the local paper. When we asked, “Why?,” he replied, “Horoscopes don’t work.” He was correct that Christians shouldn’t read horoscopes. But he was wrong about why. Astrology is forbidden in the Bible. We are to look to the Creator of the stars, not to the stars, to know our future. </span></p>
<p><span>What’s the problem, as long as we are doing the right thing? Instead of “Don’t read horoscopes, they are forbidden,” we were told, “Don’t read horoscopes, they don’t work.” What happens if I decide that for me, horoscopes do work? Scripture never says that astrology doesn’t work; it says it is forbidden. Soothsayers and augurs are among those God denounces in Deuteronomy 18. God includes astrologers among those he ridicules in Isaiah 47 and Jeremiah 10. </span></p>
<p><span>We can do the right thing but for the wrong reason. </span>Let’s bring it to a contemporary event. Christians are told to live like the Lord could return tomorrow. We are doing right if we are talking about the Lord’s return. But we are doing it for the wrong reason if we expect the Lord’s return because of some astral phenomenon. Reading signs in a blood moon is astrology. If we were expecting the Lord’s return because of the blood moon, we were doing right wrong.</p>
<p>`,
    url: '',
    date: '2015-09-28',
    image: IMG('placeholder.jpg'),
    excerpt: `Is it possible to do that right thing for the wrong reason? Yep. We can do right wrong. Jesus noted this problem. The Pharisees fasted and tithed. Jesus said those were right things to do, but the Pharisees were doing them for the wrong reason (Matt. 6:16-18). As followers of…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'i-lift-up-my-eyes-to-the-mountains',
    category: 'bible-culture',
    title: `I lift up my eyes to the mountains`,
    publication: 'randolphrichards.com',
    slug: 'i-lift-up-my-eyes-to-the-mountains',
    content_html: `<p>Yesterday in the car, I heard a Christian artist introduce his (wonderful) song by quoting this opening line from Ps. 121. The artist then adds that his help doesn’t come from mountains.</p>
<p>He has the gist of the Psalm correct:</p>
<p>I lift up my eyes to the mountains—<br />
where does my help come from? (Ps. 121:1 NIV)</p>
<p>The Psalmist was probably referring to the various temples located on the mountaintops. Scripture usually calls these “high places.” The Psalmist was asking from where does he get his help. Was it from Ba’al Hadad, the god who brings rain? Was it Dagon, the god that makes crops grow? Was it Kathirat, the goddess who brings children to marriage? How about Resheph who heals or Mot who controls death? From where did his help come? He decides:</p>
<p>My help comes from Yahweh (the Lord),<br />
the Maker of heaven and earth. (Ps. 121:2 NIV)</p>
<p>We smile condescendingly at those ancients and their silly beliefs. Okay, but today, where do you look for help when you need children, healing or face death? Americans often turn to technology. In fact, some American Christians leave God out of most of life’s challenges. When we have exhausted all the options of technology, then we sigh and say, “I guess all we can do is pray.” God becomes our last hope instead of our first prayer.</p>
<p>I’m not degrading technology. I’m not arguing Christians should stay home from the doctor. I’m a cancer survivor and grateful for robotic surgery. The issue is whether I am treating God as my backup plan once technology lets me down.</p>
<p>When the challenges of life come, where do you turn <em>first</em> for help? The Psalm is still relevant:</p>
<p><em>I lift up my eyes to the mountains—<br />
where does my help come from?</em></p>`,
    url: '',
    date: '2015-09-01',
    image: IMG('placeholder.jpg'),
    excerpt: `Yesterday in the car, I heard a Christian artist introduce his (wonderful) song by quoting this opening line from Ps. 121. The artist then adds that his help doesn’t come from mountains. He has the gist of the Psalm correct: I lift up my eyes to the mountains— where does my help…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'thank-god-for-the-mosque-down-the-street',
    category: 'bible-culture',
    title: `Thank God for the Mosque Down the Street!`,
    publication: 'randolphrichards.com',
    slug: 'thank-god-for-the-mosque-down-the-street',
    content_html: `<p>I was leading a workshop for local pastors. In the chitchat before my session began, several pastors were venting about usual ministry frustrations—sometimes a healthy thing to do (with trusted friends). In talking about challenges, one exclaimed, “They are building a mosque right down the street!” Before others could say anything, I stated, “Praise God.” The ensuing silence was palpable.</p>
<p>After he picked his chin up off the floor, he asked why I would say that. I offered several reasons. First, it can be very difficult to share the gospel with Muslims in most Muslim countries. There are laws restricting or even forbidding it. We have the <em>Jesus</em> film, Bibles and wonderful Gospel materials in Arabic but unable to use them in many places. All such materials can be freely shared here in America. Second, I hear students say, “I don’t know any Muslims.” Well, with a mosque down the street, it will be easier to find them. I suggested to my pastor friend that he should offer to take the local Imam out to lunch. Or, ask for a tour of the mosque. Likely, you will enjoy some wonderful hospitality. I have always been greeted warmly and treated kindly anytime I have done this. Third, you have a natural avenue for being neighborly—after all, they’re now neighbors. Like other prejudices, getting to really know someone helps to break down stereotypes. Make a friend.</p>
<p>It is a marvel to me that many Christians can have a warm relationship with the Buddhist who owns a local restaurant but not the Muslim who owns a local shop. Shame on us, if that is true.</p>
<p>You see, God has brought them to your doorstep, so that they can meet a kind and gracious follower of Christ. Many of my Muslim friends were taught growing up that Christians are immoral, that Christians hate them. Prove them wrong! Like Lazarus, God has placed them at your gate. Thank God for the mosque down the street.</p>`,
    url: '',
    date: '2015-08-20',
    image: IMG('placeholder.jpg'),
    excerpt: `I was leading a workshop for local pastors. In the chitchat before my session began, several pastors were venting about usual ministry frustrations—sometimes a healthy thing to do (with trusted friends). In talking about challenges, one exclaimed, “They are building a mosque…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'shifting-our-approach-on-abortion',
    category: 'bible-culture',
    title: `Shifting our Approach on Abortion`,
    publication: 'randolphrichards.com',
    slug: 'shifting-our-approach-on-abortion',
    content_html: `<p>For decades evangelicals have denounced abortion. (Personally, I am adamantly pro-life, from womb to tomb.) God was angry when the Egyptians tossed Hebrew babies in the Nile. I suspect he is still pro-babies.</p>
<p>Evangelicals are losing the abortion debate in America. Denying this fact doesn’t change it. Electing a different politician hasn’t helped. Both political parties have enjoyed terms where they alone controlled congress and the White House. It didn’t result in criminalizing abortion. The old cliché about insanity seems to apply to evangelicals. We keep trying the same thing, hoping for different results.</p>
<p>May I suggest a different approach? We have been taking an all-or-nothing position. When we insist (in the public arena) for banning all abortions, our opponents will dredge up the most heart-wrenching story of a mother’s endangered life or tragic victimization. Christians are left looking heartless. In the arena of public opinion, we lose the debate because we allowed ourselves to be cornered into discussing the rarest instances of abortion, rather than the more easily critiqued ones.</p>
<p>Paul was not a supporter of idols; yet, he didn’t walk down the streets of Athens, knocking idols off the pedestals lining the road. He didn’t stand in the foyers of temples denouncing idols. Recognizing the limits of where he was, Paul made a philosophical argument (Acts 17). It may not be Paul’s best argument for the Gospel. It can be critiqued for not presenting the complete Gospel. But it was a great choice for starting a public discussion with Stoic philosophers. Let’s learn a lesson from Paul.</p>
<p>I suggest we consider arguing (in the public arena) for “Reducing the number of abortions.” Let us not get cornered in the weeds of the rare, heart-wrenching cases. I prefer to a debate where the other position is, “Let’s keep or increase the current number of abortions.” I’m not suggesting this is our final position on abortion, our last stance, merely a next step in the political debate. Can we not celebrate a victory of reducing the number?</p>
<p>We need to get in and advocate for what we think it right. Politics (laws) determine what will or will not be legal in our country, so let’s make a political argument.</p>
<p>Let’s try something other than our current all-or-nothing stance (since currently all we are getting is nothing). Perhaps it is time for a little Mars Hill strategy.</p>`,
    url: '',
    date: '2015-08-14',
    image: IMG('placeholder.jpg'),
    excerpt: `For decades evangelicals have denounced abortion. (Personally, I am adamantly pro-life, from womb to tomb.) God was angry when the Egyptians tossed Hebrew babies in the Nile. I suspect he is still pro-babies. Evangelicals are losing the abortion debate in America. Denying this…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: '666-the-mark-of-the-beast',
    category: 'bible-culture',
    title: `666 The Mark of the Beast`,
    publication: 'randolphrichards.com',
    slug: '666-the-mark-of-the-beast',
    content_html: `<p>I’ve read the speculations that the “mark of the Beast” will be some government tattoo or maybe a barcode. Maybe it will be a microchip under the skin on the back of my hand. Any of those options makes me feel safe. I can look at my hand and say, “Nope, I ain’t got one. I’m good.” I can glance over at you. “Yep, you’re okay, too.” What if the mark isn’t barcodes or the covid vaccine–yep, that’s a <a href="https://www.patheos.com/blogs/progressivesecularhumanist/2020/10/christian-group-warns-new-covid-vaccine-is-mark-of-the-beast/">thing</a>. What if John meant the same thing as James: keeping ourselves unstained by the world (Ja. 1:27)? (For a discussion of what John’s readers likely understood, read <a href="https://www.patheos.com/blogs/keithgiles/2018/06/the-mark-of-the-beast-revealed/">here</a>.)  What if John was warning us not to have the world’s mark on what I think or what I do?</p>
<p>Rather than looking at today’s technology, maybe we should look back at the Bible. What would John’s readers have thought when they read about putting something on your head and hands? (Hint: it wouldn’t have been microchips.) I suspect any Jewish reader would have thought immediately about Deuteronomy 6. We are to love God’s commandments and cherish them in our hearts. We are to “Tie them as symbols on your hands and bind them on your foreheads” (Deut. 6:8). While some folks literally do that, perhaps we are being encouraged to keep it near, to have God’s law govern what we think and do. It should mark who we are. Whose mark is on us?</p>
<p>When we cut corners or bend rules at the office and then justify it with “That’s just the way business is done,” we may have the world’s mark on our hand. If we pad the numbers on our income tax return because “Everybody does it,” we may have the beast’s mark on our forehead. We’ve allowed the world to stain us.</p>
<p>When I pull out my wallet and reach my hand in, whose mark is on my hand, God’s or the world’s? I should stop looking for a tattoo and look at how I spend my money.</p>
<p>It sure is easier to feel complacent if I only have to worry about a 666 tattoo.</p>
<p>Whose mark is on your hand?</p>`,
    url: '',
    date: '2015-08-12',
    image: IMG('placeholder.jpg'),
    excerpt: `I’ve read the speculations that the “mark of the Beast” will be some government tattoo or maybe a barcode. Maybe it will be a microchip under the skin on the back of my hand. Any of those options makes me feel safe. I can look at my hand and say, “Nope, I ain’t got one. I’m…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'idol-meat-and-confederate-flags',
    category: 'bible-culture',
    title: `Idol Meat and Confederate Flags`,
    publication: 'randolphrichards.com',
    slug: 'idol-meat-and-confederate-flags',
    content_html: `<p>Let me talk to you about meat sacrificed to idols. It was a problem in Corinth. Temples in antiquity sacrificed animals. The meat not used by the temple priests was sold in the local meat market. Jews (and thus Christians) were able to have their own kosher market. Later the Romans shut down the kosher market. Now Christians had a problem. <em>Technically</em> any meat they bought had been sacrificed first to an idol. For some Christians, it was only <em>technically</em> sacrificed; for others, it was <em>really</em> sacrificed.</p>
<p>Lots of good Christian folk in Corinth knew that “idols were nothing” (1 Cor. 8:4). But there were other Christians in Corinth who had a bad history with idols. For them, that meat was “tainted.” It troubled them (1 Cor. 8:7). They couldn’t eat it and they had a hard time with the Christians who did. The “strong” Christians (to use Paul’s terms) knew there wasn’t really anything wrong with the meat. They ate it with a clear conscience.</p>
<p>What should the strong Christians do? We should just tell those other Christians to “get over it.” It is our right to eat the meat if we want. What gives these other Christians the right to impinge on our rights and tell us to quit eating the meat?</p>
<p>Wait. That’s not what Paul said. He stated, “if what I eat causes my brother or sister to fall into sin, I will never eat meat again” (1 Cor. 8:13).</p>
<p>As a Southerner myself—a proud Texan—I understand those who say, “The Confederate flag is just a sign of Southern pride. It has nothing to do with racism.” I get it. For some Christians, this is completely true. When I hear this, though, I am hearing someone defending their rights. Paul says in the same letter that love doesn’t demand its rights (1 Cor. 13:5). In such matters, Christians lay aside their rights for their Christian brothers. “It’s just a flag”; yes, but there are Christian brothers who are troubled by it. If eating meat offends my brother, I won’t do it again.</p>
<p>Learn a lesson from Paul, my friends. Put away the flags.</p>`,
    url: '',
    date: '2015-07-22',
    image: IMG('placeholder.jpg'),
    excerpt: `Let me talk to you about meat sacrificed to idols. It was a problem in Corinth. Temples in antiquity sacrificed animals. The meat not used by the temple priests was sold in the local meat market. Jews (and thus Christians) were able to have their own kosher market. Later the…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'notoriety-versus-fame',
    category: 'bible-culture',
    title: `Notoriety versus Fame`,
    publication: 'randolphrichards.com',
    slug: 'notoriety-versus-fame',
    content_html: `<p>A student remarked, “She’s famous.” What for? I asked. When he described her misbehaviors, I realized my student really meant the woman had notoriety, that is, “being well known for a bad quality or deed.”</p>
<p>I’ve noticed folks sometimes confuse notoriety and fame. Very public bad behavior will usually result in notoriety. Let’s take an ancient example. Over two thousand years ago, Cleopatra’s bad behavior gained her notoriety. She moved with her boy-husband to Rome but lived openly with her Roman lover, Anthony. She had notoriety, not fame. When an athlete is a hothead and has a habit of punching in the nose those with whom he disagrees, he will quickly gain notoriety.</p>
<p>When we confuse notoriety with fame, we suggest to other people that somehow this person is to be emulated. A young impressionable person may want to “be like that famous person.” The difference between notoriety and fame may sound like mincing words. Maybe it is just a small difference, but it may be a difference that matters.</p>
<p>Notoriety usually doesn’t take much talent; it’s not admirable, and it shouldn’t be imitated.</p>`,
    url: '',
    date: '2015-07-20',
    image: IMG('placeholder.jpg'),
    excerpt: `A student remarked, “She’s famous.” What for? I asked. When he described her misbehaviors, I realized my student really meant the woman had notoriety, that is, “being well known for a bad quality or deed.” I’ve noticed folks sometimes confuse notoriety and fame. Very public bad…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'a-handshake-means-nothing',
    category: 'bible-culture',
    title: `A Handshake Means Nothing?`,
    publication: 'randolphrichards.com',
    slug: 'a-handshake-means-nothing',
    content_html: `<p>Recently a young professional basketball player, agreed to play for a specific team. He “verbally agreed” and “they shook on it.” In other words, <em>he gave his word</em>. He later signed a contract with another team. When asked if he should have switched, a commentator, Jason Whitlock, thought it was okay, replying, “A handshake means nothing.” Wow. That statement has haunted me for days.</p>
<p>It seems clear the player needs people to give him better advice. Perhaps he should have gone to the first owner privately and asked to be released (Prov. 6:1-5). I don’t want to get into basketball dynamics, whether those meetings indicated current intentions or were seen as binding. Perhaps it is understood in the back rooms that both player and owner can change their minds. I’ve never been in those backrooms. Maybe the entire event was staged. I’m concerned with how it is played out in the media, the public story, how society is interpreting the event.</p>
<p>In the media, the story is that he gave his word, but he hadn’t signed a contract and so it doesn’t matter. I am struck by the comment, <em>A handshake means nothing. </em>Well, it was his <em>word</em>. The commentator is partly correct. For the player, <em>his</em> handshake means nothing. The player is young. I don’t really fault him. The larger issue shouldn’t be about whether this player is better suited for one team or another. We have lost sight of the forest for the trees. Where was the adult man, the father or father-figure, to teach this young man about honor? Is it just me? I am concerned the public message is that a person’s word doesn’t count; only signed papers count. The poor lad sold his honor; now his handshake means nothing. And at least some of society are looking on and nodding approval. What are we teaching the next generation?</p>
<p>Decide now, before a crisis moment, when you give your word, what it will mean. Sometimes it will hurt to keep your word. When the Psalmist describes a righteous man, he includes “keeps an oath even when it hurts” (15:4). When you “shake on it,” those around you should know that your word means something. Even if no one else cares if you keep your word, <em>you</em> should care.</p>
<p>What does <em>your</em> handshake mean?</p>`,
    url: '',
    date: '2015-07-14',
    image: IMG('placeholder.jpg'),
    excerpt: `Recently a young professional basketball player, agreed to play for a specific team. He “verbally agreed” and “they shook on it.” In other words, he gave his word . He later signed a contract with another team. When asked if he should have switched, a commentator, Jason…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: 'redefining-marriage',
    category: 'bible-culture',
    title: `Redefining Marriage?`,
    publication: 'randolphrichards.com',
    slug: 'redefining-marriage',
    content_html: `<p>Is the Supreme Court really redefining marriage for the Church? Many of us think the short answer is “no.” Christians in the USA will need to clarify our language (like Christians already do in much of the world). We currently talk generically about “marriage.” So we say, “The Supreme Court has redefined marriage.” I think we need to introduce adjectives into our discussion of “marriage.” We need to distinguish between Christian marriage and legal marriage or civil marriage. Civil marriage in America will end up being whatever combination of men, women and animals that the American government chooses to acknowledge. As citizens of a country, we must acknowledge a legal marriage. We do not have to recognize it as Christian. As citizens, we must also allow all the civil rights of civil marriage to apply to all forms of civil marriage.</p>
<p>I am always better off if I can quote C. S. Lewis, who asked,</p>
<p>“My own view is that the Churches should frankly recognize that the majority of the British people are not Christians and, therefore, cannot be expected to live Christian lives. There ought to be two distinct kinds of marriage: one governed by the State with rules enforced on all citizens, the other governed by the church with rules enforced by her on her own members. The distinction ought to be quite sharp, so that a man knows which couples are married in a Christian sense and which are not.“(from <em>Mere Christianity</em> in The Complete C. S. Lewis Signature Classics, repr. ed., [HarperCollins, 2009], p. 95).</p>
<p>In Indonesia (the most populous Muslim nation), churches do “Blessing Services” on marriages. The government issues marriage licenses. Couples who wish to have a Christian marriage ask the Church to bless their civil marriage. (In Indonesia, the wedding gown, etc., is used in the blessing service.) In Indonesia, Christian ministers did not legally endorse or officiate the marriage licenses. Rather, they bless Christian marriages.</p>
<p>If we stay in the business of being agents of the American government in officially signing government marriage licenses, then we may well be required to officiate all civil marriages. I might suggest our role is to recognize which civil marriages are Christian marriages and to pray God’s blessing upon those.</p>`,
    url: '',
    date: '2015-07-10',
    image: IMG('placeholder.jpg'),
    excerpt: `Is the Supreme Court really redefining marriage for the Church? Many of us think the short answer is “no.” Christians in the USA will need to clarify our language (like Christians already do in much of the world). We currently talk generically about “marriage.” So we say, “The…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
  {
    id: '4th-of-july-in-philippi',
    category: 'bible-culture',
    title: `4th of July in Philippi`,
    publication: 'randolphrichards.com',
    slug: '4th-of-july-in-philippi',
    content_html: `<p>The ancient city of Philippi was founded by Roman vets. They were very proud of their citizenship. Rome’s slogan was “Peace and Safety.” Rome kept the peace by military force. Philippi’s citizens were proud they were peacemakers. Jesus reminded his disciples that he doesn’t bring peace the way the world (Rome) did: “My peace I give you. I do not give to you as the world gives” (Jn. 14:27). Paul added to the folks in Macedonia: “While people are saying, ‘Peace and safety,’ destruction will come on them suddenly, as labor pains on a pregnant woman, and they will not escape” (1 Thess. 5:3). Rome killed its enemies. Jesus died for his (Rom. 5:8).</p>
<p>Because the folks in Philippi were so proud of their citizenship, Paul added a stern reminder, “But our citizenship is in heaven” (Phil. 3:20). Sometimes Christians need to be reminded where their loyalties should lie.</p>`,
    url: '',
    date: '2015-07-07',
    image: IMG('placeholder.jpg'),
    excerpt: `The ancient city of Philippi was founded by Roman vets. They were very proud of their citizenship. Rome’s slogan was “Peace and Safety.” Rome kept the peace by military force. Philippi’s citizens were proud they were peacemakers. Jesus reminded his disciples that he doesn’t…`,
    featured: false,
    content_type: 'native',
    comments_enabled: true,
  },
]
