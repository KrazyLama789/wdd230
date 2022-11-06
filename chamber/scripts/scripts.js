function toggleMenu() {
  document.querySelector("#primary-nav").classList.toggle("open");
  document.querySelector("#hamburger-button").classList.toggle("open");
}

const ham = document.querySelector("#hamburger-button");
ham.onclick = toggleMenu;

const x = document.querySelector(".exit");

x.addEventListener('click', () => {
  document.querySelector("#last-visited").style.display = "none"
});
