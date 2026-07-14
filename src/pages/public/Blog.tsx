import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, Calendar } from 'lucide-react'
import { articulosBlog } from '@/mocks/articulos-blog'

const CATEGORIES = ['Todos', 'Empleo joven', 'Gestión de turnos', 'Hostelería', 'Retail', 'Eventos', 'Sector educativo']
const CAT_COLORS: Record<string, string> = {
 'Empleo joven': '#1B2A4E', 'Gestión de turnos': '#10B981', 'Hostelería': '#F59E0B',
 'Retail': '#EF4444', 'Eventos': '#1B2A4E', 'Sector educativo': '#EC4899',
}

export default function Blog() {
  const [cat, setCat] = useState('Todos')
  const [search, setSearch] = useState('')

  const filtered = articulosBlog.filter(a =>
    (cat === 'Todos' || a.categoria === cat) &&
    (a.titulo.toLowerCase().includes(search.toLowerCase()) || a.resumen?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Blog STUGO</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Consejos, guías y tendencias sobre empleo joven y gestión de personal.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar artículos..."
          className="w-full pl-9 pr-4 py-2.5 rounded-[var(--radius-md)] text-sm outline-none"
          style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{ background: cat === c ? 'var(--brand-primary)' : 'var(--bg-subtle)', color: cat === c ? 'white' : 'var(--text-secondary)', border: '1px solid var(--border)' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--text-tertiary)' }}>No hemos encontrado artículos con «{search}».</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a => (
            <Link key={a.id} to={`/blog/${a.slug}`} className="group block rounded-[var(--radius-lg)] overflow-hidden hover:shadow-lg transition-shadow"
              style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
              {/* Color header */}
              <div className="h-2" style={{ background: CAT_COLORS[a.categoria] || 'var(--brand-primary)' }} />
              <div className="p-5">
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white mb-3"
                  style={{ background: CAT_COLORS[a.categoria] || 'var(--brand-primary)' }}>{a.categoria}</span>
                <h2 className="font-bold mb-2 leading-snug group-hover:text-[var(--brand-primary)] transition-colors"
                  style={{ color: 'var(--text-primary)' }}>{a.titulo}</h2>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{a.resumen || a.contenido?.slice(0, 100)}</p>
                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {a.fechaPublicacion || '2026'}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {a.tiempoLectura || 5} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
