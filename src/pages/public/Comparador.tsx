import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

type CellValue = 'yes' | 'no' | 'partial' | string

interface CompRow {
  label: string
  tooltip: string
  stugo: CellValue
  jobandtalent: CellValue
  coople: CellValue
  temper: CellValue
}

const rows: CompRow[] = [
  {
    label: 'Pago al estudiante',
    tooltip: 'Tiempo que tarda el trabajador en recibir su pago tras completar el turno.',
    stugo: '<24 h',
    jobandtalent: 'Semanal',
    coople: 'Semanal',
    temper: '2 semanas',
  },
  {
    label: 'Sin CV requerido',
    tooltip: 'Si el trabajador puede apuntarse a turnos sin necesidad de un CV formal.',
    stugo: 'yes',
    jobandtalent: 'no',
    coople: 'no',
    temper: 'partial',
  },
  {
    label: 'Match score visible',
    tooltip: 'El trabajador puede ver su puntuación de compatibilidad con cada oferta antes de aplicar.',
    stugo: 'yes',
    jobandtalent: 'no',
    coople: 'no',
    temper: 'no',
  },
  {
    label: 'Reputación bidireccional',
    tooltip: 'Tanto empresa como trabajador se valoran mutuamente y el historial es público.',
    stugo: 'yes',
    jobandtalent: 'partial',
    coople: 'partial',
    temper: 'yes',
  },
  {
    label: 'Específico para estudiantes',
    tooltip: 'La plataforma está diseñada específicamente para el perfil del estudiante universitario o de FP.',
    stugo: 'yes',
    jobandtalent: 'no',
    coople: 'no',
    temper: 'no',
  },
  {
    label: 'Soporte WhatsApp',
    tooltip: 'Atención al cliente directa por WhatsApp en tiempo real.',
    stugo: 'yes',
    jobandtalent: 'no',
    coople: 'no',
    temper: 'no',
  },
  {
    label: 'Comisión empresa',
    tooltip: 'Coste aproximado para la empresa por acceder a la plataforma.',
    stugo: '50–100 €/mes',
    jobandtalent: 'Variable alta',
    coople: 'Variable',
    temper: 'Variable',
  },
  {
    label: 'Comisión estudiante',
    tooltip: 'Coste directo o indirecto que asume el trabajador al cobrar.',
    stugo: '1,5% visible',
    jobandtalent: '0% (margen oculto)',
    coople: '0%',
    temper: '0%',
  },
  {
    label: 'Verificación de identidad',
    tooltip: 'Si la plataforma verifica la identidad del trabajador con KYC.',
    stugo: 'yes',
    jobandtalent: 'yes',
    coople: 'partial',
    temper: 'partial',
  },
  {
    label: 'App móvil nativa',
    tooltip: 'Disponibilidad de app iOS y Android con funcionalidad completa.',
    stugo: 'yes',
    jobandtalent: 'yes',
    coople: 'yes',
    temper: 'yes',
  },
  {
    label: 'Cobertura en España',
    tooltip: 'Número de ciudades españolas con oferta activa.',
    stugo: '16 ciudades',
    jobandtalent: 'Nacional',
    coople: 'Nacional',
    temper: 'Nacional',
  },
]

const PLATFORMS = ['stugo', 'jobandtalent', 'coople', 'temper'] as const
type Platform = typeof PLATFORMS[number]

const platformNames: Record<Platform, string> = {
  stugo: 'STUGO',
  jobandtalent: 'Jobandtalent',
  coople: 'Coople',
  temper: 'Temper',
}

function CellIcon({ value, isStugo }: { value: CellValue; isStugo?: boolean }) {
  if (value === 'yes') {
    return <CheckCircle2 size={20} style={{ color: isStugo ? 'var(--brand-accent)' : 'var(--success)' }} />
  }
  if (value === 'no') {
    return <XCircle size={20} style={{ color: 'var(--danger)' }} />
  }
  if (value === 'partial') {
    return <AlertCircle size={20} style={{ color: 'var(--warning)' }} />
  }
  return <span className="text-sm font-medium" style={{ color: isStugo ? 'white' : 'var(--text-secondary)' }}>{value}</span>
}

