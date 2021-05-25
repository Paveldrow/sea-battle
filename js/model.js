import { view } from "./view.js";
import { controller } from './controller.js';


const model = {
  boardSize: 7,
  numShips: 1,
  shipLength: 3,
  shipSunk: 0,

  ships: [
    { locations: ['06', '16', '26'], hits: ['', '', ''], },
    // { locations: ['24', '34', '44'], hits: ['', '', ''], },
    // { locations: ['10', '11', '12'], hits: ['', '', ''], },
  ],

  fire: function (guess) {
    for (let i = 0; i < this.numShips; i++) {
      const ship = this.ships[i];
      const index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('Попадание!');
        if (this.isSunk(ship)) {
          view.displayMessage('Корабль потоплен!');
          this.shipSunk++;
        };
        return true;
      };
    };
    view.displayMiss(guess);
    view.displayMessage('Промах!');
    return false;
  },

  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== 'hit') {
        return false;
      };
    };
    return true;
  },
};

export { model };