import { view } from "./view.js";

const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,

  ships: [
    { locations: [0, 0, 0], hits: ['', '', ''], },
    { locations: [0, 0, 0], hits: ['', '', ''], },
    { locations: [0, 0, 0], hits: ['', '', ''], },
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

  generateShipLocations: function () {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    };
  },

  generateShip: function () {
    const direction = Math.floor(Math.random() * 2);
    let row;
    let col;
    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    };
    const newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(String(row) + (col + i));
      } else {
        newShipLocations.push((row + i) + '' + String(col));
      }
    };
    return newShipLocations;
  },

  collision: function (locations) {
    for (let i = 0; i < this.numShips; i++) {
      const ship = model.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        };
      };
    };
    return false;
  },
};

const generatePosition = () => {
  model.generateShipLocations();
}

export { model, generatePosition };