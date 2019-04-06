/* bal felso sarok */
function bfPlus() {
  var alap = document.getElementById('bfAlap').innerHTML;
  alap++;
  if (alap >= 100) alap = 100;
  document.getElementById('bfAlap').innerHTML = alap;
  document.getElementById('alak').style.borderTopLeftRadius = alap + '%';
}
function bfMinus() {
  var alap = document.getElementById('bfAlap').innerHTML;
  alap--;
  if (alap < 0) alap = 0;
  document.getElementById('bfAlap').innerHTML = alap;
  document.getElementById('alak').style.borderTopLeftRadius = alap + '%';
}

/* jobb felso sarok */
function jfPlus() {
  var alapJF = document.getElementById('jfAlap').innerHTML;
  alapJF++;
  if (alapJF >= 100) alapJF = 100;
  document.getElementById('jfAlap').innerHTML = alapJF;
  document.getElementById('alak').style.borderTopRightRadius = alapJF + '%';
}
function jfMinus() {
  var alapJF = document.getElementById('jfAlap').innerHTML;
  alapJF--;
  if (alapJF < 0) alapJF = 0;
  document.getElementById('jfAlap').innerHTML = alapJF;
  document.getElementById('alak').style.borderTopRightRadius = alapJF + '%';
}

/* jobb also sarok */
function jaPlus() {
  var alapJA = document.getElementById('jaAlap').innerHTML;
  alapJA++;
  if (alapJA >= 100) alapJA = 100;
  document.getElementById('jaAlap').innerHTML = alapJA;
  document.getElementById('alak').style.borderBottomRightRadius = alapJA + '%';
}
function jaMinus() {
  var alapJA = document.getElementById('jaAlap').innerHTML;
  alapJA--;
  if (alapJA < 0) alapJA = 0;
  document.getElementById('jaAlap').innerHTML = alapJA;
  document.getElementById('alak').style.borderBottomRightRadius = alapJA + '%';
}

/* bal also sarok */
function baPlus() {
  var alapBA = document.getElementById('balalsoAlap').innerHTML;
  alapBA++;
  if (alapBA >= 100) alapBA = 100;
  document.getElementById('balalsoAlap').innerHTML = alapBA;
  document.getElementById('alak').style.borderBottomLeftRadius = alapBA + '%';
}
function baMinus() {
  var alapBA = document.getElementById('balalsoAlap').innerHTML;
  alapBA--;
  if (alapBA < 0) alapBA = 0;
  document.getElementById('balalsoAlap').innerHTML = alapBA;
  document.getElementById('alak').style.borderBottomLeftRadius = alapBA + '%';
}
