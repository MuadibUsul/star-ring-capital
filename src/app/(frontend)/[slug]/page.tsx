import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { PageDocumentRenderer } from '@/components/page/PageDocumentRenderer'
import { PageLivePreview } from '@/components/page/PageLivePreview'
import { getRequestLocale } from '@/lib/i18n-server'
import { queryPageBySlug, querySiteSettings } from '@/lib/queries'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{
    slug?: string
  }>
}

const normalizeSlug = (raw?: string) => {
  if (!raw) return 'home'
  return decodeURIComponent(raw)
}

const homeExpandedSlugs = ['strategic-engagement', 'founder', 'contact'] as const

const withExpandedHomeSections = async ({
  draft,
  page,
}: {
  draft: boolean
  page: any
}) => {
  if (!page || page.slug !== 'home') {
    return page
  }

  const relatedPages = await Promise.all(
    homeExpandedSlugs.map((targetSlug) => queryPageBySlug({ draft, slug: targetSlug })),
  )

  const homeLayout = Array.isArray(page.layout) ? page.layout : []
  const extraLayouts = relatedPages.flatMap((doc) => (Array.isArray(doc?.layout) ? doc.layout : []))

  return {
    ...page,
    layout: [...homeLayout, ...extraLayouts],
  }
}

export default async function PageRoute({ params }: PageProps) {
  const { isEnabled: draft } = await draftMode()
  const locale = await getRequestLocale()
  const { slug: maybeSlug } = await params
  const slug = normalizeSlug(maybeSlug)

  const page = await queryPageBySlug({ draft, slug })

  if (!page) {
    notFound()
  }

  const renderedPage = await withExpandedHomeSections({
    draft,
    page,
  })

  if (draft) {
    return <PageLivePreview initialData={renderedPage} locale={locale} />
  }

  return <PageDocumentRenderer locale={locale} page={renderedPage} />
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: maybeSlug } = await params
  const slug = normalizeSlug(maybeSlug)

  const [page, siteSettings] = await Promise.all([
    queryPageBySlug({ draft: false, slug }),
    querySiteSettings({ draft: false }),
  ])

  if (!page) {
    return {
      title: siteSettings?.defaultSEO?.title || 'Star Ring Capital',
      description:
        siteSettings?.defaultSEO?.description ||
        'Private capital structure office focused on risk architecture and stable growth.',
    }
  }

  const image = page?.seo?.ogImage && typeof page.seo.ogImage === 'object' ? page.seo.ogImage : null

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
    openGraph: {
      title: page.seo?.title || page.title,
      description: page.seo?.description,
      images: image?.url ? [image.url] : undefined,
    },
  }
}
