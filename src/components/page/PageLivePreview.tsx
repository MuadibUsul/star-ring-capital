'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/lib/getURL'
import { PageDocumentRenderer } from '@/components/page/PageDocumentRenderer'

type PageLivePreviewProps = {
  initialData: any
}

export function PageLivePreview({ initialData }: PageLivePreviewProps) {
  const { data } = useLivePreview({
    initialData,
    serverURL: getClientSideURL(),
    depth: 3,
  })

  return <PageDocumentRenderer page={data} />
}
