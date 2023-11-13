const konti = document.querySelector('.container');


//kor gyarto funkcio
function makeCircle() {
    let circle = document.createElement('div');
    circle.classList.add('kor');
    konti.appendChild(circle);
}
   

setInterval(() => {

    makeCircle();

}, 750);

