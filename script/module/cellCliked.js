import { hasnoMines } from "./hasnoMines.js";
import { Game } from "./game.js";

function cellClicked(e, newData,game) {
  let cell = e.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const cellValue = cell.dataset.value;
  const isMined = newData[row][col].isMined;

  if (e.button === 2) { // Clic droit
    e.preventDefault();
    if (!cell.classList.contains('flag')) {
      cell.classList.add('flag');
    } else {
      cell.classList.remove('flag');
    }
  } else { // Click gauche
    cell.innerHTML = cellValue;
    newData[row][col].revealed =true;

    if (isMined === true) {
      cell.innerHTML = "";
      cell.classList.add('boom');
    } else if (cellValue === '0') {
      hasnoMines(newData, row, col);
      game.checkGameStatus(e,newData);
    }
  }
}

export { cellClicked };
