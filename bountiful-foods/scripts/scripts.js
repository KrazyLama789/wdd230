// Timestamp of last updated.
document.querySelector(".lastupdated").textContent = document.lastModified;

// Weather Information.
const weathercard = document.querySelector("#weather");
if (weathercard != null) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=9142126509452033b4de92f3c993180f&units=imperial";

  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayWeather(data);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.log(error);
    }
  }

  apiFetch();

  // Update Weather Info
  function displayWeather(weatherData) {
    const weatherdiv = document.createElement("div");
    weatherdiv.setAttribute("id", "currweather");

    // Weather Icon
    const weathericon = document.createElement("img");
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    weathericon.setAttribute("src", iconsrc);
    weathericon.setAttribute("class", "weathericon");
    weatherdiv.appendChild(weathericon);

    // Temp
    const tempelement = document.createElement("p");
    const temp = weatherData.main.temp;
    tempelement.textContent = `${Math.round(temp)}°`;
    weatherdiv.appendChild(tempelement);

    // Humidity
    const humidityelement = document.createElement("p");
    const humidity = weatherData.main.humidity;
    humidityelement.textContent = `Humidity: ${humidity}%`;

    // Forcast Description
    const descriptionelement = document.createElement("p");
    const description = weatherData.weather[0].description;
    descriptionelement.textContent = description;
    weathericon.setAttribute("alt", description);

    const threedaydiv = document.createElement("div");
    threedaydiv.setAttribute("id", "threeday");

    weathercard.appendChild(weatherdiv);
    weathercard.appendChild(humidityelement);
    weathercard.appendChild(document.createElement("hr"));
    weathercard.appendChild(descriptionelement);
    weathercard.appendChild(document.createElement("hr"));
  }
}

// Locations
const locationsection = document.querySelector('#locations');

if (locationsection != null) {
  fetch("scripts/data.json")
  .then((response) => response.json())
  .then(function (jsonObject) {
    const locationlist = jsonObject["locations"];
    console.table(jsonObject); // temporary checking for valid response and data parsing

    locationlist.forEach(displayLocations);
  });

  function displayLocations(locationlist) {
    const article = document.createElement('article');
    article.setAttribute('class', 'card');

    const heading = document.createElement('h3');
    heading.textContent = locationlist.name;

    const image = document.createElement('img');
    image.setAttribute("src", locationlist.image);
    image.setAttribute("alt", locationlist.imagedata);
    image.setAttribute("loading", "lazy");

    const paragraph = document.createElement('p');
    paragraph.textContent = locationlist.info;

    article.appendChild(heading);
    article.appendChild(image);
    article.appendChild(paragraph);
    locationsection.appendChild(article);
  }
}

// Images
const imagesToLoad = document.querySelectorAll("img[data-src]");

if (imagesToLoad != null) {
  const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px",
  };

  const loadImages = (image) => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () => {
      image.removeAttribute("data-src");
    };
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  } else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  }
}
