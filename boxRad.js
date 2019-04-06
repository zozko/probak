function horizontPlus() {
  var hSet = document.getElementById('hSetter').innerHTML;
  hSet = parseInt(hSet);
  var vSet = document.getElementById('vSetter').innerHTML;
  vSet = parseInt(vSet);

  hSet++;
  if (hSet >= 100) hSet = 100;
  document.getElementById('hSetter').innerHTML = hSet + '<span>%</span>';
  console.log(hSet);
  var hLine = hSet * 2;
  document.getElementsByClassName('horizontal')[0].style.width = hLine + 'px';
  document.getElementById('doboz').style.borderRadius =
    hSet +
    '% ' +
    hSet +
    '% ' +
    hSet +
    '% ' +
    hSet +
    '% /' +
    vSet +
    '% ' +
    vSet +
    '% ' +
    vSet +
    '% ' +
    vSet +
    '%';
}

function horizontMinus() {
  var hSet = document.getElementById('hSetter').innerHTML;
  hSet = parseInt(hSet);
  var vSet = document.getElementById('vSetter').innerHTML;
  vSet = parseInt(vSet);

  hSet--;
  if (hSet <= 0) hSet = 0;
  document.getElementById('hSetter').innerHTML = hSet + '<span>%</span>';
  console.log(hSet);
  var hLine = hSet * 2;
  document.getElementsByClassName('horizontal')[0].style.width = hLine + 'px';
  document.getElementById('doboz').style.borderRadius =
    hSet +
    '% ' +
    hSet +
    '% ' +
    hSet +
    '% ' +
    hSet +
    '% /' +
    vSet +
    '% ' +
    vSet +
    '% ' +
    vSet +
    '% ' +
    vSet +
    '%';
}
/* vertikalisan */
function vertikalPlus() {
  var vSet = document.getElementById('vSetter').innerHTML;
  vSet = parseInt(vSet);
  var hSet = document.getElementById('hSetter').innerHTML;
  hSet = parseInt(hSet);

  vSet++;
  if (vSet >= 100) vSet = 100;
  document.getElementById('vSetter').innerHTML = vSet + '<span>%</span>';
  console.log(vSet);
  var vLine = vSet * 2;
  document.getElementsByClassName('vertikal')[0].style.height = vLine + 'px';
  document.getElementById('doboz').style.borderRadius =
    hSet +
    '% ' +
    hSet +
    '% ' +
    hSet +
    '% ' +
    hSet +
    '% /' +
    vSet +
    '% ' +
    vSet +
    '% ' +
    vSet +
    '% ' +
    vSet +
    '%';
}

function vertikalMinus() {
  var vSet = document.getElementById('vSetter').innerHTML;
  vSet = parseInt(vSet);
  var hSet = document.getElementById('hSetter').innerHTML;
  hSet = parseInt(hSet);

  vSet--;
  if (vSet <= 0) vSet = 0;
  document.getElementById('vSetter').innerHTML = vSet + '<span>%</span>';
  console.log(vSet);
  var vLine = vSet * 2;
  document.getElementsByClassName('vertikal')[0].style.height = vLine + 'px';
  document.getElementById('doboz').style.borderRadius =
    hSet +
    '% ' +
    hSet +
    '% ' +
    hSet +
    '% ' +
    hSet +
    '% /' +
    vSet +
    '% ' +
    vSet +
    '% ' +
    vSet +
    '% ' +
    vSet +
    '%';
}
