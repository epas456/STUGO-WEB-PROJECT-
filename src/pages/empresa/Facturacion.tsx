import { useState } from 'react'
import { Download, CreditCard, CheckCircle, X } from 'lucide-react'
import { toast } from 'sonner'

const PLANES = [
  {
    id: 'free',
    nombre: 'Básico',
    precio: '0€/mes',
    color: 'var(--text-tertiary)',
    features: ['5 turnos/mes', 'Hasta 10 candidatos', 'Soporte email'],
    limit: 5,
  },
  {
    id: 'pro',
    nombre: 'Pro',
    precio: '49€/mes',
    color: 'var(--info)',
    features: ['50 turnos/mes', 'Candidatos ilimitados', 'Soporte prioritario', 'Analíticas avanzadas'],
    limit: 50,
    popular: true,
  },
  {
    id: 'business',
    nombre: 'Business',
    precio: '149€/mes',
    color: 'var(--info)',
    features: ['Turnos ilimitados', 'Candidatos ilimitados', 'Account manager dedicado', 'API access', 'Contrato SLA'],
    limit: Infinity,
  },
  {
    id: 'enterprise',
    nombre: 'Enterprise',
    precio: 'A medida',
    color: 'var(--warning)',
    features: ['Todo Business +', 'Integración ERP', 'Onboarding personalizado', 'SLA garantizado 99.9%'],
    limit: Infinity,
  },
]

const FACTURAS = [
  { id: 'inv-001', fecha: '2026-05-01', concepto: 'Plan Pro – Mayo 2026', importe: '49,00€', estado: 'pagada' as const },
  { id: 'inv-002', fecha: '2026-04-01', concepto: 'Plan Pro – Abril 2026', importe: '49,00€', estado: 'pagada' as const },
  { id: 'inv-003', fecha: '2026-03-01', concepto: 'Plan Pro – Marzo 2026', importe: '49,00€', estado: 'pagada' as const },
  { id: 'inv-004', fecha: '2026-02-01', concepto: 'Plan Pro – Febrero 2026', importe: '49,00€', estado: 'pagada' as const },
  { id: 'inv-005', fecha: '2026-06-01', concepto: 'Plan Pro – Junio 2026', importe: '49,00€', estado: 'pendiente' as const },
]

interface BillingForm {
  nombre: string
  nif: string
  direccion: string
  ciudad: string
  cp: string
  email: string
}

const INITIAL_FORM: BillingForm = {
  nombre: 'Restaurante Casa Pepe SL',
  nif: 'B12345678',
  direccion: 'Calle Gran Vía 45, 2º',
  ciudad: 'Madrid',
  cp: '28013',
  email: 'facturacion@casapepe.es',
}

