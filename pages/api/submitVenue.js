import sanityClient from '@sanity/client'
const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
}
const client = sanityClient(config)

export default async function submitVenue(req, res) {
  
  const { name, address } = JSON.parse(req.body)

  let newVenue = {
    _type: 'venue',
    _id: 'drafts.',
    name,
    address,
  }

  try {
    await client.create(newVenue)
  } catch (err) {
    console.error(err)
    return res.status(500).json({message: `Couldn't submit venue`, err})
  }
  return res.status(200).json({ message: 'Venue submitted' })
}