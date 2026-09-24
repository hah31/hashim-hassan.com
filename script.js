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
