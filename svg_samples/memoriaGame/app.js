//global valtozok
let pcColorArr = [];
let playerClickedArr = [];
let tovabb = true;
let pcPickArr = [];
let contiNeau = false;

const DOMelems = (function() {
    // console.log('betoltve');
    let gameLevel = 1;
    let gameRun = false;



    const gameField = document.querySelector('.field');
    const startBtn = document.querySelector('.strBtn');
    const levle = document.querySelector('.level');
    levle.style.visibility = 'hidden';
    const messageWindow = document.querySelector('.monitor');
    const best = document.querySelector('.result');
    const info = document.querySelector('.info');



    return {
        gLevel: gameLevel,
        displyaLevel: levle,
        runner: gameRun,
        box: gameField,
        start: startBtn,
        messageBox: messageWindow,
        personalBest: best,
        gameInfo: info
    };
})();


//jatekos probalkozasa
let playerTrials = 0;

// mezo kirajzols
const playGame = (function() {
    let colorBoxes = [];
    let trayingNo = DOMelems.gLevel;
    // console.log('LEVEL szint: ', DOMelems.gLevel);
    let boxom = DOMelems.box;
    // console.log('startBTN:', DOMelems.start);

    displayLevel(DOMelems.gLevel);
    saveBestResult();

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

    // console.log('a jatek dobozok tombje:', colorBoxes);

    DOMelems.start.addEventListener('click', startGame);


    return {
        trials: trayingNo,
        gameBoxes: colorBoxes,
        repaint: boxPainter
    };
})();


function startGame() {

    DOMelems.gameInfo.style.visibility = 'hidden';
    DOMelems.displyaLevel.style.visibility = 'visible';
    // console.log('megnyomtal...');
    if (!DOMelems.runner) {
        DOMelems.runner = true;
        DOMelems.start.disabled = true;
        DOMelems.start.style.visibility = 'hidden';
        if (contiNeau) {
            playGame.repaint();
            // console.log('%c FOLYTATAS...', 'color:orange');
            contiNeau = false;
        }
        theGameMain();
    }
    // console.log('teljes szin sorrend:', pcColorArr);
};

// rajzolja ki a jatekmezot = net a negyzetek szama
function paintFields(net) {
    const colorArr = ['blue', 'red', 'lime', 'orange', 'blue', 'coral', 'blueviolet', 'pink', 'green', 'black', 'PapayaWhip', 'cyan', 'brown', 'DarkOliveGreen', 'grey'];
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

    DOMelems.messageBox.innerText = `van hátra: ${DOMelems.gLevel - playerTrials} próbálkozásod`;

    return {
        square: ujEl // a mezo egyes elemei
    }
};


function theGameMain() {
    // veletlen szeru mezoforgatas a jatekszint szama szerint:
    let mintaLefutott = sequence(DOMelems.gLevel);
    let gameBoxes = document.querySelectorAll('.colorBox');
    gameBoxes.forEach(box => { box.removeEventListener('click', this) });


    gameBoxes.forEach(box => {
        box.addEventListener('click', (el) => {
            playerTrials++;
            DOMelems.messageBox.innerText = `van hátra: ${DOMelems.gLevel - playerTrials} próbálkozásod`;
            // ujEl.addEventListener('click', (el) => {

            let clickedElementColor = el.target.style.background;

            el.target.style.transform = 'scale(0.3) rotate(180deg)';
            // el.target.style.transform = '';
            setTimeout(() => {
                // el.target.style.transform = 'rotate(45deg)';
                el.target.style.transform = 'rotate(0deg) scale(1)';
            }, 500);
            // console.log(playerTrials, '. lenyomot elem szine', clickedElementColor);
            playerClickedArr.push(clickedElementColor);

            // console.log('lenyomottak :', playerClickedArr);
            // console.log('PC szinsorredn tomb :', pcPickArr);
            // console.log('jatekos click: ', playerTrials, '   - LEVEL: ', DOMelems.gLevel);
            // console.log('ELLENORZES ', pcPickArr, ' Vs ', playerClickedArr);

            if (playerTrials < 0 || playerTrials > DOMelems.gLevel) {
                clearGameProps();
                displayLevel(DOMelems.gLevel);
                startGame();
            }

            if (playerTrials === DOMelems.gLevel) {
                // console.log('nincs tobb probalkozasod! ! !');
                // box.removeEventListener('click', this, true);

                let gameResult = pcPickArr.every((el, inx) => el === playerClickedArr[inx]);

                if (gameResult) {
                    DOMelems.messageBox.innerText = 'OK';
                    setTimeout(() => {
                        clearGameProps(false);
                        // console.log('NYERTEL');
                        // playerTrials = 0;
                        // pcColorArr = [];
                        // pcPickArr = [];
                        // playerClickedArr = [];
                        // playGame.gameBoxes = [];
                        // DOMelems.box.innerHTML = '';
                        // DOMelems.gLevel++;
                        // DOMelems.start.disabled = false;

                        // console.log("%cUJRAINDUL: ", "color:green");
                        // DOMelems.runner = false;
                        playGame.repaint();
                        displayLevel(DOMelems.gLevel);
                        startGame();
                        DOMelems.messageBox.innerText = `van hátra: ${DOMelems.gLevel - playerTrials} próbálkozásod`;
                        // DOMelems.messageBox.innerHTML = '';
                    }, 1800);
                } else {
                    // console.log('NO NEM NYERTEL');
                    saveBestResult();
                    let gameOverText = eleMaker(DOMelems.messageBox, 'p', 'message');
                    gameOverText.innerText = 'GAME OVER';
                    let ujraBtn = eleMaker(DOMelems.messageBox, 'button', 'restartBtn');
                    ujraBtn.innerText = 'restart';
                    ujraBtn.addEventListener('click', () => {
                        clearGameProps(true);
                        displayLevel(DOMelems.gLevel);
                        startGame();
                    });

                    let quitBtn = eleMaker(DOMelems.messageBox, 'button', 'quitBtn');
                    quitBtn.innerText = 'quit';
                    quitBtn.addEventListener('click', () => {
                        clearGameProps(true);
                        displayLevel(DOMelems.gLevel);
                    });
                }

            }
            // startGame();
        });
    });


    //szamoljuk mennyi negyzetet nyomott le - ugyan annyit nyomott le, mint a leve, akkor ellenorizzuk sorrendet

};


