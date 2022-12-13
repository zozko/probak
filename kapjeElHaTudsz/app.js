const dispWrapper = document.querySelector('.display');
const btnWrapper = document.querySelector('.menu');
const gameArea = document.querySelector('.gamepad');

let boxPos = gameArea.getBoundingClientRect();

//kijelzo beallitasai
let kijelzo = {
    playerHit: 20,
    mouseLive: 5
};

let playSettings = {
    running: true

};

let player = {
    X: 0,
    Y: 0
}

let mouseSettings = {
    speed: 10,
    way: 0,
    steps: 0,
    posiX: 100,
    posiY: 100,
    counter: 0
        // mPos: mouse.getBoundingClientRect()
};
const mouse = makedObj(gameArea, 'img', 'mouse');
mouse.src = 'mouse/mouZe.png';

mouse.style.left = mouseSettings.posiX + 'px';
mouse.style.top = mouseSettings.posiY + 'px';

const mLive = makedObj(dispWrapper, 'span', 'mouse_info', `mouse have ${kijelzo.mouseLive} lifes`);
const playerHits = makedObj(dispWrapper, 'div', 'player_info', `you have ${kijelzo.playerHit} hits left`);
const stratStopBtn = makedObj(btnWrapper, 'button', 'start', 'START');
stratStopBtn.addEventListener('click', game);





function game() {
    console.log('inditom a jatekot');

    stratStopBtn.removeEventListener('click', game);
    stratStopBtn.classList.add('stop');
    stratStopBtn.innerText = 'STOP';
    stratStopBtn.addEventListener('click', stopMouse);

    gameArea.addEventListener('mousemove', mouseSetter);
    if (playSettings.running) {

        let mouseKoord = mouse.getBoundingClientRect();



        mouseSettings.posiX = mouseKoord.left - boxPos.left;
        mouseSettings.posiY = mouseKoord.top - boxPos.top;


        mouseSettings.way = setWay();
        mouseSettings.steps = setSteps();
        mouseMoverFunk();
    }

    // window.requestAnimationFrame(mouseMoverFunk);

};

function stopMouse() {
    console.log('ALLOK...');
    playSettings.running = false;
    stratStopBtn.removeEventListener('click', stopMouse);
    stratStopBtn.classList.remove('stop');
    window.cancelAnimationFrame(mouseMoverFunk);
    stratStopBtn.innerText = 'CONTINUE';
    stratStopBtn.addEventListener('click', cntnue);

}

function cntnue() {
    console.log('folytatom innen...');
    playSettings.running = true;
    stratStopBtn.removeEventListener('click', cntnue);
    stratStopBtn.classList.add('stop');
    stratStopBtn.innerText = 'STOP';
    stratStopBtn.addEventListener('click', stopMouse);
    mouseMoverFunk();
}


