let startBtn = document.querySelector('.start');
let originalTmb = document.querySelectorAll('input');
let workingBoxes = document.querySelectorAll('.finished');
let showOriginalArr = document.getElementsByClassName('original_array')[0];

let startTmb = [];
let existNumInArr;
let numBoxes = [];



startBtn.addEventListener('click', () => {
    let osztalyNev = 0;
    // existNumInArr.length = 0;
    startTmb.length = 0;

    originalTmb.forEach(el => {
        let szam = parseInt(el.value);
        startTmb.push(szam);
    });
    console.log('start TOMB:', startTmb);

    let originalArrValid = validateOriginalArr(startTmb);

    if (!originalArrValid) {
        osztalyNev = "not_valid";
    } else {
        osztalyNev = "valid";
    }

    getExistNums(startTmb); //feltolti a meglevo szamokkal az existNumsInArr tombot
    showOriginalArr.innerHTML = "";
    creatNewTag(showOriginalArr, 'p', osztalyNev, startTmb);
    creatNewTag(showOriginalArr, 'span', 0, existNumInArr + ' a mar szereplo szamok');

    fillUpBoxes();


    //logikara ugras amig nincs befejezve a tablazatunk
    if (osztalyNev === 'valid') {
        let oldjamTovabb = true;
        while (oldjamTovabb) {
            let kesz = guesTheNum();
            if (kesz) {
                console.log('OK');
                console.log(existNumInArr);
                oldjamTovabb = false;
            }
        }
    };

});


// letrehoz egy uj elemet a DOM-ba
function creatNewTag(osTag, ujTag, osztaly, tartalom) {
    let uT = document.createElement(ujTag);
    if (osztaly) {
        uT.classList.add(osztaly);
    }
    uT.innerText = tartalom;
    osTag.appendChild(uT);
}

// ellenorzi, hogy nincs e ket egyforma szam a tombben
function validateOriginalArr(tmb) {
    let controlArr = tmb.filter(el => el > 0);
    if (controlArr.length === 0) {
        alert('kotelezo kitolteni legalabb 1 szamot!');
        return false;
    };

    let counter = 0;
    let arrValue;

    for (let i = 0; i < tmb.length; i++) {
        arrValue = tmb[i];

        if (isNaN(arrValue)) {
            startTmb[i] = 0;
            tmb[i] = 0;
        }

        if (arrValue > 9 || arrValue < 0) {
            return false;
        }
        for (let j = 0; j < tmb.length; j++) {
            if (arrValue === tmb[j] && arrValue !== 0) {
                counter++;
            }
            if (counter > 1) {
                return false;
            }
        }
        counter = 0;
    }
    return true;
}


// berakja egy tombbe a letezo szamokat
function getExistNums(tmb) {
    existNumInArr = [];
    // existNumInArr.push(tmb.filter(el => el > 0));
    for (let i = 0; i < tmb.length; i++) {
        if (tmb[i] > 0) {
            existNumInArr.push(tmb[i]);
        }
    }
}


//betolti a meglevo szamokat a boxokba
function fillUpBoxes() {
    for (let i = 0; i < workingBoxes.length; i++) {
        workingBoxes[i].innerText = startTmb[i];
    }
}


// megallapitjuk, hogy kell e oldani
function guesTheNum() {
    let beteve = true;
    let proba = 1;
    console.log('gesting start...');

    for (let i = 0; i < startTmb.length; i++) {
        if (startTmb[i] < 1) {
            workingBoxes[i].classList.add('workOn');
            //betennei a szamot
            console.log(`${i}: boxot csinalom`);
            while (beteve) {
                let ujSzam = oldom(proba);
                if (ujSzam) {
                    workingBoxes[i].innerText = proba;
                    beteve = false;
                    workingBoxes[i].classList.remove('workOn');
                    proba = 0;
                }
                proba++;
                if (proba > 9) proba = 1;
            }
            console.log(`while loop vege az ${i} korben`);
            beteve = true;
        }

    };
    console.log(`exist number arr nagysaga ${existNumInArr.length}`);
    if (existNumInArr.length >= 9) {
        return true;
    } else {
        return false;
    }

}



function oldom(number) {
    console.log(`probalom betenni a = ${number}`);
    if (existNumInArr.includes(number)) {
        return false; // nem tette be...
    } else {
        console.log(`betettem a ${number} szamot az existNumArr-ba`);
        existNumInArr.push(number);
        return true; //ha be tudta tenni a szamot
    }
}