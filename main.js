const count = document.querySelector('#count');
const format = document.querySelector('#format');
const hue = document.querySelector('#hue');
const alpha = document.querySelector('#alpha');
let colors = [];
let config = {
  count: 20,
  format: 'hex',
  hue: 'random',
  alpha: '1',
};
const paletteColor = JSON.parse(localStorage.getItem('palette-color')) || [];

count.addEventListener('input', (event) => {
  config.count = Number(event.target.value.trim());
});
format.addEventListener('change', (event) => {
  config.format = event.target.value;
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
    format: config.format,
  });
  colors.forEach((color) => {
    const col = document.createElement('div');
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    col.classList.add('col-3', 'w-100');
    card.classList.add('card');
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
        const hslaColor = `hsla(${Number(chroma(color).hsl()[0])}, ${Number(chroma(color).hsl()[1])}%, ${Number(chroma(color).hsl()[2])}%, ${Number(chroma(color).hsl()[3])}%)`
        console.log(hslaColor)
        // const formatColor =
        //   config.format === 'hex'
        //     ? chroma(color).hex()
        //     : config.format === 'rgba'
        //     ? chroma(color).rgba()
        //     : chroma(color).hsl();
        // navigator.clipboard
        //   .writeText(formatColor)
        //   .then(() => {
        //     alert('Copied!', 'primary');
        //   })
        //   .catch((err) => {
        //     alert('Error!', 'danger');
        //   });
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
