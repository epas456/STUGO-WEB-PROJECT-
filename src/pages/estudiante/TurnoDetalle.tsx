import { useParams, Link, useLocation } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Euro, AlertTriangle, ClipboardList, BookOpen, CheckCircle } from 'lucide-react'
import { turnos } from '@/mocks/turnos'
import { sectorSlug } from '@/mocks/basicos-sector'
import { FichaTurnoCard } from '@/components/FichaTurnoCard'
import { Button } from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'
import { useState } from 'react'

export default function EstudianteTurnoDetalle() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const { turnosAceptados, aceptarTurno, cancelarTurno, addNotification } = useStore()
  const turno = turnos.find(t => t.id === id) || turnos[0]
  const [cancelled, setCancelled] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // La ficha del turno solo se muestra cuando el turno ya es tuyo,
  // nunca en la vista de oferta: contiene información operativa del local.
  const esMio = pathname.includes('mis-turnos') || turnosAceptados.includes(turno.id)

  const handleAceptar = () => {
    aceptarTurno(turno.id)
    addNotification({
      type: 'turno',
      title: 'Turno confirmado',
      message: `${turno.titulo} · ${turno.fecha}, ${turno.horaInicio}–${turno.horaFin}. Revisa la ficha del turno antes de ir.`,
      link: `/estudiante/mis-turnos/${turno.id}`,
    })
    toast.success('Turno aceptado. Ya puedes ver la ficha con las instrucciones del local.')
  }

  if (cancelled) return (
    <div className="p-6 text-center">
      <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Turno cancelado.</p>
      <Link to="/estudiante/turnos" className="mt-4 block text-sm" style={{ color: 'var(--brand-primary)' }}>← Buscar turnos</Link>
    </div>
  )

  return (
    <div className="p-6 max-w-2xl">
      <Link to={esMio ? '/estudiante/mis-turnos' : '/estudiante/turnos'} className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--brand-primary)' }}>
        <ArrowLeft size={14} /> {esMio ? 'Mis turnos' : 'Buscar turnos'}
      </Link>
      <div className="p-6 rounded-[var(--radius-xl)]" style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{turno.titulo}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{turno.descripcion}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: turno.estado === 'abierto' ? 'var(--success)' : 'var(--warning)' }}>
              {turno.estado}
            </span>
            {turno.abiertoSinExperiencia && (
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--neutral-bg)', color: 'var(--neutral-text)' }}>
                Sin experiencia previa
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Clock size={16} style={{ color: 'var(--brand-primary)' }} />
            {turno.fecha} · {turno.horaInicio} - {turno.horaFin}
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <MapPin size={16} style={{ color: 'var(--brand-primary)' }} />
            {turno.ciudad}
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Euro size={16} style={{ color: 'var(--brand-primary)' }} />
            {turno.salarioHora}€/hora · Total: {turno.salarioTotal}€
          </div>
        </div>
        <div className="h-32 rounded-[var(--radius-md)] mb-6 flex items-center justify-center" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
          <div className="text-center">
            <MapPin size={24} className="mx-auto mb-1" style={{ color: 'var(--brand-primary)' }} />
            <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{turno.ciudad}</div>
          </div>
        </div>

        {esMio ? (
          <div className="rounded-[var(--radius-lg)] border p-5 mb-6" style={{ borderColor: 'var(--border)', background: 'var(--bg-base)' }}>
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList size={16} style={{ color: 'var(--brand-primary)' }} />
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Ficha del turno</h2>
            </div>
            {turno.ficha ? (
              <FichaTurnoCard ficha={turno.ficha} />
            ) : (
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                La empresa aún no ha añadido instrucciones para este turno. Llega 10-15 minutos antes,
                pregunta por el responsable y repasa los básicos del sector.
              </p>
            )}
            <Link
              to={`/estudiante/basicos/${sectorSlug(turno.sector)}`}
              className="inline-flex items-center gap-2 text-sm font-medium mt-4"
              style={{ color: 'var(--brand-primary)' }}
            >
              <BookOpen size={14} /> Básicos de {turno.sector}
            </Link>
          </div>
        ) : (
          <p className="text-xs mb-6" style={{ color: 'var(--text-tertiary)' }}>
            Las instrucciones del local (dónde presentarte, contacto, primeras tareas) se muestran al aceptar el turno.
          </p>
        )}

        {esMio ? (
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => toast.info('Formulario de reporte abierto.')} className="flex-1">Reportar problema</Button>
            {!showConfirm
              ? <Button variant="danger" onClick={() => setShowConfirm(true)} className="flex-1">Cancelar turno</Button>
              : <div className="flex-1 p-3 rounded-[var(--radius-md)] text-sm" style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger)' }}>
                  <div className="flex items-start gap-2 mb-2"><AlertTriangle size={15} style={{ color: 'var(--danger)' }} />
                    <span style={{ color: 'var(--danger-text)' }}>Cancelar ahora afectará a tu reputación.</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowConfirm(false)} className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>No, mantener</button>
                    <button onClick={() => { cancelarTurno(turno.id); setCancelled(true); toast.error('Turno cancelado. Tu reputación se ha visto afectada.') }}
                      className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium text-white" style={{ background: 'var(--danger)' }}>
                      Sí, cancelar
                    </button>
                  </div>
                </div>
            }
          </div>
        ) : turno.estado === 'abierto' ? (
          <div className="space-y-2">
            <Button onClick={handleAceptar} className="w-full" size="lg">
              <CheckCircle size={16} /> Aceptar este turno · {turno.salarioTotal}€
            </Button>
            <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
              Al aceptar te comprometes a asistir. La comisión de STUGO es del 1,5 % ({(turno.salarioTotal * 0.015).toFixed(2)}€) y cobras en menos de 24 h tras completarlo.
            </p>
          </div>
        ) : (
          <p className="text-sm text-center py-2" style={{ color: 'var(--text-secondary)' }}>
            Este turno ya no admite candidatos.
          </p>
        )}
      </div>
    </div>
  )
}
