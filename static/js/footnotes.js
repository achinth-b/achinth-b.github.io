// Footnote separator - adds commas between adjacent footnote references
document.addEventListener('DOMContentLoaded', function () {
  // Find all sup elements that contain a footnote-ref anchor
  const footnoteSupElements = document.querySelectorAll('sup:has(a.footnote-ref)');

  footnoteSupElements.forEach((sup) => {
    // Check if the previous sibling element is also a sup with a footnote-ref
    const prev = sup.previousElementSibling;
    if (prev && prev.tagName === 'SUP' && prev.querySelector('a.footnote-ref')) {
      // Insert a comma before this footnote
      const comma = document.createElement('sup');
      comma.textContent = ', ';
      comma.className = 'footnote-separator';
      comma.style.color = '#888';
      sup.parentNode.insertBefore(comma, sup);
    }
  });
});
