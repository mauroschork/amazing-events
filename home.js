//... = spread operator le indica al push que no reemplace al primer elemento. 
// push = reemplaza el primer elemento de un array
// includes = determina si una matriz incluye un determinado elemento, devuelve true o false según corresponda.
// filter = crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
// trim = elimina los espacios en blanco en ambos extremos del string. Los espacios en blanco en este contexto, son todos los caracteres sin contenido (espacio, tabulación, etc.) y todos los caracteres de nuevas lineas (LF,CR,etc.).
// forEach = El método forEach() ejecuta la función indicada una vez por cada elemento del array.
// arrays = una manera ordenada de almacenar una lista de elementos de datos bajo un solo nombre de variable.
// set = Los objetos Set son colecciones de valores. Puede iterar a través de los elementos de un conjunto en orden de inserción. Un valor en un Set solo puede ocurrir una vez; es único en la colección del Set.
// 





// Card print sin comando for //
let cardContainer = document.getElementById ('cardContainer')

function cardPrinter (print){


    let divCard = document.createElement('div')
    divCard.classname = 'card gap-2';
    divCard.style.width = '19rem'
    divCard.style.height = "25rem"
        divCard.style.border = ' solid 1px black'
        divCard.innerHTML = ` <div class="d-flex justify-content-between flex-wrap">
        <img src="${print.image}" style="border-solid-dark" alt="..." width="280px" height="200px" </img>
                                   <h5 class="card-title"> ${print.name}</h5>
                                   <p class="card-text"> ${print.date}</p>
                                   <p class="card-text"> ${print.description}</p>
                                   <p>price: ${print.price}</p>
                                   <a href="./details.html?id=${print._id}" class="btn btn-primary btnCard">Buy</a>
                                   </div>   
                                   `
                                   
                                   cardContainer.appendChild(divCard)
                                }
  data.events.forEach(element => {
    cardPrinter (element)
  });                              
// let today = data.currentDate
// let past =
// data.events.forEach(pasado => {
//     if(parseInt(today)> parseInt(pasado.date)){} 
// })
                                   



//-------checkselect--------//



// Checkbox Print //
const checkboxContainer = document.getElementById ("checkboxContainer")

let categorySet = new Set(data.events.map(events => {
    return events.category
}))
let category  = [...categorySet] 
console.log(category)

let printCategory = (element) => {
    let categories = document.createElement("div")
    categories.className = "form-check form-check-inline similBotom my-1 mx-1 m-sm-0"
    categories.innerHTML = `
    <input class="form-check-input checkb" type="checkbox" id="${element}" value="${element}">
    <label class="form-check-label" for="${element}">${element}</label>    
    `
    checkboxContainer.appendChild(categories)
}
category.forEach(printCategory)


// Checkbox filter ///

let checkboxFilter = document.querySelectorAll("input[type=checkbox]")
let arrayChecked = []
console.log(checkboxFilter)
checkboxFilter.forEach(check => check.addEventListener("change", event =>{

    let checked = event.target.checked
    if(checked){
        arrayChecked.push(event.target.value)
        console.log(checked)
        console.log(arrayChecked)
        filtro()
    }else{
        arrayChecked = arrayChecked.filter(uncheck => uncheck !== event.target.value)
        console.log('hola')
        filtro()
    }
}))


//----// SearchFilters -----//
let searchBar = document.getElementById("searchBar")
let textoVacio = ""
console.log(searchBar)

searchBar.addEventListener("keyup", search1 => {
textoVacio = search1.target.value
filtro()
console.log(textoVacio)
}
)

function filtro(){
    cardContainer.innerHTML = ''
    let filterEvent = [];

    if(textoVacio !== "" && arrayChecked.length  > 0){
        // filtrar checks y despues filtrar por texto, despues pushear
        filterEvent.push(...data.events.filter(buscar => buscar.name.toLowerCase().includes(textoVacio.toLowerCase().trim()) && arrayChecked.some(categoria => categoria == buscar.category)))
        console.log(filterEvent)
        console.log('caso 1')
        // filtrar por checks //
    }else if(textoVacio === "" && arrayChecked.length > 0){
        filterEvent.push(...data.events.filter(buscar => arrayChecked.some(categoria => categoria == buscar.category)))
        console.log(filterEvent)
        console.log('caso 2')
    }else if(textoVacio !== "" && arrayChecked.length  === 0){
            filterEvent.push(...data.events.filter(buscar => buscar.name.toLowerCase().includes(textoVacio.toLowerCase().trim())))
            console.log(filterEvent)
            console.log('caso 3')
    }else{
        filterEvent.push(...data.events)
        console.log(filterEvent)
        console.log('caso 4')
    }
    filterEvent.forEach(event =>{
        cardPrinter(event)
        
})    
}
filtro()