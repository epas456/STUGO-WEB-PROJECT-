import { Link } from 'react-router-dom'
export default function Academy() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Academia STUGO</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Recursos y cursos para sacar el máximo partido a la plataforma.</p>
      <div className="mt-8"><Link to="/registro"><button className="px-6 py-3 rounded-[var(--radius-md)] font-medium text-white" style={{ background: 'var(--brand-primary)' }}>Crear cuenta gratis</button></Link></div>
    </div>
  )
}
