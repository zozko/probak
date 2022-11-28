const displayWrapper = document.querySelector('.display_wrapper');
const gameArea = document.querySelector('.game_area');


let pressCounter = 0;
let messageBox = document.createElement('div');
let startBtn = document.createElement('button');
startBtn.classList.add('btn');
startBtn.innerText = 'START';
messageBox.classList.add('message');
messageBox.innerText = 'a kezdeshez nyomd meg a start gombot';
displayWrapper.appendChild(messageBox);
displayWrapper.appendChild(startBtn);
let bombakValtozo;
let scoreBox;
let colision = false;

//a jatekot inditja



document.addEventListener('keyup', pressOff);
document.addEventListener('keydown', pressOn);
startBtn.addEventListener('click', startGame);

let player = {
    run: false,
    score: 0,
    speed: 2,
    bomb: 10,
    bombak: []
};

let pressedKeys = {
    space: false
};

let enemyObj = [];
// let enemObjPosition = [];
let gameField = {};

function startGame(event) {
    player.bombak = [];
    if (player.bomb < 10) player.bomb = 10;
    gameArea.innerHTML = '';
    // displayWrapper.innerHTML = '';
    if (scoreBox) {
        scoreBox.innerHTML = '';
    }
    bombakValtozo = player.bomb;
    // console.log('bombakvaltozo = ', bombakValtozo);
    player.run = true;

    messageBox.innerHTML = '';
    startBtn.style.display = 'none';
    player.airCraft = document.createElement('img');
    player.airCraft.classList.add('aircraft');
    player.airCraft.src = 'imgs/aircraft.png';
    gameArea.appendChild(player.airCraft);
    player.X = player.airCraft.offsetLeft;
    player.Y = player.airCraft.offsetTop;

    scoreBox = document.createElement('div');
    scoreBox.classList.add('display_score');

    displayWrapper.appendChild(scoreBox);

    window.requestAnimationFrame(playGame);
};


function playGame() {

    messageBox.innerHTML = `fennmarado bombak szama: ${player.bomb}`;
    scoreBox.innerHTML = `score: ${player.score}`;
    //ez az aktualis lathato jatekmezo meretei w=szelesseg h=magassag
    gameField.w = window.innerWidth;
    gameField.h = window.innerHeight;

    let planeXcoord;
    let planeYcoord;
    let bombDirection = 'le';
    if (player.run) {
        while (enemyObj.length < 3) {
            let enObj = makeEnemyObj();
            enemyObj.push(enObj);
        }


        //leellenorizni, hogy a repulo nem e hajtott bele a hazba

        if (!pressedKeys.ArrowUp || !pressedKeys.ArrowDown) {
            //egyenesit
            bombDirection = 'le';
            player.airCraft.style.transform = 'rotate(0deg)';
        }

        if (pressedKeys.ArrowUp) {
            //felfele
            bombDirection = 'elore';
            player.Y -= player.speed;
            player.airCraft.style.transform = 'rotate(-45deg)';
        }
        if (pressedKeys.ArrowDown) {
            //lefele
            bombDirection = 'hatra';
            player.Y += player.speed;
            player.airCraft.style.transform = 'rotate(45deg)';
        }

        if (pressedKeys.space) {
            setTimeout(() => {
                pressCounter++;
                if (player.bomb >= 0 && pressCounter < 2) {
                    player.bomb--;
                    // console.log('lefuta bombagyar', player.bomb);
                    // console.log('BOMBAAA');
                    dropBomb(bombDirection);
                }
            }, 350);

        }
        player.airCraft.style.top = player.Y + 'px';
        player.airCraft.style.left = (player.X += player.speed) + 'px';

        colision = isAirCraftHitTheObject(player.airCraft, enemyObj);
        // console.log('karambol van?:', colision);
        moveBomb();
        if (colision) isGameOver();







        // messageBox.innerText = `width: ${gameField.w}  |  height: ${gameField.h}`;
        //rekurziv funkcio a mozgashoz
    }
    let planeGPS = player.airCraft.offsetLeft;

    // console.log(planeGPS, gameField.w);
    if (player.Y < 100 && pressedKeys.ArrowUp) {
        player.airCraft.style.transform = 'rotate(0deg)';
        player.Y += player.speed;
    }
    if (player.Y > (gameField.h - 120) && pressedKeys.ArrowDown) {
        player.airCraft.style.transform = 'rotate(0deg)';
        player.Y -= player.speed;
    }



    //a repulo mindig visszakerul a bal oldalra, ha kilep a jobb oldalon
    if ((planeGPS + 80) > gameField.w) {
        player.airCraft.style.left = '0px';
        player.X = 0;
    };
    if (player.run) {
        window.requestAnimationFrame(playGame);
    } else {
        window.cancelAnimationFrame(playGame);
        // stop the game
        // gameArea.innerHTML = '';
        let percent = (player.score / bombakValtozo) * 100;
        console.log(percent + '%');
        messageBox.innerHTML = 'GAME OVER';
        scoreBox.innerHTML = `you hit the target in ${percent}%`;
        startBtn.style.display = 'block';

        pressedKeys = {
            space: false
        }

        enemyObj = [];
        pressCounter = 0;
        player = {
            run: false,
            score: 0,
            speed: 2,
            bomb: 10,
            bombak: []
        };
    }

};

