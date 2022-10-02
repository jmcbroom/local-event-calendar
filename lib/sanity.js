import {
  createClient,
} from 'next-sanity'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2022-01-31'
}

export const client = createClient(config)

export const getClient = (usePreview) => (usePreview ? previewClient : client)
export default client;