export default function Facturacion() {
  const [showPlanesModal, setShowPlanesModal] = useState(false)
  const [currentPlan] = useState('pro')
  const [form, setForm] = useState<BillingForm>(INITIAL_FORM)
  const [editingForm, setEditingForm] = useState(false)

  const plan = PLANES.find((p) => p.id === currentPlan) ?? PLANES[1]
  const uso = 23

  const handleSaveForm = () => {
    setEditingForm(false)
    toast.success('Datos de facturación actualizados')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Facturación</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Gestiona tu plan, métodos de pago y facturas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan actual */}
        <div
          className="rounded-[var(--radius-lg)] border p-6 space-y-4"
          style={{
            backgroundColor: 'var(--bg-base)',
            boxShadow: 'var(--shadow-md)',
            borderColor: plan.color,
            borderWidth: 2,
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                Plan actual
              </p>
              <h2
                className="text-2xl font-bold mt-1"
                style={{ color: plan.color }}
              >
                {plan.nombre}
              </h2>
              <p className="text-xl font-semibold text-[var(--text-primary)]">{plan.precio}</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: plan.color }}
            >
              Activo
            </span>
          </div>
          <ul className="space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle size={14} style={{ color: 'var(--success)' }} />
                {f}
              </li>
            ))}
          </ul>
          <div>
            <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
              <span>Uso este mes</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {uso}/{plan.limit === Infinity ? '∞' : plan.limit} contrataciones
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--bg-muted)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (uso / (plan.limit === Infinity ? 50 : plan.limit)) * 100)}%`,
                  backgroundColor: plan.color,
                }}
              />
            </div>
          </div>
          <button
            onClick={() => setShowPlanesModal(true)}
            className="w-full py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]"
          >
            Cambiar de plan
          </button>
        </div>

        {/* Método de pago */}
        <div
          className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6 space-y-4"
          style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
        >
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Método de pago</h2>
          <div
            className="flex items-center gap-4 p-4 rounded-[var(--radius-md)] border border-[var(--border)]"
            style={{ backgroundColor: 'var(--bg-subtle)' }}
          >
            <div
              className="w-12 h-8 rounded-md flex items-center justify-center"
              style={{ backgroundColor: '#1A1F71' }}
            >
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Visa terminada en 4242
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Expira 12/2028</p>
            </div>
            <span
              className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success-text)' }}
            >
              Principal
            </span>
          </div>
          <button className="flex items-center gap-2 text-sm text-[var(--brand-primary)] font-medium">
            <CreditCard size={14} />
            Añadir otro método de pago
          </button>
          <p className="text-xs text-[var(--text-secondary)]">
            Próxima facturación: <strong>1 de junio de 2026</strong> · 49,00€
          </p>
        </div>
      </div>

      {/* Historial facturas */}
      <div
        className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Historial de facturas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                {['Fecha', 'Concepto', 'Importe', 'Estado', 'Acciones'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FACTURAS.map((f) => (
                <tr key={f.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-subtle)]">
                  <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{f.fecha}</td>
                  <td className="px-4 py-3 text-sm text-[var(--text-primary)]">{f.concepto}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[var(--text-primary)]">{f.importe}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={
                        f.estado === 'pagada'
                          ? { backgroundColor: 'var(--success-bg)', color: 'var(--success-text)' }
                          : { backgroundColor: 'var(--warning-bg)', color: 'var(--warning-text)' }
                      }
                    >
                      {f.estado === 'pagada' ? 'Pagada' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toast.success('Descargando PDF...')}
                      className="flex items-center gap-1 text-xs text-[var(--brand-primary)] font-medium hover:underline"
                    >
                      <Download size={12} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Datos de facturación */}
      <div
        className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6 space-y-4"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">Datos de facturación</h2>
          <button
            onClick={() => setEditingForm(!editingForm)}
            className="text-sm text-[var(--brand-primary)] font-medium"
          >
            {editingForm ? 'Cancelar' : 'Editar'}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.entries(form) as [keyof BillingForm, string][]).map(([key, value]) => {
            const labels: Record<keyof BillingForm, string> = {
              nombre: 'Razón social',
              nif: 'NIF/CIF',
              direccion: 'Dirección',
              ciudad: 'Ciudad',
              cp: 'Código postal',
              email: 'Email de facturación',
            }
            return (
              <div key={key}>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  {labels[key]}
                </label>
                {editingForm ? (
                  <input
                    type={key === 'email' ? 'email' : 'text'}
                    value={value}
                    onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
                    style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                  />
                ) : (
                  <p className="text-sm text-[var(--text-primary)]">{value}</p>
                )}
              </div>
            )
          })}
        </div>
        {editingForm && (
          <button
            onClick={handleSaveForm}
            className="px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Guardar cambios
          </button>
        )}
      </div>

      {/* Planes modal */}
      {showPlanesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(11,14,26,0.5)' }}
        >
          <div
            className="w-full max-w-4xl rounded-[var(--radius-lg)] overflow-hidden"
            style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Cambiar de plan</h2>
              <button
                onClick={() => setShowPlanesModal(false)}
                className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--bg-muted)]"
              >
                <X size={18} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PLANES.map((p) => (
                <div
                  key={p.id}
                  className="rounded-[var(--radius-lg)] border p-5 space-y-4 relative"
                  style={{
                    borderColor: currentPlan === p.id ? p.color : 'var(--border)',
                    borderWidth: currentPlan === p.id ? 2 : 1,
                  }}
                >
                  {p.popular && (
                    <span
                      className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      Popular
                    </span>
                  )}
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)]" style={{ color: p.color }}>{p.nombre}</h3>
                    <p className="text-xl font-semibold text-[var(--text-primary)] mt-1">{p.precio}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                        <CheckCircle size={12} style={{ color: 'var(--success)', marginTop: 2, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setShowPlanesModal(false)
                      toast.success(`Plan ${p.nombre} seleccionado`)
                    }}
                    disabled={currentPlan === p.id}
                    className="w-full py-2 rounded-[var(--radius-md)] text-sm font-semibold transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: currentPlan === p.id ? 'var(--bg-muted)' : p.color,
                      color: currentPlan === p.id ? 'var(--text-secondary)' : 'white',
                    }}
                  >
                    {currentPlan === p.id ? 'Plan actual' : 'Seleccionar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
