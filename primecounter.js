function sumAllPrimes(num) {
    let tomb = [];
    for (let i = 2; i <= num; i++) {
        let prime = isPrime(i);
        if (prime) {
            tomb.push(i);
        }
    }
    let summary = 0;

    tomb.forEach(element => {
        summary += element;
    });

    /*
      for (let i = 0; i < tomb.length; i++) {
          summary += tomb[i];
      }
      */
    console.log(summary);
}

//megallapitja, hogy az adott szam prim szam e egyaltalan
function isPrime(num) {
    let counter = 0;
    for (let i = 1; i <= num; i++) {
        if ((num % i) == 0) {
            counter++;
            if (counter > 2) {
                return false;
            }
        }
    }
    return true;
}

//2-tol 20-ig fogja osszeadni a prim szamokat
sumAllPrimes(20);