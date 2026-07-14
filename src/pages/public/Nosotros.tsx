import { Shield, Star, Zap, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const equipo = [
  { initials: 'EM', name: 'Elena Martínez', role: 'CEO & Co-fundadora', quote: 'Empecé a los 16 sirviendo mesas. Sé lo que necesitas.', color: '#1B2A4E' },
  { initials: 'CL', name: 'Carlos López', role: 'CTO', quote: 'Construimos tecnología que de verdad funciona.', color: '#7C3AED' },
  { initials: 'AR', name: 'Ana Ruiz', role: 'Head of Operations', quote: 'Cada turno cubierto es una historia real.', color: '#059669' },
  { initials: 'IS', name: 'Iñigo Sainz', role: 'Growth', quote: 'Los datos no mienten.', color: '#D97706' },
  { initials: 'MF', name: 'María Fernández', role: 'Legal & Compliance', quote: 'La transparencia no es opcional, es la base.', color: '#DC2626' },
  { initials: 'TG', name: 'Tomás Gil', role: 'Product', quote: 'Diseño para personas, no para pantallas.', color: '#0891B2' },
  { initials: 'NV', name: 'Noa Vidal', role: 'Customer Success', quote: 'Resuelvo problemas reales en tiempo real.', color: '#BE185D' },
  { initials: 'PS', name: 'Pedro Sanz', role: 'Data', quote: 'Hago que el matching sea cada vez más preciso.', color: '#65A30D' },
]

const valores = [
  { icon: Shield, title: 'Transparencia radical', desc: 'Sin letra pequeña. Sin sorpresas. Lo que ves es lo que hay, siempre.' },
  { icon: Star, title: 'Reputación honesta', desc: 'Las valoraciones son reales, bidireccionales y nunca se compran.' },
  { icon: Zap, title: 'Pago rápido', desc: 'Cobras lo que trabajas. Sin retrasos, sin excusas. En 24 horas.' },
  { icon: Target, title: 'Sin paja', desc: 'Cada función que construimos tiene un propósito real. Lo inútil, fuera.' },
]

const cifras = [
  { value: '12.000+', label: 'estudiantes activos' },
  { value: '850+', label: 'empresas registradas' },
  { value: '284.560', label: 'horas trabajadas' },
  { value: '4,8', label: 'valoración media' },
]

export default function Nosotros() {
  return (
    <div style={{ color: 'var(--text-primary)' }}>
      {/* MANIFESTO */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <blockquote className="text-2xl md:text-3xl font-bold leading-snug mb-8" style={{ color: 'var(--text-primary)' }}>
 "Creemos que estudiar no debería significar elegir entre clases o dinero. Y que cubrir un turno no debería costar 3 días de papeleo."
        </blockquote>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          STUGO nació en 2022 con una misión sencilla: conectar a estudiantes que quieren trabajar con empresas que necesitan personal de confianza, de forma rápida, transparente y sin intermediarios innecesarios. Hoy somos más de 12.000 estudiantes y 850 empresas que lo han comprobado.
        </p>
      </section>

      {/* EQUIPO */}
      <section style={{ background: 'var(--bg-subtle)' }} className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">El equipo</h2>
          <p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>
            Personas reales, con experiencia real en los sectores que servimos.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {equipo.map((p) => (
              <Card key={p.name} padding="md" className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg mx-auto mb-3"
                  style={{ background: p.color }}
                >
                  {p.initials}
                </div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                <p className="text-xs mb-2" style={{ color: 'var(--brand-primary)' }}>{p.role}</p>
                <p className="text-xs italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>"{p.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Nuestros valores</h2>
          <p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>
            Lo que nos guía cada día.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {valores.map((v) => (
              <Card key={v.title} padding="md" className="text-center">
                <div
                  className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'rgba(45,91,255,0.1)' }}
                >
                  <v.icon size={22} style={{ color: 'var(--brand-primary)' }} />
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{v.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIOS */}
      <section style={{ background: 'var(--bg-subtle)' }} className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Respaldados por</h2>
          <p className="mb-10" style={{ color: 'var(--text-secondary)' }}>Inversores y socios que comparten nuestra misión.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Inversor 1', 'ETT Partner', 'Entidad Financiera', 'Aceleradora'].map((name) => (
              <div
                key={name}
                className="h-20 rounded-[var(--radius-md)] border flex items-center justify-center text-sm font-medium"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg-base)',
                  color: 'var(--text-tertiary)',
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIFRAS */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">STUGO en números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {cifras.map((c) => (
              <div
                key={c.label}
                className="text-center p-6 rounded-[var(--radius-lg)] border"
                style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
              >
                <p className="text-3xl font-bold mb-1" style={{ color: 'var(--brand-primary)' }}>{c.value}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