function TooltipCell({ label, tooltip, value, isStugo }: { label: string; tooltip: string; value: CellValue; isStugo?: boolean }) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="flex justify-center items-center cursor-help">
            <CellIcon value={value} isStugo={isStugo} />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs px-3 py-2 text-xs rounded-lg shadow-lg"
            style={{
              background: 'var(--text-primary)',
              color: 'white',
            }}
            sideOffset={5}
          >
            <strong>{label}:</strong> {tooltip}
            <Tooltip.Arrow style={{ fill: 'var(--text-primary)' }} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default function Comparador() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="py-16 text-center px-4" style={{ background: 'transparent' }}>
        <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand-primary)' }}>
          Comparativa
        </span>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>STUGO vs la competencia</h1>
        <p className="text-xl max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Datos verificados y actualizados. Sin sesgos. Compara y decide.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}>
          <CheckCircle2 size={14} />
          Datos verificados a mayo 2026
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Table */}
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
          <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: 640 }}>
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--text-secondary)', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', width: '30%' }}>
                  Característica
                </th>
                {PLATFORMS.map((p) => (
                  <th
                    key={p}
                    className="p-4 text-center text-sm font-bold"
                    style={{
                      background: p === 'stugo' ? 'var(--brand-primary)' : 'var(--bg-subtle)',
                      color: p === 'stugo' ? 'white' : 'var(--text-secondary)',
                      borderBottom: '1px solid var(--border)',
                      borderLeft: p === 'stugo' ? '2px solid var(--brand-primary)' : '1px solid var(--border)',
                      borderRight: p === 'stugo' ? '2px solid var(--brand-primary)' : 'none',
                      width: '17.5%',
                    }}
                  >
                    {p === 'stugo' && (
                      <div className="text-xs font-normal mb-1 opacity-70">Recomendado</div>
                    )}
                    {platformNames[p]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  style={{
                    background: i % 2 === 0 ? 'var(--bg-base)' : 'var(--bg-subtle)',
                  }}
                >
                  <td className="p-4" style={{ borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{row.label}</span>
                      <Tooltip.Provider delayDuration={200}>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <Info size={13} style={{ color: 'var(--text-tertiary)', cursor: 'help' }} />
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="z-50 max-w-xs px-3 py-2 text-xs rounded-lg shadow-lg"
                              style={{ background: 'var(--text-primary)', color: 'white' }}
                              sideOffset={5}
                            >
                              {row.tooltip}
                              <Tooltip.Arrow style={{ fill: 'var(--text-primary)' }} />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </div>
                  </td>
                  {PLATFORMS.map((p) => (
                    <td
                      key={p}
                      className="p-4 text-center"
                      style={{
                        borderBottom: '1px solid var(--border)',
                        borderLeft: p === 'stugo' ? '2px solid var(--brand-primary)' : '1px solid var(--border)',
                        borderRight: p === 'stugo' ? '2px solid var(--brand-primary)' : 'none',
                        background: p === 'stugo' ? 'rgba(45,91,255,0.04)' : 'inherit',
                      }}
                    >
                      <TooltipCell
                        label={row.label}
                        tooltip={row.tooltip}
                        value={row[p] as CellValue}
                        isStugo={p === 'stugo'}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-6 justify-center">
          {[
            { icon: <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />, label: 'Sí / Disponible' },
            { icon: <AlertCircle size={16} style={{ color: 'var(--warning)' }} />, label: 'Parcial / Limitado' },
            { icon: <XCircle size={16} style={{ color: 'var(--danger)' }} />, label: 'No disponible' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {l.icon}
              {l.label}
            </div>
          ))}
        </div>

        {/* Nota metodológica */}
        <div className="mt-8 p-4 rounded-[var(--radius-md)] text-xs" style={{ background: 'var(--bg-subtle)', color: 'var(--text-tertiary)', border: '1px solid var(--border)' }}>
          <strong style={{ color: 'var(--text-secondary)' }}>Nota metodológica:</strong> Los datos de comisiones y funcionalidades de terceros se basan en información pública disponible en sus respectivos sitios web a mayo de 2026.
          Las condiciones pueden cambiar. Para información actualizada, visita directamente cada plataforma.
          Los precios de STUGO son fijos y públicos; los de la competencia pueden variar según volumen y negociación.
        </div>

        {/* CTA */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[var(--radius-xl)]"
            style={{ background: 'var(--brand-primary)', color: 'white' }}>
            <h3 className="text-xl font-bold mb-2">¿Convencido?</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)' }} className="text-sm mb-6 leading-relaxed">
              Únete a las más de 2.400 empresas y 12.000 estudiantes que ya confían en STUGO.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/empresa/registro">
                <Button variant="accent" size="md">Publicar turno gratis</Button>
              </Link>
              <Link to="/registro">
                <Button variant="ghost" size="md" style={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                  Registrarme como estudiante
                </Button>
              </Link>
            </div>
          </div>
          <div className="p-8 rounded-[var(--radius-xl)]" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>¿Eres estudiante?</h3>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-6 leading-relaxed">
              STUGO es la única plataforma diseñada específicamente para compatibilizar el trabajo con los estudios universitarios.
            </p>
            <Link to="/calculadora">
              <Button variant="outline" size="md">Calcular mis ingresos potenciales</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
