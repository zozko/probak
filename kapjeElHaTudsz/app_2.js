// jatekmezo
gamePad = {};
let meretKulonbsegX, meretKulonbsegY
const gameArea = document.querySelector('.gamepad');

let gameareaKoord = gameArea.getBoundingClientRect();
gamePad.x = gameareaKoord.x;
gamePad.y = gameareaKoord.y;
meretKulonbsegX = gamePad.x;
meretKulonbsegY = gamePad.y;

addEventListener('resize', () => {
    //ha jatek kozben megvaltozik a browser nagysaga, aktualizalja a jatekmezo elhelyeszkedeset
    gameareaKoord = gameArea.getBoundingClientRect();
    gamePad.x = gameareaKoord.x;
    gamePad.y = gameareaKoord.y;
    meretKulonbsegX = gamePad.x;
    meretKulonbsegY = gamePad.y;
});



//az eger a mezoben
eger = {
    speed: 5
};
const mouse = makeEmnt(gameArea, 'img', 'mouse');
mouse.src = 'mouse/mouZe.png';
mouseKoord = mouse.getBoundingClientRect();
// eger.x = gamePad.x; // - gamePad.x + 4; //x = 0 a jatekmezoben
// eger.y = gamePad.y; // - gamePad.y + 4; // y = 0 a jatekmezoben
eger.x = mouseKoord.x - meretKulonbsegX - 4;
eger.y = mouseKoord.y - meretKulonbsegY - 4;

//a gamepad 4px-el nagyobb
// console.log('EGER:', eger, '  JATEKTER: ', gamePad);
//eger koordinatai a jatekmezoben
// console.log('EGER a MEZOBEN x:', eger.x, '   y:', eger.y);
// console.log('meretkulnbseg X:', meretKulonbsegX, '    Y:', meretKulonbsegY);

//kourzo avagy az egercsapo

const egercsapo = {}
gameArea.addEventListener('mousemove', function(event) {
    console.log('Kurzor X', event.x);
    console.log('Kurzor Y', event.y);
    egercsapo.x = event.x - meretKulonbsegX - 4;
    egercsapo.y = event.y - meretKulonbsegY - 4;
});



window.requestAnimationFrame(mouseMoverFunk);



function mouseMoverFunk() {
    console.log('KURZOR = ', egercsapo);
    // console.log('EGER a MEZOBEN x:', eger.x, '   y:', eger.y);
    if (eger.y < 500 && eger.x <= 0) {
        mouse.style.transform = 'rotate(0deg)';
        eger.y += 3;
    }

    if (eger.y >= 500 && eger.x <= 500) {
        eger.x += 3;
        mouse.style.transform = 'rotate(-90deg)';
    }

    if (eger.x >= 500 && eger.y >= 0) {
        eger.y -= 3;
        mouse.style.transform = 'rotate(180deg)';
    }
    if (eger.y <= 0 && eger.x >= 0) {
        eger.x -= 3;
        mouse.style.transform = 'rotate(90deg)';
    }

    if (egercsapo.x === eger.x || egercsapo.y === eger.y) {
        console.log('%cWAZZE EKAPTAD ! ! !', 'color:red');
    }
    console.log('eger.x', eger.x, 'eger.y', eger.y);
    mouse.style.top = eger.y + 'px';
    mouse.style.left = eger.x + 'px';
    window.requestAnimationFrame(mouseMoverFunk);
};









//elem keszito funkcio parent-szuleo, elTyp - elem tipusa, className - hozzadando class, inText - szoveg
function makeEmnt(parent, elTyp, className, inText) {
    const tempELm = document.createElement(elTyp);
    tempELm.classList.add(className);
    if (inText) tempELm.innerText = inText;
    parent.appendChild(tempELm);

    return tempELm;
}