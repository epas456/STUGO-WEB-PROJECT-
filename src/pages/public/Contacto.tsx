import { useState } from 'react'
import { MapPin, Mail, Phone, Clock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '', motivo: 'soporte', mensaje: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    toast.success('Mensaje enviado. Te responderemos en menos de 4 horas laborables.')
    setForm({ nombre: '', email: '', empresa: '', motivo: 'soporte', mensaje: '' })
  }

  const inputCls = 'w-full px-3 py-2.5 rounded-[var(--radius-md)] text-sm outline-none transition-all'
  const inputStyle = { background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Contáctanos</h1>
        <p style={{ color: 'var(--text-secondary)' }}>¿Tienes dudas? Estamos aquí para ayudarte.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Nombre *</label>
              <input className={inputCls} style={inputStyle} required value={form.nombre}
                onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Email *</label>
              <input className={inputCls} style={inputStyle} type="email" required value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="tu@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Empresa (opcional)</label>
            <input className={inputCls} style={inputStyle} value={form.empresa}
              onChange={e => setForm(p => ({ ...p, empresa: e.target.value }))} placeholder="Nombre de tu empresa" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Motivo *</label>
            <select className={inputCls} style={inputStyle} value={form.motivo}
              onChange={e => setForm(p => ({ ...p, motivo: e.target.value }))}>
              <option value="soporte">Soporte técnico</option>
              <option value="comercial">Información comercial</option>
              <option value="prensa">Prensa y medios</option>
              <option value="inversores">Inversores</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Mensaje *</label>
            <textarea className={inputCls} style={{ ...inputStyle, resize: 'vertical' }} rows={5} required value={form.mensaje}
              onChange={e => setForm(p => ({ ...p, mensaje: e.target.value }))} placeholder="Cuéntanos en qué podemos ayudarte..." />
          </div>
          <Button type="submit" loading={loading} size="lg" className="w-full">
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
          <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>Respondemos en menos de 4 horas laborables (L-V 9:00-18:00).</p>
        </form>

        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <h2 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Información de contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Dirección</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Calle Gran Vía 31, 28013 Madrid</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Email</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>hola@stugo.es</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Teléfono</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>91 123 45 67</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Horario</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Lunes a Viernes · 9:00-18:00</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-[var(--radius-lg)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Síguenos</h3>
            <div className="flex gap-3">
              {[{ label: 'LinkedIn', href: 'https://linkedin.com/company/stugo' }, { label: 'Instagram', href: 'https://instagram.com/stugo_es' }, { label: 'TikTok', href: 'https://tiktok.com/@stugo_es' }, { label: 'X', href: 'https://x.com/stugo_es' }].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-sm)] text-xs transition-colors hover:bg-[var(--bg-muted)]"
                  style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
                  <ExternalLink size={12} /> {label}
                </a>
              ))}
            </div>
          </div>
          {/* Map placeholder */}
          <div className="rounded-[var(--radius-lg)] flex items-center justify-center" style={{ height: 160, background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
            <div className="text-center">
              <MapPin size={28} style={{ color: 'var(--brand-primary)', margin: '0 auto 8px' }} />
              <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Gran Vía 31, Madrid</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
