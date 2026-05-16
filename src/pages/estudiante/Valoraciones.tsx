import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { StarRating } from '@/components/StarRating'
import { AvatarCircle } from '@/components/AvatarCircle'
import { toast } from 'sonner'

const recibidas = [
  {
    id: 'v1',
    empresa: 'Hotel Miramar Barcelona',
    turno: 'Camarero/a de sala – Brunch dominical',
    fecha: '2026-05-12',
    stars: 5,
    comentario: 'Lucía fue una profesional increíble. Puntual, amable con los clientes y con una actitud inmejorable. ¡Repetiremos!',
  },
  {
    id: 'v2',
    empresa: 'Festival Sonora',
    turno: 'Personal de eventos',
    fecha: '2026-05-04',
    stars: 5,
    comentario: 'Excelente trabajo durante todo el festival. Proactiva y con mucha energía. Muy recomendable.',
  },
  {
    id: 'v3',
    empresa: 'Supermercado Frescos',
    turno: 'Reponedor/a',
    fecha: '2026-04-28',
    stars: 4,
    comentario: 'Buen trabajo en general. Aprendió rápido y fue eficiente. Pequeña mejora en rapidez al inicio.',
  },
  {
    id: 'v4',
    empresa: 'Hotel Atlántico',
    turno: 'Servicio de habitaciones',
    fecha: '2026-04-19',
    stars: 5,
    comentario: 'Perfecto en todo momento. Discreción, educación y profesionalidad al máximo nivel.',
  },
]

const dadas = [
  {
    id: 'd1',
    empresa: 'Hotel Miramar Barcelona',
    turno: 'Camarero/a de sala – Brunch dominical',
    fecha: '2026-05-12',
    stars: 5,
    comentario: 'Organización perfecta, trato exquisito y pago puntual. Sin duda repetiré.',
  },
  {
    id: 'd2',
    empresa: 'Festival Sonora',
    turno: 'Personal de eventos',
    fecha: '2026-05-04',
    stars: 4,
    comentario: 'Buena organización. El briefing podría ser más claro, pero el ambiente fue genial.',
  },
]

const pendientes = [
  {
    id: 'p1',
    empresa: 'Bar La Esquina',
    turno: 'Barista',
    fecha: '2026-04-10',
  },
  {
    id: 'p2',
    empresa: 'Cafetería Origen',
    turno: 'Ayudante de cocina',
    fecha: '2026-05-15',
  },
]

function StarDisplay({ value }: { value: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= value ? '#FFD63D' : 'var(--border)' }}>★</span>
      ))}
    </span>
  )
}

export default function Valoraciones() {
  const [tab, setTab] = useState('recibidas')
  const [ratings, setRatings] = useState<Record<string, { stars: number; comment: string; submitted: boolean }>>({})

  const handleSubmit = (id: string) => {
    const r = ratings[id]
    if (!r || r.stars === 0) { toast.error('Por favor, selecciona al menos una estrella'); return }
    setRatings((prev) => ({ ...prev, [id]: { ...prev[id], submitted: true } }))
    toast.success('Valoración enviada. ¡Gracias!')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Mis valoraciones</h1>

      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List className="flex gap-1 mb-6 border-b border-[var(--border)]">
          {[
            { value: 'recibidas', label: `Recibidas (${recibidas.length})` },
            { value: 'dadas', label: `Dadas (${dadas.length})` },
            { value: 'pendientes', label: `Pendientes (${pendientes.length})` },
          ].map(({ value, label }) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className="px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                color: tab === value ? 'var(--brand-primary)' : 'var(--text-secondary)',
                borderBottom: tab === value ? '2px solid var(--brand-primary)' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Recibidas */}
        <Tabs.Content value="recibidas">
          <div className="space-y-4">
            {recibidas.map((v) => (
              <div
                key={v.id}
                className="rounded-[var(--radius-lg)] p-5"
                style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <AvatarCircle name={v.empresa} size={40} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{v.empresa}</p>
                    <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{v.turno}</p>
                  </div>
                  <div className="text-right">
                    <StarDisplay value={v.stars} />
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {new Date(v.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </div>
                {v.comentario && (
                  <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    "{v.comentario}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </Tabs.Content>

        {/* Dadas */}
        <Tabs.Content value="dadas">
          <div className="space-y-4">
            {dadas.map((v) => (
              <div
                key={v.id}
                className="rounded-[var(--radius-lg)] p-5"
                style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <AvatarCircle name={v.empresa} size={40} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{v.empresa}</p>
                    <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{v.turno}</p>
                  </div>
                  <div className="text-right">
                    <StarDisplay value={v.stars} />
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {new Date(v.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                </div>
                {v.comentario && (
                  <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    "{v.comentario}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </Tabs.Content>

        {/* Pendientes */}
        <Tabs.Content value="pendientes">
          {pendientes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No tienes turnos pendientes de valorar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendientes.map((p) => {
                const r = ratings[p.id] ?? { stars: 0, comment: '', submitted: false }
                return (
                  <div
                    key={p.id}
                    className="rounded-[var(--radius-lg)] p-5"
                    style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <AvatarCircle name={p.empresa} size={40} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{p.empresa}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{p.turno}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                          {new Date(p.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                        </p>
                      </div>
                    </div>
                    {r.submitted ? (
                      <div
                        className="flex items-center gap-2 px-4 py-3 rounded-[var(--radius-md)]"
                        style={{ backgroundColor: '#D1FAE5' }}
                      >
                        <span style={{ color: '#10B981' }}>✓</span>
                        <p className="text-sm font-medium" style={{ color: '#065F46' }}>Valoración enviada. ¡Gracias!</p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                            ¿Cómo fue tu experiencia en este turno?
                          </p>
                          <StarRating
                            value={r.stars}
                            onChange={(v) => setRatings((prev) => ({ ...prev, [p.id]: { ...prev[p.id] ?? { stars: 0, comment: '', submitted: false }, stars: v } }))}
                            size={24}
                          />
                        </div>
                        <div className="mb-3">
                          <textarea
                            rows={3}
                            placeholder="Comparte tu experiencia con la empresa (opcional)..."
                            className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] resize-none"
                            style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                            value={r.comment}
                            onChange={(e) =>
                              setRatings((prev) => ({
                                ...prev,
                                [p.id]: { ...prev[p.id] ?? { stars: 0, comment: '', submitted: false }, comment: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <button
                          onClick={() => handleSubmit(p.id)}
                          className="px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: 'var(--brand-primary)' }}
                        >
                          Enviar valoración
                        </button>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
