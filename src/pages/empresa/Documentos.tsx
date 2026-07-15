import { CheckCircle2, Clock, AlertCircle, Upload } from 'lucide-react'
import { toast } from 'sonner'

const docs = [
  { name: 'Licencia de apertura', status: 'verified', expiry: '31/12/2027' },
  { name: 'Seguro de responsabilidad civil', status: 'verified', expiry: '01/03/2027' },
  { name: 'Certificado corriente pago SS', status: 'pending', expiry: null },
  { name: 'DNI/NIF del representante legal', status: 'verified', expiry: null },
  { name: 'Protocolo de prevención de riesgos laborales', status: 'missing', expiry: null },
]

const STATUS = {
  verified: { icon: CheckCircle2, color: 'var(--success)', label: 'Verificado' },
  pending: { icon: Clock, color: 'var(--warning)', label: 'En revisión' },
  missing: { icon: AlertCircle, color: 'var(--danger)', label: 'Pendiente' },
}

export default function EmpresaDocumentos() {
  const allOk = docs.every(d => d.status === 'verified')
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Documentación</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Mantén tus documentos actualizados para publicar turnos sin interrupciones.</p>
      {allOk && (
        <div className="flex items-center gap-2 p-4 rounded-[var(--radius-md)] mb-6 text-sm font-medium" style={{ background: 'var(--success-bg)', border: '1px solid var(--success-bg)', color: 'var(--success-text)' }}>
          <CheckCircle2 size={18} /> Todos tus documentos están verificados y al día.
        </div>
      )}
      <div className="space-y-3">
        {docs.map((doc, i) => {
          const s = STATUS[doc.status as keyof typeof STATUS]
          return (
            <div key={i} className="flex items-center justify-between p-4 rounded-[var(--radius-lg)]"
              style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <s.icon size={18} style={{ color: s.color }} />
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{doc.name}</div>
                  {doc.expiry && <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Caduca: {doc.expiry}</div>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium" style={{ color: s.color }}>{s.label}</span>
                {doc.status !== 'verified' && (
                  <button onClick={() => toast.success('Documento subido. Lo revisaremos en menos de 24h.')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium"
                    style={{ background: 'var(--brand-primary)', color: 'white' }}>
                    <Upload size={12} /> Subir
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
