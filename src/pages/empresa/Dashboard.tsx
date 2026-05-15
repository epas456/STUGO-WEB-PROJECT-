import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Briefcase,
  Users,
  Star,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Clock,
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { turnos } from '@/mocks/turnos'
import { estudiantes } from '@/mocks/estudiantes'
import { MatchScoreCircle } from '@/components/MatchScoreCircle'
import { AvatarCircle } from '@/components/AvatarCircle'
import { StarRating } from '@/components/StarRating'

const contrataciones = [
  { mes: 'Jun', valor: 8 },
  { mes: 'Jul', valor: 12 },
  { mes: 'Ago', valor: 15 },
  { mes: 'Sep', valor: 11 },
  { mes: 'Oct', valor: 18 },
  { mes: 'Nov', valor: 14 },
  { mes: 'Dic', valor: 9 },
  { mes: 'Ene', valor: 13 },
  { mes: 'Feb', valor: 16 },
  { mes: 'Mar', valor: 21 },
  { mes: 'Abr', valor: 19 },
  { mes: 'May', valor: 23 },
]

const sectoresData = [
  { sector: 'Hostelería', turnos: 42 },
  { sector: 'Eventos', turnos: 28 },
  { sector: 'Retail', turnos: 19 },
  { sector: 'Logística', turnos: 11 },
]

const kpis = [
  {
    label: 'Turnos activos',
    value: '3',
    trend: '+12%',
    up: true,
    icon: Briefcase,
    color: '#2D5BFF',
    bg: '#EEF2FF',
  },
  {
    label: 'Candidatos pendientes',
    value: '7',
    trend: '-5%',
    up: false,
    icon: Users,
    color: '#F59E0B',
    bg: '#FEF9EE',
  },
  {
    label: 'Valoración media',
    value: '4.7★',
    trend: '+0.2',
    up: true,
    icon: Star,
    color: '#10B981',
    bg: '#ECFDF5',
  },
  {
    label: 'Ahorro vs ETT',
    value: '2.340€',
    trend: '+18%',
    up: true,
    icon: TrendingUp,
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
]

const proximosTurnos = [
  {
    id: 'tur-001',
    puesto: 'Camarero/a de sala',
    fecha: 'Lun 18 May',
    hora: '10:30–16:30',
    confirmados: ['Lucía M.', 'Carlos R.', 'Ana L.'],
  },
  {
    id: 'tur-004',
    puesto: 'Camarero/a comidas y cenas',
    fecha: 'Sáb 17 May',
    hora: '13:00–23:30',
    confirmados: ['Pablo G.'],
  },
  {
    id: 'tur-005',
    puesto: 'Dependiente/a Zara',
    fecha: 'Mié 20 May',
    hora: '10:00–18:00',
    confirmados: ['Marta P.', 'Carlos R.'],
  },
]

export default function Dashboard() {
  const { auth } = useStore()
  const nombre = auth.user?.name ?? 'Restaurante Casa Pepe'

  const hora = new Date().getHours()
  const saludo = hora < 12 ? 'Buenos días' : hora < 20 ? 'Buenas tardes' : 'Buenas noches'

  const candidatosPendientes = estudiantes
    .filter((e) => e.matchScore !== undefined)
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
    .slice(0, 3)

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <p className="text-sm text-[var(--text-secondary)] mb-1">{saludo},</p>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">{nombre}</h1>
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
                <span
                  className="flex items-center gap-1 text-xs font-semibold"
                  style={{ color: kpi.up ? 'var(--success)' : 'var(--danger)' }}
                >
                  {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{kpi.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line chart */}
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">
            Contrataciones últimos 12 meses
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={contrataciones}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
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
              <Line
                type="monotone"
                dataKey="valor"
                stroke="var(--brand-primary)"
                strokeWidth={2.5}
                dot={{ fill: 'var(--brand-primary)', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">
            Turnos por sector
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sectoresData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="sector" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-base)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="turnos" fill="var(--brand-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos turnos */}
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} style={{ color: 'var(--brand-primary)' }} />
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              Próximos turnos esta semana
            </h2>
          </div>
          <div className="space-y-4">
            {proximosTurnos.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm text-[var(--text-primary)] truncate">
                    {t.puesto}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {t.fecha} · {t.hora}
                  </p>
                </div>
                <div className="flex items-center -space-x-2 shrink-0">
                  {t.confirmados.map((nombre) => (
                    <div
                      key={nombre}
                      className="w-7 h-7 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white text-[10px] font-bold border-2 border-white"
                      title={nombre}
                    >
                      {nombre.split(' ').map((n) => n[0]).join('')}
                    </div>
                  ))}
                  <span className="ml-3 text-xs text-[var(--text-secondary)]">
                    {t.confirmados.length} confirmado{t.confirmados.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidatos pendientes */}
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} style={{ color: 'var(--brand-primary)' }} />
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              Candidatos pendientes de tu respuesta
            </h2>
          </div>
          <div className="space-y-3">
            {candidatosPendientes.map((est) => (
              <div
                key={est.id}
                className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--bg-subtle)]"
              >
                <AvatarCircle name={est.nombre + ' ' + est.apellidos} size={36} online={est.estado === 'online'} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[var(--text-primary)]">
                    {est.nombre} {est.apellidos}
                  </p>
                  <StarRating value={Math.round(est.valoracion)} size={12} />
                </div>
                <MatchScoreCircle score={est.matchScore ?? 80} size={44} />
                <div className="flex gap-1 shrink-0">
                  <button className="px-2.5 py-1 text-xs font-medium rounded-[var(--radius-md)] text-white" style={{ backgroundColor: 'var(--brand-primary)' }}>
                    Aceptar
                  </button>
                  <button className="px-2.5 py-1 text-xs font-medium rounded-[var(--radius-md)] text-[var(--text-secondary)] bg-[var(--bg-muted)]">
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tip box */}
      <div
        className="rounded-[var(--radius-lg)] border p-4 flex items-start gap-3"
        style={{ backgroundColor: '#FFFBEA', borderColor: 'var(--brand-accent)' }}
      >
        <Lightbulb size={20} style={{ color: 'var(--brand-accent)', flexShrink: 0 }} />
        <div>
          <span className="text-sm font-semibold text-[var(--text-primary)]">¿Sabías que </span>
          <span className="text-sm text-[var(--text-secondary)]">
            publicar turnos los lunes obtiene un 23% más de candidatos? Programa tu próxima
            publicación al inicio de semana y maximiza tus resultados.
          </span>
        </div>
      </div>
    </div>
  )
}
