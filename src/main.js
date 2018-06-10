import Vue from 'vue'
import Greeting from './Greeting.vue'

// const Greeting1 = Vue.component('my-greeting', {
//   template: '<h1>Howdy Damn it!</h1>'
// })

new Vue({
  el: '#app',
  render: h => h(Greeting), 
})



