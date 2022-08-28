const DOMelems = (function() {
    const total = document.querySelector('.otal_value');
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

    // console.log(saveBtn);


    return {
        billTotal: total,
        min_percent: min,
        max_percent: max,
        minOut: minNum,
        maxOut: maxNum,
        ratingSetter: ratingStars,
        displayRating: ratingStarsImg,
        roundUP: upArrow,
        roundDOWN: downArrow,
        rounderInput: rounder,
        setStorage: saveBtn
    };
})();

console.log(DOMelems);

const manipulators = (function() {
    let setRounder = 'DOWN';
    let ratingStars;
    let minimumPercent = DOMelems.min_percent.value;
    let maximumPercent = DOMelems.max_percent.value;



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

    //rating star setting

    DOMelems.ratingSetter.forEach((elem) => {
        elem.addEventListener('change', (event) => {
            let starNumber = parseInt(elem.value);
            // console.log(elem, elem.value, starNumber);

            switch (starNumber) {
                case 1:
                    console.log('cool1');
                    ratingStars = 1;
                    DOMelems.displayRating[0].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[1].src = 'imgs/star_OFF.png';
                    DOMelems.displayRating[2].src = 'imgs/star_OFF.png';
                    DOMelems.displayRating[3].src = 'imgs/star_OFF.png';
                    DOMelems.displayRating[4].src = 'imgs/star_OFF.png';

                    break;
                case 2:
                    console.log('cool2');
                    ratingStars = 2;
                    DOMelems.displayRating[0].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[1].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[2].src = 'imgs/star_OFF.png';
                    DOMelems.displayRating[3].src = 'imgs/star_OFF.png';
                    DOMelems.displayRating[4].src = 'imgs/star_OFF.png';
                    break;
                case 3:
                    console.log('cool3');
                    ratingStars = 3;
                    DOMelems.displayRating[0].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[1].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[2].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[3].src = 'imgs/star_OFF.png';
                    DOMelems.displayRating[4].src = 'imgs/star_OFF.png';

                    break;
                case 4:
                    console.log('cool4');
                    ratingStars = 4;
                    DOMelems.displayRating[0].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[1].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[2].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[3].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[4].src = 'imgs/star_OFF.png';
                    break;
                case 5:
                    console.log('cool5');
                    ratingStars = 5;
                    DOMelems.displayRating[0].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[1].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[2].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[3].src = 'imgs/star_ON.png';
                    DOMelems.displayRating[4].src = 'imgs/star_ON.png';

                    break;
            }
            console.log('csilla:', ratingStars);
        });
    });


    // rounder methods
    let rounder = DOMelems.rounderInput.forEach(elem => {
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
        window.localStorage.setItem('rating', ratingStars);
        window.localStorage.setItem('roundMethod', setRounder);
        window.localStorage.setItem('minPercent', minimumPercent);
        window.localStorage.setItem('maxPercent', maximumPercent);
        console.log('data stored', window.localStorage);

    });


})();