function moveBomb() {
    let bombs = document.querySelectorAll('.bomba');
    bombs.forEach((bomb, idx) => {
        // console.log('bomba index = ', idx);
        let tempCoorY = bomb.offsetTop;
        let tempCoorX = bomb.offsetLeft;
        // player.bombak.push(drctn);
        if (tempCoorY < (gameField.h - 15)) {
            // console.log('%cBOMBAK TOMB: ', 'color:blue', player.bombak);

            // console.log('bomba iranaya : ', player.bombak[idx]);
            if (player.bombak[idx] == 'elore') {
                bomb.style.left = (tempCoorX + 2) + 'px';
            } else if (player.bombak[idx] == 'hatra') {
                bomb.style.left = (tempCoorX - 1) + 'px';
            } else {
                bomb.style.left = tempCoorX + 'px';
            }

            bomb.style.top = (tempCoorY + 5) + 'px';
            // ellenorizni, hogy utkozott e epulettel


        } else {
            bomb.style.display = 'none';
        }

        //ha talalat volt
        if (testHitTarget(tempCoorX, tempCoorY)) {
            bomb.parentElement.removeChild(bomb);
            player.bombak.splice(idx, 1);
            player.score++;
        };
        if (!player.run) {
            console.log('bombatorles');

            bombs.forEach(bmbs => {
                bmbs.style.display = 'none';
            });
            // player.bombak = [];
            // player.bomb = 10;
        }

    });

};

function dropBomb(drctn) {
    player.bombak.push(drctn);
    let bomba = document.createElement('div');
    bomba.setAttribute('class', 'bomba');
    bomba.style.top = (player.Y + 30) + 'px';
    bomba.style.left = (player.X + 50) + 'px';
    gameArea.appendChild(bomba);
};

function pressOn(event) {
    event.preventDefault();
    let actualKey = (event.key == ' ') ? 'space' : event.key;
    pressedKeys[actualKey] = true;
    // console.log(pressedKeys);
};

function pressOff(event) {
    event.preventDefault();
    let actualKey = (event.key == ' ') ? 'space' : event.key;
    pressedKeys[actualKey] = false;
    pressCounter = 0;
    // console.log(pressedKeys);
};

function makeEnemyObj() {
    let enObj = document.createElement('div');
    // enemyObj.push(enObj);
    enObj.classList.add('enemy');
    objX = Math.floor(Math.random() * (gameField.w - (gameField.w / 4)) + 30);
    objWidth = Math.floor(Math.random() * (gameField.w / 3) + 30);
    objHeight = Math.floor(Math.random() * (gameField.h / 1.75) + 20);
    objColor = setObjColor();
    enObj.style.left = objX + 'px';
    enObj.style.width = objWidth + 'px';
    enObj.style.height = objHeight + 'px';
    enObj.style.backgroundColor = '#' + objColor;
    gameArea.appendChild(enObj);

    // getEnemyObjektPosition();


    return enObj;

};



function testHitTarget(bPosX, bPosY) {
    let contin = isGameOver();
    if (contin) { return false };
    //235  650
    // conso % le.log('TAGET...');
    // console.log('a bombak pozicioja:', bPosX, bPosY); // 235 , 650
    // console.log('az epuletek pozicioja', enemyObj);

    for (let i = 0; i < enemyObj.length; i++) {
        // console.log(i, enemyObj[i].offsetWidth);
        let objRight = enemyObj[i].offsetLeft + enemyObj[i].offsetWidth;

        if (enemyObj[i].offsetTop < bPosY && enemyObj[i].offsetLeft < bPosX && objRight > bPosX) {
            // console.log('TALALAT');
            enemyObj[i].remove();
            enemyObj.splice(i, 1);
            return true;
        }
    }
    // console.log('EPULETEK :', enemyObj);
}


//css szin gyarto funkcio
function setObjColor() {
    function mixColor() {
        let color = Math.floor(Math.random() * 256).toString(16);
        color = ('0' + color).substr(-2);
        return color;
    }
    return mixColor() + mixColor() + mixColor();
}


function isGameOver() {
    if (colision) {
        player.bomb = -1000;
    }
    if (player.bomb < 0) {
        player.run = false;
        player.bomb = 10;
        //continue?
        return true;
    }
}


function isAirCraftHitTheObject(repulo, epuletObj) {
    let gond = false;
    for (let i = 0; i < epuletObj.length; i++) {
        let epuletSzelesseg = epuletObj[i].getBoundingClientRect();
        epuletSzelesseg = epuletSzelesseg.width;
        // console.log('epulet X : ', epuletObj[i].offsetLeft + epuletSzelesseg);
        // console.log('repulo X', repulo.offsetLeft + 100);
        if (epuletObj[i].offsetTop < (repulo.offsetTop + 63) && epuletObj[i].offsetLeft < (repulo.offsetLeft + 70) &&
            (epuletObj[i].offsetLeft + epuletSzelesseg) > (repulo.offsetLeft)) {
            // console.log('karambol...');
            gond = true;
        }
    }
    return gond;
}