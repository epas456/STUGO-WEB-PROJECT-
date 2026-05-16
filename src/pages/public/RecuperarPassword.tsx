import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function RecuperarPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
    toast.success('Instrucciones enviadas si el email está registrado.')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#EEF2FF' }}>
            <Mail size={26} style={{ color: 'var(--brand-primary)' }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Recuperar contraseña</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Escribe tu email y te enviaremos las instrucciones para restablecerla.
          </p>
        </div>

        {sent ? (
          <div className="text-center p-6 rounded-[var(--radius-lg)]" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <p className="text-sm font-medium mb-1" style={{ color: '#166534' }}>¡Listo!</p>
            <p className="text-sm" style={{ color: '#166534' }}>
              Si ese email está registrado en STUGO, recibirás las instrucciones en menos de 5 minutos. Revisa también tu carpeta de spam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-3 py-2.5 rounded-[var(--radius-md)] text-sm outline-none"
                style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
            </div>
            <Button type="submit" loading={loading} className="w-full">Enviar instrucciones</Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={14} /> Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
