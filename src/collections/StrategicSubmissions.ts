import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const StrategicSubmissions: CollectionConfig = {
  slug: 'strategic-submissions',
  labels: {
    singular: 'Strategic Submission',
    plural: 'Strategic Submissions',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Operations',
    useAsTitle: 'contactName',
    defaultColumns: ['status', 'priority', 'contactName', 'contactEmail', 'sourcePage', 'submittedAt'],
    description: 'Strategic collaboration leads submitted from the public website.',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Review',
          value: 'in_review',
        },
        {
          label: 'Qualified',
          value: 'qualified',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'Low',
          value: 'low',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'contactName',
          type: 'text',
          required: true,
          admin: {
            width: '35%',
          },
        },
        {
          name: 'contactEmail',
          type: 'email',
          admin: {
            width: '35%',
          },
        },
        {
          name: 'organization',
          type: 'text',
          admin: {
            width: '30%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            width: '35%',
          },
        },
        {
          name: 'locale',
          type: 'select',
          defaultValue: 'en',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Chinese', value: 'zh' },
          ],
          admin: {
            width: '20%',
          },
        },
        {
          name: 'sourcePage',
          type: 'text',
          admin: {
            width: '45%',
          },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'entries',
      type: 'array',
      labels: {
        singular: 'Field Entry',
        plural: 'Field Entries',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Internal follow-up notes (not visible to public users).',
      },
    },
  ],
}

