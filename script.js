/* ============================================================
   PORTFOLIO — Ridwan Maulana Kholiq
   script.js
   ============================================================ */

/* ============================================================
   1. DYNAMIC FOOTER YEAR
   ============================================================ */
const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* ============================================================
   2. DARK / LIGHT MODE TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const body        = document.body;

// Load saved theme from localStorage (default: dark)
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  }
  localStorage.setItem('theme', theme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode');
    applyTheme(isLight ? 'dark' : 'light');
  });
}

/* ============================================================
   3. HAMBURGER MENU (Mobile)
   ============================================================ */
const hamburger     = document.getElementById('hamburger');
const navLinks      = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  navLinks.classList.add('open');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent scroll behind overlay
}

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });
}

// Close when overlay clicked
if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMenu);
}

// Close when a nav link is clicked (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) closeMenu();
  });
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ============================================================
   4. ACTIVE NAV HIGHLIGHT ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id], div.hero');
const navLinkEls = document.querySelectorAll('.nav-link');

// Map section id → nav link
function getNavLink(id) {
  return document.querySelector(`.nav-link[href="#${id}"]`);
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all
        navLinkEls.forEach(l => l.classList.remove('active'));

        const id = entry.target.id || 'hero';
        const activeLink = getNavLink(id);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px', // trigger when section is roughly in center
    threshold: 0
  }
);

sections.forEach(sec => {
  // The hero div doesn't have an id; skip or add
  if (sec.id) sectionObserver.observe(sec);
});

/* ============================================================
   5. SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        // Stop observing after reveal to save resources
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

const revealTargets = document.querySelectorAll(
  '.skill-card, .project-card, .edu-card, .contact-card, .cert-card'
);
revealTargets.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s';
  revealObserver.observe(el);
});

/* ============================================================
   6. TYPEWRITER EFFECT
   ============================================================ */
const TITLES = [
  'IoT Engineer',
  'Embedded Developer',
  'Energy Monitoring',
  'ESP32 Enthusiast'
];

let titleIndex = 0;
let charIndex  = 0;
let isDeleting = false;

const titleEl = document.querySelector('.hero-title');

function typeWriter() {
  if (!titleEl) return; // safety check

  const currentTitle = TITLES[titleIndex];

  if (!isDeleting) {
    titleEl.innerHTML = `// ${currentTitle.slice(0, charIndex + 1)}<span class="cursor"></span>`;
    charIndex++;

    if (charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    titleEl.innerHTML = `// ${currentTitle.slice(0, charIndex - 1)}<span class="cursor"></span>`;
    charIndex--;

    if (charIndex === 0) {
      isDeleting  = false;
      titleIndex  = (titleIndex + 1) % TITLES.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeWriter, speed);
}

// Start typewriter after initial delay
setTimeout(typeWriter, 1000);