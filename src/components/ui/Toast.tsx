import { Toaster } from 'sonner'
import { useStore } from '@/store/useStore'

export function ToastProvider() {
  const theme = useStore((s) => s.theme)

  return (
    <Toaster
      theme={theme}
      position="bottom-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--bg-base)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
        },
      }}
    />
  )
}
