"use strict";

function adjoiningMines(rows, cols,data) {
    let newData = JSON.parse(JSON.stringify(data));
   
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newData[i][j] = {
          value: data[i][j],
          isMined: false,
          revealed: false,
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
    return newData;
  }

  export { adjoiningMines};