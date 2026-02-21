export type SiteLocale = 'en' | 'zh'

export const LOCALE_COOKIE_NAME = 'src-locale'

export type LocalizedText = {
  en: string
  zh: string
}

const navLabelZhBySlug: Record<string, string> = {
  home: '\u9996\u9875',
  philosophy: '\u7406\u5ff5',
  'capital-domains': '\u8d44\u672c\u9886\u57df',
  'capital-trajectory': '\u8d44\u672c\u8f68\u8ff9',
  'risk-architecture': '\u98ce\u9669\u67b6\u6784',
  'strategic-engagement': '\u6218\u7565\u534f\u4f5c',
  founder: '\u521b\u59cb\u4eba',
  contact: '\u8054\u7cfb',
  research: '\u7814\u7a76',
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

export const localizeOptionalField = ({
  locale,
  value,
}: {
  locale: SiteLocale
  value?: string | null
}) => {
  const raw = value?.trim()
  const bilingual = splitBilingual(raw)

  if (bilingual) {
    return locale === 'zh' ? bilingual.zh : bilingual.en
  }

  return raw || ''
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
  const rawLabel = label?.trim()
  const bilingual = splitBilingual(rawLabel)

  if (bilingual) {
    return locale === 'zh' ? bilingual.zh : bilingual.en
  }

  if (rawLabel) {
    return rawLabel
  }

  if (locale === 'zh' && slug) {
    return navLabelZhBySlug[slug] || slug
  }

  return slug || ''
}
