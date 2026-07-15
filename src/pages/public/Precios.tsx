import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X, Building2, GraduationCap, ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

type Audience = 'empresa' | 'estudiante'

const empresaPlanes = [
  {
    id: 'starter',
    name: 'Starter',
    price: 50,
    desc: 'Para pequeños negocios que quieren empezar.',
    features: [
 'Hasta 5 turnos/mes',
 'Hasta 3 trabajadores activos',
 'Panel básico de gestión',
 'Matching automático',
 'Soporte por email',
 'Facturación mensual',
    ],
    notIncluded: ['Analíticas avanzadas', 'Integración API', 'Gestor de cuenta dedicado'],
    cta: 'Empezar con Starter',
    highlighted: false,
    badge: null,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 60,
    desc: 'El salto natural para negocios en crecimiento.',
    features: [
 'Hasta 20 turnos/mes',
 'Hasta 15 trabajadores activos',
 'Panel avanzado de gestión',
 'Matching automático prioritario',
 'Soporte por email y chat',
 'Equipos favoritos',
 'Valoraciones detalladas',
    ],
    notIncluded: ['Integración API', 'Gestor de cuenta dedicado'],
    cta: 'Empezar con Growth',
    highlighted: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 75,
    desc: 'La opción más elegida por restaurantes y retail.',
    features: [
 'Hasta 60 turnos/mes',
 'Hasta 50 trabajadores activos',
 'Todos los paneles y analíticas',
 'Matching premium con filtros avanzados',
 'Soporte WhatsApp 24/7',
 'Equipos favoritos ilimitados',
 'Informes semanales automáticos',
 'Comisión reducida: 17%',
    ],
    notIncluded: ['Integración API (extra)', 'Gestor de cuenta dedicado (extra)'],
    cta: 'Empezar con Pro',
    highlighted: true,
    badge: 'Más elegido',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 100,
    desc: 'Para empresas con alto volumen de contrataciones.',
    features: [
 'Turnos ilimitados',
 'Hasta 200 trabajadores activos',
 'Todos los paneles y analíticas',
 'Matching premium + API',
 'Gestor de cuenta dedicado',
 'SLA garantizado <2h',
 'Integración con sistemas RRHH',
 'Comisión negociable desde 15%',
 'Facturación personalizada',
 'Soporte prioritario 24/7',
    ],
    notIncluded: [],
    cta: 'Hablar con ventas',
    highlighted: false,
    badge: null,
  },
]

