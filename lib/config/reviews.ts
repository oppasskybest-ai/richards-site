export interface StaticReview {
  id: string
  quote: string
  name: string
  location: string
  rating: number
}

// Real endorsements, pulled word-for-word from randolphrichards.com/endorsements/.
// Used as a fallback on the /reviews (Endorsements) page whenever the
// Supabase `reviews` table doesn't have them yet, and seeded into that
// table by /api/admin/seed so they become editable from /admin/reviews
// instead of only ever being read-only fallback text.
export const STATIC_REVIEWS: StaticReview[] = [
  { id: '1', quote: "Dr. Randy Richards taught me so much about the gospel of John from a new perspective. His teaching gives you insight into John's character and history of the times you didn't know. Dr. Richards has a wonderful way of speaking and making you feel wanting to continue learning. Dr. Richards also has a wonderful humor that puts you at ease.", name: 'Kathy Skinner', location: 'retired IT Director', rating: 5 },
  { id: '2', quote: "Dr. Randy Richards is a gifted communicator and teacher of God's Word. He makes the text come alive with his extensive background knowledge, careful exposition, and practical application for today's world.", name: 'Jon Stubblefield', location: 'pastor', rating: 5 },
  { id: '3', quote: 'Our presenter, Dr. Randy Richards is an incredible communicator. His biblical knowledge is unsurpassed. His presentations are fresh, extemporaneous, and winsome. It was a very pleasurable experience, and I look forward to hearing him again soon.', name: 'Del Gann', location: 'retired geology professor and pastor', rating: 5 },
  { id: '4', quote: "I recently attended an expository Bible conference taught by Dr. Richards. His engaging teaching style and humor held everyone's attention through multiple sessions, and his knowledge of the historical context of the gospels gave me new insights into Jesus' life and ministry.", name: 'Kelly Hardin', location: 'former attorney and current church administrative assistant', rating: 5 },
  { id: '5', quote: "Dr. Randy Richards made the 'Life of Jesus' come alive for us while leading our Expository Bible Conference last week. He pointed out some emotions and feelings the biblical characters were likely experiencing in a unique and meaningful presentation of John's Gospel. Attendance by our church members and guests was consistently high and our people were enthusiastic as we were drawn into the narrative through Randy's exciting style of teaching that kept us involved as if we were actually there. We would definitely like to have him return to lead future conferences.", name: 'Johnny Ross', location: 'Church Planter, Coronado Baptist Church, Hot Springs Village, Arkansas', rating: 5 },
  { id: '6', quote: 'Dr. Richards teaches the hidden insights of antiquity into the life and times of Christ, presented in an enduring colloquial style. You will leave the conference in exhilarating wonderment, as if you have had a personal encounter with Jesus.', name: 'Gregg Cudworth', location: 'retired pharmacist and pastor', rating: 5 },
]
