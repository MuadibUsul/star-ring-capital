import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const TrajectoryData: CollectionConfig = {
  slug: 'trajectory-data',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'active', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'periods',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'period',
          type: 'select',
          required: true,
          options: [
            {
              label: '3Y',
              value: '3Y',
            },
            {
              label: '1Y',
              value: '1Y',
            },
            {
              label: 'YTD',
              value: 'YTD',
            },
          ],
        },
        {
          name: 'points',
          type: 'array',
          minRows: 2,
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'starRingCapital',
              type: 'number',
              required: true,
            },
            {
              name: 'globalEquityBenchmark',
              type: 'number',
              required: true,
            },
            {
              name: 'riskFreeBenchmark',
              type: 'number',
              required: true,
            },
          ],
        },
        {
          name: 'metrics',
          type: 'group',
          fields: [
            {
              name: 'cagr',
              label: 'CAGR (%)',
              type: 'number',
              required: true,
            },
            {
              name: 'maxDrawdown',
              label: 'Max Drawdown (%)',
              type: 'number',
              required: true,
            },
            {
              name: 'volatility',
              label: 'Volatility (%)',
              type: 'number',
              required: true,
            },
            {
              name: 'sharpeRatio',
              label: 'Sharpe Ratio',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'complianceStatements',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [
        {
          name: 'statement',
          type: 'text',
          required: true,
        },
      ],
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
