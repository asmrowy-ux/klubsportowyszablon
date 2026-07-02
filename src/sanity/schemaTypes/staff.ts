import {defineField, defineType} from 'sanity'

export const staffType = defineType({
  name: 'staff',
  title: 'Staff',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Sztab Szkoleniowy', value: 'coaching'},
          {title: 'Sztab Medyczny', value: 'medical'},
          {title: 'Zarząd', value: 'board'},
        ],
      },
      initialValue: 'coaching',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Head Coach', value: 'head_coach'},
          {title: 'Assistant Coach', value: 'assistant_coach'},
          {title: 'Goalkeeping Coach', value: 'gk_coach'},
          {title: 'Fitness Coach', value: 'fitness_coach'},
          {title: 'Physiotherapist', value: 'physio'},
          {title: 'Team Doctor', value: 'doctor'},
          {title: 'Analyst', value: 'analyst'},
          {title: 'Kit Manager', value: 'kit_manager'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo)',
      description: 'Optional video highlight for this staff member.',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      title: 'Biography (Optional)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
    }),
    defineField({
      name: 'joinedDate',
      title: 'Joined Club',
      type: 'date',
    }),
    defineField({
      name: 'experience',
      title: 'Previous Experience / Clubs',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
