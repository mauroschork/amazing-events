// borrador

// const table = document.getElementById('tr')
// const api = "https://amazing-events.herokuapp.com/api/events"

// fetch(api)
// .then(response => response.json())
// .then(events => {
//     let arrayAssistance = events.events.filter (e => e.assistance)
//     let maximo = arrayAssistance.map(assist => Match.max(assist.assistance))
//     let maxCapacity = events.events.map(e => e.capacity)

//     let max = Match.max (...maximo)
//     let min = Match.min (...minimo)
//     let maxCap = Match.max(...maxCapacity)

//     let eventoMax = arrayAsistance.find (e => e.assistance == max)
//     let eventoMin = arrayAssistance.find (e=> e.assistance == min)
//     let = eventMaxCapacity = events.events.find (e => e.capacity == maxCap)

 
//    const row = document.createElement('td')
//    row.innerHTML +=
//    `<td>${eventoMax.name} = ${min}</td>`
//        tr.appendChild(row2)
// })

//.thern =  El método then() retorna una Promesa. Recibe dos argumentos: funciones callback para los casos de éxito y fallo de Promise.
// .sort = El método sort() ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado. La ordenación no es necesariamente estable. El modo de ordenación por defecto responde a la posición del valor del string de acuerdo a su valor Unicode.
// await = El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.
// Promise = Una Promesa (Promise) es un proxy de un valor que no necesariamente se conoce cuando se crea la promesa. Le permite asociar controladores con el valor eventual de éxito o el motivo de falla de una acción asíncrona. Esto permite que los métodos asíncronos devuelvan valores como los métodos síncronos: en lugar de devolver inmediatamente el valor final, el método asíncrono devuelve la promesa de proporcionar el valor en algún momento en el futuro.
// toFixed: El método toFixed() formatea un número usando notación de punto fijo.

// borrador 2

let tableHome = document.getElementById('homeTable')
let tableUpcoming = document.getElementById('upcomingTable')
let tablePast = document.getElementById('pastTable')

let arrayData = []
let arrayEvents = []
let fechaActual = []
let arrayPastEvents = []
let arrayFutureEvents = []

