"use strict";

window.addEventListener('load', () => {

  const form = document.querySelector('form');
  let newData;
  let gridElement; 

  form.addEventListener('submit', (e) => {

    const cols = e.target.cols.value;
    const rows = e.target.rows.value;
    const mines = e.target.mines.value;
    const pseudo = e.target.pseudo.value;

    let url = `https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${rows}&cols=${cols}&mines=${mines}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(function(data) {
        newData = adjoiningMines(rows, cols, data); 
        gridElement = generateGrid(rows, cols);
        document.querySelector('.choiceGame').classList.add('disabled');
        document.querySelector('.welcomePseudo').textContent="A toi de jouer "+ pseudo;
        document.querySelector('.game').classList.remove('disabled');
         const game = document.querySelector('.game');
        game.appendChild(gridElement);
        
      });
      e.preventDefault();
  });

  function generateGrid(rows, cols) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("grid");
  
    // Création des lignes
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      let rowElement = document.createElement("div");
      rowElement.classList.add("row");
  
      // Création des colonnes de chaque ligne
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        let divElement = document.createElement("div");
        divElement.classList.add(
          "cell",
          `cell-row-${rowIndex}-col-${colIndex}`);
        divElement.dataset.row = rowIndex; 
        divElement.dataset.col = colIndex; 
        divElement.dataset.value = newData[rowIndex][colIndex].value;
       
        rowElement.appendChild(divElement);
      }
  
      gridElement.appendChild(rowElement);
      
    }
  
    gridElement.addEventListener('click', (e) => cellClicked(e, newData)); // pour le click gauche
    gridElement.addEventListener('contextmenu', (e) => {
      e.preventDefault(); 
      cellClicked(e, newData); // pour le click droit
    });
    return gridElement;
  }

  function adjoiningMines(rows, cols, data) {
    let newData = JSON.parse(JSON.stringify(data));
   
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newData[i][j] = {
          value: data[i][j],
          isMined: false
        };//ici je défini les attributs de newData, la value avant incrémentation et isMined par défaut à false
  
        if (data[i][j] === 1) {
          newData[i][j].isMined = true;
          continue; // si data === 1 l'attribut passe à true et je skip pour ne pas mettre les bombes en incrémentation
        }
  
        // Je vérifie les  cellules adjacentes à la case actuelle (i, j) en bouclant sur les lignes et colonnes adjacentes
        for (let x = -1; x <= 1; x++) {   // on vérifie les lignes de -1 à +1
          for (let y = -1; y <= 1; y++) { //on vérifie les colonnes de -1 à +1
            if (x === 0 && y === 0) {
              // j'ignore la cellule actuelle
              continue;
            }
  
            const newRow = i + x; // je créé une variable qui stocke les coordonnées de la ligne donc i +1 ou i+0 ou i-1
            const newCol = j + y; // de même pour les colonnes
  
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && data[newRow][newCol] === 1) {
              // je vérifie si on reste bien ds la grille c'est à dire que la  nouvelle ligne ne peut pas dépasser la taille de la ligne et etre inférieur à 0
              newData[i][j].value++; // j'incrémente de 1 la case adjacente
            }
          }
        }
      }
    }
    console.table(newData);
    return newData;
  
  }

// gestion des intéractions au Click.
function cellClicked(e, newData) {
  let cell = e.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const cellValue = cell.dataset.value;
  const isMined = newData[row][col].isMined;

  if (e.button === 2) { // Clic droit
    e.preventDefault(); // Empêche le menu contextuel de s'afficher
    if (!cell.classList.contains('flag')) {
      cell.classList.add('flag');
    } else {
      cell.classList.remove('flag');
    }
  } else { // Click gauche
    cell.innerHTML = cellValue;

    if (isMined === true) {
      cell.innerHTML = "";
      cell.classList.add('boum');
      console.log('Boum');
    } else if (cellValue === '0') {
      hasNoMines(newData, row, col);
    }
  }
}


// fonction qui révele les cases adjacentes qu n'ont pas de mines
function hasNoMines(newData, row, col) {
  if (row < 0 || row >= newData.length || col < 0 || col >= newData[0].length || newData[row][col].noMined === true) {
    return; // Stop  la récursion pour les cases hors grille ou déja révélé
  }

  const cell = document.querySelector(`.cell-row-${row}-col-${col}`);
  console.log(cell);
  const value = newData[row][col].value;
  console.log(value);

  if (value === 0) {
    newData[row][col].noMined = true; 
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const newRow = row + x; 
        const newCol = col + y;
        cell.innerHTML = value;
        hasNoMines(newData, newRow, newCol); 
      }
    }
  } 
}


});
