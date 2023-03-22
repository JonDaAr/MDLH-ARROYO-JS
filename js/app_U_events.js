const { createApp } = Vue
const url = `/amazing.json`;
createApp({
  data() {
    return {
      events : [],
      category : [],
      eventsFilter : [],
      searchValue : '',
      checked : []
    }
  },
  created(){
    fetch(url)
    .then(res => res.json())
    .then(res =>{
      let eve = res.events;
      this.events = eve.filter(event => event.assistance)
      this.eventsFilter = this.events;
      let categoryCheckbox =[ ...new Set(this.events.map(e => e.category))]
      this.category=categoryCheckbox;
    })
    .catch(err => console(err))
  },
  methods: {
    filtro(){
      this.eventsFilter = this.events.filter(e => {
        return (this.checked.includes(e.category) || this.checked.length === 0) && e.name.toLowerCase().includes(this.searchValue.toLowerCase())
      });
    }
  }

}).mount('#app')