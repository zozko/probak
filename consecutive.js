/**
 * ebben a kihivasban egy matrijoskat kell kipotolmi (ami a tomb elemei) a hianyzo elemekkel
 *  
 */

function makeconsecutive(arr) {
    arr.sort();
    let neededItem = [];
    let kezd = arr[0];
    let vegez = arr[arr.length - 1];
    for (kezd; kezd < vegez; kezd++) {
        if (arr.indexOf(kezd) < 0) {
            arr.unshift(kezd);
            neededItem.push(kezd);
        }
    }
    console.log(arr);
    console.log(neededItem);
}
let arr = [6, 2, 3, 8];
makeconsecutive(arr) 
arr[0]; 

