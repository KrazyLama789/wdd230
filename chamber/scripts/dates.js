// Timestamp of last updated.
document.querySelector(".lastupdated").textContent = "Last Updated: " + document.lastModified;


// Current year
const date = new Date();
const year = date.getFullYear();
document.querySelector(".currentyear").textContent = year;

// Date string (DoW, Day Mon Ynum)
const datefield = document.querySelector(".date").textContent = new Intl.DateTimeFormat("en-UK", {
  dateStyle: "full",
}).format(date);

// Toggles weekly banner
function toggleBanner() {
  document.querySelector("#weekly-banner").classList.toggle("open");
}
const day = date.getDay();
if (day == 1 || day == 2) {
  toggleBanner();
}

// Visit info.
const visDisplay = document.querySelector(".visits");

let numVis = Number(window.localStorage.getItem("visits-ls"));

if (numVis !== 0) {
  visDisplay.textContent = "Number of Visits: " + numVis;
} else {
  visDisplay.textContent = "Welcome, New User! ";
};

numVis++;
localStorage.setItem("visits-ls", numVis); 