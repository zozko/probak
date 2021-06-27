const tmb = [
    [2],
    [2, 2, 2],
    [3, 3],
    [3, 3, 3],
    [5],
    [7],
    [7, 7],
    [7, 7, 7]
];

//a fenti tombbol kell kesziteni egy olyan tombot, amiben az egyes szamokbol csak az a tomb marad meg, melyik a leghosszabb = legtobb eleme van
//ennek a tombnek kell lennie az eredmenynek:
// [[2,2,2], [3,3,3,], [5], [7,7,7]];

console.log(tmb);
for (let i = 0; i < tmb.length - 1; i++) {
    let y = i + 1;
    if (tmb[i].length < tmb[y].length && tmb[i][0] === tmb[y][0]) {
        tmb[i] = [];
    }
}

let eredmeny = tmb.filter(el => el.length !== 0);
console.log(eredmeny);
//az elemek szorzata pedig
let szorzat = 1;
for (let i = 0; i < eredmeny.length; i++) {
    for (let j = 0; j < eredmeny[i].length; j++) {
        szorzat *= eredmeny[i][j];
    }
}
console.log('szorzat = ', szorzat);