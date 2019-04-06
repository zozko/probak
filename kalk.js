var szam1 = 0;
var szam2 = 0;
var ujSzam;
var muvelet;
var eredmeny = '0';
var szam;
var jel;
var kont = 0;
var kijelez = 0;
var arr = [0];
var lenyomva = 0;
var torol = 0;
//alert('kuuurva');

function felir(val) {
  if (val == '.') {
    document.getElementById('kapcs').removeAttribute('onclick');
  }
  document.getElementById('kijelzo').style.color = 'black';
  if (
    document.getElementById('kijelzo').innerText == '0' ||
    document.getElementById('kijelzo').innerText == eredmeny
  ) {
    document.getElementById('kijelzo').innerText = val;
    szam = val;
    szam = parseFloat(szam);
  } else {
    ujSzam = document.getElementById('kijelzo').innerText;
    document.getElementById('kijelzo').innerText = ujSzam + val;
    szam = ujSzam + val;
    szam = parseFloat(szam);
  }
}

/* ujSzam = document.getElementById('kijelzo').innerText; // beolvassa a kijelzon levo szamot
  if (ujSzam == 0) {
    ujSzam = '';
  }
  if (arr.length < 1) {
    document.getElementById('kijelzo').innerText = ujSzam + val;
    szam = ujSzam + val;
    szam = parseInt(szam);
    console.log('kujelzoben a szam = ' + szam);
  }
  if (arr.length == 1) {
    console.log('kijelzo ha a tombnek 1 tagja mar van');
    document.getElementById('kijelzo').innerText = val;
    lenyomva = 1;
    kont = 1;
    ujSzam = val;
  } */

function torles() {
  document.getElementById('kijelzo').innerText = '0';
  document.getElementById('kijelzo').style.color = 'black';
  //arr.length = 0;
  szam1 = 0;
  szam2 = 0;
  ujSzam;
  muvelet;
  eredmeny = '0';
  szam;
  jel;
  kont = 0;
  kijelez = 0;
  arr = [0];
  lenyomva = 0;
  torol = 0;
  document.getElementById('kapcs').setAttribute('onclick', 'felir(".")');
  console.log('torles utan a tomb = ' + arr);
}

function oszeadas() {
  document.getElementById('kijelzo').style.color = 'green';
  document.getElementById('kapcs').setAttribute('onclick', 'felir(".")');
  lenyomva++;
  if (lenyomva == 0 || arr.length == 0) {
    document.getElementById('kijelzo').style.color = 'black';
    document.getElementById('kijelzo').innerText = eredmeny;
    szam = document.getElementById('kijelzo').innerText;
    szam = parseFloat(szam);
    arr[0] = szam;
  }
  muvelet = 'add';
  console.log('pluszgomb lenyomva :' + lenyomva);
  document.getElementById('kijelzo').innerText = '+';
  arr[kont] = szam;
  if (arr.length > 1) {
    document.getElementById('kijelzo').style.color = 'black';
    document.getElementById('kijelzo').innerText = '+';
    szam1 = arr[0];
    szam2 = arr[1];
    console.log('osszeadasban szam1 = ' + szam1 + ' es szam2 = ' + szam2);
    eredmeny = szam1 + szam2;
    console.log('ket szam osszeadasa = ' + eredmeny);
    document.getElementById('kijelzo').innerText = eredmeny;
    arr.length = 0;
    arr[0] = eredmeny;
    console.log('a tomb nagysaga = ' + arr.length);
    kont = 1;
    lenyomva = 1;
  } else {
    console.log(arr);
    szam = '0';
    kont++;
  }
}

function vegEredmeny() {
  document.getElementById('kijelzo').style.color = 'black';
  document.getElementById('kapcs').setAttribute('onclick', 'felir(".")');
  if ((muvelet = 'add')) {
    arr[kont] = szam;
    szam1 = arr[0];
    szam2 = arr[1];
    eredmeny = szam1 + szam2;
    console.log('ket szam vegeredmenyben = ' + eredmeny);
    document.getElementById('kijelzo').innerText = eredmeny;
    arr.length = 0;
    arr[0] = eredmeny;
    kont = 0;
    lenyomva = -1;
    muvelet = '';
    var tizedes = eredmeny.toFixed(2);
    console.log(
      'vegeredmenyben a tomb erteke' +
        arr +
        'eredmeny tizedesszamban =' +
        tizedes
    );
    szam1 = 0;
    szam2 = 0;
    torol = 1;
  }
}
