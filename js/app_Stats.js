const { createApp } = Vue
const url = `/amazing.json`;
createApp({
  data() {
    return {
        minAttendance : [],
        maxAttendance: [],
        maxCapacity:[],
        table2: []
    }
  },
  created(){
    fetch(url)
    .then(res => res.json())
    .then(res =>{
    let eve = res.events;
    //////////////1 tabla//////////////////////
    // let arrayCapacity = eve.map(elem => elem.capacity)
    // let arrayAttendance = eve.map(elem => {
    //     if (elem.assistance) {
    //         return elem.assistance / elem.capacity
    //     } else {
    //         return elem.estimate / elem.capacity
    //     }
    // })
    // let max = Math.max(...arrayAttendance)
    // let min = Math.min(...arrayAttendance)
    // let maxC = Math.max(...arrayCapacity)
    // this.maxAttendance = eve.find(elem => elem.assistance ? (elem.assistance / elem.capacity) == max : (elem.estimate / elem.capacity) == max)
    // this.minAttendance = eve.find(elem => elem.assistance ? (elem.assistance / elem.capacity) == min : (elem.estimate / elem.capacity) == min)
    // this.maxCapacity = eve.find(elem => elem.capacity == maxC)
    // ///////////// 2 tabla /////////////////
    // let upComingData = eve.filter((event) => event.estimate)
    // let categorySums2 = {};
    // for (let event of upComingData){
    //     let cap = event.capacity;
    //     let est = event.estimate;
    //     if (categorySums2[event.category]) {
    //       categorySums2[event.category].revenue += event.price * event.estimate;
    //       categorySums2[event.category].attendance = (categorySums2[event.category].attendance + est/cap)/2;
    //     } else {
    //       categorySums2[event.category] = { revenue: event.price * event.estimate, attendance:est/cap};
    //     }
    //   }
    //   /////////transformo el obj en array //////////////
    //   let result2 = [];
    //   console.log(categorySums2)
    //     for (let event in categorySums2) {
    //     result2.push({
    //            category: event,
    //            revenue: array[event].revenue,
    //            attendace: array[event].attendance
    //      })
    //    }
    //    this.table2 = result2;
/////////////////////////// no llegue a ver por que no anda la tabla 2 y la 3 no llegue hacerla
    })
    .catch(err => console(err))
  },

}).mount('#app')