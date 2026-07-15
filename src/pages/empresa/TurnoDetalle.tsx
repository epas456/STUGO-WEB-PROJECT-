import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  MessageSquare,
  Eye,
  Star,
} from 'lucide-react'
import { turnos, type FichaTurno } from '@/mocks/turnos'
import { estudiantes } from '@/mocks/estudiantes'
import { FichaTurnoCard } from '@/components/FichaTurnoCard'
import { toast } from 'sonner'
import { MatchScoreCircle } from '@/components/MatchScoreCircle'
import { AvatarCircle } from '@/components/AvatarCircle'
import { StarRating } from '@/components/StarRating'

const TABS = ['Candidatos', 'Confirmados', 'Detalles', 'Histórico']

const ESTADO_COLORS = {
  abierto: { bg: 'var(--success-bg)', text: 'var(--success-text)' },
  cubierto: { bg: 'var(--info-bg)', text: 'var(--info-text)' },
  completado: { bg: 'var(--neutral-bg)', text: 'var(--neutral-text)' },
  cancelado: { bg: 'var(--danger-bg)', text: 'var(--danger-text)' },
}

const HISTORICO = [
  { fecha: '2026-05-10 09:00', evento: 'Turno publicado', tipo: 'info' },
  { fecha: '2026-05-11 14:23', evento: 'Primera candidatura recibida', tipo: 'success' },
  { fecha: '2026-05-12 11:45', evento: 'Candidato aceptado: Lucía M.', tipo: 'success' },
  { fecha: '2026-05-13 16:30', evento: 'Candidato aceptado: Carlos R.', tipo: 'success' },
  { fecha: '2026-05-14 10:00', evento: 'Turno marcado como cubierto', tipo: 'info' },
]

