import { MapPin, User, Shirt, ListChecks, XCircle } from 'lucide-react'
import type { FichaTurno } from '@/mocks/turnos'

// Ficha del turno: instrucciones operativas del local, en formato checklist.
export function FichaTurnoCard({ ficha }: { ficha: FichaTurno }) {
  return (
    <div className="space-y-4">
      {[
        { icon: MapPin, label: 'Dónde presentarte', value: ficha.presentarse },
        { icon: User, label: 'Persona de contacto', value: ficha.contacto },
        { icon: Shirt, label: 'Vestimenta', value: ficha.vestimenta },
      ].map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex gap-3">
          <Icon size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--text-tertiary)' }} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{label}</p>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-primary)' }}>{value}</p>
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        <ListChecks size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--text-tertiary)' }} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Primeros 15 minutos</p>
          <ul className="mt-1 space-y-1">
            {ficha.primerasTareas.map((t, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{i + 1}.</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-3">
        <XCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--danger)' }} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Qué no hacer</p>
          <ul className="mt-1 space-y-1">
            {ficha.queNoHacer.map((t, i) => (
              <li key={i} className="text-sm" style={{ color: 'var(--text-primary)' }}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
