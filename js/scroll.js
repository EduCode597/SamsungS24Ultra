/* ==========================================================================
   Smooth Scroll Module (js/scroll.js)
   Cubic ease-out smooth scrolling with sticky #siteHeader offset compensation
   ========================================================================== */

function smoothScrollTo(targetSelector) {
  if (!targetSelector || targetSelector === '#') return false;
  const target = document.querySelector(targetSelector);
  if (!target) return false;

  const headerEl = document.getElementById('siteHeader');
  const headerOffset = headerEl ? headerEl.offsetHeight : 0;
  const startY = window.scrollY || window.pageYOffset || 0;
  const targetY = Math.max(0, startY + target.getBoundingClientRect().top - headerOffset);
  const distance = targetY - startY;
  const duration = 600;
  const nowFn = (typeof performance !== 'undefined' && performance.now) ? () => performance.now() : () => Date.now();
  const rafFn = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (cb) => setTimeout(() => cb(nowFn()), 16);
  const startTime = nowFn();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo({ top: Math.round(startY + distance * eased), behavior: 'auto' });
    if (progress < 1) {
      rafFn(step);
    }
  }

  rafFn(step);
  return true;
}

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (smoothScrollTo(href)) {
        e.preventDefault();
      }
    });
  });
}

