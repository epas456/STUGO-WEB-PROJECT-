import { useState } from 'react'
import { toast } from 'sonner'
import { estudiantes } from '@/mocks/estudiantes'
import { AvatarCircle } from '@/components/AvatarCircle'
import { StarRating } from '@/components/StarRating'

interface ValoracionItem {
  id: string
  estudianteId: string
  estudianteNombre: string
  turno: string
  fecha: string
  stars: number
  comment: string
}

const DADAS: ValoracionItem[] = [
  {
    id: 'val-d-001',
    estudianteId: 'est-001',
    estudianteNombre: 'Lucía Martínez García',
    turno: 'Camarero/a de sala · 10 May',
    fecha: '2026-05-11',
    stars: 5,
    comment: 'Excelente profesional. Puntual, educada y con mucha destreza. Repetiremos sin duda.',
  },
  {
    id: 'val-d-002',
    estudianteId: 'est-002',
    estudianteNombre: 'Carlos Ruiz López',
    turno: 'Azafato/a congreso · 8 May',
    fecha: '2026-05-09',
    stars: 4,
    comment: 'Buen trabajo en general. Muy atento con los asistentes.',
  },
]

const RECIBIDAS: ValoracionItem[] = [
  {
    id: 'val-r-001',
    estudianteId: 'est-001',
    estudianteNombre: 'Lucía Martínez García',
    turno: 'Camarero/a de sala · 10 May',
    fecha: '2026-05-11',
    stars: 5,
    comment: 'Empresa muy organizada, buen ambiente y pago puntual. 100% recomendable.',
  },
  {
    id: 'val-r-002',
    estudianteId: 'est-002',
    estudianteNombre: 'Carlos Ruiz López',
    turno: 'Azafato/a congreso · 8 May',
    fecha: '2026-05-09',
    stars: 4,
    comment: 'Todo correcto, muy buenas instrucciones. El uniforme podría estar más preparado.',
  },
]

interface PendienteItem {
  id: string
  estudianteId: string
  estudianteNombre: string
  turno: string
  fecha: string
}

const PENDIENTES: PendienteItem[] = [
  {
    id: 'pend-001',
    estudianteId: 'est-003',
    estudianteNombre: 'Ana López Sánchez',
    turno: 'Dependiente/a Retail · 14 May',
    fecha: '2026-05-14',
  },
  {
    id: 'pend-002',
    estudianteId: 'est-004',
    estudianteNombre: 'Pablo García Torres',
    turno: 'Camarero/a comidas y cenas · 13 May',
    fecha: '2026-05-13',
  },
]

const TABS = ['Pendientes de valorar', 'Dadas', 'Recibidas']

export default function Valoraciones() {
  const [activeTab, setActiveTab] = useState(0)
  const [pendienteStars, setPendienteStars] = useState<Record<string, number>>({})
  const [pendienteComments, setPendienteComments] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Set<string>>(new Set())

  const handleSubmit = (id: string, nombre: string) => {
    if (!pendienteStars[id]) {
      toast.error('Por favor selecciona una valoración')
      return
    }
    setSubmitted((prev) => new Set([...prev, id]))
    toast.success(`Valoración enviada a ${nombre}`)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Valoraciones</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Gestiona las valoraciones de tus trabajadores
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5"
            style={{
              borderBottomColor: activeTab === i ? 'var(--brand-primary)' : 'transparent',
              color: activeTab === i ? 'var(--brand-primary)' : 'var(--text-secondary)',
            }}
          >
            {tab}
            {tab === 'Pendientes de valorar' && PENDIENTES.filter((p) => !submitted.has(p.id)).length > 0 && (
              <span
                className="px-1.5 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: 'var(--danger)' }}
              >
                {PENDIENTES.filter((p) => !submitted.has(p.id)).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Pendientes */}
      {activeTab === 0 && (
        <div className="space-y-4">
          {PENDIENTES.filter((p) => !submitted.has(p.id)).length === 0 ? (
            <div className="py-12 text-center text-[var(--text-secondary)] text-sm">
              ¡Todas las valoraciones al día! 🎉
            </div>
          ) : (
            PENDIENTES.filter((p) => !submitted.has(p.id)).map((p) => {
              const est = estudiantes.find((e) => e.id === p.estudianteId)
              const nombre = est
                ? est.nombre + ' ' + est.apellidos
                : p.estudianteNombre
              return (
                <div
                  key={p.id}
                  className="rounded-[var(--radius-lg)] border border-[var(--border)] p-5 space-y-4"
                  style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
                >
                  <div className="flex items-center gap-3">
                    <AvatarCircle name={nombre} size={44} />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{nombre}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{p.turno}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{p.fecha}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-2">
                      ¿Cómo fue el desempeño?
                    </p>
                    <StarRating
                      value={pendienteStars[p.id] ?? 0}
                      onChange={(v) =>
                        setPendienteStars((prev) => ({ ...prev, [p.id]: v }))
                      }
                      size={28}
                    />
                  </div>
                  <div>
                    <textarea
                      value={pendienteComments[p.id] ?? ''}
                      onChange={(e) =>
                        setPendienteComments((prev) => ({ ...prev, [p.id]: e.target.value }))
                      }
                      placeholder="Comentario opcional (visible para el candidato)..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] resize-none"
                      style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <button
                    onClick={() => handleSubmit(p.id, nombre)}
                    className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-semibold text-white"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    Enviar valoración
                  </button>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* Dadas */}
      {activeTab === 1 && (
        <div className="space-y-4">
          {DADAS.map((val) => (
            <ValoracionCard key={val.id} val={val} />
          ))}
        </div>
      )}

      {/* Recibidas */}
      {activeTab === 2 && (
        <div className="space-y-4">
          {RECIBIDAS.map((val) => (
            <ValoracionCard key={val.id} val={val} received />
          ))}
        </div>
      )}
    </div>
  )
}

function ValoracionCard({
  val,
  received = false,
}: {
  val: ValoracionItem
  received?: boolean
}) {
  return (
    <div
      className="rounded-[var(--radius-lg)] border border-[var(--border)] p-5 space-y-3"
      style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AvatarCircle name={val.estudianteNombre} size={40} />
          <div>
            <p className="font-semibold text-[var(--text-primary)] text-sm">
              {val.estudianteNombre}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">{val.turno}</p>
          </div>
        </div>
        <div className="text-right">
          <StarRating value={val.stars} size={14} />
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{val.fecha}</p>
        </div>
      </div>
      {val.comment && (
        <p className="text-sm text-[var(--text-primary)] leading-relaxed border-l-2 pl-3" style={{ borderLeftColor: 'var(--border)' }}>
          "{val.comment}"
        </p>
      )}
      {received && (
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}
        >
          Recibida de trabajador
        </span>
      )}
    </div>
  )
}
