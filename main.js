"use strict";
window.addEventListener('load', ()=> {

    // je récupère les informations du formulaire et j'enregistre chaque valeur dans une constante
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const pseudo =  e.target.pseudo.value;
        const col = e.target.col.value;
        const row = e.target.row.value;
        const mines = e.target.mines.value;
        
    });

})


