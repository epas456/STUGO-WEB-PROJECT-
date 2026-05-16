import { useState } from 'react'
import { Search, SlidersHorizontal, MessageSquare, Eye } from 'lucide-react'
import { estudiantes } from '@/mocks/estudiantes'
import { MatchScoreCircle } from '@/components/MatchScoreCircle'
import { AvatarCircle } from '@/components/AvatarCircle'
import { StarRating } from '@/components/StarRating'

const SECTORES = ['Hostelería', 'Retail', 'Eventos', 'Logística', 'Otro']
const CIUDADES = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao']

export default function Candidatos() {
  const [search, setSearch] = useState('')
  const [selectedSectores, setSelectedSectores] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [soloVerificados, setSoloVerificados] = useState(false)
  const [ciudad, setCiudad] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const toggleSector = (s: string) => {
    setSelectedSectores((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    )
  }

  const filtered = estudiantes.filter((e) => {
    const matchSearch =
      search === '' ||
      (e.nombre + ' ' + e.apellidos).toLowerCase().includes(search.toLowerCase()) ||
      e.ciudad.toLowerCase().includes(search.toLowerCase())
    const matchSector =
      selectedSectores.length === 0 ||
      e.sectores.some((s) => selectedSectores.includes(s))
    const matchRating = e.valoracion >= minRating
    const matchVerificado = !soloVerificados || e.verificado
    const matchCiudad = ciudad === '' || e.ciudad === ciudad
    return matchSearch && matchSector && matchRating && matchVerificado && matchCiudad
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Candidatos</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {filtered.length} estudiante{filtered.length !== 1 ? 's' : ''} encontrado
            {filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
        >
          <SlidersHorizontal size={16} />
          Filtros
          {(selectedSectores.length > 0 || minRating > 0 || soloVerificados || ciudad) && (
            <span
              className="px-1.5 py-0.5 rounded-full text-xs text-white"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              {selectedSectores.length + (minRating > 0 ? 1 : 0) + (soloVerificados ? 1 : 0) + (ciudad ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar candidatos por nombre o ciudad..."
          className="w-full pl-9 pr-4 py-3 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
          style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
        />
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
              Sector
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SECTORES.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSector(s)}
                  className="px-2.5 py-1 rounded-full border text-xs font-medium transition-all"
                  style={{
                    borderColor: selectedSectores.includes(s) ? 'var(--brand-primary)' : 'var(--border)',
                    backgroundColor: selectedSectores.includes(s) ? '#EEF2FF' : 'transparent',
                    color: selectedSectores.includes(s) ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
              Valoración mínima: {minRating > 0 ? `${minRating}★` : 'Todas'}
            </label>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full accent-[#2D5BFF]"
            />
            <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
              <span>Todas</span>
              <span>5★</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
              Ciudad
            </label>
            <select
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
              style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
            >
              <option value="">Todas las ciudades</option>
              {CIUDADES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className="relative w-10 h-5 rounded-full transition-colors cursor-pointer"
                style={{
                  backgroundColor: soloVerificados ? 'var(--brand-primary)' : 'var(--border)',
                }}
                onClick={() => setSoloVerificados(!soloVerificados)}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                  style={{ transform: soloVerificados ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </div>
              <span className="text-sm text-[var(--text-primary)]">Solo verificados</span>
            </label>
            {(selectedSectores.length > 0 || minRating > 0 || soloVerificados || ciudad) && (
              <button
                onClick={() => {
                  setSelectedSectores([])
                  setMinRating(0)
                  setSoloVerificados(false)
                  setCiudad('')
                }}
                className="mt-3 text-xs text-[var(--text-secondary)] underline text-left"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: 'var(--bg-muted)' }}
          >
            <Search size={20} style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <p className="text-[var(--text-secondary)] text-sm">No se encontraron candidatos</p>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Prueba a ajustar los filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((est) => (
            <div
              key={est.id}
              className="rounded-[var(--radius-lg)] border border-[var(--border)] p-5 flex flex-col gap-3 hover:border-[var(--brand-primary)] transition-colors"
              style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
            >
              {/* Avatar + name */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <AvatarCircle
                    name={est.nombre + ' ' + est.apellidos}
                    size={48}
                    online={est.estado === 'online'}
                  />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] text-sm">
                      {est.nombre} {est.apellidos}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {est.edad} años · {est.ciudad}
                    </p>
                    {est.verificado && (
                      <span
                        className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{ backgroundColor: '#DBEAFE', color: '#1D4ED8' }}
                      >
                        ✓ Verificado
                      </span>
                    )}
                  </div>
                </div>
                <MatchScoreCircle score={est.matchScore ?? 80} size={48} />
              </div>

              {/* Rating + turnos */}
              <div className="flex items-center gap-2">
                <StarRating value={Math.round(est.valoracion)} size={13} />
                <span className="text-xs text-[var(--text-secondary)]">{est.valoracion}</span>
                <span className="text-xs text-[var(--text-secondary)]">·</span>
                <span className="text-xs text-[var(--text-secondary)]">{est.nTurnos} turnos</span>
              </div>

              {/* Badges */}
              {est.badges.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {est.badges.slice(0, 3).map((b) => (
                    <span
                      key={b}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}
                    >
                      {b}
                    </span>
                  ))}
                  {est.badges.length > 3 && (
                    <span className="text-[10px] text-[var(--text-secondary)]">
                      +{est.badges.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Sectors */}
              <div className="flex flex-wrap gap-1">
                {est.sectores.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-full text-[10px] border border-[var(--border)] text-[var(--text-secondary)]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-1">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[var(--radius-md)] text-xs font-semibold text-white"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  <Eye size={13} />
                  Ver perfil
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[var(--radius-md)] text-xs font-medium border border-[var(--border)] text-[var(--text-secondary)]"
                >
                  <MessageSquare size={13} />
                  Contactar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
