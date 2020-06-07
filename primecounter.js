function sumAllPrimes(num) {
    let tomb = [];
    for (let i = 2; i <= num; i++) {
        let prime = isPrime(i);
        if (prime) {
            tomb.push(i);
        }
    }
    let summary = 0;
    for (let i = 0; i < tomb.length; i++) {
        summary += tomb[i];
    }
    console.log(summary);
}

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


sumAllPrimes(977);