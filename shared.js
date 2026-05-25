// Sanova Umwelttechnik – Shared JS
const CB_KEY = 'sanova_consent';

// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', () => nav.classList.toggle('sc', window.scrollY > 60));

// Hamburger menu
const ham = document.getElementById('n-ham');
const mob = document.getElementById('n-mob');
if (ham && mob) {
  ham.addEventListener('click', e => {
    e.stopPropagation();
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
  }));
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !mob.contains(e.target)) {
      ham.classList.remove('open');
      mob.classList.remove('open');
    }
  });
  // Auto-mark active link in mobile nav
  const page = location.pathname.split('/').pop() || 'index.html';
  mob.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const sibs = [...e.target.parentElement.querySelectorAll('.rv:not(.vis)')];
      setTimeout(() => e.target.classList.add('vis'), sibs.indexOf(e.target) * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Google Fonts loader
function loadFonts() {
  if (document.querySelector('link[data-gf]')) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet'; l.dataset.gf = '1';
  l.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap';
  document.head.appendChild(l);
}

// Cookie banner
function acceptCookies() {
  localStorage.setItem(CB_KEY, 'ok');
  hideCB(); loadFonts();
}
function rejectCookies() {
  localStorage.setItem(CB_KEY, 'no');
  hideCB();
}
function hideCB() {
  const cb = document.getElementById('cb');
  if (cb) cb.classList.remove('show');
}

const consent = localStorage.getItem(CB_KEY);
if (consent === 'ok') {
  loadFonts();
} else if (!consent) {
  setTimeout(() => {
    const cb = document.getElementById('cb');
    if (cb) cb.classList.add('show');
  }, 700);
}
