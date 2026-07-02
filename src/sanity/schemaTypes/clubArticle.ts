import {defineField, defineType} from 'sanity'

export const clubArticleType = defineType({
  name: 'clubArticle',
  title: 'Club Article (Video Page)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo)',
      description: 'The main promotional video for the club.',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
