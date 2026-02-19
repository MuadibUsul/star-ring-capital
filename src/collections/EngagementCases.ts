import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const EngagementCases: CollectionConfig = {
  slug: 'engagement-cases',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'strategicName',
    defaultColumns: ['year', 'strategicName', 'updatedAt'],
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'strategicName',
      type: 'text',
      required: true,
    },
    {
      name: 'summaryLines',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'line',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'resultSignature',
      type: 'text',
      required: true,
      defaultValue: 'Stability-first execution with controlled drawdown profile.',
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 200,
      },
    },
    maxPerDoc: 50,
  },
}
