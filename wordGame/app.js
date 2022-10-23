let words = [];
let playBox = document.querySelector('.playBox');
let controllers = document.querySelector('.controllers');
let wordBox;
let ind = 0;
let shuffledArr = [];
let shuffledWordsArr = [];
let startTime;

function oneWord(num) {
    fetch('https://random-word-api.herokuapp.com/word')

    .then(resp => resp.json())
        .then(data => {
            // console.log(data);

            wordBox = makeElemnt(playBox, 'div', 'wordBox');
            wordBox.innerText = data;
            words.push(data[0]);
            if (num === 5) {
                startGame();
                playBox.innerHTML = '';
            }
        }).catch(er => console.log('ERROR', er));
}

function loadWords() {

    for (let i = 0; i < 6; i++) {
        oneWord(i);
    }
}

loadWords();


function startGame() {
    let wordBoxes = document.querySelectorAll('.wordBox');
    for (let i = 0; i < wordBoxes.length; i++) {
        wordBoxes[i].style.display = 'none';
    }

    shuffledArr = words.map(el => el);
    shuffledArr.sort((a, b) =>
        0.5 - Math.random());
    shuffledArr.forEach(elem => {
        tempWord = elem.split('');
        // console.log(tempWord);
        tempWord = tempWord.sort((a, b) =>
            0.5 - Math.random());
        tempWord = tempWord.join('');
        // console.log('kevertbetukkel:', tempWord);
        shuffledWordsArr.push(tempWord);
    });

    let startBtn = makeElemnt(controllers, 'button', 'startBtn');
    startBtn.innerText = 'start game';
    startBtn.addEventListener('click', game);
}



function game() {
    // console.log(startTime);
    // console.log('alapTomb:', words, '  kevert tomb: ', shuffledArr, '  kevertbetuk tomb:', shuffledWordsArr);
    controllers.innerHTML = '';

    let searchFor = makeElemnt(controllers, 'p', 'searchFor');
    searchFor.innerText = `keresd meg : ${words[ind]}`;
    if (ind === 0) {
        shuffledWordsArr.forEach((el, elindex) => {
            let gameBox = makeElemnt(playBox, 'div', 'gameBox');
            gameBox.innerHTML = el;
            gameBox.addEventListener('click', (ev) => {
                // console.log('elem indexe', elindex, '  words index:', ind);
                if (shuffledArr[elindex] === words[ind]) {
                    // console.log('OK');
                    ind++
                    ev.target.style.backgroundColor = '#f58c8c';
                    game();
                    if (ind >= words.length) {
                        let endTime = new Date();
                        controllers.innerHTML = 'GAME DURATION: ' + ((endTime - startTime) / 1000) + 's';
                        // console.log('GAME OVER');
                        playBox.innerHTML = '';
                        let restartBtn = makeElemnt(controllers, 'button', 'restart');
                        restartBtn.innerText = 'restart';
                        restartBtn.addEventListener('click', () => {
                            playBox.innerHTML = 'LOADING ...';
                            controllers.innerHTML = '';
                            ind = 0;
                            words = [];
                            shuffledArr = [];
                            shuffledWordsArr = [];
                            loadWords();
                        });
                    }
                } else {
                    // console.log('NEM OK...');
                }
            });

        });
        startTime = new Date();
    }
};


function makeElemnt(parent, typ, className) {
    let newElemnt = document.createElement(typ);
    if (className) {
        newElemnt.classList.add(className);
    }
    parent.appendChild(newElemnt);
    return newElemnt;
}