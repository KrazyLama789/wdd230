const weathericon = document.querySelector('#weather-icon');
const tempspan = document.querySelector("#temp");
const conditionspan = document.querySelector("#condition");
const speedspan = document.querySelector("#wind-speed");
const windchillspan = document.querySelector('#wind-chill');
const url = "https://api.openweathermap.org/data/2.5/weather?q=Orem&appid=9142126509452033b4de92f3c993180f&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

// Update Weather Info
function displayResults(weatherData) {
  tempspan.textContent = weatherData.main.temp.toFixed(1);
  speedspan.textContent = weatherData.wind.speed.toFixed(1);
  
  const temp = tempspan.textContent;
  const speed = speedspan.textContent;
  
  const description = weatherData.weather[0].description;
  conditionspan.textContent = description;

  const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
  weathericon.setAttribute("src", iconsrc);
  weathericon.setAttribute("alt", description);
  
  // Wind Chill
  if (temp <= 50 && speed > 3) {
    const windchill =
      35.74 +
      0.6215 * temp -
      35.75 * speed ** 0.16 +
      0.4275 * temp * speed ** 0.16;

    windchillspan.textContent = Math.round(windchill * 10) / 10;
  }
}

