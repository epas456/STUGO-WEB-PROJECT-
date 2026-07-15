import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const meses = ['Jun','Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr','May']
const lineData = meses.map((mes, i) => ({ mes, contrataciones: [8,12,15,11,18,14,9,13,16,21,19,23][i] }))
const sectorData = [
  { sector: 'Hostelería', turnos: 28 }, { sector: 'Retail', turnos: 14 },
  { sector: 'Eventos', turnos: 9 }, { sector: 'Logística', turnos: 6 },
]
const pieData = [
  { name: 'Aceptados', value: 45, color: 'var(--success)' },
  { name: 'Pendientes', value: 12, color: 'var(--warning)' },
  { name: 'Rechazados', value: 8, color: 'var(--danger)' },
]

export default function Analiticas() {
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Analíticas</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Resumen de actividad y rendimiento de tu empresa.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Contrataciones (año)', value: '157', trend: '+23%' },
          { label: 'Turnos cubiertos', value: '142', trend: '+18%' },
          { label: 'Tasa de cobertura', value: '90%', trend: '+5pp' },
          { label: 'Valoración media', value: '4,7', trend: '+0,2' },
        ].map((kpi, i) => (
          <div key={i} className="p-5 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{kpi.label}</div>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{kpi.value}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--success)' }}>▲ {kpi.trend} vs año anterior</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line chart */}
        <div className="p-5 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Contrataciones últimos 12 meses</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
              <Tooltip contentStyle={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="contrataciones" stroke="var(--brand-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="p-5 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Turnos por sector</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sectorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="sector" tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
              <Tooltip contentStyle={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="turnos" fill="var(--brand-primary)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie + table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Estado de candidatos</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="p-5 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Top puestos más solicitados</h2>
          <div className="space-y-3">
            {[['Camarero/a', 34], ['Reponedor/a', 18], ['Personal de eventos', 15], ['Ayudante de cocina', 12], ['Barista', 10]].map(([puesto, n], i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span style={{ color: 'var(--text-primary)' }}>{i+1}. {puesto}</span>
                <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{n} turnos</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
