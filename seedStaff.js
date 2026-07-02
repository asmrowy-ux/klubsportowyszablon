import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const staffMembers = [
  // Zarząd (Board)
  { name: 'Adam Małysz', role: 'Prezes Zarządu', department: 'board' },
  { name: 'Marek Kondrat', role: 'Wiceprezes ds. Sportowych', department: 'board' },
  { name: 'Anna Nowak', role: 'Dyrektor Finansowy', department: 'board' },
  { name: 'Piotr Fronczewski', role: 'Członek Zarządu', department: 'board' },
  // Sztab (Coaching / Staff)
  { name: 'Tomasz Hajto', role: 'Pierwszy Trener', department: 'coaching' },
  { name: 'Jerzy Brzęczek', role: 'Asystent Trenera', department: 'coaching' },
  { name: 'Krzysztof Dowhań', role: 'Trener Bramkarzy', department: 'coaching' },
  { name: 'Mariusz Pudzianowski', role: 'Trener Przygotowania Fizycznego', department: 'medical' },
  { name: 'Ewa Chodakowska', role: 'Dietetyk', department: 'medical' },
  { name: 'Kamil Glik', role: 'Kierownik Drużyny', department: 'management' },
];

async function seedStaff() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("BRAK TOKENU!");
    process.exit(1);
  }

  console.log('Dodawanie zarządu i sztabu do bazy...');

  for (const person of staffMembers) {
    const doc = {
      _type: 'staff',
      name: person.name,
      role: person.role,
      department: person.department,
      bio: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              marks: [],
              text: `To jest przykładowy opis biograficzny dla: ${person.name}. Zmieniaj i dostosowuj te teksty w Sanity Studio.`,
            },
          ],
        },
      ],
    };

    try {
      const created = await client.create(doc);
      console.log(`Dodano: ${created.name} (${created.role})`);
    } catch (err) {
      console.error(`Błąd podczas dodawania ${person.name}:`, err.message);
    }
  }

  console.log('Gotowe! Dodano zarząd i sztab.');
}

seedStaff();
