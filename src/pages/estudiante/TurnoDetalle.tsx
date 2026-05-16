import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Clock, Calendar, Euro, Users, Briefcase, AlertTriangle,
  X, CheckCircle2, Navigation,
} from 'lucide-react'
import { turnos } from '@/mocks/turnos'
import { toast } from 'sonner'

const estadoColors: Record<string, { bg: string; text: string; label: string }> = {
  abierto: { bg: '#D1FAE5', text: '#065F46', label: 'Abierto' },
  cubierto: { bg: '#FEE2E2', text: '#991B1B', label: 'Cubierto' },
  cancelado: { bg: '#F3F4F6', text: '#6B7280', label: 'Cancelado' },
  completado: { bg: '#DBEAFE', text: '#1E40AF', label: 'Completado' },
}

function ConfirmDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className="w-full max-w-sm rounded-[var(--radius-lg)] p-6"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#FEE2E2' }}
        >
          <AlertTriangle size={22} style={{ color: '#EF4444' }} />
        </div>
        <h3 className="text-base font-bold text-center mb-2" style={{ color: 'var(--text-primary)' }}>
          ¿Cancelar turno?
        </h3>
        <p className="text-sm text-center mb-6" style={{ color: 'var(--text-secondary)' }}>
          Si cancelas este turno con menos de 24h de antelación, puede afectar a tu valoración en la plataforma.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold border border-[var(--border)] hover:bg-[var(--bg-subtle)] transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            Mantener turno
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#EF4444' }}
          >
            Sí, cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TurnoDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const turno = turnos.find((t) => t.id === id) ?? turnos[0]
  const estadoCfg = estadoColors[cancelled ? 'cancelado' : turno.estado]

  const handleCancelConfirm = () => {
    setCancelled(true)
    setShowConfirm(false)
    toast.error('Turno cancelado. Recuerda que las cancelaciones afectan a tu puntuación.')
  }

  const handleReportar = () => {
    toast.info('Problema reportado. El equipo de STUGO revisará tu caso.')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {showConfirm && (
        <ConfirmDialog
          onConfirm={handleCancelConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm mb-6 hover:opacity-70 transition-opacity"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={16} />
        Volver a mis turnos
      </button>

      {/* Header */}
      <div
        className="rounded-[var(--radius-lg)] p-6 mb-5"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <h1 className="flex-1 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {turno.titulo}
          </h1>
          <div className="flex gap-2 flex-wrap">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: estadoCfg.bg, color: estadoCfg.text }}
            >
              {cancelled ? 'Cancelado' : estadoCfg.label}
            </span>
            {turno.urgente && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
              >
                Urgente
              </span>
            )}
          </div>
        </div>
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--brand-primary)' }}>
          {turno.empresaNombre}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={15} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Fecha</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {new Date(turno.fecha).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={15} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Horario</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {turno.horaInicio} – {turno.horaFin}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Euro size={15} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Salario</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {turno.salarioTotal.toFixed(2)}€ ({turno.salarioHora}€/h)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={15} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Ubicación</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{turno.ciudad}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={15} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Contrato</p>
              <p className="text-sm font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{turno.tipoContrato}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users size={15} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Plazas</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {turno.vacantesOcupadas}/{turno.vacantes} ocupadas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div
        className="rounded-[var(--radius-lg)] p-5 mb-5"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Descripción</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{turno.descripcion}</p>
      </div>

      {/* Requisitos */}
      <div
        className="rounded-[var(--radius-lg)] p-5 mb-5"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Requisitos</h2>
        <ul className="space-y-2">
          {turno.requisitos.map((req, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{req}</span>
            </li>
          ))}
        </ul>
        {turno.uniforme && (
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Uniforme</p>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{turno.uniforme}</p>
          </div>
        )}
      </div>

      {/* Cómo llegar */}
      <div
        className="rounded-[var(--radius-lg)] p-5 mb-5"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Cómo llegar</h2>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{turno.direccion}</p>
        {/* Map placeholder */}
        <div
          className="w-full h-40 rounded-[var(--radius-md)] flex items-center justify-center mb-3"
          style={{ backgroundColor: 'var(--bg-muted)' }}
        >
          <div className="text-center">
            <MapPin size={28} style={{ color: 'var(--text-secondary)', margin: '0 auto 8px' }} />
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Mapa interactivo · Próximamente</p>
          </div>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(turno.direccion)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: 'var(--brand-primary)' }}
        >
          <Navigation size={14} />
          Abrir en Google Maps
        </a>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleReportar}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold border border-[var(--border)] hover:bg-[var(--bg-subtle)] transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <AlertTriangle size={14} />
          Reportar problema
        </button>
        {!cancelled && turno.estado !== 'completado' && (
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold border hover:bg-red-50 transition-colors"
            style={{ color: '#EF4444', borderColor: '#FCA5A5' }}
          >
            <X size={14} />
            Cancelar turno
          </button>
        )}
      </div>
    </div>
  )
}
