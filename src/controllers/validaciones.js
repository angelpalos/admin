let telefono = document.getElementsByName('telefono')

telefono.addEventListener('keypress', (event) => {
    event.preventDefault()
    // console.log(event.keyCode)
    let valorTecla = String.fromCharCode(event.keyCode)
    console.log(valorTecla)
    let valorParsed = parseInt(valorTecla)
    // console.log(valorParsed)
    if(valorParsed) {
      telefono.value = telefono.value + valorParsed
    }
  })
  


const expresiones= {
  email: /^[0-9]+@[cetis1-5]+\.[edu]+\.[mx]+$/,
  telefono: /^\d{10,10}$/
}
