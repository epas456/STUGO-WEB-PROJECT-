import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, HelpCircle, Building2, GraduationCap, CreditCard, Star, Shield, XCircle, Lock, ChevronRight } from 'lucide-react'
import { articulosAyuda } from '@/mocks/articulos-ayuda'

const categories = [
  { slug: 'primeros-pasos', name: 'Primeros pasos', icon: HelpCircle, color: '#2D5BFF' },
  { slug: 'empresas', name: 'Empresas', icon: Building2, color: '#10B981' },
  { slug: 'estudiantes', name: 'Estudiantes', icon: GraduationCap, color: '#F59E0B' },
  { slug: 'pagos', name: 'Pagos y cobros', icon: CreditCard, color: '#8B5CF6' },
  { slug: 'reputacion', name: 'Reputación', icon: Star, color: '#EC4899' },
  { slug: 'verificacion', name: 'Verificación', icon: Shield, color: '#14B8A6' },
  { slug: 'cancelaciones', name: 'Cancelaciones', icon: XCircle, color: '#EF4444' },
  { slug: 'privacidad', name: 'Cuenta y privacidad', icon: Lock, color: '#6366F1' },
]

export default function Ayuda() {
  const [search, setSearch] = useState('')
  const popular = articulosAyuda.slice(0, 5)

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

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Categories */}
        <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Explorar por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {categories.map(cat => (
            <Link key={cat.slug} to={`/centro-de-ayuda/${cat.slug}`}
              className="p-5 rounded-[var(--radius-lg)] text-center hover:scale-105 transition-transform"
              style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: cat.color + '22' }}>
                <cat.icon size={20} style={{ color: cat.color }} />
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{cat.name}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {articulosAyuda.filter(a => a.categoria.toLowerCase().includes(cat.slug.replace('-', ' '))).length || Math.floor(Math.random() * 5) + 3} artículos
              </div>
            </Link>
          ))}
        </div>

        {/* Popular articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Artículos populares</h2>
          <div className="rounded-[var(--radius-lg)] overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {popular.map(art => (
              <Link key={art.id} to={`/centro-de-ayuda/${art.categoria.toLowerCase()}/${art.slug}`}
                className="flex items-center justify-between p-4 hover:bg-[var(--bg-subtle)] transition-colors">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{art.titulo}</span>
                <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center p-8 rounded-[var(--radius-xl)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>¿No encuentras lo que buscas?</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Nuestro equipo de soporte responde en menos de 4 horas laborables.</p>
          <Link to="/contacto">
            <button className="px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-white" style={{ background: 'var(--brand-primary)' }}>
              Contactar con soporte
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
