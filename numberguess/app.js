const userValue = document.querySelector('#user');
const btn = document.querySelector('.btn');
const conversation = document.querySelector('.feedback');
const userPoints = document.querySelector('.user');
const pcPoints = document.querySelector('.PC');

let uPoints = 0;
let pPoints = 0;
let num = Math.floor(Math.random() * 10 + 1);

// console.log(num);

btn.innerText = 'nagyobb mint?';

btn.addEventListener('click', () => {
    let userGuessed = +userValue.value;
    console.log(userGuessed);

    if (btn.innerText === 'ujra?') {
        num = Math.floor(Math.random() * 10 + 1);
        btn.innerText = 'nagyobb mint?';
        // console.log(num);
    }


    if (userGuessed) {

        userValue.style.border = 'none';
        if (btn.innerText === 'tippem...') {
            if (userGuessed === num) {
                displayMessage('NYERTEL');
                uPoints++
                userPoints.innerText = uPoints;

            } else {
                displayMessage(`Vesztettel, mert a szam ${num} volt`);
                // conversation.innerText = `Vesztettel, mert a szam ${num} volt`;
                pPoints++;
                pcPoints.innerText = pPoints;

            }
            btn.innerText = 'ujra?';
            userValue.value = '';
        }

        if (btn.innerText === 'kisebb mint?') {
            if (userGuessed > num) {
                displayMessage('IGEN');
            } else {
                displayMessage('NEM');
            }
            btn.innerText = 'tippem...';
        }

        if (btn.innerText === 'nagyobb mint?') {
            if (userGuessed < num) {
                displayMessage('IGEN');
            } else {
                displayMessage('NEM');
            }
            btn.innerText = 'kisebb mint?';
        }

    } else {
        displayMessage('Adj meg egy szamot');
        userValue.style.border = '3px solid red';
    }



});


function displayMessage(msg) {
    conversation.innerText = msg;
}