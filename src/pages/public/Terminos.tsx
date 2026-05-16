import { useState } from 'react'
import { Link } from 'react-router-dom'

type Tab = 'empresa' | 'estudiante'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>{children}</div>
    </div>
  )
}

export default function Terminos() {
  const [tab, setTab] = useState<Tab>('empresa')

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-6 text-sm" style={{ color: 'var(--text-tertiary)' }}>
        <Link to="/" className="hover:underline">Inicio</Link> › <span>Términos y condiciones</span>
      </div>
      <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Términos y Condiciones</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-tertiary)' }}>Última actualización: 1 de enero de 2026</p>

      <div className="flex gap-2 mb-10 p-1 rounded-[var(--radius-md)] w-fit" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
        {(['empresa', 'estudiante'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium capitalize transition-all"
            style={{ background: tab === t ? 'var(--brand-primary)' : 'transparent', color: tab === t ? 'white' : 'var(--text-secondary)' }}>
            Para {t}s
          </button>
        ))}
      </div>

      {tab === 'empresa' ? (
        <>
          <Section title="1. Definiciones">
            <p>«STUGO» designa a STUGO Tecnologías SL; «Empresa» al titular de la cuenta de empresa; «Estudiante» al usuario trabajador; «ETT Partner» a la empresa de trabajo temporal colaboradora de STUGO; «Turno» a la prestación laboral concreta contratada.</p>
          </Section>
          <Section title="2. Objeto y naturaleza del servicio">
            <p><strong>STUGO es una plataforma tecnológica de matching, no un empleador.</strong> El empleador legal del trabajador es la ETT colaboradora con quien STUGO mantiene acuerdo, debidamente autorizada conforme a la Ley 14/1994, de 1 de junio, de Empresas de Trabajo Temporal. La relación laboral se establece entre el Estudiante y la ETT Partner.</p>
          </Section>
          <Section title="3. Planes y facturación">
            <p>Los planes se facturan mensualmente con renovación automática. Precios: Starter 50€/mes, Growth 60€/mes, Pro 75€/mes, Scale 100€/mes (IVA no incluido). La cancelación debe comunicarse con 15 días de antelación al siguiente período de facturación.</p>
          </Section>
          <Section title="4. Obligaciones de la empresa">
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Proporcionar un entorno de trabajo seguro conforme a la LPRL.</li>
              <li>No asignar a menores de 18 años trabajos nocturnos (22:00-06:00) ni insalubres.</li>
              <li>Confirmar la asistencia del Estudiante en la plataforma dentro de las 2 horas siguientes al final del turno.</li>
              <li>No contactar directamente con los Estudiantes para contratar al margen de STUGO durante 12 meses.</li>
            </ul>
          </Section>
          <Section title="5. Jurisdicción">
            <p>Los presentes Términos se rigen por el Derecho español. Para cualquier litigio, las partes se someten a los Juzgados y Tribunales de Madrid.</p>
          </Section>
        </>
      ) : (
        <>
          <Section title="1. Objeto y naturaleza del servicio">
            <p><strong>Tu empleador legal es la ETT Partner de STUGO</strong>, no STUGO directamente. STUGO gestiona la tecnología de matching y la operativa. La ETT te da de alta en la Seguridad Social, formaliza el contrato y realiza los pagos.</p>
          </Section>
          <Section title="2. Requisitos de edad">
            <p>Para usar STUGO debes tener al menos 16 años cumplidos. Si tienes entre 16 y 17 años, necesitas el consentimiento escrito de tu padre/madre o tutor legal, conforme al artículo 6 del Estatuto de los Trabajadores.</p>
          </Section>
          <Section title="3. Comisión y pagos">
            <p>El servicio es gratuito para el Estudiante salvo una comisión del <strong>1,5%</strong> sobre el importe bruto de cada turno cobrado. El pago se realiza en menos de 24 horas hábiles desde que la Empresa confirma la asistencia.</p>
          </Section>
          <Section title="4. Sistema de reputación">
            <p>Las valoraciones son anónimas para el receptor durante 14 días desde su publicación (sistema anti-revenge). Una reputación por debajo de 3,5 estrellas puede derivar en la suspensión temporal de la cuenta.</p>
          </Section>
          <Section title="5. Cancelaciones">
            <p>Cancelar un turno con menos de 24 horas de antelación afecta negativamente a tu match score durante 2 semanas. Cancelaciones repetidas pueden derivar en la suspensión de la cuenta.</p>
          </Section>
        </>
      )}
    </div>
  )
}
