const options = {weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'};
document.querySelector('#currentdate').textContent = new Date().toLocaleDateString("en-US", options);