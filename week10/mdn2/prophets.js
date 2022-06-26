const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
const cards = document.querySelector('.cards');

  function displayProphets(prophet) {
    // Create elements to add to the document
    let card = document.createElement('section');
    let names = document.createElement('h2');
    let h3Birth = document.createElement('h3');
    let h3Local = document.createElement('h3');
    let h3Death = document.createElement('h3');
    let auxOrder = "";

    let portrait = document.createElement('img');
  
    // Change the textContent property of the h2 element to contain the prophet's full name
    names.textContent = `${prophet.name} ${prophet.lastname}`;
    h3Birth.textContent = `Date of Birth: ${prophet.birthdate}`;
    h3Local.textContent = `Local of Birth: ${prophet.birthplace}`;
    h3Death.textContent = `Date of Death: ${prophet.death}`;

    if (prophet.order == "1")
        auxOrder = "st";
    else if (prophet.order == "2")
        auxOrder = "nd";
    else if (prophet.order == "3")
        auxOrder = "rd";
    else
        auxOrder = "th";


    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${auxOrder} Latter-day President`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('title', `Date of Death: ${prophet.death}`);

    h3Birth.setAttribute('class', "birth");
    h3Death.setAttribute('class', "death");
  
    // Add/append the section(card) with the h2 element
    card.appendChild(names);
    card.appendChild(h3Birth);
    card.appendChild(h3Death);
    card.appendChild(h3Local);
    card.appendChild(portrait);
    
  
    // Add/append the existing HTML div with the cards class with the section(card)
    cards.appendChild(card);
  }

  fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const prophets = jsonObject['prophets'];
    prophets.forEach(displayProphets);
  });
  

  