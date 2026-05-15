import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[var(--brand-primary)] mb-4 select-none">404</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          Página no encontrada
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          La página que buscas no existe o ha sido movida. Comprueba la URL o vuelve al inicio.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft size={16} />}
          >
            Volver atrás
          </Button>
          <Link to="/"><Button leftIcon={<Home size={16} />}>Ir al inicio</Button></Link>
        </div>
      </div>
    </div>
  )
}
