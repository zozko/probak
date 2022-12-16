//display

const displayWrapper = document.querySelector('.display');
const btnWrapper = document.querySelector('.menu');

const stratStopBtn = makeEmnt(btnWrapper, 'button', 'start', 'START');
stratStopBtn.addEventListener('click', game);


// jatekmezo
gamePad = {
    running: false //ezt figyeli, hogy fut e az eger
};
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
    speed: 2,
    live: 5,
    direction: 0,
    maxStep: 500,
    minStep: 25
};
const mouse = makeEmnt(gameArea, 'img', 'mouse');
mouse.src = 'mouse/mouZe.png';
mouseKoord = mouse.getBoundingClientRect();
eger.x = mouseKoord.x - meretKulonbsegX - 4;
eger.y = mouseKoord.y - meretKulonbsegY - 4;
// 0=le; 1=fel; 2=jobbra; 3=balra
eger.direction = Math.floor(Math.random() * 4);
eger.steps = Math.floor(Math.random() * eger.maxStep + eger.minStep);


//a gamepad 4px-el nagyobb
// console.log('EGER:', eger, '  JATEKTER: ', gamePad);
//eger koordinatai a jatekmezoben
// console.log('EGER a MEZOBEN x:', eger.x, '   y:', eger.y);
// console.log('meretkulnbseg X:', meretKulonbsegX, '    Y:', meretKulonbsegY);
const mouseInfo = makeEmnt(displayWrapper, 'p', 'mouse_info');

//kourzo avagy az egercsapo
const egercsapo = {
    hits: 10,
    talalt: false
}
gameArea.addEventListener('mousemove', function(event) {
    // console.log('Kurzor X', event.x);
    // console.log('Kurzor Y', event.y);
    egercsapo.x = event.x - meretKulonbsegX - 4; //?
    egercsapo.y = event.y - meretKulonbsegY - 4; //?
});
// gameArea.addEventListener('click', csapas);

function csapas() {
    console.log('csaptal.....');
    console.log('egercsapo X:', egercsapo.x, '  Y:', egercsapo.y);
    console.log('eger X:', eger.x, '  Y:', eger.y);

    if (egercsapo.x <= (eger.x + 120) && egercsapo.x >= eger.x &&
        egercsapo.y <= (eger.y + 120) && egercsapo.y >= eger.y) {
        console.log('%cmegdoglott', 'color:red');
        egercsapo.talalt = true;
        eger.live--;
        eger.speed++;
        eger.maxStep = 500 / eger.speed;
    } else {
        egercsapo.hits--;
        console.log('%cHA HA HA', 'color:green');
    }
    playerHits.innerText = `you have ${egercsapo.hits} hits left`;
};
const playerHits = makeEmnt(displayWrapper, 'div', 'player_info', `you have ${egercsapo.hits} hits left`);



//jatek indito funkcio
function game() {
    stratStopBtn.classList.toggle('stop');
    if (stratStopBtn.classList.contains('stop')) {
        stratStopBtn.innerText = 'STOP';
        gamePad.running = true;
        gameArea.addEventListener('click', csapas);
        mouseMoverFunk();
    } else {
        gamePad.running = false;
        gameArea.removeEventListener('click', csapas);
        stratStopBtn.innerText = 'CONTINUE';
    }
    // if (gamePad.running) {
    //     mouseMoverFunk();
    //     // window.requestAnimationFrame(mouseMoverFunk);
    // }
}




