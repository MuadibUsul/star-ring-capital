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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link className="flex items-center gap-3" href="/">
          {logoUrl ? (
            <img alt={logoAlt || siteName} className="h-9 w-9 rounded-full object-cover" src={logoUrl} />
          ) : (
            <div className="grid h-9 w-9 place-items-center rounded-full border border-[var(--src-accent)] text-xs font-semibold text-[var(--src-accent)]">
              SR
            </div>
          )}
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.22em] text-[var(--src-text)]">{siteName}</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--src-muted)]">{tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              className="text-xs uppercase tracking-[0.14em] text-[var(--src-muted)] transition-colors hover:text-[var(--src-accent)]"
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

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Button asChild className="hidden lg:inline-flex" size="default" variant="ghost">
            <Link href={ctaUrl || '/contact'}>{ctaLabel || 'Strategic Collaboration'}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
