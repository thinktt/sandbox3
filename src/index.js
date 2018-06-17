const greeting = 'Howdy'
const html = (str) => console.log(str.raw)
const mainDiv = html`
  <h1>${greeting}</h1> 
`
document.querySelector('#app').innerHTML = mainDiv
