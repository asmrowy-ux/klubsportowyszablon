import { defineField, defineType } from 'sanity'
import { Link } from 'lucide-react'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Link Menu',
  type: 'object',
  icon: Link as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł (Etykieta)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Ścieżka (URL)',
      type: 'string',
      description: 'Wpisz pełny link (np. /news, /team, /shop, lub /p/regulamin)',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'link',
    },
  },
})
