import { useState, useEffect, useCallback } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import {
  Search, Home, Briefcase, Users, Building2, Star, MessageSquare,
  HelpCircle, FileText, Settings, LogIn, ChevronRight, Zap,
  BookOpen, CreditCard, BarChart2,
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
  path: string
  group: string
  shortcut?: string
}

const publicItems: CommandItem[] = [
  { id: 'home', label: 'Inicio', icon: <Home size={16} />, path: '/', group: 'Páginas', shortcut: 'H' },
  { id: 'turnos', label: 'Explorar turnos', icon: <Briefcase size={16} />, path: '/turnos', group: 'Páginas' },
  { id: 'estudiantes', label: 'Directorio de estudiantes', icon: <Users size={16} />, path: '/estudiantes', group: 'Páginas' },
  { id: 'empresas', label: 'Empresas en STUGO', icon: <Building2 size={16} />, path: '/empresas', group: 'Páginas' },
  { id: 'precios', label: 'Precios y planes', icon: <CreditCard size={16} />, path: '/precios', group: 'Páginas' },
  { id: 'blog', label: 'Blog', icon: <BookOpen size={16} />, path: '/blog', group: 'Páginas' },
  { id: 'faq', label: 'Preguntas frecuentes', icon: <HelpCircle size={16} />, path: '/faq', group: 'Soporte' },
  { id: 'ayuda', label: 'Centro de ayuda', icon: <HelpCircle size={16} />, path: '/ayuda', group: 'Soporte' },
  { id: 'login', label: 'Iniciar sesión', icon: <LogIn size={16} />, path: '/login', group: 'Cuenta' },
  { id: 'registro', label: 'Registrarse gratis', icon: <Star size={16} />, path: '/registro', group: 'Cuenta' },
]

const estudianteItems: CommandItem[] = [
  { id: 'est-dashboard', label: 'Mi panel', icon: <Home size={16} />, path: '/estudiante/dashboard', group: 'Mi cuenta' },
  { id: 'est-turnos', label: 'Buscar turnos', icon: <Briefcase size={16} />, path: '/estudiante/turnos', group: 'Trabajo', shortcut: 'T' },
  { id: 'est-mis-turnos', label: 'Mis turnos', icon: <Zap size={16} />, path: '/estudiante/mis-turnos', group: 'Trabajo' },
  { id: 'est-mensajes', label: 'Mensajes', icon: <MessageSquare size={16} />, path: '/estudiante/mensajes', group: 'Comunicación', shortcut: 'M' },
  { id: 'est-perfil', label: 'Mi perfil', icon: <Users size={16} />, path: '/estudiante/perfil', group: 'Mi cuenta' },
  { id: 'est-cartera', label: 'Mi cartera', icon: <CreditCard size={16} />, path: '/estudiante/cartera', group: 'Pagos' },
  { id: 'est-valoraciones', label: 'Mis valoraciones', icon: <Star size={16} />, path: '/estudiante/valoraciones', group: 'Mi cuenta' },
  { id: 'est-academy', label: 'STUGO Academy', icon: <BookOpen size={16} />, path: '/estudiante/academy', group: 'Formación' },
  { id: 'est-config', label: 'Configuración', icon: <Settings size={16} />, path: '/estudiante/configuracion', group: 'Mi cuenta' },
]

