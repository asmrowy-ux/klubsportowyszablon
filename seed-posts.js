// Script to seed 3 sample articles in Sanity
const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '3kzdw0qu',
  dataset: 'production',
  apiVersion: '2024-06-29',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const posts = [
  {
    _type: 'post',
    title: 'Nova City FC Wygrywa Derby Miasta 3-1!',
    slug: { _type: 'slug', current: 'nova-city-wygrywa-derby-3-1' },
    category: 'Match Report',
    publishedAt: new Date().toISOString(),
    body: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Nova City FC odniosło spektakularne zwycięstwo w derbach miasta, pokonując rywali 3-1. Bramki zdobyli Kowalski (23\', 67\') oraz Rodriguez (81\'). Drużyna zaprezentowała się z fantastycznej strony, dominując na boisku od pierwszego gwizdka. Trener podkreślił doskonałe przygotowanie taktyczne i zaangażowanie całego zespołu.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Nowy napastnik podpisał kontrakt do 2029 roku',
    slug: { _type: 'slug', current: 'nowy-napastnik-kontrakt-2029' },
    category: 'Transfery',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    body: [
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Z ogromną radością informujemy, że Marcus Silva oficjalnie dołączył do Nova City FC! 24-letni brazylijski napastnik podpisał kontrakt obowiązujący do czerwca 2029 roku. Silva w poprzednim sezonie strzelił 22 gole i zaliczył 11 asyst we wszystkich rozgrywkach. Witamy w rodzinie Nova City!',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Akademia Nova City otwiera zapisy na nowy sezon',
    slug: { _type: 'slug', current: 'akademia-zapisy-nowy-sezon' },
    category: 'Akademia',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    body: [
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'Akademia Nova City FC rozpoczyna rekrutację młodych talentów na sezon 2026/2027! Zapraszamy chłopców i dziewczęta w wieku 6-16 lat na otwarte treningi próbne. Nasza akademia szczyci się najnowocześniejszym zapleczem treningowym i wykwalifikowaną kadrą trenerską. Szczegóły i zapisy na stronie klubu w zakładce Akademia.',
            marks: [],
          },
        ],
      },
    ],
  },
];

async function seed() {
  for (const post of posts) {
    try {
      const result = await client.create(post);
      console.log(`Created: ${result.title} (${result._id})`);
    } catch (err) {
      console.error(`Error creating "${post.title}":`, err.message);
    }
  }
}

seed();
