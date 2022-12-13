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
    const weatherdiv = document.createElement('div');
    weatherdiv.setAttribute('id', 'currweather');

    // Weather Icon
    const weathericon = document.createElement("img");
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    weathericon.setAttribute("src", iconsrc);
    weathericon.setAttribute('class', 'weathericon');
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
    weathercard.appendChild(document.createElement('hr'));
    weathercard.appendChild(descriptionelement);
    weathercard.appendChild(document.createElement('hr'));
  }
}
