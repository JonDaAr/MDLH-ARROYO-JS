const { createApp } = Vue
const url = `/amazing.json`;
createApp({
  data() {
    return {
        card :{}
    }
  },
  created(){
    fetch(url)
    .then(res => res.json())
    .then(res =>{
      let eve = res.events;
      const queryString = location.search
      const params = new URLSearchParams(queryString)
      const CardID = params.get('id')
      this.card = eve.find(card => card._id == CardID)
    })
    .catch(err => console(err))
  }
}).mount('#app')