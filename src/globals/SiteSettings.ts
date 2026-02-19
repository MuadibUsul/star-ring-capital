import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { generateGlobalPreviewPath } from '@/lib/generatePreviewPath'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    livePreview: {
      url: () => generateGlobalPreviewPath({ path: '/' }),
    },
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Star Ring Capital',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'Private Capital Structure Office',
    },
    {
      name: 'primaryNavCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Strategic Collaboration',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'defaultSEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Star Ring Capital | Structured Influence in Capital',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Star Ring Capital is a private capital structure office focused on risk architecture, cross-cycle allocation, and stability-first growth.',
        },
        {
          name: 'ogImage',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'footerNote',
      type: 'text',
      required: true,
      defaultValue: 'Structured influence. Stable growth. Disciplined risk architecture.',
    },
  ],
}
