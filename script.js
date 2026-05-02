
const hbg=document.getElementById('hbg'),nl=document.getElementById('nl');
hbg.addEventListener('click',()=>nl.classList.toggle('open'));
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
    nl.classList.remove('open');
  });
});
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const secs=document.querySelectorAll('section[id]'),nas=document.querySelectorAll('.nl a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});
  nas.forEach(a=>{a.classList.remove('active');if(a.getAttribute('href')==='#'+cur)a.classList.add('active');});
});

const lb=document.getElementById('lb');
const lbImg=document.getElementById('lbImg');
document.getElementById('lbClose').addEventListener('click',()=>lb.classList.remove('open'));
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});
document.querySelectorAll('.gthumb img,.shthumb img').forEach(img=>{
  img.style.cursor='zoom-in';
  img.addEventListener('click',()=>{
    lbImg.src=img.src;
    lb.classList.add('open');
  });
});