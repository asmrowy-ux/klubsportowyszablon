import { defineField, defineType } from 'sanity'
import { Folder } from 'lucide-react'

export const menuDropdownType = defineType({
  name: 'menuDropdown',
  title: 'Menu Rozwijane (Dropdown)',
  type: 'object',
  icon: Folder as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł (Etykieta przycisku)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Pod-linki',
      type: 'array',
      of: [{ type: 'menuItem' }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare(selection) {
      const { title, items } = selection
      return {
        title: title,
        subtitle: items ? `${items.length} linków` : 'Puste',
      }
    },
  },
})
