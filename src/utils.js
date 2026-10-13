// =========================================================
//  AARANYA — Toast notification utility
// =========================================================

export function showToast(message, icon = '✦', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<span class="toast-icon" aria-hidden="true">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// =========================================================
//  AARANYA — Scroll reveal observer
// =========================================================

export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => observer.observe(el));
}

// =========================================================
//  AARANYA — Image lazy loading with blur-up
// =========================================================

export function initLazyImages() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
          }
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '200px' }
  );

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

// =========================================================
//  AARANYA — Modal utility
// =========================================================

export function createModal({ title, content, className = '' }) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay ' + className;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title);

  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="title" style="font-size:1.4rem;">${title}</h3>
        <button class="modal-close" aria-label="Close modal">×</button>
      </div>
      <div class="modal-body">${content}</div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add('open'));
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 300);
  }

  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', handler); }
  });

  return { overlay, closeModal };
}

// =========================================================
//  AARANYA — Currency formatter
// =========================================================

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// =========================================================
//  Star rating renderer
// =========================================================

export function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    '★'.repeat(full) +
    (half ? '½' : '') +
    '☆'.repeat(empty)
  );
}

// =========================================================
//  Debounce
// =========================================================

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Global exposure for dynamic components
if (typeof window !== 'undefined') {
  window._aaranyaUtils = {
    showToast,
    initScrollReveal,
    initLazyImages,
    createModal,
    formatINR,
    renderStars,
    debounce,
  };
}
