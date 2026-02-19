export type SiteLocale = 'en' | 'zh'

export const LOCALE_COOKIE_NAME = 'src-locale'

type LocalizedText = {
  en: string
  zh: string
}

const navLabelZhBySlug: Record<string, string> = {
  home: '首页',
  philosophy: '理念',
  'capital-domains': '资本领域',
  'capital-trajectory': '资本轨迹',
  'risk-architecture': '风险架构',
  'strategic-engagement': '战略协作',
  founder: '创始人',
  contact: '联系',
  research: '研究',
}

const splitBilingual = (value?: string | null) => {
  if (!value) return null

  const parts = value
    .split('||')
    .map((item) => item.trim())
    .filter(Boolean)

  if (parts.length !== 2) return null

  return {
    zh: parts[0],
    en: parts[1],
  }
}

export const normalizeLocale = (value?: string | null): SiteLocale => {
  if (value === 'zh') return 'zh'
  return 'en'
}

export const t = (locale: SiteLocale, value: LocalizedText) => {
  return locale === 'zh' ? value.zh : value.en
}

export const localizeField = ({
  locale,
  value,
  fallback,
}: {
  locale: SiteLocale
  value?: string | null
  fallback: LocalizedText
}) => {
  const raw = value?.trim()
  const bilingual = splitBilingual(raw)

  if (bilingual) {
    return locale === 'zh' ? bilingual.zh : bilingual.en
  }

  if (raw) {
    if (locale === 'zh' && raw === fallback.en) {
      return fallback.zh
    }

    return raw
  }

  return t(locale, fallback)
}

export const localizeNavLabel = ({
  locale,
  slug,
  label,
}: {
  locale: SiteLocale
  slug?: string | null
  label?: string | null
}) => {
  const bilingual = splitBilingual(label?.trim())
  if (bilingual) {
    return locale === 'zh' ? bilingual.zh : bilingual.en
  }

  const fallback = label || slug || ''

  if (locale === 'zh' && slug) {
    return navLabelZhBySlug[slug] || fallback
  }

  return fallback
}
