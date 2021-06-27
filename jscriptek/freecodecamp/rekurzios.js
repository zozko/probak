let arr1 = [1, 2, 3, 4];
let arr2 = [5, 10, 15, 20, 25, 30];
let tarto = document.getElementsByClassName('wrapper')[0];


function kiir(eredmeny) {
    let uj = document.createElement('p');
    let text = document.createTextNode(eredmeny);
    uj.appendChild(text);
    tarto.appendChild(uj);
}

function rekurz(arr, n) {
    if (n <= 0) {
        return 0; //base case
    } else {
        let uj = document.createElement('p');
        let text = document.createTextNode(arr + ' ... ' + n);
        uj.appendChild(text);
        tarto.appendChild(uj);
        return rekurz(arr, n - 1) + arr[n - 1];
    }
}


let answ = rekurz(arr1, 2);
let answ2 = rekurz(arr2, 3);

kiir(answ);
kiir(answ2);