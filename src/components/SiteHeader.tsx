import Link from 'next/link'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { localizeNavLabel, type SiteLocale } from '@/lib/i18n'

type NavItem = {
  id: string | number
  slug?: string | null
  navigation?: {
    navLabel?: string | null
  } | null
}

type SiteHeaderProps = {
  locale: SiteLocale
  siteName: string
  tagline: string
  navItems: NavItem[]
  logoUrl?: string | null
  logoAlt?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
}

const normalizePath = (slug?: string | null) => {
  if (!slug || slug === 'home') return '/'
  return `/${slug}`
}

export async function SiteHeader({
  locale,
  siteName,
  tagline,
  navItems,
  logoUrl,
  logoAlt,
  ctaLabel,
  ctaUrl,
}: SiteHeaderProps) {
  const primaryNavItems = navItems.slice(0, 5)
  const rawCTALabel = ctaLabel || 'Strategic Collaboration'
  const resolvedCTALabel =
    locale === 'en' && rawCTALabel.length > 18 ? 'Strategic Intake' : rawCTALabel

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--src-accent)_20%,transparent)] bg-[color-mix(in_srgb,var(--src-bg)_88%,black_12%)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-10 lg:py-4">
        <Link className="flex min-w-0 max-w-[220px] items-center gap-3" href="/">
          {logoUrl ? (
            <img alt={logoAlt || siteName} className="h-8 w-8 rounded-full object-cover lg:h-9 lg:w-9" src={logoUrl} />
          ) : (
            <div className="grid h-8 w-8 place-items-center rounded-full border border-[var(--src-accent)] text-[11px] font-semibold text-[var(--src-accent)] lg:h-9 lg:w-9">
              SR
            </div>
          )}
          <div className="min-w-0">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-heading text-[13px] uppercase tracking-[0.08em] text-[var(--src-text)] xl:text-sm xl:tracking-[0.12em]">
              {siteName}
            </p>
            <p className="hidden max-w-[24ch] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-[var(--src-muted)] xl:block">
              {tagline}
            </p>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-6">
          {primaryNavItems.map((item) => (
            <Link
              className="whitespace-nowrap text-[11px] uppercase tracking-[0.08em] text-[var(--src-muted)] transition-colors hover:text-[var(--src-accent)] xl:text-xs xl:tracking-[0.12em]"
              href={normalizePath(item.slug)}
              key={String(item.id)}
            >
              {localizeNavLabel({
                locale,
                slug: item.slug,
                label: item.navigation?.navLabel,
              })}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <Button
            asChild
            className="hidden h-10 w-[176px] overflow-hidden !px-4 text-[11px] tracking-[0.06em] xl:inline-flex"
            size="default"
            variant="ghost"
          >
            <Link className="w-full truncate text-center" href={ctaUrl || '/contact'}>
              {resolvedCTALabel}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
