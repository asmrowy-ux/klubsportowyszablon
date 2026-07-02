import {defineField, defineType} from 'sanity'

export const jobOfferType = defineType({
  name: 'jobOffer',
  title: 'Job Offer (Careers)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Marketing & PR', value: 'marketing'},
          {title: 'Coaching', value: 'coaching'},
          {title: 'Administration', value: 'administration'},
          {title: 'Medical', value: 'medical'},
          {title: 'Scouting', value: 'scouting'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Gdynia / Remote',
    }),
    defineField({
      name: 'description',
      title: 'Job Description & Requirements',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
