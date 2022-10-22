let words = [];
let playBox = document.querySelector('.playBox');
let controllers = document.querySelector('.controllers');
let wordBox;
let ind = 0;
let shuffledArr = [];
let startTime;

function oneWord(num) {
    fetch('https://random-word-api.herokuapp.com/word')

    .then(resp => resp.json())
        .then(data => {
            console.log(data);

            wordBox = makeElemnt(playBox, 'div', 'wordBox');
            wordBox.innerText = data;
            words.push(data[0]);
            if (num === 5) {
                startGame();
                playBox.innerHTML = '';
            }
        }).catch(er => console.log('ERROR', er));
}

for (let i = 0; i < 6; i++) {
    oneWord(i);
}


function startGame() {
    let wordBoxes = document.querySelectorAll('.wordBox');
    for (let i = 0; i < wordBoxes.length; i++) {
        wordBoxes[i].style.display = 'none';
    }

    shuffledArr = words.map(el => el);
    shuffledArr.sort((a, b) =>
        0.5 - Math.random());

    let startBtn = makeElemnt(controllers, 'button', 'startBtn');
    startBtn.innerText = 'start game';
    startBtn.addEventListener('click', game);
}



function game() {
    console.log(startTime);
    console.log(words, shuffledArr);
    controllers.innerHTML = '';

    let searchFor = makeElemnt(controllers, 'p', 'searchFor');
    searchFor.innerText = `talald meg : ${shuffledArr[ind]}`;
    if (ind === 0) {
        words.forEach(el => {
            let gameBox = makeElemnt(playBox, 'div', 'gameBox');
            gameBox.innerHTML = el;
            gameBox.addEventListener('click', test);

        });
        startTime = new Date();
    }
}

function test(ev) {
    console.log(ev.target.innerHTML);
    let clickedWord = ev.target.innerHTML;
    if (clickedWord === shuffledArr[ind]) {
        console.log('OK');
        ind++
        game();
        if (ind >= words.length) {
            let endTime = new Date();
            controllers.innerHTML = 'GAME DURATION: ' + ((endTime - startTime) / 1000) + 's';
            console.log('GAME OVER');
        }
    } else {
        console.log('NEM OK...');
    }
}


function makeElemnt(parent, typ, className) {
    let newElemnt = document.createElement(typ);
    if (className) {
        newElemnt.classList.add(className);
    }
    parent.appendChild(newElemnt);
    return newElemnt;
}