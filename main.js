let config = {
  quantitieColors: 20,
  type: 'hex',
};

document
  .querySelector('#quantitieColors')
  .addEventListener('input', (event) => {
    config.quantitieColors = Number(event.target.value.trim());
  });
document.querySelector('#typeColor').addEventListener('change', (event) => {
  console.log(event.target.querySelector('[selected]').dataset.typeColor);
});
document
  .querySelector('[data-click="generateColors"]')
  .addEventListener('click', (event) => {
    generateColors();
  });

const generateColors = () => {
  for (let i = config.quantitieColors; i > 0; i--) {
    console.log(i);
  }
};
/* TO HSLA */
// console.log(
//   `hsla(${parseInt(chroma.random().hsl()[0])}, ${parseInt(
//     chroma.random().hsl()[1]
//   )}, ${parseInt(chroma.random().hsl()[2])}, ${parseInt(
//     chroma.random().hsl()[3]
//   )})`
// );

/* TO HEX */
// console.log(chroma.random().hex());
/* TO RGBA */
// console.log(
//   `rgba(${chroma.random().rgba()[0]}, ${chroma.random().rgba()[1]}, ${
//     chroma.random().rgba()[2]
//   }, ${chroma.random().rgba()[3]})`
// );
