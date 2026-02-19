import { cookies } from 'next/headers'

import { LOCALE_COOKIE_NAME, normalizeLocale, type SiteLocale } from '@/lib/i18n'

export const getRequestLocale = async (): Promise<SiteLocale> => {
  const cookieStore = await cookies()
  return normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value)
}

