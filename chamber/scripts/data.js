const cards = document.querySelector(".cards");

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector(".directory");

const spots = [document.querySelector("#spot1"), document.querySelector("#spot2"), document.querySelector("#spot3")];
let uppermembers = [];

fetch("json/data.json")
  .then((response) => response.json())
  .then(function (jsonObject) {
    const businesses = jsonObject["businesses"];
    console.table(jsonObject); // temporary checking for valid response and data parsing
    if (cards != null) {
      businesses.forEach(displayBusinesses);
    }
    if (spot1 != null) {
      businesses.forEach(gatherSpotlights);
      for (let i = 0; i < 3; i++) {
        displaySpotlights(uppermembers, i);
      }
    }
  });

function gatherSpotlights(business) {
  if (business.memberlevel > 1) {
    uppermembers.push(business);
  }
}
function displaySpotlights(members, i) {
  const index = Math.floor(Math.random() * members.length);
  const business = members[index]
  if (index > -1) { // only splice array when item is found
    members.splice(index, 1); // 2nd parameter means remove one item only
  }
  const name = document.createElement("h2");
  const line = document.createElement('hr');
  const phonenumber = document.createElement("p");
  const weburl = document.createElement("a");

  name.textContent = business.name;
  phonenumber.textContent = business.phonenumber;
  weburl.textContent = business.weburl;
  
  spots[i].appendChild(name);
  spots[i].appendChild(line);
  spots[i].appendChild(phonenumber);
  spots[i].appendChild(weburl);
}

function displayBusinesses(business) {
  // Elements to be added to doc
  const card = document.createElement("article");
  const company = document.createElement("h2");
  const logo = document.createElement("img");
  const address = document.createElement("p");
  const phonenumber = document.createElement("p");
  const weburl = document.createElement("a");

  // Set values to the new text elements
  company.textContent = business.name;
  address.textContent = business.address;
  phonenumber.textContent = business.phonenumber;
  weburl.textContent = business.weburl;
  weburl.setAttribute("href", business.weburl);

  // Set values of logos and images
  logo.setAttribute("src", business.logoimage);
  logo.setAttribute("alt", `Logo for ${business.name}`);
  logo.setAttribute("loading", "lazy");

  // Append new sub-elements to card
  card.appendChild(company);
  card.appendChild(logo);
  card.appendChild(address);
  card.appendChild(phonenumber);
  card.appendChild(weburl);

  // Append card to doccument
  cards.appendChild(card);
}

if (display != null) {
  gridbutton.addEventListener("click", () => {
    display.classList.add("directory");
    display.classList.remove("list");
  });
  listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("directory");
  });
}
