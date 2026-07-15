import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, GraduationCap, CheckCircle2, ArrowRight, Shield, Zap, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

type Audience = 'empresa' | 'estudiante'

const empresaSteps = [
  {
    n: 1,
    title: 'Crea tu cuenta de empresa',
    desc: 'Rellena el formulario con los datos de tu empresa (CIF, sector, dirección). El proceso tarda menos de 10 minutos. Recibirás una llamada de bienvenida de nuestro equipo.',
    icon: <Building2 size={28} />,
    detail: 'Verificamos tu CIF en el registro mercantil y validamos la identidad del representante legal.',
  },
  {
    n: 2,
    title: 'Completa tu perfil de empresa',
    desc: 'Añade una foto de perfil, descripción del negocio, ubicación exacta y tus datos de contacto. Un perfil completo atrae hasta un 60% más de candidatos.',
    icon: <Users size={28} />,
    detail: 'Puedes añadir múltiples ubicaciones si tienes varios establecimientos.',
  },
  {
    n: 3,
    title: 'Publica tu primer turno',
    desc: 'Define el puesto, fecha, horario, salario por hora y requisitos específicos. Puedes ser todo lo preciso que necesites: idiomas, experiencia mínima, código de vestimenta.',
    icon: <Zap size={28} />,
    detail: 'Los turnos se publican al instante. Sin revisión manual.',
  },
  {
    n: 4,
    title: 'Recibe candidatos con match alto',
    desc: 'En minutos recibirás perfiles ordenados por compatibilidad. Cada candidato incluye foto, historial de turnos, valoraciones reales y match score calculado por nuestro algoritmo.',
    icon: <CheckCircle2 size={28} />,
    detail: 'Puedes ver toda la información antes de aceptar. No hay sorpresas.',
  },
  {
    n: 5,
    title: 'Selecciona y confirma',
    desc: 'Acepta el candidato con un toque. El estudiante recibe notificación inmediata y puede confirmar su asistencia. El chat queda abierto para coordinación de último momento.',
    icon: <Shield size={28} />,
    detail: 'Si el candidato no puede confirmar, el sistema activa la lista de espera automáticamente.',
  },
  {
    n: 6,
    title: 'El turno se realiza',
    desc: 'El día del turno, ambas partes verifican la asistencia en la app. Si hay un no-show, reportalo antes de 2 horas para activar el protocolo de contingencia.',
    icon: <ArrowRight size={28} />,
    detail: 'STUGO monitoriza en tiempo real y está disponible por WhatsApp para cualquier incidencia.',
  },
  {
    n: 7,
    title: 'Valora y paga',
    desc: 'Al terminar el turno, valora al trabajador (1-5 estrellas en varios criterios). El pago se procesa automáticamente y recibirás factura consolidada cada viernes.',
    icon: <CheckCircle2 size={28} />,
    detail: 'Las valoraciones son públicas y contribuyen a la reputación bidireccional del ecosistema.',
  },
]

const estudianteSteps = [
  {
    n: 1,
    title: 'Crea tu perfil gratuito',
    desc: 'Regístrate con tu email o Google. Indica tu nombre, fecha de nacimiento y universidad o centro de estudios. El registro base tarda menos de 2 minutos.',
    icon: <GraduationCap size={28} />,
    detail: '100% gratuito. Sin tarjeta de crédito. Sin cuotas.',
  },
  {
    n: 2,
    title: 'Verifica tu identidad',
    desc: 'Sube una foto de tu DNI o NIE por ambas caras y hazte un selfie. Nuestro sistema lo verifica automáticamente en menos de 2 horas. Solo se hace una vez.',
    icon: <Shield size={28} />,
    detail: 'Tu documentación se almacena cifrada (AES-256) y nunca se comparte con empresas sin tu consentimiento.',
  },
  {
    n: 3,
    title: 'Rellena tu disponibilidad',
    desc: 'Indica qué días y franjas horarias tienes disponibles. Puedes ser muy específico (ej: "solo sábados y domingos de mañana durante el curso") o general.',
    icon: <CheckCircle2 size={28} />,
    detail: 'Puedes cambiar tu disponibilidad en cualquier momento desde el panel.',
  },
  {
    n: 4,
    title: 'Elige tus sectores',
    desc: 'Selecciona los sectores donde tienes experiencia o interés: hostelería, retail, eventos, logística... Cuantos más sectores, más oportunidades verás.',
    icon: <Zap size={28} />,
    detail: 'Puedes añadir experiencia previa para subir tu match score inicial.',
  },
  {
    n: 5,
    title: 'Encuentra tu turno',
    desc: 'Explora el feed de turnos o deja que el algoritmo te los traiga. Cada oferta muestra salario, empresa, valoraciones, ubicación exacta y distancia desde donde estás.',
    icon: <ArrowRight size={28} />,
    detail: 'Activa las notificaciones push para recibir alertas de turnos urgentes con bonus.',
  },
  {
    n: 6,
    title: 'Aplica y espera confirmación',
    desc: 'Con un toque aplicas. La empresa revisará tu perfil y te confirmará (normalmente en menos de 24 horas). Recibirás SMS y push cuando seas aceptado.',
    icon: <Users size={28} />,
    detail: 'Puedes aplicar a varios turnos a la vez. Solo podrás confirmar uno si se solapan.',
  },
  {
    n: 7,
    title: 'Trabaja y cobra en menos de 24 h',
    desc: 'Aparece a tiempo, haz un buen trabajo y marca el turno como completado en la app. El dinero llegará a tu cuenta antes de 24 horas. Recuerda valorar a la empresa.',
    icon: <CheckCircle2 size={28} />,
    detail: 'Cada turno bien valorado aumenta tu match score y tu visibilidad para futuras ofertas.',
  },
]

