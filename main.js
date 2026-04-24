/* =============================================
   Obitura – main.js
   ============================================= */

/* --- Copyright year --- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* --- Mobile nav toggle --- */
const toggle   = document.getElementById('nav-toggle');
const navList  = document.getElementById('nav-list');

if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when a link is clicked
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --- Sticky header shadow --- */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 20
      ? 'rgba(10,10,15,.95)'
      : 'rgba(10,10,15,.7)';
  }, { passive: true });
}

/* --- Contact form --- */
const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form && formStatus) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      formStatus.style.color = '#f87171';
      formStatus.textContent = 'Please fill in all fields.';
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      formStatus.style.color = '#f87171';
      formStatus.textContent = 'Please enter a valid email address.';
      return;
    }

    // Simulate submission (replace with real fetch/API call)
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Sending…';

    setTimeout(() => {
      formStatus.style.color = '#22c55e';
      formStatus.textContent = '✓ Message sent! We\'ll be in touch soon.';
      form.reset();
      submit.disabled = false;
      submit.textContent = 'Send message';
    }, 1200);
  });
}

/* --- Intersection Observer fade-in --- */
const fadeEls = document.querySelectorAll(
  '.feature-card, .testimonial-card, .stat-block, .about__text, .contact__form, .contact__text'
);

if ('IntersectionObserver' in window && fadeEls.length) {
  // Set initial state via JS so users without JS see content normally
  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeEls.forEach(el => observer.observe(el));
}
