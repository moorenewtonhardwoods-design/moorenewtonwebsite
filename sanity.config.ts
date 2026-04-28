'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { projectId, dataset } from '@/sanity/env';
import { schemaTypes } from '@/sanity/schemas';

export default defineConfig({
  name: 'moore-newton-studio',
  title: 'Moore Newton',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), media()],
  schema: {
    types: schemaTypes,
  },
});
