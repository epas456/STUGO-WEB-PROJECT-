import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown,
  Briefcase, Users, Building2, BookOpen, HelpCircle, Star,
  FileText, Shield, Mail, Globe, Share2, ExternalLink, Link2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { CommandPalette } from '@/components/CommandPalette'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

const navLinks = [
  {
    label: 'Estudiantes',
    href: '/estudiantes',
    children: [
      { label: 'Buscar turnos', href: '/turnos', icon: <Briefcase size={16} /> },
      { label: 'Directorio de estudiantes', href: '/estudiantes', icon: <Users size={16} /> },
      { label: 'Historias de éxito', href: '/blog?categoria=historias', icon: <BookOpen size={16} /> },
    ],
  },
  {
    label: 'Empresas',
    href: '/empresas',
    children: [
      { label: 'Publicar un turno', href: '/empresa/registro', icon: <Briefcase size={16} /> },
      { label: 'Directorio de empresas', href: '/empresas', icon: <Building2 size={16} /> },
      { label: 'Planes y precios', href: '/precios', icon: <Star size={16} /> },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Precios', href: '/precios' },
  {
    label: 'Recursos',
    href: '/ayuda',
    children: [
      { label: 'Centro de ayuda', href: '/ayuda', icon: <HelpCircle size={16} /> },
      { label: 'Preguntas frecuentes', href: '/faq', icon: <FileText size={16} /> },
      { label: 'Contacto', href: '/contacto', icon: <Mail size={16} /> },
    ],
  },
]

const footerColumns = [
  {
    title: 'Para Estudiantes',
    links: [
      { label: 'Cómo funciona', href: '/como-funciona' },
      { label: 'Buscar turnos', href: '/turnos' },
      { label: 'Historias de éxito', href: '/blog' },
      { label: 'Derechos laborales', href: '/blog/derechos-laborales-trabajador-temporal-espana' },
    ],
  },
  {
    title: 'Para Empresas',
    links: [
      { label: 'Publicar turnos', href: '/empresa/registro' },
      { label: 'Planes y precios', href: '/precios' },
      { label: 'Integraciones API', href: '/api' },
      { label: 'Casos de uso', href: '/empresas' },
      { label: 'Blog para empresas', href: '/blog?categoria=empresas' },
    ],
  },
  {
    title: 'STUGO',
    links: [
      { label: 'Quiénes somos', href: '/nosotros' },
      { label: 'Blog', href: '/blog' },
      { label: 'Trabaja con nosotros', href: '/empleo' },
      { label: 'Prensa', href: '/prensa' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y condiciones', href: '/terminos' },
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Política de cookies', href: '/cookies' },
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'AEPD', href: '/aepd' },
    ],
  },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1.5 font-bold text-xl shrink-0">
      <span className="relative">
        <span className="text-[var(--brand-primary)]">STU</span>
        <span className="text-[var(--text-primary)]">GO</span>
        <span className="absolute -top-0.5 -right-2 w-2 h-2 bg-[var(--brand-accent)] rounded-full" />
      </span>
    </Link>
  )
}

function DropdownMenu({ children, items }: { children: React.ReactNode; items: { label: string; href: string; icon?: React.ReactNode }[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-2">
        {children}
        <ChevronDown size={14} className={cn('transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-2 z-50 min-w-[220px]"
          >
            <div className="bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden p-1.5">
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.icon && <span className="text-[var(--text-tertiary)]">{item.icon}</span>}
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { auth } = useStore()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)]">
      {/* Navbar */}
      <header
        className={cn(
 'sticky top-0 z-40 transition-all duration-200',
          scrolled
            ? 'bg-[var(--bg-base)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-[var(--shadow-sm)]'
            : 'bg-[var(--bg-base)]'
        )}
        style={{ height: 'var(--navbar-height)' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Center nav - desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.href} items={link.children}>
                  {link.label}
                </DropdownMenu>
              ) : (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
 'px-3 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors',
                      isActive
                        ? 'text-[var(--text-primary)] bg-[var(--bg-subtle)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <CommandPalette />
            <DarkModeToggle size="sm" className="hidden sm:flex" />

            {auth.role === 'public' ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link to="/registro" className="hidden sm:inline-flex">
                  <Button size="sm">Empezar gratis</Button>
                </Link>
              </>
            ) : auth.role === 'empresa' ? (
              <Link to="/empresa/dashboard"><Button size="sm">Mi panel</Button></Link>
            ) : (
              <Link to="/estudiante/dashboard"><Button size="sm">Mi panel</Button></Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-[var(--border)] bg-[var(--bg-base)]"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      to={link.href}
                      className="block px-3 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-[var(--radius-md)] transition-colors"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4 mt-1 space-y-0.5">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] rounded-[var(--radius-md)] transition-colors"
                          >
                            {child.icon}
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
                  <DarkModeToggle size="sm" />
                  <Link to="/login" className="block px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] rounded-[var(--radius-md)] transition-colors">
                    Iniciar sesión
                  </Link>
                  <Link to="/registro" className="block">
                    <Button size="md" className="w-full">Empezar gratis</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[var(--bg-subtle)] border-t border-[var(--border)] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo />
              <span className="text-sm text-[var(--text-tertiary)]">
                Conectando talento estudiantil con empresas en España
              </span>
            </div>

            <div className="flex items-center gap-3">
              {[
                { Icon: X, href: 'https://twitter.com/stugo_es', label: 'X (Twitter)' },
                { Icon: Link2, href: 'https://linkedin.com/company/stugo', label: 'LinkedIn' },
                { Icon: Share2, href: 'https://instagram.com/stugo_es', label: 'Instagram' },
                { Icon: Globe, href: 'https://facebook.com/stugo', label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--text-tertiary)]">
            <span>© {new Date().getFullYear()} STUGO Technologies SL. Todos los derechos reservados.</span>
            <span>CIF: B-12345678</span>
            <span>Madrid, España</span>
            <span className="flex items-center gap-1">
              <Shield size={12} />
              RGPD Compliant · AEPD Registrado
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
