import { Api } from "./api.js"; 
import { generateGrid } from "./grid.js"; 
import { adjoiningMines } from "./adjoiningMines.js"; 
import { cellClicked } from "./cellCliked.js"; 

class Game {
  constructor() {
    this.gameOver = false; 
  }
  
  async startGame(cols, rows, mines, pseudo) {
  
    const data = await Api.getData(cols, rows, mines);
    const newData = adjoiningMines(rows, cols, data);
    const gridElement = generateGrid(rows, cols, newData);
    const gameContainer = document.querySelector('.game');
    gameContainer.appendChild(gridElement);
    
    document.querySelector('.choiceGame').classList.add('disabled');
    document.querySelector('.welcomePseudo').textContent = "A toi de jouer " + pseudo;
    document.querySelector('.game').classList.remove('disabled');
    gridElement.addEventListener('click', (e) => this.handleCellClick(e, newData));
    gridElement.addEventListener('contextmenu', (e) => this.handleCellClick(e, newData));
  }

  handleCellClick(e, newData) {
    cellClicked(e, newData);
    this.checkGameStatus(newData);
  }

  checkGameStatus(newData) {
    if (this.gameOver) {
      return;
    }

    let isWin = true;

    for (const row of newData) {
      for (const cell of row) {
        if (!cell.isMined && !cell.revealed) {
          isWin = false;
          break;
        }
        if (cell.isMined && cell.revealed) {
          this.endGame(false);
          return;
        }
      }
    }

    if (isWin) {
      this.endGame(true);
    }
  }

  endGame(isWin) {
    this.gameOver = true;

    if (isWin) {
      this.displayMessage("VOUS AVEZ GAGNEZ");
    } else {
      this.displayMessage("VOUS AVEZ PERDU");
    }
    this.displayRestartButton();
  }
  
  displayMessage(message) {
    const gameContainer = document.querySelector('.game');
    gameContainer.innerHTML = "";
    const messageElement = document.createElement('p');
    messageElement.innerText = message;
    gameContainer.appendChild(messageElement);
  }

  displayRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.classList.add('restart');
    restartButton.setAttribute('id', 'restart-button');
    const gameContainer = document.querySelector('.game');
    gameContainer.appendChild(restartButton);

    restartButton.addEventListener('click', () => {
      restartButton.remove();
      this.startGame(this.cols, this.rows, this.mines, this.pseudo);
    });
  }
}

export { Game };
