import { useState, useRef, useEffect } from 'react'
import { Send, ArrowLeft, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { conversaciones } from '@/mocks/mensajes'
import { AvatarCircle } from '@/components/AvatarCircle'

function formatTime(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffH = diffMs / (1000 * 60 * 60)
  if (diffH < 1) {
    const m = Math.round(diffMs / 60000)
    return `hace ${m}m`
  }
  if (diffH < 24) return `hace ${Math.round(diffH)}h`
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export default function Mensajes() {
  const [activeId, setActiveId] = useState<string | null>(conversaciones[0]?.id ?? null)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [localMessages, setLocalMessages] = useState<
    Record<string, { id: string; autorId: string; autorNombre: string; autorRol: 'empresa' | 'estudiante'; contenido: string; timestamp: string; leido: boolean; tipo: 'texto' }[]>
  >({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showList, setShowList] = useState(true)

  const activeConv = conversaciones.find((c) => c.id === activeId)
  const allMessages = activeId
    ? [...(activeConv?.mensajes ?? []), ...(localMessages[activeId] ?? [])]
    : []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages.length, activeId])

  const sendMessage = () => {
    if (!input.trim() || !activeId) return
    const msg = {
      id: `local-${Date.now()}`,
      autorId: 'emp-current',
      autorNombre: 'Restaurante Casa Pepe',
      autorRol: 'empresa' as const,
      contenido: input.trim(),
      timestamp: new Date().toISOString(),
      leido: false,
      tipo: 'texto' as const,
    }
    setLocalMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), msg],
    }))
    setInput('')
    // Simulate typing indicator
    setTyping(true)
    setTimeout(() => setTyping(false), 2500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Conversation list */}
      <div
        className={`w-full sm:w-80 shrink-0 flex flex-col border-r border-[var(--border)] ${!showList && activeId ? 'hidden sm:flex' : 'flex'}`}
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div className="p-4 border-b border-[var(--border)]">
          <h1 className="text-lg font-bold text-[var(--text-primary)]">Mensajes</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversaciones.map((conv) => {
            const isActive = conv.id === activeId
            return (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveId(conv.id)
                  setShowList(false)
                }}
                className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-[var(--bg-subtle)] transition-colors border-b border-[var(--border)]"
                style={{
                  backgroundColor: isActive ? 'var(--bg-subtle)' : 'transparent',
                  borderLeftWidth: isActive ? 3 : 0,
                  borderLeftColor: 'var(--brand-primary)',
                  borderLeftStyle: 'solid',
                }}
              >
                <AvatarCircle name={conv.estudianteNombre} size={42} online />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      {conv.estudianteNombre}
                    </p>
                    <span className="text-[10px] text-[var(--text-secondary)] shrink-0 ml-1">
                      {formatTime(conv.ultimaActividad)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] truncate mt-0.5">
                    {conv.ultimoMensaje}
                  </p>
                  {conv.turnoTitulo && (
                    <p className="text-[10px] text-[var(--brand-primary)] truncate mt-0.5">
                      {conv.turnoTitulo}
                    </p>
                  )}
                </div>
                {conv.noLeidos > 0 && (
                  <span
                    className="shrink-0 w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    {conv.noLeidos}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Chat panel */}
      {activeConv ? (
        <div
          className={`flex-1 flex flex-col ${showList ? 'hidden sm:flex' : 'flex'}`}
          style={{ backgroundColor: 'var(--bg-subtle)' }}
        >
          {/* Chat header */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]"
            style={{ backgroundColor: 'var(--bg-base)' }}
          >
            <button
              onClick={() => setShowList(true)}
              className="sm:hidden p-1.5 rounded-[var(--radius-md)] hover:bg-[var(--bg-muted)]"
            >
              <ArrowLeft size={18} style={{ color: 'var(--text-secondary)' }} />
            </button>
            <AvatarCircle name={activeConv.estudianteNombre} size={40} online />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text-primary)] text-sm">
                {activeConv.estudianteNombre}
              </p>
              <p className="text-xs" style={{ color: 'var(--success)' }}>
                En línea
              </p>
            </div>
            <Link
              to={`/empresa/candidatos/${activeConv.estudianteId}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
            >
              <Eye size={13} />
              Ver perfil
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {allMessages.map((msg) => {
              const isMine = msg.autorRol === 'empresa'
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  {!isMine && (
                    <AvatarCircle name={msg.autorNombre} size={28} />
                  )}
                  <div
                    className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={{
                      backgroundColor: isMine ? 'var(--brand-primary)' : 'var(--bg-base)',
                      color: isMine ? 'white' : 'var(--text-primary)',
                      marginLeft: isMine ? 0 : 8,
                      marginRight: isMine ? 0 : 0,
                      borderBottomRightRadius: isMine ? 4 : 16,
                      borderBottomLeftRadius: isMine ? 16 : 4,
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    {msg.contenido}
                    <p
                      className="text-[10px] mt-1 opacity-70 text-right"
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })}
            {typing && (
              <div className="flex justify-start">
                <AvatarCircle name={activeConv.estudianteNombre} size={28} />
                <div
                  className="ml-2 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
                  style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: 'var(--text-secondary)',
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="p-4 border-t border-[var(--border)]"
            style={{ backgroundColor: 'var(--bg-base)' }}
          >
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe un mensaje..."
                rows={1}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] resize-none"
                style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-3 rounded-[var(--radius-md)] text-white transition-opacity disabled:opacity-40"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5">
              Pulsa Enter para enviar · Shift+Enter para nueva línea
            </p>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 items-center justify-center flex-col gap-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-muted)' }}
          >
            <Send size={24} style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <p className="text-[var(--text-secondary)] text-sm">
            Selecciona una conversación para empezar
          </p>
        </div>
      )}
    </div>
  )
}
