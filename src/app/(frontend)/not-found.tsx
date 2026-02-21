import Link from 'next/link'

import { getRequestLocale } from '@/lib/i18n-server'
import { t } from '@/lib/i18n'

export default async function NotFound() {
  const locale = await getRequestLocale()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--src-accent)]">404</p>
      <h1 className="font-heading text-5xl text-[var(--src-text)]">
        {t(locale, { en: 'Page not found', zh: '\u9875\u9762\u672a\u627e\u5230' })}
      </h1>
      <p className="text-sm text-[var(--src-muted)]">
        {t(locale, {
          en: 'The capital narrative you requested is currently not available.',
          zh: '\u4f60\u8bbf\u95ee\u7684\u8d44\u672c\u53d9\u4e8b\u5185\u5bb9\u5f53\u524d\u4e0d\u53ef\u7528\u3002',
        })}
      </p>
      <Link className="text-sm text-[var(--src-accent)]" href="/">
        {t(locale, { en: 'Return to Home', zh: '\u8fd4\u56de\u9996\u9875' })}
      </Link>
    </div>
  )
}
