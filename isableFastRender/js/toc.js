// Table of Contents collapse/expand functionality
document.addEventListener('DOMContentLoaded', function() {
  const tocToggle = document.getElementById('toc-toggle');
  const tocContent = document.getElementById('toc-content');
  const toc = document.getElementById('toc');
  
  if (tocToggle && tocContent) {
    // Collapse on mobile by default
    if (window.innerWidth <= 600) {
      tocContent.style.display = 'none';
      tocToggle.setAttribute('aria-expanded', 'false');
      toc.classList.add('collapsed');
    }
    
    tocToggle.addEventListener('click', function() {
      const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        tocContent.style.display = 'none';
        tocToggle.setAttribute('aria-expanded', 'false');
        toc.classList.add('collapsed');
      } else {
        tocContent.style.display = 'block';
        tocToggle.setAttribute('aria-expanded', 'true');
        toc.classList.remove('collapsed');
      }
    });
  }
});
