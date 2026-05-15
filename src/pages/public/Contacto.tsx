import { Mail } from 'lucide-react'

export default function Contacto() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 bg-[var(--bg-muted)] rounded-[var(--radius-xl)] flex items-center justify-center mb-6">
        <Mail size={28} className="text-[var(--text-tertiary)]" />
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Contacto</h1>
      <p className="text-[var(--text-secondary)] max-w-md">
        Ponte en contacto con el equipo de STUGO.
      </p>
    </div>
  )
}
