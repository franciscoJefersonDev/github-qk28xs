let colors = [];
let config = {
  quantitieColors: 20,
  type: 'hex',
  hue: 'random',
  alpha: '1',
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
document.querySelector('#hue').addEventListener('change', (event) => {
  config.hue = event.target.value;
});
document.querySelector('#alpha').addEventListener('change', (event) => {
  config.alpha = event.target.value;
});
document
  .querySelector('[data-click="generateColors"]')
  .addEventListener('click', (event) => {
    generateColors();
  });

const generateHexColor = () => chroma.random().hex();

const generateColors = () => {
  colors = randomColor({
    count: config.quantitieColors,
    hue: config.hue,
    format: config.type,
  });
  const insertColors = document.querySelector('.insert-colors');
  insertColors.innerHTML = '';
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
};
generateColors();
const saveColorInPalette = (color) => {
  alreadyExisty = paletteColor.includes(chroma(color).hex());
  if (!alreadyExisty) {
    paletteColor.push(chroma(color).hex());
    localStorage.setItem('palette-color', JSON.stringify(paletteColor));
    return true;
  } else {
    return false;
  }
};
