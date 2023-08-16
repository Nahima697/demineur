import { Api } from "./api.js"; 
import { generateGrid } from "./grid.js"; 
import { adjoiningMines } from "./adjoiningMines.js"; 
import { cellClicked } from "./cellCliked.js"; 

// classe qui gère la partie
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
    const gridElement = generateGrid(this.rows, this.cols, this.newData);
    const gameContainer = document.querySelector('.game');
    
    // Créer un élément <h2> pour afficher le message de bienvenue
    const welcome = document.createElement("h2");
    welcome.innerText = "Welcome " + this.pseudo;
  
    // Ajoutez l'élément <h2> et la grille au conteneur de jeu
    gameContainer.appendChild(welcome);
    gameContainer.appendChild(gridElement);
  
    // Mettre à jour les classes CSS des éléments
    document.querySelector('.choiceGame').classList.add('disabled');
    document.querySelector('.game').classList.remove('disabled');
  
    // Ajouter les écouteurs d'événements aux cellules de la grille
    gridElement.addEventListener('click', (e) => this.handleCellClick(e, newData, this));
    gridElement.addEventListener('contextmenu', (e) => this.handleCellClick(e, newData, this));
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
    
    let isWin = true;
    let isLost = false;
    for (let i = 0; i < newData.length; i++) {
      for (let j = 0; j < newData[i].length; j++) {
        const cell = newData[i][j];
        if (cell.isMined && cell.revealed) {
          isLost = true;
          break;
        }else if(!cell.revealed && !cell.isMined){
          isWin = false;
        }
      }
    }
  
    if (isWin) {
      this.endGame(true);
    }else if(isLost){
      this.endGame(false);
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
