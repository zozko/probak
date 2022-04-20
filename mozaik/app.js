const dom = (function() {
    let photoArr = ['photos/a.jpg', 'photos/b.jpg', 'photos/c.jpg'];
    let container = document.querySelector('.photo_container');


    let btn = document.querySelector('button');

    return {
        photoRam: container,
        bgPhto: photoArr,
        gomb: btn
    };

})();


const picture = (function() {

    let showPics = dom.gomb.addEventListener('click', () => {

        let picNum = Math.floor(Math.random() * 3);
        let backgroundPicture = makeElem(dom.photoRam, 'img', 0, 0);
        backgroundPicture.setAttribute('src', dom.bgPhto[picNum]);
        backgroundPicture.setAttribute('alt', 'background photo');
    });



    return {
        bgPics: showPics
    };
})();




//elem letrehozasa
function makeElem(parent, newTag, setClass, text) {


    //ha van a szulonek eleme, akkor toroljuk
    if (parent.hasChildNodes()) {
        parent.removeChild(parent.childNodes[0]);
    }
    let elem = document.createElement(newTag);

    parent.append(elem);

    return elem;

};