// Setup
var contacts = [{
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];


function lookUpProfile(name, prop) {
    // Only change code below this line
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].firstName == name) {
            return contacts[i][prop] || 'No such property';
        }
    }
    return 'No such contact';
    // Only change code above this line
}
var valasz;
valasz = lookUpProfile("Akira", "likes");
console.log(valasz);
valasz = lookUpProfile("Sherlock", "likes");
console.log(valasz);
valasz = lookUpProfile("Harry", "likes");
console.log(valasz);
valasz = lookUpProfile("Bob", "number");
console.log(valasz);
valasz = lookUpProfile("Akira", "address");
console.log(valasz);




// PROMISE
let answ = new Promise((res, reject) => {
    setTimeout(() => {
        res('kokoot');
        return res;
    }, 2000);
});

answ.then(res => {
    console.log(res);
});
console.log('# # # #');


let en = {
    name: 'zozi',
    sex: 'male',
    birthYear: 1973,
    calcAge: function(birthYear) {
        return 2020 - birthYear;
    }
}

console.log(en.birthYear);  //?
console.log(en.calcAge(1973)); 