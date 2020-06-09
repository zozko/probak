/*
ebben a kihivasban a fonevek helyesirasat kell korrigalni
a fonev nagybetuvel kezdodik, es kisbetukkel folytatodik
barmilyen szavat be lehet kuldeni a funkcioba es a helyesen irt fonev jelenik meg
*/


function properNounCorrection(str) {
    let lowerNoun = str.toLowerCase().slice(1);
    let firstLetter = str.charAt(0).toUpperCase();

    //ez ugyan az mint felette ket sorban:
    let komplett = str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    console.log(firstLetter + lowerNoun);
    console.log("komplette: " + komplett);
}

properNounCorrection("pArIs");
properNounCorrection("zOlI");
properNounCorrection("valMiLYen");