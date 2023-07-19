"use strict";

window.addEventListener('load', () => {

  const form = document.querySelector('form');
  let newData;
  let gridElement; // Declare gridElement globally

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

        if (data[i][j] === 1) {
          colElement.innerHTML = '<img src="image/bombe.png" width="50" height ="50" alt="Bombe">';
        } else {
          colElement.innerText = newData[i][j];
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
        if (data[i][j] === 1) {
         
          continue;// permet de ne pas incrémenter les cases qui ont une bombe
        }
  
        // en haut
        if (typeof newData[i - 1]?.[j] === "number" && newData[i - 1][j] === 1) {
          newData[i][j]++;
        }
  
        // en haut à droite
        if (typeof newData[i - 1]?.[j + 1] === "number" && newData[i - 1][j + 1] === 1) {
          newData[i][j]++;
        }
  
        // à droite
        if (typeof newData[i]?.[j + 1] === "number" && newData[i][j + 1] === 1) {
          newData[i][j]++;
        }
  
        // en bas à droite
        if (typeof newData[i + 1]?.[j + 1] === "number" && newData[i + 1][j + 1] === 1) {
          newData[i][j]++;
        }
  
        // en bas
        if (typeof newData[i + 1]?.[j] === "number" && newData[i + 1][j] === 1) {
          newData[i][j]++;
        }
  
        // en bas à gauche
        if (typeof newData[i + 1]?.[j - 1] === "number" && newData[i + 1][j - 1] === 1) {
          newData[i][j]++;
        }
            
        // à gauche
        if (typeof newData[i]?.[j - 1] === "number" && newData[i][j - 1] === 1) {
          newData[i][j]++;
        }
  
        // en haut à gauche
        if (typeof newData[i - 1]?.[j - 1] === "number" && newData[i - 1][j - 1] === 1) {
          newData[i][j]++;
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
