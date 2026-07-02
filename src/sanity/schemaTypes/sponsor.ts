import {defineField, defineType} from 'sanity'

export const sponsorType = defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Sponsor Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website URL (optional)',
      type: 'url',
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Main Sponsor', value: 'main'},
          {title: 'Gold Sponsor', value: 'gold'},
          {title: 'Silver Sponsor', value: 'silver'},
          {title: 'Partner', value: 'partner'},
        ],
      },
      initialValue: 'partner',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tier',
      media: 'logo',
    },
  },
})
