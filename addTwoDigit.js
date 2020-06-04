function addTwoDigits(num) {
    let number = num + "";
    let numLength = number.length;
    let nums = [];
    let sum = 0;
    for (var i = 0; i < numLength; i++) {
        nums.push(parseInt(number.charAt(i)));
    }

    nums.forEach(element => {
        sum += element;
    });
    return sum;
}

let summa = addTwoDigits(101329);
console.log(summa);