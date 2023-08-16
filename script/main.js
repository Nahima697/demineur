import { Game } from "./module/game.js";
// fonction principal qui récupère les données du formulaire et instancie le new Game
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
  });
}

getDatafromForm(); // j'appelle la fonction


