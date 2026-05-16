import { Download, TrendingUp, Euro, Clock, CheckCircle2 } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { toast } from 'sonner'

const cobros = [
  { id: 'c1', fecha: '2026-05-10', empresa: 'Restaurante Casa Pepe', turno: 'Camarero/a', bruto: 84.5, comision: 1.27, neto: 83.23, estado: 'cobrado' },
  { id: 'c2', fecha: '2026-05-03', empresa: 'Festival Sonora', turno: 'Personal de eventos', bruto: 120.0, comision: 1.8, neto: 118.2, estado: 'cobrado' },
  { id: 'c3', fecha: '2026-04-27', empresa: 'Supermercado Frescos', turno: 'Reponedor/a', bruto: 68.0, comision: 1.02, neto: 66.98, estado: 'cobrado' },
  { id: 'c4', fecha: '2026-04-18', empresa: 'Hotel Atlántico', turno: 'Servicio de habitaciones', bruto: 96.0, comision: 1.44, neto: 94.56, estado: 'cobrado' },
  { id: 'c5', fecha: '2026-04-10', empresa: 'Bar La Esquina', turno: 'Barista', bruto: 56.0, comision: 0.84, neto: 55.16, estado: 'cobrado' },
  { id: 'c6', fecha: '2026-05-15', empresa: 'Cafetería Origen', turno: 'Ayudante de cocina', bruto: 84.5, comision: 1.27, neto: 83.23, estado: 'pendiente' },
]

const gananciasMensuales = [
  { mes: 'Oct', neto: 212 },
  { mes: 'Nov', neto: 178 },
  { mes: 'Dic', neto: 340 },
  { mes: 'Ene', neto: 155 },
  { mes: 'Feb', neto: 223 },
  { mes: 'Mar', neto: 190 },
  { mes: 'Abr', neto: 380 },
  { mes: 'May', neto: 285 },
]

const totalAnual = 1847.5
const umbralIRPF = 15876
const progresoPct = Math.min((totalAnual / umbralIRPF) * 100, 100)

export default function Cartera() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Mi cartera</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Historial de ingresos y cobros</p>
        </div>
        <button
          onClick={() => toast.info('Resumen anual descargado (simulado)')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold border border-[var(--border)] hover:bg-[var(--bg-subtle)] transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          <Download size={14} />
          Descargar resumen anual
        </button>
      </div>

      {/* Big stat */}
      <div
        className="rounded-[var(--radius-lg)] p-6 mb-6"
        style={{ backgroundColor: 'var(--brand-primary)', color: 'white' }}
      >
        <p className="text-sm font-medium opacity-80 mb-1">Has ganado en 2026</p>
        <p className="text-4xl font-bold mb-4">1.847,50€</p>
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <div
            className="h-2 rounded-full bg-white transition-all"
            style={{ width: `${progresoPct}%` }}
          />
        </div>
        <p className="text-xs opacity-70">
          {progresoPct.toFixed(1)}% del umbral de retención de IRPF (15.876€)
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          className="rounded-[var(--radius-md)] p-4"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Euro size={15} style={{ color: '#10B981' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Este mes</span>
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>284,66€</p>
          <p className="text-xs mt-0.5" style={{ color: '#10B981' }}>+12% vs anterior</p>
        </div>
        <div
          className="rounded-[var(--radius-md)] p-4"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={15} style={{ color: '#2D5BFF' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Turnos pagados</span>
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>23</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>en 2026</p>
        </div>
        <div
          className="rounded-[var(--radius-md)] p-4"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock size={15} style={{ color: '#F59E0B' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Pendiente</span>
          </div>
          <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>83,23€</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>1 cobro en proceso</p>
        </div>
      </div>

      {/* BarChart */}
      <div
        className="rounded-[var(--radius-lg)] p-6 mb-6"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-base font-bold mb-5" style={{ color: 'var(--text-primary)' }}>Ganancias mensuales</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={gananciasMensuales} margin={{ top: 0, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
            <Tooltip
              formatter={(v) => [`${v}€`, 'Neto']}
              contentStyle={{
                backgroundColor: 'var(--bg-base)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="neto" fill="#2D5BFF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla cobros */}
      <div
        className="rounded-[var(--radius-lg)] p-6 mb-6"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Historial de cobros</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Fecha', 'Empresa', 'Turno', 'Bruto', 'Comisión', 'Neto', 'Estado'].map((h) => (
                  <th
                    key={h}
                    className="pb-2 pr-3 text-left text-xs font-semibold uppercase tracking-wide"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cobros.map((c) => (
                <tr key={c.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-subtle)] transition-colors">
                  <td className="py-3 pr-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(c.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="py-3 pr-3 text-xs font-medium max-w-[120px] truncate" style={{ color: 'var(--text-primary)' }}>
                    {c.empresa}
                  </td>
                  <td className="py-3 pr-3 text-xs max-w-[100px] truncate" style={{ color: 'var(--text-secondary)' }}>
                    {c.turno}
                  </td>
                  <td className="py-3 pr-3 text-xs" style={{ color: 'var(--text-primary)' }}>{c.bruto.toFixed(2)}€</td>
                  <td className="py-3 pr-3 text-xs" style={{ color: 'var(--text-secondary)' }}>-{c.comision.toFixed(2)}€</td>
                  <td className="py-3 pr-3 text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {c.neto.toFixed(2)}€
                  </td>
                  <td className="py-3">
                    <span
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold w-fit"
                      style={{
                        backgroundColor: c.estado === 'cobrado' ? '#D1FAE5' : '#FEF3C7',
                        color: c.estado === 'cobrado' ? '#065F46' : '#92400E',
                      }}
                    >
                      {c.estado === 'cobrado' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {c.estado === 'cobrado' ? 'Cobrado' : 'Pendiente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IRPF section */}
      <div
        className="rounded-[var(--radius-lg)] p-5"
        style={{ backgroundColor: '#D1FAE5', border: '1px solid #10B981' }}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 size={20} style={{ color: '#10B981', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: '#065F46' }}>Sin obligación de IRPF</p>
            <p className="text-sm" style={{ color: '#065F46' }}>
              Has ganado <strong>1.847,50€</strong> este año. Estás muy por debajo del mínimo exento (15.876€).{' '}
              <strong>No pagas IRPF.</strong> Cuando superes ese umbral, STUGO te avisará automáticamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
