// fonction qui révele les cases adjacentes qu n'ont pas de mines
"use strict";

function hasnoMines(newData, row, col) {
  if (row < 0 || row >= newData.length || col < 0 || col >= newData[0].length || newData[row][col].noMined === true) {
    return; // Stop  la récursion pour les cases hors grille ou déja révélé
  }

  const cell = document.querySelector(`.cell-row-${row}-col-${col}`);
  const value = newData[row][col].value;

  if (value === 0) {
    newData[row][col].noMined = true;
    newData[row][col].revealed = true;
    
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const newRow = row + x; 
        const newCol = col + y;
        cell.innerHTML = value;
        hasnoMines(newData, newRow, newCol); 
      }
    }
  } 
}

export { hasnoMines };