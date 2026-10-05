// src/scripts/menu.ts
export function initMobileMenu() {
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  const overlay = document.querySelector<HTMLElement>('[data-menu-overlay]');
  const moreToggle = document.querySelector<HTMLButtonElement>('[data-menu-more-toggle]');
  const moreSubmenu = document.querySelector<HTMLElement>('[data-menu-more-submenu]');
  const moreChevron = document.querySelector<HTMLElement>('[data-menu-more-chevron]');

  if (!openBtn || !overlay) return;

  let previousActiveElement: HTMLElement | null = null;

  function openMenu() {
    previousActiveElement = document.activeElement as HTMLElement | null;
    overlay?.removeAttribute('hidden');
    overlay?.setAttribute('aria-hidden', 'false');
    openBtn?.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Focus close button or first interactive element inside menu
    closeBtn?.focus();
  }

  function closeMenu() {
    overlay?.setAttribute('hidden', '');
    overlay?.setAttribute('aria-hidden', 'true');
    openBtn?.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    if (previousActiveElement) {
      previousActiveElement.focus();
    } else {
      openBtn?.focus();
    }
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  // Close on Escape
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
    }

    // Focus trap
    if (e.key === 'Tab') {
      const focusableElements = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const visibleFocusables = Array.from(focusableElements).filter(
        (el) => el.offsetParent !== null || el.getClientRects().length > 0
      );

      if (visibleFocusables.length === 0) return;

      const firstElement = visibleFocusables[0];
      const lastElement = visibleFocusables[visibleFocusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // Inline "More" expand
  if (moreToggle && moreSubmenu) {
    moreToggle.addEventListener('click', () => {
      const isExpanded = moreToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        moreToggle.setAttribute('aria-expanded', 'false');
        moreSubmenu.setAttribute('hidden', '');
        moreChevron?.style.setProperty('transform', 'rotate(0deg)');
      } else {
        moreToggle.setAttribute('aria-expanded', 'true');
        moreSubmenu.removeAttribute('hidden');
        moreChevron?.style.setProperty('transform', 'rotate(180deg)');
      }
    });
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
}
