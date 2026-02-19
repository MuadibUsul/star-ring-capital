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
  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--src-accent)_20%,transparent)] bg-[color-mix(in_srgb,var(--src-bg)_88%,black_12%)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          {logoUrl ? (
            <img alt={logoAlt || siteName} className="h-8 w-8 rounded-full object-cover lg:h-9 lg:w-9" src={logoUrl} />
          ) : (
            <div className="grid h-8 w-8 place-items-center rounded-full border border-[var(--src-accent)] text-[11px] font-semibold text-[var(--src-accent)] lg:h-9 lg:w-9">
              SR
            </div>
          )}
          <div className="min-w-0">
            <p className="font-heading text-sm uppercase tracking-[0.16em] text-[var(--src-text)] whitespace-nowrap">
              {siteName}
            </p>
            <p className="hidden max-w-[24ch] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-[var(--src-muted)] xl:block">
              {tagline}
            </p>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link
              className="whitespace-nowrap text-[11px] uppercase tracking-[0.1em] text-[var(--src-muted)] transition-colors hover:text-[var(--src-accent)] xl:text-xs xl:tracking-[0.12em]"
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

        <div className="flex shrink-0 items-center gap-2 xl:gap-3">
          <LanguageSwitcher locale={locale} />
          <Button asChild className="hidden max-w-[215px] lg:inline-flex" size="default" variant="ghost">
            <Link className="truncate" href={ctaUrl || '/contact'}>
              {ctaLabel || 'Strategic Collaboration'}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
