import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Mail, MessageSquare, Ban, Clock, MapPin, GraduationCap, Languages, Briefcase } from 'lucide-react'
import { estudiantes } from '@/mocks/estudiantes'
import { AvatarCircle } from '@/components/AvatarCircle'
import { StarRating } from '@/components/StarRating'
import { toast } from 'sonner'

function MatchCircle({ score }: { score: number }) {
  const color = score >= 85 ? 'var(--success)' : score >= 70 ? 'var(--warning)' : 'var(--text-tertiary)'
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <div className="relative" style={{ width: 88, height: 88 }}>
      <svg width={88} height={88} className="-rotate-90">
        <circle cx={44} cy={44} r={r} fill="none" stroke="var(--bg-muted)" strokeWidth={6} />
        <circle
          cx={44}
          cy={44}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-lg font-bold"
        style={{ color }}
      >
        {score}%
      </span>
    </div>
  )
}

const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const FRANJAS = ['Mañana', 'Tarde', 'Noche']

export default function CandidatoDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [blocked, setBlocked] = useState(false)

  const est = estudiantes.find((e) => e.id === id) ?? estudiantes[0]

  const handleBlock = () => {
    setBlocked(true)
    toast.error(`${est.nombre} ha sido bloqueado`)
  }

  const handleInvitar = () => {
    toast.success(`Invitación enviada a ${est.nombre}`)
  }

  const handleMensaje = () => {
    navigate('/empresa/mensajes')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm mb-6 hover:opacity-70 transition-opacity"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={16} />
        Volver a candidatos
      </button>

      {/* Header card */}
      <div
        className="rounded-[var(--radius-lg)] p-6 mb-6"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <AvatarCircle name={`${est.nombre} ${est.apellidos}`} size={88} online={est.estado === 'online'} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {est.nombre} {est.apellidos}
              </h1>
              {est.verificado && (
                <span
                  className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--info-bg)', color: 'var(--info-text)' }}
                >
                  <ShieldCheck size={12} />
                  Verificado
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1"><MapPin size={13} />{est.ciudad}</span>
              <span className="flex items-center gap-1"><Clock size={13} />{est.edad} años</span>
              <span className="flex items-center gap-1"><Briefcase size={13} />{est.nTurnos} turnos</span>
            </div>
            <StarRating value={est.valoracion} readonly size={18} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              {est.valoracion.toFixed(1)} de media
            </p>
          </div>

          <MatchCircle score={est.matchScore ?? 75} />
        </div>

        {/* Bio */}
        {est.bio && (
          <p className="mt-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {est.bio}
          </p>
        )}
      </div>

      {/* Info cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div
          className="rounded-[var(--radius-md)] p-4"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--text-secondary)' }}>
            <GraduationCap size={15} />
            <span className="text-xs font-medium uppercase tracking-wide">Estudios</span>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{est.estudios}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{est.universidad}</p>
        </div>

        <div
          className="rounded-[var(--radius-md)] p-4"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--text-secondary)' }}>
            <Languages size={15} />
            <span className="text-xs font-medium uppercase tracking-wide">Idiomas</span>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{est.idiomas.join(', ')}</p>
        </div>

        <div
          className="rounded-[var(--radius-md)] p-4"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--text-secondary)' }}>
            <Briefcase size={15} />
            <span className="text-xs font-medium uppercase tracking-wide">Experiencia</span>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{est.experiencia} año{est.experiencia !== 1 ? 's' : ''}</p>
        </div>
      </div>


      {/* Sectores */}
      <div
        className="rounded-[var(--radius-lg)] p-5 mb-6"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Sectores</h2>
        <div className="flex flex-wrap gap-2">
          {est.sectores.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full text-xs font-medium border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Disponibilidad */}
      <div
        className="rounded-[var(--radius-lg)] p-5 mb-8"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Disponibilidad</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left py-1 pr-3 font-medium" style={{ color: 'var(--text-secondary)' }}>Franja</th>
                {DIAS_SEMANA.map((d) => (
                  <th key={d} className="text-center px-1 py-1 font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {d.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FRANJAS.map((franja) => (
                <tr key={franja}>
                  <td className="py-2 pr-3 font-medium" style={{ color: 'var(--text-primary)' }}>{franja}</td>
                  {DIAS_SEMANA.map((dia) => {
                    const hasDia = est.disponibilidad.dias.includes(dia)
                    const hasFranja = est.disponibilidad.franjas.includes(franja)
                    const available = hasDia && hasFranja
                    return (
                      <td key={dia} className="text-center px-1 py-2">
                        <span
                          className="inline-block w-6 h-6 rounded-md"
                          style={{
                            backgroundColor: available ? 'var(--success-bg)' : 'var(--bg-muted)',
                            border: available ? '1px solid var(--success)' : '1px solid transparent',
                          }}
                          title={available ? 'Disponible' : 'No disponible'}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: 'var(--success-bg)', border: '1px solid var(--success)' }} />
            Disponible
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: 'var(--bg-muted)' }} />
            No disponible
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleInvitar}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          <Mail size={15} />
          Invitar a turno
        </button>
        <button
          onClick={handleMensaje}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold border transition-colors hover:bg-[var(--bg-subtle)]"
          style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        >
          <MessageSquare size={15} />
          Enviar mensaje
        </button>
        <button
          onClick={handleBlock}
          disabled={blocked}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold transition-colors hover:bg-red-50 disabled:opacity-50"
          style={{ color: 'var(--danger)', border: '1px solid var(--danger-text)' }}
        >
          <Ban size={15} />
          {blocked ? 'Bloqueado' : 'Bloquear'}
        </button>
      </div>
    </div>
  )
}
