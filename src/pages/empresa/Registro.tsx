import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'

const STEPS = ['Datos empresa', 'Contacto', 'Necesidades', 'Confirmación']
const PLANES = [
  { name: 'Starter', price: 50, contratos: '25/trimestre', recommended: false },
  { name: 'Growth', price: 60, contratos: '50/trimestre', recommended: false },
  { name: 'Pro', price: 75, contratos: '100/trimestre', recommended: true },
  { name: 'Scale', price: 100, contratos: 'Sin límite', recommended: false },
]

export default function EmpresaRegistro() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    razonSocial: '', cif: '', sector: 'hosteleria', web: '',
    nombre: '', cargo: '', email: '', telefono: '', password: '',
    volumen: '10-25', tiposTurno: [] as string[],
  })
  const { login } = useStore()
  const navigate = useNavigate()
  const inputCls = 'w-full px-3 py-2.5 rounded-[var(--radius-md)] text-sm outline-none'
  const inputSty = { background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  const handleSubmit = async () => {
    setDone(true)
    login('empresa', { id: 'new-empresa', name: form.razonSocial || 'Mi Empresa', email: form.email, role: 'empresa' })
    toast.success('Empresa registrada. Tienes 14 días gratis para probar la plataforma.')
  }

  if (done) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--success-bg)' }}>
          <CheckCircle2 size={32} style={{ color: 'var(--success)' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>¡Empresa creada!</h1>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>Publica tu primer turno y prueba la plataforma sin coste durante 14 días.</p>
        <Button onClick={() => navigate('/empresa/publicar')} className="w-full">Publicar mi primer turno</Button>
        <button onClick={() => navigate('/empresa/dashboard')} className="mt-3 text-sm w-full" style={{ color: 'var(--text-secondary)' }}>
          Ir al dashboard
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: i <= step ? 'var(--brand-primary)' : 'var(--bg-muted)', color: i <= step ? 'white' : 'var(--text-tertiary)' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className="flex-1 h-0.5" style={{ background: i < step ? 'var(--brand-primary)' : 'var(--bg-muted)' }} />}
              </div>
            ))}
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Paso {step + 1} de {STEPS.length}: {STEPS[step]}</p>
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          {step === 0 && <>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Datos de tu empresa</h2>
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Razón social *</label>
              <input className={inputCls} style={inputSty} placeholder="Tu empresa SL" value={form.razonSocial} onChange={e => setForm(p => ({ ...p, razonSocial: e.target.value }))} /></div>
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>CIF *</label>
              <input className={inputCls} style={inputSty} placeholder="B12345678" value={form.cif} onChange={e => setForm(p => ({ ...p, cif: e.target.value }))} /></div>
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Sector principal</label>
              <select className={inputCls} style={inputSty} value={form.sector} onChange={e => setForm(p => ({ ...p, sector: e.target.value }))}>
                <option value="hosteleria">Hostelería</option>
                <option value="retail">Retail</option>
                <option value="eventos">Eventos</option>
                <option value="logistica">Logística</option>
              </select></div>
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Web (opcional)</label>
              <input className={inputCls} style={inputSty} placeholder="https://tuempresa.es" value={form.web} onChange={e => setForm(p => ({ ...p, web: e.target.value }))} /></div>
          </>}

          {step === 1 && <>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Persona de contacto</h2>
            {[['Nombre completo', 'nombre', 'Ana García'], ['Cargo', 'cargo', 'Directora de RRHH'], ['Email', 'email', 'ana@empresa.es'], ['Teléfono', 'telefono', '612 345 678']].map(([label, field, placeholder]) => (
              <div key={field}><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>{label} *</label>
                <input className={inputCls} style={inputSty} placeholder={placeholder} value={(form as unknown as Record<string,string>)[field]}
                  onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} /></div>
            ))}
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Contraseña *</label>
              <input type="password" className={inputCls} style={inputSty} placeholder="Mínimo 8 caracteres" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} /></div>
          </>}

          {step === 2 && <>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>¿Cuántas contrataciones necesitas?</h2>
            <div className="space-y-2">
              {[['1-10', '1 a 10 contrataciones/mes'], ['10-25', '10 a 25 contrataciones/mes'], ['25-50', '25 a 50 contrataciones/mes'], ['50+', 'Más de 50 contrataciones/mes']].map(([v, label]) => (
                <label key={v} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] cursor-pointer"
                  style={{ border: `1px solid ${form.volumen === v ? 'var(--brand-primary)' : 'var(--border)'}`, background: form.volumen === v ? 'var(--bg-subtle)' : 'var(--bg-base)' }}>
                  <input type="radio" name="volumen" value={v} checked={form.volumen === v} onChange={() => setForm(p => ({ ...p, volumen: v }))} />
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
                </label>
              ))}
            </div>
          </>}

          {step === 3 && <>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Plan recomendado para ti</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Basado en tu volumen estimado de contrataciones.</p>
            <div className="grid grid-cols-2 gap-3">
              {PLANES.map(p => (
                <div key={p.name} className="p-4 rounded-[var(--radius-lg)] relative" style={{ background: p.recommended ? 'var(--brand-primary)' : 'var(--bg-subtle)', border: `1px solid ${p.recommended ? 'var(--brand-primary)' : 'var(--border)'}` }}>
                  {p.recommended && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--brand-accent)', color: 'var(--text-primary)' }}>Recomendado</span>}
                  <div className="font-bold" style={{ color: p.recommended ? 'white' : 'var(--text-primary)' }}>{p.name}</div>
                  <div className="text-xl font-black my-1" style={{ color: p.recommended ? 'white' : 'var(--text-primary)' }}>{p.price}€/mes</div>
                  <div className="text-xs" style={{ color: p.recommended ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>{p.contratos}</div>
                </div>
              ))}
            </div>
          </>}
        </motion.div>

        <div className="flex gap-3 mt-8">
          {step > 0 && <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1">Atrás</Button>}
          {step < STEPS.length - 1
            ? <Button onClick={() => setStep(s => s + 1)} className="flex-1">Siguiente</Button>
            : <Button onClick={handleSubmit} className="flex-1">Crear mi empresa</Button>}
        </div>
      </div>
    </div>
  )
}
