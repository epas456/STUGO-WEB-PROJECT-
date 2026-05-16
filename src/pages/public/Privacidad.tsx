import { Link } from 'react-router-dom'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>{children}</div>
    </div>
  )
}

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-6 text-sm" style={{ color: 'var(--text-tertiary)' }}>
        <Link to="/" className="hover:underline">Inicio</Link> › <span>Política de privacidad</span>
      </div>
      <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Política de Privacidad</h1>
      <p className="text-sm mb-12" style={{ color: 'var(--text-tertiary)' }}>Última actualización: 1 de enero de 2026</p>

      <Section title="1. Responsable del tratamiento">
        <ul className="space-y-1 list-disc list-inside">
          <li><strong>Identidad:</strong> STUGO Tecnologías SL</li>
          <li><strong>CIF:</strong> B12345678</li>
          <li><strong>Dirección:</strong> Calle Gran Vía 31, 28013 Madrid</li>
          <li><strong>Email:</strong> privacidad@stugo.es</li>
          <li><strong>DPD:</strong> dpo@stugo.es</li>
        </ul>
      </Section>

      <Section title="2. Datos recogidos y finalidades">
        <p>Recogemos los siguientes datos según la finalidad:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li><strong>Gestión de cuenta:</strong> Nombre, apellidos, email, teléfono, fecha de nacimiento, ciudad. Base jurídica: ejecución de contrato (art. 6.1.b RGPD).</li>
          <li><strong>Matching de turnos:</strong> Disponibilidad, sectores, historial de turnos, reputación. Base: ejecución de contrato.</li>
          <li><strong>Pagos:</strong> IBAN o datos de pago. Base: ejecución de contrato y obligación legal.</li>
          <li><strong>Comunicaciones comerciales:</strong> Email. Base: consentimiento (art. 6.1.a RGPD). Puedes revocar en cualquier momento.</li>
          <li><strong>Análisis y mejora:</strong> Datos de uso de la plataforma (anónimos o pseudonimizados). Base: interés legítimo (art. 6.1.f RGPD).</li>
        </ul>
      </Section>

      <Section title="3. Destinatarios">
        <ul className="space-y-1 list-disc list-inside">
          <li>ETT colaboradoras autorizadas (empleadoras legales de los estudiantes).</li>
          <li>Pasarelas de pago (Stripe, SEPA).</li>
          <li>Infraestructura cloud (AWS eu-west-1, dentro del EEE).</li>
          <li>Administración Tributaria (AEAT) cuando proceda por obligación legal.</li>
        </ul>
      </Section>

      <Section title="4. Plazos de conservación">
        <p>Los datos se conservan mientras la cuenta esté activa y, tras su eliminación, durante los plazos legalmente exigibles: 5 años para datos fiscales, 4 años para datos laborales.</p>
      </Section>

      <Section title="5. Derechos de los interesados">
        <p>Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando un email a <strong>privacidad@stugo.es</strong> adjuntando copia de su DNI/NIE. Tiene derecho a presentar reclamación ante la <strong>AEPD</strong> (www.aepd.es).</p>
      </Section>

      <Section title="6. Seguridad">
        <p>STUGO aplica medidas técnicas y organizativas adecuadas para proteger sus datos: cifrado TLS en tránsito, cifrado AES-256 en reposo, control de accesos basado en roles, auditorías periódicas y procedimientos de respuesta ante incidentes.</p>
      </Section>
    </div>
  )
}
