// Timestamp of last updated.
document.querySelector(".lastupdated").textContent =
  "Last Updated: " + document.lastModified;

// Current year
const date = new Date();
const year = date.getFullYear();
document.querySelector(".currentyear").textContent = year;

// Date string (DoW, Day Mon Ynum)
const datefield = (document.querySelector(".date").textContent =
  new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full",
  }).format(date));

// Toggles weekly banner
function toggleBanner() {
  document.querySelector("#weekly-banner").classList.toggle("open");
}
const day = date.getDay();
if (day == 1 || day == 2) {
  toggleBanner();
}

// Last visited
const visDisplay = document.querySelector(".visited");

// Checks to see if there is a place to display the info befor calculating it.
if (visDisplay != null) {
  if (window.localStorage.getItem("last-vis") == null) {
    localStorage.setItem("last-vis", date);
  }

  // Borrowed function to get date difference.
  function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  const lastVis = Number(getNumberOfDays(window.localStorage.getItem("last-vis"), date));

  visDisplay.textContent = `You last visited ${lastVis} days ago.`;
}

// Adds date to hidden form
const hidden = document.querySelector('.hidden');

if (hidden != null) {
  hidden.textContent = date;
  console.log('worked')
}