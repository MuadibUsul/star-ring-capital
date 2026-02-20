import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

type SubmissionEntry = {
  label: string
  value: string
}

type SubmissionRequest = {
  locale?: 'en' | 'zh'
  sourcePage?: string
  entries?: SubmissionEntry[]
}

const truncate = (value: string, max: number) => value.trim().slice(0, max)

const normalizeEntries = (entries: unknown): SubmissionEntry[] => {
  if (!Array.isArray(entries)) return []

  return entries
    .filter((item): item is SubmissionEntry => {
      return (
        Boolean(item) &&
        typeof item === 'object' &&
        typeof (item as SubmissionEntry).label === 'string' &&
        typeof (item as SubmissionEntry).value === 'string'
      )
    })
    .map((item) => ({
      label: truncate(item.label, 120),
      value: truncate(item.value, 4000),
    }))
    .filter((item) => item.label.length > 0 && item.value.length > 0)
}

const includesAny = (input: string, keywords: string[]) => {
  return keywords.some((keyword) => input.includes(keyword))
}

const findEntryValue = (entries: SubmissionEntry[], keywords: string[]) => {
  const match = entries.find((entry) => includesAny(entry.label.toLowerCase(), keywords))
  return match?.value || ''
}

export async function POST(request: Request) {
  let body: SubmissionRequest

  try {
    body = (await request.json()) as SubmissionRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  const entries = normalizeEntries(body.entries)

  if (entries.length === 0) {
    return NextResponse.json({ error: 'At least one field is required' }, { status: 400 })
  }

  const locale = body.locale === 'zh' ? 'zh' : 'en'
  const sourcePage = truncate(body.sourcePage || '/', 200)

  const contactName =
    findEntryValue(entries, ['name', 'full name', '姓名', '称呼', '联系人']) || 'Anonymous Submission'
  const contactEmail = findEntryValue(entries, ['email', 'mail', '邮箱', '电子邮箱'])
  const organization = findEntryValue(entries, ['organization', 'company', '机构', '公司'])
  const phone = findEntryValue(entries, ['phone', 'mobile', 'whatsapp', '电话', '手机'])
  const message = findEntryValue(entries, ['message', 'details', 'summary', '需求', '说明', '留言'])

  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'strategic-submissions',
    overrideAccess: false,
    data: {
      status: 'new',
      priority: 'normal',
      locale,
      sourcePage,
      contactName: truncate(contactName, 140),
      contactEmail: contactEmail ? truncate(contactEmail, 240) : undefined,
      organization: organization ? truncate(organization, 240) : undefined,
      phone: phone ? truncate(phone, 80) : undefined,
      message: message ? truncate(message, 4000) : undefined,
      submittedAt: new Date().toISOString(),
      entries,
    },
  })

  return NextResponse.json({ ok: true })
}

