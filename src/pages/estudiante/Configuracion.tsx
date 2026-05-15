import { Settings } from 'lucide-react'

export default function Configuracion() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 bg-[var(--bg-muted)] rounded-[var(--radius-xl)] flex items-center justify-center mb-6">
        <Settings size={28} className="text-[var(--text-tertiary)]" />
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Configuración</h1>
      <p className="text-[var(--text-secondary)] max-w-md">
        Ajusta tu cuenta y preferencias.
      </p>
    </div>
  )
}
