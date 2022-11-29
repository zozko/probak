window.addEventListener('DOMContentLoaded', basic);

function basic() {
    const messageWrapper = document.querySelector('.message_wrapper');
    const gameField = document.querySelector('.game_field');
    let notTheSame = true;
    let bombsMaker = true;
    let playerSquare;
    let bombCounter = 1;

    let player = {
        step: 40,
        stepCounter: 0,
        level: 1
    };
    let target = {

    }

    let bombs = [];


    let fields = [];

    //a mezog tartoja
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
    let targetNumber = Math.floor(Math.random() * 145);
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
            ['keyup', 'keydown'].forEach(ev => document.addEventListener(ev, playerMoov));
        }
    };

    //bombamezok letrehozasa 
    while (bombsMaker) {
        let bombFieldNo = Math.floor(Math.random() * 145);
        bombCounter > (player.level * 4) ? bombsMaker = false : bombsMaker = true;
        if (!fields[bombFieldNo].classList.contains('target') && bombsMaker) {
            fields[bombFieldNo].classList.add('bomb');
            //ez csak a fejlesztes idejere, hogy lassam a bombakat
            // fields[bombFieldNo].innerHTML = '💣';

            bombCounter++;
            bombs.push(fields[bombFieldNo]);
        }



    }

    //kjelzok
    let display = document.createElement('div');
    display.classList.add('display_info_window');
    display.innerHTML = `your steps: ${player.stepCounter}`;
    messageWrapper.appendChild(display);
    let levelInfo = document.createElement('div');
    levelInfo.classList.add('level_info');
    levelInfo.innerHTML = `level: ${player.level}`;
    messageWrapper.appendChild(levelInfo);



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

        checkColision();
        checkDanger();

    }

    //jatekos ellenorzese, hogy nem e utozott valamivel, vagy be e ert a celba
    function checkColision() {
        if (target.X === player.X && target.Y === player.Y) {
            display.innerHTML = 'YOU WIN';
        }

        bombs.forEach(bomb => {
            if (bomb.offsetTop === player.Y && bomb.offsetLeft === player.X) {
                display.innerHTML = 'GAME OVER';
                console.log('GAME OVER');
                ['keyup', 'keydown'].forEach(ev => document.removeEventListener(ev, playerMoov));

            }
        });



    };

    function checkDanger() {
        let find = false;
        bombs.forEach(bmb => {
            //top = Y  | left = X
            console.log(bmb);
            console.log('Player Top:', player.Y);
            console.log('Player Left:', player.X);
            console.log('bomb offsetTop: ', bmb.offsetTop);
            console.log('bomb offsetLeft: ', bmb.offsetLeft);

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

};