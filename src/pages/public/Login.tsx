import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Globe, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'

type Role = 'empresa' | 'estudiante'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useStore()

  const [role, setRole] = useState<Role>('empresa')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    toast.error('Credenciales incorrectas. Usa los botones de demo para probar.')
  }

  const handleDemoEmpresa = () => {
    login('empresa', { id: 'demo-empresa', name: 'Restaurante Casa Pepe', email: 'empresa@demo.com', role: 'empresa' })
    navigate('/empresa/dashboard')
  }

  const handleDemoEstudiante = () => {
    login('estudiante', { id: 'demo-est', name: 'Lucía García', email: 'lucia@demo.com', role: 'estudiante' })
    navigate('/estudiante/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: 'var(--bg-subtle)' }}>
      <div className="w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center font-bold text-white text-lg"
              style={{ background: 'var(--brand-primary)' }}
            >
              S
            </div>
            <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>STUGO</span>
          </Link>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Bienvenido de nuevo</p>
        </div>

        <Card padding="lg">
          {/* Role tabs */}
          <div
            className="flex rounded-[var(--radius-md)] p-1 mb-6"
            style={{ background: 'var(--bg-subtle)' }}
          >
            {(['empresa', 'estudiante'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-all duration-150"
                style={{
                  background: role === r ? 'var(--bg-base)' : 'transparent',
                  color: role === r ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  boxShadow: role === r ? 'var(--shadow-md)' : 'none',
                }}
              >
                {r === 'empresa' ? 'Empresa' : 'Estudiante'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'empresa' ? 'empresa@ejemplo.com' : 'estudiante@universidad.es'}
                className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] text-sm border outline-none transition-all"
                style={{
                  background: 'var(--bg-base)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-11 rounded-[var(--radius-md)] text-sm border outline-none transition-all"
                  style={{
                    background: 'var(--bg-base)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Recordarme</span>
              </label>
              <Link
                to="/recuperar-password"
                className="text-sm font-medium hover:underline"
                style={{ color: 'var(--brand-primary)' }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full" loading={loading}>
              Iniciar sesión
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>o continúa con</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => toast.info('Login con Google no disponible en demo')}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-[var(--radius-md)] border text-sm font-medium transition-all hover:bg-[var(--bg-subtle)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <Globe size={18} className="text-[#4285F4]" />
              Continuar con Google
            </button>

            {role === 'empresa' && (
              <button
                type="button"
                onClick={() => toast.info('Login con Microsoft no disponible en demo')}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-[var(--radius-md)] border text-sm font-medium transition-all hover:bg-[var(--bg-subtle)]"
                style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                <Monitor size={18} className="text-[#00A4EF]" />
                Continuar con Microsoft
              </button>
            )}
          </div>

          {/* Separator */}
          <div className="h-px my-5" style={{ background: 'var(--border)' }} />

          <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="font-semibold hover:underline" style={{ color: 'var(--brand-primary)' }}>
              Crear cuenta gratis
            </Link>
          </p>
        </Card>

        {/* Demo buttons */}
        <div className="mt-5 space-y-3">
          <p className="text-center text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
            ACCESO RÁPIDO DE DEMO
          </p>
          <button
            onClick={handleDemoEmpresa}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-md)] font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--brand-primary)', color: 'white' }}
          >
            ▶ Probar como empresa (demo)
          </button>
          <button
            onClick={handleDemoEstudiante}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-md)] font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--brand-accent)', color: 'var(--text-primary)' }}
          >
            ▶ Probar como estudiante (demo)
          </button>
        </div>
      </div>
    </div>
  )
}
