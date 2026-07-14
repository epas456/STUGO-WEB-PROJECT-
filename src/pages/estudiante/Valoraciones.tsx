import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Star, Building2 } from 'lucide-react'
import { toast } from 'sonner'

const recibidas = [
  { empresa: 'Restaurante Casa Pepe', turno: 'Camarero/a · 10 may 2026', estrellas: 5, comentario: 'Puntual, profesional y con excelente actitud. Repitió con nosotros.' },
  { empresa: 'Festival Sonora', turno: 'Personal de eventos · 3 may 2026', estrellas: 4, comentario: 'Muy buen trabajo durante el evento. Proactivo.' },
  { empresa: 'Hotel Atlántico', turno: 'Servicio habitaciones · 27 abr 2026', estrellas: 5, comentario: 'Impecable. Recomendado sin dudas.' },
]
const pendientes = [
  { empresa: 'Supermercado Frescos', turno: 'Reponedor/a · 18 abr 2026', estrellas: 0 },
  { empresa: 'Bar La Esquina', turno: 'Barista · 10 abr 2026', estrellas: 0 },
]

export default function EstudianteValoraciones() {
  const [pendStars, setPendStars] = useState<Record<number, number>>({})

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Mis valoraciones</h1>
      <Tabs.Root defaultValue="recibidas">
        <Tabs.List className="flex gap-1 mb-6 p-1 rounded-[var(--radius-md)] w-fit" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          {[['recibidas', 'Recibidas'], ['pendientes', `Pendientes (${pendientes.length})`]].map(([v, label]) => (
            <Tabs.Trigger key={v} value={v}
              className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-all data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--on-primary)]"
              style={{ color: 'var(--text-secondary)' }}>{label}</Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="recibidas" className="space-y-4">
          {recibidas.map((r, i) => (
            <div key={i} className="p-5 rounded-[var(--radius-lg)]" style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Building2 size={15} style={{ color: 'var(--text-tertiary)' }} />
                <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{r.empresa}</span>
              </div>
              <div className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>{r.turno}</div>
              <div className="flex mb-2">{[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= r.estrellas ? '#D6F84A' : 'none'} stroke={s <= r.estrellas ? '#D6F84A' : 'var(--border-strong)'} />)}</div>
              <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>"{r.comentario}"</p>
            </div>
          ))}
        </Tabs.Content>

        <Tabs.Content value="pendientes" className="space-y-4">
          {pendientes.map((p, i) => (
            <div key={i} className="p-5 rounded-[var(--radius-lg)]" style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
              <div className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{p.empresa}</div>
              <div className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>{p.turno}</div>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>¿Cómo fue tu experiencia?</p>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setPendStars(prev => ({ ...prev, [i]: s }))} className="cursor-pointer">
                    <Star size={24} fill={s <= (pendStars[i] || 0) ? '#D6F84A' : 'none'} stroke={s <= (pendStars[i] || 0) ? '#D6F84A' : 'var(--border-strong)'} />
                  </button>
                ))}
              </div>
              <button onClick={() => toast.success('Valoración enviada. ¡Gracias!')}
                disabled={!pendStars[i]}
                className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium text-white disabled:opacity-40"
                style={{ background: 'var(--brand-primary)' }}>
                Enviar valoración
              </button>
            </div>
          ))}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
