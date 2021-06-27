// a this keyword mindig az eppen futo kornyezetre mutat

//a global objektumbna - bongeszoben ez a window objektum
this.valami = 'valami'

console.log(this.valami);



//egy objektumban a this - mindig az objektum futokornyezetere mutat
let haz = {
    asztal: 'asztal',
    szek: 'szek',
    agy: 'agy',
    tv: 'tv',

    mivanAszobaban() {
        //ugyan az mintha azt irtuk volna, hogy  haz.agy, haz.asztal, haz.tv ....
        console.log(this.agy, this.asztal, this.tv, 'es par', this.szek);
    }
}


//a this mindig az ot meghivo kornyezetre mutat - itt a meghivo kornyezet a haz
console.log(haz.mivanAszobaban());



console.log('\n\n\n masik pelda:');
//####################################################################x
global.a = 'OK'; //node-ban global objektum, bongeszoben window objektumra kell allitani

function egy() {
    console.log('1', this.a);
    ketto();
}

function ketto() {
    console.log('2', this.a);
}


egy();