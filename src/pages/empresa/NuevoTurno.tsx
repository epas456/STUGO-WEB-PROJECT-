import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  RotateCcw,
} from 'lucide-react'

const SECTORES = ['Hostelería', 'Retail', 'Eventos', 'Logística']
const REQUISITOS_OPCIONES = [
  'Experiencia previa',
  'Inglés B2+',
  'Carné de conducir',
  'Certificado manipulador alimentos',
  'Disponibilidad inmediata',
  'Uniforme propio',
  'Vehículo propio',
  'Trabajo en equipo',
]

const ADDRESS_SUGGESTIONS = [
  'Calle Mayor 1, Madrid',
  'Gran Vía 45, Madrid',
  'Paseo de la Castellana 12, Madrid',
  'Calle Serrano 30, Madrid',
  'Avenida de América 10, Madrid',
]

interface StepData {
  sector: string
  puesto: string
  descripcion: string
  fecha: string
  horaInicio: string
  horaFin: string
  recurrente: boolean
  direccion: string
  instrucciones: string
  salarioHora: number
  personas: number
  requisitos: string[]
}

const INITIAL_DATA: StepData = {
  sector: '',
  puesto: '',
  descripcion: '',
  fecha: '',
  horaInicio: '',
  horaFin: '',
  recurrente: false,
  direccion: '',
  instrucciones: '',
  salarioHora: 11,
  personas: 1,
  requisitos: [],
}

const STEPS = [
  { title: 'Sector y puesto', icon: Briefcase },
  { title: 'Cuándo', icon: Calendar },
  { title: 'Dónde', icon: MapPin },
  { title: 'Requisitos y salario', icon: DollarSign },
  { title: 'Revisión', icon: CheckCircle },
]

