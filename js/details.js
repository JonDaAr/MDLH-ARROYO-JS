import data from "./data.js";
let detailsContainer = document.querySelector("#container2");

const queryString = location.search
const params = new URLSearchParams(queryString)
const CardID = params.get('id')
const card = data.events.find(card => card._id == CardID)


function CreateCard(card,container) {
    let div = document.createElement('div')
    div.classList.add = 'card mb-3'
    div.innerHTML = `
    <div class="row g-2">
    <div class="col-md-4">
      <img src="${card.image}" class="img-fluid rounded-start" alt="${card.name}">
    </div>
    <div class="detailtext col-md-8">
      <div class="card-body">
        <h5 class="card-title">${card.name}</h5>
        <p class="card-text">${card.category}</p>
        <p class="card-text"><b>Place:</b> ${card.place}</p>
        <p class="card-text"><b>Descripcion:</b> ${card.description}</p>
        <p class="card-text"><b>Capacity:</b> ${card.assistance}/${card.capacity}</p>
        <p class="card-text"><b>Precio:</b> ${card.price} $</p>
        <p class="card-text"><small class="text-muted">${card.date}</small></p>
      </div>
    </div>
  </div>
    `
    container.appendChild(div)
    
}
CreateCard(card,detailsContainer)