import type * as React from 'react'

import { cn } from '@/lib/cn'

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-[color-mix(in_srgb,var(--src-accent)_32%,transparent)] bg-transparent px-4 text-sm text-[var(--src-text)] placeholder:text-[color-mix(in_srgb,var(--src-muted)_82%,white_18%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--src-accent)]',
        className,
      )}
      {...props}
    />
  )
}