function mouseMoverFunk() {

    console.log('faszaju futok');
    // console.log('lepesek szama = ', mouseSettings.steps);
    // console.log(mousPosition);


    if (playSettings.running) {
        gameArea.addEventListener('click', hitCounter);

        console.log('a sebesseg: ', mouseSettings.speed);
        // console.log('BOX ', boxPos.x, boxPos.y);
        // console.log('Az eger x:', mouseSettings.posiX, '     y:', mouseSettings.posiY);
        // console.log('sebesseg/irany :', mouseSettings.speed, mouseSettings.way);
        // console.log('LEPES :', mouseSettings.steps);
        mouseSettings.posiX += mouseSettings.speed;
        mouseSettings.posiY += mouseSettings.speed;

        if (mouseSettings.steps < mouseSettings.counter) {
            mouseSettings.counter = 0;
            // let nSpeed = Math.floor(Math.random() * 10 + 2);
            mouseSettings.steps = setSteps();
            mouseSettings.way = setWay();
            // mouseSettings.speed = nSpeed;
        } else {
            mouseSettings.counter++;
        };

        // jobbra
        if (mouseSettings.way == 0) {
            // console.log('jobbra');
            mouse.style.transform = 'rotate(270deg)';
            mouse.style.left = mouseSettings.posiX + 'px';
        }

        //le
        if (mouseSettings.way == 2) {
            // console.log('le');
            mouse.style.transform = 'rotate(0deg)';
            mouse.style.top = mouseSettings.posiY + 'px';
        }


        //balra
        if (mouseSettings.way == 1) {
            // console.log('balra');
            mouse.style.transform = 'rotate(90deg)';
            mouse.style.left = mouseSettings.posiX + 'px';
        }

        //fel
        if (mouseSettings.way == 3) {
            // console.log('fel');
            mouse.style.transform = 'rotate(180deg)';
            mouse.style.top = mouseSettings.posiY + 'px';
        }
        // mouse.style.left = mouseSettings.posiY + 'px';





        if ((mouseSettings.posiX + boxPos.left) >= boxPos.left + 500 || (mouseSettings.posiX + boxPos.left) <= boxPos.left) {
            console.log('POSI-X', mouseSettings.posiX, '  vx BOX.X', boxPos.left);
            console.log('kilogott oldalra...');
            if ((mouseSettings.posiX + boxPos.left) >= boxPos.left + 500) {
                mouseSettings.posiX = boxPos.left - (100 + mouseSettings.speed);
            }

            if ((mouseSettings.posiX + boxPos.left) <= boxPos.left) {
                mouseSettings.posiX = boxPos.left + (100 + mouseSettings.speed);
            }
            // if (mouseSettings.way === 0 || mouseSettings.way === 1) mouseSettings.way = setWay();

            mouseSettings.way = setWay();
        }


        if ((mouseSettings.posiY + boxPos.top) >= boxPos.top + 500 || (mouseSettings.posiY + boxPos.top) <= boxPos.top) {
            console.log('POSI-Y', mouseSettings.posiY, '  vx BOX.Y', boxPos.top);
            console.log('kilogott fent/lent');
            if ((mouseSettings.posiY + boxPos.top) >= boxPos.left + 500) {
                mouseSettings.posiY = boxPos.top - (100 + mouseSettings.speed);
            }

            if ((mouseSettings.posiY + boxPos.top) <= boxPos.left) {
                mouseSettings.posiY = boxPos.top + (100 + mouseSettings.speed);
            }
            mouseSettings.way = setWay();
            // if (mouseSettings.way === 2 || mouseSettings.way === 3) mouseSettings.way = setWay();
        }


        window.requestAnimationFrame(mouseMoverFunk);

    } else {
        gameArea.removeEventListener('click', hitCounter);
    }
};




//mennyit lepjen az adott iranyba
function setSteps() {
    return Math.floor(Math.random() * 150 + 50);
};

//milyen iranyba menjen
function setWay() {
    mouseSettings.speed = Math.floor(Math.random() * 10 + 5);
    //0 = le;  1 = fel;  2 = jobbra; 3 = balra

    let szorzo = Math.floor(Math.random() * 4);
    if (szorzo === 0 || szorzo === 2) {
        // mouseSettings.speed = 1;
    } else {
        mouseSettings.speed = mouseSettings.speed * -1;
    }
    return szorzo;
}


function mouseSetter(e) {
    // console.log(e);
    // console.log(boxPos.x, boxPos.y);
    player.X = e.clientX - boxPos.x;
    player.Y = e.clientY - boxPos.y;
    // console.log('x:', player.X, '  y:', player.Y);

};


function hitCounter() {
    kijelzo.playerHit--;
    playerHits.innerText = `you have ${kijelzo.playerHit} hits left`;

    console.log('Player x:y', player.X, player.Y);
    console.log('mouse x, y,', mouseSettings.posiX, mouseSettings.posiY);
    if (player.X >= mouseSettings.posiX && player.X <= mouseSettings.posiX + 100 && player.Y >= mouseSettings.posiY && player.Y <= mouseSettings.posiY + 100) {
        kijelzo.mouseLive--;
        mLive.innerText = `mouse have ${kijelzo.mouseLive} lifes`;
        console.log('%cYou Hit The Mouse', 'color:yellow');
    } else {
        console.log('you miss the mouse!');
    }

}









// elem keszito funkcio
function makedObj(parent, obType, className, dispText) {
    let newElem = document.createElement(obType);
    newElem.classList.add(className);
    newElem.innerText = dispText;
    parent.appendChild(newElem);

    return newElem;
}