console.log('muxik');


function ellenorizd() {
    let dobozIn = document.getElementById("doboz").checked;
    let nameField = document.getElementById("name").value;
    console.log(dobozIn);
    console.log(nameField);
}


//ez a kod a talalgatos reszhez - ha mas valasz legyen akkor az answ valtozot ird at!
let answ = 'c';

function birald() {
    let a = document.getElementById('ans_a').checked;
    let b = document.getElementById('ans_b').checked;
    let c = document.getElementById('ans_c').checked;
    let d = document.getElementById('ans_d').checked;
    console.log(a + "; " + b + "; " + c + "; " + d);
    let answers = [a, b, c, d];
    let ok = 0;
    answers.forEach(element => {
        if (element) ok++;
    });

    if (ok < 1) {
        alert('select an answer');
    }

    if (a && answ === 'a') { alert('CORRECT!'); } else {
        if (a && answ !== 'a') alert('NOOPE - the correct answer is: ' + answ);
    }
    if (b && answ === 'b') { alert('CORRECT!'); } else {
        if (b && answ !== 'b') alert('NOOPE - the correct answer is: ' + answ);
    }
    if (c && answ === 'c') { alert('CORRECT!'); } else {
        if (c && answ !== 'c') alert('NOOPE - the correct answer is: ' + answ);
    }
    if (d && answ === 'd') { alert('CORRECT!'); } else {
        if (d && answ !== 'd') alert('NOOPE - the correct answer is: ' + answ);
    }
}

//ez a kod a karakterszamolos reszhet

var kont = 0;

function szmaolj() {
    const szamolo = document.getElementById("szamolo");
    const displaj = document.getElementById("display");
    console.log(szamolo + "" + displaj);
    kont++
    displaj.innerHTML = kont;
}

function torolj() {
    const szamolo = document.getElementById("szamolo");
    const displaj = document.getElementById("display");
    szamolo.value = "";
    displaj.innerHTML = 0;
    kont = 0;
}

function minuszegy() {
    kont--;
    const szamolo = document.getElementById("szamolo");
    const displaj = document.getElementById("display");
    let texttarto = szamolo.value + "";
    let karakterhely = texttarto.length - 1;
    displaj.innerText = kont;
    let newtexttarto = texttarto.slice(0, karakterhely);
    szamolo.value = newtexttarto;
}