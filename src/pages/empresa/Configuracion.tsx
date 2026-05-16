import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Copy, Eye, EyeOff } from 'lucide-react'

export default function EmpresaConfiguracion() {
  const [showKey, setShowKey] = useState(false)
  const apiKey = 'sk_stugo_live_a1b2c3d4e5f6789012345678'
  const inputCls = 'w-full px-3 py-2.5 rounded-[var(--radius-md)] text-sm outline-none'
  const inputSty = { background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Ajustes de empresa</h1>
      <Tabs.Root defaultValue="perfil">
        <Tabs.List className="flex gap-1 mb-8 p-1 rounded-[var(--radius-md)] w-fit" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          {['perfil', 'notificaciones', 'integraciones', 'seguridad', 'api'].map(t => (
            <Tabs.Trigger key={t} value={t}
              className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium capitalize transition-all data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-white"
              style={{ color: 'var(--text-secondary)' }}>
              {t === 'api' ? 'API' : t.charAt(0).toUpperCase() + t.slice(1)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="perfil">
          <div className="space-y-4">
            {[['Razón social', 'Restaurante Casa Pepe SL'], ['CIF', 'B87654321'], ['Sector', 'Hostelería'], ['Web', 'https://casapepe.es']].map(([label, val]) => (
              <div key={label}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>{label}</label>
                <input className={inputCls} style={inputSty} defaultValue={val} />
              </div>
            ))}
            <Button onClick={() => toast.success('Perfil actualizado correctamente.')}>Guardar cambios</Button>
          </div>
        </Tabs.Content>

        <Tabs.Content value="notificaciones">
          <div className="space-y-4">
            {['Nuevo candidato para un turno', 'Turno cubierto', 'Valoración recibida', 'Recordatorio de turno (24h antes)', 'Novedades de la plataforma'].map(label => (
              <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
                <button className="w-10 h-6 rounded-full relative transition-colors" style={{ background: 'var(--brand-primary)' }}>
                  <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="integraciones">
          <div className="space-y-4">
            {[['Slack', 'Recibe notificaciones en tu canal'], ['Google Calendar', 'Sincroniza turnos con tu calendario'], ['Microsoft Teams', 'Notificaciones en Teams']].map(([name, desc]) => (
              <div key={name} className="flex items-center justify-between p-4 rounded-[var(--radius-lg)]" style={{ border: '1px solid var(--border)' }}>
                <div>
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{desc}</div>
                </div>
                <button className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  Próximamente
                </button>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="seguridad">
          <div className="space-y-5">
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Cambiar contraseña</h2>
            {['Contraseña actual', 'Nueva contraseña', 'Confirmar contraseña'].map(label => (
              <div key={label}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>{label}</label>
                <input type="password" className={inputCls} style={inputSty} placeholder="••••••••" />
              </div>
            ))}
            <Button onClick={() => toast.success('Contraseña actualizada.')}>Actualizar contraseña</Button>
          </div>
        </Tabs.Content>

        <Tabs.Content value="api">
          <div className="space-y-4">
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Clave de API</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Usa esta clave para integrar STUGO en tus sistemas. Trátala como una contraseña.</p>
            <div className="flex items-center gap-2">
              <input readOnly value={showKey ? apiKey : '•'.repeat(apiKey.length)} className={`${inputCls} font-mono text-xs flex-1`} style={inputSty} />
              <button onClick={() => setShowKey(s => !s)} className="p-2.5 rounded-[var(--radius-md)]" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button onClick={() => { navigator.clipboard.writeText(apiKey); toast.success('Clave copiada.') }}
                className="p-2.5 rounded-[var(--radius-md)]" style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <Copy size={16} />
              </button>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
