//IIFE - azonnal lefut
let objektumTarolo = (() => {
    // console.log('lefutott....');

    //privat valtozok
    let negyzet = 'szines_negyzet';
    let gomb = '#gomb';
    let szinek = ['#FF0000', '#00FF00', '#0000FF'];

    return {
        kocka: negyzet,
        gomb: gomb,
        color: szinek
    }
})();


// console.log(objektumTarolo.gomb, objektumTarolo.kocka, objektumTarolo.verzio);
let counter = 0;
document.querySelector(objektumTarolo.gomb).addEventListener('click', () => {
    if (counter > 2) {
        counter = 0;
    }
    document.getElementsByClassName(objektumTarolo.kocka)[0].style.backgroundColor = objektumTarolo.color[counter];
    counter++;
});

// ez undefined lesz mert ezt a valtozot nem latjuk kivulrol
console.warn(objektumTarolo.negyzet);
console.info(objektumTarolo);