"use strict";
// mes imports
import { Api } from "./module/api.js";
import { generateGrid } from "./module/grid.js";
import { adjoiningMines } from "./module/adjoiningMines.js";
import { cellClicked } from "./module/cellCliked.js";

const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cols = parseInt(form.querySelector('#cols').value);
  const rows = parseInt(form.querySelector('#rows').value);
  const mines = parseInt(form.querySelector('#mines').value);

  const data = await Api.getData(cols, rows, mines);
  const newData = adjoiningMines(rows, cols,data);
  const gridElement = generateGrid(rows, cols, newData);

  gridElement.addEventListener('click', (e) => cellClicked(e, newData));
  gridElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    cellClicked(e, newData);
 
  });

  document.querySelector('.choiceGame').classList.add('disabled');
  document.querySelector('.welcomePseudo').textContent="A toi de jouer "+ pseudo;
  document.querySelector('.game').classList.remove('disabled');
  const game = document.querySelector('.game');
  game.appendChild(gridElement);
  const cell = e.target;

});
