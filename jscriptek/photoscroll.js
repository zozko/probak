window.onload = function() {
  let xk, yk;
  let kep = document.getElementById("photo");

  function mozog() {
    yk = window.scrollY;
    xk = window.scrollX;
    console.log("x koord = " + xk + "; y koord = " + yk);
    kep.style.backgroundPosition = `${-xk}px ${-yk}px`;
  }

  function kor() {
    kep.style.borderRadius = "50%";
  }

  function nincskor() {
    kep.style.borderRadius = "0%";
  }
  // Events;
  window.addEventListener("scroll", mozog);
  kep.addEventListener("mouseover", kor);
  kep.addEventListener("mouseout", nincskor);
};
