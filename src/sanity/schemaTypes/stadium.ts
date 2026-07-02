import {defineField, defineType} from 'sanity'

export const stadiumType = defineType({
  name: 'stadium',
  title: 'Stadium',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Stadium Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
    }),
    defineField({
      name: 'opened',
      title: 'Year Opened',
      type: 'number',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'location',
      title: 'Location / Address',
      type: 'string',
    }),
  ],
})
