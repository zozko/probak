const http = require('http');
const fsys = require('fs');

/*lekereseket figyelo funkcio - mindig ket attributumot var
ket objektumot 1. request(lekeres) a 2. response (valasz)
*/
function reqListener(req, resp) {
    console.log("URL: " + req.url + "\n  method:  " + req.method);

    //ha egy adott url lekerdezesre akarunk reagalni - ebben a valtozoban lesz az oldal cime
    const url = req.url;

    //hogy milyen metodussla komunikall a szerver: GET / POST
    const method = req.method;

    if (url === '/') {
        resp.write('<html>');
        resp.write('<head><title>input</title></head>');
        resp.write('<body><h1>ZOLO</h1>');
        resp.write('<form action="/message" method="POST"><input type="text" name="message" ></input><button type="submit">send</button></form>');
        resp.write('</html>');
        //hogy ne fusson tovabb a valasz ezert returnal kell lezarni
        return resp.end();
    }
    //kilepes a node szerverbol - hard exit a vegtelen hurokbol
    //process.exit();

    // valasz kuldese

    if (url === '/message' && method === 'POST') {
        const adatdarabokTeste = [];
        //az on() egy esemeny figyelo kapcsolo
        req.on('data', (adatdarab) => {
            adatdarabokTeste.push(adatdarab);
        });
        //az esemenyfigyelo kikapcsolasa
        req.on('end', () => {
            //stringet csinal a darabok tombbol
            const parosito = Buffer.concat(adatdarabokTeste).toString();
            console.log(parosito);
            //a tomb 2. reszet teszi bele a beirando valtozoba, ugy hogy az = szettori a stringet
            const beirando = parosito.split('=')[1];
            fsys.writeFileSync('message.txt', beirando);
        });

        resp.statuCode = 302;
        resp.setHeader('Location', '/');
        return resp.end();
    }


    resp.setHeader('Content-Type', 'text/html');
    resp.write('<html>');
    resp.write('<head><title>zolo</title></head>');
    resp.write('<body><h1>ZOLO</h1><p>megjott a valasz</p></body>');
    resp.write('</html>');
    //a valasz veget jelezni kell az end()-al
    return resp.end();
}

// futtatja a lekerest figyelo funkciot
const server = http.createServer(reqListener);

//inditja a szervert a 3000 porton keresztul
server.listen(3000);