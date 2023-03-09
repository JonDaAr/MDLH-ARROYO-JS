import data from "./data.js";
const dataE = data.events.slice();
const $contai = document.getElementById(`container2`);
const $check = document.getElementById('checknav');
const $buscar = document.querySelector('input[type="search"]');
/////// Funciones Cards //////////

function rellenarcards(array, contaniner2){
  contaniner2.innerHTML = ``;
  if (array.length < 1){
    let div=document.createElement("div");
    div.className = "allcards p-5"
    div.innerHTML += `
    <div class="card">
    <img class="img_card card-img-top" src="https://thumbs.gfycat.com/HoarseOccasionalDikkops-max-1mb.gif" alt="not found">
    <div class="cartas card-body">
      <h2 class="card-title">Lo buscamos pero no encontramos nada</h2>
      
    </div>
    </div>`
        contaniner2.appendChild(div)
  }else{
  array.forEach(evento => {
    if(evento.date>data.currentDate){
    let div=document.createElement("div");
    div.className = "allcards p-5"
    div.innerHTML += `
    <div class="card">
    <img class="img_card card-img-top" src="${evento.image}" alt="${evento.name}">
    <div class="cartas card-body">
      <h2 class="card-title">${evento.name}</h2>
      <p class="card-text">${evento.category}</p>
      <a href="/pages/Details.html?id=${evento._id}" class="boton btn btn-primary">Go</a>
    </div>
    </div>
    `
    contaniner2.appendChild(div)
  }})
}
}
rellenarcards(dataE,$contai);

/////// Funciones nav //////////
const filtercategory = (array) => {
    let categories = (array).map(category=> category.category)
    categories = categories.reduce((acumulador,elemento)=>{
        if(!acumulador.includes(elemento)){
            acumulador.push(elemento);
        }
        return acumulador
    },[])
    return categories
}


let categories=filtercategory(dataE)

function createcheck(array,conteiner){
    for(let evento of array){
        let div=document.createElement("div");
        div.className = "okey"
        div.innerHTML += `<div">
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" name="check"
          id="${evento.toLowerCase()}" value="${evento}">
        <label class="form-check-label" for="${evento.toLowerCase()}">${evento}</label>
      </div>
        </div>
        `
        conteiner.appendChild(div)
    }
}
createcheck(categories,$check)
//////////////////////////// filter //////////////////////////

const filterAndPrint =  (array) =>{
  let arrayFiltered = filterSearch(array, $buscar.value)
  arrayFiltered = filterCheck(arrayFiltered)
  return arrayFiltered
}

//////////////////////// Search /////////////////////////////////

const filterSearch = (array, value) => {
  let filteredArray = array.filter(element=> element.name.toLowerCase().includes(value.toLowerCase()))
      return filteredArray
}



$buscar.addEventListener('keyup', (e) =>{
  let dataFilter = filterAndPrint(dataE)
  rellenarcards(dataFilter, $contai)
})
//////////////////////// Checkbox /////////////////////////////////


const filterCheck = (array) => {
  let checked = document.querySelectorAll('input[type="checkbox"]:checked');
  let arrayFiltered = array;
  if(checked.length > 0){
    arrayFiltered = [];
    for(let i = 0; i < checked.length; i++) {
      arrayFiltered = arrayFiltered.concat(array.filter(elemento => elemento.category.toLowerCase().includes(checked[i].id.toLowerCase())))
  }
  
}

  return arrayFiltered

}

$check.addEventListener('change', ()=>{
  let dataFilter = filterAndPrint(dataE)
  rellenarcards(dataFilter,$contai)
}) 