// Minimal horizontal carousel with scroll-snap + buttons + dots
(() => {
  function initCarousel(root) {
    const track = root.querySelector('.carousel-track');
    const slides = Array.from(root.querySelectorAll('.carousel-slide'));
    const prevBtn = root.querySelector('.carousel-btn.prev');
    const nextBtn = root.querySelector('.carousel-btn.next');
    const dotsWrap = root.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    const multiview = root.classList.contains('multiview');
    const continuous = root.classList.contains('continuous');
    let index = 0;
    let slideW = 0;
    let pageCount = slides.length;

    function setSizes() {
      const w = track.clientWidth;
      if (multiview) {
        const cols = Math.max(1, parseInt(root.dataset.cols || '3', 10));
        slideW = Math.max(200, Math.floor(w / cols));
        Array.from(track.children).forEach(s => (s.style.width = slideW + 'px'));
        pageCount = Math.max(1, Math.ceil(slides.length / cols));
        const target = Math.min(track.scrollWidth - w, index * slideW);
        track.scrollTo({ left: target, top: 0, behavior: 'auto' });
      } else {
        slideW = w;
        Array.from(track.children).forEach(s => (s.style.width = w + 'px'));
        pageCount = slides.length;
        track.scrollTo({ left: index * w, top: 0, behavior: 'auto' });
      }
    }

    function goTo(i) {
      if (multiview) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const target = Math.max(0, Math.min(i * slideW, maxScroll));
        index = Math.round(target / Math.max(1, slideW));
        track.scrollTo({ left: target, top: 0, behavior: 'smooth' });
      } else {
        index = Math.max(0, Math.min(i, slides.length - 1));
        const w = track.clientWidth;
        track.scrollTo({ left: index * w, top: 0, behavior: 'smooth' });
      }
      updateDots();
    }

    function updateDots() {
      const buttons = dotsWrap.querySelectorAll('button');
      buttons.forEach((b, i) => b.classList.toggle('active', i === Math.min(index, buttons.length - 1)));
    }

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      const dotsTotal = multiview ? Math.max(1, pageCount) : slides.length;
      for (let i = 0; i < dotsTotal; i += 1) {
        const b = document.createElement('button');
        b.type = 'button';
        b.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(b);
      }
    };
    buildDots();

    prevBtn && prevBtn.addEventListener('click', () => goTo(Math.max(0, index - 1)));
    nextBtn && nextBtn.addEventListener('click', () => goTo(index + 1));

    track.addEventListener('scroll', () => {
      const denom = Math.max(1, slideW);
      const i = Math.round(track.scrollLeft / denom);
      if (i !== index) { index = i; updateDots(); }
    }, { passive: true });

    window.addEventListener('resize', () => { setSizes(); buildDots(); updateDots(); });
    setSizes();
    updateDots();
    
    // Simple autoplay for non-continuous mode
    const autoplayMs = parseInt(root.dataset.autoplay || '0', 10);
    let timer = null;

    const start = () => {
      if (timer || autoplayMs <= 0) return;
      timer = setInterval(() => {
        const next = (index + 1) % slides.length;
        goTo(next);
      }, autoplayMs);
    };
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };
    
    // Simple hover behavior
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('touchstart', stop, { passive: true });
    root.addEventListener('touchend', start, { passive: true });
    
    start();
  }

  function initAll() {
    document.querySelectorAll('.carousel').forEach(initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
})();


