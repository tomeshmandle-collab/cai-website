export function initCarousel() {
  const carousels = document.querySelectorAll('[data-carousel]');
  
  carousels.forEach(carousel => {
    const viewport = carousel.querySelector('.carousel-viewport') as HTMLElement;
    const track = carousel.querySelector('.carousel-track') as HTMLElement;
    const prevBtn = carousel.querySelector('.carousel-btn.prev') as HTMLButtonElement;
    const nextBtn = carousel.querySelector('.carousel-btn.next') as HTMLButtonElement;
    const dots = carousel.querySelectorAll('.dot');
    
    if (!viewport || !track) return;
    
    const items = Array.from(track.children) as HTMLElement[];
    if (items.length === 0) return;
    
    // Function to update buttons and dots state
    const updateState = () => {
      if (!prevBtn || !nextBtn) return;
      
      const scrollLeft = viewport.scrollLeft;
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
      
      // Update buttons
      prevBtn.disabled = scrollLeft <= 0;
      nextBtn.disabled = scrollLeft >= maxScrollLeft - 1; // -1 for rounding errors
      
      // Update dots
      // Find the index of the item that is closest to the left edge of the viewport
      let activeIndex = 0;
      let minDistance = Infinity;
      
      items.forEach((item, index) => {
        const itemLeft = item.offsetLeft - track.offsetLeft; // relative to track
        const distance = Math.abs(itemLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });
      
      dots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });
    };
    
    // Initial state
    updateState();
    
    // Listen to scroll events
    viewport.addEventListener('scroll', () => {
      // Use requestAnimationFrame for performance
      window.requestAnimationFrame(updateState);
    });
    
    // Button clicks
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const itemWidth = items[0].offsetWidth;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        const scrollAmount = itemWidth + gap;
        viewport.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const itemWidth = items[0].offsetWidth;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        const scrollAmount = itemWidth + gap;
        viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });
}
