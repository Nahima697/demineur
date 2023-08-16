"use strict";
//fonction qui génère la grille
function generateGrid(rows, cols,newData) {
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
    return gridElement;
}

export { generateGrid};