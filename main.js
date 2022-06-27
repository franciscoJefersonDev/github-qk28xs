const count = document.querySelector('#count');
const hue = document.querySelector('#hue');
const alpha = document.querySelector('#alpha');
let colors = [];
let config = {
  count: 20,
  format: 'rgba',
  hue: 'random',
  alpha: '1',
};
const paletteColor = JSON.parse(localStorage.getItem('palette-color')) || [];

count.addEventListener('input', (event) => {
  config.count = Number(event.target.value.trim());
});
hue.addEventListener('change', (event) => {
  config.hue = event.target.value;
});
alpha.addEventListener('change', (event) => {
  config.alpha = event.target.value;
});
document
  .querySelector('[data-click="generateColors"]')
  .addEventListener('click', (event) => {
    generateColors();
  });

const generateHexColor = () => chroma.random().hex();

const generateColors = () => {
  const insertColors = document.querySelector('.insert-colors');
  insertColors.innerHTML = '';
  colors = randomColor({
    count: config.count,
    hue: config.hue,
    format: 'rgba',
    alpha: config.alpha,
  });
  colors.forEach((color) => {
    const col = document.createElement('div');
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    col.classList.add('col-3', 'w-100');
    card.classList.add('card', 'rounded-pill');
    card.style.backgroundColor = color;
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);
    col.appendChild(card);
    insertColors.appendChild(col);
    const alert = (message, format) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div class="alert alert-${format} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button format="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>',
      ].join('');
      alertPlaceholder.append(wrapper);
    };
    const mc = new Hammer(card);
    mc.on('tap press', (event) => {
      if (event.type === 'tap') {
        navigator.clipboard
          .writeText(color)
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
  alreadyExisty = paletteColor.includes(color);
  if (!alreadyExisty) {
    paletteColor.push(chroma(color).hex());
    localStorage.setItem('palette-color', JSON.stringify(paletteColor));
    return true;
  } else {
    return false;
  }
};
