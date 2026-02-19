import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const queryPageBySlug = async ({ draft, slug }: { draft: boolean; slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 3,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
}

export const queryNavigation = async ({ draft }: { draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 1,
    limit: 50,
    overrideAccess: draft,
    pagination: false,
    sort: 'navigation.navOrder',
    where: {
      'navigation.showInNav': {
        equals: true,
      },
    },
  })

  return result.docs
}

export const querySiteSettings = async ({ draft }: { draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'site-settings',
    draft,
    depth: 2,
    overrideAccess: draft,
  })
}

export const queryThemeSettings = async ({ draft }: { draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'theme-settings',
    draft,
    depth: 2,
    overrideAccess: draft,
  })
}
