'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/cn'
import { LOCALE_COOKIE_NAME, type SiteLocale } from '@/lib/i18n'

type LanguageSwitcherProps = {
  locale: SiteLocale
}

const languageOptions: Array<{ value: SiteLocale; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'zh', label: '中文' },
]

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const setLocale = (nextLocale: SiteLocale) => {
    if (nextLocale === locale || isPending) return

    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--src-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--src-bg)_75%,black_25%)] p-1"
      role="group"
    >
      {languageOptions.map((option) => {
        const active = option.value === locale

        return (
          <button
            className={cn(
              'rounded-full px-3 py-1 text-[11px] tracking-[0.12em] transition-colors',
              active
                ? 'bg-[color-mix(in_srgb,var(--src-accent)_24%,transparent)] text-[var(--src-accent)]'
                : 'text-[var(--src-muted)] hover:text-[var(--src-text)]',
            )}
            disabled={isPending}
            key={option.value}
            onClick={() => setLocale(option.value)}
            type="button"
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

