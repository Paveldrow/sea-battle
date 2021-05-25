const view = {
  displayMessage: function (message) {
    const messageArea = document.querySelector('.message-area');
    messageArea.textContent = message;
  },
  displayHit: function (location) {
    const cell = document.getElementById(location);
    cell.classList.add('hit');

  },
  displayMiss: function (location) {
    const cell = document.getElementById(location);
    cell.classList.add('miss');
  },
};

export { view };