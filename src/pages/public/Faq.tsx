import { HelpCircle } from 'lucide-react'

export default function Faq() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 bg-[var(--bg-muted)] rounded-[var(--radius-xl)] flex items-center justify-center mb-6">
        <HelpCircle size={28} className="text-[var(--text-tertiary)]" />
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Preguntas Frecuentes</h1>
      <p className="text-[var(--text-secondary)] max-w-md">
        Respuestas a las dudas más comunes sobre STUGO.
      </p>
    </div>
  )
}
