function addBorder(array) {
    let maxLength = 0;
    let topAndBottom = "";
    for (var i = 0; i < array.length; i++) {
        if (array[i].length > maxLength) {
            maxLength = array[i].length;
        }
    }

    for (var j = 0; j < maxLength + 2; j++) {
        topAndBottom += '*';
    }
    maxLength += 2;

    for (var k = 0; k < array.length; k++) {
        let plusMark = 0;
        array[k] = "*" + array[k] + "*";
        // console.log("elemhossz: " + array[k].length + " a maxLength: " + maxLength);
        if (array[k].length < maxLength + 2) {
            plusMark = maxLength - array[k].length;
        }
        //console.log("elem: " + array[k] + " a maxLength: " + maxLength + " plusz jel: " + plusMark);
        for (var l = 0; l < plusMark; l++) {
            array[k] += "*";
        }
    }

    array.unshift(topAndBottom);
    array.push(topAndBottom);
    return array;
}


let arr = ["abc", "dedo", "manu", "evi", "zozko"];
let nArray = addBorder(arr);
console.log(nArray);