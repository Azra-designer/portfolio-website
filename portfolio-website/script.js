const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.w + '%');
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-grid').forEach(s => skillObs.observe(s));
document.querySelectorAll('.skill-fill').forEach(b => b.style.width = '0');