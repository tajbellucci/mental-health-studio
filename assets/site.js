// sticky nav border
const _nav=document.getElementById('nav');
if(_nav)addEventListener('scroll',()=>_nav.classList.toggle('scrolled',scrollY>10),{passive:true});

// scroll reveal (+ expertise bars animate when score card enters)
const _io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');_io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal,#score').forEach(el=>_io.observe(el));
