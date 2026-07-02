import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3kzdw0qu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  schema,
  plugins: [
    structureTool({structure}),
  ],
})
