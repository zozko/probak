const DOMelem = (function() {
    const eneterTag = document.querySelector('.input');
    const outputTag = document.querySelector('.display');

    console.log('DOMelem lefutott...');
    return {
        enter: eneterTag,
        output: outputTag
    };
})();



const DOMmanipulation = (function() {
    const numberInArr = [];
    const inputMaker = makeTag(DOMelem.enter, 'input', undefined, 'type', 'number', undefined);
    const buttonMaker = makeTag(DOMelem.enter, 'button', 'sendButton', undefined, undefined, 'convert');
    let inputString;
    let outputMaker;
    for (let i = 1; i < 1001; i++) {
        let rome;
        let szam = i / 5;
        szam = szam.toFixed(1);
        let splitted = szam.toString().split('.');
        if (Math.floor(i / 5) < 1) rome = ' = I'; //    5
        if (Math.floor(i / 5) >= 1) rome = ' = V'; //    5
        if (Math.floor(i / 5) >= 2) rome = ' = X'; //   10
        if (Math.floor(i / 5) >= 10) rome = ' = L'; //   50
        if (Math.floor(i / 5) >= 20) rome = ' = C'; //  100
        if (Math.floor(i / 5) >= 100) rome = ' = D'; //  500
        if (Math.floor(i / 5) >= 200) rome = ' = M'; // 1000

        let irdKi = i + ' : ' + i / 5 + rome + '    splitted: ' + splitted;

        // if (Math.floor(irdKi) == 5) irdK += ' = V';
        // if (Math.floor(irdKi) == 5) irdK += ' = V';
        // if (Math.floor(irdKi) == 5) irdK += ' = V';
        // if (Math.floor(irdKi) == 5) irdK += ' = V';
        // if (Math.floor(irdKi) == 5) irdK += ' = V';
        // if (Math.floor(irdKi) == 5) irdK += ' = V';
        // if (Math.floor(irdKi )== 5) irdK += ' = V';

        outputMaker = makeTag(DOMelem.output, 'p', undefined, undefined, undefined, irdKi);
        irdKi = 0;
    }
    buttonMaker.addEventListener('click', () => {
        inputString = inputMaker.value;
        //szetbontom a bejovo stringet szamokka
        // for (let i = 0; i < inputString.length; i++) {
        //     numberInArr.push(tempNum % 10);
        //     tempNum = Math.floor(tempNum / 10);
        // }


        //osztassal 5-tel
        tempNum = inputString / 5;
        let irdKi = `${inputString} = ${tempNum}`;




        // outputMaker.value = numberInArr;
        outputMaker = makeTag(DOMelem.output, 'p', undefined, undefined, undefined, irdKi);
        console.log(numberInArr);
    });

    console.log('DOMmanipulation lefutott...');
    return {
        input: inputMaker,
        convertButton: buttonMaker,
        output: outputMaker,
        input: inputString
    }
})();







function makeTag(parent, tag, tagClass, attribute, types, text) {
    const newTag = document.createElement(tag);
    if (tagClass) newTag.classList.add(tagClass);
    if (attribute) newTag.setAttribute(attribute, types);
    if (text) newTag.innerHTML = text;

    parent.appendChild(newTag);
    console.log('Az uj elem kesz:', newTag);
    return newTag;
};