import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from './env'

// Make sure to use a token with write access
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

async function uploadImageFromUrl(url: string) {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const asset = await client.assets.upload('image', buffer)
  return {
    _type: 'image',
    asset: {
      _type: "reference",
      _ref: asset._id
    }
  }
}

async function seed() {
  console.log('Seeding data to Sanity...')

  try {
    // 1. Stadium
    const existingStadium = await client.fetch(`*[_type == "stadium"][0]`)
    if (!existingStadium) {
      console.log('Creating Stadium...')
      const stadiumImage = await uploadImageFromUrl('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80')
      await client.create({
        _type: 'stadium',
        name: 'Nova City Arena',
        capacity: 45000,
        opened: 2012,
        location: 'ul. Sportowa 1, 81-300 Gdynia',
        mainImage: stadiumImage,
        description: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Nasz stadion to serce klubu, miejsce, w którym tworzy się historia. Od ponad dekady Nova City Arena jest twierdzą naszej drużyny, gdzie doping kilkudziesięciu tysięcy kibiców niesie zawodników do zwycięstw.' }]
          }
        ]
      })
    } else {
      console.log('Stadium already exists, skipping.')
    }

    // 2. Contact
    const existingContact = await client.fetch(`*[_type == "contact"][0]`)
    if (!existingContact) {
      console.log('Creating Contact...')
      const contactImage = await uploadImageFromUrl('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')
      await client.create({
        _type: 'contact',
        email: 'biuro@novacityfc.pl',
        phone: '+48 123 456 789',
        address: 'ul. Sportowa 1\n81-300 Gdynia, Polska',
        mainImage: contactImage,
        description: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Masz pytania dotyczące biletów, współpracy sponsorskiej lub innych spraw klubowych? Skontaktuj się z nami poprzez e-mail lub telefon, a nasze biuro chętnie Ci pomoże.' }]
          }
        ]
      })
    } else {
      console.log('Contact already exists, skipping.')
    }

    // 3. Zarząd (Staff with department: 'board')
    const existingBoard = await client.fetch(`*[_type == "staff" && department == "board"][0]`)
    if (!existingBoard) {
      console.log('Creating Board Member...')
      const boardImage = await uploadImageFromUrl('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80')
      await client.create({
        _type: 'staff',
        name: 'Piotr Kaczmarek',
        department: 'board',
        role: 'Prezes Zarządu',
        nationality: 'Polska',
        image: boardImage,
        bio: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Piotr Kaczmarek jest prezesem klubu od 2020 roku. Wcześniej przez 15 lat pracował w zarządach czołowych europejskich klubów.' }]
          }
        ]
      })
    } else {
      console.log('Board members already exist, skipping.')
    }

    // 4. Careers
    const existingCareers = await client.fetch(`*[_type == "jobOffer"][0]`)
    if (!existingCareers) {
      console.log('Creating Job Offer...')
      await client.create({
        _type: 'jobOffer',
        title: 'Specjalista ds. Marketingu',
        department: 'marketing',
        location: 'Gdynia',
        isActive: true,
        description: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Szukamy kreatywnego specjalisty ds. marketingu, który dołączy do naszego zespołu. Odpowiadać będziesz za prowadzenie kampanii promocyjnych, obsługę mediów społecznościowych w dni meczowe oraz współpracę z głównymi sponsorami klubu.' }]
          }
        ]
      })
    } else {
      console.log('Careers already exist, skipping.')
    }

    console.log('Seeding complete!')
  } catch (err) {
    console.error('Error seeding data:', err)
  }
}

seed()
