const dom = (function() {
    let photoArr = ['photos/a.jpg', 'photos/b.jpg', 'photos/c.jpg'];
    let container = document.querySelector('.photo_container');

    let inputMethod = document.forms[0]; //a radiobutton formularra mutat
    let tileArr = [];

    let btn = document.querySelectorAll('button');

    return {
        photoRam: container,
        bgPhto: photoArr,
        gomb: btn,
        tileBlockArr: tileArr,
        methodSelected: inputMethod
    };
})();

const picture = (function() {
    let originArr;
    console.log(dom.methodSelected.elements['render']);
    // let methodToRender = dom.methodSelected.elements['render'].value;

    let showPics = dom.gomb[0].addEventListener('click', () => {
        // a radiobutton ertekenek kiolvsasa
        methodToRender = dom.methodSelected.elements['render'].value;
        console.log('kijelolve:', methodToRender);



        dom.tileBlockArr.length = 0;

        if (dom.photoRam.hasChildNodes()) {
            dom.photoRam.removeChild(dom.photoRam.childNodes[0]);
        }

        let tileWrapper = makeElem(dom.photoRam, 'div', 'tile_wrapper', 0);
        let picNum = Math.floor(Math.random() * 3);

        dom.photoRam.style.background = `url(${dom.bgPhto[picNum]})`;


        for (let k = 0; k < 50; k++) {
            for (let i = 1; i <= 45; i++) {
                let tile = makeElem(tileWrapper, 'div', 'tile', 0);
                if (i % 45 === 1) {
                    tile.classList.add('carry_left');
                }
                dom.tileBlockArr.push(tile);
            }
        }
        originArr = dom.tileBlockArr.map((el) => el);
        tileOpacity(dom.tileBlockArr, 'remove', methodToRender);
    });

    let fadePics = dom.gomb[1].addEventListener('click', () => {
        methodToRender = dom.methodSelected.elements['render'].value;
        // console.log('fading...?', originArr);
        //  let blockNumber = Math.floor(Math.random() * originArr.length);
        if (originArr != undefined && originArr.length > 0) {
            tileOpacity(originArr, 'fade', methodToRender);
        } else {
            //   console.log('nothing to fade');
        }
    });

    return {
        bgPics: showPics,
    };
})();

//az atlatszosagot levenni a takaro negyzetekrol - veletlenszeruen
function tileOpacity(array, whatToDo, methodName) {
    //   console.log(array);
    let todo;
    let originArr = array.map((el) => el);
    let tmbMeret = array.length;
    //   console.log(tmbMeret);
    let munkatomb = array;

    if (whatToDo === 'remove') todo = 'rem';
    if (whatToDo === 'fade') todo = 'cover';

    setOpacity(munkatomb, todo, methodName);
}



//az atlatszosagot szabalyzo funkcio - a tombbol torli az atlatszonak beallitott elelemet
// function setOpacity(aktualArr) {
function setOpacity(aktualArr, makeIt, howRenderMethod) {
    let makeItMethod = makeIt;
    let munkaTomb = aktualArr.map(e => e);

    switch (howRenderMethod) {
        case 'random':
            let futtato = setInterval(() => {
                munkaTomb = randomRenderer(munkaTomb, makeItMethod);
                // console.log('   tomb merete:', munkatomb.length);
                if (munkaTomb.length < 1) {
                    clearInterval(futtato);
                }
                // console.log('eredeti tomb: ', munkaTomb);
            }, 0);
            // randomRenderer(aktualArr, makeIt);
            // return aktualArr;
            break;

        case 'start':
            console.log('START METHOD CALLED... funkcioja', makeItMethod);
            startRenderer(munkaTomb, makeItMethod);
            // aktualArr.shift();
            return munkaTomb;

        case 'end':
            console.log('END METHOD CALLED... funkcioja', makeItMethod);
            endRenderer(munkaTomb, makeItMethod);
            // aktualArr.shift();
            return munkaTomb;

        default:
            console.log('ops');
            munkaTomb.length = 0;
            return munkaTomb;

    }

}



function randomRenderer(aktArray, tileFunc) {
    console.log('RANDOMOLOK.... funkcioja: ', tileFunc);
    let inportedArr = aktArray.length;
    let munkaTomb = aktArray.map(el => el);
    let blockNumber = Math.floor(Math.random() * inportedArr);

    if (tileFunc === 'rem') {
        munkaTomb[blockNumber].style.opacity = '0';
    }

    if (tileFunc === 'cover') {
        munkaTomb[blockNumber].style.opacity = '1';
    }

    munkaTomb.splice(blockNumber, 1);

    return munkaTomb;
}


function startRenderer(aktArray, tileFunc) {
    console.log('STARTOLOK.... funkcioja: ', tileFunc, aktArray);
    let inportedArr = aktArray.map(el => el);

    // let blockNumber = Math.floor(Math.random() * inportedArr);

    for (let j = 0; j < 50; j++) {
        for (let i = 0; i < 2250; i += 45) {
            let num = i + j;
            if (tileFunc === 'rem') {
                setTimeout(() => {
                    setTimeout(() => {
                        inportedArr[num].style.transform = 'scale(0)';
                    }, 250);

                }, 250);

            }
            if (tileFunc === 'cover') {
                setTimeout(() => {
                    setTimeout(() => {
                        inportedArr[num].style.transform = 'scale(1)';
                    }, 250);
                }, 250);
            }
            // aktArray.splice(i + j, 1);

        }
    }
    return aktArray;
}

function endRenderer(a, b) {
    console.log('END RENDER FUNCTION....');
}


//elem letrehozasa
function makeElem(parent, newTag, setClass, text) {
    //ha van a szulonek eleme, akkor toroljuk
    // if (parent.hasChildNodes()) {
    //     parent.removeChild(parent.childNodes[0]);
    // }
    let elem = document.createElement(newTag);
    if (setClass) elem.classList.add(setClass);

    parent.append(elem);

    return elem;
}