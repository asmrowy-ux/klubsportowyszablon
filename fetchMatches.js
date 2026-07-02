const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: '3kzdw0qu',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});
client.fetch('*[_type == "match"]').then(r => console.log(JSON.stringify(r, null, 2)));
