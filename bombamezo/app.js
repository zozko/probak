window.addEventListener('DOMContentLoaded', basic);
const messageWrapper = document.querySelector('.message_wrapper');
const gameField = document.querySelector('.game_field');

function basic() {
    if (messageWrapper) messageWrapper.innerHTML = '';
    if (gameField) gameField.innerHTML = '';

    let notTheSame = true;
    let bombsMaker = true;
    let playInProgres = true;
    let playerSquare;
    let display;
    let levelInfo;
    let bombCounter = 1;
    let countdown = 3;

    let player = {
        step: 40,
        stepCounter: 0,
        level: 1
    };


    let target = {

    }

    let bombs = [];


    let fields = [];

    function startGame() {

        //a mezok tartoja
        const fieldWrapper = document.createElement('div');
        fieldWrapper.classList.add('bomb_field');
        gameField.appendChild(fieldWrapper);


        // a jatekmezo 12 x 12 negyzetbol (30px x 30px)
        let fieldNum = 1;
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 12; j++) {
                const square = document.createElement('span');
                square.classList.add('field');
                square.setAttribute('value', fieldNum);
                fieldWrapper.appendChild(square);
                square.style.top = (i * 40) + 'px';
                square.style.left = (j * 40) + 'px';
                fieldNum++;
                fields.push(square);
            }
        }

        //cel mezo megjelolese = TARGET
        let targetNumber = Math.floor(Math.random() * 144);
        fields[targetNumber].classList.add('target');
        fields[targetNumber].innerText = '⚔';
        target.X = fields[targetNumber].offsetLeft;
        target.Y = fields[targetNumber].offsetTop;

        //jatekos letrehozasa
        while (notTheSame) {
            let playerPos = Math.floor(Math.random() * 145);
            playerSquare = document.createElement('div');
            playerSquare.classList.add('player_square');

            // player.field = playerSquare;
            player.Y = fields[playerPos - 1].offsetTop;
            player.X = fields[playerPos - 1].offsetLeft;
            if (player.X == target.X && player.Y == target.Y) {
                notTheSame = true;
            } else {
                notTheSame = false;
                fieldWrapper.appendChild(playerSquare);
                playerSquare.style.top = player.Y + 'px';
                playerSquare.style.left = player.X + 'px';

            }
        };

        //bombamezok letrehozasa 
        while (bombsMaker) {
            let bombFieldNo = Math.floor(Math.random() * 144);
            bombCounter > (player.level * 4) ? bombsMaker = false : bombsMaker = true;
            // console.log('BombField NO: ', bombFieldNo);
            if (!fields[bombFieldNo].classList.contains('target') && (player.X != fields[bombFieldNo].offsetLeft || player.Y != fields[bombFieldNo].offsetTop && bombsMaker)) {
                fields[bombFieldNo].classList.add('bomb');
                // console.log('bomba #', bombCounter);

                //ez csak a fejlesztes idejere, hogy lassam a bombakat
                fields[bombFieldNo].innerHTML = '💣';
                bombCounter++;
                bombs.push(fields[bombFieldNo]);
            } else {
                // console.log('van ezen mar valami', fields[bombFieldNo]);
            }
        };
        if (!bombsMaker) {
            playInProgres = false;
            bombHider();
        };


        //kjelzok
        display = document.createElement('div');
        display.classList.add('display_info_window');
        display.innerHTML = `your steps: ${player.stepCounter}`;
        messageWrapper.appendChild(display);
        levelInfo = document.createElement('div');
        levelInfo.classList.add('level_info');
        levelInfo.innerHTML = `level: ${player.level}`;
        messageWrapper.appendChild(levelInfo);
    };
    //elso inditas
    if (player.level === 1) startGame();




    //kisegito funkciok:

    //jatekos mozgas
    function playerMoov(ev) {
        // console.log('mozgok vazze...', ev.type, ev.keyCode);
        //felfele mozga
        if (ev.type == 'keydown' && ev.keyCode === 38 && player.Y > 0) {
            player.stepCounter++;
            player.Y -= player.step;
            playerSquare.style.top = player.Y + 'px';
        }
        if (ev.type == 'keydown' && ev.keyCode === 40 && player.Y < 440) {
            player.stepCounter++;
            player.Y += player.step;
            playerSquare.style.top = player.Y + 'px';
        }
        if (ev.type == 'keydown' && ev.keyCode === 37 && player.X > 0) {
            player.stepCounter++;
            player.X -= player.step;
            playerSquare.style.left = player.X + 'px';
        }
        if (ev.type == 'keydown' && ev.keyCode === 39 && player.X < 440) {
            player.stepCounter++;
            player.X += player.step;
            playerSquare.style.left = player.X + 'px';
        }
        if (ev.type === 'keyup') {
            // player.stepCounter++;
            display.innerHTML = `your steps: ${player.stepCounter}`;

        }

        if (playInProgres) {
            checkColision();
            checkDanger();
        }

    }

    //jatekos ellenorzese, hogy nem e utozott valamivel, vagy be e ert a celba
    function checkColision() {
        if (target.X === player.X && target.Y === player.Y) {
            // console.log('celbaertel !');
            ['keyup', 'keydown'].forEach(ev => document.removeEventListener(ev, playerMoov));
            player.level += 1;
            countdown++;
            //alapbeallitasok nullazasa
            messageWrapper.innerHTML = '';
            gameField.innerHTML = '';
            bombsMaker = true;
            notTheSame = true;
            playerSquare = undefined;
            bombCounter = 1;
            countdown = 3;
            target = {};
            bombs = [];
            fields = [];
            startGame();

        } else {
            bombs.forEach(bomb => {
                if (bomb.offsetTop === player.Y && bomb.offsetLeft === player.X) {
                    makeBoom(bomb);

                    // if (gameOver) {
                    //     display.innerHTML = 'GAME OVER';
                    //     levelInfo.innerHTML = `You made ${player.stepCounter} moves`;
                    //     console.log('GAME OVER');
                    //     ['keyup', 'keydown'].forEach(ev => document.removeEventListener(ev, playerMoov));
                    //     gameField.innerHTML = '';
                    //     playInProgres = false;
                    //     restartBtn();
                    // }
                }
            });
        }



    };


    //ellenorzi, hogy van-e a kozelben bomba
    function checkDanger() {
        let find = false;
        bombs.forEach(bmb => {
            //top = Y  | left = X
            // console.log(bmb);
            // console.log('Player Top:', player.Y);
            // console.log('Player Left:', player.X);
            // console.log('bomb offsetTop: ', bmb.offsetTop);
            // console.log('bomb offsetLeft: ', bmb.offsetLeft);

            if (player.Y + player.step === bmb.offsetTop && player.X === bmb.offsetLeft ||
                player.Y - player.step === bmb.offsetTop && player.X === bmb.offsetLeft ||
                player.X + player.step === bmb.offsetLeft && player.Y === bmb.offsetTop ||
                player.X - player.step === bmb.offsetLeft && player.Y === bmb.offsetTop) {
                find = true;
            }

            if (find) {
                playerSquare.classList.add('danger_zone');
            } else {
                playerSquare.classList.remove('danger_zone');
            }
        });
    };

    function bombHider() {
        let contdownInterval = setInterval(() => {
            display.innerHTML = `start: ${countdown}`;
            countdown--;
            if (countdown === 0) {
                clearInterval(contdownInterval);
                bombs.forEach(bomb => {
                    if (bomb.classList.contains('bomb'))
                        bomb.innerHTML = '';
                    bomb.style.backgroundColor = '#1c7041'; //field color a css-ben
                    display.innerHTML = `your steps: ${player.stepCounter}`;
                });
                //innentol kezdve lehet mozogni a negyzetunkkel
                ['keyup', 'keydown'].forEach(ev => document.addEventListener(ev, playerMoov));
            }
        }, 1000);

        playInProgres = true;
    }

    function restartBtn() {
        let restart = document.createElement('button');
        restart.classList.add('restart_btn');
        restart.innerText = 'new game?';
        gameField.appendChild(restart);
        restart.addEventListener('click', basic);

    }

    function makeBoom(boom) {
        ['keyup', 'keydown'].forEach(ev => document.removeEventListener(ev, playerMoov));
        boom.classList.add('boooom');
        boom.innerHTML = '🎇';
        setTimeout(() => {
            // if (gameOver) {
            display.innerHTML = 'GAME OVER';
            levelInfo.innerHTML = `You made ${player.stepCounter} moves`;

            gameField.innerHTML = '';
            playInProgres = false;
            restartBtn();
            // }
        }, 3000);
    }

};