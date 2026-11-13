# stugo.es

Web de STUGO: estudiantes jóvenes para turnos puntuales en almacenes de Mataró y el Maresme.
Web estática, sin build. Publicada en Vercel (proyecto `stugo`, dominio stugo.es).

| Archivo | Qué es |
|---|---|
| `index.html` + `app.js` | Portada con selector «Soy empresa / Soy estudiante», WhatsApp y formulario (FormSubmit → hola@stugo.es) |
| `analitica.js` | Banner de cookies (AEPD) + carga de Google Tag Manager y PostHog solo con consentimiento |
| `aviso-legal.html`, `privacidad.html`, `cookies.html` | Textos legales |
| `404.html` | Página de error |
| `vercel.json` | Cabeceras de seguridad (CSP, HSTS…), redirección `/t` de las tarjetas NFC |
| `fonts/` | Tipografías alojadas aquí (sin Google Fonts) |
| `robots.txt`, `sitemap.xml`, `.well-known/security.txt` | SEO y básicos (el sitemap solo lista la portada) |
| `favicon.svg`, `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest` | Icono en Google, pestañas y móvil |
| `og-image.png` | Imagen al compartir el enlace (WhatsApp, LinkedIn…) |

## Reglas
- Las páginas legales llevan `noindex, follow`: así Google muestra la portada al buscar «stugo». El JSON-LD de la portada (`application/ld+json`) no es JavaScript ejecutable y la CSP no lo bloquea.
- No añadir `<script>` en línea: la CSP los bloquea. Todo JavaScript va en archivos `.js`.
- Si se añade una herramienta nueva (píxel, chat…), añadir su dominio a la CSP de `vercel.json`, a la Política de cookies y subir `VERSION` en `analitica.js` para volver a pedir consentimiento.

## Publicar
Sube la carpeta entera (incluido `vercel.json`, `fonts/` y `.well-known/`) al proyecto `stugo` de Vercel.
