// src/scripts/dropdown.ts
export function initDropdown() {
  const trigger = document.querySelector<HTMLButtonElement>('[data-dropdown-trigger]');
  const menu = document.querySelector<HTMLElement>('[data-dropdown-menu]');
  const chevron = document.querySelector<HTMLElement>('[data-dropdown-chevron]');

  if (!trigger || !menu) return;

  function openDropdown() {
    trigger?.setAttribute('aria-expanded', 'true');
    menu?.removeAttribute('hidden');
    chevron?.style.setProperty('transform', 'rotate(180deg)');
  }

  function closeDropdown(returnFocus = false) {
    trigger?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('hidden', '');
    chevron?.style.setProperty('transform', 'rotate(0deg)');
    if (returnFocus) {
      trigger?.focus();
    }
  }

  function toggleDropdown() {
    const isExpanded = trigger?.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openDropdown();
      const firstLink = menu.querySelector<HTMLAnchorElement>('a');
      firstLink?.focus();
    }
  });

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown(true);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
      closeDropdown(true);
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target as Node | null;
    if (trigger.getAttribute('aria-expanded') === 'true' && target && !trigger.contains(target) && !menu.contains(target)) {
      closeDropdown();
    }
  });

  // Close when focus moves outside dropdown and trigger
  document.addEventListener('focusin', (e) => {
    const target = e.target as Node | null;
    if (
      trigger.getAttribute('aria-expanded') === 'true' &&
      target &&
      !trigger.contains(target) &&
      !menu.contains(target)
    ) {
      closeDropdown();
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
}
