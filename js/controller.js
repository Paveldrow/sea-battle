import { view } from "./view.js";
import { model } from './model.js';

const controller = {
  guesses: 0,
  processGuess: function (guess) {
    const location = parseGuess(guess);
    if (location) {
      this.guesses++;
      const hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage('Вы потопили все корабли за ' + this.guesses + ' выстрелов');
      }
    };
  },

  mouseGuess: function (location) {
    if (location) {
      this.guesses++;
      const hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage('Вы потопили все корабли за ' + this.guesses + ' выстрелов');
      }
    };
  },
};

const parseGuess = function (guess) {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  if (guess === null || guess.length !== 2) {
    view.displayMessage('Введите две координаты!');
  } else {
    const firstChar = guess.charAt(0);
    const row = alphabet.indexOf(firstChar);
    const column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      view.displayMessage('Введите корректные координаты');
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      view.displayMessage('Введите координаты соответствующие игровому полю');
    } else {
      return row + column;
    };
  };
  return null;
};

const inputFireButton = function () {
  const guessInput = document.querySelector('.form__input');
  const fireButton = document.querySelector('.fire-button');

  fireButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const guess = guessInput.value.toUpperCase();
    if (model.shipSunk < model.numShips) {
      controller.processGuess(guess);
      guessInput.value = '';
    };
  });
};

const mouseShoot = () => {
  const cells = document.querySelectorAll('td');
  for (let cell of cells) {
    cell.addEventListener('click', (evt) => {
      evt.preventDefault();
      const target = cell.getAttribute('id');
      if (model.shipSunk < model.numShips) {
        controller.mouseGuess(target);
      };
    });
  };
};


export { controller, inputFireButton, mouseShoot };