const faqItems = [
  {
    q: '¿Hay permanencia o puedo cancelar en cualquier momento?',
    a: 'No hay permanencia. Puedes cancelar tu suscripción en cualquier momento desde el panel de empresa. La cancelación tiene efecto al final del ciclo de facturación en curso. No se aplican penalizaciones.',
  },
  {
    q: '¿La comisión del 15-20% se aplica sobre qué base?',
    a: 'La comisión se calcula sobre el salario bruto acordado para cada turno. Por ejemplo, si el salario es 100€ y tienes Plan Pro (17%), STUGO cobra 17€ y el estudiante recibe 98,5€ (restando su 1,5%). La empresa paga en total 117€.',
  },
  {
    q: '¿Puedo cambiar de plan en cualquier momento?',
    a: 'Sí. Puedes hacer upgrade inmediatamente y el cambio es efectivo al instante. Para downgrade, el cambio se aplica al siguiente ciclo de facturación. Los créditos no consumidos no se devuelven.',
  },
  {
    q: '¿Qué pasa si supero el límite de turnos de mi plan?',
    a: 'Al llegar al 80% del límite recibirás un aviso automático. Si lo superas, los turnos adicionales tienen un coste de 8€ por turno extra. Te recomendamos hacer upgrade antes de alcanzar el límite para no interrumpir tus operaciones.',
  },
  {
    q: '¿Tienen descuento para organizaciones sin ánimo de lucro o entidades educativas?',
    a: 'Sí, ofrecemos un 30% de descuento para ONGs, fundaciones, universidades y centros educativos acreditados. Contacta con nuestro equipo en hola@stugo.es con tu documentación acreditativa.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{q}</span>
        <ChevronDown size={18} style={{ color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Precios() {
  const [audience, setAudience] = useState<Audience>('empresa')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand-primary)' }}>Planes y precios</span>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Transparencia total</h1>
        <p className="text-xl max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Sin sorpresas. Sin letras pequeñas. El precio que ves es el que pagas.</p>

        {/* Toggle */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex p-1 gap-1" style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            {(['empresa', 'estudiante'] as Audience[]).map((a) => (
              <button
                key={a}
                onClick={() => setAudience(a)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200"
                style={{
                  borderRadius: 'var(--radius-md)',
                  background: audience === a ? 'var(--brand-primary)' : 'transparent',
                  color: audience === a ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {a === 'empresa' ? <Building2 size={16} /> : <GraduationCap size={16} />}
                {a === 'empresa' ? 'Empresa' : 'Estudiante'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {audience === 'empresa' ? (
          <motion.div key="empresa" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {/* Planes empresa */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {empresaPlanes.map((plan) => (
                <div
                  key={plan.id}
                  className="relative flex flex-col"
                  style={{
                    background: plan.highlighted ? 'var(--brand-primary)' : 'var(--bg-base)',
                    border: plan.highlighted ? '2px solid var(--brand-primary)' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: plan.highlighted ? '0 12px 40px rgba(14,15,18,0.3)' : 'var(--shadow-md)',
                    padding: '28px',
                  }}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: 'var(--brand-accent)', color: 'var(--text-primary)' }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-1" style={{ color: plan.highlighted ? '#fff' : 'var(--text-primary)' }}>{plan.name}</h3>
                    <p className="text-xs mb-4" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}>{plan.desc}</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black" style={{ color: plan.highlighted ? '#fff' : 'var(--text-primary)' }}>{plan.price}€</span>
                      <span className="text-sm mb-1.5" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)' }}>/mes</span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.6)' : 'var(--text-tertiary)' }}>+ comisión por turno</p>
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={15} style={{ color: plan.highlighted ? 'var(--brand-accent)' : 'var(--success)', flexShrink: 0, marginTop: 1 }} />
                        <span style={{ color: plan.highlighted ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}>{f}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm opacity-50">
                        <X size={15} style={{ flexShrink: 0, marginTop: 1, color: plan.highlighted ? '#fff' : 'var(--text-tertiary)' }} />
                        <span style={{ color: plan.highlighted ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={plan.id === 'scale' ? '/contacto' : '/empresa/registro'}>
                    <Button
                      size="md"
                      variant={plan.highlighted ? 'accent' : 'outline'}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Comparison table note */}
            <div className="text-center mb-16">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                ¿Quieres comparar STUGO con otras plataformas?{' '}
                <Link to="/comparador" style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>Ver comparador →</Link>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="estudiante" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex justify-center mb-16">
              <div className="max-w-lg w-full text-center p-12 relative overflow-hidden"
                style={{ background: 'var(--bg-base)', borderRadius: 'var(--radius-xl)', border: '2px solid var(--brand-accent)', boxShadow: '0 12px 40px rgba(214,248,74,0.15)' }}>
                <div className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-10"
                  style={{ background: 'var(--brand-accent)', transform: 'translate(-40%,-40%)' }} />
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-10"
                  style={{ background: 'var(--brand-primary)', transform: 'translate(40%,40%)' }} />
                <div className="relative z-10">
                  <GraduationCap size={56} className="mx-auto mb-6" style={{ color: 'var(--brand-primary)' }} />
                  <h2 className="text-4xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>Gratis para siempre</h2>
                  <p className="text-2xl font-bold mb-6" style={{ color: 'var(--brand-primary)' }}>Solo 1,5% sobre lo que cobras</p>
                  <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    No hay cuotas, no hay registro de pago, no hay letra pequeña. STUGO es completamente gratuito para los estudiantes.
                    Solo cuando ganas dinero, nosotros ganamos el 1,5%. Si no trabajas, no pagas nada.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { label: 'Registro', value: '0 €' },
                      { label: 'Comisión por turno', value: '1,5%' },
                      { label: 'Cancelar cuenta', value: '0 €' },
                      { label: 'Soporte', value: 'Gratis' },
                    ].map((item) => (
                      <div key={item.label} className="p-3 text-center"
                        style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
                        <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/registro">
                    <Button size="xl" className="w-full">
                      Crear cuenta gratis <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <p className="mt-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Ejemplo: cobras 100 € por un turno → STUGO cobra 1,50 €, tú recibes 98,50 €
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>Preguntas frecuentes sobre precios</h2>
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '8px 24px', background: 'var(--bg-base)' }}>
          {faqItems.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 text-center p-12 rounded-[var(--radius-xl)]"
        style={{ background: 'var(--brand-primary)' }}>
        <h2 className="text-3xl font-bold text-white mb-4">¿Tienes dudas? Hablamos</h2>
        <p className="mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>Nuestro equipo está disponible de lunes a viernes de 9h a 20h.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contacto">
            <Button variant="accent" size="lg">Contactar con ventas</Button>
          </Link>
          <Link to="/faq">
            <Button variant="ghost" size="lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>Ver FAQ completa</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
