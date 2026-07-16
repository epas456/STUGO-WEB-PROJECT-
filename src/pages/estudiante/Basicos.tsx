import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, ChefHat, ShoppingBag, Music, Package, CheckCircle2, XCircle } from 'lucide-react'
import { basicosSector } from '@/mocks/basicos-sector'

const SECTOR_ICONS: Record<string, React.ElementType> = {
  hosteleria: ChefHat,
  retail: ShoppingBag,
  eventos: Music,
  logistica: Package,
}

export default function Basicos() {
  const { sector } = useParams()
  const actual = basicosSector.find(b => b.slug === sector)

  // Índice: un acceso por sector
  if (!actual) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Básicos del sector</h1>
        <p className="text-sm mt-1 mb-8" style={{ color: 'var(--text-secondary)' }}>
          Lo mínimo que necesitas saber antes de tu primer turno en cada sector. Lectura de 2 minutos.
        </p>
        <div className="space-y-3">
          {basicosSector.map(b => {
            const Icon = SECTOR_ICONS[b.slug]
            return (
              <Link key={b.slug} to={`/estudiante/basicos/${b.slug}`}
                className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border transition-colors hover:bg-[var(--bg-subtle)]"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-base)' }}>
                <div className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                  style={{ background: 'var(--bg-subtle)', color: 'var(--brand-primary)' }}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{b.sector}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{b.intro}</p>
                </div>
                <ChevronRight size={16} className="shrink-0" style={{ color: 'var(--text-tertiary)' }} />
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  // Detalle: una pantalla por sector
  const bloques = [
    { titulo: 'Antes de ir', items: actual.antesDeIr },
    { titulo: 'Al llegar', items: actual.alLlegar },
    { titulo: 'Durante el turno', items: actual.duranteElTurno },
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link to="/estudiante/basicos" className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--brand-primary)' }}>
        <ArrowLeft size={14} /> Básicos del sector
      </Link>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Básicos de {actual.sector}</h1>
      <p className="text-sm mt-1 mb-8" style={{ color: 'var(--text-secondary)' }}>{actual.intro}</p>

      <div className="space-y-6">
        {bloques.map(b => (
          <div key={b.titulo} className="rounded-[var(--radius-lg)] border p-5"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-base)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>{b.titulo}</h2>
            <ul className="space-y-2">
              {b.items.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--success)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-[var(--radius-lg)] border p-5"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-subtle)' }}>
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-secondary)' }}>Errores comunes</h2>
          <ul className="space-y-2">
            {actual.erroresComunes.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                <XCircle size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--danger)' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Esto es lo común a cualquier negocio del sector. Las instrucciones concretas de cada local están en la ficha de tu turno, visible al aceptarlo.
        </p>
      </div>
    </div>
  )
}
