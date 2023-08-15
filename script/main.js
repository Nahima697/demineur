import { Game } from "./module/game.js";
import { cellClicked } from "./module/cellCliked.js";

function getDatafromForm(cols, rows, mines, pseudo) {
  const form = document.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    cols = parseInt(form.querySelector('#cols').value);
    rows = parseInt(form.querySelector('#rows').value);
    mines = parseInt(form.querySelector('#mines').value);
    pseudo = form.querySelector('#pseudo').value;

    const game = new Game();
    await game.startGame(cols, rows, mines, pseudo);

    
    if (game.gameOver) {
      game.displayRestartButton();
      getDatafromForm(cols, rows, mines, pseudo);
      cellClicked(game); // Passer l'instance de Game à la fonction cellClicked
      const newGame = new Game(); // Créez une nouvelle instance de Game si nécessaire
      await newGame.startGame(cols, rows, mines, pseudo);
    }
  });
}

getDatafromForm();
