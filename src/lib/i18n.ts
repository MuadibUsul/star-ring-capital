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
  'A four-layer risk architecture balancing strategy continuity, tactical agility, and drawdown protection.':
    '\u56db\u5c42\u98ce\u9669\u67b6\u6784\uff0c\u5728\u6218\u7565\u8fde\u7eed\u6027\u3001\u6218\u672f\u654f\u6377\u6027\u4e0e\u56de\u64a4\u9632\u62a4\u4e4b\u95f4\u53d6\u5f97\u5e73\u8861\u3002',
  'A framework of value core and structural flow for long-horizon influence and risk-balanced growth.':
    '\u4ee5\u4ef7\u503c\u5185\u6838\u4e0e\u7ed3\u6784\u6d41\u52a8\u6784\u6210\u7684\u6846\u67b6\uff0c\u670d\u52a1\u957f\u671f\u5f71\u54cd\u529b\u4e0e\u98ce\u9669\u5e73\u8861\u589e\u957f\u3002',
  'A private capital structure office shaping durable outcomes through disciplined architecture, cross-cycle adaptability, and controlled risk.':
    '\u901a\u8fc7\u7eaa\u5f8b\u5316\u67b6\u6784\u3001\u8de8\u5468\u671f\u9002\u5e94\u4e0e\u53ef\u63a7\u98ce\u9669\uff0c\u6784\u5efa\u53ef\u6301\u7eed\u6210\u679c\u7684\u79c1\u57df\u8d44\u672c\u7ed3\u6784\u529e\u516c\u5ba4\u3002',
  'Adjusts exposure weights through controlled rotational logic without compromising core structure.':
    '\u5728\u4e0d\u7834\u574f\u6838\u5fc3\u7ed3\u6784\u7684\u524d\u63d0\u4e0b\uff0c\u901a\u8fc7\u53ef\u63a7\u8f6e\u52a8\u903b\u8f91\u8c03\u6574\u655e\u53e3\u6743\u91cd\u3002',
  'Cross-asset integration designed to preserve flexibility while maintaining directional coherence.':
    '\u8de8\u8d44\u4ea7\u6574\u5408\u8bbe\u8ba1\uff0c\u5728\u4fdd\u6301\u65b9\u5411\u4e00\u81f4\u6027\u7684\u540c\u65f6\u4fdd\u7559\u7075\u6d3b\u6027\u3002',
  'Cross-cycle review notes will summarize allocation logic and risk architecture evolution.':
    '\u8de8\u5468\u671f\u590d\u76d8\u7b14\u8bb0\u5c06\u603b\u7ed3\u914d\u7f6e\u903b\u8f91\u4e0e\u98ce\u9669\u67b6\u6784\u6f14\u8fdb\u3002',
  'Defines long-horizon positioning ranges aligned with capital mission and regime probabilities.':
    '\u5b9a\u4e49\u4e0e\u8d44\u672c\u4f7f\u547d\u53ca\u5e02\u573a\u72b6\u6001\u6982\u7387\u76f8\u4e00\u81f4\u7684\u957f\u671f\u4ed3\u4f4d\u533a\u95f4\u3002',
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
  'Founder profile focused on methodology, structural capability, and risk philosophy.':
    '\u805a\u7126\u65b9\u6cd5\u8bba\u3001\u7ed3\u6784\u80fd\u529b\u4e0e\u98ce\u9669\u54f2\u5b66\u7684\u521b\u59cb\u4eba\u4ecb\u7ecd\u3002',
  'Future institutional research and whitepaper module entrance.':
    '\u672a\u6765\u673a\u6784\u7814\u7a76\u4e0e\u767d\u76ae\u4e66\u6a21\u5757\u5165\u53e3\u3002',
  'High-end capital IP site focused on structure, risk architecture, and stable growth across market cycles.':
    '\u805a\u7126\u7ed3\u6784\u3001\u98ce\u9669\u67b6\u6784\u4e0e\u8de8\u5468\u671f\u7a33\u5b9a\u589e\u957f\u7684\u9ad8\u7aef\u8d44\u672c IP \u7ad9\u70b9\u3002',
  'Implements defensive overlays to contain left-tail events and reduce volatility shocks.':
    '\u5b9e\u65bd\u9632\u5fa1\u6027\u8986\u76d6\u5c42\uff0c\u7ea6\u675f\u5de6\u5c3e\u4e8b\u4ef6\u5e76\u964d\u4f4e\u6ce2\u52a8\u51b2\u51fb\u3002',
  'Layered control systems prioritize continuity, drawdown governance, and scenario resilience.':
    '\u5206\u5c42\u63a7\u5236\u7cfb\u7edf\u4f18\u5148\u4fdd\u969c\u8fde\u7eed\u6027\u3001\u56de\u64a4\u6cbb\u7406\u4e0e\u60c5\u666f\u97e7\u6027\u3002',
  'Long-form structural analysis for institutional execution frameworks will be released in phases.':
    '\u9762\u5411\u673a\u6784\u6267\u884c\u6846\u67b6\u7684\u957f\u7bc7\u7ed3\u6784\u5206\u6790\u5c06\u5206\u9636\u6bb5\u53d1\u5e03\u3002',
  'Maintains reserve liquidity to preserve maneuverability during stress and dislocation windows.':
    '\u7ef4\u6301\u50a8\u5907\u6d41\u52a8\u6027\uff0c\u786e\u4fdd\u5728\u538b\u529b\u4e0e\u9519\u4f4d\u7a97\u53e3\u4e2d\u4fdd\u6709\u673a\u52a8\u80fd\u529b\u3002',
  'Private operational memos can be enabled for strategic partners under controlled access.':
    '\u5728\u53ef\u63a7\u8bbf\u95ee\u6743\u9650\u4e0b\uff0c\u53ef\u4e3a\u6218\u7565\u5408\u4f5c\u65b9\u542f\u7528\u5185\u90e8\u8fd0\u8425\u5907\u5fd8\u3002',
  'Ring represents circulation, allocation pathways, and dynamic rebalancing under shifting conditions.':
    'Ring \u4ee3\u8868\u8d44\u672c\u5faa\u73af\u3001\u914d\u7f6e\u8def\u5f84\u4e0e\u5728\u73af\u5883\u53d8\u5316\u4e2d\u7684\u52a8\u6001\u518d\u5e73\u8861\u3002',
  'Star represents a value kernel anchored in repeatable judgment, discipline, and asymmetry awareness.':
    'Star \u4ee3\u8868\u4ef7\u503c\u5185\u6838\uff0c\u951a\u5b9a\u53ef\u590d\u73b0\u5224\u65ad\u3001\u7eaa\u5f8b\u7ea6\u675f\u4e0e\u4e0d\u5bf9\u79f0\u8ba4\u77e5\u3002',
  'Star Ring Capital | Private Capital Structure Office':
    '\u661f\u73af\u8d44\u672c | \u79c1\u57df\u8d44\u672c\u7ed3\u6784\u529e\u516c\u5ba4',
  'Strategic alignment contact channel for Star Ring Capital.':
    '\u661f\u73af\u8d44\u672c\u6218\u7565\u540c\u9891\u534f\u4f5c\u8054\u7cfb\u901a\u9053\u3002',
  'Strategic capital architecture, multi-asset allocation, and cross-cycle rotation capabilities.':
    '\u6218\u7565\u8d44\u672c\u67b6\u6784\u3001\u591a\u8d44\u4ea7\u914d\u7f6e\u4e0e\u8de8\u5468\u671f\u8f6e\u52a8\u80fd\u529b\u3002',
  'Structured influence over emotional allocation. Conviction is expressed through architecture, not noise.':
    '\u4ee5\u7ed3\u6784\u5316\u5f71\u54cd\u529b\u66ff\u4ee3\u60c5\u7eea\u5316\u914d\u7f6e\uff0c\u4fe1\u5ff5\u901a\u8fc7\u67b6\u6784\u8868\u8fbe\uff0c\u800c\u975e\u566a\u97f3\u9a71\u52a8\u3002',
  'The founder builds private capital structure systems that convert macro complexity into executable architecture. The operating doctrine prioritizes disciplined risk governance, structural adaptation, and continuity through cycle transitions.':
    '\u521b\u59cb\u4eba\u4e13\u6ce8\u6784\u5efa\u79c1\u57df\u8d44\u672c\u7ed3\u6784\u7cfb\u7edf\uff0c\u5c06\u5b8f\u89c2\u590d\u6742\u6027\u8f6c\u5316\u4e3a\u53ef\u6267\u884c\u67b6\u6784\u3002\u65b9\u6cd5\u8bba\u5f3a\u8c03\u7eaa\u5f8b\u5316\u98ce\u9669\u6cbb\u7406\u3001\u7ed3\u6784\u81ea\u9002\u5e94\u4e0e\u8de8\u5468\u671f\u8fde\u7eed\u6027\u3002',
  'Three-year, one-year, and YTD trajectory visualization benchmarked against global equity and risk-free curves.':
    '\u57fa\u4e8e\u5168\u7403\u6743\u76ca\u4e0e\u65e0\u98ce\u9669\u66f2\u7ebf\u5bf9\u7167\u7684\u4e09\u5e74\u3001\u4e00\u5e74\u4e0e\u5e74\u5185\u8f68\u8ff9\u53ef\u89c6\u5316\u3002',
  'Trajectory reporting emphasizes stability, drawdown control, and risk-adjusted quality instead of volatility-driven outperformance narratives.':
    '\u8f68\u8ff9\u6295\u544a\u5f3a\u8c03\u7a33\u5b9a\u6027\u3001\u56de\u64a4\u63a7\u5236\u4e0e\u98ce\u9669\u8c03\u6574\u540e\u8d28\u91cf\uff0c\u800c\u975e\u6ce2\u52a8\u9a71\u52a8\u7684\u8d85\u989d\u53d9\u4e8b\u3002',
  'When value core and structural flow align, capital compounds through consistency rather than episodic outcomes.':
    '\u5f53\u4ef7\u503c\u6838\u5fc3\u4e0e\u7ed3\u6784\u6d41\u52a8\u540c\u9891\u65f6\uff0c\u8d44\u672c\u901a\u8fc7\u4e00\u81f4\u6027\u800c\u975e\u5076\u53d1\u6027\u7ed3\u679c\u5b9e\u73b0\u590d\u5229\u3002',
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

