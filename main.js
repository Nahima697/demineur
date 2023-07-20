"use strict";

window.addEventListener('load', () => {

  const form = document.querySelector('form');
  let newData;
  let gridElement; 

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cols = e.target.cols.value;
    const rows = e.target.rows.value;
    const mines = e.target.mines.value;

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
        gridElement = generateGrid(rows, cols, newData);
        document.body.appendChild(gridElement);
      });
  });

  function generateGrid(rows, cols, data) {
    let gridElement = document.createElement("div");
    gridElement.classList.add("grid");

    // Création des lignes
    for (let i = 0; i < rows; i++) {
      let rowElement = document.createElement("div");
      rowElement.classList.add("row");

      // Création des colonnes de chaque ligne
      for (let j = 0; j < cols; j++) {
        let colElement = document.createElement("div");
        colElement.classList.add("col");

        if (newData[i][j].isMined === true) {
          colElement.innerHTML = '<img src="image/bombe.png" width="50" height ="50" alt="Bombe">';
        } else {
          colElement.innerText = newData[i][j].value;
        }

        rowElement.appendChild(colElement);
      }

      gridElement.appendChild(rowElement);
    }

    gridElement.addEventListener('click', (e) => cellClicked(e, newData));
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
        for (let x = -1; x <= 1; x++) {// on vérifie les lignes de -1 à +1
          for (let y = -1; y <= 1; y++) {//on vérifie les colonnes de -1 à +1
            if (x === 0 && y === 0) {
              // j'ignore la cellule actuelle
              continue;
            }
  
            const newRow = i + x; // je créé une variable qui stocke les coordonnées de la ligne donc i +1 ou i+0 ou i-1
            const newCol = j + y; // de même pour les colonnes
  
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && data[newRow][newCol] === 1) {
              // je vérifie si ob reste bien ds la grille c'est à dire que la  nouvelle ligne ne peut pas dépasser la taille de la ligne et etre inférieur à 0
              newData[i][j].value++; // j'incrémente de 1 la case adjacente
            }
          }
        }
      }
    }
  
    console.log("Data Array:");
    console.table(data);
    console.log("NewData Array:");
    console.table(newData);
  
    return newData;
  }
  

  function cellClicked(e, data) {
    let cell = e.target;
    console.log(cell);

    if (e.button === 0) {
      const row = cell.parentNode.dataset.row;
      const col = cell.dataset.col;
      console.log(row, col);
      cell.classList.remove('invisible');
      console.log('Click gauche');
    }
    if (e.button === 2) {
      console.log('Click droit = drapeau');
    }
    console.log("Vous m'avez cliqué !");
    console.log(data);
  }
});