async function getDataEvents() {
   await fetch("https://amazing-events.herokuapp.com/api/events")
      .then(response => response.json())
      .then(json => arrayData = json)

   arrayEvents = arrayData.events;
   fechaActual = arrayData.currentDate;
   arrayPastEvents = arrayEvents.filter(eventoPasado => eventoPasado.date < fechaActual);
   arrayFutureEvents = arrayEvents.filter(eventoFuturo => eventoFuturo.date > fechaActual);


   // tabla 1
   let arrayPorcentage = [] 
   arrayPastEvents.map(eventos => {
      arrayPorcentage.push({
         eventos: eventos.name,
         porcentajeAssistance: (eventos.assistance * 100 / eventos.capacity).toFixed(2)
      })
   })


   let maxPorcentage = arrayPorcentage.sort((a, b) => b.porcentajeAssistance - a.porcentajeAssistance)[0];


   let minPorcentage = arrayPorcentage.sort((a, b) => a.porcentajeAssistance - b.porcentajeAssistance)[0];


   let capacidadMaxima = arrayEvents.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)[0]

   



   // tabla 2
   let arrayCategoriasFuturas = arrayFutureEvents.map(element => element.category)

   arrayCategoriasFuturas = new Set(arrayCategoriasFuturas);

   arrayCategoriasFuturas = [...arrayCategoriasFuturas];

   let categoriaValueFuturo = []; 
   arrayCategoriasFuturas.map(categoria => {
      categoriaValueFuturo.push({
         category: categoria,
         evento: arrayFutureEvents.filter(evento => evento.category === categoria)
      })
   })

    let dataTablasFuturas = [];
   categoriaValueFuturo.map(datos => {
      dataTablasFuturas.push({
         category: datos.category,
         estimate: datos.evento.map(item => item.estimate),
         capacity: datos.evento.map(item => item.capacity),
         revenue: datos.evento.map(item => item.estimate * item.price)
      })
   })

   dataTablasFuturas.forEach(categoria => {
      let totalEstimate = 0
      categoria.estimate.forEach(estimate => totalEstimate += Number(estimate))
      categoria.estimate = totalEstimate

      let totalCapacidadFutura = 0
      categoria.capacity.forEach(capacity => totalCapacidadFutura += Number(capacity))
      categoria.capacity = totalCapacidadFutura

      let totalRevenueFuturas = 0;
      categoria.revenue.forEach(revenue => totalRevenueFuturas += revenue)
      categoria.revenue = totalRevenueFuturas

      categoria.porcentajePersonas = ((totalEstimate * 100) / totalCapacidadFutura).toFixed(2)
   })

   


   // tabla 3
   let arrayCategoriasPasadas = arrayPastEvents.map(element => element.category)

   arrayCategoriasPasadas = new Set(arrayCategoriasPasadas);

   arrayCategoriasPasadas = [...arrayCategoriasPasadas];

   let categoriaValuePasado = []; 
   arrayCategoriasPasadas.map(categoria => {

      categoriaValuePasado.push({
         category: categoria,
         evento: arrayPastEvents.filter(evento => evento.category === categoria)

      })
   })


   let dataTablasPasadas = [];
   categoriaValuePasado.map(datos => {
      dataTablasPasadas.push({
         category: datos.category,
         assistance: datos.evento.map(item => item.assistance),
         capacity: datos.evento.map(item => item.capacity),
         revenue: datos.evento.map(item => item.assistance * item.price)
      })
   })

   dataTablasPasadas.forEach(categoria => {
      let totalAsistencia = 0;
      categoria.assistance.forEach(asistencia => totalAsistencia += Number(asistencia))
      categoria.assistance = totalAsistencia

      let totalCapacidad = 0;
      categoria.capacity.forEach(capacidad => totalCapacidad += Number(capacidad))
      categoria.capacity = totalCapacidad;

      let totalRevenue = 0;
      categoria.revenue.forEach(revenue => totalRevenue += revenue)
      categoria.revenue = totalRevenue

      categoria.porcentajePersonas = ((totalAsistencia * 100) / totalCapacidad).toFixed(2)
   })


   function tableOne() {
      let contenedorUno = `
   
      <tr>
         <td>Events with the highest percentage of attendance</td>
         <td>Event with the lowest percentage</td>
         <td>Event with larger capacity</td>
      </tr>
         <td>${maxPorcentage.eventos}:${maxPorcentage.porcentajeAssistance}%</td>
         <td>${minPorcentage.eventos}:${minPorcentage.porcentajeAssistance}%</td>
         <td>${capacidadMaxima.name}: ${capacidadMaxima.capacity}</td>
      `
      tableHome.innerHTML = contenedorUno;
    }
   tableOne();

   function tablaDos() {

      let contenedorDos = `
   
      <tr>
         <td>Categories</td>
         <td>Estimated Revenue</td>
         <td>Percentage of estimated attendance</td>
      </tr>`

      dataTablasFuturas.forEach(e => {
         contenedorDos += `
      <tr>
         <td>${e.category}</td>
         <td>$${e.revenue}</td>
         <td>${e.porcentajePersonas}%</td>
      </tr>
   `
      })
      tableUpcoming.innerHTML = contenedorDos;
   }
   tablaDos()

   function tablaTres() {
      let contenedorTres = `
      <tr>
         <td>Categories</td>
         <td>Revenue</td>
         <td>Percentage of attendance</td>
      </tr>`
      dataTablasPasadas.forEach(e => {
         contenedorTres += `<tr>
      <td>${e.category}</td>
      <td>$${e.revenue}</td>
      <td>${e.porcentajePersonas}%</td>
   </tr>
   `
      })
      tablePast.innerHTML = contenedorTres
   }
   tablaTres()

}

getDataEvents()