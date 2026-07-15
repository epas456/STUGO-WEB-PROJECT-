import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Building2, GraduationCap, ArrowRight, CheckCircle2, Star,
  MapPin, ChefHat, ShoppingBag, Music, Package, Euro, Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
}

type Audience = 'empresa' | 'estudiante'

const heroContent = {
  empresa: {
    badge: 'Para empresas',
    headline: 'Personal de confianza\ncuando lo necesitas',
    sub: 'Publica un turno y recibe candidatos verificados en minutos. Sin agencias. Sin papeleo. Solo talento joven listo para trabajar.',
    cta: 'Publicar mi primer turno',
    ctaHref: '/empresa/registro',
    secondaryCta: 'Ver planes y precios',
    secondaryHref: '/precios',
    checks: ['Perfil verificado con foto e historial', 'Match automático por sector y zona', 'Pago gestionado por STUGO'],
    stat: '4.8 valoración media de las empresas',
  },
  estudiante: {
    badge: 'Para estudiantes',
    headline: 'Gana dinero sin\nabandonar tus estudios',
    sub: 'Elige los turnos que encajan con tu horario. Cobra en menos de 24 h. Sin CV. Sin esperas. Solo oportunidades reales cerca de ti.',
    cta: 'Buscar turnos ahora',
    ctaHref: '/turnos',
    secondaryCta: 'Calcular mis ingresos',
    secondaryHref: '/calculadora',
    checks: ['Flexible: tú eliges cuándo y cuánto', '1,5 % de comisión — el más bajo del mercado', 'Cobra antes de 24 horas'],
    stat: '+50.000 turnos completados en España',
  },
}

const stepsData = {
  empresa: [
    { n: '01', title: 'Crea tu perfil de empresa', desc: 'Regístrate, verifica tu CIF y configura tu perfil en menos de 10 minutos. Nuestro equipo te llamará para darte la bienvenida.', icon: <Building2 size={24} /> },
    { n: '02', title: 'Publica el turno', desc: 'Indica el puesto, horario, salario y requisitos. Tu oferta estará visible para miles de estudiantes verificados en toda España.', icon: <Briefcase size={24} /> },
    { n: '03', title: 'Selecciona y listo', desc: 'Recibe candidatos con match score alto. Acepta el perfil que más te guste y gestiona todo desde el panel. Sin papeleo adicional.', icon: <CheckCircle2 size={24} /> },
  ],
  estudiante: [
    { n: '01', title: 'Crea tu perfil gratuito', desc: 'Sube tu carnet de estudiante, verifica tu identidad en 5 minutos y rellena tu disponibilidad y sectores preferidos.', icon: <GraduationCap size={24} /> },
    { n: '02', title: 'Encuentra turnos a tu medida', desc: 'Nuestro algoritmo te muestra las oportunidades más afines a tu perfil, cerca de ti y en el horario que tú marcas.', icon: <MapPin size={24} /> },
    { n: '03', title: 'Trabaja y cobra rápido', desc: 'Confirma tu asistencia, trabaja y cobra antes de 24 horas. Tu reputación crece con cada turno bien hecho.', icon: <Euro size={24} /> },
  ],
}

const sectores = [
  { icon: <ChefHat size={32} />, label: 'Hostelería & Restauración', desc: 'Camareros, ayudantes de cocina, bartenders y más.', turnos: 1240, color: 'var(--brand-coral)' },
  { icon: <ShoppingBag size={32} />, label: 'Retail & Comercio', desc: 'Dependientes, promotores, cajeros y reponedores.', turnos: 890, color: 'var(--info)' },
  { icon: <Music size={32} />, label: 'Eventos & Entretenimiento', desc: 'Azafatas, logística de eventos, taquilleros.', turnos: 640, color: 'var(--info)' },
  { icon: <Package size={32} />, label: 'Logística & Almacén', desc: 'Picking, packing, carga/descarga y reparto.', turnos: 530, color: 'var(--success)' },
]

const testimonials = [
  { name: 'María G.', role: 'Estudiante de Psicología, Madrid', quote: 'Gracias a STUGO pago mi alquiler sin faltar ni una clase. Antes tardaba semanas en cobrar con otras apps. Aquí cobré en el mismo día.', rating: 5, avatar: 'MG', color: 'var(--info)' },
  { name: 'Carlos R.', role: 'RRHH, Restaurante La Pepita · Barcelona', quote: 'En 20 minutos teníamos camarero para el sábado. El perfil llegó con historial verificado y valoraciones reales. No pediremos personal de otra manera.', rating: 5, avatar: 'CR', color: 'var(--success)' },
  { name: 'Lucía M.', role: 'Estudiante de ADE, Sevilla', quote: 'Llevo 6 meses en STUGO y ya tengo 4,9 estrellas. Las empresas me contactan directamente. Es la mejor forma de ganar experiencia real.', rating: 5, avatar: 'LM', color: 'var(--info)' },
]

