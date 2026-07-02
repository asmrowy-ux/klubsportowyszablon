const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '3kzdw0qu',
  dataset: 'production',
  apiVersion: '2024-06-29',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const sponsors = [
  { _type: 'sponsor', name: 'NOVA ENERGY', tier: 'main', order: 1 },
  { _type: 'sponsor', name: 'CITY BANK', tier: 'gold', order: 2 },
  { _type: 'sponsor', name: 'TURBO SPORT', tier: 'silver', order: 3 },
  { _type: 'sponsor', name: 'GREEN TECH', tier: 'partner', order: 4 },
];

async function seed() {
  for (const s of sponsors) {
    const result = await client.create(s);
    console.log(`Created: ${result.name} (${result._id})`);
  }
}

seed();
