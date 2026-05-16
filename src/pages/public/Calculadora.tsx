import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Euro, TrendingUp, GraduationCap, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

const SECTORES = [
  { id: 'hosteleria', label: 'Hostelería y restauración', rateMin: 9, rateMax: 13 },
  { id: 'retail', label: 'Retail y comercio', rateMin: 9, rateMax: 12 },
  { id: 'eventos', label: 'Eventos y entretenimiento', rateMin: 11, rateMax: 16 },
  { id: 'logistica', label: 'Logística y almacén', rateMin: 9, rateMax: 12 },
  { id: 'administracion', label: 'Administración y oficina', rateMin: 10, rateMax: 14 },
  { id: 'educacion', label: 'Educación y apoyo académico', rateMin: 12, rateMax: 18 },
  { id: 'cuidados', label: 'Cuidados y asistencia personal', rateMin: 11, rateMax: 15 },
]

const CIUDADES = [
  { id: 'madrid', label: 'Madrid', multiplier: 1.05 },
  { id: 'barcelona', label: 'Barcelona', multiplier: 1.05 },
  { id: 'valencia', label: 'Valencia', multiplier: 1.0 },
  { id: 'sevilla', label: 'Sevilla', multiplier: 0.97 },
  { id: 'bilbao', label: 'Bilbao', multiplier: 1.02 },
  { id: 'malaga', label: 'Málaga', multiplier: 0.98 },
  { id: 'granada', label: 'Granada', multiplier: 0.96 },
  { id: 'otras', label: 'Otras ciudades', multiplier: 0.97 },
]

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function calcIRPF(annual: number): number {
  if (annual < 15876) return 0
  let tax = 0
  if (annual > 12450) {
    const base1 = Math.min(annual, 12450)
    tax += base1 * 0.19
    if (annual > 12450) {
      const base2 = Math.min(annual - 12450, 20200 - 12450)
      tax += base2 * 0.24
    }
    if (annual > 20200) {
      const base3 = Math.min(annual - 20200, 35200 - 20200)
      tax += base3 * 0.30
    }
  } else {
    tax = annual * 0.19
  }
  return Math.max(0, tax)
}

