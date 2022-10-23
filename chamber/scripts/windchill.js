document.querySelector(".temp span").textContent = 50;
document.querySelector(".wind-speed").textContent = 7;

const temp = document.querySelector(".temp span").textContent;
const speed = document.querySelector(".wind-speed").textContent;
const windchill = 35.74 + 0.6215 * temp - 35.75 * speed ** 0.16 + 0.4275 * temp * speed ** 0.16;

console.log(temp);
document.querySelector(".wind-chill").textContent = Math.round(windchill*10)/10;