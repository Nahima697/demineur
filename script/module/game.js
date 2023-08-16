import { Api } from "./api.js"; 
import { generateGrid } from "./grid.js"; 
import { adjoiningMines } from "./adjoiningMines.js"; 
import { cellClicked } from "./cellCliked.js"; 

class Game {
  constructor() {
    this.gameOver = false;
    this.cols = 0;
    this.rows = 0;
    this.mines = 0;
    this.pseudo = '';
    this.newData = null;
  }
  
  async startGame(cols, rows, mines, pseudo) {
    this.cols = cols; 
    this.rows = rows;
    this.mines = mines;
    this.pseudo = pseudo;
    this.newData = await this.setupGameGrid();
    this.displayGame(this.newData);
  }

  async setupGameGrid() {
    const data = await Api.getData(this.cols, this.rows, this.mines);
    const newData = adjoiningMines(this.rows, this.cols, data);
    return newData;
  }

  displayGame(newData) {
    const gridElement = generateGrid(this.rows, this.cols,this.newData);
    const gameContainer = document.querySelector('.game');
    gameContainer.appendChild(gridElement);
    document.querySelector('.choiceGame').classList.add('disabled');
    document.querySelector('.game').classList.remove('disabled');
    gridElement.addEventListener('click', (e) => this.handleCellClick(e, newData,this));
    gridElement.addEventListener('contextmenu', (e) => this.handleCellClick(e,newData,this));
  }

  handleCellClick(e, newData) {
    cellClicked(e, newData);
    console.table(newData);
    this.checkGameStatus(newData);
    console.table(newData);
  }
  
  checkGameStatus(newData) {
    if (this.gameOver) {
      return;
    }
    
    console.table(newData);
    
    let isWin = true;
    for (let i = 0; i < newData.length; i++) {
      for (let j = 0; j < newData[i].length; j++) {
        const cell = newData[i][j];
        console.log(`Checking cell at (${i}, ${j}): isMined=${cell.isMined}, revealed=${cell.revealed}`);
        
        if (cell.isMined && cell.revealed === true) {
          isWin = false;
          break;
        }
        if (!cell.isMined && !cell.revealed) {
          isWin = false;
          break;
        }
      }
      if (!isWin) {
        break;
      }
    }
  
    if (isWin) {
      this.endGame(true);
    }
  }
  
  
  
  endGame(isWin) {
    this.gameOver = true;
  
    if (isWin) {
      this.displayMessage("VOUS AVEZ GAGNÉ");
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
      this.restart();
    });
  }

  restart() {
    const gameContainer = document.querySelector('.game');
    gameContainer.innerHTML="";
    document.querySelector('.choiceGame').classList.remove('disabled');
    this.gameOver = false;
  }
  
}

export { Game };
