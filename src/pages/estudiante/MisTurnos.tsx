import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { MapPin, Clock, Euro, Star, X } from 'lucide-react'
import { turnos } from '@/mocks/turnos'
import { useStore } from '@/store/useStore'
import { AvatarCircle } from '@/components/AvatarCircle'
import { StarRating } from '@/components/StarRating'

const TABS = ['Próximos', 'En curso', 'Pasados', 'Cancelados']

// Assign mock statuses for student view
const STUDENT_TURNOS = [
  { ...turnos[0], studentEstado: 'proximo' as const },
  { ...turnos[1], studentEstado: 'proximo' as const },
  { ...turnos[2], studentEstado: 'pasado' as const },
  ...(turnos[3] ? [{ ...turnos[3], studentEstado: 'pasado' as const }] : []),
  ...(turnos[4] ? [{ ...turnos[4], studentEstado: 'cancelado' as const }] : []),
]

const ESTADO_MAP: Record<string, string> = {
  proximo: 'Próximo',
  en_curso: 'En curso',
  pasado: 'Completado',
  cancelado: 'Cancelado',
}

const ESTADO_COLORS: Record<string, { bg: string; text: string }> = {
  proximo: { bg: 'var(--info-bg)', text: 'var(--info-text)' },
  en_curso: { bg: 'var(--success-bg)', text: 'var(--success-text)' },
  pasado: { bg: 'var(--neutral-bg)', text: 'var(--neutral-text)' },
  cancelado: { bg: 'var(--danger-bg)', text: 'var(--danger-text)' },
}

interface RatingModalState {
  turnoId: string
  turnoTitulo: string
  empresa: string
}

export default function Turnos() {
  const [activeTab, setActiveTab] = useState(0)
  const [ratingModal, setRatingModal] = useState<RatingModalState | null>(null)
  const [ratingValue, setRatingValue] = useState(0)
  const [ratingComment, setRatingComment] = useState('')
  const [rated, setRated] = useState<Set<string>>(new Set())

  const { turnosAceptados } = useStore()

  // Los turnos aceptados en esta sesión de demo van a "Próximos"
  // y tienen prioridad sobre el estado del mock.
  const aceptadosDemo = turnos
    .filter((t) => turnosAceptados.includes(t.id))
    .map((t) => ({ ...t, studentEstado: 'proximo' as const }))

  const todos = [
    ...aceptadosDemo,
    ...STUDENT_TURNOS.filter((s) => !turnosAceptados.includes(s.id)),
  ]

  const tabKeys = ['proximo', 'en_curso', 'pasado', 'cancelado']
  const filtered = todos.filter((t) => t.studentEstado === tabKeys[activeTab])

  const handleSubmitRating = () => {
    if (!ratingModal || !ratingValue) {
      toast.error('Selecciona una puntuación')
      return
    }
    setRated((prev) => new Set([...prev, ratingModal.turnoId]))
    setRatingModal(null)
    setRatingValue(0)
    setRatingComment('')
    toast.success('¡Valoración enviada!')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Mis Turnos</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Historial y próximos turnos
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-[var(--radius-md)] bg-[var(--bg-muted)] w-fit">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-all"
            style={{
              backgroundColor: activeTab === i ? 'var(--bg-base)' : 'transparent',
              color: activeTab === i ? 'var(--brand-primary)' : 'var(--text-secondary)',
              boxShadow: activeTab === i ? 'var(--shadow-md)' : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-[var(--text-secondary)] text-sm">No hay turnos en este estado</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-6 bottom-6 w-0.5"
            style={{ backgroundColor: 'var(--border)' }}
          />
          <div className="space-y-6">
            {filtered.map((t) => {
              const colors = ESTADO_COLORS[t.studentEstado]
              const isPasado = t.studentEstado === 'pasado'
              const isRated = rated.has(t.id)
              return (
                <div key={t.id} className="flex gap-6 pl-12 relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-3.5 w-3 h-3 rounded-full border-2 border-white top-6"
                    style={{ backgroundColor: isPasado ? 'var(--success)' : 'var(--brand-primary)' }}
                  />
                  {/* Card */}
                  <div
                    className="flex-1 rounded-[var(--radius-lg)] border border-[var(--border)] p-5 space-y-3"
                    style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <AvatarCircle name={t.empresaNombre} size={44} />
                        <div>
                          <Link to={`/estudiante/mis-turnos/${t.id}`} className="font-semibold text-[var(--text-primary)] hover:underline">
                            {t.titulo}
                          </Link>
                          <p className="text-sm text-[var(--text-secondary)]">{t.empresaNombre}</p>
                        </div>
                      </div>
                      <span
                        className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: colors.bg, color: colors.text }}
                      >
                        {ESTADO_MAP[t.studentEstado]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {t.fecha} · {t.horaInicio}–{t.horaFin}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {t.ciudad}
                      </span>
                      <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--brand-primary)' }}>
                        <Euro size={13} />
                        {t.salarioTotal}€
                      </span>
                    </div>
                    {isPasado && !isRated && (
                      <button
                        onClick={() =>
                          setRatingModal({
                            turnoId: t.id,
                            turnoTitulo: t.titulo,
                            empresa: t.empresaNombre,
                          })
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
                      >
                        <Star size={13} />
                        Valorar empresa
                      </button>
                    )}
                    {isPasado && isRated && (
                      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--success)' }}>
                        <Star size={13} fill="currentColor" />
                        Empresa valorada
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Rating modal */}
      {ratingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(11,14,26,0.5)' }}
        >
          <div
            className="w-full max-w-sm rounded-[var(--radius-lg)] p-6 space-y-4"
            style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text-primary)]">Valorar empresa</h3>
              <button
                onClick={() => setRatingModal(null)}
                className="p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--bg-muted)]"
              >
                <X size={16} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              {ratingModal.empresa} · {ratingModal.turnoTitulo}
            </p>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">¿Cómo fue tu experiencia?</p>
              <StarRating value={ratingValue} onChange={setRatingValue} size={32} />
            </div>
            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="Comentario opcional..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] resize-none"
              style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setRatingModal(null)}
                className="flex-1 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitRating}
                className="flex-1 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
