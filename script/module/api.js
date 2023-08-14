"use strict";

class Api {
    static async getData(cols, rows, mines) {
      let url = `https://minesweeper.js.apprendre-est.fun/generate_grid.php?rows=${rows}&cols=${cols}&mines=${mines}`;
      const response = await fetch(url);
      const data = await response.json();
    
      return data;
    }
  }

export { Api };