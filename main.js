let colors = [];
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
  config.type = event.target.value;
});
document
  .querySelector('[data-click="generateColors"]')
  .addEventListener('click', (event) => {
    generateColors();
  });

const generateHexColor = () => chroma.random().hex();
const generateRgbaColor = () =>
  `rgba(${chroma.random().rgba()[0]}, ${chroma.random().rgba()[1]}, ${
    chroma.random().rgba()[2]
  }, ${chroma.random().rgba()[3]})`;
const generateHslaColor = () =>
  `hsla(${parseInt(chroma.random().hsl()[0])}, ${parseInt(
    chroma.random().hsl()[1]
  )}, ${parseInt(chroma.random().hsl()[2])}, ${parseInt(
    chroma.random().hsl()[3]
  )})`;

const generateColors = () => {
  colors = [];
  const insertColors = document.querySelector('.insert-colors');
  const spinner = document.createElement('div');
  const spinnerMessage = document.createElement('span');
  spinnerMessage.textContent = 'Loading...';
  insertColors.innerHTML = '';
  setTimeout(() => {
    for (let i = 1; i <= config.quantitieColors; i++) {
      if (config.type === 'hex') {
        colors.push(generateHexColor());
      } else if (config.type === 'rgba') {
        colors.push(generateRgbaColor());
      } else {
        colors.push(generateHslaColor());
      }
    }
    colors.forEach((color) => {
      console.log(color);
      const cardColor = `
        <div class="col-5 my-1">
          <div class="card" style="background-color:${color}">
            <div class="card-body"></div>
          </div>
        </div>
      `;
      insertColors.innerHTML += cardColor;
    });
    loading.style.opacity = '0';
    loading.style.pointerEvents = 'none';
  }, 100);
};
generateColors();
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
