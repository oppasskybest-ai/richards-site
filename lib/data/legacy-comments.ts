// Real reader comments recovered from the old WordPress site export.
// Extracted and matched to article slugs, deduped across scraped page
// duplicates, and threaded (parent_wp_id) based on original document order.
// Consumed by app/api/admin/seed/route.ts -- inserted once per WP comment id,
// safe to re-run (skips anything already in the DB).

export interface LegacyComment {
  wpId: string
  parentWpId: string | null
  author: string
  date: string
  body: string
  isOwnerReply: boolean
}

export const LEGACY_COMMENTS: Record<string, LegacyComment[]> = {
  "the-widows-mites": [
    {
      wpId: "162", parentWpId: null, isOwnerReply: false,
      author: `Michael`, date: "2017-01-15T23:26:19-06:00",
      body: `I look forward to all of your posts. I struggle so often with the issue of tithing. I’ve heard some churches consider it a non negotiable, “Give your 10%.” And I have heard a few pastors give argument against the notion of tithing but instead teach that 100% belongs to God and you should give what you set outside in your heart to give. This is always such a touchy subject. What are your beliefs on tithing?`,
    },
    {
      wpId: "163", parentWpId: null, isOwnerReply: false,
      author: `bjmanning1`, date: "2017-01-16T08:31:11-06:00",
      body: `Good Morning Dr. Richards and thanks for the reminder and perspective. Context is so important and often a challenge to remember, especially when there is limited time to prepare a message. I read your posts often, and am encouraged many times by what you share. Today is a holiday so I have a little more time to sit still and reflect. You and Stacia are often in my thoughts and prayers. Our congregation is very small and shrunk to a point where we can’t minister effectively. We are planning to merge with another church, we don’t know where yet, but we met yesterday to identify what is important to us. the number one thing that was stated was Bible based preaching, like “our pastor” does. I would ask that you lift a simple prayer that I would always be faithful to the text. I have long since lost most of my greek and never got to the Hebrew, but I want to “rightly divide the word” each time I teach or preach. Give Stacia a big hug for me. I miss you guys and hope to see you in the near future. God bless, Billy >`,
    },
    {
      wpId: "164", parentWpId: "162", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2017-01-16T10:30:15-06:00",
      body: `The first viewpoint is based upon a rather traditional reading of Old Testament texts on the tithe. The second viewpoint derives from reading the New Testament, particularly 2 Corinthians 8–9. If someone really believes that 100% belongs to the Lord, then there can be no complaints about giving 10%. Someone might well give less, if their financial situation was particularly dire. For example, someone may have made very poor decision in the past and be buried in debt. With the assistance of a (Christian) financial counselor, they are working aggressively to get out of debt. Then they will begin a sensible plan of giving, saving, and living on the rest. We should not, though, use the NT viewpoint as a means to rationalize giving little to the Lord. Personally, when someone asks me about tithing, I often encourage them to figure out what they are currently giving. Increase it one percent. Then every year (perhaps on their birthday), increase it another one percent until they arrive at what seems like the balance of “giving, saving and living on the rest” that pleases the Lord.`,
    },
    {
      wpId: "165", parentWpId: null, isOwnerReply: false,
      author: `JMOBTCP`, date: "2017-01-16T14:06:34-06:00",
      body: `Thank you Randy, this practice of some is painfully familiar! JMO >`,
    },
    {
      wpId: "166", parentWpId: "165", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2017-01-16T15:04:19-06:00",
      body: `JMO, there are some pastors whom I would always trust to handle Scripture faithfully. You are one of them. May you be salt and light in your new ministry, not just to your congregants but also to those ministers whom you can mentor. I’d love to find my way up to your new church one day, the Lord willing.`,
    },
  ],
  "render-unto-caesar": [
    {
      wpId: "123", parentWpId: null, isOwnerReply: false,
      author: `Nick Dan`, date: "2016-04-18T18:18:26-05:00",
      body: `Wow. That’s such a good post, Dr. Richards!!`,
    },
    {
      wpId: "124", parentWpId: "123", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2016-04-19T10:33:19-05:00",
      body: `Nick, I’m glad you are enjoying the posts.`,
    },
    {
      wpId: "1983", parentWpId: null, isOwnerReply: false,
      author: `Angelina C`, date: "2022-12-12T11:01:30-06:00",
      body: `Hi thankks for sharing this`,
    },
  ],
  "dewesternizing-the-christmas-story-post-3-the-main-vs-the-minor-characters": [
    {
      wpId: "2842", parentWpId: null, isOwnerReply: false,
      author: `bjmanning1`, date: "2024-12-13T10:16:45-06:00",
      body: `Hey Doctor Richards, Merry Christmas, Feliz Navidad, and Heilicha Freinachten. So I missed these post when they came out last year. I was doing a search for the name Putti this morning and they appeared. Unfortunately the last email had no text. Wondering if you could resend it. I found the 1st 2 very interesting and am forwarding them to a friend, John Spencer. Turns out you and John have some things in common. You have both spent time on military bases. You have both been involved in Young Life. You both were missionaries. You both have wonderful wives. You both has a similar sarcastic humor. You both have a bent for seeing scripture thru the eyes of those who lived it, although yours it probably somewhat stronger. He is a huge fan of you writings. John and Marci are headed back to a military base, the mission field and Young life in February as the are being assigned to Fort Horn? in upper New York. John also has a very good podcast called âthe Daily Grindâ (ok, you both like coffee). I could definitely see my friend John asking my friend Randy to show up on his podcastâ¦ Anyway, Have enjoyed the first 2 posts and would like to read the 3rd if possible. Love you 2 snow birds. Billy >`,
    },
    {
      wpId: "2845", parentWpId: "2842", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2024-12-17T14:34:58-06:00",
      body: `Hey, ol’ friend. It is always great to hear from you. I trust you and Irma are doing well.`,
    },
    {
      wpId: "2846", parentWpId: "2845", isOwnerReply: false,
      author: `bjmanning1`, date: "2024-12-17T19:18:39-06:00",
      body: `Thank You sir, and we are all relatively well here. >`,
    },
  ],
  "peacemaking-and-honoring-veterans": [
    {
      wpId: "106", parentWpId: null, isOwnerReply: false,
      author: `kpt5`, date: "2015-11-12T10:50:13-06:00",
      body: `Well put. Kellianne Jordan`,
    },
    {
      wpId: "107", parentWpId: null, isOwnerReply: false,
      author: `Istanjules`, date: "2015-11-12T15:52:45-06:00",
      body: `This is excellent. As the daughter, granddaughter, and sister of servicemen–yet at heart a pacifist–I struggle with this often. I am very proud of “my soldiers.” I am also dedicated to the Prince of Peace. Thank you for putting it in perspective.`,
    },
    {
      wpId: "132", parentWpId: null, isOwnerReply: false,
      author: `Marty S. Dalton`, date: "2016-07-14T10:50:40-05:00",
      body: `Can you address this from a non-American perspective please? It seems like you’re shifting the blame of the “badness” of war and soldiers’ actions to Congress. Use a hypothetical that isn’t the US. Or even use a militia, that’d be more applicable to coming up with a governing thought or ethic. Are we not responsible for our individual actions? Why do soldiers get a pass simply because they’re obeying? Obeying corruption doesn’t make you a hero.`,
    },
    {
      wpId: "133", parentWpId: "132", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2016-07-14T13:00:24-05:00",
      body: `Marty, thank you for your comment. I have a phrase I like to use: “Generalizations are always wrong and usually helpful.” Most metaphors, illustrations (even parables) will breakdown when pushed past a point. If an action is “corrupt”–to use your term–there is a place for conscientious objection. Obedience as a soldier would not cover war crimes, inhumane actions, etc. I do, though, fully intend to put the responsibility of any war on the government that made the decision, not upon the soldiers in the field. Again, we can always think of a scenario where this wouldn’t apply. I am reminded of the old case study about lying: what does one do when the Gestapo knocks on your door and you are hiding refugees? As I wrote in an essay, the challenge for me is never that I told the truth in a rare situation where I should have lied. Rather, the challenge for most of us remains the opposite.`,
    },
  ],
  "redefining-marriage": [
    {
      wpId: "1", parentWpId: null, isOwnerReply: false,
      author: `Alyssa Ross`, date: "2015-07-10T14:45:15-05:00",
      body: `Hi Dr. Richards, I think you have very valid points. I hadn’t thought about it in those terms, but there is now a very different definition of a Christian marriage and a civil marriage, so this makes sense. A couple of questions or thoughts. I think you’re suggesting for other laws to change. From my understanding, a Christian blessing on a marriage, thus not actually officiating a wedding, would mean ministers lose the right to legally wed someone, thus losing the responsibility of that same action. Valid and understandable. How do we go about doing that? How is that possible? As a licensed minister, are there parameters one can say, “I accept these, but not those?”`,
    },
    {
      wpId: "2", parentWpId: "1", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2015-07-10T15:31:07-05:00",
      body: `Alyssa, it is good to hear from you. I do believe that the Church has every right (as C. S. Lewis noted) to decide what does and does not constitute Christian marriage. I also think that Christian ministers should think carefully about being an agent of the American government (by signing and thus legalizing government marriage licenses). In fact, I think in some states, the license is already “legal” when the clerk signs it.`,
    },
    {
      wpId: "3", parentWpId: null, isOwnerReply: false,
      author: `Kerry Decker`, date: "2015-07-11T03:24:43-05:00",
      body: `While I think that I understand this argument, I believe that it is seriously flawed. Let me focus on its major error. Marriage is both pre-political and pre-Christian. So the “Christian version” of marriage is not an innovation of the church but a recognition of the true essence of marriage. Everything else is a mere social construct created and imposed by the State. This presents a problem with respect to rights and justice. Any law concerning marriage will be more or less just. So we must ask: Is the law for same-sex marriage more just than protecting and preserving natural marriage? As we know, justice is rooted in the concept of giving to others their due. It seeks the common good. If same-sex marriage is more just, then Christians should not only tolerate it but promote it as proper social policy. But how can a moral wrong be a true civil right? How can it be just to overturn natural marriage only for any social construct? Dr. Martin Luther King Jr. properly understood the relationship of law and justice. Civil law must always serve justice. At the heart of the same-sex marriage debate is our notion of justice, not just as Christians or Americans but as humans. To argue that Christians should tolerate this civil law is to say that Christians should settle for injustice. I think that Dr. King would have parted company with this approach. He sacrificially sought a more just society for all and never counseled Christians to keep their understanding of justice to themselves.`,
    },
    {
      wpId: "4", parentWpId: null, isOwnerReply: false,
      author: `Joshua Baker`, date: "2015-07-12T04:05:05-05:00",
      body: `Hey Uncle Randy! First time I’ve seen anyone else mention this line of thought (besides myself). I agree with you completely, yet reluctantly. My first choice would be to get the government out of marriage. Let there be no legal definition of marriage, and parental rights and property rights can be handled on their own. But if that’s not going to happen, then my second choice would be for the church to withdraw its participation in government-controlled marriage and uphold our own definition and standards for marriage.`,
    },
    {
      wpId: "5", parentWpId: "3", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2015-07-12T20:50:22-05:00",
      body: `Kerry, thank you for your thoughtful reply. I generally don’t reply to replies :), but we may actually have more agreement than it appears. I was not endorsing the current change in marriage laws. I certainly wouldn’t consider it more “just.” My point is that the ruling doesn’t change how Christians understand marriage, only that our government’s definition no longer matches the Christian definition. We can no longer talk about “marriage” as if there is an agreed-upon definition. We will need to clarify what we mean. I can no longer say, “I support marriage.” I must now clarify and say, “I support Christian marriage” or biblical marriage, if you prefer that adjective.`,
    },
  ],
  "living-in-trumps-america": [
    {
      wpId: "159", parentWpId: null, isOwnerReply: false,
      author: `Rachel`, date: "2016-12-29T16:11:26-06:00",
      body: `Well said!`,
    },
  ],
  "a-scroll-with-seven-seals": [
    {
      wpId: "223", parentWpId: null, isOwnerReply: false,
      author: `Ron`, date: "2018-01-15T14:42:34-06:00",
      body: `Ah, the seven seals of ‘Judgement’ upon the earth, not a last will and testament. “Who is worthy to open the scroll and loose its seals?” As we can read, breaking the seals brings forth judgement on the earth by certain calamities. Those on earth will witness these events (as recorded in Revelation) and is written there. As we read through each seal, there is judgement on the earth. To me, judgement and a last will and testament being opened are far apart and is not what John is writing about in Revelation.`,
    },
    {
      wpId: "224", parentWpId: "223", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2018-01-16T10:30:08-06:00",
      body: `Ron, thank you for your comment. I don’t see these conflicting. In order to inherit all things, Jesus must (among other things) judge the world. So as each seal is opened, judgment comes to the world. When judgment is finished, the will is opened and we see that Jesus inherits all things. I will only disagree very slightly with your final comment. I think the main thing about the book of the Revelation is that Jesus is inheriting all things. He truly is the King of Kings. I am glad you are enjoying the blog.`,
    },
    {
      wpId: "252", parentWpId: null, isOwnerReply: false,
      author: `inChrist777`, date: "2018-10-15T14:59:33-05:00",
      body: `Thank you for this explanation. It makes so much sense.`,
    },
    {
      wpId: "632", parentWpId: null, isOwnerReply: false,
      author: `Darrell`, date: "2019-12-17T15:40:05-06:00",
      body: `Great information! I remember reading somewhere that the seven seals were a sign of royalty–that a king had sealed the scroll. Ron, have you heard this view?`,
    },
    {
      wpId: "633", parentWpId: "632", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2019-12-17T20:46:30-06:00",
      body: `Darrell, I have not heard this view. Before either of us buy into such a view, we should ask to see the ancient evidence. Was the writer suggesting that every scroll sent by a king had seven seals? What would be the purpose? In any case, without evidence I would be hesitant to find it credible. Thanks for asking.`,
    },
    {
      wpId: "689", parentWpId: null, isOwnerReply: false,
      author: `Antonnette L Thomas`, date: "2020-06-02T22:30:30-05:00",
      body: `This is eye-opening. I love it. The person who mentioned royalty — that would be about being handed a scroll, not about the seven seals. Moses was told to instruct Israel that the king was to get the book of the law, and one example is Joash being given the “testament” when he was installed amid Athaliah’s treason. Jesus is royalty, the King of Kings, so would be given the testimony, too — but that would not prevent it from also being applicable to a will. Matthew 24 was BOTH about Jerusalem’s destruction in A.D. 70 AND about end times that we now live in, not only one or the other, after all. God bless you.`,
    },
    {
      wpId: "811", parentWpId: null, isOwnerReply: false,
      author: `Who is Worthy? – Ginger Kauffman`, date: "2020-09-28T11:58:04-05:00",
      body: `[…] that you might enjoy. Here are two thoughts about it, similar yet different, that you might enjoy: A Scroll with Seven Seals by Bible teacher and author Randolf Richards and The Scroll with Seven Seals by messianic pastor […]`,
    },
    {
      wpId: "1106", parentWpId: null, isOwnerReply: false,
      author: `Erin`, date: "2021-07-10T10:03:20-05:00",
      body: `In Daniel 12:4, God tells Daniel, “But you, O Daniel, shut up the words and seal the Book until the time of the end….” Does the scroll of Dan 12 have anything to do with the scroll with the 7 seals? (I had once thought so, but this interpretation/revelation of the 7 seals doesn’t jive with that idea). And what is written on the scroll, anyway? Are we told (and did I miss that somewhere??). Thanks!!`,
    },
    {
      wpId: "1291", parentWpId: null, isOwnerReply: false,
      author: `Dominique R JONES`, date: "2021-12-02T12:10:18-06:00",
      body: `THIS IS AMAZING & EYE OPENING. I LOVE END TIME RE REVELATION & YOU BEOKW THIS DOWN BEAUTIFULLY. Thank you for your time & effort in being a watchman for Gods kingdom. I look forward tonreasing your other articles. Keep pressing & teaching Gods people.`,
    },
    {
      wpId: "1309", parentWpId: null, isOwnerReply: false,
      author: `William`, date: "2021-12-29T12:31:48-06:00",
      body: `As the sixth seal is opened, it seems as if “the end has really come”, because of the cosmic changes (sky is rolled up). If one reads the words of the Lord in Luke 21:25-26, they are very similar to the opening of the sixth seal. Now notice what follows in the account given by the Lord: in verse 27 His 2th coming is described. So it feels like the 6th seal is the final seal in the terror on earth… the rolling up of the sky… the second coming of Christ. While in in the account of John on Patmos the sixth seal is followed by the seventh seal, that introduces the next series of the wrath of God being poured out. Has any one a solution to this? Maybe in ancient roman law system the 7th seal was opened before the 6th?`,
    },
    {
      wpId: "1310", parentWpId: null, isOwnerReply: false,
      author: `Randy Richards`, date: "2021-12-30T07:44:25-06:00",
      body: `William, I am not a Revelation scholar at all. You’ll need to consult someone like J. Scott Duvall—a wonderful scholar and a fine Christian gentleman. Let me add one comment of a more general kind. Metaphors are used to make a point. We get in trouble when we push metaphors too far and try to interpret every single point. For example, if we try to interpret every point in Jesus’ parable in Luke 16, then we must conclude that Lazarus goes to heaven because he was poor and the rich man goes to hell because he was rich. That wasn’t Jesus’ teaching. We would be pushing the metaphor too far. The scroll metaphor was telling us that Jesus is the inheritor of all creation. The interpretation of each of the various seals should be settled by the meaning of the text and not from carrying the “will” metaphor too far. Merry Christmas.`,
    },
    {
      wpId: "1367", parentWpId: null, isOwnerReply: false,
      author: `Rocky Jones`, date: "2022-03-28T10:59:11-05:00",
      body: `Thank you for your post and insights, especially your opening point… ” “What this verse means to me is …” can be a very poor way to start a Bible study discussion. It implies a verse can mean one thing to one person and something else to another. Rather, we should start with “What did the verse mean back then?” and then ask, “How does that meaning apply to me today?” If we do not intentionally think about their situation, we will unintentionally assume ours. This is the danger of musing about what a verse could mean instead of doing a bit of research.” Reminded of 2Ti 2:15, “rightly dividing the Word of Truth” emphasizes that there is one RIGHT cut and, by implication, an infinite number of UN-RIGHT cuts, however close they may be. “Measure twice and cut once” is what the apprentice is taught early on. Likewise, as students of the Word, we should be all the more careful and diligent to “rightly divide” this valuable Word of Truth which is before us. Thank you also for posting the pic of the 7-sealed scroll which is what brought me to your blog in the first place. Praise the Lord and Maranatha, Rocky Jones 2 Timothy 2:15 Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.`,
    },
    {
      wpId: "2843", parentWpId: "1309", isOwnerReply: false,
      author: `Stenila`, date: "2024-12-14T00:20:50-06:00",
      body: `This and several other reasons make me think that the chronology in Revelations is not 7 seals, THEN 7 trumpets, then 7 vials. It would not make sense because in the sixth seal, the sun turns black and the moon turns blood red, and the heavens open up to reveal Jesus Christ. To me this doesn’t make sense to happen until the very end. Also, if the sun turned black here, then how does it make sense that during one of the trumpet judgements that come later, the sun is only 1/3 darkened? This makes me think that the seals occur from the beginning throughout the end of the tribulation period, with the trumpets and vials also staggered rather than happening strictly one after the other. (i.e. the 6th seal, 6th trumpet, and 6th vial all happen at the same time, so does the 7th seal, 7th trumpet, and 7th vial judgement, all culminating in a rapid succession of judgements that increase in intensity right before the second coming of Jesus Christ).`,
    },
    {
      wpId: "2844", parentWpId: "2843", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2024-12-17T14:33:42-06:00",
      body: `Dear Stenila, you have discovered on your own what other scholars have also noted. The Revelation (like many biblical books) doesn’t do chronology like modern Westerners. They believed in “orderly” (see Luke 1:3), but their idea of orderly is different from ours. Often, they preferred thematic or geographic or other ways to organize a story. For instance, Luke tells the gospel story with every story getting closer to Jerusalem. Luke then continues in his second volume (Acts) by telling each story as one step further from Jerusalem. So Acts 1:8 is also the order of the stories Luke tells. So, Luke’s story only has Jesus visiting Jerusalem at the end of his ministry. John mentions that Jesus visited at least four times. May I commend to you a commentary on the Revelation that you might enjoy reading by J. Scott Duvall. Here’s an Amazon link: https://a.co/d/7ibBirG .`,
    },
    {
      wpId: "2850", parentWpId: "1309", isOwnerReply: false,
      author: `Kevin Pydde`, date: "2025-11-08T13:14:41-06:00",
      body: `I think that the Seals- which are visible, and made to be identified and read – are a ‘Table of contents or an overview of what is to come… I.e., what’s inside the scroll. SEAL 6 – talks of Rev. 22 and the River of life. So many “theologians” try to fit the seals into the timeline wherever they can – thus making Revelation scatterbrained. If read as an overview – everything makes sense and the timeline flows smoothly`,
    },
  ],
  "praying-them-in-rather-than-out": [
    {
      wpId: "2840", parentWpId: null, isOwnerReply: false,
      author: `Billy Manning`, date: "2024-06-23T16:33:12-05:00",
      body: `Thank you Dr. Richardâs. With 5 grandsons ranging form 15 years to 11 months, I consider this great advice. God Bless, billy PS. Never been to Wisconsin before, but July 5th we have a connecting flight in Madison between Charlotte, NC and DFW. lol Sent from my iPad >`,
    },
  ],
  "lost-her-battle-with-cancer": [
    {
      wpId: "181", parentWpId: null, isOwnerReply: false,
      author: `Joseph Warner`, date: "2017-06-06T19:48:43-05:00",
      body: `Wonderful. We are more than conquerors through a Him Who loved us…gave Himself for us! Thanks for correcting that theological error!`,
    },
  ],
  "notoriety-versus-fame": [
    {
      wpId: "2849", parentWpId: null, isOwnerReply: false,
      author: `Glen`, date: "2025-04-02T12:26:00-05:00",
      body: `I agree with the distinction between notoriety and fame because positive role models are important.`,
    },
  ],
  "the-antichrist": [
    {
      wpId: "168", parentWpId: null, isOwnerReply: false,
      author: `Rachel`, date: "2017-02-08T16:33:47-06:00",
      body: `Yes to this! No Jesus? Then, no thank you. #GiveMeJesus`,
    },
    {
      wpId: "173", parentWpId: null, isOwnerReply: false,
      author: `William Cifuentes`, date: "2017-02-13T05:11:06-06:00",
      body: `We must be extremely watchful. For our own sake, but more for the sake of our loved ones. Chances are they don’t have a Pendeta.`,
    },
  ],
  "complegalitarian": [
    {
      wpId: "156", parentWpId: null, isOwnerReply: false,
      author: `Dennis Phelps`, date: "2016-12-15T11:48:38-06:00",
      body: `O, you “troubler of Israel” (1 Kings 18:17). 🙂`,
    },
  ],
  "mary-and-martha-lk-1038-42": [
    {
      wpId: "217", parentWpId: null, isOwnerReply: false,
      author: `dheagle93`, date: "2017-10-16T10:25:48-05:00",
      body: `Reblogged this on Learning, Teaching, and Laughing and commented: Dr. Richards has some very excellent points here—take up and read!`,
    },
  ],
  "my-yoke-is-easy": [
    {
      wpId: "806", parentWpId: null, isOwnerReply: false,
      author: `Marge Worten`, date: "2020-09-23T20:21:06-05:00",
      body: `Thank you. Wonderful explanation which makes His words come alive. This is the first “post” we’ve gotten from you. Make sure we are on your list for all of them. We think about you and Stacia often. You certainly gave your sons an eye for beauty, judging by the wives they chose. We would love to see you and Stacia as grandparents. About the time Covid started, Von’s pulmonary fibrosis took a turn for the worse. He is now on oxygen 24/7, and walking from his chair to the bathroom leaves him too breathless to talk. We are both filled with gratitude for the wonderful life we have had. I am thankful that he that he is neither senile nor in pain. Vance and Juni are in OK for a few months. We are faring sumptuousness as Juni is cooking most of our meals. Stephanie and Anthony will arrive in November so our family will celebrate Thanksgiving and Christmas together. Three of our grandsons (Jeremy & Aaron Worten and Nate Croft) are in Wm Carey University in Hattiesburg, MS. Carey will go virtual (on-line) from Thanksgiving through Christmas, so we will get to see lots of everybody before their parents & siblings return to SE Asia. God is so good. Von and I are thankful that He put your family in our lives! Blessings on you, Marge`,
    },
  ],
  "thank-god-for-the-mosque-down-the-street": [
    {
      wpId: "95", parentWpId: null, isOwnerReply: false,
      author: `kpt5`, date: "2015-08-21T08:38:31-05:00",
      body: `As an old student of yours it is so refreshing to still receive your wisdom, even after all these years! : ) Kellianne Jordan`,
    },
    {
      wpId: "96", parentWpId: null, isOwnerReply: false,
      author: `mcreynol`, date: "2015-08-22T05:56:58-05:00",
      body: `Before I moved to a city that is 98% Muslim almost 7 years ago, I had a ‘CNN-view’ of Muslims. I considered myself ‘open-minded’ but still had stereotypical expectations. Today, although my view of Islam hasn’t change, my view of Muslims is very, very different. And, at least where I live, they are eager to talk about God and do so with humility and openness.`,
    },
  ],
  "the-reckless-love-of-god": [
    {
      wpId: "2847", parentWpId: null, isOwnerReply: false,
      author: `Susan Grenz`, date: "2024-12-18T12:24:48-06:00",
      body: `Loved this one! Very helpful, redirecting our thoughts to theological truths. 😊 Susan Grenz`,
    },
    {
      wpId: "2848", parentWpId: null, isOwnerReply: false,
      author: `Adrian Marinelli`, date: "2024-12-26T13:51:14-06:00",
      body: `Loved this short reflection. I miss talking about these things with you in class! – Adrian`,
    },
  ],
  "the-wasteful-prodigal-son": [
    {
      wpId: "136", parentWpId: null, isOwnerReply: false,
      author: `kpt5`, date: "2016-08-05T18:47:30-05:00",
      body: `Thanks Dr. Richards. Yet again, you confirm my life! I just had the opportunity to debut a song I wrote at church….after years of being afraid to share the gift. So thank you for sharing God’s word as a reminder to me to keep on going! God bless you! Former student but still learning from you, Kellianne Jordan (nee Pottinger)`,
    },
    {
      wpId: "2839", parentWpId: null, isOwnerReply: false,
      author: `Jerry Voss`, date: "2023-10-24T05:44:20-05:00",
      body: `This was llovely to read`,
    },
  ],
  "faith-that-moves-mountains": [
    {
      wpId: "169", parentWpId: null, isOwnerReply: false,
      author: `Carl Miller`, date: "2017-02-09T23:36:57-06:00",
      body: `Have you come across anything relating Jesus’ statement with the city of Jerusalem? In the context, the biggest “mountain” near them would have been Mt. Zion. Do you think Jesus could have been saying anything about the fall of Jerusalem there?`,
    },
    {
      wpId: "170", parentWpId: null, isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2017-02-10T08:52:22-06:00",
      body: `Carl, that is an interesting observation. The “mountains” (hills, really) in the area are pretty much alike. I think the Mount of Olives is higher (as I recollect) but I’m not sure which one would be bigger. Because of the way that the Gospels are written, we can’t be sure of the provenance of any of the sayings. But, nonetheless, it is a thought-provoking idea. I’ve not come across anything to suggest this. What do you think Jesus would be saying? Normally, Jesus portrays the fall of Jerusalem as the judgment of God, not the result of prayers. Do you think Jewish Christians would be praying for Jerusalem to fall? Would Jesus be encouraging that? If you’ve read it somewhere, let me know. Thanks for commenting and giving me something to ponder this morning. Best wishes on your ministry in the Philippines!`,
    },
    {
      wpId: "171", parentWpId: null, isOwnerReply: false,
      author: `Karyn W`, date: "2017-02-10T12:18:15-06:00",
      body: `Thank you… this was very timely… for a significant family need. I was introduced to your blog by my friend and former co-worker JMO and have found your blog and books to be a blessing.`,
    },
    {
      wpId: "172", parentWpId: "171", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2017-02-10T13:44:53-06:00",
      body: `Well, now we both call JMO our friend and former co-worker! I’m glad you find the blog helpful. Grace to you and peace this day.`,
    },
  ],
  "666-the-mark-of-the-beast": [
    {
      wpId: "174", parentWpId: null, isOwnerReply: false,
      author: `William Cifuentes`, date: "2017-02-13T05:14:50-06:00",
      body: `Wrecked my whole life. Thank you for this post, Dean Richards.`,
    },
    {
      wpId: "175", parentWpId: "174", isOwnerReply: true,
      author: `E. Randolph Richards`, date: "2017-02-14T08:48:41-06:00",
      body: `Will, I have enjoyed talking about ministry with you this past month. May the Lord bless your efforts for his Kingdom.`,
    },
  ],
}