function mouseMoverFunk() {
    eger.steps--;
    console.log(eger.steps);
    mouseInfo.innerText = `mouse have ${eger.live} lifes left`;
    playerHits.innerText = `you have ${egercsapo.hits} hits left`;
    // console.log('KURZOR = ', egercsapo);
    // console.log('EGER a MEZOBEN x:', eger.x, '   y:', eger.y);

    // ha talalt tegyen uj egeret valahova
    if (egercsapo.talalt) {
        egercsapo.talalt = false;
        let newMouseX = Math.floor(Math.random() * 400);
        let newMouseY = Math.floor(Math.random() * 400);
        eger.x = newMouseX;
        eger.y = newMouseY;
    }

    //TODO ha pontosan akarod forgatni, akkor tudnod, kell hogy all az eger - honnan fordul!
    // if (eger.y < 499 && eger.x <= 0) {
    //     eger.y += 2;
    //     mouse.style.transform = 'rotate(0deg)'; //lefele
    // }

    // if (eger.y >= 499 && eger.x <= 499) {
    //     eger.x += 2;
    //     mouse.style.transform = 'rotate(-90deg)'; //jobbra
    // }

    // if (eger.x >= 499 && eger.y >= 0) {
    //     eger.y -= 2;
    //     mouse.style.transform = 'rotate(180deg)'; //felfele
    // }
    // if (eger.y <= 0 && eger.x >= 0) {
    //     eger.x -= 2;
    //     mouse.style.transform = 'rotate(90deg)'; //balra
    // }


    if (eger.direction === 0 && eger.y <= 499) {
        eger.y += eger.speed;
        mouse.style.transform = 'rotate(0deg)'; //lefele

    } else if (eger.direction === 1 && eger.y >= 0) {
        eger.y -= eger.speed;
        mouse.style.transform = 'rotate(180deg)'; //felfele

    } else if (eger.direction === 2 && eger.x <= 499) {
        eger.x += eger.speed;
        mouse.style.transform = 'rotate(-90deg)'; //jobbra

    } else if (eger.direction === 3 && eger.x >= 0) {
        eger.x -= eger.speed;
        mouse.style.transform = 'rotate(90deg)'; //balra

    } else {
        eger.direction = Math.floor(Math.random() * 4);
    }

    // console.log('eger.x', eger.x, 'eger.y', eger.y);
    mouse.style.top = eger.y + 'px';
    mouse.style.left = eger.x + 'px';

    if (eger.steps < 0) {
        eger.direction = Math.floor(Math.random() * 4);
        eger.steps = Math.floor(Math.random() * eger.maxStep + eger.minStep);
    }


    console.log(gamePad.running);

    if (eger.live <= 0 || egercsapo.hits <= 0) {
        window.cancelAnimationFrame(mouseMoverFunk);
        gamePad.running = false;
        if (eger.live <= 0 && egercsapo.hits > 0) {
            //nyertel
            playerHits.innerText = `YOU WON ${egercsapo.hits} : 0`;
        };
        if (eger.live > 0 && egercsapo.hits <= 0) {
            //vesztettel
            playerHits.innerText = `THE MOUSE WON ${eger.live} : 0`;
        };
        //nullzni a dolgokat
        stratStopBtn.classList.remove('stop');
        stratStopBtn.innerText = 'START';
        gameArea.removeEventListener('click', csapas);
        // stratStopBtn.removeEventListener('click', game);
        startNewGame();

    } else {
        if (gamePad.running) {
            window.requestAnimationFrame(mouseMoverFunk);
        }
    }

};







//restart segelyfunkcio
function startNewGame() {


    console.log('inditsuk az uj jatekot...');
    //eger parameterei
    eger.speed = 2;
    eger.live = 5;
    eger.direction = Math.floor(Math.random() * 4);
    eger.steps = Math.floor(Math.random() * eger.maxStep + eger.minStep);

    //egercsapo
    egercsapo.hits = 10;

    gamePad.running = true;
}


//elem keszito funkcio parent-szuleo, elTyp - elem tipusa, className - hozzadando class, inText - szoveg
function makeEmnt(parent, elTyp, className, inText) {
    const tempELm = document.createElement(elTyp);
    tempELm.classList.add(className);
    if (inText) tempELm.innerText = inText;
    parent.appendChild(tempELm);

    return tempELm;
}