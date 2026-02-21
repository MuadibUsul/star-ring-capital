'use client'

import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'

import { cn } from '@/lib/cn'
import { LOCALE_COOKIE_NAME, type SiteLocale } from '@/lib/i18n'

type LanguageSwitcherProps = {
  locale: SiteLocale
}

const languageOptions: Array<{ value: SiteLocale; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'zh', label: '\u4e2d\u6587' },
]

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const setLocale = (nextLocale: SiteLocale) => {
    if (nextLocale === locale || isPending) return

    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`
    setOpen(false)
    startTransition(() => {
      router.refresh()
    })
  }

  const currentLabel = languageOptions.find((option) => option.value === locale)?.label ?? 'EN'

  return (
    <div className="relative" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'inline-flex h-10 min-w-[92px] items-center justify-between gap-2 rounded-full border border-[color-mix(in_srgb,var(--src-accent)_34%,transparent)] bg-[color-mix(in_srgb,var(--src-bg)_72%,black_28%)] px-4 text-[11px] tracking-[0.12em] text-[var(--src-text)] transition-colors',
          'hover:border-[color-mix(in_srgb,var(--src-accent)_50%,transparent)] hover:text-[var(--src-accent)]',
          open && 'border-[color-mix(in_srgb,var(--src-accent)_60%,transparent)] text-[var(--src-accent)]',
        )}
        disabled={isPending}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="whitespace-nowrap leading-none">{currentLabel}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
          strokeWidth={1.8}
        />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[132px] rounded-2xl border border-[color-mix(in_srgb,var(--src-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--src-bg)_87%,black_13%)] p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.38)] backdrop-blur">
          {languageOptions.map((option) => {
            const active = option.value === locale

            return (
              <button
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[11px] tracking-[0.12em] transition-colors',
                  active
                    ? 'bg-[color-mix(in_srgb,var(--src-accent)_22%,transparent)] text-[var(--src-accent)]'
                    : 'text-[var(--src-muted)] hover:bg-[color-mix(in_srgb,var(--src-accent)_10%,transparent)] hover:text-[var(--src-text)]',
                )}
                disabled={isPending}
                key={option.value}
                onClick={() => setLocale(option.value)}
                role="menuitem"
                type="button"
              >
                <span className="whitespace-nowrap leading-none">{option.label}</span>
                {active ? <span className="text-[var(--src-accent)]">\u2713</span> : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
