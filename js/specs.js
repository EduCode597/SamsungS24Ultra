/* ==========================================================================
   Specifications & Gallery Counter Module (js/specs.js)
   Manages 3-Cluster Specification filtering and Carousel slide counter
   ========================================================================== */

function filterSpecs(category, btn) {
  const clusters = document.querySelectorAll('.spec-cluster-col');
  clusters.forEach(col => {
    const match = category === 'all' || (col.dataset && col.dataset.cluster === category);
    if (match) {
      col.classList.remove('d-none');
    } else {
      col.classList.add('d-none');
    }
  });

  const buttons = document.querySelectorAll('.spec-filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn && btn.classList) {
    btn.classList.add('active');
  }
}

function initCarouselCounter() {
  const carouselEl = document.getElementById('featureCarousel');
  const counterEl = document.getElementById('carouselCounter');
  if (carouselEl && counterEl) {
    carouselEl.addEventListener('slid.bs.carousel', function (event) {
      const slideNum = String((event.to || 0) + 1).padStart(2, '0');
      counterEl.textContent = slideNum + ' / 04';
    });
  }
}

