// sticky nav border
const _nav=document.getElementById('nav');
if(_nav)addEventListener('scroll',()=>_nav.classList.toggle('scrolled',scrollY>10),{passive:true});

// base reveals via IntersectionObserver (works with or without GSAP)
const _io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');_io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal,#score').forEach(el=>_io.observe(el));

// progressive GSAP enhancement (deferred CDN load; site fully works without it)
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  function load(src,cb){const s=document.createElement('script');s.src=src;s.async=true;s.onload=cb;document.head.appendChild(s)}
  load('https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js',function(){
    load('https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js',init)});
  function init(){
    if(!window.gsap||!window.ScrollTrigger)return;
    gsap.registerPlugin(ScrollTrigger);
    // hero entrance stagger
    const hero=document.querySelector('.hero .wrap>div:first-child, .page-hero .wrap');
    if(hero)gsap.from(hero.children,{y:26,opacity:0,duration:.7,stagger:.1,ease:'power2.out',clearProps:'all'});
    // floating dashboard chips
    gsap.to('.chip-a',{y:-9,repeat:-1,yoyo:true,duration:2.4,ease:'sine.inOut'});
    gsap.to('.chip-b',{y:9,repeat:-1,yoyo:true,duration:2.8,ease:'sine.inOut'});
    // chart bars grow on view
    document.querySelectorAll('.dash-bars').forEach(b=>{
      gsap.from(b.children,{scaleY:0,transformOrigin:'bottom',duration:.7,stagger:.06,ease:'power2.out',
        scrollTrigger:{trigger:b,start:'top 88%'}});
    });
    // stat counters
    document.querySelectorAll('.stat b,.fstat b,.retention b').forEach(el=>{
      const m=el.textContent.trim().match(/^(\d+)(.*)$/);
      if(!m)return;
      const end=+m[1],suf=m[2],o={v:0};
      gsap.to(o,{v:end,duration:1.4,ease:'power1.out',
        scrollTrigger:{trigger:el,start:'top 90%'},
        onUpdate:()=>{el.textContent=Math.round(o.v)+suf}});
    });
    // gentle parallax on section radial glows
    document.querySelectorAll('.audit,.app-spot').forEach(el=>{
      gsap.fromTo(el,{y:26},{y:-10,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}});
    });
  }
})();
