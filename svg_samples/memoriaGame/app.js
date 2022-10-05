const DOMelems = (function() {
    // console.log('betoltve');
    let gameLevel = 1;
    let gameRun = false;

    const gameField = document.querySelector('.field');
    const startBtn = document.querySelector('.strBtn');
    const levle = document.querySelector('.level');



    return {
        gLevel: gameLevel,
        displyaLevel: levle,
        runner: gameRun,
        box: gameField,
        start: startBtn
    };
})();

//global valtozok
let pcColorArr = [];
let playerClickedArr = [];
let tovabb = true;
let playerTrials = 0;


const playGame = (function() {
    let trayingNo = DOMelems.gLevel;
    // console.log('startBTN:', DOMelems.start);
    DOMelems.displyaLevel.innerText = `level: ${DOMelems.gLevel}`;
    let boxom = DOMelems.box;

    /* mig a level kisebb 10-nel csak 2 x 2 es negyzetet rajzoljon
    amikor a level nagyobb 10 akkor mar 3 x 3 negyzetet rajzoljon
    */

    if (DOMelems.gLevel <= 9) {
        // boxom.classList.remove('harom');
        boxom.classList.add('ketto');
        for (let i = 0; i < 4; i++) {
            tovabb = true;
            paintFields(4);
        }
    } else {
        // boxom.classList.remove('ketto');
        boxom.classList.add('harom');
        for (let i = 0; i < 9; i++) {
            tovabb = true;
            paintFields(9);
        }

    };

    DOMelems.start.addEventListener('click', startGame);


    return {
        trials: trayingNo
    }
})();





function startGame() {
    // console.log('megnyomtal...');
    if (!DOMelems.runner) {
        DOMelems.runner = true;
        DOMelems.start.disabled = true;
    }
    console.log('teljes szin sorrend:', pcColorArr);
}

//jatek 




// rajzolja ki a jatekmezot = net a negyzetek szama
function paintFields(net) {
    const colorArr = ['blue', 'red', 'lime', 'orange', 'blue', 'blueviolet', 'pink', 'green', 'black', 'cyan', 'brown', 'DarkOliveGreen'];
    // console.log('a negyzetem ', net);
    // console.log('a colorArr merete: ', colorArr.length);

    let ujEl = eleMaker(DOMelems.box, 'div', 'colorBox');
    ujEl.addEventListener('click', (el) => {
        playerTrials++;
        let clickedElementColor = el.target.style.background;
        console.log('a lenyomot elem szine', clickedElementColor);
        playerClickedArr.push(clickedElementColor);
        console.log('lenyomottak :', playerClickedArr);

        //szamoljuk mennyi negyzetet nyomott le - ugyan annyit nyomott le, mint a leve, akkor ellenorizzuk sorrendet
        if (playerTrials === playGame.trials) {
            //elenorizni, hogy jot/jokat-e nyomott meg = a ket tomb sorrendjenek egyformanak kell lennie

            //ha jot nyomott le akkor level++

            //ha rosszat nyomott le GAME OVER
        }
    });
    net == 4 ? ujEl.classList.add('box2') : ujEl.classList.add('box3');

    // do {
    while (tovabb) {
        let ind = Math.floor(Math.random() * colorArr.length);
        // console.log('index: ', ind);
        if (!pcColorArr.includes(colorArr[ind])) {
            tovabb = false;
            pcColorArr.push(colorArr[ind]);
            ujEl.style.background = colorArr[ind];
        }
        // console.log('pcColorArr: ', pcColorArr);
        // console.log('OK?', tovabb);
    };

    // } while (tovabb);
    // console.log(ujEl);
};

// elem letrehozo funkcio
function eleMaker(parent, elem, setClass) {
    // console.log('rajzolom... ');
    let newElem = document.createElement(elem);
    newElem.classList.add(setClass);
    parent.appendChild(newElem);

    return newElem;
};