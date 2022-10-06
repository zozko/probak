//global valtozok
let pcColorArr = [];
let playerClickedArr = [];
let tovabb = true;
let pcPickArr = [];

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


//jatekos probalkozasa
let playerTrials = 0;

// mezo kirajzols
const playGame = (function() {
    let colorBoxes = [];
    let trayingNo = DOMelems.gLevel;
    console.log('LEVEL szint: ', DOMelems.gLevel);
    let boxom = DOMelems.box;
    // console.log('startBTN:', DOMelems.start);

    displayLevel(DOMelems.gLevel);

    /* mig a level kisebb 10-nel csak 2 x 2 es negyzetet rajzoljon
    amikor a level nagyobb 10 akkor mar 3 x 3 negyzetet rajzoljon
    */

    let boxPainter = function() {
        if (DOMelems.gLevel <= 9) {
            boxom.classList.add('ketto');
            for (let i = 0; i < 4; i++) {
                tovabb = true;
                let theBox = paintFields(4);
                colorBoxes.push(theBox);
            }
        } else {
            boxom.classList.add('harom');
            for (let i = 0; i < 9; i++) {
                tovabb = true;
                let theBox = paintFields(9);
                colorBoxes.push(theBox);
            }
        }

    };
    boxPainter();

    console.log('a jatek dobozok tombje:', colorBoxes);

    DOMelems.start.addEventListener('click', startGame);


    return {
        trials: trayingNo,
        gameBoxes: colorBoxes,
        repaint: boxPainter
    };
})();


function startGame() {
    // console.log('megnyomtal...');
    if (!DOMelems.runner) {
        DOMelems.runner = true;
        DOMelems.start.disabled = true;
        theGameMain();
    }
    console.log('teljes szin sorrend:', pcColorArr);
};

// rajzolja ki a jatekmezot = net a negyzetek szama
function paintFields(net) {
    const colorArr = ['blue', 'red', 'lime', 'orange', 'blue', 'blueviolet', 'pink', 'green', 'black', 'cyan', 'brown', 'DarkOliveGreen'];
    // console.log('a negyzetem ', net);
    // console.log('a colorArr merete: ', colorArr.length);

    let ujEl = eleMaker(DOMelems.box, 'div', 'colorBox');
    net == 4 ? ujEl.classList.add('box2') : ujEl.classList.add('box3');

    //feltolti a jatekmezot szines negyzetekkel
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


    return {
        square: ujEl // a mezo egyes elemei
    }
};


function theGameMain() {
    // veletlen szeru mezoforgatas a jatekszint szama szerint:
    let gameBoxes = document.querySelectorAll('.colorBox');
    sequence(DOMelems.gLevel);


    gameBoxes.forEach(box => {
        box.addEventListener('click', (el) => {
            playerTrials++;
            // ujEl.addEventListener('click', (el) => {
            let clickedElementColor = el.target.style.background;

            el.target.style.transform = 'scale(0.4)';
            setTimeout(() => {
                el.target.style.transform = 'scale(1)';
            }, 200);
            console.log(playerTrials, '. lenyomot elem szine', clickedElementColor);
            playerClickedArr.push(clickedElementColor);
            console.log('lenyomottak :', playerClickedArr);
            console.log('PC szinsorredn tomb :', pcPickArr);
            console.log('jatekos click: ', playerTrials, '   - LEVEL: ', DOMelems.gLevel);
            console.log('ELLENORZES ', pcPickArr, ' Vs ', playerClickedArr);


            if (playerTrials === DOMelems.gLevel) {
                console.log('nincs tobb probalkozasod! ! !');

                let gameResult = pcPickArr.every((el, inx) => el === playerClickedArr[inx]);

                if (gameResult) {
                    console.log('NYERTEL');
                    playerTrials = 0;
                    pcColorArr = [];
                    pcPickArr = [];
                    playerClickedArr = [];
                    playGame.gameBoxes = [];
                    DOMelems.box.innerHTML = '';
                    playGame.repaint();
                    DOMelems.gLevel++;
                    displayLevel(DOMelems.gLevel);
                    // DOMelems.start.disabled = false;
                    DOMelems.runner = false;
                    startGame();

                } else {
                    console.log('NO NEM NYERTEL');
                }

            }
            // startGame();
        });
    });

    //szamoljuk mennyi negyzetet nyomott le - ugyan annyit nyomott le, mint a leve, akkor ellenorizzuk sorrendet




};


function sequence(nums) {
    let readyBoxes = document.querySelectorAll('.colorBox');
    nums--;

    if (nums < 0) {
        return;
    }

    let boxNumber = Math.floor(Math.random() * readyBoxes.length);
    console.log('a PC valasztott boxanak szine: ', readyBoxes[boxNumber].style.background);
    // betesszuk a megjelolt szint a pcColor tombbe:
    pcPickArr.push(readyBoxes[boxNumber].style.background);
    readyBoxes[boxNumber].style.transform = 'scale(.4)';
    setTimeout(() => {
        readyBoxes[boxNumber].style.transform = "scale(1)";
        setTimeout(() => {
            sequence(nums);
        }, 1000);
    }, 500);
}

// elem letrehozo funkcio
function eleMaker(parent, elem, setClass) {
    // console.log('rajzolom... ');
    let newElem = document.createElement(elem);
    newElem.classList.add(setClass);
    parent.appendChild(newElem);

    return newElem;
};

//kiirja hanyadik levelben vagyunk
function displayLevel(lvl) {
    DOMelems.displyaLevel.innerText = `level: ${lvl}`;
}