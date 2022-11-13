const cards = document.querySelector('.cards');

fetch("json/data.json")
  .then(response => response.json())
  .then(function (jsonObject) {
    const businesses = jsonObject['businesses'];
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    businesses.forEach(displayBusinesses);
});

function displayBusinesses(business) {
        // Elements to be added to doc
        const card = document.createElement('article');
        const company = document.createElement('h2');
        const logo = document.createElement('img');
        const address = document.createElement('p');
        const phonenumber = document.createElement('p');
        const weburl = document.createElement('a');
    
        // Set values to the new text elements
        company.textContent = business.name;
        address.textContent = business.address;
        phonenumber.textContent = business.phonenumber;
        weburl.textContent = business.weburl;
        weburl.setAttribute('href', business.weburl);
    
        // Set values of logos and images
        logo.setAttribute('src', business.logoimage);
        logo.setAttribute('alt', `Logo for ${business.name}`);
        logo.setAttribute('loading', 'lazy');
    
        // Append new sub-elements to card
        card.appendChild(company);
        card.appendChild(logo)
        card.appendChild(address);
        card.appendChild(phonenumber);
        card.appendChild(weburl);
    
        // Append card to doccument
        document.querySelector('.cards').appendChild(card);
}