// Timestamp of last updated.
document.querySelector(".lastupdated").textContent = document.lastModified;

// Current year
const date = new Date();
const year = date.getFullYear();
document.querySelector(".currentyear").textContent = year;

// Date string (DoW, Day Mon Ynum)
const datefield = document.querySelector(".date").textContent = new Intl.DateTimeFormat("en-UK", {
  dateStyle: "full",
}).format(date);

