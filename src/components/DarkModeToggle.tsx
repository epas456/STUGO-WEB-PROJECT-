import { Sun, Moon } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

interface DarkModeToggleProps {
  className?: string
  size?: 'sm' | 'md'
}

export function DarkModeToggle({ className, size = 'md' }: DarkModeToggleProps) {
  const { theme, setTheme } = useStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
  }

  const iconSize = size === 'sm' ? 16 : 18

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
      title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
      className={cn(
 'flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-150',
 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]',
        size === 'sm' ? 'w-8 h-8' : 'w-10 h-10',
        className
      )}
    >
      <span
        className="transition-transform duration-300"
        style={{ transform: theme === 'dark' ? 'rotate(360deg)' : 'rotate(0deg)' }}
      >
        {theme === 'light' ? <Moon size={iconSize} /> : <Sun size={iconSize} />}
      </span>
    </button>
  )
}
