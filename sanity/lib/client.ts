import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

// Read Client
export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})


// Write Client
// TODO: Write the writeClient function with access token