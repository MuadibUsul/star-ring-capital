import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 border text-sm tracking-[0.08em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--src-accent)] disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'border-[var(--src-accent)] bg-[color-mix(in_srgb,var(--src-accent)_16%,transparent)] text-[var(--src-text)] hover:bg-[color-mix(in_srgb,var(--src-accent)_24%,transparent)]',
        ghost: 'border-[color-mix(in_srgb,var(--src-accent)_36%,transparent)] bg-transparent text-[var(--src-text)] hover:bg-[color-mix(in_srgb,var(--src-accent)_14%,transparent)]',
      },
      size: {
        default: 'h-11 px-6',
        lg: 'h-12 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ asChild, className, variant, size, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      style={{
        borderRadius: 'calc(var(--src-button-radius) * 1px)',
        boxShadow: '0 0 calc(28px * var(--src-button-glow)) color-mix(in_srgb,var(--src-accent)_45%,transparent)',
      }}
      {...props}
    />
  )
}
