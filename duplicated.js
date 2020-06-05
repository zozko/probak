let row = [2, 1, 3, 5, 3, 2];
let count = 0;
let firstDuplicite = -1;
for (let i = 0; i < row.length - 1; i++) {
    for (let j = 1; j <= row.length; j++) {
        if (row.hasOwnProperty(row[j]) === row.hasOwnProperty(row[i])) {
            count++;
            if (count == 2) {
                firstDuplicite = row[i];
                count = 0;
            }
        }
    }
}
console.log(firstDuplicite);