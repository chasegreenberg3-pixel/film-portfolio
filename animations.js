/* ============================================
   ANIMATIONS - Chase Greenberg Film Portfolio
   ============================================ */

// --- 3. Fade-in on scroll ---
function initScrollFade() {
  const elements = document.querySelectorAll('.card, .quote-card, .film-card, .forum-post, .about-grid, .resume-section, .interview-item, .form-container');
  elements.forEach(el => {
    el.classList.add('fade-target');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-target').forEach(el => observer.observe(el));
}

// --- 4. Typewriter effect for page titles ---
function initTypewriter() {
  const heading = document.querySelector('.page-header h1');
  if (!heading) return;

  const text = heading.textContent;
  heading.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-caret">|</span>';
  const textSpan = heading.querySelector('.typewriter-text');
  const caret = heading.querySelector('.typewriter-caret');

  let i = 0;
  function type() {
    if (i < text.length) {
      textSpan.textContent += text.charAt(i);
      i++;
      setTimeout(type, 60);
    } else {
      caret.style.display = 'none';
    }
  }
  setTimeout(type, 300);
}

// --- 9. Film countdown on home page ---
function initCountdown() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Hide hero content initially
  hero.style.visibility = 'hidden';

  const overlay = document.createElement('div');
  overlay.className = 'countdown-overlay';
  document.body.appendChild(overlay);

  const numEl = document.createElement('div');
  numEl.className = 'countdown-number';
  overlay.appendChild(numEl);

  const circle = document.createElement('div');
  circle.className = 'countdown-circle';
  overlay.appendChild(circle);

  const sequence = [
    { text: '3', delay: 450 },
    { text: '2', delay: 450 },
    { text: '1', delay: 450 },
    { text: 'ACTION', delay: 1000 },
  ];

  let idx = 0;

  function showNext() {
    if (idx >= sequence.length) {
      overlay.classList.add('countdown-fade-out');
      hero.style.visibility = 'visible';
      hero.classList.add('hero-reveal');
      setTimeout(() => overlay.remove(), 600);
      return;
    }

    const step = sequence[idx];

    numEl.textContent = step.text;
    numEl.classList.remove('countdown-pop');
    void numEl.offsetWidth;
    numEl.classList.add('countdown-pop');

    if (step.text === 'ACTION') {
      numEl.classList.add('action-text');
    } else {
      numEl.classList.remove('action-text');
    }

    circle.classList.remove('countdown-circle-animate');
    void circle.offsetWidth;
    circle.classList.add('countdown-circle-animate');

    idx++;
    setTimeout(showNext, step.delay);
  }

  showNext();
}

// --- 10. Smooth page transitions ---
function initPageTransitions() {
  // On home page, countdown handles the reveal. Other pages get a fade-in.
  if (!document.querySelector('.hero')) {
    document.body.style.opacity = '0';
    document.body.classList.add('page-entering');
  }

  // Intercept internal links
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('#') || link.getAttribute('target') === '_blank') return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

// --- Initialize all ---

// Run countdown ASAP for home page — don't wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  initPageTransitions();
  initScrollFade();

  if (!document.querySelector('.hero')) {
    initTypewriter();
  }

  // Countdown is handled inline in index.html
});
