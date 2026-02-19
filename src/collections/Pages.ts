import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { pageBlocks } from '@/blocks/types'
import { generatePagePreviewPath } from '@/lib/generatePreviewPath'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'navigation.navOrder', '_status', 'updatedAt'],
    preview: (data, { req }) => {
      return generatePagePreviewPath({ slug: String(data?.slug || ''), req })
    },
    livePreview: {
      url: ({ data, req }) => {
        if (!data?.slug) {
          return null
        }

        return generatePagePreviewPath({ slug: String(data.slug), req })
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'navigation',
      type: 'group',
      fields: [
        {
          name: 'navLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'showInNav',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'navOrder',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: pageBlocks,
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'ogImage',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