export default function ComoFunciona() {
  const [audience, setAudience] = useState<Audience>('estudiante')
  const steps = audience === 'empresa' ? empresaSteps : estudianteSteps

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="py-20 text-center px-4" style={{ background: 'linear-gradient(180deg, rgba(14,15,18,0.05) 0%, transparent 100%)' }}>
        <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand-primary)' }}>
          Guía paso a paso
        </span>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Cómo funciona STUGO</h1>
        <p className="text-xl max-w-xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
          Un proceso diseñado para ser simple, transparente y efectivo desde el primer día.
        </p>

        {/* Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 gap-1" style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            {(['estudiante', 'empresa'] as Audience[]).map((a) => (
              <button
                key={a}
                onClick={() => setAudience(a)}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200"
                style={{
                  borderRadius: 'var(--radius-md)',
                  background: audience === a ? 'var(--brand-primary)' : 'transparent',
                  color: audience === a ? '#fff' : 'var(--text-secondary)',
                  boxShadow: audience === a ? 'var(--shadow-md)' : 'none',
                }}
              >
                {a === 'empresa' ? <Building2 size={18} /> : <GraduationCap size={18} />}
                {a === 'empresa' ? 'Soy empresa' : 'Soy estudiante'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={audience}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
                style={{ background: 'linear-gradient(to bottom, var(--brand-primary), transparent)', opacity: 0.2 }} />

              <div className="space-y-8">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    className="flex gap-6"
                  >
                    {/* Number bubble */}
                    <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg"
                      style={{ background: 'var(--brand-primary)' }}>
                      {step.n}
                    </div>

                    {/* Content */}
                    <Card hover className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
                          style={{ background: 'rgba(14,15,18,0.1)', color: 'var(--brand-primary)' }}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                          <div className="flex items-start gap-2 p-3 rounded-[var(--radius-sm)]"
                            style={{ background: 'rgba(14,15,18,0.04)', border: '1px solid rgba(14,15,18,0.1)' }}>
                            <span className="text-xs" style={{ color: 'var(--brand-primary)' }}></span>
                            <p className="text-xs" style={{ color: 'var(--brand-primary)' }}>{step.detail}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Under the hood section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: 'var(--text-primary)' }}>
            Bajo el capó: nuestro modelo
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--text-secondary)' }}>
            Cómo funciona legalmente la relación laboral
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card padding="lg">
              <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Modelo ETT partner</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                STUGO es la capa de software, marketing y matching. El empleador legal de cada turno es una ETT partner
                autorizada conforme a la Ley 14/1994: la empresa firma con ella el contrato de puesta a disposición y el
                estudiante firma su contrato laboral. La ETT gestiona el alta en Seguridad Social, la nómina, las
                retenciones y la PRL. STUGO orquesta; la ETT ejecuta.
              </p>
              <div className="mt-4 p-3 rounded-[var(--radius-md)]" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <p className="text-xs font-medium" style={{ color: '#059669' }}>
                  Contrato real y cotización a la Seguridad Social desde el primer minuto
                </p>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Lo que no vas a encontrar aquí</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Ni falsos autónomos, ni trabajo en negro, ni cesión ilegal de trabajadores. Todos los turnos de STUGO
                pasan por una ETT autorizada, sin excepciones. Es más lento de montar, pero es la única forma de que un
                turno de 4 horas tenga la misma protección legal que un contrato indefinido.
              </p>
              <div className="mt-4 p-3 rounded-[var(--radius-md)]" style={{ background: 'rgba(214,248,74,0.14)', border: '1px solid var(--brand-accent)' }}>
                <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                  Cada oferta indica la ETT que actúa como empleador legal
                </p>
              </div>
            </Card>
          </div>

          <Card padding="lg" className="mt-6">
            <h3 className="font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Nuestro algoritmo de matching</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              El match score que ves en cada oferta es el resultado de analizar más de 40 variables en tiempo real.
              No es un simple filtro de keywords: es un modelo de machine learning entrenado con más de 50.000 turnos completados
              en España que predice la probabilidad de éxito de cada combinación empresa-estudiante.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Sector y experiencia', value: '25%' },
                { label: 'Valoración histórica', value: '20%' },
                { label: 'Fiabilidad y asistencia', value: '20%' },
                { label: 'Disponibilidad + ubicación', value: '35%' },
              ].map((v) => (
                <div key={v.label} className="text-center p-3 rounded-[var(--radius-md)]"
                  style={{ background: 'var(--bg-subtle)' }}>
                  <p className="text-xl font-black mb-1" style={{ color: 'var(--brand-primary)' }}>{v.value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{v.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            ¿Listo para empezar?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registro">
              <Button size="lg">
                Registrarme como estudiante <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/empresa/registro">
              <Button variant="outline" size="lg">
                Publicar turno como empresa
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
