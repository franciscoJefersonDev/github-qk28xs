const colors = JSON.parse(localStorage.getItem('color-palette'));
let config = {
  quantitieColors: 20,
  type: 'hex',
};

if (colors) {
  const insertColors = document.querySelector('.insert-colors');
  insertColors.innerHTML = '';
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
    card.addEventListener('click', (event) => {
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
    });
  });
}
