import {view} from './view.js';
import {model} from './model.js';
import {controller, inputFireButton, mouseShoot} from './controller.js';
   
model.generateShipLocations();
inputFireButton();
mouseShoot();
console.log(model.ships);