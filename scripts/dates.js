// Updated text inside #lastupdated
document.querySelector('#lastupdated').textContent = document.lastModified;

// Updated year of #currentyear
const date = new Date();
const year = date.getFullYear();
document.querySelector('#currentyear').textContent = year;