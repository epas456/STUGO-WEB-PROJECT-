# stugo.es

Web de STUGO: estudiantes jóvenes para turnos puntuales en almacenes de Mataró y el Maresme.

Web estática, sin build. Publicada en Vercel (proyecto `stugo`, dominio stugo.es).

| Archivo | Qué es |
|---|---|
| `index.html` | Portada con selector «Soy empresa / Soy estudiante», botón de WhatsApp y formulario de estudiantes (FormSubmit → hola@stugo.es) |
| `aviso-legal.html` | Aviso legal |
| `privacidad.html` | Política de privacidad |
| `cookies.html` | Política de cookies |
| `analitica.js` | Banner de cookies y Google Tag Manager (`GTM-5758GWRZ`), que solo se carga si el visitante acepta |
| `vercel.json` | Redirección `stugo.es/t` → portada con etiquetas UTM (origen `tarjeta`, medio `nfc`), para las tarjetas NFC |

Para publicar: arrastra todos los archivos a vercel.com/drop → «Deploy to an existing project» → `stugo`.
