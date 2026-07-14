import { useState } from 'react'
import { badges as badgesData } from '@/mocks/badges'
import { toast } from 'sonner'
import { BadgeIcon } from '@/components/BadgeIcon'

const CONSEGUIDOS = ['badge-001', 'badge-002', 'badge-003', 'badge-005', 'badge-009', 'badge-015']
const PROGRESO: Record<string, { actual: number; total: number }> = {
 'badge-004': { actual: 7, total: 10 },
 'badge-006': { actual: 3, total: 25 },
 'badge-007': { actual: 1.8, total: 4.8 },
}

const rarityColor: Record<string, string> = { bronce: '#CD7F32', plata: '#C0C0C0', oro: '#D6F84A' }
const rarityBg: Record<string, string> = { bronce: '#FDF6EE', plata: '#F8F8F8', oro: '#FFFBEA' }

export default function EstudianteBadges() {
  const [filter, setFilter] = useState<'todos' | 'conseguidos' | 'bloqueados'>('todos')

  const filtered = badgesData.filter(b => {
    if (filter === 'conseguidos') return CONSEGUIDOS.includes(b.id)
    if (filter === 'bloqueados') return !CONSEGUIDOS.includes(b.id)
    return true
  })

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Mis logros</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{CONSEGUIDOS.length} badges conseguidos de {badgesData.length} disponibles.</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-8">
        {([['todos', 'Todos'], ['conseguidos', 'Conseguidos'], ['bloqueados', 'Por conseguir']] as [typeof filter, string][]).map(([v, label]) => (
          <button key={v} onClick={() => setFilter(v)}
            className="px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ background: filter === v ? 'var(--brand-primary)' : 'var(--bg-subtle)', color: filter === v ? 'white' : 'var(--text-secondary)', border: '1px solid var(--border)' }}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map(b => {
          const got = CONSEGUIDOS.includes(b.id)
          const prog = PROGRESO[b.id]
          const rarity = (b as any).rareza || 'bronce'
          return (
            <button key={b.id} onClick={() => got ? toast.success(`${b.nombre} — ${b.descripcion}`) : toast.info(`Necesitas: ${b.criterio || 'Completar más turnos.'}`)}
              className="p-4 rounded-[var(--radius-lg)] text-center transition-all hover:scale-105 active:scale-95"
              style={{ background: got ? rarityBg[rarity] : 'var(--bg-subtle)', border: `1px solid ${got ? rarityColor[rarity] : 'var(--border)'}`, opacity: got ? 1 : 0.55 }}>
              <div className="mb-2 flex justify-center"><BadgeIcon name={(b as any).icon} size={28} color={got ? rarityColor[rarity] : 'var(--text-tertiary)'} /></div>
              <div className="text-xs font-semibold mb-1 leading-tight" style={{ color: got ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{b.nombre}</div>
              {got
                ? <div className="text-xs px-2 py-0.5 rounded-full inline-block font-medium" style={{ background: rarityColor[rarity] + '33', color: rarityColor[rarity] }}>{rarity}</div>
                : prog
                  ? <div className="mt-2">
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
                        <div className="h-full rounded-full" style={{ width: `${(prog.actual / prog.total) * 100}%`, background: 'var(--brand-primary)' }} />
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{prog.actual}/{prog.total}</div>
                    </div>
                  : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
