/* STUGO · Consentimiento de cookies + Google Tag Manager
   Tag Manager (y con él Google Analytics) solo se carga si el visitante acepta. */
(function () {
  var GTM_ID = 'GTM-5758GWRZ';
  var KEY = 'stugo_cookies';
  var MAX = 1000 * 60 * 60 * 24 * 730; /* el consentimiento caduca a los 24 meses */
  var d = document, loaded = false;

  var css =
    '#stg-cookies{position:fixed;left:12px;right:12px;bottom:12px;z-index:100;max-width:720px;margin:0 auto;background:#F2EFE7;color:#0E0F12;border-radius:24px;padding:20px 22px;font:16px/1.45 "Space Grotesk",system-ui,sans-serif;letter-spacing:-.01em}' +
    '#stg-cookies[hidden]{display:none}' +
    '#stg-cookies p{margin:0 0 14px}' +
    '#stg-cookies a{color:#0E0F12}' +
    '#stg-cookies .stg-row{display:flex;flex-wrap:wrap;gap:10px}' +
    '#stg-cookies button{flex:1 1 140px;font:inherit;font-weight:600;font-size:15px;background:transparent;color:#0E0F12;border:2px solid #0E0F12;border-radius:999px;padding:12px 18px;min-height:46px;cursor:pointer}' +
    '#stg-cookies :focus-visible{outline:3px solid #0E0F12;outline-offset:3px}' +
    '#stg-cookies .stg-panel{margin:0 0 14px;padding:14px 0;border-top:1px solid #BDB9AE;border-bottom:1px solid #BDB9AE}' +
    '#stg-cookies .stg-panel[hidden]{display:none}' +
    '#stg-cookies label{display:flex;gap:10px;align-items:flex-start;margin:0 0 12px}' +
    '#stg-cookies input{width:22px;height:22px;margin:2px 0 0;flex:none}';

  var style = d.createElement('style');
  style.textContent = css;
  d.head.appendChild(style);

  var bar = d.createElement('div');
  bar.id = 'stg-cookies';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Preferencias de cookies');
  bar.hidden = true;
  bar.innerHTML =
    '<p>Usamos cookies de analítica (Google Analytics) para saber cuántas personas visitan la web y desde dónde llegan. Solo se activan si las aceptas. Más información en la <a href="cookies.html">Política de cookies</a>.</p>' +
    '<div class="stg-panel" hidden>' +
      '<label for="stg-analitica"><input type="checkbox" id="stg-analitica"><span><b>Analítica.</b> Google Analytics, para medir visitas y su origen.</span></label>' +
      '<div class="stg-row"><button type="button" data-a="guardar">Guardar preferencias</button></div>' +
    '</div>' +
    '<div class="stg-row">' +
      '<button type="button" data-a="rechazar">Rechazar todas</button>' +
      '<button type="button" data-a="configurar">Configurar</button>' +
      '<button type="button" data-a="aceptar">Aceptar todas</button>' +
    '</div>';
  d.body.appendChild(bar);

  var panel = bar.querySelector('.stg-panel');
  var chk = bar.querySelector('#stg-analitica');

  function load() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = d.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    d.head.appendChild(s);
  }

  function get() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && Date.now() - v.t < MAX) return v.a;
    } catch (e) {}
    return null;
  }

  function set(a) {
    try { localStorage.setItem(KEY, JSON.stringify({ a: a, t: Date.now() })); } catch (e) {}
    bar.hidden = true;
    if (a) { load(); }
    else if (loaded) { location.reload(); }
  }

  bar.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button[data-a]') : null;
    if (!b) return;
    var a = b.getAttribute('data-a');
    if (a === 'aceptar') set(true);
    else if (a === 'rechazar') set(false);
    else if (a === 'configurar') { panel.hidden = false; chk.focus(); }
    else if (a === 'guardar') set(chk.checked);
  });

  d.addEventListener('click', function (e) {
    var l = e.target.closest ? e.target.closest('[data-cookies]') : null;
    if (!l) return;
    e.preventDefault();
    chk.checked = get() === true;
    panel.hidden = true;
    bar.hidden = false;
  });

  var s = get();
  if (s === null) bar.hidden = false;
  else if (s === true) load();
})();
