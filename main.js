"use strict";
window.addEventListener('load', () => {

  // Je récupère les informations du formulaire et j'enregistre chaque valeur dans une constante
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pseudo = e.target.pseudo.value;
    const col = e.target.col.value;
    const row = e.target.row.value;
    const mines = e.target.mines.value;

    // Je fais mon appel à l'API en utilisant les valeurs des inputs
    let url = `https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${row}&cols=${col}&mines=${mines}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  });

});
