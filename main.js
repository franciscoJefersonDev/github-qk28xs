let config = {
  quantitieColors: 20,
}

document.querySelector('#quantitieColors').addEventListener('input', event => {
  config.quantitieColors = Number(event.target.value.trim())
})
document.querySelector('#generateColors').addEventListener('click', event => {
  generateColors()
})

const generateColors = () => {
  for(let i = config.quantitieColors; i > 0; i--) {
    console.log(i)
  }
}
console.log(chroma.random().toString())