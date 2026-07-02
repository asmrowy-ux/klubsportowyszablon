import {defineField, defineType} from 'sanity'

export const playerType = defineType({
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Kit Number',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(99),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Goalkeeper', value: 'goalkeeper'},
          {title: 'Defender', value: 'defender'},
          {title: 'Midfielder', value: 'midfielder'},
          {title: 'Forward', value: 'forward'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Player Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo)',
      description: 'Optional video highlight for this player.',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      title: 'Biography (Optional)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'isLegend',
      title: 'Is Legend? (Hall of Fame)',
      description: 'Check this to add the player to the Hall of Fame instead of the active First Team.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'team',
      title: 'Team Category',
      type: 'string',
      options: {
        list: [
          {title: 'Pierwsza Drużyna (First Team)', value: 'first'},
          {title: 'Drużyna Kobiet (Women)', value: 'women'},
          {title: 'Akademia (Academy)', value: 'academy'},
        ],
      },
      initialValue: 'first',
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
    }),
    defineField({
      name: 'birthDate',
      title: 'Date of Birth',
      type: 'date',
    }),
    // Stats Group
    defineField({
      name: 'appearances',
      title: 'Appearances',
      type: 'number',
      group: 'stats',
      initialValue: 0,
    }),
    defineField({
      name: 'goals',
      title: 'Goals',
      type: 'number',
      group: 'stats',
      initialValue: 0,
    }),
    defineField({
      name: 'assists',
      title: 'Assists',
      type: 'number',
      group: 'stats',
      initialValue: 0,
    }),
    defineField({
      name: 'cleanSheets',
      title: 'Clean Sheets (Goalkeepers)',
      type: 'number',
      group: 'stats',
      initialValue: 0,
    }),
  ],
  groups: [
    { name: 'stats', title: 'Career Statistics' },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
})
