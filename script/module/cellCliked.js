"use strict";

import { hasnoMines } from "./hasnoMines.js";

// gestion des intéractions au Click.
function cellClicked(e, newData) {
    let cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const cellValue = cell.dataset.value;
    const isMined = newData[row][col].isMined;
  
    if (e.button === 2) { // Clic droit
      e.preventDefault(); // Empêche le menu contextuel de s'afficher
      if (!cell.classList.contains('flag')) {
        cell.classList.add('flag');
      } else {
        cell.classList.remove('flag');
      }
    } else { // Click gauche
      cell.innerHTML = cellValue;
  
      if (isMined === true) {
        cell.innerHTML = "";
        cell.classList.add('boum');
        console.log('Boum');
      } else if (cellValue === '0') {
        hasnoMines(newData, row, col);
      }
    }
  }

  export { cellClicked};