import { Link, useParams } from 'react-router-dom'
import { Clock, Calendar, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react'
import { articulosBlog } from '@/mocks/articulos-blog'
import { toast } from 'sonner'

export default function BlogArticulo() {
  const { slug } = useParams()
  const article = articulosBlog.find(a => a.slug === slug)

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Artículo no encontrado</h1>
        <Link to="/blog" className="text-sm" style={{ color: 'var(--brand-primary)' }}>← Volver al blog</Link>
      </div>
    )
  }

  const related = articulosBlog.filter(a => a.categoria === article.categoria && a.id !== article.id).slice(0, 2)

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <div className="mb-8 text-sm flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
        <Link to="/" className="hover:underline">Inicio</Link> ›
        <Link to="/blog" className="hover:underline">Blog</Link> ›
        <span style={{ color: 'var(--text-secondary)' }}>{article.titulo}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Article */}
        <div className="lg:col-span-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
            style={{ background: 'var(--brand-primary)' }}>{article.categoria}</span>
          <h1 className="text-3xl font-bold mb-4 leading-tight" style={{ color: 'var(--text-primary)' }}>{article.titulo}</h1>
          <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1"><Calendar size={14} /> {article.fechaPublicacion || '2026'}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {article.tiempoLectura || 5} min de lectura</span>
            {article.autor && <span>Por {article.autor}</span>}
          </div>

          <div className="prose max-w-none" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {(article.contenido || '').split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>{line.slice(4)}</h3>
              if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1">{line.slice(2)}</li>
              if (line.trim() === '') return <br key={i} />
              return <p key={i} className="mb-4">{line}</p>
            })}
          </div>

          {/* Feedback */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>¿Te ha resultado útil este artículo?</p>
            <div className="flex gap-3">
              <button onClick={() => toast.success('Gracias por tu feedback ')}
                className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm transition-colors hover:bg-green-50"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <ThumbsUp size={16} /> Sí, me ayudó
              </button>
              <button onClick={() => toast('Gracias. Intentaremos mejorar el artículo.')}
                className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm transition-colors hover:bg-red-50"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <ThumbsDown size={16} /> Podría mejorar
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <Link to="/blog" className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--brand-primary)' }}>
            <ArrowLeft size={14} /> Volver al blog
          </Link>
          {related.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Artículos relacionados</h3>
              <div className="space-y-4">
                {related.map(r => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="block p-4 rounded-[var(--radius-md)] hover:bg-[var(--bg-subtle)] transition-colors"
                    style={{ border: '1px solid var(--border)' }}>
                    <div className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{r.titulo}</div>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{r.tiempoLectura || 5} min</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
