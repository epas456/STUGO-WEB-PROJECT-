// Básicos del sector: lo mínimo transversal a cualquier negocio del sector.
// Una pantalla por sector. Texto breve y checklist, nada más.

export interface BasicosSector {
  slug: string
  sector: string
  intro: string
  antesDeIr: string[]
  alLlegar: string[]
  duranteElTurno: string[]
  erroresComunes: string[]
}

export function sectorSlug(sector: string): string {
  return sector
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export const basicosSector: BasicosSector[] = [
  {
    slug: 'hosteleria',
    sector: 'Hostelería',
    intro: 'Bares, restaurantes, hoteles y cafeterías. El ritmo lo marca el servicio: hay picos intensos y valles tranquilos.',
    antesDeIr: [
      'Confirma el horario y llega 10-15 minutos antes',
      'Zapato cerrado y antideslizante, pelo recogido, uñas cortas',
      'Nada de perfume fuerte ni joyas grandes',
      'Si tienes el certificado de manipulador de alimentos, llévalo en el móvil',
    ],
    alLlegar: [
      'Preséntate al responsable y pregunta quién te dará las instrucciones',
      'Pregunta dónde dejar tus cosas y dónde fichar',
      'Pide el plano de mesas o la distribución de zonas',
      'Pregunta qué platos o productos se han acabado hoy',
    ],
    duranteElTurno: [
      'Las manos nunca vacías: si vas a cocina, lleva algo; si vuelves, trae algo',
      'Ante una queja de un cliente, no discutas: avisa al responsable',
      'Los alérgenos no se improvisan: si no lo sabes seguro, pregunta a cocina',
      'Limpia sobre la marcha, no lo dejes para el final',
    ],
    erroresComunes: [
      'Prometer al cliente cambios o descuentos sin consultar',
      'Quedarse parado en los valles: siempre hay algo que reponer o limpiar',
      'No avisar cuando algo se rompe o se derrama',
    ],
  },
  {
    slug: 'retail',
    sector: 'Retail',
    intro: 'Tiendas y comercios. Tu trabajo tiene dos caras: atender bien y mantener la tienda en orden.',
    antesDeIr: [
      'Ropa sencilla y limpia salvo que te indiquen uniforme',
      'Calzado cómodo: pasarás el turno de pie',
      'Repasa en la web de la marca qué venden y sus productos estrella',
    ],
    alLlegar: [
      'Preséntate al encargado y pregunta tu zona asignada',
      'Pregunta cómo funciona la caja o si solo harás sala/reposición',
      'Localiza el almacén y aprende cómo se pide talla o stock',
      'Pregunta la política de devoluciones básica',
    ],
    duranteElTurno: [
      'Saluda a quien entra; ofrece ayuda sin perseguir',
      'Si no sabes una respuesta, di "lo consulto ahora mismo" y pregunta',
      'Repón y dobla en los momentos sin clientes',
      'La alarma de un producto se quita en caja, nunca la fuerces',
    ],
    erroresComunes: [
      'Usar el móvil en la tienda: es la queja número uno de los encargados',
      'Dejar el probador o tu zona desordenada "para luego"',
      'Inventarse características de un producto para cerrar una venta',
    ],
  },
  {
    slug: 'eventos',
    sector: 'Eventos',
    intro: 'Congresos, ferias, conciertos y actos corporativos. Todo pasa una sola vez: la puntualidad y el briefing lo son todo.',
    antesDeIr: [
      'Llega con margen: en eventos grandes, entrar y acreditarte lleva tiempo',
      'Lleva DNI: casi siempre hay control de acceso de personal',
      'Confirma el punto exacto de encuentro, no solo la dirección del recinto',
      'Come antes: los descansos pueden ser cortos o tardíos',
    ],
    alLlegar: [
      'Localiza a tu coordinador/a y no te muevas de tu puesto sin avisarle',
      'Atiende al briefing: apunta horarios, salas y nombres clave',
      'Memoriza dónde están los aseos, salidas y punto de información',
      'Pregunta qué hacer y a quién avisar si un asistente tiene un problema',
    ],
    duranteElTurno: [
      'Eres la cara del evento: postura, sonrisa y trato correcto todo el turno',
      'No des una indicación si no estás seguro: deriva al punto de información',
      'Los cambios de última hora son normales: confirma siempre con tu coordinador/a',
    ],
    erroresComunes: [
      'Abandonar el puesto sin relevo, aunque sea un momento',
      'Hacer fotos o vídeos del evento sin permiso',
      'Sentarse o mirar el móvil en zonas visibles al público',
    ],
  },
  {
    slug: 'logistica',
    sector: 'Logística',
    intro: 'Almacenes, picking y reparto. Aquí mandan dos cosas: la seguridad y el ritmo constante.',
    antesDeIr: [
      'Calzado resistente, cerrado y cómodo (si tienes bota de seguridad, mejor)',
      'Ropa que se pueda manchar; nada suelto que pueda engancharse',
      'Descansa bien antes de un turno nocturno; lleva agua y algo de comer',
    ],
    alLlegar: [
      'Preséntate al jefe de turno y atiende las normas de seguridad: no son opcionales',
      'Pregunta las zonas por las que NO puedes circular (carretillas, muelles)',
      'Aprende el sistema de ubicaciones (pasillo–estantería–altura) antes de empezar',
      'Pide los EPI que correspondan: chaleco, guantes, casco si aplica',
    ],
    duranteElTurno: [
      'Levanta peso con las piernas, no con la espalda; pide ayuda con lo voluminoso',
      'Ritmo constante gana a ritmo explosivo: no te fundas la primera hora',
      'Ante cualquier duda con una máquina, pregunta: no toques lo que no te han enseñado',
      'Escanea o registra cada movimiento como te hayan indicado; sin registro no hay trazabilidad',
    ],
    erroresComunes: [
      'Circular por zonas de carretillas mirando el móvil',
      'Apilar mal un palet por acabar antes',
      'No reportar un golpe o rotura de mercancía "para no molestar"',
    ],
  },
]