export default function TurnoDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [accepted, setAccepted] = useState<Set<string>>(new Set())
  const [editandoFicha, setEditandoFicha] = useState(false)
  const [fichaLocal, setFichaLocal] = useState<FichaTurno | null>(null)
  const [fichaForm, setFichaForm] = useState({ presentarse: '', contacto: '', vestimenta: '', tareas: '', noHacer: '' })

  const turno = turnos.find((t) => t.id === id) ?? turnos[0]
  const ficha = turno.ficha ?? fichaLocal

  const guardarFicha = () => {
    setFichaLocal({
      presentarse: fichaForm.presentarse,
      contacto: fichaForm.contacto,
      vestimenta: fichaForm.vestimenta,
      primerasTareas: fichaForm.tareas.split('\n').map(s => s.trim()).filter(Boolean),
      queNoHacer: fichaForm.noHacer.split('\n').map(s => s.trim()).filter(Boolean),
    })
    setEditandoFicha(false)
    toast.success('Ficha del turno guardada. La verá quien tenga el turno asignado.')
  }
  const candidatos = estudiantes.slice(0, 5).map((e, i) => ({
    ...e,
    matchScore: e.matchScore ?? [94, 88, 75, 62, 81][i] ?? 70,
    confirmado: i < 2,
  }))

  const estadoColors = ESTADO_COLORS[turno.estado]

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={() => navigate(-1)}
          className="mt-1 p-2 rounded-[var(--radius-md)] border border-[var(--border)] hover:bg-[var(--bg-muted)]"
        >
          <ArrowLeft size={16} style={{ color: 'var(--text-secondary)' }} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: estadoColors.bg, color: estadoColors.text }}
            >
              {turno.estado.charAt(0).toUpperCase() + turno.estado.slice(1)}
            </span>
            {turno.urgente && (
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'var(--warning-bg)', color: 'var(--warning-text)' }}
              >
                Urgente
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{turno.titulo}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[var(--text-secondary)]">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {turno.fecha}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {turno.horaInicio} – {turno.horaFin} ({turno.duracionHoras}h)
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {turno.ciudad}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {turno.vacantesOcupadas}/{turno.vacantes} plazas
            </span>
            <span className="font-semibold text-[var(--brand-primary)]">
              {turno.salarioHora}€/h
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)]">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors"
            style={{
              borderBottomColor: activeTab === i ? 'var(--brand-primary)' : 'transparent',
              color: activeTab === i ? 'var(--brand-primary)' : 'var(--text-secondary)',
            }}
          >
            {tab}
            {tab === 'Candidatos' && (
              <span
                className="ml-2 px-1.5 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}
              >
                {candidatos.filter((c) => !c.confirmado).length}
              </span>
            )}
            {tab === 'Confirmados' && (
              <span
                className="ml-2 px-1.5 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success-text)' }}
              >
                {candidatos.filter((c) => c.confirmado).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 0 && (
        <div className="space-y-3">
          {candidatos.filter((c) => !c.confirmado).length === 0 ? (
            <div className="py-12 text-center text-[var(--text-secondary)]">
              No hay candidatos pendientes de revisar
            </div>
          ) : (
            candidatos
              .filter((c) => !c.confirmado)
              .map((est) => (
                <CandidatoCard
                  key={est.id}
                  est={est}
                  accepted={accepted.has(est.id)}
                  onAccept={() => setAccepted((prev) => new Set([...prev, est.id]))}
                />
              ))
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div className="space-y-3">
          {candidatos
            .filter((c) => c.confirmado || accepted.has(c.id))
            .map((est) => (
              <CandidatoCard key={est.id} est={est} accepted confirmed />
            ))}
          {candidatos.filter((c) => c.confirmado || accepted.has(c.id)).length === 0 && (
            <div className="py-12 text-center text-[var(--text-secondary)]">
              No hay candidatos confirmados todavía
            </div>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6 space-y-5"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
              Información del turno
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Empresa', value: turno.empresaNombre },
                { label: 'Sector', value: turno.sector },
                { label: 'Dirección', value: turno.direccion },
                { label: 'Ciudad', value: turno.ciudad },
                { label: 'Tipo contrato', value: turno.tipoContrato },
                { label: 'Uniforme', value: turno.uniforme ?? 'No especificado' },
                { label: 'Salario total', value: `${turno.salarioTotal}€` },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="text-sm text-[var(--text-secondary)] w-32 shrink-0">{label}</span>
                  <span className="text-sm text-[var(--text-primary)]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
              Descripción
            </h3>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{turno.descripcion}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
              Requisitos
            </h3>
            <div className="flex flex-wrap gap-2">
              {turno.requisitos.map((req) => (
                <span
                  key={req}
                  className="px-3 py-1 rounded-full text-sm border border-[var(--border)] text-[var(--text-secondary)]"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">
              Ficha del turno
            </h3>
            {ficha ? (
              <FichaTurnoCard ficha={ficha} />
            ) : editandoFicha ? (
              <div className="space-y-4">
                {([
                  { key: 'presentarse', label: 'Dónde presentarse al llegar', placeholder: 'Ej: puerta de personal, C/ Mayor 1, timbre 2' },
                  { key: 'contacto', label: 'Persona de contacto en el local', placeholder: 'Ej: María, encargada. Delantal rojo, suele estar en caja' },
                  { key: 'vestimenta', label: 'Uniforme o vestimenta', placeholder: 'Ej: pantalón negro y zapato cerrado' },
                  { key: 'tareas', label: 'Tareas de los primeros 15 minutos (una por línea)', placeholder: 'Fichar en el sistema\nRevisar el plano de mesas', textarea: true },
                  { key: 'noHacer', label: 'Qué NO hacer / errores comunes (una por línea)', placeholder: 'No usar el ascensor de clientes', textarea: true },
                ] as const).map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">{f.label}</label>
                    {'textarea' in f && f.textarea ? (
                      <textarea
                        value={fichaForm[f.key]}
                        onChange={(e) => setFichaForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        rows={3}
                        className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] resize-none"
                        style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={fichaForm[f.key]}
                        onChange={(e) => setFichaForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
                        style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-2">
                  <button
                    onClick={guardarFicha}
                    className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-semibold text-[var(--on-primary)]"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    Guardar ficha
                  </button>
                  <button
                    onClick={() => setEditandoFicha(false)}
                    className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="p-4 rounded-[var(--radius-md)] border"
                style={{ backgroundColor: 'var(--warning-bg)', borderColor: 'var(--border)' }}
              >
                <p className="text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                  Este turno no tiene ficha. Quien lo acepte llegará sin saber dónde presentarse, a
                  quién preguntar ni qué hacer los primeros minutos. Los turnos con ficha completa
                  registran en torno a un 30 % menos de cancelaciones y no-shows.
                </p>
                <button
                  onClick={() => setEditandoFicha(true)}
                  className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-semibold text-[var(--on-primary)]"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  Completar ficha (2 min)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 3 && (
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border)]" />
            <div className="space-y-6">
              {HISTORICO.map((item, i) => (
                <div key={i} className="flex gap-6 pl-10 relative">
                  <div
                    className="absolute left-2.5 w-3 h-3 rounded-full border-2 border-white"
                    style={{
                      backgroundColor:
                        item.tipo === 'success' ? 'var(--success)' : 'var(--brand-primary)',
                      top: '4px',
                    }}
                  />
                  <div>
                    <p className="text-sm text-[var(--text-primary)]">{item.evento}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CandidatoCard({
  est,
  accepted = false,
  confirmed = false,
  onAccept,
}: {
  est: (typeof estudiantes)[0] & { matchScore: number; confirmado?: boolean }
  accepted?: boolean
  confirmed?: boolean
  onAccept?: () => void
}) {
  const isConfirmed = confirmed || accepted
  return (
    <div
      className="rounded-[var(--radius-lg)] border border-[var(--border)] p-4 flex items-center gap-4"
      style={{
        backgroundColor: 'var(--bg-base)',
        boxShadow: 'var(--shadow-md)',
        borderColor: isConfirmed ? 'var(--success)' : 'var(--border)',
      }}
    >
      <AvatarCircle
        name={est.nombre + ' ' + est.apellidos}
        size={48}
        online={est.estado === 'online'}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-[var(--text-primary)]">
            {est.nombre} {est.apellidos}
          </p>
          {est.verificado && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--info-bg)', color: 'var(--info-text)' }}
            >
              Verificado
            </span>
          )}
          {isConfirmed && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
              style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success-text)' }}
            >
              <CheckCircle size={10} />
              Confirmado
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          {est.edad} años · {est.ciudad} · {est.nTurnos} turnos completados
        </p>
        <div className="flex items-center gap-3 mt-1.5">
          <StarRating value={Math.round(est.valoracion)} size={12} />
          <span className="text-xs text-[var(--text-secondary)]">{est.valoracion}</span>
          <div className="flex gap-1 flex-wrap">
            {est.sectores.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <MatchScoreCircle score={est.matchScore} size={52} />
      {!isConfirmed && (
        <div className="flex flex-col gap-1.5 shrink-0">
          <button
            onClick={onAccept}
            className="px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold text-white flex items-center gap-1"
            style={{ backgroundColor: 'var(--success)' }}
          >
            <CheckCircle size={12} />
            Aceptar
          </button>
          <button className="px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium border border-[var(--border)] text-[var(--text-secondary)] flex items-center gap-1">
            <MessageSquare size={12} />
            Mensaje
          </button>
          <button className="px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium border border-[var(--border)] text-[var(--text-secondary)] flex items-center gap-1">
            <Eye size={12} />
            Ver perfil
          </button>
        </div>
      )}
    </div>
  )
}
