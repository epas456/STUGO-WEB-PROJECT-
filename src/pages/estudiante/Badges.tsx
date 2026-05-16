import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { badges } from '@/mocks/badges'
import type { Badge } from '@/mocks/badges'

type Filter = 'todos' | 'conseguidos' | 'porConseguir'

// Badges earned by the student (mock)
const earnedIds = new Set(['badge-top-rated', 'badge-puntual', 'badge-hosteleria-pro', 'badge-nueva-estrella'])
const earnedDates: Record<string, string> = {
  'badge-top-rated': '2026-03-15',
  'badge-puntual': '2026-01-20',
  'badge-hosteleria-pro': '2026-02-08',
  'badge-nueva-estrella': '2025-12-01',
}
const progress: Record<string, { current: number; required: number; unit: string }> = {
  'badge-veterano': { current: 87, required: 100, unit: 'turnos' },
  'badge-eventos-experto': { current: 12, required: 20, unit: 'turnos' },
  'badge-nocturnos': { current: 3, required: 10, unit: 'turnos nocturnos' },
  'badge-multipremia': { current: 2, required: 5, unit: 'semanas consecutivas' },
}

const rarezaColors: Record<string, { bg: string; text: string; border: string; label: string }> = {
  comun: { bg: '#F3F4F6', text: '#4B5563', border: '#D1D5DB', label: 'Común' },
  raro: { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE', label: 'Raro' },
  epico: { bg: '#F3E8FF', text: '#6B21A8', border: '#E9D5FF', label: 'Épico' },
  legendario: { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A', label: 'Legendario' },
}

function BadgeModal({ badge, earned, onClose }: { badge: Badge; earned: boolean; onClose: () => void }) {
  const rareza = rarezaColors[badge.rareza] ?? rarezaColors.comun
  const prog = progress[badge.id]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-sm rounded-[var(--radius-lg)] p-6 relative"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--bg-muted)] transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <X size={16} />
        </button>

        <div className={`text-center mb-5 ${earned ? '' : 'opacity-40'}`}>
          <div
            className="text-6xl mb-3 select-none"
            style={{ filter: earned ? 'none' : 'grayscale(1)' }}
          >
            {badge.emoji}
          </div>
          {earned && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl"
            >
              ✨
            </motion.div>
          )}
        </div>

        <h3 className="text-lg font-bold text-center mb-1" style={{ color: 'var(--text-primary)' }}>
          {badge.nombre}
        </h3>
        <p className="text-sm text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
          {badge.descripcion}
        </p>

        <div className="flex justify-center mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold border"
            style={{ backgroundColor: rareza.bg, color: rareza.text, borderColor: rareza.border }}
          >
            {rareza.label}
          </span>
        </div>

        <div
          className="p-3 rounded-[var(--radius-md)] mb-4"
          style={{ backgroundColor: 'var(--bg-subtle)' }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Criterio</p>
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{badge.criterio}</p>
        </div>

        {earned && earnedDates[badge.id] && (
          <p className="text-xs text-center" style={{ color: '#10B981' }}>
            Conseguido el {new Date(earnedDates[badge.id]).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}

        {!earned && prog && (
          <div>
            <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
              <span>Progreso</span>
              <span>{prog.current}/{prog.required} {prog.unit}</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--bg-muted)' }}>
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min((prog.current / prog.required) * 100, 100)}%`,
                  backgroundColor: 'var(--brand-primary)',
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function EstudianteBadges() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [selected, setSelected] = useState<Badge | null>(null)

  const filtered = badges.filter((b) => {
    if (filter === 'conseguidos') return earnedIds.has(b.id)
    if (filter === 'porConseguir') return !earnedIds.has(b.id)
    return true
  })

  const totalEarned = badges.filter((b) => earnedIds.has(b.id)).length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Mis logros</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Has conseguido{' '}
          <span className="font-bold" style={{ color: 'var(--brand-primary)' }}>{totalEarned}</span>
          {' '}de{' '}
          <span className="font-bold">{badges.length}</span> badges disponibles
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full h-2.5 rounded-full mb-1" style={{ backgroundColor: 'var(--bg-muted)' }}>
          <div
            className="h-2.5 rounded-full transition-all"
            style={{
              width: `${(totalEarned / badges.length) * 100}%`,
              backgroundColor: 'var(--brand-primary)',
            }}
          />
        </div>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {Math.round((totalEarned / badges.length) * 100)}% completado
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(
          [
            { value: 'todos', label: `Todos (${badges.length})` },
            { value: 'conseguidos', label: `Conseguidos (${totalEarned})` },
            { value: 'porConseguir', label: `Por conseguir (${badges.length - totalEarned})` },
          ] as { value: Filter; label: string }[]
        ).map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: filter === value ? 'var(--brand-primary)' : 'var(--bg-muted)',
              color: filter === value ? 'white' : 'var(--text-secondary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((badge) => {
          const earned = earnedIds.has(badge.id)
          const rareza = rarezaColors[badge.rareza] ?? rarezaColors.comun
          const prog = progress[badge.id]

          return (
            <motion.button
              key={badge.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelected(badge)}
              className="rounded-[var(--radius-lg)] p-4 text-center transition-all hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-base)',
                boxShadow: 'var(--shadow-md)',
                opacity: earned ? 1 : 0.5,
              }}
            >
              <div className="text-4xl mb-2" style={{ filter: earned ? 'none' : 'grayscale(1)' }}>
                {badge.emoji}
              </div>
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {badge.nombre}
              </p>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border mb-2"
                style={{ backgroundColor: rareza.bg, color: rareza.text, borderColor: rareza.border }}
              >
                {rareza.label}
              </span>
              {!earned && prog && (
                <div className="w-full h-1 rounded-full mt-1" style={{ backgroundColor: 'var(--bg-muted)' }}>
                  <div
                    className="h-1 rounded-full"
                    style={{
                      width: `${Math.min((prog.current / prog.required) * 100, 100)}%`,
                      backgroundColor: 'var(--brand-primary)',
                    }}
                  />
                </div>
              )}
              {earned && earnedDates[badge.id] && (
                <p className="text-[10px] mt-1" style={{ color: '#10B981' }}>
                  {new Date(earnedDates[badge.id]).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                </p>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <BadgeModal
            badge={selected}
            earned={earnedIds.has(selected.id)}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
