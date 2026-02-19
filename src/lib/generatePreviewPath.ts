import type { PayloadRequest } from 'payload'

type GeneratePagePreviewPathArgs = {
  slug: string
  req: PayloadRequest
}

export const generatePagePreviewPath = ({ slug, req }: GeneratePagePreviewPathArgs) => {
  const encodedSlug = encodeURIComponent(slug)
  const path = encodedSlug === 'home' ? '/' : `/${encodedSlug}`

  const params = new URLSearchParams({
    path,
    collection: 'pages',
    slug: encodedSlug,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${params.toString()}`
}

export const generateGlobalPreviewPath = ({ path = '/' }: { path?: string }) => {
  const params = new URLSearchParams({
    path,
    collection: 'pages',
    slug: path === '/' ? 'home' : path.replace('/', ''),
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${params.toString()}`
}
