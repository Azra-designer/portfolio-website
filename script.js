// Scroll reveal animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { 
    if(e.isIntersecting) e.target.classList.add('on'); 
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

// Skill bar animation
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(s => skillObs.observe(s));

// Fixed: Hamburger menu logic
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Function to close menu when link is clicked
function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Close on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});