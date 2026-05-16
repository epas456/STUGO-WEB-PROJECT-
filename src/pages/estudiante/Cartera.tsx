import { Download, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { toast } from 'sonner'

const cobros = [
  { id:'c1', fecha:'10/05/2026', empresa:'Restaurante Casa Pepe', turno:'Camarero/a', bruto:84.50, comision:1.27, neto:83.23, estado:'cobrado' },
  { id:'c2', fecha:'03/05/2026', empresa:'Festival Sonora', turno:'Personal de eventos', bruto:120.00, comision:1.80, neto:118.20, estado:'cobrado' },
  { id:'c3', fecha:'27/04/2026', empresa:'Supermercado Frescos', turno:'Reponedor/a', bruto:68.00, comision:1.02, neto:66.98, estado:'cobrado' },
  { id:'c4', fecha:'18/04/2026', empresa:'Hotel Atlántico', turno:'Serv. habitaciones', bruto:96.00, comision:1.44, neto:94.56, estado:'cobrado' },
  { id:'c5', fecha:'10/04/2026', empresa:'Bar La Esquina', turno:'Barista', bruto:56.00, comision:0.84, neto:55.16, estado:'cobrado' },
  { id:'c6', fecha:'15/05/2026', empresa:'Cafetería Origen', turno:'Ayudante cocina', bruto:84.50, comision:1.27, neto:83.23, estado:'pendiente' },
]

const meses = ['Ene','Feb','Mar','Abr','May','Jun']
const chartData = meses.map((mes, i) => ({ mes, ingresos: [0, 120, 345, 280, 509, 0][i] }))

const totalAnual = cobros.filter(c => c.estado === 'cobrado').reduce((s, c) => s + c.neto, 0)
const IRPF_THRESHOLD = 15876
const pct = Math.min((totalAnual / IRPF_THRESHOLD) * 100, 100)

export default function EstudianteCartera() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Mis ingresos</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Historial de cobros y estimación fiscal.</p>
        </div>
        <button onClick={() => toast.success('Preparando tu resumen anual...')}
          className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium"
          style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
          <Download size={15} /> Descargar resumen anual
        </button>
      </div>

      {/* Big stat */}
      <div className="p-6 rounded-[var(--radius-xl)] mb-6" style={{ background: 'linear-gradient(135deg, var(--brand-primary) 0%, #1839B8 100%)' }}>
        <div className="text-white/70 text-sm mb-1">Has ganado en 2026</div>
        <div className="text-4xl font-black text-white mb-1">{totalAnual.toFixed(2).replace('.', ',')} €</div>
        <div className="text-white/70 text-sm">netos después de comisión STUGO</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Chart */}
        <div className="p-5 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="font-semibold mb-4 text-sm" style={{ color: 'var(--text-primary)' }}>Ingresos por mes (€)</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
              <Tooltip contentStyle={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="ingresos" fill="var(--brand-accent)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* IRPF section */}
        <div className="p-5 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="font-semibold mb-3 text-sm" style={{ color: 'var(--text-primary)' }}>Estimación IRPF 2026</h2>
          <div className="flex items-start gap-2 p-3 rounded-[var(--radius-md)] mb-4" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
            <p className="text-xs" style={{ color: '#166534' }}>
              Has ganado <strong>{totalAnual.toFixed(2)}€</strong> este año. Estás muy por debajo del mínimo exento ({IRPF_THRESHOLD.toLocaleString('es')}€). <strong>No pagas IRPF.</strong>
            </p>
          </div>
          <div className="mb-2 flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span>Tus ingresos: {totalAnual.toFixed(0)}€</span>
            <span>Mínimo: {IRPF_THRESHOLD.toLocaleString('es')}€</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#10B981' }} />
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
            Te quedan {(IRPF_THRESHOLD - totalAnual).toFixed(0)}€ antes de tener que declarar.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[var(--radius-lg)] overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--bg-subtle)' }}>
            <tr>
              {['Fecha', 'Empresa', 'Turno', 'Bruto', 'Comisión', 'Neto', 'Estado'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cobros.map((c, i) => (
              <tr key={c.id} style={{ borderBottom: i < cobros.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--bg-base)' }}>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>{c.fecha}</td>
                <td className="px-4 py-3 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{c.empresa}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{c.turno}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{c.bruto.toFixed(2)}€</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>-{c.comision.toFixed(2)}€</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{c.neto.toFixed(2)}€</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: c.estado === 'cobrado' ? '#F0FDF4' : '#FEF9C3', color: c.estado === 'cobrado' ? '#166534' : '#854D0E' }}>
                    {c.estado === 'cobrado' ? '✓ Cobrado' : '⏳ Pendiente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
