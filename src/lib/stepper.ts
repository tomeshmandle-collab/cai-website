/**
 * Initializes the stepper navigation.
 * Uses IntersectionObserver to highlight the section closest to the center of the viewport.
 * Handles smooth scrolling on click.
 */
export function initStepper() {
  const links = document.querySelectorAll<HTMLAnchorElement>('.stepper-link');
  if (links.length === 0) return;

  const sections = Array.from(links).map((link) => {
    const id = link.getAttribute('href')?.substring(1);
    return id ? document.getElementById(id) : null;
  }).filter((section): section is HTMLElement => section !== null);

  const updateActiveStep = () => {
    let closestSection: HTMLElement | null = null;
    let minDistance = Infinity;
    const viewportCenter = window.innerHeight / 2;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - sectionCenter);
      
      // We also consider it active if the top of the section is near the top of the screen
      // or if it's currently occupying the majority of the screen.
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (closestSection) {
      const activeId = closestSection.id;
      links.forEach((link) => {
        if (link.dataset.step === activeId) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'step');
        } else {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        }
      });
      
      // Optionally update hash without jumping
      if (window.history.replaceState && window.location.hash !== `#${activeId}`) {
        window.history.replaceState(null, '', `#${activeId}`);
      }
    }
  };

  // Use IntersectionObserver to broadly detect which sections are in view
  const observer = new IntersectionObserver(
    () => {
      updateActiveStep();
    },
    {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));

  // Update on scroll/resize just in case
  window.addEventListener('scroll', updateActiveStep, { passive: true });
  window.addEventListener('resize', updateActiveStep, { passive: true });

  // Handle clicks for smooth scrolling
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.substring(1);
      if (!targetId) return;
      
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        targetSection.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
        
        // Update hash
        if (window.history.pushState) {
          window.history.pushState(null, '', `#${targetId}`);
        }
      }
    });
  });

  // Initial check
  updateActiveStep();
}
