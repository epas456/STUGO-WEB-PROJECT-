import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
 'inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-md)] transition-all duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
 'bg-[var(--brand-primary)] text-[var(--on-primary)] hover:bg-[var(--brand-primary-hover)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
        secondary:
 'bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)] border border-[var(--border)]',
        outline:
 'bg-transparent text-[var(--brand-primary)] border border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-[var(--on-primary)]',
        ghost:
 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]',
        danger:
 'bg-[var(--danger)] text-white hover:bg-red-600 shadow-[var(--shadow-sm)]',
        accent:
 'bg-[var(--brand-accent)] text-[#0E0F12] hover:bg-[var(--brand-accent-hover)] shadow-[var(--shadow-sm)]',
        link:
 'bg-transparent text-[var(--brand-primary)] hover:underline p-0 h-auto',
      },
      size: {
        xs: 'text-xs px-2.5 py-1.5 h-7',
        sm: 'text-sm px-3 py-2 h-8',
        md: 'text-sm px-4 py-2.5 h-10',
        lg: 'text-base px-5 py-3 h-12',
        xl: 'text-lg px-7 py-4 h-14',
        icon: 'w-10 h-10 p-0',
 'icon-sm': 'w-8 h-8 p-0',
 'icon-lg': 'w-12 h-12 p-0',
      },
      loading: {
        true: 'relative pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      loading: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, loading, className }))}
        disabled={disabled || loading === true}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              style={{ animation: 'spin 0.75s linear infinite' }}
            />
          </span>
        )}
        <span className={cn('flex items-center gap-2', loading && 'invisible')}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
