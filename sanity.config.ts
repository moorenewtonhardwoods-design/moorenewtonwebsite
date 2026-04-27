'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectId, dataset } from '@/sanity/env';
import { schemaTypes } from '@/sanity/schemas';

export default defineConfig({
  name: 'moore-newton-studio',
  title: 'Moore Newton',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
