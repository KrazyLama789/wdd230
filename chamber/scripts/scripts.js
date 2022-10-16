function toggleMenu() {
  document.querySelector("#primary-nav").classList.toggle("open");
  document.querySelector("#hamburger-button").classList.toggle("open");
}

const x = document.querySelector("#hamburger-button");

x.onclick = toggleMenu;
