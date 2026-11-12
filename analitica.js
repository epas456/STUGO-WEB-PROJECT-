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
    loadPostHog();
  }

  // PostHog (UE, Irlanda/Frankfurt). Solo se carga tras aceptar analítica.
  function loadPostHog() {
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_BtFmkaAMj7386SokDhzX4J7fr3qcQ9N8yYJjKVp6usnc', {
      api_host: 'https://eu.i.posthog.com',
      person_profiles: 'identified_only',
      persistence: 'localStorage+cookie',
      disable_session_recording: true,
      autocapture: false,
      capture_pageview: true
    });
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
