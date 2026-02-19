import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { generateGlobalPreviewPath } from '@/lib/generatePreviewPath'

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  label: 'Theme Settings',
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
      name: 'backgroundColor',
      label: 'Primary Background',
      type: 'text',
      required: true,
      defaultValue: '#07090f',
    },
    {
      name: 'backgroundAccentColor',
      label: 'Secondary Background',
      type: 'text',
      required: true,
      defaultValue: '#0d1422',
    },
    {
      name: 'textColor',
      type: 'text',
      required: true,
      defaultValue: '#f5f4ef',
    },
    {
      name: 'mutedTextColor',
      type: 'text',
      required: true,
      defaultValue: '#b7b19e',
    },
    {
      name: 'accentGoldColor',
      type: 'text',
      required: true,
      defaultValue: '#d5b36a',
    },
    {
      name: 'buttonStyle',
      type: 'group',
      fields: [
        {
          name: 'variant',
          type: 'select',
          required: true,
          defaultValue: 'outline',
          options: [
            {
              label: 'Rounded',
              value: 'rounded',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
            {
              label: 'Glow',
              value: 'glow',
            },
          ],
        },
        {
          name: 'radius',
          type: 'number',
          required: true,
          defaultValue: 999,
        },
        {
          name: 'glowIntensity',
          type: 'number',
          required: true,
          defaultValue: 0.28,
          min: 0,
          max: 1,
        },
      ],
    },
    {
      name: 'typography',
      type: 'group',
      fields: [
        {
          name: 'fontPreset',
          type: 'select',
          required: true,
          defaultValue: 'institutional',
          options: [
            {
              label: 'Institutional Serif',
              value: 'institutional',
            },
            {
              label: 'Contemporary Geometric',
              value: 'contemporary',
            },
          ],
        },
        {
          name: 'bodyWeight',
          type: 'number',
          required: true,
          defaultValue: 400,
        },
        {
          name: 'headingWeight',
          type: 'number',
          required: true,
          defaultValue: 600,
        },
      ],
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'orbitEffect',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'speed',
          type: 'number',
          defaultValue: 26,
          required: true,
          min: 8,
          max: 120,
        },
        {
          name: 'opacity',
          type: 'number',
          defaultValue: 0.32,
          required: true,
          min: 0,
          max: 1,
        },
      ],
    },
  ],
}
