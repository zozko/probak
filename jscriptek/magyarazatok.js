//anonymus function expression = kifejezes  - ha funkcio kifejezest hasznalunk, es az elott hivjuk meg, hogy erteket kapott volna, akkor udefinde-et kapunk vissza!
// maga a valtozo kiemelodik (hoisting) de nem rendelodik hozza ertek a kiemelessel.
let kifejezes = function() {

    console.log('haj');
};

kifejezes();


//function statement = kijelentes
function greet() {
    console.log('hahoy');
}

greet();