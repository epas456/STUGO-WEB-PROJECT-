import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Building2, Clock, FileX, UserX, AlertTriangle, DollarSign, ArrowRight, Users, Zap, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const painPoints = [
  'Llamar a 20 candidatos para cubrir un sábado',
  'Papeleo eterno con la ETT tradicional',
  'Candidatos que no se presentan',
  'Perfiles desactualizados y sin verificar',
  'Costes imprevisibles mes a mes',
]

const solutions = [
  { icon: Zap, title: 'Candidatos en minutos', desc: 'Publica un turno y recibe candidatos verificados con match automático en menos de 30 minutos.' },
  { icon: FileX, title: 'Cero papeleo', desc: 'Alta en Seguridad Social, contrato y gestión laboral: la ETT colaboradora lo gestiona todo.' },
  { icon: Shield, title: 'Candidatos verificados', desc: 'DNI, estudios y historial verificados. Reputación real de otros empleadores.' },
  { icon: DollarSign, title: 'Coste fijo mensual', desc: 'Sin sorpresas. Entre 50 y 100 €/mes según tus necesidades. Sin costes por contratación.' },
]

const plans = [
  { name: 'Starter', price: 50, contratos: '25 contrataciones/trimestre' },
  { name: 'Growth', price: 60, contratos: '50 contrataciones/trimestre' },
  { name: 'Pro', price: 75, contratos: '100 contrataciones/trimestre', popular: true },
  { name: 'Scale', price: 100, contratos: 'Sin límite' },
]

const testimonials = [
  { name: 'Roberto Fernández', role: 'Director de RRHH · Hotel Atlántico', text: 'Antes tardábamos 3 días en cubrir un turno de limpieza. Ahora en menos de 2 horas tenemos candidato confirmado y verificado.' },
  { name: 'Laura Gómez', role: 'Responsable de tienda · Supermercado Frescos', text: 'La reputación bidireccional es clave. Ahora sé exactamente con quién voy a trabajar antes de confirmar.' },
  { name: 'Marcos Pérez', role: 'Jefe de sala · Restaurante Casa Pepe', text: 'El precio fijo mensual me permite planificar. Y si necesito más contrataciones, escalo el plan en un clic.' },
]

export default function Empresas() {
  return (
    <div style={{ background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section className="py-24 px-4" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F6FA 100%)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ background: 'var(--brand-primary)', color: 'white' }}>Para empresas</span>
            <h1 className="text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Cubra turnos en horas.<br />Sin papeleo. Sin sorpresas.
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Publique un turno y reciba candidatos verificados con match automático. Sin agencias, sin intermediarios, sin costes ocultos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/registro/empresa"><Button size="lg">Probar gratis 14 días</Button></Link>
              <Link to="/demo"><Button size="lg" variant="outline">Pedir una demo</Button></Link>
            </div>
            <p className="mt-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>Sin tarjeta de crédito · Cancelación en cualquier momento</p>
          </motion.div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>¿Te suena esto?</h2>
          <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>Los problemas que tienen el 87% de los negocios de hostelería, retail y eventos.</p>
          <div className="space-y-4">
            {painPoints.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <XCircle size={20} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                <span style={{ color: 'var(--text-primary)' }}>{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 px-4" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>STUGO lo resuelve</h2>
          <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>Un sistema diseñado específicamente para empresas que necesitan personal joven y flexible.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="p-6 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
                <div className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-4" style={{ background: '#EEF2FF' }}>
                  <s.icon size={20} style={{ color: 'var(--brand-primary)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>Planes transparentes</h2>
          <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>Sin sorpresas. IVA no incluido.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div key={plan.name} className="p-5 rounded-[var(--radius-lg)] relative" style={{ background: plan.popular ? 'var(--brand-primary)' : 'var(--bg-subtle)', border: `1px solid ${plan.popular ? 'var(--brand-primary)' : 'var(--border)'}` }}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'var(--brand-accent)', color: 'var(--text-primary)' }}>Más elegido</span>}
                <div className="text-sm font-semibold mb-1" style={{ color: plan.popular ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>{plan.name}</div>
                <div className="text-3xl font-bold mb-1" style={{ color: plan.popular ? 'white' : 'var(--text-primary)' }}>{plan.price}€</div>
                <div className="text-xs mb-4" style={{ color: plan.popular ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)' }}>/mes</div>
                <div className="text-xs" style={{ color: plan.popular ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}>{plan.contratos}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/precios"><span className="text-sm" style={{ color: 'var(--brand-primary)', cursor: 'pointer' }}>Ver comparativa completa de planes →</span></Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text-primary)' }}>Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex mb-3">{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#FFD63D" stroke="#FFD63D" />)}</div>
                <p className="text-sm mb-4 italic" style={{ color: 'var(--text-secondary)' }}>"{t.text}"</p>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Empieza hoy. Sin compromisos.</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>14 días gratis. Sin tarjeta. Cancela cuando quieras. El primer turno lo tienes publicado en 5 minutos.</p>
          <Link to="/registro/empresa"><Button size="xl">Crear mi cuenta de empresa <ArrowRight size={18} /></Button></Link>
        </div>
      </section>
    </div>
  )
}
