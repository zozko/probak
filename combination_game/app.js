let elemCreator = (function() {
    const test = document.body;
    let cim = creator(test, 'h1');


    //valtozoim
    let kombinacio = [];


    //veletlenszammal feltolteni a szef zarjat;
    for (let i = 0; i < 6; i++) {
        let kombNum = randomNumberMaker();
        kombinacio.push(kombNum);
    }

    console.log(kombinacio);




    //elemek keszitoi
    cim.innerText = 'talald ki a szefem kombinaciojat!';

    for (i = 0; i < 3; i++) {
        let magyarazat = creator(test, 'p');
        magyarazat.style.textAlign = 'center';
        magyarazat.style.width = '100px';
        magyarazat.style.height = '25px';
        magyarazat.style.display = 'block';
        switch (i) {
            case 0:
                magyarazat.innerText = 'kisebb kell!';
                magyarazat.style.background = '#ff8b3d';
                break;
            case 1:
                magyarazat.innerText = 'nagyobb kell!';
                magyarazat.style.background = '#009dc4';
                break;
            case 2:
                magyarazat.innerText = 'ez mar jo.';
                magyarazat.style.background = '#7ab97a';
                // magyarazat.style.display = 'block';

                break;
        }
    }
    // input elemeke
    for (let i = 0; i < 6; i++) {
        let num = randomNumberMaker();
        let mezo = creator(test, 'input');
        mezo.setAttribute('type', 'number');
        mezo.classList.add('mezo#' + i);
        mezo.setAttribute('value', num);
        mezo.setAttribute('min', 0);
        mezo.setAttribute('max', 9);
    }

    //probalkozas kijelzo
    let sumDisplay = creator(test, 'h3');
    sumDisplay.innerText = 'probalkozasaid szama: ';


    //gomb
    let inBtn = creator(test, 'button');
    inBtn.innerText = 'teszt';





    return {
        szefzar: kombinacio,
        eredmenykijelzo: sumDisplay,
        gomb: inBtn,
        bdy: test
    };

})();


let DOMelemek = (function() {
    //valtozok a dombol
    let gessArr = [];
    let gessNum = 0;

    let inElemek = document.querySelectorAll('input');
    console.log(inElemek);
    inElemek.forEach(el => {
        gessArr.push(el.value);

    });
    console.log(gessArr);

    elemCreator.gomb.addEventListener('click', tesztelj);

    return {
        probaArr: gessArr,
        zarElemszama: inElemek,
        probalkozas: gessNum
    }

})();





//veletlen szam oszto
function randomNumberMaker() {
    return Math.floor(Math.random() * 9);
}




//ez a funkcio kesziti a tagokat az oldalra
function creator(parent, elem) {
    let newElem = document.createElement(elem);
    parent.appendChild(newElem);
    return newElem;
};


function tesztelj() {
    console.log('OK');
    DOMelemek.probalkozas++;
    console.log(DOMelemek.zarElemszama);
    for (let i = 0; i < elemCreator.szefzar.length; i++) {
        if (elemCreator.szefzar[i] > DOMelemek.zarElemszama[i].value) {
            DOMelemek.zarElemszama[i].style.background = '#009dc4';
        }

        if (elemCreator.szefzar[i] < DOMelemek.zarElemszama[i].value) {
            DOMelemek.zarElemszama[i].style.background = '#ff8b3d';

        }

        if (elemCreator.szefzar[i] == DOMelemek.zarElemszama[i].value) {
            DOMelemek.zarElemszama[i].style.background = '#7ab97a';
            DOMelemek.zarElemszama[i].setAttribute('disabled', 'true');
        }

    }

    let ok = 0;

    DOMelemek.zarElemszama.forEach(el => {
        console.log(el.hasAttribute('disabled'));
        if (el.hasAttribute('disabled')) {
            ok++;
        }

    });
    console.log('OK:', ok);
    if (ok === 6) {
        console.log('GAME OVER');
        elemCreator.gomb.style.display = "none";
        let gameOver = creator(elemCreator.bdy, 'div');
        gameOver.style.color = 'red';
        gameOver.style.textAlign = 'center';
        gameOver.style.fontSize = '60px';
        gameOver.innerText = 'GAME OVER';
        let reStartBtn = creator(elemCreator.bdy, 'button');
        reStartBtn.innerText = 'restart game';
        reStartBtn.addEventListener('click', () => {
            if (gameOver) {
                gameOver.remove();
                reStartBtn.remove();
                elemCreator.gomb.style.display = "block";
            }
            location.reload();
        });
    }


    elemCreator.eredmenykijelzo.innerText = `probalkozasaid szama: ${DOMelemek.probalkozas}`;
}