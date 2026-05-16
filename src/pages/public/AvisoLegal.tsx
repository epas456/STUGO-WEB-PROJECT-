import { Link } from 'react-router-dom'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>{children}</div>
    </div>
  )
}

export default function AvisoLegal() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-6 text-sm" style={{ color: 'var(--text-tertiary)' }}>
        <Link to="/" className="hover:underline">Inicio</Link> › <span>Aviso legal</span>
      </div>
      <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Aviso Legal</h1>
      <p className="text-sm mb-12" style={{ color: 'var(--text-tertiary)' }}>Última actualización: 1 de enero de 2026</p>

      <Section title="1. Datos identificativos del titular">
        <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:</p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li><strong>Denominación social:</strong> STUGO Tecnologías SL</li>
          <li><strong>CIF:</strong> B12345678</li>
          <li><strong>Domicilio social:</strong> Calle Gran Vía 31, 28013 Madrid, España</li>
          <li><strong>Registro Mercantil:</strong> Inscrita en el Registro Mercantil de Madrid, Tomo 12345, Folio 67, Hoja M-123456</li>
          <li><strong>Email de contacto:</strong> legal@stugo.es</li>
          <li><strong>Teléfono:</strong> 91 123 45 67</li>
        </ul>
      </Section>

      <Section title="2. Objeto y ámbito de aplicación">
        <p>El presente Aviso Legal regula las condiciones de acceso y uso de la plataforma web STUGO (en adelante, la "Plataforma"), accesible en stugo.es, puesta a disposición por STUGO Tecnologías SL (en adelante, "STUGO") como plataforma tecnológica de intermediación laboral on-demand entre empresas y jóvenes estudiantes.</p>
      </Section>

      <Section title="3. Condiciones de uso">
        <p>El acceso a la Plataforma atribuye la condición de Usuario e implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal en la versión publicada en el momento del acceso. El Usuario se compromete a hacer un uso adecuado de los servicios y contenidos ofrecidos, y a no emplearlos para:</p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>Actividades ilícitas o contrarias a la legislación vigente.</li>
          <li>Difundir contenidos falsos, engañosos, difamatorios o que vulneren derechos de terceros.</li>
          <li>Realizar actividades que dañen los sistemas informáticos de STUGO o de terceros.</li>
        </ul>
      </Section>

      <Section title="4. Propiedad intelectual e industrial">
        <p>Todos los contenidos de la Plataforma —incluyendo, con carácter enunciativo y no limitativo, textos, fotografías, gráficos, imágenes, iconos, tecnología, software, logotipos, marcas y demás signos distintivos— son propiedad de STUGO o de terceros que han autorizado su uso. Queda expresamente prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa.</p>
      </Section>

      <Section title="5. Limitación de responsabilidad">
        <p>STUGO no garantiza la disponibilidad continua e ininterrumpida de la Plataforma. STUGO no será responsable de los daños o perjuicios de cualquier naturaleza ocasionados por el uso indebido del servicio, ni por la veracidad de los contenidos o datos facilitados por los Usuarios.</p>
      </Section>

      <Section title="6. Ley aplicable y jurisdicción">
        <p>Las relaciones establecidas entre STUGO y el Usuario se regirán por lo dispuesto en la normativa española vigente. Para la resolución de conflictos, ambas partes se someten a los Juzgados y Tribunales de la ciudad de Madrid, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.</p>
      </Section>
    </div>
  )
}
