import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  hideClose?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-[calc(100vw-2rem)]',
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  size = 'md',
  hideClose = false,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-in"
          style={{ animationDirection: 'var(--state, normal)' }}
        />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'bg-[var(--bg-base)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]',
            'border border-[var(--border)]',
            'w-full mx-4 p-6',
            'focus:outline-none',
            'data-[state=open]:animate-scale-in',
            sizeClasses[size],
            className
          )}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {(title || !hideClose) && (
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                {title && (
                  <Dialog.Title className="text-lg font-semibold text-[var(--text-primary)]">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description id="modal-description" className="text-sm text-[var(--text-secondary)] mt-1">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              {!hideClose && (
                <Dialog.Close
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </Dialog.Close>
              )}
            </div>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const ModalTrigger = Dialog.Trigger
