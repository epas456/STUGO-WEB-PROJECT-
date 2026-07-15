import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, ChevronDown } from 'lucide-react'
import { articulosAyuda } from '@/mocks/articulos-ayuda'
import { faq, categoriasFaq } from '@/mocks/faq'

export default function Ayuda() {
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [openId, setOpenId] = useState<string | null>(null)

  const q = search.trim().toLowerCase()

  const articulos = q
    ? articulosAyuda.filter(a => a.titulo.toLowerCase().includes(q))
    : articulosAyuda.slice(0, 5)

  const preguntas = faq.filter(f => {
    if (categoria !== 'todas' && f.categoria !== categoria) return false
    if (q && !f.pregunta.toLowerCase().includes(q) && !f.respuesta.toLowerCase().includes(q)) return false
    return true
  })

  return (
    <div style={{ background: 'var(--bg-base)' }}>
      {/* Hero search */}
      <div className="py-20 px-4 text-center" style={{ background: 'linear-gradient(135deg, var(--bg-subtle) 0%, var(--bg-base) 100%)' }}>
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>¿En qué podemos ayudarte?</h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>Centro de ayuda de STUGO — respuestas rápidas a tus preguntas.</p>
        <div className="relative max-w-lg mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Busca un tema o escribe tu pregunta..."
            className="w-full pl-12 pr-4 py-3.5 rounded-[var(--radius-xl)] text-sm outline-none"
            style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Guías */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            {q ? 'Guías relacionadas' : 'Guías más consultadas'}
          </h2>
          {articulos.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No hay guías que coincidan con tu búsqueda.</p>
          ) : (
            <div className="rounded-[var(--radius-lg)] overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {articulos.map(art => (
                <Link key={art.id} to={`/ayuda/${art.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-[var(--bg-subtle)] transition-colors"
                  style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{art.titulo}</span>
                  <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Preguntas frecuentes */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Preguntas frecuentes</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {[{ id: 'todas', label: 'Todas' }, ...categoriasFaq].map(cat => (
              <button key={cat.id} onClick={() => setCategoria(cat.id)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  background: categoria === cat.id ? 'var(--brand-primary)' : 'var(--bg-subtle)',
                  color: categoria === cat.id ? 'var(--on-primary)' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}>
                {cat.label}
              </button>
            ))}
          </div>
          {preguntas.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No hay preguntas que coincidan con tu búsqueda.</p>
          ) : (
            <div className="rounded-[var(--radius-lg)] overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {preguntas.map(item => {
                const open = openId === item.id
                return (
                  <div key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <button onClick={() => setOpenId(open ? null : item.id)}
                      className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-[var(--bg-subtle)] transition-colors">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.pregunta}</span>
                      <ChevronDown size={16} className="shrink-0 transition-transform" style={{ color: 'var(--text-tertiary)', transform: open ? 'rotate(180deg)' : 'none' }} />
                    </button>
                    {open && (
                      <p className="px-4 pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {item.respuesta}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="text-center p-8 rounded-[var(--radius-xl)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>¿No encuentras lo que buscas?</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Nuestro equipo de soporte responde en menos de 4 horas laborables.</p>
          <Link to="/contacto">
            <button className="px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-[var(--on-primary)]" style={{ background: 'var(--brand-primary)' }}>
              Contactar con soporte
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
