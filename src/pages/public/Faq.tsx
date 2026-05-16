import { useState, useMemo } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { Search, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { faq, categoriasFaq } from '@/mocks/faq'
import { toast } from 'sonner'

const categoriaLabels: Record<string, string> = {
  todas: 'Todas',
  general: 'General',
  estudiantes: 'Para estudiantes',
  empresas: 'Para empresas',
  pagos: 'Pagos',
  seguridad: 'Verificación',
  legal: 'Legal',
  tecnico: 'Soporte técnico',
}

const CATEGORY_TABS = [
  { id: 'todas', label: 'Todas' },
  { id: 'empresas', label: 'Para empresas' },
  { id: 'estudiantes', label: 'Para estudiantes' },
  { id: 'pagos', label: 'Pagos' },
  { id: 'seguridad', label: 'Verificación' },
  { id: 'legal', label: 'Legal' },
  { id: 'tecnico', label: 'Soporte técnico' },
  { id: 'general', label: 'General' },
]

export default function Faq() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('todas')
  const debouncedSearch = useDebounce(search, 150)

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim()
    return faq.filter(item => {
      const catMatch = category === 'todas' || item.categoria === category
      if (!catMatch) return false
      if (!q) return true
      return (
        item.pregunta.toLowerCase().includes(q) ||
        item.respuesta.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      )
    })
  }, [debouncedSearch, category])

  const handleUseful = (id: string, useful: boolean) => {
    toast.success(useful ? '¡Gracias por tu feedback!' : 'Entendido. Mejoraremos esta respuesta.', {
      description: useful ? 'Nos alegra que haya sido útil.' : 'Tu opinión nos ayuda a mejorar.',
    })
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="py-20 text-center px-4" style={{ background: 'linear-gradient(180deg, rgba(45,91,255,0.05) 0%, transparent 100%)' }}>
        <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand-primary)' }}>
          Ayuda
        </span>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Preguntas frecuentes</h1>
        <p className="text-xl max-w-xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
          Encuentra respuesta a las dudas más comunes sobre STUGO.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Busca tu pregunta..."
            className="w-full pl-12 pr-4 py-4 text-base transition-all"
            style={{
              background: 'var(--bg-base)',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--text-primary)',
              outline: 'none',
              boxShadow: 'var(--shadow-md)',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--brand-primary)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className="px-4 py-2 text-sm font-medium rounded-full transition-all"
              style={{
                background: category === cat.id ? 'var(--brand-primary)' : 'var(--bg-subtle)',
                color: category === cat.id ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${category === cat.id ? 'var(--brand-primary)' : 'var(--border)'}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
          {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
          {debouncedSearch && ` para "${debouncedSearch}"`}
        </p>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No encontramos resultados</h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Prueba con otros términos o{' '}
              <button onClick={() => { setSearch(''); setCategory('todas') }} style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
                reinicia la búsqueda
              </button>
            </p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              ¿No encuentras lo que buscas? <a href="/contacto" style={{ color: 'var(--brand-primary)' }}>Escríbenos →</a>
            </p>
          </div>
        )}

        {/* Accordion list */}
        {filtered.length > 0 && (
          <Accordion.Root type="multiple" className="space-y-3">
            {filtered.map((item) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                style={{
                  background: 'var(--bg-base)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                }}
              >
                <Accordion.Trigger
                  className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                      style={{ background: 'rgba(45,91,255,0.08)', color: 'var(--brand-primary)' }}>
                      {categoriaLabels[item.categoria] || item.categoria}
                    </span>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {item.pregunta}
                    </p>
                  </div>
                  <ChevronDown
                    size={18}
                    style={{ color: 'var(--text-secondary)', flexShrink: 0, transition: 'transform 0.2s' }}
                    className="group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
                <Accordion.Content
                  style={{ overflow: 'hidden' }}
                  className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
                >
                  <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--border)' }}>
                    <p className="text-sm leading-relaxed pt-4" style={{ color: 'var(--text-secondary)' }}>
                      {item.respuesta}
                    </p>

                    {/* Useful feedback */}
                    <div className="mt-4 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>¿Te ha resultado útil?</span>
                      <button
                        onClick={() => handleUseful(item.id, true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                        style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}
                      >
                        <ThumbsUp size={12} />
                        Sí
                      </button>
                      <button
                        onClick={() => handleUseful(item.id, false)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                        style={{ background: 'rgba(239,68,68,0.08)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.15)' }}
                      >
                        <ThumbsDown size={12} />
                        No
                      </button>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 rounded-[var(--radius-xl)]"
          style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>¿No encuentras lo que buscas?</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Nuestro equipo de soporte responde en menos de 2 horas laborables.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--brand-primary)' }}
          >
            Contactar con soporte
          </a>
        </div>
      </div>
    </div>
  )
}
