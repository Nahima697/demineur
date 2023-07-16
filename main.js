"use strict";
window.addEventListener('load', ()=> {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('pseudo:', e.target.pseudo.value)
        console.log('Col:', e.target.col.value)
        console.log('Row:', e.target.row.value)
        console.log('Mines:', e.target.mines.value)
    });


})

