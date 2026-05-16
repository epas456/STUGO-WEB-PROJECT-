import { useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle, Clock, XCircle, Upload, Lock } from 'lucide-react'
import { badges } from '@/mocks/badges'
import { estudiantes } from '@/mocks/estudiantes'
import { StarRating } from '@/components/StarRating'
import { AvatarCircle } from '@/components/AvatarCircle'

const TABS = ['Datos personales', 'Documentos', 'Mi reputación', 'Mis badges', 'Sectores y disponibilidad']

const estudiante = estudiantes[0]

interface PersonalForm {
  nombre: string
  apellidos: string
  email: string
  telefono: string
  ciudad: string
  bio: string
}

const DOCS = [
  { id: 'dni', label: 'DNI / NIE', estado: 'verificado' as const, fecha: '2025-03-10' },
  { id: 'iban', label: 'Cuenta bancaria (IBAN)', estado: 'pendiente' as const, fecha: null },
  { id: 'estudios', label: 'Certificado de estudios', estado: 'rechazado' as const, fecha: null },
  { id: 'manipulador', label: 'Cert. manipulador alimentos', estado: 'pendiente' as const, fecha: null },
]

const SECTORES_OPTS = ['Hostelería', 'Retail', 'Eventos', 'Logística', 'Oficina', 'Limpieza']
const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const FRANJAS = ['Mañana (6-14h)', 'Tarde (14-21h)', 'Noche (21-6h)']

const RECEIVED_REVIEWS = [
  {
    id: 'rev-001',
    empresa: 'Hotel Miramar Barcelona',
    turno: 'Camarero/a brunch · 10 May',
    stars: 5,
    comment: 'Excelente trabajadora, muy puntual y profesional.',
    fecha: '2026-05-11',
  },
  {
    id: 'rev-002',
    empresa: 'EventPro Spain',
    turno: 'Azafata congreso · 8 May',
    stars: 5,
    comment: 'Fantástica actitud y don de gentes.',
    fecha: '2026-05-09',
  },
  {
    id: 'rev-003',
    empresa: 'Restaurante Casa Pepe',
    turno: 'Camarero/a · 2 May',
    stars: 4,
    comment: 'Muy buen desempeño, un placer trabajar con ella.',
    fecha: '2026-05-03',
  },
]

const RATING_BREAKDOWN = [
  { label: 'Puntualidad', value: 5.0 },
  { label: 'Actitud', value: 4.9 },
  { label: 'Habilidades', value: 4.8 },
  { label: 'Comunicación', value: 4.9 },
]

// Student has unlocked first 6 badges, rest are locked
const UNLOCKED_IDS = [
  'badge-top-rated',
  'badge-puntual',
  'badge-hosteleria-pro',
  'badge-verificado',
  'badge-primero-turno',
  'badge-responde-rapido',
]

