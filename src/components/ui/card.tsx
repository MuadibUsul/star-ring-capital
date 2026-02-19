import type * as React from 'react'

import { cn } from '@/lib/cn'

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[color-mix(in_srgb,var(--src-accent)_28%,transparent)] bg-[color-mix(in_srgb,var(--src-bg-accent)_65%,transparent)] p-6 backdrop-blur-sm',
        className,
      )}
      {...props}
    />
  )
}
