let nums = [2, 1, 3, 5, 5, 10, 3, 2];
let count = 0;
let firstDuplicite = -1;
for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] === nums[j]) {
            firstDuplicite = nums[i];
            console.log(firstDuplicite);
        }

    }
}
console.log(firstDuplicite);