import path from 'path'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'

import { Pages } from '@/collections/Pages'
import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { SiteSettings } from '@/globals/SiteSettings'
import { ThemeSettings } from '@/globals/ThemeSettings'
import { TrajectoryData } from '@/collections/TrajectoryData'
import { EngagementCases } from '@/collections/EngagementCases'
import { Research } from '@/collections/Research'
import { StrategicSubmissions } from '@/collections/StrategicSubmissions'
import { getServerSideURL } from '@/lib/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          label: 'Mobile',
          width: 390,
          height: 844,
        },
        {
          name: 'tablet',
          label: 'Tablet',
          width: 820,
          height: 1180,
        },
        {
          name: 'desktop',
          label: 'Desktop',
          width: 1512,
          height: 982,
        },
      ],
    },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Users, Media, Pages, TrajectoryData, EngagementCases, Research, StrategicSubmissions],
  globals: [SiteSettings, ThemeSettings],
  cors: [getServerSideURL()].filter(Boolean),
  csrf: [getServerSideURL()].filter(Boolean),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
