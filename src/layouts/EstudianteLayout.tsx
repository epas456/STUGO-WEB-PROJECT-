import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Briefcase, MessageSquare, Star, CreditCard,
  Settings, Bell, LogOut, ChevronDown, ChevronLeft, ChevronRight,
  Menu, X, User, Zap, Home, Award, Search,
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { CommandPalette } from '@/components/CommandPalette'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { label: 'Dashboard', href: '/estudiante/dashboard', icon: LayoutDashboard },
  { label: 'Buscar Turnos', href: '/estudiante/turnos', icon: Search, badge: null },
  { label: 'Mis Turnos', href: '/estudiante/mis-turnos', icon: Briefcase },
  { label: 'Mensajes', href: '/estudiante/mensajes', icon: MessageSquare, badge: 2 },
  { label: 'Mi Perfil', href: '/estudiante/perfil', icon: User },
  { label: 'Valoraciones', href: '/estudiante/valoraciones', icon: Star },
  { label: 'Mi Cartera', href: '/estudiante/cartera', icon: CreditCard },
  { label: 'Badges', href: '/estudiante/badges', icon: Award },
  { label: 'Configuración', href: '/estudiante/configuracion', icon: Settings },
]

// Bottom nav for mobile (5 most important)
const bottomNavLinks = [
  { label: 'Inicio', href: '/estudiante/dashboard', icon: Home },
  { label: 'Turnos', href: '/estudiante/turnos', icon: Briefcase },
  { label: 'Mensajes', href: '/estudiante/mensajes', icon: MessageSquare, badge: 2 },
  { label: 'Cartera', href: '/estudiante/cartera', icon: CreditCard },
  { label: 'Perfil', href: '/estudiante/perfil', icon: User },
]

function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link to="/estudiante/dashboard" className="flex items-center gap-2 font-bold text-lg shrink-0">
      {collapsed ? (
        <span className="w-8 h-8 bg-[var(--brand-primary)] rounded-[var(--radius-sm)] flex items-center justify-center text-[var(--on-primary)] text-sm font-bold">
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

export default function EstudianteLayout() {
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

  const getPageTitle = () => {
    const link = sidebarLinks.find((l) => l.href === location.pathname)
    return link?.label || 'Panel'
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg-subtle)]">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
 'hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 bg-[var(--bg-base)] border-r border-[var(--border)] transition-all duration-300',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        <div className={cn('flex items-center h-16 px-4 border-b border-[var(--border)]', collapsed ? 'justify-center' : 'justify-between')}>
          <Logo collapsed={collapsed} />
          {!collapsed && (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              ESTUDIANTE
            </span>
          )}
        </div>

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
                    ? 'bg-[var(--brand-primary)] text-[var(--on-primary)] shadow-[var(--shadow-sm)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon size={18} className="shrink-0" strokeWidth={2} aria-hidden="true" />
                  {!collapsed && <span className="flex-1">{link.label}</span>}
                  {!collapsed && link.badge !== undefined && link.badge !== null && (
                    <span className={cn(
 'text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                      isActive ? 'bg-white/20 text-[var(--on-primary)]' : 'bg-[var(--brand-primary)] text-[var(--on-primary)]'
                    )}>
                      {link.badge}
                    </span>
                  )}
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

        {/* Quick publish */}
        {!collapsed && (
          <div className="px-2 pb-3">
            <Link
              to="/estudiante/turnos"
              className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium bg-[var(--brand-accent)] text-[#0E0F12] hover:bg-[var(--brand-accent-hover)] transition-colors"
            >
              <Zap size={16} />
              Buscar turnos
            </Link>
          </div>
        )}

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

      {/* Mobile sidebar */}
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
                          ? 'bg-[var(--brand-primary)] text-[var(--on-primary)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                      )
                    }
                  >
                    <link.icon size={18} strokeWidth={2} aria-hidden="true" />
                    <span className="flex-1">{link.label}</span>
                    {link.badge !== undefined && link.badge !== null && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--brand-primary)] text-[var(--on-primary)] min-w-[18px] text-center">
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
 'lg:ml-60 pb-16 lg:pb-0',
          collapsed && 'lg:ml-16'
        )}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-[var(--bg-base)] border-b border-[var(--border)] flex items-center px-4 gap-4 shadow-[var(--shadow-xs)]">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-base font-semibold text-[var(--text-primary)] lg:hidden">
            {getPageTitle()}
          </h1>

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
                        Marcar todas leídas
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-sm text-[var(--text-tertiary)]">
                        Sin notificaciones
                      </div>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <div
                          key={n.id}
                          className={cn(
 'px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer',
                            !n.read && 'bg-[var(--bg-subtle)]'
                          )}
                        >
                          {!n.read && (
                            <span className="w-1.5 h-1.5 bg-[var(--brand-primary)] rounded-full inline-block mr-2 mb-0.5" />
                          )}
                          <p className={cn('text-sm inline', !n.read ? 'font-medium text-[var(--text-primary)]' : 'text-[var(--text-secondary)]')}>
                            {n.title}
                          </p>
                          <p className="text-xs text-[var(--text-tertiary)] mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-[var(--border)]">
                    <Link
                      to="/estudiante/notificaciones"
                      onClick={() => setNotifOpen(false)}
                      className="text-xs text-[var(--brand-primary)] hover:underline"
                    >
                      Ver todas las notificaciones
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              <div className="w-8 h-8 bg-[var(--brand-primary)] rounded-full flex items-center justify-center text-[var(--on-primary)] text-sm font-semibold">
                {user?.name ? user.name[0].toUpperCase() : 'E'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">
                  {user?.name || 'Mi perfil'}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">Estudiante</p>
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
                    <p className="text-sm font-medium text-[var(--text-primary)]">{user?.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    {[
                      { label: 'Mi perfil', href: '/estudiante/perfil', icon: <User size={15} /> },
                      { label: 'Mi cartera', href: '/estudiante/cartera', icon: <CreditCard size={15} /> },
                      { label: 'Configuración', href: '/estudiante/configuracion', icon: <Settings size={15} /> },
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

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[var(--bg-base)] border-t border-[var(--border)] flex items-center">
        {bottomNavLinks.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
 'flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 relative transition-colors',
                  isActive ? 'text-[var(--brand-primary)]' : 'text-[var(--text-tertiary)]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon size={20} />
                    {link.badge && (
                      <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[var(--danger)] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] font-medium">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="bottomNavIndicator"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[var(--brand-primary)] rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Close dropdowns */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => { setNotifOpen(false); setProfileOpen(false) }}
        />
      )}
    </div>
  )
}
