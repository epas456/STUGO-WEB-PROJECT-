import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Euro, Clock, Star, ChefHat, ShoppingBag, Music, Package, ArrowRight, CheckCircle2, GraduationCap, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const steps = [
  { n: '01', title: 'Crea tu perfil en 3 minutos', desc: 'Sin CV. Solo tu disponibilidad, tus estudios y los sectores que te interesan.' },
  { n: '02', title: 'Acepta turnos que te encajen', desc: 'Filtra por horario, distancia y salario. El match score te dice qué tan compatible eres.' },
  { n: '03', title: 'Trabaja y cobra en 24 horas', desc: 'Confirma el turno. Trabaja. Cobra antes de mañana. Sin papeleo ni esperas.' },
]

const sectors = [
  { icon: ChefHat, name: 'Hostelería', desc: 'Camarero/a, barista, ayudante de cocina, hostess', color: 'var(--brand-coral)' },
  { icon: ShoppingBag, name: 'Retail', desc: 'Reponedor/a, dependiente/a, cajero/a, visual merchandiser', color: 'var(--info)' },
  { icon: Music, name: 'Eventos', desc: 'Personal de sala, azafatas/os, taquilla, logística', color: 'var(--info)' },
  { icon: Package, name: 'Logística', desc: 'Almacén, reparto, picking, inventario', color: 'var(--success)' },
]

const testimonials = [
  { name: 'Lucía García', age: 19, city: 'Madrid', uni: 'UCM - Derecho', text: 'Cubrí mi matrícula trabajando solo los fines de semana. Y sin perder ni una clase.' },
  { name: 'Marc Solà', age: 21, city: 'Barcelona', uni: 'UPF - Economía', text: 'En 2 meses de STUGO gané más que en toda una temporada en mi ETT anterior.' },
  { name: 'Aitana Ruiz', age: 18, city: 'Valencia', uni: 'UV - Bachillerato', text: 'Pensé que con 18 no me contratarían. En STUGO hice 7 turnos en el primer mes.' },
]

export default function Estudiantes() {
  return (
    <div style={{ background: 'var(--bg-base)' }}>
      {/* Hero */}
      <section className="py-24 px-4 text-center" style={{ background: 'var(--bg-subtle)' }}>
        <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ background: 'var(--brand-accent)', color: 'var(--text-primary)' }}>Para estudiantes</span>
          <h1 className="text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
            Trabaja cuando tú quieras.<br />Cobra mañana.
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Turnos compatibles con tus clases. Sin CV, sin entrevistas. Solo registra tu disponibilidad y acepta lo que te encaje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registro/estudiante"><Button size="lg">Crear cuenta gratis</Button></Link>
            <Link to="/calculadora"><Button size="lg" variant="outline">Calcular mis ingresos</Button></Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} style={{ color: 'var(--success)' }} /> 100% gratis para el estudiante</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} style={{ color: 'var(--success)' }} /> Solo 1,5% de comisión sobre lo que cobras</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={14} style={{ color: 'var(--success)' }} /> Pago en menos de 24 horas</span>
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text-primary)' }}>Así de fácil</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="text-center">
                <div className="text-4xl font-black mb-4" style={{ color: 'var(--brand-accent)' }}>{s.n}</div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick calculator */}
      <section className="py-20 px-4" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-lg mx-auto text-center">
          <GraduationCap size={32} className="mx-auto mb-4" style={{ color: 'var(--brand-primary)' }} />
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>¿Cuánto puedes ganar?</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Trabaja 10 horas a la semana a 10 €/h y gana <strong style={{ color: 'var(--brand-accent)' }}>~394€/mes netos</strong>.</p>
          <Link to="/calculadora"><Button size="lg">Usar la calculadora completa <ArrowRight size={16} /></Button></Link>
          <p className="mt-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>Con estimación de IRPF según tus ingresos anuales.</p>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>Sectores donde trabajarás</h2>
          <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>Elige el que más te guste. Puedes estar en varios a la vez.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((sec, i) => (
              <div key={i} className="p-5 rounded-[var(--radius-lg)] text-center hover:scale-105 transition-transform cursor-pointer"
                style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: sec.color + '22' }}>
                  <sec.icon size={22} style={{ color: sec.color }} />
                </div>
                <div className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{sec.name}</div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{sec.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text-primary)' }}>Lo que dicen los estudiantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex mb-3">{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="var(--brand-accent)" stroke="var(--brand-accent)" />)}</div>
                <p className="text-sm mb-4 italic" style={{ color: 'var(--text-secondary)' }}>"{t.text}"</p>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}, {t.age} años</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t.city} · {t.uni}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Smartphone size={40} className="mx-auto mb-6" style={{ color: 'var(--brand-primary)' }} />
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Tu primer turno puede ser este finde.</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>Crea tu perfil en 3 minutos. Sin CV. Sin entrevistas. Solo disponibilidad y ganas.</p>
          <Link to="/registro/estudiante"><Button size="xl">Empezar a ganar <ArrowRight size={18} /></Button></Link>
        </div>
      </section>
    </div>
  )
}
