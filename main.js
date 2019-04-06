// jsForm HTML-hez tartozo funkcio
function ellenor() {
  var adat = document.forms['adatlap']['ujAdat'].value;
  document.getElementById('bevitel').innerText = adat;
  return false;
}
