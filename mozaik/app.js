const dom = (function() {
    let photoArr = ['photos/a.jpg', 'photos/b.jpg', 'photos/c.jpg'];
    let container = document.querySelector('.photo_container');


    let tileArr = [];

    let btn = document.querySelector('button');

    return {
        photoRam: container,
        bgPhto: photoArr,
        gomb: btn,
        tileBlockArr: tileArr
    };

})();


const picture = (function() {

    let showPics = dom.gomb.addEventListener('click', () => {

        dom.tileBlockArr.length = 0;


        if (dom.photoRam.hasChildNodes()) {
            dom.photoRam.removeChild(dom.photoRam.childNodes[0]);
        }

        let tileWrapper = makeElem(dom.photoRam, 'div', 'tile_wrapper', 0);
        let picNum = Math.floor(Math.random() * 3);

        dom.photoRam.style.background = `url(${dom.bgPhto[picNum]})`;
        // let backgroundPicture = makeElem(dom.photoRam, 'img', 'kep', 0);

        for (let k = 0; k < 50; k++) {
            for (let i = 1; i <= 45; i++) {
                let tile = makeElem(tileWrapper, 'div', 'tile', 0);
                if (i % 45 === 1) {
                    tile.classList.add('carry_left');
                }
                dom.tileBlockArr.push(tile);
            }
        }

        tileOpacityRemover(dom.tileBlockArr);
    });



    return {
        bgPics: showPics
    };
})();


//az atlatszosagot levenni a takaro negyzetekrol - veletlenszeruen
function tileOpacityRemover(array) {
    console.log(array);
    let tmbMeret = array.length;
    console.log(tmbMeret);
    let munkatomb = array;

    let futtato = setInterval(() => {
        munkatomb = setOpacity(munkatomb);
        console.log('   tomb merete:', munkatomb.length);
        if (munkatomb.length < 1) {
            clearInterval(futtato);
        }
    }, 1);


    // while (tmbMeret >= 0) {
    //     setTimeout(() => {

    //         array = setOpacity(munkatomb);
    //         tmbMeret--;
    //     }, 200);
    // }
}

function setOpacity(aktualArr) {
    let inportedArr = aktualArr.length;
    let blockNumber = Math.floor(Math.random() * inportedArr);
    console.log(`ezt torlom eppen ${blockNumber}`);

    aktualArr[blockNumber].style.opacity = '0';
    aktualArr.splice(blockNumber, 1);

    return aktualArr;


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

};