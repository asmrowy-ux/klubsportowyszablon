import {defineField, defineType} from 'sanity'

export const clubHistoryType = defineType({
  name: 'clubHistory',
  title: 'Club History',
  type: 'document',
  fields: [
    defineField({
      name: 'foundingYear',
      title: 'Founding Year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'General Description (History)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline of Events',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'event',
          title: 'Event',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (rule: any) => rule.required(),
            },
            {
              name: 'title',
              title: 'Event Title',
              type: 'string',
              validation: (rule: any) => rule.required(),
            },
            {
              name: 'description',
              title: 'Event Description',
              type: 'text',
            },
            {
              name: 'eventType',
              title: 'Event Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Success / Trophy 🏆', value: 'success'},
                  {title: 'Promotion ⬆️', value: 'promotion'},
                  {title: 'Relegation ⬇️', value: 'relegation'},
                  {title: 'Transfer / Signing ✍️', value: 'transfer'},
                  {title: 'Milestone / Important 🌟', value: 'milestone'},
                ],
              },
              initialValue: 'milestone',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
              eventType: 'eventType',
            },
            prepare({ title, subtitle, eventType }: Record<string, any>) {
              const icons: Record<string, string> = {
                success: '🏆',
                promotion: '⬆️',
                relegation: '⬇️',
                transfer: '✍️',
                milestone: '🌟',
              };
              return {
                title: `${icons[eventType] || '📅'} ${title}`,
                subtitle: subtitle.toString(),
              };
            },
          },
        },
      ],
    }),
  ],
})
