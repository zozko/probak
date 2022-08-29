const DOMelems = (function() {
    const total = document.querySelector('.total_value');
    const min = document.querySelector('.min_percent');
    const max = document.querySelector('.max_percent');
    const minNum = document.querySelector('.min_output');
    const maxNum = document.querySelector('.max_output');
    const ratingStars = document.querySelectorAll('[name="ratings"]');
    const ratingStarsImg = document.querySelectorAll('.star_display');
    const upArrow = document.querySelector('.up_arrow');
    const downArrow = document.querySelector('.down_arrow');
    const rounder = document.querySelectorAll('[name="rounder"]');
    const saveBtn = document.querySelector('.save_data');
    const makeCalculationBtn = document.querySelector('.let_Calc');
    const displayTip = document.querySelector('.display_tip');

    // console.log(displayTip);


    return {
        billTotal: total,
        showCalc: displayTip,
        min_percent: min,
        max_percent: max,
        minOut: minNum,
        maxOut: maxNum,
        ratingSetter: ratingStars,
        displayRating: ratingStarsImg,
        roundUP: upArrow,
        roundDOWN: downArrow,
        rounderInput: rounder,
        setStorage: saveBtn,
        calc: makeCalculationBtn
    };
})();

// console.log(DOMelems);

const manipulators = (function() {
    let setRounder;
    let ratingStars;
    let minimumPercent = DOMelems.min_percent.value;
    let maximumPercent = DOMelems.max_percent.value;
    let tip;


    //calculations
    DOMelems.calc.addEventListener('click', (event) => {
        //TODO elso funkcio majd a localstorage ellenorzese

        // a szamla osszegenek megszerzese
        console.log(DOMelems.billTotal.value);
        let billValue = +parseFloat(DOMelems.billTotal.value).toFixed(2);

        //alap ratingStars beallitas OK
        if (!ratingStars) {
            DOMelems.ratingSetter.forEach(elem => {
                // console.log(elem.getAttribute('checked'), elem.value);
                if (elem.getAttribute('checked'))
                    ratingStars = starSwitcher(parseInt(elem.value));
            });
        }
        console.log('a csillag alapszama:', ratingStars);

        //alap kerekites beallitasa - ellenorizni, hogy van e mentve a LocalStorageba
        console.log('alap kerekites', setRounder);

        // a minimum es maximum szazalek
        console.log('min: ', minimumPercent, 'max: ', maximumPercent);





        switch (ratingStars) {
            case 1:
                tip = oneStar(billValue);
                break;
            case 2:
                tip = twoStars(billValue);
                break;
            case 3:
                tip = threeStars(billValue);
                break;

            default:
                console.log('lefutott');
                tip = 0;
                break;
        }

        //show tip
        tip = +parseFloat(tip).toFixed(2);
        // console.log(typeof billValue, typeof tip);
        let fullBill = billValue + tip;
        // console.log('ellenorzo', billValue, tip, fullBill);
        DOMelems.showCalc.innerText = `at ${ratingStars} stars ratings our recomended tip is =${tip}.-!  Pay =${fullBill}.- `;



    });


    let setMinPercent = DOMelems.min_percent.addEventListener('change', (ev) => {
        let setMaxValue;
        if (parseInt(DOMelems.min_percent.value) + 5 > parseInt(DOMelems.max_percent.value)) {
            setMaxValue = parseInt(DOMelems.min_percent.value) + 5;
            DOMelems.max_percent.value = setMaxValue;
            DOMelems.maxOut.innerText = setMaxValue + '%';
            maximumPercent = DOMelems.max_percent.value;

        }
        minimumPercent = DOMelems.min_percent.value;
        console.log(DOMelems.min_percent.value, DOMelems.max_percent.value);
        DOMelems.minOut.innerText = DOMelems.min_percent.value + '%';
        return DOMelems.min_percent.value;
    });

    let setMaxPercent = DOMelems.max_percent.addEventListener('change', (ev) => {
        let setMinValue;
        if (parseInt(DOMelems.max_percent.value) - 5 < parseInt(DOMelems.min_percent.value)) {
            setMinValue = parseInt(DOMelems.max_percent.value) - 5;
            DOMelems.min_percent.value = setMinValue;
            DOMelems.minOut.innerText = setMinValue + '%';
            minimumPercent = DOMelems.min_percent.value;
        }
        maximumPercent = DOMelems.max_percent.value;

        console.log(DOMelems.max_percent.value);

        DOMelems.maxOut.innerText = DOMelems.max_percent.value + '%';
        return DOMelems.max_percent.value;
    });

    DOMelems.minOut.innerText = setMinPercent || DOMelems.min_percent.value + '%';
    DOMelems.maxOut.innerText = setMaxPercent || DOMelems.max_percent.value + '%';

    //rating star setting - ezt nem mentjuk a localsorageba - minden eset individualis
    DOMelems.ratingSetter.forEach((elem) => {
        elem.addEventListener('change', (event) => {
            let starNumber = parseInt(elem.value);
            // console.log(elem, elem.value, starNumber);
            ratingStars = starSwitcher(starNumber);
            console.log('csillag:', ratingStars);
        });
    });


    // rounder methods
    // let rounder =
    DOMelems.rounderInput.forEach(elem => {
        //default settings - ha lesz mentve localsorageba - ellenorizni, es az szerint allitani!
        if (elem.getAttribute('checked') && elem.value === 'UP') {
            setRounder = elem.value;
            DOMelems.roundUP.style.border = '3px solid green';
        }
        if (elem.getAttribute('checked') && elem.value === 'DOWN') {
            setRounder = elem.value;
            DOMelems.roundDOWN.style.border = '3px solid green';
        }

        elem.addEventListener('change', ev => {
            // console.log(elem.value);
            if (elem.value === 'UP') {
                DOMelems.roundUP.style.border = '3px solid green';
                DOMelems.roundDOWN.style.border = 'none';
                setRounder = elem.value;
            }
            if (elem.value === 'DOWN') {
                DOMelems.roundDOWN.style.border = '3px solid green';
                DOMelems.roundUP.style.border = 'none';
                setRounder = elem.value;
            }
            console.log('kerekites:', setRounder);
        })
    });


    // save data to loclStorage
    DOMelems.setStorage.addEventListener('click', () => {
        // window.localStorage.clear();
        // window.localStorage.setItem('rating', ratingStars);
        window.localStorage.setItem('roundMethod', setRounder);
        window.localStorage.setItem('minPercent', minimumPercent);
        window.localStorage.setItem('maxPercent', maximumPercent);
        console.log('data stored', window.localStorage);

    });


})();


