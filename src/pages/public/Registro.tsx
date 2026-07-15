import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, GraduationCap, ArrowRight } from 'lucide-react'

export default function Registro() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: 'var(--bg-subtle)' }}
    >
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <div
            className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center font-bold text-white text-lg"
            style={{ background: 'var(--brand-primary)' }}
          >
            S
          </div>
          <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>STUGO</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Crea tu cuenta en STUGO
        </h1>
        <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
          ¿Cómo quieres usar STUGO?
        </p>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* EMPRESA */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
            <Link
              to="/registro/empresa"
              className="flex flex-col items-center text-center p-8 rounded-[var(--radius-lg)] border transition-all duration-200 group block"
              style={{
                background: 'var(--bg-base)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(14,15,18,0.1)' }}
              >
                <Building2 size={40} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Soy empresa
              </h2>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Encuentro personal verificado para mis turnos en minutos. Sin agencias, sin papeleo.
              </p>
              <div
                className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                style={{ color: 'var(--brand-primary)' }}
              >
                Empezar como empresa <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>

          {/* ESTUDIANTE */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
            <Link
              to="/registro/estudiante"
              className="flex flex-col items-center text-center p-8 rounded-[var(--radius-lg)] border transition-all duration-200 group block"
              style={{
                background: 'var(--bg-base)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(214,248,74,0.15)' }}
              >
                <GraduationCap size={40} style={{ color: '#B8860B' }} />
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Soy estudiante
              </h2>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Gano dinero compatible con mis clases y cobro en 24 horas. Sin CV, sin entrevistas.
              </p>
              <div
                className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                style={{ color: '#B8860B' }}
              >
                Empezar como estudiante <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>

        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--brand-primary)' }}>
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
