import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

export default function EstudianteConfiguracion() {
  const [deleteText, setDeleteText] = useState('')
  const inputCls = 'w-full px-3 py-2.5 rounded-[var(--radius-md)] text-sm outline-none'
  const inputSty = { background: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--text-primary)' }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Ajustes de cuenta</h1>
      <Tabs.Root defaultValue="cuenta">
        <Tabs.List className="flex gap-1 mb-8 p-1 rounded-[var(--radius-md)] w-fit flex-wrap" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          {['cuenta', 'notificaciones', 'privacidad', 'eliminar'].map(t => (
            <Tabs.Trigger key={t} value={t}
              className="px-3 py-2 rounded-[var(--radius-sm)] text-sm font-medium capitalize transition-all data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--on-primary)]"
              style={{ color: 'var(--text-secondary)' }}>
              {t === 'eliminar' ? 'Eliminar cuenta' : t.charAt(0).toUpperCase() + t.slice(1)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="cuenta">
          <div className="space-y-4">
            {[['Email', 'lucia@demo.com'], ['Teléfono', '612 345 678'], ['Ciudad', 'Madrid']].map(([label, val]) => (
              <div key={label}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>{label}</label>
                <input className={inputCls} style={inputSty} defaultValue={val} />
              </div>
            ))}
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Nueva contraseña</label>
              <input type="password" className={inputCls} style={inputSty} placeholder="Deja en blanco para no cambiar" /></div>
            <Button onClick={() => toast.success('Cuenta actualizada correctamente.')}>Guardar cambios</Button>
          </div>
        </Tabs.Content>

        <Tabs.Content value="notificaciones">
          <div className="space-y-3">
            {['Nuevo turno disponible (match alto)', 'Turno confirmado', 'Pago recibido', 'Valoración recibida', 'Nuevo badge desbloqueado', 'Recordatorio de turno (1h antes)'].map(label => (
              <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
                <button className="w-10 h-6 rounded-full relative" style={{ background: 'var(--brand-primary)' }}>
                  <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="privacidad">
          <div className="space-y-3">
            {['Mi perfil es visible para empresas', 'Mostrar mi disponibilidad en el mapa', 'Permitir contacto directo de empresas', 'Aparecer en el ranking de embajadores'].map(label => (
              <div key={label} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{label}</span>
                <button className="w-10 h-6 rounded-full relative" style={{ background: 'var(--brand-primary)' }}>
                  <span className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="eliminar">
          <div className="p-5 rounded-[var(--radius-lg)]" style={{ border: '1px solid var(--danger)', background: '#FEF2F2' }}>
            <h2 className="font-bold mb-2" style={{ color: '#991B1B' }}>Zona de peligro</h2>
            <p className="text-sm mb-4" style={{ color: '#7F1D1D' }}>Esta acción es definitiva. Se borrarán tus turnos, valoraciones y badges. No podemos recuperarlos. Escribe <strong>ELIMINAR</strong> para confirmar.</p>
            <input value={deleteText} onChange={e => setDeleteText(e.target.value)} placeholder="Escribe ELIMINAR"
              className={inputCls} style={{ ...inputSty, marginBottom: 12 }} />
            <button disabled={deleteText !== 'ELIMINAR'} onClick={() => toast.error('Cuenta eliminada. Hasta pronto.')}
              className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium text-white disabled:opacity-40"
              style={{ background: 'var(--danger)' }}>
              Eliminar mi cuenta definitivamente
            </button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
