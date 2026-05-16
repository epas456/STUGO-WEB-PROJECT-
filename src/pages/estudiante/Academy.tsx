import { BookOpen, Clock, Star, ChevronRight } from 'lucide-react'

const cursos = [
  { title: 'Cómo conseguir tu primer turno', duration: '5 min', difficulty: 'Básico', icon: '🚀' },
  { title: 'Guía de reputación y valoraciones', duration: '8 min', difficulty: 'Básico', icon: '⭐' },
  { title: 'Optimiza tu perfil para más match', duration: '6 min', difficulty: 'Básico', icon: '🎯' },
  { title: 'Cómo cancelar correctamente', duration: '4 min', difficulty: 'Básico', icon: '❌' },
  { title: 'Entender el match score', duration: '7 min', difficulty: 'Intermedio', icon: '📊' },
  { title: 'Maximiza tus ingresos con STUGO', duration: '10 min', difficulty: 'Avanzado', icon: '💶' },
]

const diffColor: Record<string, string> = { Básico: '#10B981', Intermedio: '#F59E0B', Avanzado: '#2D5BFF' }

export default function EstudianteAcademy() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Academia STUGO</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>Aprende a sacar el máximo partido a la plataforma.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {cursos.map((c, i) => (
          <div key={i} className="p-5 rounded-[var(--radius-lg)] cursor-pointer hover:shadow-md transition-shadow"
            style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <div className="text-3xl mb-3">{c.icon}</div>
            <h2 className="font-semibold text-sm mb-3 leading-snug" style={{ color: 'var(--text-primary)' }}>{c.title}</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <span className="flex items-center gap-1"><Clock size={12} /> {c.duration}</span>
                <span className="px-2 py-0.5 rounded-full text-white text-xs" style={{ background: diffColor[c.difficulty] }}>{c.difficulty}</span>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-[var(--radius-xl)] text-center" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
        <BookOpen size={32} className="mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
        <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Próximamente</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Cursos específicos de hostelería, retail, eventos y logística. Activa las alertas para ser de los primeros.</p>
      </div>
    </div>
  )
}
