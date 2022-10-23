const temp = 50;
const speed = 7;

document.querySelector(".temp span").textContent = temp;
document.querySelector(".wind-speed").textContent = speed;
if (temp <= 50 && speed > 3) {
  const windchill =
    35.74 +
    0.6215 * temp -
    35.75 * speed ** 0.16 +
    0.4275 * temp * speed ** 0.16;
    
  document.querySelector(".wind-chill").textContent =
    Math.round(windchill * 10) / 10;
}
