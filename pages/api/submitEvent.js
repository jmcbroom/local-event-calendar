import sanityClient from '@sanity/client'
import dayjs from 'dayjs'
const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
}
const client = sanityClient(config)

export default async function submitEvent(req, res) {
  
  const { name, venueId, eventType, startTime } = JSON.parse(req.body)

  let newEvent = {
    _type: eventType,
    _id: 'drafts.',
    title: name,
    startTime: dayjs(startTime).toISOString(),
    venue: {
      _type: 'reference',
      _ref: venueId
    }
  }

  try {
    await client.create(newEvent)
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: `Couldn't submit event`, err})
  }
  return res.status(200).json({ message: 'Event submitted' })
}