function saveBestResult() {
    let d = new Date();
    let bestRes = localStorage.getItem('memoryBest') || 0;
    let timeStmp = localStorage.getItem('memoryTimeStamp') || 'no data';

    if (!bestRes) {
        localStorage.setItem('memoryBest', 0);
        localStorage.setItem('memoryTimeStamp', d);
        DOMelems.personalBest.innerHTML = `eddigi legjobb eredményed:`;
    }

    if (bestRes < DOMelems.gLevel) {
        let personalRecord = DOMelems.gLevel - 1;
        localStorage.setItem('memoryBest', personalRecord);
        localStorage.setItem('memoryTimeStamp', d);
        DOMelems.personalBest.innerHTML = `eddigi legjobb eredményed: ${bestRes}<br>${timeStmp}`;
    } else {
        DOMelems.personalBest.innerHTML = `eddigi legjobb eredményed: ${bestRes}<br>${timeStmp}`;
    }
}

// a jatek visszaallitasa alaphelyzetbe
function clearGameProps(allProp) {
    allProp ? DOMelems.gLevel = 1 : DOMelems.gLevel++;

    if (allProp) {
        DOMelems.gLevel = 1;
        DOMelems.start.style.visibility = 'visible';
        DOMelems.messageBox.innerHTML = '';
        contiNeau = true;
        playGame.gameBoxes = [];
    } else {
        // DOMelems.gLevel++;
        // contiNeau = false;
    }

    playerTrials = 0;
    pcColorArr = [];
    pcPickArr = [];
    playerClickedArr = [];
    // playGame.gameBoxes = [];
    DOMelems.start.disabled = false;
    DOMelems.box.innerHTML = '';
    DOMelems.runner = false;

    // contiNeau = true;

    // playerTrials = 0;
    // pcColorArr = [];
    // pcPickArr = [];
    // playerClickedArr = [];
    // DOMelems.box.innerHTML = '';
    // DOMelems.gLevel++;
};


function sequence(nums) {
    let readyBoxes = document.querySelectorAll('.colorBox');
    nums--;
    if (nums < 0) {
        return;
    }

    let boxNumber = Math.floor(Math.random() * readyBoxes.length);
    // console.log('a PC valasztott boxanak szine: ', readyBoxes[boxNumber].style.background);
    // betesszuk a megjelolt szint a pcColor tombbe:
    pcPickArr.push(readyBoxes[boxNumber].style.background);
    readyBoxes[boxNumber].style.transform = 'scale(.4)';
    setTimeout(() => {
        readyBoxes[boxNumber].style.transform = "scale(1)";
        setTimeout(() => {
            sequence(nums);
        }, 500);
    }, 500);

    return true;

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