export default function Calculadora() {
  const [hours, setHours] = useState(10)
  const [rate, setRate] = useState(11)
  const [sector, setSector] = useState('hosteleria')
  const [ciudad, setCiudad] = useState('madrid')

  const selectedSector = SECTORES.find(s => s.id === sector)!
  const selectedCiudad = CIUDADES.find(c => c.id === ciudad)!

  const results = useMemo(() => {
    const adjustedRate = rate * selectedCiudad.multiplier
    const weeklyBruto = hours * adjustedRate
    const monthlyBruto = weeklyBruto * 4.33
    const annualBruto = monthlyBruto * 12
    const stugoFee = monthlyBruto * 0.015
    const annualIRPF = calcIRPF(annualBruto)
    const monthlyIRPF = annualIRPF / 12
    const monthlyNet = monthlyBruto - stugoFee - monthlyIRPF
    const annualNet = monthlyNet * 12

    // Tuition comparison (avg bachelor Spain ~1500€/year)
    const tuitionMonths = annualNet / (1500 / 12)

    // Chart: 12 months with slight variance
    const chartData = MESES.map((mes, i) => {
      const variance = 0.85 + Math.sin(i * 0.8) * 0.12
      return {
        mes,
        bruto: Math.round(monthlyBruto * variance),
        neto: Math.round(monthlyNet * variance),
      }
    })

    return { weeklyBruto, monthlyBruto, annualBruto, stugoFee, monthlyIRPF, annualIRPF, monthlyNet, annualNet, tuitionMonths, chartData }
  }, [hours, rate, selectedCiudad.multiplier])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="py-16 text-center px-4" style={{ background: 'linear-gradient(180deg, rgba(45,91,255,0.06) 0%, transparent 100%)' }}>
        <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand-primary)' }}>
          Herramienta gratuita
        </span>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Calculadora de ingresos</h1>
        <p className="text-xl max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Descubre cuánto puedes ganar trabajando con STUGO compatibilizando tus estudios.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT: Inputs */}
          <div className="space-y-6">
            <Card padding="lg">
              <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Configura tu situación</h2>

              {/* Hours slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Horas disponibles por semana
                  </label>
                  <span className="text-xl font-black" style={{ color: 'var(--brand-primary)' }}>{hours} h</span>
                </div>
                <input
                  type="range" min={1} max={30} step={1} value={hours}
                  onChange={e => setHours(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: 'var(--brand-primary)' }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  <span>1 h</span><span>30 h</span>
                </div>
              </div>

              {/* Rate slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Salario por hora
                  </label>
                  <span className="text-xl font-black" style={{ color: 'var(--brand-primary)' }}>{rate} €/h</span>
                </div>
                <input
                  type="range" min={8} max={18} step={0.5} value={rate}
                  onChange={e => setRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: 'var(--brand-primary)' }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                  <span>8 €/h (mínimo)</span>
                  <span className="text-right">18 €/h (especializado)</span>
                </div>
                {selectedSector && (
                  <p className="text-xs mt-2 flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
                    <Info size={12} />
                    Rango habitual en {selectedSector.label}: {selectedSector.rateMin}–{selectedSector.rateMax} €/h
                  </p>
                )}
              </div>

              {/* Sector select */}
              <div className="mb-6">
                <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>Sector</label>
                <select
                  value={sector}
                  onChange={e => setSector(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)]"
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  {SECTORES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>

              {/* Ciudad select */}
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>Ciudad</label>
                <select
                  value={ciudad}
                  onChange={e => setCiudad(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-[var(--radius-md)]"
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  {CIUDADES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
            </Card>

            {/* Comparison card */}
            <Card padding="lg" style={{ border: '2px solid var(--brand-accent)', background: 'rgba(255,214,61,0.04)' }}>
              <div className="flex items-start gap-3">
                <GraduationCap size={24} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                <div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Equivalencia académica</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Con tus ingresos anuales estimados puedes pagar{' '}
                    <strong style={{ color: 'var(--brand-primary)' }}>
                      {results.tuitionMonths.toFixed(1)} meses de matrícula universitaria
                    </strong>{' '}
                    (basado en el precio medio en España: ~125 €/mes)
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: Results + Chart */}
          <div className="space-y-6">
            {/* Results card */}
            <Card padding="lg">
              <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Tus ingresos estimados</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ingreso bruto mensual</span>
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    {results.monthlyBruto.toFixed(0)} €
                  </span>
                </div>
                <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Comisión STUGO (1,5%)</span>
                  <span className="font-semibold" style={{ color: 'var(--danger)' }}>
                    -{results.stugoFee.toFixed(0)} €
                  </span>
                </div>
                <div className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>IRPF estimado</span>
                    {results.monthlyIRPF === 0 && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>
                        Exento
                      </span>
                    )}
                  </div>
                  <span className="font-semibold" style={{ color: results.monthlyIRPF > 0 ? 'var(--danger)' : 'var(--success)' }}>
                    -{results.monthlyIRPF.toFixed(0)} €
                  </span>
                </div>
              </div>

              {/* Net highlight */}
              <div className="p-5 text-center rounded-[var(--radius-lg)]"
                style={{ background: 'linear-gradient(135deg, rgba(255,214,61,0.15), rgba(255,214,61,0.05))', border: '2px solid var(--brand-accent)' }}>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tu neto mensual estimado</p>
                <p className="text-5xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>
                  {results.monthlyNet.toFixed(0)} €
                </p>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  ≈ {results.annualNet.toFixed(0)} €/año
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 text-center rounded-[var(--radius-md)]" style={{ background: 'var(--bg-subtle)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Neto semanal</p>
                  <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    {(results.monthlyNet / 4.33).toFixed(0)} €
                  </p>
                </div>
                <div className="p-3 text-center rounded-[var(--radius-md)]" style={{ background: 'var(--bg-subtle)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Neto anual</p>
                  <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    {results.annualNet.toFixed(0)} €
                  </p>
                </div>
              </div>

              {results.monthlyIRPF === 0 && (
                <p className="mt-3 text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
                  * Con ingresos anuales &lt;15.876 € estás exento de IRPF (tramos 2026)
                </p>
              )}
            </Card>

            {/* Chart */}
            <Card padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} style={{ color: 'var(--brand-primary)' }} />
                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Proyección 12 meses</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={results.chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-base)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: 12,
                    }}
                    formatter={(value: unknown) => [`${value} €`]}
                  />
                  <Bar dataKey="bruto" fill="rgba(45,91,255,0.2)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="neto" fill="var(--brand-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-3">
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(45,91,255,0.2)' }} />
                  Bruto
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--brand-primary)' }} />
                  Neto
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Link to="/registro">
              <Button size="lg" className="w-full">
                Empezar a ganar dinero <Euro size={18} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-4 text-center text-xs rounded-[var(--radius-md)]"
          style={{ background: 'var(--bg-subtle)', color: 'var(--text-tertiary)' }}>
          * Cálculos estimativos basados en tramos IRPF 2026 y salarios medios por sector en España. La calculadora no sustituye el asesoramiento fiscal profesional.
          Los ingresos reales dependen de la disponibilidad, la demanda y las valoraciones del estudiante.
        </div>
      </div>
    </div>
  )
}
