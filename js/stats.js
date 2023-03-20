let data = [];
let dataE = [];
let minAttendance = [];
let maxAttendance = [];
let maxCapacity = [];

fetch("/amazing.json")
    .then(res => res.json())
    .then(res => {
        data = res;
        dataE = data.events;
        let upComingData = dataE.filter((event) => event.estimate)
        let pastData = dataE.filter((event) => event.assistance)
        maxMinAttendance(dataE);
        maxCapacities(dataE)
        rellenartable();
        rellenartable2(upComingData);
        rellenartable3(pastData);
    })
    .catch(error => console.log(error))

///////////////////////////////////// TABLE 1 //////////////////////////////////////////////////////////////////
    
function maxMinAttendance(array) {
        let arrayAttendance = array.map(elem => {
            if (elem.assistance) {
                return elem.assistance / elem.capacity
            } else {
                return elem.estimate / elem.capacity
            }
        })
        let max = Math.max(...arrayAttendance)
        let min = Math.min(...arrayAttendance)
        
        maxAttendance = array.find(elem => elem.assistance ? (elem.assistance / elem.capacity) == max : (elem.estimate / elem.capacity) == max)
        minAttendance = array.find(elem => elem.assistance ? (elem.assistance / elem.capacity) == min : (elem.estimate / elem.capacity) == min)
    }
    
    function maxCapacities(array) {
        let arrayCapacity = array.map(elem => elem.capacity)
        let max = Math.max(...arrayCapacity)
        maxCapacity = array.find(elem => elem.capacity == max)
        
    }
    
    function rellenartable() {
        let table = document.getElementById("table");
        table.innerHTML += `
            <tr>
                        <th>${maxAttendance.name}</th>
                        <th>${minAttendance.name}</th>
                        <th>${maxCapacity.name}</th>
            </tr>
            `;
    
    }

////////////////////////////////// TABLE 2 //////////////////////////////////////////////////////////////////
                ///Rellena la tabla 2 de Upcoming Events
function rellenartable2(array) {
    let table = document.getElementById("table2");
    let table2 = arrayGroupCategory2(array);
    for (let i = 0; i < table2.length; i++) {
        table.innerHTML += `<tr>
        <th>${table2[i].category}</th>
        <th>$ ${(table2[i].revenue).toLocaleString()},00</th>
        <th>${((table2[i].attendace)*100).toFixed(2)} %</th>
    </tr>
    `;
    };
}

/// Creo un obj con los datos q necesito
const categorySums2 = {};
function arrayGroupCategory2(array){
    for (let event of array){
        let cap = event.capacity;
        let est = event.estimate;
        if (categorySums2[event.category]) {
          categorySums2[event.category].revenue += event.price * event.estimate;
          categorySums2[event.category].attendance = (categorySums2[event.category].attendance + est/cap)/2;
        } else {
          categorySums2[event.category] = { revenue: event.price * event.estimate, attendance:est/cap};
        }
      }
      let arrayOfObj= objOfArray2(categorySums2);
    return arrayOfObj;
}

// convierto el obj en array 
const result2 = [];
function objOfArray2(array){
     for (let event in array) {
     result2.push({
            category: event,
            revenue: array[event].revenue,
            attendace: array[event].attendance
      });
    }
    return result2;
}




///////////////////////////////// TABLE 3 //////////////////////////////////////////////////////////////////
                ///Rellena la tabla 2 de Past Event
function rellenartable3(array) {
    let table = document.getElementById("table3");
    let table3 = arrayGroupCategory3(array);
    for (let i = 0; i < table3.length; i++) {
        table.innerHTML += `<tr>
        <th>${table3[i].category}</th>
        <th>$ ${(table3[i].revenue).toLocaleString()},00</th>
        <th>${((table3[i].attendance)*100).toFixed(2)} %</th>
    </tr>
    `;
    };
}

/// Creo un obj con los datos q necesito
const categorySums3 = {};
function arrayGroupCategory3(array){
    for (let event of array){
        let cap = event.capacity;
        let assi = event.assistance;;
        if (categorySums3[event.category]) {
          categorySums3[event.category].revenue += event.price * event.assistance;
          categorySums3[event.category].attendance = (categorySums3[event.category].attendance + assi/cap)/2;
        } else {
          categorySums3[event.category] = { revenue: event.price * event.assistance, attendance:event.assistance/cap};
        }
      }
      let arrayOfObj= objOfArray3(categorySums3);
    return arrayOfObj;
}

// convierto el obj en array 

const result3 = [];
function objOfArray3(array){
     for (let event in array) {
     result3.push({
            category: event,
            revenue: array[event].revenue,
            attendance: array[event].attendance,
      });
    }
    return result3;
}

