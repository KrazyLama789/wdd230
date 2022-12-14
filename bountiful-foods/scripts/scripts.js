// Timestamp of "Last Updated".
document.querySelector(".lastupdated").textContent = document.lastModified;

// Drink Display
const mixcountspan = document.querySelector("#mixcount span");
if (mixcountspan != null) {
  const mixcount = localStorage.getItem("order-count");

  if (mixcount != null) {
    mixcountspan.textContent = mixcount;
  }
}

// Weather Information.
const weathercard = document.querySelector("#weather");
if (weathercard != null) {
  const url1 =
    "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=9142126509452033b4de92f3c993180f&units=imperial";
  const url2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&cnt=3&appid=9142126509452033b4de92f3c993180f&units=imperial";

  async function apiFetch(url1, url2) {
    try {
      const response1 = await fetch(url1);
      const response2 = await fetch(url2);

      if (response1.ok && response2.ok) {
        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log(data1);
        console.log(data2);
        displayWeather(data1, data2);
      } else {
        throw Error(await response1.text(), await response2.text());
      }
    } catch (error) {
      console.log(error);
    }
  }

  apiFetch(url1, url2);

  // Update Weather Info
  function displayWeather(weatherData, forecastData) {
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

    // Weather Condition Description
    const descriptionelement = document.createElement("p");
    const description = weatherData.weather[0].description;
    descriptionelement.textContent = description;
    weathericon.setAttribute("alt", description);

    // Three Day Forecast
    const heading = document.createElement("h3");
    heading.textContent = "Three Day forecast";
    const threedaydiv = document.createElement("div");
    threedaydiv.setAttribute("id", "threeday");

    weathercard.appendChild(descriptionelement);
    weathercard.appendChild(weatherdiv);
    weathercard.appendChild(humidityelement);
    weathercard.appendChild(document.createElement("hr"));
    weathercard.appendChild(heading);
    weathercard.appendChild(document.createElement("hr"));
    weathercard.appendChild(threedaydiv);

    // Daily High Low
    const forecast = forecastData.list;
    for (let i = 0; i < forecast.length; i++) {
      const dailytemp = document.createElement("p");
      dailytemp.textContent = `High ${Math.round(
        forecast[i].main.temp_max
      )}/${Math.round(forecast[i].main.temp_min)} Low`;
      threedaydiv.appendChild(dailytemp);
    }
  }
}

// Locations
const locationsection = document.querySelector("#locations");

if (locationsection != null) {
  fetch("scripts/data.json")
    .then((response) => response.json())
    .then(function (jsonObject) {
      const locationlist = jsonObject["locations"];
      // console.table(jsonObject); // temporary checking for valid response and data parsing

      locationlist.forEach(displayLocations);
    });

  function displayLocations(locationlist) {
    const article = document.createElement("article");
    article.setAttribute("class", "card");

    const heading = document.createElement("h3");
    heading.textContent = locationlist.name;

    const image = document.createElement("img");
    image.setAttribute("src", locationlist.image);
    image.setAttribute("alt", locationlist.imagedata);
    image.setAttribute("loading", "lazy");

    const paragraph = document.createElement("p");
    paragraph.textContent = locationlist.info;

    article.appendChild(heading);
    article.appendChild(image);
    article.appendChild(paragraph);
    locationsection.appendChild(article);
  }
}

// Placeholders to Images
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

// Drink Form
const ing = document.querySelector("#ing");

if (ing != null)
{
  fetch("scripts/data.json")
    .then((response) => response.json())
    .then(function (jsonObject) {
      const ingredients = jsonObject["ingredients"];
      // console.table(jsonObject); // temporary checking for valid response and data parsing

      ingredients.forEach((ingredient) => displayIngredients(ingredient));
    });

  function displayIngredients(ingredient) {
    const label = document.createElement("label");
    label.setAttribute("class", "sbs");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "checkbox");
    input.setAttribute("value", ingredient.number);
    input.setAttribute("ingname", ingredient.name);
    input.setAttribute("carbs", ingredient.carbs);
    input.setAttribute("protein", ingredient.protein);
    input.setAttribute("fat", ingredient.fat);
    input.setAttribute("sugar", ingredient.sugar);
    input.setAttribute("calories", ingredient.calories);
    input.setAttribute("onclick", `verify(${ingredient.number})`);

    label.appendChild(input);
    label.append(` ${ingredient.name}`);
    ing.appendChild(label);
  }

  function verify(number) {
    const checked = document.querySelectorAll("input:checked");

    if (checked.length === 0) {
      // there are no checked checkboxes
      console.log("no checkboxes checked");
    } else if (checked.length > 3) {
      alert("Please select only 3 ingredients");
      document.querySelector(`[value="${number}"]`).checked = false;
    }
  }

  function validateForm() {
    if (document.querySelectorAll("input:checked").length !== 3) {
      alert("please select 3 ingredients");
      return false;
    } else {
      displaySubmition();
      return false;
    }
  }

  function displaySubmition() {
    // Section
    const mix = document.querySelector(".mix");
    

    const name = document.createElement("p");
    name.textContent = document.querySelector('input[name="fname"]').value;
    mix.appendChild(name);

    const email = document.createElement("p");
    email.textContent = document.querySelector('input[name="email"]').value;
    mix.appendChild(email);

    const phone = document.createElement("p");
    phone.textContent = document.querySelector('input[name="phone"]').value;
    mix.appendChild(phone);

    const instruct = document.createElement("p");
    instruct.textContent = document.querySelector(
      'input[name="instruct"]'
    ).value;
    mix.appendChild(instruct);

    const totalcarbs = document.createElement("p");
    var carbs = 0;
    const totalprotein = document.createElement("p");
    var protein = 0;
    const totalfat = document.createElement("p");
    var fat = 0;
    const totalsugar = document.createElement("p");
    var sugar = 0;
    const totalcalories = document.createElement("p");
    var calories = 0;

    // List of checked items
    const ings = document.querySelectorAll("input:checked");
    ings.forEach((ing) => {
      const ingredient = document.createElement("p");
      ingredient.textContent = ing.getAttribute("ingname");
      mix.appendChild(ingredient);

      carbs += Number(ing.getAttribute("carbs"));
      protein += Number(ing.getAttribute("protein"));
      fat += Number(ing.getAttribute("fat"));
      sugar += Number(ing.getAttribute("sugar"));
      calories += Number(ing.getAttribute("calories"));
    });

    // Nutritional Fact Content
    totalcarbs.textContent = `Carbohydrates: ${Math.round(carbs * 10) / 10} g`;
    mix.appendChild(totalcarbs);
    totalprotein.textContent = `Protein: ${Math.round(protein * 10) / 10} g`;
    mix.appendChild(totalprotein);
    totalfat.textContent = `Fat: ${Math.round(fat * 10) / 10} g`;
    mix.appendChild(totalfat);
    totalsugar.textContent = `Sugar: ${Math.round(sugar * 10) / 10} g`;
    mix.appendChild(totalsugar);
    totalcalories.textContent = `Calories: ${Math.round(calories * 10) / 10}`;
    mix.appendChild(totalcalories);

    // Order Date
    const orderdate = document.createElement("p");
    const date = new Date();
    orderdate.textContent = new Intl.DateTimeFormat("en-UK", {
      dateStyle: "full",
    }).format(date);
    mix.appendChild(orderdate);

    // Store Order Count
    var ordercount = localStorage.getItem("order-count");
    console.log(ordercount);
    if (ordercount == null) {
      ordercount = 0;
    }
    ordercount++;
    localStorage.setItem("order-count", ordercount);
  }
}
