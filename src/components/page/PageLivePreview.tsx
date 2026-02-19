'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/lib/getURL'
import type { SiteLocale } from '@/lib/i18n'
import { PageDocumentRenderer } from '@/components/page/PageDocumentRenderer'

type PageLivePreviewProps = {
  initialData: any
  locale: SiteLocale
}

export function PageLivePreview({ initialData, locale }: PageLivePreviewProps) {
  const { data } = useLivePreview({
    initialData,
    serverURL: getClientSideURL(),
    depth: 3,
  })

  return <PageDocumentRenderer locale={locale} page={data} />
}