const trustNumbers = [
  { value: '50.000+', label: 'Turnos completados' },
  { value: '12.000+', label: 'Estudiantes activos' },
  { value: '2.400+', label: 'Empresas confían en STUGO' },
  { value: '4,8', label: 'Valoración media' },
]

function MiniCalculator() {
  const [hours, setHours] = useState(10)
  const [rate, setRate] = useState(11)
  const monthly = hours * rate * 4.3
  const stugoFee = monthly * 0.015
  const net = monthly - stugoFee

  return (
    <div style={{ background: 'var(--bg-base)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }} className="p-8 max-w-md w-full">
      <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Calcula tus ingresos</h3>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Horas por semana</span>
            <span className="text-sm font-bold" style={{ color: 'var(--brand-primary)' }}>{hours} h</span>
          </div>
          <input type="range" min={1} max={30} value={hours}
            onChange={e => setHours(Number(e.target.value))}
            className="w-full" style={{ accentColor: 'var(--brand-primary)' }} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Salario por hora</span>
            <span className="text-sm font-bold" style={{ color: 'var(--brand-primary)' }}>{rate} €/h</span>
          </div>
          <input type="range" min={8} max={18} value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="w-full" style={{ accentColor: 'var(--brand-primary)' }} />
        </div>
        <div style={{ borderTop: '1px solid var(--border)' }} className="pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>Bruto mensual</span>
            <span className="font-semibold">{monthly.toFixed(0)} €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>Comisión STUGO (1,5%)</span>
            <span className="font-semibold" style={{ color: 'var(--danger)' }}>-{stugoFee.toFixed(0)} €</span>
          </div>
          <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Tu neto estimado</span>
            <span className="text-2xl font-bold" style={{ color: 'var(--brand-accent)' }}>
              {net.toFixed(0)} €
            </span>
          </div>
        </div>
        <Link to="/calculadora">
          <Button variant="outline" size="sm" className="w-full mt-2">
            Calculadora completa <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function Home() {
  const [audience, setAudience] = useState<Audience>('estudiante')
  const content = heroContent[audience]
  const steps = stepsData[audience]

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center" style={{ overflow: 'hidden' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(14,15,18,0.05) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(14,15,18,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center p-1 gap-1" style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              {(['estudiante', 'empresa'] as Audience[]).map((a) => (
                <button
                  key={a}
                  onClick={() => setAudience(a)}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200"
                  style={{
                    borderRadius: 'var(--radius-md)',
                    background: audience === a ? 'var(--brand-primary)' : 'transparent',
                    color: audience === a ? '#fff' : 'var(--text-secondary)',
                    boxShadow: audience === a ? 'var(--shadow-md)' : 'none',
                  }}
                >
                  {a === 'empresa' ? <Building2 size={16} /> : <GraduationCap size={16} />}
                  {a === 'empresa' ? 'Soy empresa' : 'Soy estudiante'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={audience}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center lg:text-left"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
                  style={{ background: 'rgba(14,15,18,0.1)', color: 'var(--brand-primary)' }}>
                  {content.badge}
                </span>
                <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] mb-6" style={{ color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
                  {content.headline}
                </h1>
                <p className="text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {content.sub}
                </p>
                <ul className="space-y-3 mb-10">
                  {content.checks.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-sm justify-center lg:justify-start" style={{ color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link to={content.ctaHref}>
                    <Button size="xl" className="w-full sm:w-auto">
                      {content.cta} <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link to={content.secondaryHref}>
                    <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                      {content.secondaryCta}
                    </Button>
                  </Link>
                </div>
                <p className="mt-6 text-xs" style={{ color: 'var(--text-tertiary)' }}>{content.stat}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                {audience === 'estudiante' ? (
                  <motion.div key="calc" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
                    <MiniCalculator />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empresa-visual"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="p-8 max-w-md w-full"
                    style={{ background: 'var(--bg-base)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'rgba(14,15,18,0.1)', color: 'var(--brand-primary)' }}>
                        <Building2 size={32} />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Turno publicado</h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Camarero/a · Sábado 21:00-02:00 · 12€/h</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'Ana López', score: 98, stars: '4.9', avatar: 'AL', color: 'var(--info)' },
                        { name: 'Carlos Ruiz', score: 95, stars: '4.8', avatar: 'CR', color: 'var(--success)' },
                        { name: 'Sara Martín', score: 92, stars: '4.7', avatar: 'SM', color: 'var(--info)' },
                      ].map((c) => (
                        <div key={c.name} className="flex items-center gap-3 p-3"
                          style={{ borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)' }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ background: c.color }}>{c.avatar}</div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}> {c.stars} · Hostelería 2 años</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold" style={{ color: 'var(--brand-primary)' }}>{c.score}</span>
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>match</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 p-3 text-center text-xs"
                      style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-md)', color: 'var(--success)' }}>
                      Turno cubierto en <strong>23 minutos</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-subtle)' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustNumbers.map((t) => (
              <div key={t.label} className="text-center">
                <p className="text-3xl font-bold mb-1" style={{ color: 'var(--brand-primary)' }}>{t.value}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand-primary)' }}>Proceso</span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Cómo funciona en 3 pasos</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Diseñado para ser simple desde el primer día.
          </p>
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1 gap-1" style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              {(['estudiante', 'empresa'] as Audience[]).map((a) => (
                <button key={a} onClick={() => setAudience(a)}
                  className="px-4 py-2 text-sm font-semibold transition-all duration-200"
                  style={{ borderRadius: 'var(--radius-md)', background: audience === a ? 'var(--brand-primary)' : 'transparent', color: audience === a ? '#fff' : 'var(--text-secondary)' }}>
                  {a === 'empresa' ? 'Como empresa' : 'Como estudiante'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`steps-${audience}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <Card key={step.n} hover className="text-center h-full">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(14,15,18,0.1)', color: 'var(--brand-primary)' }}>
                  {step.icon}
                </div>
                <span className="text-5xl font-black mb-3 block" style={{ color: 'var(--bg-muted)' }}>{step.n}</span>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── SECTORES ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand-primary)' }}>Sectores activos</span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Oportunidades en todos los sectores</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Desde hostelería a logística, conectamos talento con las empresas que más lo necesitan.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectores.map((s) => (
            <Link to="/turnos" key={s.label}>
              <Card hover className="group cursor-pointer h-full">
                <div className="w-14 h-14 flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `${s.color}15`, color: s.color, borderRadius: 'var(--radius-lg)' }}>
                  {s.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{s.label}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${s.color}15`, color: s.color }}>
                  {s.turnos.toLocaleString('es-ES')} turnos activos
                </span>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/turnos">
            <Button variant="outline" size="lg">Ver todos los turnos <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand-primary)' }}>Testimonios</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Lo que dicen los que ya están dentro</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={`${t.name}-${i}`} className="flex flex-col gap-4">
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" style={{ color: 'var(--brand-accent)' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: t.color }}>{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-[var(--radius-xl)] p-10 flex flex-col gap-6 relative overflow-hidden"
            style={{ background: 'var(--brand-primary)' }}>
            <div className="absolute w-64 h-64 rounded-full opacity-10 top-0 right-0"
              style={{ background: 'white', transform: 'translate(30%,-30%)' }} />
            <Building2 size={40} style={{ color: 'rgba(255,255,255,0.8)' }} />
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Para empresas</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)' }} className="leading-relaxed">
                Accede a miles de estudiantes verificados. Publica tu primer turno gratis y ve resultados en menos de una hora.
              </p>
            </div>
            <ul className="space-y-2">
              {['Sin coste de alta', 'Candidatos verificados', 'Soporte WhatsApp 24/7'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--brand-accent)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/empresa/registro" className="mt-2">
              <Button variant="accent" size="lg" className="w-full">
                Publicar turno gratis <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="rounded-[var(--radius-xl)] p-10 flex flex-col gap-6 relative overflow-hidden"
            style={{ background: 'var(--bg-subtle)', border: '2px solid var(--brand-accent)' }}>
            <div className="absolute w-64 h-64 rounded-full opacity-10 top-0 right-0"
              style={{ background: 'var(--brand-accent)', transform: 'translate(30%,-30%)' }} />
            <GraduationCap size={40} style={{ color: 'var(--brand-primary)' }} />
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Para estudiantes</h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Empieza a ganar dinero esta semana. Sin CV, sin complicaciones. Solo elige el turno y aparece. Cobra antes de 24 horas.
              </p>
            </div>
            <ul className="space-y-2">
              {['100% gratuito para estudiantes', 'Solo 1,5% de comisión', 'Cobra antes de 24 horas'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--success)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/registro" className="mt-2">
              <Button size="lg" className="w-full">
                Crear cuenta gratis <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
