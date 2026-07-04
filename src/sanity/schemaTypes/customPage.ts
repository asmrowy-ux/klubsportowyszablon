import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export const customPageType = defineType({
  name: 'customPage',
  title: 'Własne Podstrony',
  type: 'document',
  icon: FileText as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł Strony',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adres URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Zostanie użyty w adresie np. /p/nazwa-strony',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Zdjęcie główne (Opcjonalnie)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Treść strony',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImage'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `/p/${subtitle}`,
        media
      }
    }
  }
})
