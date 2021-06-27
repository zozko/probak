let gomb = document.querySelectorAll("div");
let color;
let newColor = 'brown';
let active;
console.log(gomb + " a lista hossza: " + gomb.length);


//itt megadjuk, hogy mit csinaljon az egyes divekre klikkelve
gomb.forEach(elem => {
    // console.warn(elem);
    elem.addEventListener('click', (e) => {
        active = elem.getAttribute('aria-value');
        color = elem.style.getPropertyValue('background-color');
        console.log(color + ' ative: ' + active);
        if (color !== 'brown') {
            console.log('lex barna');
            newColor = 'brown';
            elem.style.backgroundColor = newColor;
            elem.style.setProperty('backgroundColor', newColor);
            narancsosit(active);


        }

    });
})


//ez a funkcio narancssargara festi az ep nem narancssarga diveket - kiveve melyikre ep raklikkeltem
function narancsosit(akt) {
    console.log('narancsositban az aktiv: ' + akt);
    for (let i = 0; i < gomb.length; i++) {
        if ((akt - 1) !== i) {
            console.log('lex narancsa');
            newColor = 'orange';
            gomb[i].style.backgroundColor = newColor;
            gomb[i].style.setProperty('backgroundColor', newColor);
        }
    }
}