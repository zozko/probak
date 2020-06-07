/*
ebben a kihivasban a program megnezi, hogy egy adott szam minden tagja paros szam e
ha igen akkor true-t ad vissza, ha van benne paratlan szam, akkor false-t ad vissza
*/


function evenDigitsOnly(number) {
    let num = number.toString();
    //let counter = 0;

    //tombbel es for each metodussal
    let szamTomb = num.split("");
    let answ = true;
    szamTomb.forEach(element => {
        let n = parseInt(element);
        if ((n % 2) != 0) {
            answ = false;
        }
    });
    if (answ == false) {
        return false;
    }

    /*
       // sima for-ral
        for (let i = 0; i < num.length; i++) {
            if (num.charAt(i) % 2 != 0) {
                return false;
            }
        }

    */
    return true;

    //  return (counter == num.length) ? true : false;
}
//megnezi, hogy minden szam paros szam e az adott szamban
let ansver = evenDigitsOnly(242621);
console.log(ansver);