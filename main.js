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
        // let mines = data.mines;
        generateGrid(rows, cols);
      });
  });

  function generateGrid(rows, cols) {
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
      }

      gridElement.appendChild(rowElement);
    }

    // Ajouter la grille générée à la page
    document.body.appendChild(gridElement);
  }

});
