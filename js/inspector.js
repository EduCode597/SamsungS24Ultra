/* ==========================================================================
   Hardware Angle Inspector Module (js/inspector.js)
   Manages angle selection and ArrowLeft/ArrowRight keyboard navigation
   ========================================================================== */

function inspectAngle(btn) {
  if (!btn || !btn.dataset) return;
  const imgEl = document.getElementById('inspectorImg');
  const codeEl = document.getElementById('inspectorCode');
  const specEl = document.getElementById('inspectorSpec');

  if (imgEl && btn.dataset.img) {
    imgEl.src = btn.dataset.img;
    imgEl.alt = 'Samsung Galaxy S24 Ultra ' + (btn.dataset.code || '');
  }
  if (codeEl && btn.dataset.code) {
    codeEl.textContent = btn.dataset.code;
  }
  if (specEl && btn.dataset.spec) {
    specEl.textContent = btn.dataset.spec;
  }

  const tabs = document.querySelectorAll('.inspector-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
}

function initInspectorKeyboard() {
  const tabs = Array.from(document.querySelectorAll('.inspector-tab'));
  tabs.forEach((tab, idx) => {
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const nextIdx = (idx + dir + tabs.length) % tabs.length;
        tabs[nextIdx].focus();
        inspectAngle(tabs[nextIdx]);
      }
    });
  });
}

