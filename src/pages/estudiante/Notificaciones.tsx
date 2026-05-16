import { useState } from 'react'
import { Bell, CheckCheck, Zap, Star, CreditCard, Calendar, MessageSquare, Award } from 'lucide-react'
import { toast } from 'sonner'

const NOTIFS_MOCK = [
  { id: '1', type: 'pago', title: 'Pago recibido', message: 'Hemos enviado 84,50€ a tu cuenta IBAN. Llegará en 1-24h.', time: 'Hace 2 horas', read: false, group: 'Hoy' },
  { id: '2', type: 'turno', title: 'Turno confirmado', message: 'Tu turno del viernes 17 en Restaurante Casa Pepe está confirmado.', time: 'Hace 5 horas', read: false, group: 'Hoy' },
  { id: '3', type: 'badge', title: '¡Nuevo badge!', message: 'Has desbloqueado: Maestro hostelero 🥇', time: 'Hace 1 día', read: false, group: 'Ayer' },
  { id: '4', type: 'mensaje', title: 'Nuevo mensaje', message: 'Cafetería Origen te ha enviado un mensaje.', time: 'Hace 1 día', read: true, group: 'Ayer' },
  { id: '5', type: 'turno', title: 'Recordatorio de turno', message: 'Mañana tienes turno en Hotel Atlántico a las 10:00.', time: 'Hace 2 días', read: true, group: 'Esta semana' },
  { id: '6', type: 'valoracion', title: 'Valoración recibida', message: 'Restaurante Casa Pepe te ha valorado con 5★.', time: 'Hace 3 días', read: true, group: 'Esta semana' },
]

const ICONS: Record<string, React.ElementType> = { pago: CreditCard, turno: Calendar, badge: Award, mensaje: MessageSquare, valoracion: Star, oportunidad: Zap }
const COLORS: Record<string, string> = { pago: '#10B981', turno: '#2D5BFF', badge: '#F59E0B', mensaje: '#8B5CF6', valoracion: '#F59E0B', oportunidad: '#EF4444' }

export default function EstudianteNotificaciones() {
  const [notifs, setNotifs] = useState(NOTIFS_MOCK)
  const unread = notifs.filter(n => !n.read).length

  const markAll = () => {
    setNotifs(p => p.map(n => ({ ...n, read: true })))
    toast.success('Todas las notificaciones marcadas como leídas.')
  }

  const groups = [...new Set(notifs.map(n => n.group))]

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Notificaciones</h1>
          {unread > 0 && <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{unread} sin leer</p>}
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--brand-primary)' }}>
            <CheckCheck size={15} /> Marcar todo como leído
          </button>
        )}
      </div>

      {notifs.length === 0 ? (
        <div className="text-center py-20">
          <Bell size={40} className="mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <p style={{ color: 'var(--text-tertiary)' }}>Estás al día. Te avisaremos cuando pase algo importante.</p>
        </div>
      ) : (
        groups.map(group => (
          <div key={group} className="mb-8">
            <h2 className="text-xs font-semibold uppercase mb-3" style={{ color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>{group}</h2>
            <div className="space-y-2">
              {notifs.filter(n => n.group === group).map(n => {
                const Icon = ICONS[n.type] || Bell
                return (
                  <div key={n.id} className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] transition-colors"
                    style={{ background: n.read ? 'transparent' : 'var(--bg-subtle)', border: '1px solid var(--border)' }}
                    onClick={() => setNotifs(p => p.map(x => x.id === n.id ? { ...x, read: true } : x))}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: COLORS[n.type] + '22' }}>
                      <Icon size={17} style={{ color: COLORS[n.type] }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{n.title}</span>
                        {!n.read && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--brand-primary)' }} />}
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{n.message}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{n.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
