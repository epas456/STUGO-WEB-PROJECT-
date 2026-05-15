import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Home, RefreshCw } from 'lucide-react'

export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[var(--danger)] mb-4 select-none">500</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          Error interno del servidor
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Algo ha salido mal en nuestro lado. Nuestro equipo ha sido notificado y lo estamos resolviendo. Por favor, inténtalo de nuevo en unos minutos.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            onClick={() => window.location.reload()}
            leftIcon={<RefreshCw size={16} />}
          >
            Reintentar
          </Button>
          <Button
            as={Link as any}
            to="/"
            leftIcon={<Home size={16} />}
          >
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
