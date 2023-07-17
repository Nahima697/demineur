"use strict";
window.addEventListener('load', () => {

  // Je récupère les informations du formulaire et j'enregistre chaque valeur dans une constante
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pseudo = e.target.pseudo.value;
    const cols = e.target.cols.value;
    const rows = e.target.rows.value;
    const mines = e.target.mines.value;

    // Je fais mon appel à l'API en utilisant les valeurs des inputs
    let url = `https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${rows}&cols=${cols}&mines=${mines}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(function(data) {
        const newData = adjoiningMines(rows, cols, data);
        generateGrid(rows, cols, newData);
        console.log(newData);
      
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
        rowElement.appendChild(colElement);
     

        // Vérifier s'il y a une mine à cette position : le data[i][j] cible la case
        if (data[i][j] === 1) {
          colElement.classList.add("mined");
        }
      }

      gridElement.appendChild(rowElement);
    }

    // Ajouter la grille générée à la page
    document.body.appendChild(gridElement);
    adjoiningMines(rows, cols, data);
  
    gridElement.addEventListener('click', cellClicked);
  }

  function adjoiningMines(rows, cols, data) {
    // Créer une nouvelle variable newData et copier les valeurs de data
    let newData = data;
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (data[i][j] === 1) {
          // en haut
          if (typeof newData[i - 1]?.[j] === "number") {
            newData[i - 1][j]++;
          }
          // en haut à droite
          if (typeof newData[i - 1]?.[j + 1] === "number") {
            newData[i - 1][j + 1]++;
          }
          // à droite
          if (typeof newData[i]?.[j + 1] === "number") {
            newData[i][j + 1]++;
          }
          // en bas à droite
          if (typeof newData[i + 1]?.[j + 1] === "number") {
            newData[i + 1][j + 1]++;
          }
          // en bas
          if (typeof newData[i + 1]?.[j] === "number") {
            newData[i + 1][j]++;
          }
          // en bas à gauche
          if (typeof newData[i + 1]?.[j - 1] === "number") {
            newData[i + 1][j - 1]++;
          }
          // à gauche
          if (typeof newData[i]?.[j - 1] === "number") {
            newData[i][j - 1]++;
          }
          // en haut à gauche
          if (typeof newData[i - 1]?.[j - 1] === "number") {
            newData[i - 1][j - 1]++;
          }
        }
      }
    } 
    return newData;
  }

  function cellClicked (e) {
    let cell = e.target;
    if(e.button === 0) {
      console.log('click gauche');
    }
    if(e.button === 2) {
      console.log('click droit');
    }
    console.log("Vous m'avez cliqué !");
    console.log(cell);
  }
});
