import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Euro, CheckCircle, Star, CalendarClock, Clock, ChevronRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { turnos } from '@/mocks/turnos'
import { MatchScoreCircle } from '@/components/MatchScoreCircle'
import { AvatarCircle } from '@/components/AvatarCircle'
import { StarRating } from '@/components/StarRating'

const ingresosMensuales = [
  { mes: 'Ene', valor: 120 },
  { mes: 'Feb', valor: 200 },
  { mes: 'Mar', valor: 165 },
  { mes: 'Abr', valor: 280 },
  { mes: 'May', valor: 284 },
]

const kpis = [
  {
    label: 'Ingresos del mes',
    value: '284€',
    trend: '+12%',
    up: true,
    icon: Euro,
    color: 'var(--info)',
    bg: 'var(--bg-subtle)',
  },
  {
    label: 'Turnos completados',
    value: '12',
    trend: '+3 este mes',
    up: true,
    icon: CheckCircle,
    color: 'var(--success)',
    bg: 'var(--bg-subtle)',
  },
  {
    label: 'Valoración media',
    value: '4.9',
    trend: '+0.1',
    up: true,
    icon: Star,
    color: 'var(--warning)',
    bg: 'var(--bg-subtle)',
  },
  {
    label: 'Puntualidad',
    value: '98%',
    trend: 'Últimos 30 días',
    up: true,
    icon: CalendarClock,
    color: 'var(--info)',
    bg: 'var(--bg-subtle)',
  },
]

export default function Dashboard() {
  const { auth } = useStore()
  const nombre = auth.user?.name ?? 'Lucía'

  const recomendados = turnos.filter((t) => t.estado === 'abierto' && t.matchScore !== undefined).slice(0, 3)

  const proximoTurno = {
    fecha: 'Viernes 17 May',
    hora: '19:00–23:00',
    empresa: 'Restaurante Casa Pepe',
    puesto: 'Camarero/a comidas y cenas',
    horasRestantes: 20,
  }

  const esSoon = proximoTurno.horasRestantes < 24

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Hola, {nombre}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Aquí tienes tu resumen de actividad
        </p>
      </div>

      {/* Próximo turno */}
      <div
        className="rounded-[var(--radius-lg)] border p-5 flex items-center justify-between gap-4"
        style={{
          backgroundColor: esSoon ? 'var(--bg-subtle)' : 'var(--bg-base)',
          borderColor: esSoon ? 'var(--brand-accent)' : 'var(--border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
            style={{
              backgroundColor: esSoon ? 'var(--brand-accent)' : 'var(--bg-muted)',
              color: esSoon ? '#0E0F12' : 'var(--text-secondary)',
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              Tu próximo turno
            </p>
            <p className="font-bold text-[var(--text-primary)]">
              {proximoTurno.fecha} · {proximoTurno.hora}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {proximoTurno.puesto} · {proximoTurno.empresa}
            </p>
          </div>
        </div>
        {esSoon && (
          <span
            className="shrink-0 px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: 'var(--brand-accent)', color: '#0E0F12' }}
          >
            ¡Hoy!
          </span>
        )}
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="rounded-[var(--radius-lg)] p-5 border border-[var(--border)]"
              style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
                  style={{ backgroundColor: kpi.bg }}
                >
                  <Icon size={20} style={{ color: kpi.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{kpi.label}</p>
              <p
                className="text-xs font-semibold mt-1"
                style={{ color: kpi.up ? 'var(--success)' : 'var(--danger)' }}
              >
                {kpi.trend}
              </p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income sparkline */}
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">
            Ingresos este año
          </h2>
          <p className="text-2xl font-bold mb-4" style={{ color: 'var(--brand-primary)' }}>
            1.847€ ganados
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={ingresosMensuales}>
              <defs>
                <linearGradient id="colorIngreso" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-base)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="var(--brand-primary)"
                strokeWidth={2.5}
                fill="url(#colorIngreso)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Turnos recomendados */}
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              Turnos recomendados para ti
            </h2>
            <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div className="space-y-3">
            {recomendados.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--bg-subtle)] border border-[var(--border)]"
              >
                <AvatarCircle name={t.empresaNombre} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {t.titulo}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {t.fecha} · {t.salarioHora}€/h
                  </p>
                </div>
                <MatchScoreCircle score={t.matchScore ?? 80} size={42} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
