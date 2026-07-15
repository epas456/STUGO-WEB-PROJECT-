import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Euro, AlertTriangle } from 'lucide-react'
import { turnos } from '@/mocks/turnos'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { useState } from 'react'

export default function EstudianteTurnoDetalle() {
  const { id } = useParams()
  const turno = turnos.find(t => t.id === id) || turnos[0]
  const [cancelled, setCancelled] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  if (cancelled) return (
    <div className="p-6 text-center">
      <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Turno cancelado.</p>
      <Link to="/estudiante/turnos" className="mt-4 block text-sm" style={{ color: 'var(--brand-primary)' }}>← Ver mis turnos</Link>
    </div>
  )

  return (
    <div className="p-6 max-w-2xl">
      <Link to="/estudiante/turnos" className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--brand-primary)' }}>
        <ArrowLeft size={14} /> Mis turnos
      </Link>
      <div className="p-6 rounded-[var(--radius-xl)]" style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{turno.titulo}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{turno.descripcion}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: turno.estado === 'abierto' ? 'var(--success)' : 'var(--warning)' }}>
            {turno.estado}
          </span>
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
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => toast.info('Formulario de reporte abierto.')} className="flex-1">Reportar problema</Button>
          {!showConfirm
            ? <Button variant="danger" onClick={() => setShowConfirm(true)} className="flex-1">Cancelar turno</Button>
            : <div className="flex-1 p-3 rounded-[var(--radius-md)] text-sm" style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger)' }}>
                <div className="flex items-start gap-2 mb-2"><AlertTriangle size={15} style={{ color: 'var(--danger)' }} />
                  <span style={{ color: 'var(--danger-text)' }}>Cancelar ahora afectará a tu reputación.</span></div>
                <div className="flex gap-2">
                  <button onClick={() => setShowConfirm(false)} className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>No, mantener</button>
                  <button onClick={() => { setCancelled(true); toast.error('Turno cancelado. Tu reputación se ha visto afectada.') }}
                    className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium text-white" style={{ background: 'var(--danger)' }}>
                    Sí, cancelar
                  </button>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
