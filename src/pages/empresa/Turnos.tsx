import { useState } from 'react'
import { Search, Eye, Copy, XCircle, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { turnos, type Turno } from '@/mocks/turnos'

const TABS: { label: string; key: Turno['estado'] | 'todos' }[] = [
  { label: 'Todos', key: 'todos' },
  { label: 'Abiertos', key: 'abierto' },
  { label: 'Cubiertos', key: 'cubierto' },
  { label: 'Completados', key: 'completado' },
  { label: 'Cancelados', key: 'cancelado' },
]

const ESTADO_COLORS: Record<Turno['estado'], { bg: string; text: string }> = {
  abierto: { bg: 'var(--success-bg)', text: 'var(--success-text)' },
  cubierto: { bg: 'var(--info-bg)', text: 'var(--info-text)' },
  completado: { bg: 'var(--neutral-bg)', text: 'var(--neutral-text)' },
  cancelado: { bg: 'var(--danger-bg)', text: 'var(--danger-text)' },
}

const ESTADO_LABELS: Record<Turno['estado'], string> = {
  abierto: 'Abierto',
  cubierto: 'Cubierto',
  completado: 'Completado',
  cancelado: 'Cancelado',
}

export default function Turnos() {
  const [activeTab, setActiveTab] = useState<Turno['estado'] | 'todos'>('todos')
  const [search, setSearch] = useState('')
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null)
  const [cancelled, setCancelled] = useState<Set<string>>(new Set())

  const filtered = turnos.filter((t) => {
    const estadoMatch = activeTab === 'todos' || t.estado === activeTab
    const searchMatch =
      search === '' ||
      t.titulo.toLowerCase().includes(search.toLowerCase()) ||
      t.sector.toLowerCase().includes(search.toLowerCase()) ||
      t.ciudad.toLowerCase().includes(search.toLowerCase())
    return estadoMatch && searchMatch
  })

  const handleCancel = (id: string) => {
    setCancelled((prev) => new Set([...prev, id]))
    setConfirmCancel(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Gestión de Turnos</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {turnos.length} turnos publicados en total
          </p>
        </div>
        <a
          href="/empresa/nuevo-turno"
          className="px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          + Nuevo turno
        </a>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1 p-1 rounded-[var(--radius-md)] bg-[var(--bg-muted)]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeTab === tab.key ? 'var(--bg-base)' : 'transparent',
                color:
                  activeTab === tab.key
                    ? 'var(--brand-primary)'
                    : 'var(--text-secondary)',
                boxShadow: activeTab === tab.key ? 'var(--shadow-md)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar turnos..."
            className="pl-9 pr-4 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] w-64"
            style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: 'var(--bg-muted)' }}
            >
              <Search size={20} style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <p className="text-[var(--text-secondary)] text-sm">No se encontraron turnos</p>
            <p className="text-[var(--text-tertiary)] text-xs mt-1">
              Prueba a cambiar los filtros o el texto de búsqueda
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="text-left border-b border-[var(--border)]"
                  style={{ backgroundColor: 'var(--bg-subtle)' }}
                >
                  {['Fecha', 'Puesto / Sector', 'Candidatos', 'Salario/h', 'Estado', 'Acciones'].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]"
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((turno, i) => {
                  const isCancelled = cancelled.has(turno.id)
                  const estado = isCancelled ? 'cancelado' : turno.estado
                  const colors = ESTADO_COLORS[estado]
                  return (
                    <tr
                      key={turno.id}
                      className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-subtle)] transition-colors"
                      style={{ opacity: isCancelled ? 0.5 : 1 }}
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm text-[var(--text-primary)] font-medium">
                          {turno.fecha}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {turno.horaInicio} – {turno.horaFin}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-[var(--text-primary)] font-medium max-w-[200px] truncate">
                          {turno.titulo}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {turno.sector} · {turno.ciudad}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[var(--text-primary)]">
                          {turno.vacantesOcupadas}/{turno.vacantes}
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-[var(--bg-muted)] mt-1">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(turno.vacantesOcupadas / turno.vacantes) * 100}%`,
                              backgroundColor: 'var(--brand-primary)',
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {turno.salarioHora}€
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: colors.bg, color: colors.text }}
                        >
                          {ESTADO_LABELS[estado]}
                        </span>
                        {turno.urgente && (
                          <span
                            className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: 'var(--warning-bg)', color: 'var(--warning-text)' }}
                          >
                            Urgente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/empresa/turnos/${turno.id}`}
                            title="Ver detalle"
                            className="p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                          >
                            <Eye size={15} />
                          </Link>
                          <button
                            title="Duplicar"
                            onClick={() => toast.success(`Turno duplicado: ${turno.titulo}. Edítalo desde el listado.`)}
                            className="p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--bg-muted)] text-[var(--text-secondary)]"
                          >
                            <Copy size={15} />
                          </button>
                          {!isCancelled && estado !== 'completado' && (
                            <button
                              title="Cancelar"
                              onClick={() => setConfirmCancel(turno.id)}
                              className="p-1.5 rounded-[var(--radius-md)] hover:bg-red-50 text-[var(--text-secondary)] hover:text-red-600"
                            >
                              <XCircle size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cancel confirmation modal */}
      {confirmCancel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(11,14,26,0.5)' }}
        >
          <div
            className="w-full max-w-sm rounded-[var(--radius-lg)] p-6 space-y-4"
            style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--danger-bg)' }}
            >
              <AlertTriangle size={20} style={{ color: 'var(--danger-text)' }} />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">¿Cancelar este turno?</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Esta acción notificará a todos los candidatos confirmados y no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmCancel(null)}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)]"
              >
                No, mantener
              </button>
              <button
                onClick={() => handleCancel(confirmCancel)}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--danger)' }}
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