//ez a funkcio allitja be a csillagokat az ertekuk alapjan
function starSwitcher(numberOfStar) {
    let rStar;
    switch (numberOfStar) {
        case 1:
            // console.log('cool1');
            rStar = 1;
            DOMelems.displayRating[0].src = 'imgs/star_ON.png';
            DOMelems.displayRating[1].src = 'imgs/star_OFF.png';
            DOMelems.displayRating[2].src = 'imgs/star_OFF.png';
            DOMelems.displayRating[3].src = 'imgs/star_OFF.png';
            DOMelems.displayRating[4].src = 'imgs/star_OFF.png';

            break;
        case 2:
            // console.log('cool2');
            rStar = 2;
            DOMelems.displayRating[0].src = 'imgs/star_ON.png';
            DOMelems.displayRating[1].src = 'imgs/star_ON.png';
            DOMelems.displayRating[2].src = 'imgs/star_OFF.png';
            DOMelems.displayRating[3].src = 'imgs/star_OFF.png';
            DOMelems.displayRating[4].src = 'imgs/star_OFF.png';
            break;
        case 3:
            // console.log('cool3');
            rStar = 3;
            DOMelems.displayRating[0].src = 'imgs/star_ON.png';
            DOMelems.displayRating[1].src = 'imgs/star_ON.png';
            DOMelems.displayRating[2].src = 'imgs/star_ON.png';
            DOMelems.displayRating[3].src = 'imgs/star_OFF.png';
            DOMelems.displayRating[4].src = 'imgs/star_OFF.png';

            break;
        case 4:
            // console.log('cool4');
            rStar = 4;
            DOMelems.displayRating[0].src = 'imgs/star_ON.png';
            DOMelems.displayRating[1].src = 'imgs/star_ON.png';
            DOMelems.displayRating[2].src = 'imgs/star_ON.png';
            DOMelems.displayRating[3].src = 'imgs/star_ON.png';
            DOMelems.displayRating[4].src = 'imgs/star_OFF.png';
            break;
        case 5:
            // console.log('cool5');
            rStar = 5;
            DOMelems.displayRating[0].src = 'imgs/star_ON.png';
            DOMelems.displayRating[1].src = 'imgs/star_ON.png';
            DOMelems.displayRating[2].src = 'imgs/star_ON.png';
            DOMelems.displayRating[3].src = 'imgs/star_ON.png';
            DOMelems.displayRating[4].src = 'imgs/star_ON.png';

            break;
    }
    return rStar;
}


//1 csillagos kalkulacio = visszaadja a szamlat - nincs jatt
function oneStar(bill) {
    return 0;
}

//2 csillagos kalkulacio = a szamlat felkerekiti a legkozelebbi egesz osszegre
function twoStars(bill) {
    let tipSum = +parseFloat(Math.ceil(bill)).toFixed(2);
    return (tipSum - bill);
}

//3 csillagos kalkulaciov = kerekitjuk a szamlat a legkozelebbi 5 vagy 10 ertekre
function threeStars(bill) {
    // bill = 22,25

    let tempBill = parseInt(bill);
    let baseBill = tempBill;
    let tempTip;
    tempBill = tempBill % 10;
    console.log('atmeneti szamla', tempBill);
    if (tempBill < 5) {
        tempTip = 5 - tempBill;
        console.log('alap tipp: ', tempTip);
    }

    if (tempBill > 5) {
        tempTip = 10 - tempBill;
        console.log('alap tipp: ', tempTip);
    }
    let tizedesek = bill - baseBill;
    tizedesek = tizedesek.toFixed(2);
    console.log('tizedesek =', tizedesek);

    return tempTip - tizedesek;
}

//4 csillagos kalkulacio

//5 csillagos kalkulacio