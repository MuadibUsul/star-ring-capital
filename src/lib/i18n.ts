import { legacySeedZhByEn } from '@/lib/legacySeedTranslations'

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

const legacyExtrasZhByEn: Record<string, string> = {
  'Coordinate equity, fixed income, and liquidity sleeves under unified risk budgets.':
    '\u5728\u7edf\u4e00\u98ce\u9669\u9884\u7b97\u4e0b\u534f\u8c03\u80a1\u6743\u3001\u56fa\u6536\u4e0e\u6d41\u52a8\u6027\u4ed3\u4f4d\u3002',
  'Control concentration through correlation-aware structural balancing.':
    '\u901a\u8fc7\u76f8\u5173\u6027\u611f\u77e5\u7684\u7ed3\u6784\u5e73\u8861\u63a7\u5236\u96c6\u4e2d\u5ea6\u3002',
  'Emphasize continuity of exposure quality over short-term speculation.':
    '\u5f3a\u8c03\u655e\u53e3\u8d28\u91cf\u7684\u8fde\u7eed\u6027\uff0c\u800c\u975e\u77ed\u671f\u6295\u673a\u3002',
  'Rotate capital according to regime transitions, not headline momentum.':
    '\u6839\u636e\u5e02\u573a\u72b6\u6001\u5207\u6362\u8f6e\u52a8\u8d44\u672c\uff0c\u800c\u975e\u8ddf\u968f\u65b0\u95fb\u52a8\u91cf\u3002',
  'Blend defensive and offensive postures using layered timing frameworks.':
    '\u4f7f\u7528\u5206\u5c42\u65f6\u70b9\u6846\u67b6\u878d\u5408\u9632\u5b88\u4e0e\u8fdb\u653b\u59ff\u6001\u3002',
  'Sustain trajectory integrity through proactive structural adjustments.':
    '\u901a\u8fc7\u4e3b\u52a8\u7ed3\u6784\u8c03\u6574\u7ef4\u6301\u8f68\u8ff9\u5b8c\u6574\u6027\u3002',
  'Strategic campaigns are shared as structured battle narratives focused on judgment quality, risk handling, and result characteristics.':
    '\u6218\u7565\u9879\u76ee\u4ee5\u7ed3\u6784\u5316\u6218\u5f79\u53d9\u4e8b\u5448\u73b0\uff0c\u91cd\u70b9\u5c55\u793a\u5224\u65ad\u8d28\u91cf\u3001\u98ce\u9669\u5904\u7406\u4e0e\u7ed3\u679c\u7279\u5f81\u3002',
  'Reframed the risk budget from directional beta to stability-weighted spread capture.':
    '\u5c06\u98ce\u9669\u9884\u7b97\u4ece\u65b9\u5411\u6027 Beta \u91cd\u6784\u4e3a\u4ee5\u7a33\u5b9a\u6027\u52a0\u6743\u7684\u4ef7\u5dee\u6355\u6349\u3002',
  'Introduced defensive overlays to neutralize macro shock concentration across correlated books.':
    '\u5f15\u5165\u9632\u5fa1\u6027\u8986\u76d6\u5c42\uff0c\u5bf9\u51b2\u76f8\u5173\u8d44\u4ea7\u7c3f\u4e2d\u7684\u5b8f\u89c2\u51b2\u51fb\u96c6\u4e2d\u5ea6\u3002',
  'Maintained continuity of capital while reducing drawdown sensitivity in volatile regimes.':
    '\u5728\u9ad8\u6ce2\u52a8\u9636\u6bb5\u964d\u4f4e\u56de\u64a4\u654f\u611f\u6027\u7684\u540c\u65f6\uff0c\u7ef4\u6301\u8d44\u672c\u8f68\u8ff9\u8fde\u7eed\u6027\u3002',
  'Lower drawdown amplitude with preserved trajectory continuity.':
    '\u5728\u4fdd\u6301\u8f68\u8ff9\u8fde\u7eed\u6027\u7684\u524d\u63d0\u4e0b\uff0c\u663e\u8457\u964d\u4f4e\u56de\u64a4\u632f\u5e45\u3002',
  'Re-architected liquidity ladders across equity, fixed income, and cash substitutes.':
    '\u91cd\u6784\u80a1\u6743\u3001\u56fa\u6536\u4e0e\u73b0\u91d1\u66ff\u4ee3\u8d44\u4ea7\u7684\u6d41\u52a8\u6027\u9636\u68af\u3002',
  'Synchronized tactical rotations with funding windows and volatility compression phases.':
    '\u5c06\u6218\u672f\u8f6e\u52a8\u4e0e\u8d44\u91d1\u7a97\u53e3\u53ca\u6ce2\u52a8\u6536\u655b\u9636\u6bb5\u8fdb\u884c\u540c\u6b65\u3002',
  'Improved adaptability under stress without sacrificing structural participation.':
    '\u5728\u4e0d\u727a\u7272\u7ed3\u6784\u53c2\u4e0e\u5ea6\u7684\u524d\u63d0\u4e0b\uff0c\u63d0\u9ad8\u538b\u529b\u60c5\u666f\u4e0b\u7684\u9002\u5e94\u80fd\u529b\u3002',
  'Higher liquidity efficiency under stressed market intervals.':
    '\u5728\u53d7\u538b\u5e02\u573a\u533a\u95f4\u5185\u5b9e\u73b0\u66f4\u9ad8\u6d41\u52a8\u6027\u6548\u7387\u3002',
  'Activated cross-market relative value frameworks driven by structural mispricing dispersion.':
    '\u57fa\u4e8e\u7ed3\u6784\u6027\u9519\u4ef7\u79bb\u6563\u5ea6\uff0c\u542f\u52a8\u8de8\u5e02\u573a\u76f8\u5bf9\u4ef7\u503c\u6846\u67b6\u3002',
  'Bounded execution by strict hedging envelopes and liquidity availability checks.':
    '\u901a\u8fc7\u4e25\u683c\u5bf9\u51b2\u8fb9\u754c\u4e0e\u6d41\u52a8\u6027\u53ef\u5f97\u6027\u6821\u9a8c\u7ea6\u675f\u6267\u884c\u3002',
  'Delivered smoother risk-adjusted progression through disciplined sizing constraints.':
    '\u4f9d\u9760\u7eaa\u5f8b\u5316\u4ed3\u4f4d\u7ea6\u675f\uff0c\u83b7\u5f97\u66f4\u5e73\u6ed1\u7684\u98ce\u9669\u8c03\u6574\u540e\u589e\u957f\u3002',
  'Risk-adjusted contribution improved while preserving downside controls.':
    '\u5728\u4fdd\u6301\u4e0b\u884c\u63a7\u5236\u7684\u540c\u65f6\uff0c\u63d0\u5347\u98ce\u9669\u8c03\u6574\u540e\u8d21\u732e\u3002',
  'Battle-style strategic narratives across 2023-2025 without trade-level disclosure.':
    '\u8986\u76d6 2023-2025 \u7684\u6218\u5f79\u5f0f\u6218\u7565\u53d9\u4e8b\uff0c\u4e0d\u62ab\u9732\u5355\u7b14\u4ea4\u6613\u7ec6\u8282\u3002',
  'Capital discipline over market noise. Built for long-horizon resilience and strategic alignment only.':
    '\u4ee5\u8d44\u672c\u7eaa\u5f8b\u7a7f\u8d8a\u5e02\u573a\u566a\u97f3\u3002\u4ec5\u670d\u52a1\u4e8e\u957f\u671f\u97e7\u6027\u4e0e\u6218\u7565\u540c\u9891\u3002',
  'All trajectories reflect historical structural execution and do not constitute investment solicitation.':
    '\u6240\u6709\u8f68\u8ff9\u4ec5\u53cd\u6620\u5386\u53f2\u7ed3\u6784\u5316\u6267\u884c\uff0c\u4e0d\u6784\u6210\u4efb\u4f55\u6295\u8d44\u9080\u7ea6\u3002',
}

