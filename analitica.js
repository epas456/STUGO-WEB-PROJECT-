/* STUGO · Consentimiento de cookies y analítica
   - Nada de analítica se carga hasta que la persona acepta.
   - Google Consent Mode v2: todo denegado por defecto; la publicidad, siempre denegada.
   - Al retirar el consentimiento se borran las cookies y el almacenamiento de analítica.
   - El consentimiento caduca a los 24 meses o si cambia la versión de la política. */
(function () {
  'use strict';

  var GTM_ID = 'GTM-5758GWRZ';
  var PH_KEY = 'phc_BtFmkaAMj7386SokDhzX4J7fr3qcQ9N8yYJjKVp6usnc';
  var PH_HOST = 'https://eu.i.posthog.com';
  var KEY = 'stugo_cookies';
  var VERSION = 2;                              // súbela si cambian las herramientas de la política
  var MAX_AGE = 24 * 30.44 * 24 * 3600 * 1000;  // 24 meses
  var TRACK = /^(_ga|_gid|_gat|_gcl|ph_)/;      // cookies y claves de analítica

  var d = document, w = window, loaded = false, box, lastFocus;

  /* Consent Mode v2: valores por defecto antes de cualquier etiqueta de Google */
  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', functionality_storage: 'denied',
    personalization_storage: 'denied', security_storage: 'granted', wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', false);

  /* ── Guardar y leer la elección ── */
  function get() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!v || v.v !== VERSION || typeof v.a !== 'boolean' || !(Date.now() - v.t < MAX_AGE)) return null;
      return v;
    } catch (e) { return null; }
  }
  function set(a) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, a: a, t: Date.now() })); } catch (e) {}
  }

  /* ── Borrar rastro de analítica (al rechazar o retirar) ── */
  function wipe() {
    var host = location.hostname, parts = host.split('.'), domains = ['', host, '.' + host];
    for (var i = 1; i < parts.length - 1; i++) {
      var p = parts.slice(i).join('.'); domains.push(p, '.' + p);
    }
    d.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (!TRACK.test(n)) return;
      domains.forEach(function (dm) {
        d.cookie = n + '=; Max-Age=0; Path=/' + (dm ? '; Domain=' + dm : '') + '; SameSite=Lax';
      });
    });
    [w.localStorage, w.sessionStorage].forEach(function (s) {
      try {
        for (var j = s.length - 1; j >= 0; j--) { var k = s.key(j); if (k && TRACK.test(k)) s.removeItem(k); }
      } catch (e) {}
    });
  }

  /* ── Cargar analítica (solo con consentimiento) ── */
  function load() {
    if (loaded) return; loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });

    /* Google Tag Manager */
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var g = d.createElement('script');
    g.async = true; g.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    d.head.appendChild(g);

    /* PostHog (servidores en la UE) — fragmento oficial */
    !function(t,e){var o,n,p,r;e.__SV||(w.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session opt_out_capturing has_opted_out_capturing opt_in_capturing reset".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(d,w.posthog||[]);
    w.posthog.init(PH_KEY, {
      api_host: PH_HOST,
      person_profiles: 'identified_only',
      persistence: 'localStorage+cookie',
      secure_cookie: true,
      autocapture: false,
      capture_pageview: true,
      disable_session_recording: true,
      disable_surveys: true,
      respect_dnt: true
    });
  }

  function decide(a) {
    var before = get();
    set(a);
    close();
    if (a) { load(); return; }
    gtag('consent', 'update', { analytics_storage: 'denied' });
    try { if (w.posthog && w.posthog.opt_out_capturing) w.posthog.opt_out_capturing(); } catch (e) {}
    wipe();
    /* Si ya estaban cargados, recargamos para que dejen de ejecutarse */
    if (loaded || (before && before.a)) { setTimeout(function () { location.reload(); }, 50); }
  }

  /* ── Banner ── */
  var CSS =
    '#stg-cookies{position:fixed;left:12px;right:12px;bottom:12px;z-index:100;max-width:720px;margin:0 auto;background:#F2EFE7;color:#0E0F12;border-radius:24px;padding:20px 22px;font:15px/1.5 "Space Grotesk",system-ui,sans-serif;letter-spacing:-.01em;box-shadow:0 0 0 1px rgba(14,15,18,.25)}' +
    '#stg-cookies[hidden]{display:none!important}' +
    '#stg-cookies h2:focus{outline:none}#stg-cookies h2{margin:0 0 6px;font-size:17px;line-height:1.25;letter-spacing:-.02em}' +
    '#stg-cookies p{margin:0}' +
    '#stg-cookies a{color:#0E0F12}' +
    '#stg-cookies .stg-row{display:grid;grid-template-columns:1fr;gap:8px;margin-top:14px}' +
    '#stg-cookies button{min-height:46px;font:inherit;font-weight:600;font-size:15px;border:1.5px solid #0E0F12;border-radius:999px;background:transparent;color:#0E0F12;cursor:pointer;padding:0 16px}' +
    '#stg-cookies button:focus-visible,#stg-cookies a:focus-visible,#stg-cookies input:focus-visible{outline:3px solid #0E0F12;outline-offset:3px}' +
    '#stg-cookies .stg-panel{margin-top:14px;border-top:1px solid rgba(14,15,18,.2);padding-top:14px}' +
    '#stg-cookies .stg-opt{display:flex;gap:12px;align-items:flex-start;margin:0 0 10px}' +
    '#stg-cookies .stg-opt input{flex:none;width:22px;height:22px;margin:2px 0 0;accent-color:#0E0F12}' +
    '#stg-cookies .stg-opt input:disabled{opacity:.6}' +
    '@media (min-width:560px){#stg-cookies .stg-row{grid-template-columns:repeat(3,1fr)}#stg-cookies .stg-panel .stg-row{grid-template-columns:1fr}}' +
    '.stg-link{background:none;border:0;padding:0 4px;min-height:44px;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}';

  function build() {
    var st = d.createElement('style'); st.textContent = CSS; d.head.appendChild(st);
    box = d.createElement('section');
    box.id = 'stg-cookies';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-labelledby', 'stg-cookies-t');
    box.setAttribute('aria-describedby', 'stg-cookies-d');
    box.hidden = true;
    box.innerHTML =
      '<h2 id="stg-cookies-t" tabindex="-1">Cookies</h2>' +
      '<p id="stg-cookies-d">Usamos cookies de analítica (Google Analytics y PostHog, este último con servidores en la UE) para saber cuántas personas visitan la web y desde dónde llegan. Solo se activan si las aceptas. Más información en la <a href="cookies.html">Política de cookies</a>.</p>' +
      '<div class="stg-panel" hidden>' +
        '<label class="stg-opt"><input type="checkbox" checked disabled><span><b>Necesarias.</b> Guardan tu elección sobre las cookies. Siempre activas.</span></label>' +
        '<label class="stg-opt" for="stg-analitica"><input type="checkbox" id="stg-analitica"><span><b>Analítica.</b> Google Analytics y PostHog (UE), para medir visitas y su origen.</span></label>' +
        '<div class="stg-row"><button type="button" data-a="guardar">Guardar preferencias</button></div>' +
      '</div>' +
      '<div class="stg-row"><button type="button" data-a="rechazar">Rechazar todas</button><button type="button" data-a="configurar" aria-expanded="false">Configurar</button><button type="button" data-a="aceptar">Aceptar todas</button></div>';
    d.body.appendChild(box);

    box.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-a]') : null;
      if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'aceptar') decide(true);
      else if (a === 'rechazar') decide(false);
      else if (a === 'guardar') decide(d.getElementById('stg-analitica').checked);
      else if (a === 'configurar') {
        var panel = box.querySelector('.stg-panel'), open = panel.hidden;
        panel.hidden = !open; b.setAttribute('aria-expanded', String(open));
        if (open) d.getElementById('stg-analitica').focus();
      }
    });
  }

  function open() {
    if (!box) build();
    var c = get();
    d.getElementById('stg-analitica').checked = !!(c && c.a);
    box.querySelector('.stg-panel').hidden = true;
    box.querySelector('[data-a="configurar"]').setAttribute('aria-expanded', 'false');
    lastFocus = d.activeElement;
    box.hidden = false;
    box.querySelector('#stg-cookies-t').focus({ preventScroll: true });
  }
  function close() {
    if (!box) return;
    box.hidden = true;
    if (lastFocus && lastFocus.focus && lastFocus !== d.body) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }

  function init() {
    /* «Gestionar cookies» del pie */
    d.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-cookies]') : null;
      if (!t) return;
      e.preventDefault(); open();
    });
    var c = get();
    if (c && c.a) load();
    else {
      if (!c) { wipe(); open(); }   // sin elección válida: limpiamos restos y preguntamos
    }
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
