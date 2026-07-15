import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, ChevronRight, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'bot' | 'user'
  content: string
  options?: string[]
  timestamp: Date
}

interface Flow {
  trigger: string[]
  response: string
  options?: string[]
}

const flows: Flow[] = [
  {
    trigger: ['hola', 'buenas', 'hello', 'hi', 'hey', 'buenos días', 'buenas tardes'],
    response: '¡Hola! Soy el asistente virtual de STUGO. ¿En qué puedo ayudarte hoy?',
    options: ['¿Cómo me registro?', '¿Cómo funciona?', 'Tengo un problema', 'Preguntas sobre pagos', 'Soy empresa', 'Hablar con soporte'],
  },
  {
    trigger: ['cómo me registro', 'registrarse', 'crear cuenta', 'alta', 'registro'],
    response: 'Registrarte en STUGO es gratis y tarda menos de 2 minutos\n\n1. Haz clic en "Empezar gratis"\n2. Elige si eres estudiante o empresa\n3. Introduce tu email y crea contraseña\n4. Verifica tu email\n5. ¡Listo! Completa tu perfil para aparecer ante las empresas.\n\n¿Necesitas ayuda con algún paso concreto?',
    options: ['¿Qué documentos necesito?', '¿Es realmente gratis?', 'Volver al inicio'],
  },
  {
    trigger: ['cómo funciona', 'funcionamiento', 'qué es stugo', 'para qué sirve'],
    response: 'STUGO conecta a estudiantes universitarios con empresas que necesitan personal para turnos flexibles\n\n**Para estudiantes**: crea tu perfil, indica tu disponibilidad y aplica a turnos en hostelería, eventos, retail y más. Cobras en menos de 24 h por transferencia.\n\n**Para empresas**: publica turnos en minutos y recibe candidatos cualificados automáticamente gracias a nuestro algoritmo de matching.\n\n¿Eres estudiante o empresa?',
    options: ['Soy estudiante', 'Soy empresa', '¿Cuánto se gana?', 'Volver al inicio'],
  },
  {
    trigger: ['cuánto se gana', 'salario', 'ingresos', 'dinero', 'sueldo'],
    response: 'Los salarios en STUGO varían según el sector y tipo de trabajo\n\n• **Retail**: 9-10€/h\n• **Hostelería**: 10-14€/h\n• **Eventos/Azafatos**: 10-13€/h\n• **Logística**: 11-13€/h\n• **Marketing/Promotor**: 10-12€/h\n• **Coordinadores/Intérpretes**: 14-20€/h\n\nUn estudiante con disponibilidad de fin de semana puede ganar entre 300€ y 800€/mes. Cobras en menos de 24 h tras completar cada turno.',
    options: ['¿Cuándo cobro?', '¿Hay comisiones?', 'Volver al inicio'],
  },
  {
    trigger: ['cuándo cobro', 'cuándo pagan', 'pago', 'transferencia', 'cobrar'],
    response: 'Cobras en menos de 24 horas\n\nUna vez que completas un turno y la empresa confirma tu asistencia, STUGO adelanta el pago y lo recibes en tu cuenta en menos de 24 horas. La ETT partner emite tu nómina con contrato real y alta en Seguridad Social.\n\nPuedes ver el estado de tus pagos en "Mi Cartera" en tu panel.',
    options: ['Tengo un problema con un pago', 'Volver al inicio'],
  },
  {
    trigger: ['soy empresa', 'contratar', 'empresa', 'publicar turno', 'busco personal'],
    response: 'Perfecto, STUGO es ideal para empresas que necesitan personal flexible\n\n• Publica turnos en menos de 5 minutos\n• Recibe candidatos cualificados en horas\n• Sin permanencia: paga solo por los turnos completados\n• Plan gratuito disponible\n• Soporte dedicado para empresas\n\n¿Quieres más información o registrarte como empresa?',
    options: ['¿Cuánto cuesta para empresas?', '¿Cómo funciona el matching?', 'Quiero registrar mi empresa', 'Volver al inicio'],
  },
  {
    trigger: ['cuánto cuesta para empresas', 'comisión empresa', 'precio empresa', 'planes'],
    response: 'STUGO ofrece tres planes para empresas\n\n**Gratuito**: hasta 3 turnos simultáneos, comisión 20%\n\n**Pro (49€/mes)**: hasta 20 turnos, comisión 17%, equipos favoritos\n\n**Enterprise**: turnos ilimitados, comisión desde 15%, API, gestor dedicado\n\nLa comisión se aplica sobre el salario bruto del turno completado.',
    options: ['Quiero el Plan Pro', 'Hablar con ventas', 'Volver al inicio'],
  },
  {
    trigger: ['tengo un problema', 'problema', 'error', 'fallo', 'no funciona', 'issue'],
    response: 'Lo siento, estoy aquí para ayudarte a resolver el problema\n\n¿De qué tipo de problema se trata?',
    options: ['Problema con un pago', 'No puedo iniciar sesión', 'Un turno con incidencias', 'Problema técnico', 'Otro problema'],
  },
  {
    trigger: ['problema con un pago', 'pago pendiente', 'no he cobrado'],
    response: 'Para problemas de pago, sigue estos pasos:\n\n1. Ve a **Mi Cartera → Historial**\n2. Localiza el turno con el problema\n3. Haz clic en "Reportar problema de pago"\n4. El equipo de pagos responde en 48-72h laborables\n\nSi es urgente, escríbenos a pagos@stugo.es con el ID del turno.',
    options: ['Hablar con soporte', 'Volver al inicio'],
  },
  {
    trigger: ['hablar con soporte', 'hablar con persona', 'agente humano', 'persona real'],
    response: 'Puedo conectarte con nuestro equipo de soporte humano ‍\n\n**Chat en vivo**: disponible L-V 9h-20h y sábados 10h-14h\n\n**Email**: hola@stugo.es (respuesta en <24h laborables)\n\n**Teléfono**: 900 123 456 (gratuito, L-V 9h-18h)\n\n¿Quieres que abra el chat en vivo para ti?',
    options: ['Sí, abrir chat en vivo', 'Volver al inicio'],
  },
  {
    trigger: ['soy estudiante', 'busco trabajo', 'busco turnos'],
    response: '¡Genial! STUGO es perfecto para estudiantes\n\nPuedes encontrar trabajo en hostelería, eventos, retail, logística y mucho más. Los turnos se adaptan a tu horario de estudios.\n\n¿Ya tienes cuenta en STUGO?',
    options: ['No tengo cuenta, quiero registrarme', 'Ya tengo cuenta, necesito ayuda', 'Volver al inicio'],
  },
]

