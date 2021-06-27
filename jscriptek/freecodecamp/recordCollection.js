let valasz = document.getElementById('valasz');
// Setup
let collection = {
    2548: {
        albumTitle: 'Slippery When Wet',
        artist: 'Bon Jovi',
        tracks: ['Let It Rock', 'You Give Love a Bad Name']
    },
    2468: {
        albumTitle: '1999',
        artist: 'Prince',
        tracks: ['1999', 'Little Red Corvette']
    },
    1245: {
        artist: 'Robert Palmer',
        tracks: []
    },
    5439: {
        albumTitle: 'ABBA Gold'
    }
};

document.getElementById('org').innerText = JSON.stringify(collection);
// Only change code below this line
function updateRecords(object, id, prop, value) {
    // console.warn(`bejovo adatotk: id: ${id}. prop: ${prop}, ertekek: ${value}`);

    // tracks kulcs letrehozasa
    if (prop === "tracks" && !object[id].hasOwnProperty("tracks") && value != '') {
        console.warn('letrehozok egy uj szamot az albumba');
        object[id].tracks = [];
        object[id].tracks.push(value);
    } //uj szam hozzaadasa 
    else if (prop === 'tracks' && value !== '') {
        console.warn('beteszek egy uj szamot az album listajaba');
        object[id].tracks.push(value);
    }
    //artist hozzaadasa  
    else if (prop !== 'tracks' && value !== '') {
        console.warn('beirom az eloadot a listaba');
        object[id][prop] = value;
    } //torlese az adott tulajdonsagnak
    else if (value === '') {
        console.warn('torlok: ' + prop);
        delete object[id][prop];
    }
    return object;

}


// console.log(!collection[5439].hasOwnProperty('tracks'));
updateRecords(collection, 5439, 'artist', 'ABBA');
updateRecords(collection, 5439, "tracks", "Take a Chance on Me");
updateRecords(collection, 5439, "tracks", "Mama mia");
updateRecords(collection, 2548, "artist", "");
updateRecords(collection, 1245, "tracks", "Addicted to Love");
updateRecords(collection, 1245, "tracks", "nagyon jo szam");
updateRecords(collection, 2468, "tracks", "Free");
updateRecords(collection, 2548, "tracks", "");
updateRecords(collection, 1245, "albumTitle", "Riptide");

console.log(collection);



document.getElementById('modositott').innerText = JSON.stringify(collection);

let ujKol = {
    egy: 1,
    ketto: 2,
}

function csinald(obj, property, ertek) {
    if (property !== undefined && ertek !== '') {
        obj[property] = ertek;
    }
}

ujKol.harom = 3;
delete ujKol.egy;
ujKol.tomb = [1, 9, 7, 3];
csinald(ujKol, 'sex', 'baszas');
csinald(ujKol, 'tiz', 10);
csinald(ujKol, undefined, 'HAHA');
csinald(ujKol, 'muxik?');
csinald(ujKol, 'igy', true);
valasz.innerHTML = JSON.stringify(ujKol);

console.log(ujKol);