const displayWrapper = document.querySelector('.display_wrapper');
const gameArea = document.querySelector('.game_area');

let messageBox = document.createElement('div');
let startBtn = document.createElement('button');
startBtn.classList.add('btn');
startBtn.innerText = 'START';
messageBox.classList.add('message');
messageBox.innerText = 'a kezdeshez nyomd meg a start gombot';
displayWrapper.appendChild(messageBox);
displayWrapper.appendChild(startBtn);
startBtn.addEventListener('click', startGame);




document.addEventListener('keyup', pressOff);
document.addEventListener('keydown', pressOn);

let player = {
    run: false,
    score: 0,
    speed: 2,
    bomb: 5
};
player.airCraft = document.createElement('img');

let pressedKeys = {
    space: false
};

let gameField = {};

function startGame(event) {
    player.run = true;
    messageBox.innerHTML = '';
    startBtn.style.display = 'none';
    player.airCraft.src = 'imgs/aircraft.png';
    player.airCraft.classList.add('aircraft');
    gameArea.appendChild(player.airCraft);
    player.X = player.airCraft.offsetLeft;
    player.Y = player.airCraft.offsetTop;
    window.requestAnimationFrame(playGame);
};


function playGame() {
    let planeXcoord;
    let planeYcoord;
    if (player.run) {
        if (pressedKeys.space) {
            console.log('BOMBAAA');
        }
        if (!pressedKeys.ArrowUp || !pressedKeys.ArrowDown) {
            //egyenesit
            player.airCraft.style.transform = 'rotate(0deg)';
        }

        if (pressedKeys.ArrowUp) {
            //felfele
            player.Y -= player.speed;
            player.airCraft.style.transform = 'rotate(-45deg)';
        }
        if (pressedKeys.ArrowDown) {
            //lefele
            player.Y += player.speed;
            player.airCraft.style.transform = 'rotate(45deg)';
        }

    }
    player.airCraft.style.top = player.Y + 'px';
    player.airCraft.style.left = (player.X += player.speed) + 'px';

    gameField.w = window.innerWidth;
    gameField.h = window.innerHeight;

    messageBox.innerText = `width: ${gameField.w}  |  height: ${gameField.h}`;
    //rekurziv funkcio a mozgashoz
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
    window.requestAnimationFrame(playGame);

};

function pressOn(event) {
    let actualKey = (event.key == ' ') ? 'space' : event.key;
    pressedKeys[actualKey] = true;
    // console.log(pressedKeys);

};

function pressOff(event) {
    let actualKey = (event.key == ' ') ? 'space' : event.key;
    pressedKeys[actualKey] = false;
    // console.log(pressedKeys);
};