const legacyZhByEn: Record<string, string> = {
  ...legacySeedZhByEn,
  ...legacyExtrasZhByEn,
}

const normalizeLookupKey = (value: string) => {
  return value.trim().replace(/\s+/g, ' ')
}

const monthZhByEn: Record<string, string> = {
  Jan: '1\u6708',
  Feb: '2\u6708',
  Mar: '3\u6708',
  Apr: '4\u6708',
  May: '5\u6708',
  Jun: '6\u6708',
  Jul: '7\u6708',
  Aug: '8\u6708',
  Sep: '9\u6708',
  Oct: '10\u6708',
  Nov: '11\u6708',
  Dec: '12\u6708',
}

const legacyTranslate = (value: string) => {
  const normalized = normalizeLookupKey(value)
  const exact = legacyZhByEn[normalized]
  if (exact) return exact

  const withoutTrailingPeriod = normalized.replace(/[.。]+$/, '')
  const noPeriodExact = legacyZhByEn[withoutTrailingPeriod]
  if (noPeriodExact) return noPeriodExact

  const monthOnly = withoutTrailingPeriod.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/)
  if (monthOnly) return monthZhByEn[monthOnly[1]]

  const yearMonth = withoutTrailingPeriod.match(
    /^(\d{4})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/,
  )
  if (yearMonth) return `${yearMonth[1]}\u5e74 ${monthZhByEn[yearMonth[2]]}`

  const yearQuarter = withoutTrailingPeriod.match(/^(\d{4})\s+Q([1-4])$/)
  if (yearQuarter) return `${yearQuarter[1]}\u5e74 Q${yearQuarter[2]}`

  return undefined
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

  if (locale === 'zh' && raw) {
    return legacyTranslate(raw) || raw
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
    if (locale === 'zh') {
      if (raw === fallback.en) {
        return fallback.zh
      }

      return legacyTranslate(raw) || raw
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
    if (locale === 'zh') {
      return (slug ? navLabelZhBySlug[slug] : '') || legacyTranslate(rawLabel) || rawLabel
    }

    return rawLabel
  }

  if (locale === 'zh' && slug) {
    return navLabelZhBySlug[slug] || slug
  }

  return slug || ''
}

