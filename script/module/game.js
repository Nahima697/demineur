import { Api } from "./api.js"; // Update the path accordingly
import { generateGrid } from "./grid.js"; // Update the path accordingly
import { adjoiningMines } from "./adjoiningMines.js"; // Update the path accordingly
import { cellClicked } from "./cellCliked.js"; // Update the path accordingly


class Game {
    constructor(gameOver) {
        this.gameOver = false; 
      }
  async startGame(cols, rows, mines,pseudo) {
    const data = await Api.getData(cols, rows, mines);
    const newData = adjoiningMines(rows, cols, data);
    const gridElement = generateGrid(rows, cols, newData);
    const gameContainer = document.querySelector('.game');
    gameContainer.appendChild(gridElement);
    
    document.querySelector('.choiceGame').classList.add('disabled');
    document.querySelector('.welcomePseudo').textContent="A toi de jouer "+ pseudo;
    document.querySelector('.game').classList.remove('disabled');
    gridElement.addEventListener('click', (e) => cellClicked(e, newData));
    gridElement.addEventListener('contextmenu', (e) => cellClicked(e, newData));

  }
  checkGameStatus() {
    // Vérifiez si la partie est gagnée ou perdue et agissez en conséquence
  }

}

export { Game };
