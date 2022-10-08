function toggleMenu() {
    console.log('it worked')
    document.querySelector("#primaryNav").classList.toggle("open");
    document.querySelector("#hamburgerButton").classList.toggle("open");
}

const x = document.querySelector("#hamburgerButton");

x.onclick = toggleMenu;