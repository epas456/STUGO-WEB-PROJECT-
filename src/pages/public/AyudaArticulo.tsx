import { Link, useParams } from 'react-router-dom'
import { ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react'
import { articulosAyuda } from '@/mocks/articulos-ayuda'
import { toast } from 'sonner'

export default function AyudaArticulo() {
  const { articulo } = useParams()
  const art = articulosAyuda.find(a => a.slug === articulo)

  if (!art) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Artículo no encontrado</h1>
        <Link to="/centro-de-ayuda" style={{ color: 'var(--brand-primary)' }}>← Volver al Centro de ayuda</Link>
      </div>
    )
  }

  const related = articulosAyuda.filter(a => a.categoria === art.categoria && a.id !== art.id).slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8 flex items-center gap-2 text-sm flex-wrap" style={{ color: 'var(--text-tertiary)' }}>
        <Link to="/" className="hover:underline">Inicio</Link> <ChevronRight size={14} />
        <Link to="/centro-de-ayuda" className="hover:underline">Centro de ayuda</Link> <ChevronRight size={14} />
        <span style={{ color: 'var(--text-primary)' }}>{art.titulo}</span>
      </div>

      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>{art.titulo}</h1>

      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {(art.contenido || '').split('\n').map((line, i) => {
          if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{line.slice(3)}</h2>
          if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>{line.slice(4)}</h3>
          if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-1 list-disc">{line.slice(2)}</li>
          if (line.startsWith('**')) return <p key={i} className="mb-4 font-semibold" style={{ color: 'var(--text-primary)' }}>{line.replace(/\*\*/g, '')}</p>
          if (line.trim() === '') return <br key={i} />
          return <p key={i} className="mb-4">{line}</p>
        })}
      </div>

      <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>¿Te ha resultado útil?</p>
        <div className="flex gap-3 mb-10">
          <button onClick={() => toast.success('¡Gracias por tu feedback!')}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <ThumbsUp size={15} /> Sí
          </button>
          <button onClick={() => toast('Gracias. Lo mejoraremos.')}
            className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <ThumbsDown size={15} /> No
          </button>
        </div>
        {related.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Artículos relacionados</h3>
            <div className="space-y-2">
              {related.map(r => (
                <Link key={r.id} to={`/centro-de-ayuda/${r.categoria.toLowerCase()}/${r.slug}`}
                  className="flex items-center gap-2 text-sm hover:underline" style={{ color: 'var(--brand-primary)' }}>
                  <ChevronRight size={14} /> {r.titulo}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10 p-5 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>¿Sigues necesitando ayuda?</p>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Nuestro equipo responde en menos de 4 horas laborables.</p>
          <Link to="/contacto">
            <button className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium text-[var(--on-primary)]" style={{ background: 'var(--brand-primary)' }}>
              Contactar con soporte
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
