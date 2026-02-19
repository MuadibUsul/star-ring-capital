import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--src-accent)]">404</p>
      <h1 className="font-heading text-5xl text-[var(--src-text)]">Page not found</h1>
      <p className="text-sm text-[var(--src-muted)]">The capital narrative you requested is currently not available.</p>
      <Link className="text-sm text-[var(--src-accent)]" href="/">
        Return to Home
      </Link>
    </div>
  )
}
