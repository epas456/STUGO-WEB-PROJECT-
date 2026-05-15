import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Briefcase, Users, MessageSquare, BarChart2,
  FileText, Settings, ChevronLeft, ChevronRight, Bell, LogOut,
  ChevronDown, Menu, X, Building2, CreditCard, Zap,
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { CommandPalette } from '@/components/CommandPalette'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  {
    label: 'Dashboard',
    href: '/empresa/dashboard',
    icon: LayoutDashboard,
    emoji: '📊',
  },
  {
    label: 'Mis Turnos',
    href: '/empresa/turnos',
    icon: Briefcase,
    emoji: '📋',
    badge: 3,
  },
  {
    label: 'Candidatos',
    href: '/empresa/candidatos',
    icon: Users,
    emoji: '👥',
  },
  {
    label: 'Mensajes',
    href: '/empresa/mensajes',
    icon: MessageSquare,
    emoji: '💬',
    badge: 5,
  },
  {
    label: 'Analíticas',
    href: '/empresa/analiticas',
    icon: BarChart2,
    emoji: '📈',
  },
  {
    label: 'Facturación',
    href: '/empresa/facturacion',
    icon: CreditCard,
    emoji: '💳',
  },
  {
    label: 'Documentos',
    href: '/empresa/documentos',
    icon: FileText,
    emoji: '📄',
  },
  {
    label: 'Configuración',
    href: '/empresa/configuracion',
    icon: Settings,
    emoji: '⚙️',
  },
]

function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link to="/empresa/dashboard" className="flex items-center gap-2 font-bold text-lg shrink-0">
      {collapsed ? (
        <span className="w-8 h-8 bg-[var(--brand-primary)] rounded-[var(--radius-sm)] flex items-center justify-center text-white text-sm font-bold">
          S
        </span>
      ) : (
        <span className="relative">
          <span className="text-[var(--brand-primary)]">STU</span>
          <span className="text-[var(--text-primary)]">GO</span>
          <span className="absolute -top-0.5 -right-2 w-2 h-2 bg-[var(--brand-accent)] rounded-full" />
        </span>
      )}
    </Link>
  )
}

function Breadcrumbs() {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)

  const labels: Record<string, string> = {
    empresa: 'Empresa',
    dashboard: 'Dashboard',
    turnos: 'Turnos',
    nuevo: 'Nuevo',
    candidatos: 'Candidatos',
    mensajes: 'Mensajes',
    analiticas: 'Analíticas',
    facturacion: 'Facturación',
    documentos: 'Documentos',
    configuracion: 'Configuración',
  }

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1 text-sm">
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1
        const href = '/' + parts.slice(0, i + 1).join('/')
        return (
          <span key={href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} className="text-[var(--text-tertiary)]" />}
            {isLast ? (
              <span className="text-[var(--text-primary)] font-medium capitalize">
                {labels[part] || part}
              </span>
            ) : (
              <Link
                to={href}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] capitalize transition-colors"
              >
                {labels[part] || part}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default function EmpresaLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { auth, logout, notifications, markAllNotificationsRead } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const user = auth.user

  return (
    <div className="min-h-screen flex bg-[var(--bg-subtle)]">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          'hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 bg-[var(--bg-base)] border-r border-[var(--border)] transition-all duration-300',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        {/* Logo area */}
        <div className={cn('flex items-center h-16 px-4 border-b border-[var(--border)]', collapsed ? 'justify-center' : 'justify-between')}>
          <Logo collapsed={collapsed} />
          {!collapsed && (
            <span className="text-[10px] font-semibold text-[var(--brand-primary)] bg-blue-50 px-1.5 py-0.5 rounded">
              EMPRESA
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              title={collapsed ? link.label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-150 relative group',
                  collapsed ? 'justify-center' : '',
                  isActive
                    ? 'bg-[var(--brand-primary)] text-white shadow-[var(--shadow-sm)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="shrink-0 text-base">{link.emoji}</span>
                  {!collapsed && <span className="flex-1">{link.label}</span>}
                  {!collapsed && link.badge && (
                    <span className={cn(
                      'text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                      isActive ? 'bg-white/20 text-white' : 'bg-[var(--brand-primary)] text-white'
                    )}>
                      {link.badge}
                    </span>
                  )}
                  {/* Tooltip on collapsed */}
                  {collapsed && (
                    <span className="absolute left-full ml-3 px-2 py-1 bg-[var(--text-primary)] text-[var(--bg-base)] text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                      {link.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick action */}
        {!collapsed && (
          <div className="px-2 pb-3">
            <Link
              to="/empresa/turnos/nuevo"
              className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium bg-[var(--brand-accent)] text-[var(--text-primary)] hover:bg-[var(--brand-accent-hover)] transition-colors"
            >
              <Zap size={16} />
              Publicar turno
            </Link>
          </div>
        )}

        {/* Collapse toggle */}
        <div className="border-t border-[var(--border)] p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors',
              collapsed ? 'justify-center' : ''
            )}
            aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Colapsar</span></>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-[var(--bg-base)] border-r border-[var(--border)] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border)]">
                <Logo collapsed={false} />
                <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                  <X size={20} className="text-[var(--text-secondary)]" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--brand-primary)] text-white'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                      )
                    }
                  >
                    <span className="text-base">{link.emoji}</span>
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--brand-primary)] text-white min-w-[18px] text-center">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={cn(
          'flex-1 flex flex-col min-h-screen transition-all duration-300',
          'lg:ml-60',
          collapsed && 'lg:ml-16'
        )}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-[var(--bg-base)] border-b border-[var(--border)] flex items-center px-4 gap-4 shadow-[var(--shadow-xs)]">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          <Breadcrumbs />

          <div className="flex-1" />

          <CommandPalette />
          <DarkModeToggle size="sm" />

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
              className="relative w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors"
              aria-label={`Notificaciones (${unreadCount} sin leer)`}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--danger)] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Notificaciones</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-[var(--brand-primary)] hover:underline"
                      >
                        Marcar todas como leídas
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-sm text-[var(--text-tertiary)]">
                        Sin notificaciones
                      </div>
                    ) : (
                      notifications.slice(0, 6).map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            'px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer',
                            !n.read && 'bg-blue-50/50'
                          )}
                        >
                          <p className={cn('text-sm', !n.read ? 'font-medium text-[var(--text-primary)]' : 'text-[var(--text-secondary)]')}>
                            {n.title}
                          </p>
                          <p className="text-xs text-[var(--text-tertiary)] mt-0.5 line-clamp-1">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <div className="w-8 h-8 bg-[var(--brand-primary)] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user?.name ? user.name[0].toUpperCase() : 'E'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">
                  {user?.name || 'Mi empresa'}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">Empresa</p>
              </div>
              <ChevronDown size={14} className="hidden sm:block text-[var(--text-tertiary)]" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-[var(--border)]">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{user?.name || 'Mi empresa'}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    {[
                      { label: 'Mi empresa', href: '/empresa/configuracion', icon: <Building2 size={15} /> },
                      { label: 'Facturación', href: '/empresa/facturacion', icon: <CreditCard size={15} /> },
                      { label: 'Configuración', href: '/empresa/configuracion', icon: <Settings size={15} /> },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--danger)] hover:bg-red-50 transition-colors mt-1 border-t border-[var(--border)] pt-2"
                    >
                      <LogOut size={15} />
                      Cerrar sesión
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => { setNotifOpen(false); setProfileOpen(false) }}
        />
      )}
    </div>
  )
}
