import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope, Space_Grotesk } from 'next/font/google'
import { draftMode } from 'next/headers'
import type React from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getServerSideURL } from '@/lib/getURL'
import { getRequestLocale } from '@/lib/i18n-server'
import { localizeField } from '@/lib/i18n'
import { queryNavigation, querySiteSettings, queryThemeSettings } from '@/lib/queries'

import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()
  const locale = await getRequestLocale()

  const [siteSettings, themeSettings, navItems] = await Promise.all([
    querySiteSettings({ draft }),
    queryThemeSettings({ draft }),
    queryNavigation({ draft }),
  ])

  const fontPreset = themeSettings?.typography?.fontPreset || 'institutional'
  const bodyFont = fontPreset === 'contemporary' ? 'var(--font-space-grotesk)' : 'var(--font-manrope)'
  const headingFont =
    fontPreset === 'contemporary' ? 'var(--font-manrope)' : 'var(--font-cormorant)'

  const orbitEnabled = Boolean(themeSettings?.orbitEffect?.enabled)

  const vars = {
    '--src-bg': themeSettings?.backgroundColor || '#07090f',
    '--src-bg-accent': themeSettings?.backgroundAccentColor || '#0d1422',
    '--src-text': themeSettings?.textColor || '#f5f4ef',
    '--src-muted': themeSettings?.mutedTextColor || '#b7b19e',
    '--src-accent': themeSettings?.accentGoldColor || '#d5b36a',
    '--src-button-radius': String(themeSettings?.buttonStyle?.radius ?? 999),
    '--src-button-glow': String(themeSettings?.buttonStyle?.glowIntensity ?? 0.28),
    '--src-font-body': bodyFont,
    '--src-font-heading': headingFont,
    '--src-font-body-weight': String(themeSettings?.typography?.bodyWeight ?? 400),
    '--src-font-heading-weight': String(themeSettings?.typography?.headingWeight ?? 600),
    '--src-orbit-speed': `${String(themeSettings?.orbitEffect?.speed ?? 26)}s`,
    '--src-orbit-opacity': orbitEnabled ? String(themeSettings?.orbitEffect?.opacity ?? 0.32) : '0',
  } as React.CSSProperties

  const logo = themeSettings?.logo && typeof themeSettings.logo === 'object' ? themeSettings.logo : null
  const localizedSiteName = localizeField({
    locale,
    value: siteSettings?.siteName,
    fallback: {
      en: 'Star Ring Capital',
      zh: '\u661f\u73af\u8d44\u672c',
    },
  })
  const localizedTagline = localizeField({
    locale,
    value: siteSettings?.tagline,
    fallback: {
      en: 'Private Capital Structure Office',
      zh: '\u79c1\u57df\u8d44\u672c\u7ed3\u6784\u529e\u516c\u5ba4',
    },
  })
  const localizedCTA = localizeField({
    locale,
    value: siteSettings?.primaryNavCTA?.label,
    fallback: {
      en: 'Strategic Collaboration',
      zh: '\u6218\u7565\u534f\u4f5c',
    },
  })
  const localizedFooterNote = localizeField({
    locale,
    value: siteSettings?.footerNote,
    fallback: {
      en: 'Structured influence. Stable growth. Disciplined risk architecture.',
      zh: '\u7ed3\u6784\u5316\u5f71\u54cd\u529b\uff0c\u7a33\u5065\u589e\u957f\uff0c\u7eaa\u5f8b\u5316\u98ce\u9669\u67b6\u6784\u3002',
    },
  })

  return (
    <html
      className={`${manrope.variable} ${cormorant.variable} ${spaceGrotesk.variable}`}
      data-button-variant={themeSettings?.buttonStyle?.variant || 'outline'}
      lang={locale === 'zh' ? 'zh-CN' : 'en'}
      style={vars}
    >
      <body>
        <SiteHeader
          ctaLabel={localizedCTA}
          ctaUrl={siteSettings?.primaryNavCTA?.url}
          locale={locale}
          logoAlt={logo?.alt}
          logoUrl={logo?.url}
          navItems={navItems}
          siteName={localizedSiteName}
          tagline={localizedTagline}
        />
        <main className="relative flex-1">{children}</main>
        <SiteFooter
          footerNote={localizedFooterNote}
          locale={locale}
          siteName={localizedSiteName}
        />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: 'Star Ring Capital',
  description: 'Private capital structure office website',
}
