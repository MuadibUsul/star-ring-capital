type SiteFooterProps = {
  siteName: string
  footerNote: string
}

export function SiteFooter({ siteName, footerNote }: SiteFooterProps) {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--src-accent)_20%,transparent)] py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 lg:px-10">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--src-accent)]">{siteName}</p>
        <p className="text-xs text-[var(--src-muted)]">{footerNote}</p>
      </div>
    </footer>
  )
}
