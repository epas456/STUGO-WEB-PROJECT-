/* STUGO · interacción de la portada */
(function(){
var d=document,root=d.documentElement;
var e=d.getElementById('v-empresa'),s=d.getElementById('v-estudiante');
var be=d.getElementById('b-empresa'),bs=d.getElementById('b-estudiante');
var toggle=d.querySelector('.toggle'),pill=toggle.querySelector('.pill');
var nav=d.getElementById('nav'),bubbles=d.querySelector('.bubbles');
var rm=window.matchMedia('(prefers-reduced-motion: reduce)');
var each=function(list,fn){Array.prototype.forEach.call(list,fn)};

/* Titular: una palabra = un span, para el escalonado */
each(d.querySelectorAll('h1.words'),function(h){
  var n=0;
  (function split(node){
    each(Array.prototype.slice.call(node.childNodes),function(c){
      if(c.nodeType===1){split(c);return}
      if(c.nodeType!==3)return;
      var f=d.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(function(p){
        if(!p)return;
        if(/^\s+$/.test(p)){f.appendChild(d.createTextNode(' '));return}
        var sp=d.createElement('span');sp.className='w';sp.style.setProperty('--w',n++);sp.textContent=p;f.appendChild(sp);
      });
      node.replaceChild(f,c);
    });
  })(h);
});

/* Escalonado de 80 ms entre tarjetas */
each(d.querySelectorAll('.grid'),function(g){each(g.children,function(c,i){c.style.setProperty('--i',i)})});

/* Aparición al hacer scroll */
var io=('IntersectionObserver' in window)?new IntersectionObserver(function(en){
  en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}});
},{threshold:.12,rootMargin:'0px 0px -6% 0px'}):null;
function arm(scope){
  each(scope.querySelectorAll('.rv,.words'),function(el){
    el.classList.remove('in');
    if(io)io.observe(el);else el.classList.add('in');
  });
}
arm(d);

/* Píldora deslizante del selector */
function movePill(){
  var b=be.getAttribute('aria-pressed')==='true'?be:bs;
  pill.style.width=b.offsetWidth+'px';
  pill.style.setProperty('--px',b.offsetLeft+'px');
}

/* Selector Empresa / Estudiante */
var timer,swapTimer;
function show(w,instant){
  var emp=w==='empresa',inn=emp?e:s,out=emp?s:e;
  be.setAttribute('aria-pressed',emp);bs.setAttribute('aria-pressed',!emp);
  movePill();
  try{history.replaceState(null,'','#'+w)}catch(x){}
  clearTimeout(timer);
  e.classList.remove('leaving');s.classList.remove('leaving');
  if(!inn.hidden)return;
  function swap(){
    out.classList.remove('leaving');
    out.hidden=true;inn.hidden=false;
    if(!instant){inn.classList.add('swap');clearTimeout(swapTimer);swapTimer=setTimeout(function(){inn.classList.remove('swap')},1200)}
    arm(inn);
  }
  if(instant||rm.matches){swap();return}
  out.classList.add('leaving');
  timer=setTimeout(swap,240);
}
be.addEventListener('click',function(){show('empresa')});
bs.addEventListener('click',function(){show('estudiante')});
if(location.hash==='#estudiante')show('estudiante',true);
movePill();
requestAnimationFrame(function(){requestAnimationFrame(function(){toggle.classList.add('ready')})});
window.addEventListener('resize',movePill);
window.addEventListener('load',movePill);
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(movePill);

/* Nav compacto + parallax de burbujas (máx. 40px) */
var tick=false;
function onScroll(){
  if(tick)return;tick=true;
  requestAnimationFrame(function(){
    tick=false;
    var y=window.pageYOffset||0;
    nav.classList.toggle('scrolled',y>24);
    if(!rm.matches){
      var max=root.scrollHeight-window.innerHeight;
      bubbles.style.setProperty('--p',max>0?Math.min(1,y/max).toFixed(3):0);
    }
  });
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();

/* Brillo de cristal que sigue al puntero */
each(d.querySelectorAll('.glow'),function(c){
  c.addEventListener('pointermove',function(ev){
    if(ev.pointerType==='touch')return;
    var r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(ev.clientX-r.left)+'px');
    c.style.setProperty('--my',(ev.clientY-r.top)+'px');
  });
});
})();
