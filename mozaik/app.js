const dom = (function () {
  let photoArr = ['photos/a.jpg', 'photos/b.jpg', 'photos/c.jpg'];
  let container = document.querySelector('.photo_container');

  let tileArr = [];

  let btn = document.querySelectorAll('button');

  return {
    photoRam: container,
    bgPhto: photoArr,
    gomb: btn,
    tileBlockArr: tileArr,
  };
})();

const picture = (function () {
  let originArr;
  let showPics = dom.gomb[0].addEventListener('click', () => {
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
    originArr = dom.tileBlockArr.map((el) => el);
    tileOpacity(dom.tileBlockArr, 'remove');
  });

  let fadePics = dom.gomb[1].addEventListener('click', () => {
    // console.log('fading...?', originArr);
    //  let blockNumber = Math.floor(Math.random() * originArr.length);
    if (originArr != undefined && originArr.length > 0) {
      tileOpacity(originArr, 'fade');
    } else {
      //   console.log('nothing to fade');
    }
  });

  return {
    bgPics: showPics,
  };
})();

//az atlatszosagot levenni a takaro negyzetekrol - veletlenszeruen
function tileOpacity(array, whatToDo) {
  //   console.log(array);
  let todo;
  let originArr = array.map((el) => el);
  let tmbMeret = array.length;
  //   console.log(tmbMeret);
  let munkatomb = array;

  if (whatToDo === 'remove') todo = 'rem';
  if (whatToDo === 'fade') todo = 'cover';
  let futtato = setInterval(() => {
    munkatomb = setOpacity(munkatomb, todo);
    // console.log('   tomb merete:', munkatomb.length);
    if (munkatomb.length < 1) {
      clearInterval(futtato);
    }
    // console.log('eredeti tomb: ', originArr);
  }, 0);
}

<<<<<<< HEAD

//az atlatszosagot szabalyzo funkcio - a tombbol torli az atlatszonak beallitott elelemet
function setOpacity(aktualArr) {
    let inportedArr = aktualArr.length;
    let blockNumber = Math.floor(Math.random() * inportedArr);
    console.log(`ezt torlom eppen ${blockNumber}`);
=======
function setOpacity(aktualArr, makeIt) {
  let inportedArr = aktualArr.length;
  let blockNumber = Math.floor(Math.random() * inportedArr);
  //   console.log(`ezt torlom eppen ${blockNumber}`);
>>>>>>> origin/office_work

  if (makeIt === 'rem') {
    aktualArr[blockNumber].style.opacity = '0';
  }

  if (makeIt === 'cover') {
    aktualArr[blockNumber].style.opacity = '1';
  }

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
}