export default function NuevoTurno() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<StepData>(INITIAL_DATA)
  const [published, setPublished] = useState(false)
  const [addressInput, setAddressInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const update = (field: keyof StepData, value: StepData[keyof StepData]) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleRequisito = (req: string) => {
    setData((prev) => ({
      ...prev,
      requisitos: prev.requisitos.includes(req)
        ? prev.requisitos.filter((r) => r !== req)
        : [...prev.requisitos, req],
    }))
  }

  const handlePublish = () => {
    setPublished(true)
    toast.success('¡Turno publicado con éxito! Ya está recibiendo candidatos.')
  }

  const totalHoras =
    data.horaInicio && data.horaFin
      ? (() => {
          const [h1, m1] = data.horaInicio.split(':').map(Number)
          const [h2, m2] = data.horaFin.split(':').map(Number)
          return Math.max(0, (h2 * 60 + m2 - (h1 * 60 + m1)) / 60)
        })()
      : 0
  const totalCoste = (totalHoras * data.salarioHora * data.personas * 1.015).toFixed(2)

  if (published) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: 'var(--success)', color: 'white' }}
        >
          <CheckCircle size={48} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-[var(--text-primary)] mb-3"
        >
          ¡Turno publicado!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--text-secondary)] max-w-md mb-8"
        >
          Tu turno de <strong>{data.puesto}</strong> ya está visible para los candidatos. Te
          notificaremos cuando lleguen solicitudes.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => {
            setData(INITIAL_DATA)
            setStep(0)
            setPublished(false)
          }}
          className="px-6 py-3 rounded-[var(--radius-md)] font-semibold text-white"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          Publicar otro turno
        </motion.button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Publicar un turno</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Paso {step + 1} de {STEPS.length} · {STEPS[step].title}
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 rounded-full bg-[var(--bg-muted)] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: 'var(--brand-primary)' }}
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const done = i < step
          const active = i === step
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor: done
                    ? 'var(--success)'
                    : active
                      ? 'var(--brand-primary)'
                      : 'var(--bg-muted)',
                  color: done || active ? 'white' : 'var(--text-tertiary)',
                }}
              >
                {done ? <CheckCircle size={16} /> : <Icon size={16} />}
              </div>
              <span className="text-[10px] text-[var(--text-secondary)] hidden sm:block text-center max-w-[60px]">
                {s.title}
              </span>
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <div
        className="rounded-[var(--radius-lg)] border border-[var(--border)] p-6"
        style={{ backgroundColor: 'var(--bg-base)', boxShadow: 'var(--shadow-md)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1: Sector y puesto */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Sector *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SECTORES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update('sector', s)}
                        className="px-4 py-3 rounded-[var(--radius-md)] border text-sm font-medium transition-all text-left"
                        style={{
                          borderColor:
                            data.sector === s ? 'var(--brand-primary)' : 'var(--border)',
                          backgroundColor:
                            data.sector === s ? '#EEF2FF' : 'var(--bg-base)',
                          color:
                            data.sector === s
                              ? 'var(--brand-primary)'
                              : 'var(--text-primary)',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Puesto / Cargo *
                  </label>
                  <input
                    type="text"
                    value={data.puesto}
                    onChange={(e) => update('puesto', e.target.value)}
                    placeholder="Ej: Camarero/a de sala"
                    className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
                    style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Descripción del turno
                  </label>
                  <textarea
                    value={data.descripcion}
                    onChange={(e) => update('descripcion', e.target.value)}
                    placeholder="Describe las tareas, el ambiente de trabajo y cualquier información relevante para el candidato..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] resize-none"
                    style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Cuándo */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    <Calendar size={14} className="inline mr-1" />
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={data.fecha}
                    onChange={(e) => update('fecha', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
                    style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      <Clock size={14} className="inline mr-1" />
                      Hora inicio *
                    </label>
                    <input
                      type="time"
                      value={data.horaInicio}
                      onChange={(e) => update('horaInicio', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
                      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      <Clock size={14} className="inline mr-1" />
                      Hora fin *
                    </label>
                    <input
                      type="time"
                      value={data.horaFin}
                      onChange={(e) => update('horaFin', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
                      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
                {totalHoras > 0 && (
                  <p className="text-sm text-[var(--text-secondary)]">
                    Duración estimada:{' '}
                    <strong className="text-[var(--text-primary)]">{totalHoras}h</strong>
                  </p>
                )}
                <div className="flex items-center justify-between py-3 px-4 rounded-[var(--radius-md)] bg-[var(--bg-subtle)] border border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <RotateCcw size={16} style={{ color: 'var(--text-secondary)' }} />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">Turno recurrente</p>
                      <p className="text-xs text-[var(--text-secondary)]">Se repetirá semanalmente</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => update('recurrente', !data.recurrente)}
                    className="relative w-11 h-6 rounded-full transition-colors"
                    style={{ backgroundColor: data.recurrente ? 'var(--brand-primary)' : 'var(--border)' }}
                  >
                    <span
                      className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                      style={{ transform: data.recurrente ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Dónde */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="relative">
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    <MapPin size={14} className="inline mr-1" />
                    Dirección *
                  </label>
                  <input
                    type="text"
                    value={addressInput || data.direccion}
                    onChange={(e) => {
                      setAddressInput(e.target.value)
                      update('direccion', e.target.value)
                      setShowSuggestions(e.target.value.length > 1)
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder="Busca una dirección..."
                    className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)]"
                    style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
                  />
                  {showSuggestions && (
                    <div
                      className="absolute z-10 w-full mt-1 rounded-[var(--radius-md)] border border-[var(--border)] shadow-lg overflow-hidden"
                      style={{ backgroundColor: 'var(--bg-base)' }}
                    >
                      {ADDRESS_SUGGESTIONS.filter((s) =>
                        s.toLowerCase().includes((addressInput || '').toLowerCase()),
                      ).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onMouseDown={() => {
                            update('direccion', s)
                            setAddressInput(s)
                            setShowSuggestions(false)
                          }}
                          className="w-full px-4 py-2.5 text-sm text-left hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                        >
                          <MapPin size={12} className="inline mr-2 text-[var(--text-secondary)]" />
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Instrucciones de llegada
                  </label>
                  <textarea
                    value={data.instrucciones}
                    onChange={(e) => update('instrucciones', e.target.value)}
                    placeholder="Ej: Entra por la puerta trasera, pregunta por María en recepción..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm outline-none focus:border-[var(--brand-primary)] resize-none"
                    style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div
                  className="h-32 rounded-[var(--radius-md)] flex items-center justify-center border border-[var(--border)]"
                  style={{ backgroundColor: 'var(--bg-muted)' }}
                >
                  <div className="text-center">
                    <MapPin size={24} style={{ color: 'var(--text-tertiary)', margin: '0 auto 4px' }} />
                    <p className="text-xs text-[var(--text-secondary)]">Vista previa del mapa</p>
                    {data.direccion && (
                      <p className="text-xs text-[var(--brand-primary)] mt-1">{data.direccion}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Requisitos y salario */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--text-primary)]">
                      Salario por hora
                    </label>
                    <span
                      className="text-lg font-bold"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {data.salarioHora}€/h
                    </span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={18}
                    step={0.5}
                    value={data.salarioHora}
                    onChange={(e) => update('salarioHora', parseFloat(e.target.value))}
                    className="w-full accent-[#2D5BFF]"
                  />
                  <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                    <span>8€/h</span>
                    <span>18€/h</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[var(--text-primary)]">
                      <Users size={14} className="inline mr-1" />
                      Número de personas necesarias
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => update('personas', Math.max(1, data.personas - 1))}
                        className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold text-[var(--text-primary)] w-6 text-center">
                        {data.personas}
                      </span>
                      <button
                        type="button"
                        onClick={() => update('personas', Math.min(10, data.personas + 1))}
                        className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    Requisitos (opcional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {REQUISITOS_OPCIONES.map((req) => {
                      const active = data.requisitos.includes(req)
                      return (
                        <button
                          key={req}
                          type="button"
                          onClick={() => toggleRequisito(req)}
                          className="px-3 py-1.5 rounded-full border text-sm font-medium transition-all"
                          style={{
                            borderColor: active ? 'var(--brand-primary)' : 'var(--border)',
                            backgroundColor: active ? '#EEF2FF' : 'var(--bg-base)',
                            color: active ? 'var(--brand-primary)' : 'var(--text-secondary)',
                          }}
                        >
                          {active && '✓ '}{req}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Revisión */}
            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  Resumen del turno
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Sector', value: data.sector || '—' },
                    { label: 'Puesto', value: data.puesto || '—' },
                    { label: 'Descripción', value: data.descripcion || '—' },
                    { label: 'Fecha', value: data.fecha || '—' },
                    {
                      label: 'Horario',
                      value:
                        data.horaInicio && data.horaFin
                          ? `${data.horaInicio} – ${data.horaFin} (${totalHoras}h)`
                          : '—',
                    },
                    { label: 'Recurrente', value: data.recurrente ? 'Sí, semanal' : 'No' },
                    { label: 'Dirección', value: data.direccion || '—' },
                    { label: 'Instrucciones', value: data.instrucciones || '—' },
                    { label: 'Salario/hora', value: `${data.salarioHora}€` },
                    { label: 'Personas', value: `${data.personas}` },
                    {
                      label: 'Requisitos',
                      value:
                        data.requisitos.length > 0 ? data.requisitos.join(', ') : 'Sin requisitos específicos',
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex gap-4 py-2.5 border-b border-[var(--border)] last:border-0"
                    >
                      <span className="text-sm text-[var(--text-secondary)] w-28 shrink-0">{label}</span>
                      <span className="text-sm text-[var(--text-primary)]">{value}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="rounded-[var(--radius-md)] p-4 border"
                  style={{ backgroundColor: '#EEF2FF', borderColor: 'var(--brand-primary)' }}
                >
                  <p className="text-sm text-[var(--text-secondary)] mb-1">Coste total estimado</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--brand-primary)' }}>
                    {totalCoste}€
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {totalHoras}h × {data.salarioHora}€/h × {data.personas} persona
                    {data.personas !== 1 ? 's' : ''} + 1.5% comisión STUGO
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePublish}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white"
            style={{ backgroundColor: 'var(--success)' }}
          >
            <CheckCircle size={16} />
            Publicar turno
          </button>
        )}
      </div>
    </div>
  )
}
