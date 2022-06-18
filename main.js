let colors = [];
let config = {
  quantitieColors: 20,
  type: 'hex',
};
const paletteColor = JSON.parse(localStorage.getItem('palette-color')) || [];

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
// const generateRgbaColor = () =>
//   `rgba(${chroma.random().rgba()[0]}, ${chroma.random().rgba()[1]}, ${
//     chroma.random().rgba()[2]
//   }, ${chroma.random().rgba()[3]})`;
// const generateHslaColor = () =>
//   `hsla(${parseInt(chroma.random().hsl()[0])}, ${Number(
//     chroma.random().hsl()[1]
//   ).toFixed(0)}%, ${Number(chroma.random().hsl()[2]).toFixed(0)}%, ${parseInt(
//     chroma.random().hsl()[3]
//   )})`;

const generateColors = () => {
  colors = [];
  const insertColors = document.querySelector('.insert-colors');
  insertColors.innerHTML = '';
  const spinner = document.createElement('div');
  const spinnerMessage = document.createElement('span');
  spinnerMessage.textContent = 'Loading...';
  spinner.classList.add('spinner-border', 'text-primary');
  spinner.setAttribute('role', 'status');
  spinnerMessage.classList.add('visually-hidden');
  spinner.appendChild(spinnerMessage);
  insertColors.appendChild(spinner);
  setTimeout(() => {
    for (let i = 1; i <= config.quantitieColors; i++) {
      colors.push(generateHexColor());
    }
    insertColors.removeChild(spinner);
    colors.forEach((color) => {
      const col = document.createElement('div');
      const card = document.createElement('div');
      const cardBody = document.createElement('div');
      const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
      col.classList.add('col-3', 'my-1', 'mx-1');
      card.classList.add('card');
      card.style.backgroundColor = color;
      cardBody.classList.add('card-body');
      card.appendChild(cardBody);
      col.appendChild(card);
      insertColors.appendChild(col);
      const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>',
        ].join('');

        alertPlaceholder.append(wrapper);
      };
      const mc = new Hammer(card);
      mc.on('tap press', (event) => {
        if (event.type === 'tap') {
          const typeColor =
            config.type === 'hex'
              ? chroma(color).hex()
              : config.type === 'rgba'
              ? chroma(color).rgba()
              : chroma(color).hsl();
          navigator.clipboard
            .writeText(typeColor)
            .then(() => {
              alert('Copied!', 'primary');
            })
            .catch((err) => {
              alert('Error!', 'danger');
            });
        } else if (event.type === 'press') {
          const test = saveColorInPalette(color);
          if (test) {
            alert('Saved!', 'primary');
          } else {
            alert('This color already exists!', 'danger');
          }
        }
      });
    });
  }, 100);
};
generateColors();
const saveColorInPalette = (color) => {
  alreadyExisty = paletteColor.includes(color);
  if (!alreadyExisty) {
    paletteColor.push(color);
    localStorage.setItem('palette-color', JSON.stringify(paletteColor));
    return true;
  } else {
    return false;
  }
};