export default function Perfil() {
  const [activeTab, setActiveTab] = useState(0)
  const [form, setForm] = useState<PersonalForm>({
    nombre: estudiante.nombre,
    apellidos: estudiante.apellidos,
    email: estudiante.email,
    telefono: '+34 612 345 678',
    ciudad: estudiante.ciudad,
    bio: estudiante.bio,
  })
  const [editingForm, setEditingForm] = useState(false)
  const [selectedSectores, setSelectedSectores] = useState<string[]>(estudiante.sectores)
  const [selectedDias, setSelectedDias] = useState<string[]>(estudiante.disponibilidad.dias.map(d => d.slice(0, 3)))
  const [selectedFranjas, setSelectedFranjas] = useState<string[]>(estudiante.disponibilidad.franjas)

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item])
  }

  const docEstadoIcon = (estado: 'verificado' | 'pendiente' | 'rechazado') => {
    if (estado === 'verificado') return <CheckCircle size={16} style={{ color: 'var(--success)' }} />
    if (estado === 'pendiente') return <Clock size={16} style={{ color: 'var(--warning)' }} />
    return <XCircle size={16} style={{ color: 'var(--danger)' }} />
  }

  const docEstadoLabel = (estado: 'verificado' | 'pendiente' | 'rechazado') => {
    if (estado === 'verificado') return { text: 'Verificado', style: { backgroundColor: '#DCFCE7', color: '#15803D' } }
    if (estado === 'pendiente') return { text: 'Pendiente', style: { backgroundColor: '#FEF9C3', color: '#A16207' } }
    return { text: 'Rechazado', style: { backgroundColor: '#FEE2E2', color: '#B91C1C' } }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <AvatarCircle
          name={estudiante.nombre + ' ' + estudiante.apellidos}
          size={64}
          online={estudiante.estado === 'online'}
        />
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {estudiante.nombre} {estudiante.apellidos}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {estudiante.estudios} · {estudiante.universidad}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating value={Math.round(estudiante.valoracion)} size={14} />
            <span className="text-sm text-[var(--text-secondary)]">{estudiante.valoracion} · {estudiante.nTurnos} turnos</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 border-b border-[var(--border)] overflow-x-auto">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="px-3 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0"
            style={{
              borderBottomColor: activeTab === i ? 'var(--brand-primary)' : 'transparent',
              color: activeTab === i ? 'var(--brand-primary)' : 'var(--text-secondary)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Datos personales */}
      {activeTab === 0 && (
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6 space-y-5"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Datos personales</h2>
            <button
              onClick={() => {
                if (editingForm) {
                  setEditingForm(false)
                  toast.success('Perfil actualizado')
                } else {
                  setEditingForm(true)
                }
              }}
              className="text-sm text-[var(--brand-primary)] font-medium"
            >
              {editingForm ? 'Guardar' : 'Editar'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.entries(form) as [keyof PersonalForm, string][]).map(([key, value]) => {
              const labels: Record<keyof PersonalForm, string> = {
                nombre: 'Nombre',
                apellidos: 'Apellidos',
                email: 'Email',
                telefono: 'Teléfono',
                ciudad: 'Ciudad',
                bio: 'Sobre mí',
              }
              const isTextarea = key === 'bio'
              return (
                <div key={key} className={isTextarea ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    {labels[key]}
                  </label>
                  {editingForm ? (
                    isTextarea ? (
                      <textarea
                        value={value}
                        onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] resize-none"
                        style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                      />
                    ) : (
                      <input
                        type={key === 'email' ? 'email' : 'text'}
                        value={value}
                        onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
                        style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                      />
                    )
                  ) : (
                    <p className="text-sm text-[var(--text-primary)]">{value}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Documentos */}
      {activeTab === 1 && (
        <div className="space-y-4">
          {DOCS.map((doc) => {
            const { text, style } = docEstadoLabel(doc.estado)
            return (
              <div
                key={doc.id}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] p-5 flex items-center justify-between gap-4"
                style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
              >
                <div className="flex items-center gap-3">
                  {docEstadoIcon(doc.estado)}
                  <div>
                    <p className="font-medium text-sm text-[var(--text-primary)]">{doc.label}</p>
                    {doc.fecha && (
                      <p className="text-xs text-[var(--text-secondary)]">Verificado el {doc.fecha}</p>
                    )}
                    {doc.estado === 'rechazado' && (
                      <p className="text-xs" style={{ color: 'var(--danger)' }}>
                        Documento no válido. Por favor sube uno nuevo.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    style={style}
                  >
                    {text}
                  </span>
                  {doc.estado !== 'verificado' && (
                    <button
                      onClick={() => toast.success(`Subiendo ${doc.label}...`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
                    >
                      <Upload size={12} />
                      {doc.estado === 'rechazado' ? 'Volver a subir' : 'Subir'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          <p className="text-xs text-[var(--text-secondary)] px-1">
            Los documentos se revisan en un plazo de 24-48 horas laborables.
          </p>
        </div>
      )}

      {/* Mi reputación */}
      {activeTab === 2 && (
        <div className="space-y-5">
          <div
            className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
            style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-5xl font-black text-[var(--text-primary)]">{estudiante.valoracion}</p>
                <StarRating value={5} size={18} />
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {estudiante.nTurnos} turnos completados
                </p>
              </div>
              <div className="flex-1 space-y-2.5">
                {RATING_BREAKDOWN.map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[var(--text-secondary)]">{r.label}</span>
                      <span className="font-semibold text-[var(--text-primary)]">{r.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--bg-muted)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(r.value / 5) * 100}%`,
                          backgroundColor: 'var(--brand-accent)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {RECEIVED_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] p-5 space-y-2"
                style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AvatarCircle name={rev.empresa} size={32} />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{rev.empresa}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{rev.turno}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StarRating value={rev.stars} size={13} />
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{rev.fecha}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed border-l-2 pl-3" style={{ borderLeftColor: 'var(--border)' }}>
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mis badges */}
      {activeTab === 3 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const unlocked = UNLOCKED_IDS.includes(badge.id)
            const progress = unlocked ? 100 : Math.floor(Math.random() * 60) + 10
            const progressTarget = unlocked ? 5 : 5
            const progressCurrent = unlocked ? progressTarget : Math.ceil((progress / 100) * progressTarget)
            return (
              <div
                key={badge.id}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] p-4 text-center space-y-2 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-base)',
                  boxShadow: 'var(--shadow-md)',
                  opacity: unlocked ? 1 : 0.45,
                }}
              >
                {!unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock size={12} style={{ color: 'var(--text-tertiary)' }} />
                  </div>
                )}
                <div
                  className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center text-2xl mx-auto"
                  style={{
                    backgroundColor: badge.color + '20',
                    border: `2px solid ${unlocked ? badge.color : 'var(--border)'}`,
                  }}
                >
                  {badge.emoji}
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">{badge.nombre}</p>
                <p className="text-[10px] text-[var(--text-secondary)] leading-snug">{badge.descripcion}</p>
                {!unlocked && (
                  <div>
                    <div className="h-1 rounded-full bg-[var(--bg-muted)] mt-1.5">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${progress}%`, backgroundColor: badge.color }}
                      />
                    </div>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                      {progressCurrent}/{progressTarget} para desbloquear
                    </p>
                  </div>
                )}
                <span
                  className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase"
                  style={{
                    backgroundColor: badge.color + '20',
                    color: badge.color,
                  }}
                >
                  {badge.rareza}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Sectores y disponibilidad */}
      {activeTab === 4 && (
        <div className="space-y-6">
          <div
            className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6 space-y-4"
            style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
          >
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Sectores de trabajo</h2>
            <div className="flex flex-wrap gap-2">
              {SECTORES_OPTS.map((s) => {
                const active = selectedSectores.includes(s)
                return (
                  <button
                    key={s}
                    onClick={() => toggleItem(selectedSectores, setSelectedSectores, s)}
                    className="px-4 py-2 rounded-full border text-sm font-medium transition-all"
                    style={{
                      borderColor: active ? 'var(--brand-primary)' : 'var(--border)',
                      backgroundColor: active ? '#EEF2FF' : 'transparent',
                      color: active ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>
          <div
            className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6 space-y-4"
            style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
          >
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Días disponibles</h2>
            <div className="flex flex-wrap gap-2">
              {DIAS_SEMANA.map((d) => {
                const active = selectedDias.includes(d)
                return (
                  <button
                    key={d}
                    onClick={() => toggleItem(selectedDias, setSelectedDias, d)}
                    className="w-12 h-12 rounded-full border text-sm font-bold transition-all"
                    style={{
                      borderColor: active ? 'var(--brand-primary)' : 'var(--border)',
                      backgroundColor: active ? 'var(--brand-primary)' : 'transparent',
                      color: active ? 'white' : 'var(--text-secondary)',
                    }}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </div>
          <div
            className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6 space-y-4"
            style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
          >
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Franjas horarias</h2>
            <div className="flex flex-col gap-2">
              {FRANJAS.map((f) => {
                const active = selectedFranjas.includes(f)
                return (
                  <button
                    key={f}
                    onClick={() => toggleItem(selectedFranjas, setSelectedFranjas, f)}
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border text-sm font-medium transition-all text-left"
                    style={{
                      borderColor: active ? 'var(--brand-primary)' : 'var(--border)',
                      backgroundColor: active ? '#EEF2FF' : 'transparent',
                      color: active ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                      style={{
                        borderColor: active ? 'var(--brand-primary)' : 'var(--border)',
                        backgroundColor: active ? 'var(--brand-primary)' : 'transparent',
                      }}
                    >
                      {active && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    {f}
                  </button>
                )
              })}
            </div>
          </div>
          <button
            onClick={() => toast.success('Disponibilidad actualizada')}
            className="px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Guardar disponibilidad
          </button>
        </div>
      )}
    </div>
  )
}
