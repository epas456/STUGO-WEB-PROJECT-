import { Link } from 'react-router-dom'

const cookies = [
  { nombre: 'stugo_session', propietario: 'STUGO', finalidad: 'Mantener la sesión del usuario', duracion: 'Sesión', tipo: 'Necesaria' },
  { nombre: 'csrftoken', propietario: 'STUGO', finalidad: 'Prevención de ataques CSRF', duracion: '1 año', tipo: 'Necesaria' },
  { nombre: 'stugo_theme', propietario: 'STUGO', finalidad: 'Preferencia de modo oscuro/claro', duracion: '1 año', tipo: 'Preferencias' },
  { nombre: 'cookie_consent', propietario: 'STUGO', finalidad: 'Guardar el consentimiento de cookies', duracion: '24 meses', tipo: 'Necesaria' },
  { nombre: '_plausible', propietario: 'Plausible Analytics', finalidad: 'Análisis de uso de la web (sin datos personales)', duracion: '1 año', tipo: 'Analítica' },
  { nombre: '_ga', propietario: 'Google', finalidad: 'Análisis de tráfico web', duracion: '2 años', tipo: 'Analítica' },
  { nombre: '_fbp', propietario: 'Meta (Facebook)', finalidad: 'Publicidad y seguimiento de conversiones', duracion: '3 meses', tipo: 'Marketing' },
  { nombre: '_gcl_au', propietario: 'Google Ads', finalidad: 'Seguimiento de conversiones de anuncios', duracion: '3 meses', tipo: 'Marketing' },
]

const typeBadge: Record<string, string> = {
  Necesaria: '#10B981',
  Preferencias: '#F59E0B',
  Analítica: '#2D5BFF',
  Marketing: '#EF4444',
}

export default function Cookies() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-6 text-sm" style={{ color: 'var(--text-tertiary)' }}>
        <Link to="/" className="hover:underline">Inicio</Link> › <span>Política de cookies</span>
      </div>
      <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Política de Cookies</h1>
      <p className="text-sm mb-12" style={{ color: 'var(--text-tertiary)' }}>Última actualización: 1 de enero de 2026. Conforme a la Guía AEPD de mayo 2024.</p>

      <div className="mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario al visitarlos. Permiten al sitio recordar tus acciones y preferencias durante un período de tiempo.</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Tabla de cookies utilizadas</h2>
        <div className="overflow-x-auto rounded-[var(--radius-lg)]" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--bg-subtle)' }}>
              <tr>
                {['Cookie', 'Propietario', 'Finalidad', 'Duración', 'Tipo'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cookies.map((c, i) => (
                <tr key={i} style={{ borderBottom: i < cookies.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--bg-base)' }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-primary)' }}>{c.nombre}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{c.propietario}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{c.finalidad}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>{c.duracion}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ background: typeBadge[c.tipo] }}>{c.tipo}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-5 rounded-[var(--radius-lg)] mb-8" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
        <h2 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Gestiona tus preferencias</h2>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Puedes cambiar tus preferencias de cookies en cualquier momento. Tu consentimiento tiene una validez de 24 meses.</p>
        <button className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium" style={{ background: 'var(--brand-primary)', color: 'white' }}
          onClick={() => { localStorage.removeItem('stugo-store'); window.location.reload() }}>
          Gestionar mis cookies
        </button>
      </div>

      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Cómo desactivar las cookies en tu navegador</h2>
        <ul className="space-y-1 list-disc list-inside">
          <li><strong>Chrome:</strong> Menú › Configuración › Privacidad y seguridad › Cookies</li>
          <li><strong>Firefox:</strong> Menú › Opciones › Privacidad y seguridad › Cookies y datos del sitio</li>
          <li><strong>Safari:</strong> Preferencias › Privacidad › Cookies y datos del sitio web</li>
          <li><strong>Edge:</strong> Menú › Configuración › Privacidad, búsqueda y servicios</li>
        </ul>
      </div>
    </div>
  )
}
