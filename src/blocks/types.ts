import type { Block } from 'payload'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  interfaceName: 'HomeHeroBlock',
  labels: {
    singular: 'Home Hero',
    plural: 'Home Hero',
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'Star Ring Capital',
      required: true,
    },
    {
      name: 'positioning',
      type: 'text',
      required: true,
      defaultValue:
        'A private capital structure office focused on stability, risk architecture, and cross-cycle growth.',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const CorePillarsBlock: Block = {
  slug: 'corePillars',
  interfaceName: 'CorePillarsBlock',
  labels: {
    singular: 'Core Pillars',
    plural: 'Core Pillars',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Core Architecture',
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 3,
      maxRows: 3,
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
      ],
    },
  ],
}

export const PhilosophyBlock: Block = {
  slug: 'philosophyStatement',
  interfaceName: 'PhilosophyStatementBlock',
  labels: {
    singular: 'Philosophy Statement',
    plural: 'Philosophy Statements',
  },
  fields: [
    {
      name: 'coreSentence',
      type: 'text',
      required: true,
      defaultValue: 'Capital is not money. Capital is structured influence.',
    },
    {
      name: 'modules',
      type: 'array',
      minRows: 3,
      maxRows: 3,
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
      ],
    },
  ],
}

export const CapitalDomainsBlock: Block = {
  slug: 'capitalDomains',
  interfaceName: 'CapitalDomainsBlock',
  labels: {
    singular: 'Capital Domains',
    plural: 'Capital Domains',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Capital Domains',
    },
    {
      name: 'domains',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'line1',
          type: 'text',
          required: true,
        },
        {
          name: 'line2',
          type: 'text',
          required: true,
        },
        {
          name: 'line3',
          type: 'text',
          required: true,
        },
        {
          name: 'readMoreLabel',
          type: 'text',
        },
        {
          name: 'readMoreUrl',
          type: 'text',
        },
      ],
    },
  ],
}

export const TrajectoryBlock: Block = {
  slug: 'trajectoryViewer',
  interfaceName: 'TrajectoryViewerBlock',
  labels: {
    singular: 'Trajectory Viewer',
    plural: 'Trajectory Viewers',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Capital Trajectory',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Trajectory analysis focuses on risk-adjusted consistency, drawdown control, and structural execution quality.',
    },
    {
      name: 'trajectoryData',
      type: 'relationship',
      relationTo: 'trajectory-data',
      required: true,
    },
  ],
}

export const RiskArchitectureBlock: Block = {
  slug: 'riskArchitecture',
  interfaceName: 'RiskArchitectureBlock',
  labels: {
    singular: 'Risk Architecture',
    plural: 'Risk Architecture',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Risk Architecture',
      required: true,
    },
    {
      name: 'layers',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'layerName',
          type: 'text',
          required: true,
        },
        {
          name: 'purpose',
          type: 'textarea',
          required: true,
        },
        {
          name: 'bullets',
          type: 'array',
          minRows: 2,
          maxRows: 3,
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export const EngagementNarrativeBlock: Block = {
  slug: 'engagementNarratives',
  interfaceName: 'EngagementNarrativesBlock',
  labels: {
    singular: 'Strategic Engagement',
    plural: 'Strategic Engagement',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Strategic Engagement',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Strategic campaigns are documented by thesis quality, risk posture, and execution discipline. No trade-level disclosure.',
    },
    {
      name: 'cases',
      type: 'relationship',
      relationTo: 'engagement-cases',
      hasMany: true,
      required: true,
    },
  ],
}

export const FounderProfileBlock: Block = {
  slug: 'founderProfile',
  interfaceName: 'FounderProfileBlock',
  labels: {
    singular: 'Founder Profile',
    plural: 'Founder Profiles',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Founder & Capital Architect',
      required: true,
    },
    {
      name: 'narrative',
      type: 'textarea',
      required: true,
    },
    {
      name: 'capabilityPoints',
      type: 'array',
      minRows: 3,
      maxRows: 5,
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'portrait',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
}

export const ContactBlock: Block = {
  slug: 'contactModule',
  interfaceName: 'ContactModuleBlock',
  labels: {
    singular: 'Contact Module',
    plural: 'Contact Modules',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Contact',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'alignmentCopy',
      type: 'text',
      defaultValue: 'By strategic alignment only.',
      required: true,
    },
    {
      name: 'enableForm',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'formFields',
      type: 'array',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enableForm),
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Text',
              value: 'text',
            },
            {
              label: 'Email',
              value: 'email',
            },
            {
              label: 'Textarea',
              value: 'textarea',
            },
          ],
          defaultValue: 'text',
        },
        {
          name: 'placeholder',
          type: 'text',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}

export const pageBlocks: Block[] = [
  HomeHeroBlock,
  CorePillarsBlock,
  PhilosophyBlock,
  CapitalDomainsBlock,
  TrajectoryBlock,
  RiskArchitectureBlock,
  EngagementNarrativeBlock,
  FounderProfileBlock,
  ContactBlock,
]
