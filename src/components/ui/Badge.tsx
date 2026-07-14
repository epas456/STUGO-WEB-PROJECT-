import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
 'inline-flex items-center gap-1 font-medium rounded-full border transition-colors',
  {
    variants: {
      variant: {
        blue: 'bg-[var(--bg-subtle)] text-[var(--brand-navy)] border-[var(--border)] dark:text-[var(--text-secondary)]',
        green: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
        yellow: 'bg-[#D6F84A]/25 text-[var(--text-primary)] border-[#D6F84A]',
        red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
        gray: 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border)]',
        purple: 'bg-[var(--bg-subtle)] text-[var(--brand-navy)] border-[var(--border)] dark:text-[var(--text-secondary)]',
        orange: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
        primary: 'bg-[var(--brand-primary)] text-[var(--on-primary)] border-transparent',
        success: 'bg-emerald-600 text-white border-transparent',
        danger: 'bg-red-500 text-white border-transparent',
        warning: 'bg-[var(--warning)] text-[#0E0F12] border-transparent',
      },
      size: {
        sm: 'text-[10px] px-1.5 py-0.5',
        md: 'text-xs px-2 py-0.5',
        lg: 'text-sm px-2.5 py-1',
      },
    },
    defaultVariants: {
      variant: 'gray',
      size: 'md',
    },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
 'w-1.5 h-1.5 rounded-full shrink-0',
              variant === 'green' || variant === 'success' ? 'bg-emerald-500' :
              variant === 'red' || variant === 'danger' ? 'bg-red-500' :
              variant === 'yellow' || variant === 'warning' ? 'bg-[var(--warning)]' :
              variant === 'blue' || variant === 'primary' ? 'bg-[var(--brand-navy)]' :
 'bg-current'
            )}
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
