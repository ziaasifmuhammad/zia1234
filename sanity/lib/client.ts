import { createClient } from 'next-sanity'

import { apiVersion, dataset } from '../env';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: dataset,
  apiVersion: apiVersion,
  token: process.env.SANITY_API_TOKEN, // Example of adding a token if needed
  useCdn: true, // Example option, can be modified
});



