// Mobile menu. Without JS the nav links just stay visible.
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-button');
const navLinks = document.getElementById('nav-links');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navLinks.classList.toggle('is-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

// close it after picking a section, since the links jump down the page
navLinks.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});

// Virality guide code box. The code itself isn't stored here, only its SHA-256
// hash, so it can't be read out of the page source. This keeps casual visitors
// out; it isn't real security, since the guide page is still a public file.
const codeForm = document.getElementById('code-form');

if (codeForm) {
  const CODE_HASH = '683c4c5f020902bee2ac5a0d6d9aef3aa64f1967bcb4024ecbbb32b6ee7c4243';
  const codeInput = document.getElementById('code-input');
  const codeError = document.getElementById('code-error');

  async function sha256(text) {
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  }

  codeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = codeInput.value.trim().toLowerCase();
    if (await sha256(code) === CODE_HASH) {
      window.location.href = '/virality/';
    } else {
      codeError.hidden = false;
      codeInput.select();
    }
  });
}