const empresaItems: CommandItem[] = [
  { id: 'emp-dashboard', label: 'Panel empresa', icon: <Home size={16} />, path: '/empresa/dashboard', group: 'Mi empresa' },
  { id: 'emp-turnos', label: 'Gestionar turnos', icon: <Briefcase size={16} />, path: '/empresa/turnos', group: 'Operaciones', shortcut: 'T' },
  { id: 'emp-nuevo-turno', label: 'Publicar nuevo turno', icon: <Zap size={16} />, path: '/empresa/turnos/nuevo', group: 'Operaciones' },
  { id: 'emp-candidatos', label: 'Buscar candidatos', icon: <Users size={16} />, path: '/empresa/candidatos', group: 'Talento' },
  { id: 'emp-mensajes', label: 'Mensajes', icon: <MessageSquare size={16} />, path: '/empresa/mensajes', group: 'Comunicación', shortcut: 'M' },
  { id: 'emp-analiticas', label: 'Analíticas', icon: <BarChart2 size={16} />, path: '/empresa/analiticas', group: 'Informes' },
  { id: 'emp-facturacion', label: 'Facturación', icon: <FileText size={16} />, path: '/empresa/facturacion', group: 'Pagos' },
  { id: 'emp-config', label: 'Configuración empresa', icon: <Settings size={16} />, path: '/empresa/configuracion', group: 'Mi empresa' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const { auth } = useStore()

  const getItems = () => {
    if (auth.role === 'estudiante') return [...publicItems, ...estudianteItems]
    if (auth.role === 'empresa') return [...publicItems, ...empresaItems]
    return publicItems
  }

  const items = getItems()

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelect = useCallback((path: string) => {
    navigate(path)
    setOpen(false)
    setValue('')
  }, [navigate])

  // Group items
  const groups = items.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {} as Record<string, CommandItem[]>)

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 h-9 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-subtle)] text-sm text-[var(--text-tertiary)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)] transition-colors min-w-[180px]"
        aria-label="Abrir búsqueda global (Ctrl+K)"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Buscar...</span>
        <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] bg-[var(--bg-muted)] px-1.5 py-0.5 rounded border border-[var(--border)] font-mono">
          <span>⌘K</span>
        </kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors"
        aria-label="Abrir búsqueda"
      >
        <Search size={18} />
      </button>

      {/* Palette */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Command panel */}
          <Command
            className="relative w-full max-w-xl bg-[var(--bg-base)] rounded-[var(--radius-xl)] border border-[var(--border)] shadow-[var(--shadow-xl)] overflow-hidden animate-scale-in"
            filter={(value, search) => {
              if (value.toLowerCase().includes(search.toLowerCase())) return 1
              return 0
            }}
          >
            <div className="flex items-center gap-3 px-4 border-b border-[var(--border)]">
              <Search size={18} className="text-[var(--text-tertiary)] shrink-0" />
              <Command.Input
                value={value}
                onValueChange={setValue}
                placeholder="Buscar en STUGO..."
                className="flex-1 h-14 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-base outline-none border-none"
                autoFocus
              />
              <kbd className="text-[10px] bg-[var(--bg-muted)] px-1.5 py-0.5 rounded border border-[var(--border)] font-mono text-[var(--text-tertiary)]">
                ESC
              </kbd>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              <Command.Empty className="py-12 text-center text-sm text-[var(--text-tertiary)]">
                No se encontraron resultados para "{value}"
              </Command.Empty>

              {Object.entries(groups).map(([group, groupItems]) => (
                <Command.Group
                  key={group}
                  heading={
                    <span className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                      {group}
                    </span>
                  }
                >
                  {groupItems.map((item) => (
                    <Command.Item
                      key={item.id}
                      value={item.label}
                      onSelect={() => handleSelect(item.path)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] cursor-pointer',
                        'text-sm text-[var(--text-primary)]',
                        'data-[selected=true]:bg-[var(--bg-subtle)] data-[selected=true]:text-[var(--brand-primary)]',
                        'transition-colors'
                      )}
                    >
                      <span className="text-[var(--text-tertiary)] data-[selected=true]:text-[var(--brand-primary)]">
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-[var(--text-tertiary)] hidden sm:block">
                          {item.description}
                        </span>
                      )}
                      <ChevronRight size={14} className="text-[var(--text-tertiary)] shrink-0" />
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>

            <div className="border-t border-[var(--border)] px-4 py-2 flex items-center gap-4 text-[11px] text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1">
                <kbd className="bg-[var(--bg-muted)] px-1.5 py-0.5 rounded border border-[var(--border)] font-mono">↑↓</kbd>
                navegar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="bg-[var(--bg-muted)] px-1.5 py-0.5 rounded border border-[var(--border)] font-mono">↵</kbd>
                seleccionar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="bg-[var(--bg-muted)] px-1.5 py-0.5 rounded border border-[var(--border)] font-mono">ESC</kbd>
                cerrar
              </span>
            </div>
          </Command>
        </div>
      )}
    </>
  )
}
