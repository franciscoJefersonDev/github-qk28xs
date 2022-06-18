const colors = JSON.parse(localStorage.getItem('palette-color'));
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
