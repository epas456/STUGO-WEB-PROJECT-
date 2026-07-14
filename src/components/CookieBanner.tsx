import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, ChevronDown, ChevronUp, X } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'

interface CookieCategory {
  id: string
  label: string
  description: string
  required: boolean
  enabled: boolean
}

const defaultCategories: CookieCategory[] = [
  {
    id: 'necessary',
    label: 'Cookies necesarias',
    description: 'Esenciales para el funcionamiento de la plataforma. Sin ellas, servicios como el inicio de sesión o el carrito no funcionarían.',
    required: true,
    enabled: true,
  },
  {
    id: 'functional',
    label: 'Cookies funcionales',
    description: 'Recuerdan tus preferencias (idioma, tema oscuro, región) para personalizar tu experiencia.',
    required: false,
    enabled: true,
  },
  {
    id: 'analytics',
    label: 'Cookies analíticas',
    description: 'Nos ayudan a entender cómo usas la plataforma para mejorar nuestros servicios. No identifican tu identidad.',
    required: false,
    enabled: false,
  },
  {
    id: 'marketing',
    label: 'Cookies de marketing',
    description: 'Permiten mostrar publicidad relevante dentro y fuera de STUGO. Usadas por nuestros socios publicitarios.',
    required: false,
    enabled: false,
  },
]

export function CookieBanner() {
  const { cookieConsent, setCookieConsent } = useStore()
  const [showDetails, setShowDetails] = useState(false)
  const [categories, setCategories] = useState(defaultCategories)

  if (cookieConsent !== 'pending') return null

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id && !c.required ? { ...c, enabled: !c.enabled } : c))
    )
  }

  const handleAcceptAll = () => {
    setCookieConsent('accepted')
  }

  const handleRejectAll = () => {
    setCookieConsent('rejected')
  }

  const handleSaveCustom = () => {
    setCookieConsent('custom')
  }

  return (
    <AnimatePresence>
      {cookieConsent === 'pending' && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
          role="dialog"
          aria-label="Configuración de cookies"
          aria-modal="true"
        >
          <div className="max-w-3xl mx-auto bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--brand-primary)] bg-opacity-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0">
                  <Cookie size={20} className="text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[var(--text-primary)] text-base mb-1">
                    Tu privacidad importa
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Usamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. Puedes aceptarlas todas, rechazarlas o configurarlas según tus preferencias. Las tres opciones tienen el mismo nivel de prominencia, tal como exige la AEPD.{' '}
                    <a href="/privacidad" className="text-[var(--brand-primary)] hover:underline">
                      Política de cookies
                    </a>
                  </p>
                </div>
              </div>

              {/* Accordion de detalles */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4"
                aria-expanded={showDetails}
              >
                {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showDetails ? 'Ocultar detalles' : 'Personalizar cookies'}
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-3 mb-5 border-t border-[var(--border)] pt-4">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-start justify-between gap-4 p-3 rounded-[var(--radius-md)] bg-[var(--bg-subtle)]"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-medium text-[var(--text-primary)]">
                                {category.label}
                              </span>
                              {category.required && (
                                <span className="text-[10px] bg-[var(--bg-muted)] text-[var(--text-tertiary)] px-1.5 py-0.5 rounded-full">
                                  Siempre activa
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                          <button
                            role="switch"
                            aria-checked={category.enabled}
                            aria-label={`${category.enabled ? 'Desactivar' : 'Activar'} ${category.label}`}
                            disabled={category.required}
                            onClick={() => toggleCategory(category.id)}
                            className={cn(
 'shrink-0 w-10 h-6 rounded-full transition-all duration-200 relative',
                              category.enabled
                                ? 'bg-[var(--brand-primary)]'
                                : 'bg-[var(--border-strong)]',
                              category.required && 'opacity-60 cursor-not-allowed'
                            )}
                          >
                            <span
                              className={cn(
 'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200',
                                category.enabled ? 'left-5' : 'left-1'
                              )}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botones - mismo nivel de prominencia (AEPD compliant) */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={handleRejectAll}
                >
                  Rechazar todas
                </Button>
                {showDetails && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleSaveCustom}
                  >
                    Guardar preferencias
                  </Button>
                )}
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleAcceptAll}
                >
                  Aceptar todas
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
