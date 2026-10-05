// src/scripts/header.ts
export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  const isTransparent = header.hasAttribute('data-transparent-header');
  if (!isTransparent) {
    header.classList.add('header--scrolled');
    return;
  }

  function onScroll() {
    if (window.scrollY > 20) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
}
