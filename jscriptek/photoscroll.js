let xk, yk;
function mozog() {
  yk = window.scrollY;
  xk = window.scrollX;
  // console.log("x koord = " + xk + "; y koord = " + yk);
  document.getElementById(
    "photo"
  ).style.backgroundPosition = `${-xk}px ${-yk}px`;
}
// Events
window.addEventListener("scroll", mozog);
