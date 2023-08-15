
import { Game } from "./module/game.js";


const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cols = parseInt(form.querySelector('#cols').value);
  const rows = parseInt(form.querySelector('#rows').value);
  const mines = parseInt(form.querySelector('#mines').value);
  const pseudo = form.querySelector('#pseudo').value;
  const game = new Game();
  await game.startGame(cols, rows, mines,pseudo);
  

});