const defaultMessage: Message = {
  id: 'welcome',
  role: 'bot',
  content: '¡Hola! Soy el asistente de STUGO. ¿En qué puedo ayudarte?',
  options: ['¿Cómo me registro?', '¿Cómo funciona?', 'Tengo un problema', 'Preguntas sobre pagos', 'Soy empresa', 'Hablar con soporte'],
  timestamp: new Date(),
}

function findResponse(input: string): Flow | null {
  const normalized = input.toLowerCase().trim()
  return flows.find((flow) =>
    flow.trigger.some((t) => normalized.includes(t) || t.includes(normalized))
  ) || null
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([defaultMessage])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const flow = findResponse(text)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: flow
          ? flow.response
          : 'No he entendido bien tu pregunta. Te recomiendo contactar con nuestro equipo de soporte en hola@stugo.es o por el chat en vivo para una respuesta más personalizada.',
        options: flow?.options || ['Hablar con soporte', 'Volver al inicio'],
        timestamp: new Date(),
      }
      setIsTyping(false)
      setMessages((prev) => [...prev, botMsg])
    }, 800)
  }

  const handleReset = () => {
    setMessages([defaultMessage])
    setInput('')
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[var(--brand-primary)] text-[var(--on-primary)] rounded-full shadow-[var(--shadow-lg)] flex items-center justify-center hover:bg-[var(--brand-primary-hover)] transition-colors"
            aria-label="Abrir chat de soporte"
          >
            <MessageSquare size={22} />
            {/* Notification dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--brand-accent)] rounded-full flex items-center justify-center text-[9px] font-bold text-[#0E0F12]">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px] max-h-[560px] flex flex-col bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--brand-primary)] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">Asistente STUGO</p>
                <p className="text-[11px] text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                  Online ahora
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex gap-2', msg.role === 'user' && 'flex-row-reverse')}
                >
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 bg-[var(--brand-primary)] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={13} className="text-white" />
                    </div>
                  )}
                  <div className={cn('max-w-[85%] space-y-2', msg.role === 'user' && 'items-end')}>
                    <div
                      className={cn(
 'px-3.5 py-2.5 rounded-[var(--radius-lg)] text-sm leading-relaxed',
                        msg.role === 'bot'
                          ? 'bg-[var(--bg-subtle)] text-[var(--text-primary)] rounded-tl-[var(--radius-xs)]'
                          : 'bg-[var(--brand-primary)] text-[var(--on-primary)] rounded-tr-[var(--radius-xs)]'
                      )}
                    >
                      {msg.content.split('\n').map((line, i) => (
                        <span key={i}>
                          {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                          {i < msg.content.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                    {msg.options && (
                      <div className="flex flex-col gap-1.5">
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              if (opt === 'Volver al inicio') {
                                handleReset()
                              } else {
                                sendMessage(opt)
                              }
                            }}
                            className="flex items-center gap-2 text-left px-3 py-2 rounded-[var(--radius-md)] text-xs border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-[var(--on-primary)] transition-all duration-150 bg-white"
                          >
                            <ChevronRight size={12} className="shrink-0" />
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-[var(--brand-primary)] rounded-full flex items-center justify-center shrink-0">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-[var(--bg-subtle)] px-3.5 py-3 rounded-[var(--radius-lg)] rounded-tl-[var(--radius-xs)] flex gap-1 items-center">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full"
                        style={{ animation: `pulse 1.2s ease-in-out ${delay}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[var(--border)] p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 h-9 px-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--brand-primary)] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-[var(--brand-primary)] text-[var(--on-primary)] rounded-[var(--radius-md)] flex items-center justify-center hover:bg-[var(--brand-primary-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <Send size={15} />
                </button>
              </form>
              <p className="text-center text-[10px] text-[var(--text-tertiary)] mt-2">
                Chatbot automático · Para soporte humano: hola@stugo.es
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
