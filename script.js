// Basic helper
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Drawer open/close
const menuBtn = document.querySelector('.menu-btn');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawerOverlay');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    drawer.setAttribute('aria-hidden', String(!drawer.classList.contains('active')));
  });
}
if (overlay) {
  overlay.addEventListener('click', () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
  });
}

// Close drawer when clicking a drawer link and smooth scroll
document.querySelectorAll('.drawer-link').forEach(a => {
  a.addEventListener('click', (e) => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// Fill year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// STAR POP: when any element with .star-btn is clicked, create a star near the element
function createStar(x, y) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = x + 'px';
  s.style.top = y + 'px';
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 900);
}

// Attach star effect to buttons (only on star-btn)
document.addEventListener('click', function (e) {
  const el = e.target.closest('.star-btn');
  if (!el) return;
  // compute a point slightly above the element center for nicer animation
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2 + window.scrollX;
  const y = rect.top + rect.height * 0.3 + window.scrollY;
  createStar(x, y);
});

// Optional: prompt install (PWA) — gentle hint only
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('installBtn');
  if (installBtn) installBtn.style.display = 'inline-block';
});
document.getElementById('installBtn')?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('installBtn').style.display = 'none';
});
