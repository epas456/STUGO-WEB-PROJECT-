import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Clock, Euro, Sprout } from 'lucide-react'
import { turnos } from '@/mocks/turnos'
import { AvatarCircle } from '@/components/AvatarCircle'
import { MatchScoreCircle } from '@/components/MatchScoreCircle'

const SECTORES = ['Hostelería', 'Retail', 'Eventos', 'Logística']

export default function BuscarTurnos() {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('')
  const [soloParaEmpezar, setSoloParaEmpezar] = useState(false)

  const q = search.trim().toLowerCase()
  const abiertos = turnos.filter(t => t.estado === 'abierto')
  const filtered = abiertos.filter(t => {
    if (sector && t.sector !== sector) return false
    if (soloParaEmpezar && !t.abiertoSinExperiencia) return false
    if (q && !t.titulo.toLowerCase().includes(q) && !t.empresaNombre.toLowerCase().includes(q) && !t.ciudad.toLowerCase().includes(q)) return false
    return true
  })

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Buscar turnos</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {abiertos.length} turnos abiertos ahora mismo
        </p>
      </div>

      {/* Búsqueda */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Puesto, empresa o ciudad..."
          className="w-full pl-10 pr-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
          style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        {SECTORES.map(s => (
          <button
            key={s}
            onClick={() => setSector(sector === s ? '' : s)}
            className="px-3 py-1.5 rounded-full border text-sm font-medium transition-all"
            style={{
              borderColor: sector === s ? 'var(--brand-primary)' : 'var(--border)',
              backgroundColor: sector === s ? 'var(--bg-subtle)' : 'var(--bg-base)',
              color: sector === s ? 'var(--brand-primary)' : 'var(--text-secondary)',
            }}
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => setSoloParaEmpezar(!soloParaEmpezar)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all"
          style={{
            borderColor: soloParaEmpezar ? 'var(--brand-primary)' : 'var(--border)',
            backgroundColor: soloParaEmpezar ? 'var(--brand-primary)' : 'var(--bg-base)',
            color: soloParaEmpezar ? 'var(--on-primary)' : 'var(--text-secondary)',
          }}
        >
          <Sprout size={14} />
          Ideales para empezar
        </button>
      </div>

      {soloParaEmpezar && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Turnos de empresas abiertas a candidatos sin experiencia previa. Si aún no tienes turnos
          completados, aquí tienes más posibilidades de conseguir el primero.
        </p>
      )}

      {/* Resultados */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-[var(--text-secondary)] text-sm">No hay turnos con estos filtros.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(t => (
            <Link
              key={t.id}
              to={`/estudiante/turnos/${t.id}`}
              className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border transition-colors hover:border-[var(--brand-primary)]"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-base)', boxShadow: 'var(--shadow-sm)' }}
            >
              <AvatarCircle name={t.empresaNombre} size={44} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{t.titulo}</p>
                  {t.abiertoSinExperiencia && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: 'var(--neutral-bg)', color: 'var(--neutral-text)' }}
                    >
                      Sin experiencia previa
                    </span>
                  )}
                  {t.urgente && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: 'var(--warning-bg)', color: 'var(--warning-text)' }}
                    >
                      Urgente
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{t.empresaNombre}</p>
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1"><Clock size={12} />{t.fecha} · {t.horaInicio}–{t.horaFin}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} />{t.ciudad}</span>
                  <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--brand-primary)' }}>
                    <Euro size={12} />{t.salarioHora}€/h
                  </span>
                </div>
              </div>
              {t.matchScore !== undefined && <MatchScoreCircle score={t.matchScore} size={44} />}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
