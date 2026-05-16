import { BookOpen, Clock, ChevronRight, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const cursos = [
  {
    id: 'c1',
    icon: '🚀',
    titulo: 'Cómo conseguir tu primer turno',
    descripcion: 'Guía paso a paso para optimizar tu perfil y conseguir tu primera oportunidad laboral en STUGO.',
    duracion: '5 min',
    dificultad: 'Principiante',
    dificultadColor: '#10B981',
  },
  {
    id: 'c2',
    icon: '⭐',
    titulo: 'Guía de reputación y valoraciones',
    descripcion: 'Aprende cómo funciona el sistema de valoraciones y qué puedes hacer para mejorar tu puntuación.',
    duracion: '7 min',
    dificultad: 'Intermedio',
    dificultadColor: '#F59E0B',
  },
  {
    id: 'c3',
    icon: '✨',
    titulo: 'Optimiza tu perfil',
    descripcion: 'Consejos prácticos para que tu perfil destaque y las mejores empresas quieran contratarte.',
    duracion: '6 min',
    dificultad: 'Principiante',
    dificultadColor: '#10B981',
  },
  {
    id: 'c4',
    icon: '📋',
    titulo: 'Cómo cancelar correctamente',
    descripcion: 'Todo sobre la política de cancelaciones, cuándo está justificado y cómo minimizar el impacto en tu reputación.',
    duracion: '4 min',
    dificultad: 'Principiante',
    dificultadColor: '#10B981',
  },
  {
    id: 'c5',
    icon: '🎯',
    titulo: 'Entender el match score',
    descripcion: 'Descubre cómo funciona el algoritmo de compatibilidad y qué factores influyen en tu puntuación.',
    duracion: '8 min',
    dificultad: 'Intermedio',
    dificultadColor: '#F59E0B',
  },
  {
    id: 'c6',
    icon: '💰',
    titulo: 'Maximiza tus ingresos',
    descripcion: 'Estrategias para aumentar tus ganancias: turnos premium, horas extras, y cómo gestionar el IRPF.',
    duracion: '10 min',
    dificultad: 'Avanzado',
    dificultadColor: '#EF4444',
  },
]

export default function EstudianteAcademy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-[var(--radius-xl)] mb-4"
          style={{ backgroundColor: '#EEF2FF' }}
        >
          <BookOpen size={28} style={{ color: 'var(--brand-primary)' }} />
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Academia STUGO
        </h1>
        <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Aprende a sacar el máximo partido a la plataforma con nuestras guías rápidas
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {[
          { label: 'Guías disponibles', value: '6' },
          { label: 'Tiempo total', value: '40 min' },
          { label: 'Completadas', value: '0/6' },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--brand-primary)' }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Course cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {cursos.map((curso) => (
          <button
            key={curso.id}
            onClick={() => toast.info(`Abriendo: ${curso.titulo}`)}
            className="text-left rounded-[var(--radius-lg)] p-5 transition-all hover:scale-[1.02] hover:shadow-lg group"
            style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="text-3xl mb-3">{curso.icon}</div>
            <h3 className="text-sm font-bold mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
              {curso.titulo}
            </h3>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {curso.descripcion}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <Clock size={11} />
                  {curso.duracion}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: `${curso.dificultadColor}18`, color: curso.dificultadColor }}
                >
                  {curso.dificultad}
                </span>
              </div>
              <span
                className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                style={{ color: 'var(--brand-primary)' }}
              >
                Empezar <ChevronRight size={13} />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Coming soon banner */}
      <div
        className="rounded-[var(--radius-lg)] p-6 text-center"
        style={{ backgroundColor: 'var(--bg-subtle)', border: '1px dashed var(--border)' }}
      >
        <Sparkles size={24} className="mx-auto mb-3" style={{ color: 'var(--text-secondary)' }} />
        <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Próximamente
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Cursos especializados de <strong>hostelería</strong>, <strong>retail</strong> y{' '}
          <strong>logística</strong> — certifícate en los sectores que más contratan
        </p>
        <button
          onClick={() => toast.info('Te avisaremos cuando estén disponibles')}
          className="mt-4 px-5 py-2 rounded-[var(--radius-md)] text-sm font-medium border border-[var(--border)] hover:bg-[var(--bg-muted)] transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          Avisarme cuando estén disponibles
        </button>
      </div>
    </div>
  )
}
