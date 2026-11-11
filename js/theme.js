/* ==========================================================================
   Theme Module (js/theme.js)
   Manages Light/Dark Mode state on [data-bs-theme] and localStorage persistence
   ========================================================================== */

function applyTheme(theme) {
  const root = document.documentElement;
  const next = theme === 'dark' ? 'dark' : 'light';
  root.setAttribute('data-bs-theme', next);
  const labelEl = document.getElementById('themeToggleLabel');
  if (labelEl) {
    labelEl.textContent = next === 'dark' ? 'Light' : 'Dark';
  }
  try {
    localStorage.setItem('s24u-theme', next);
  } catch (e) {
    // Ignore storage errors in restricted environments
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function initTheme() {
  try {
    const savedTheme = localStorage.getItem('s24u-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      applyTheme(savedTheme);
    }
  } catch (e) {}
}

