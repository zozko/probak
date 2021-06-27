const elem = document.getElementsByTagName('body')[0];

function scroller() {
    // console.log('Y: ' + window.scrollY);
    // console.log('offset: ' + window.pageYOffset);
    // console.log('screenY: ' + window.screenY + '#');
    // console.log(window.pageX, window.pageY);
    console.log(elem.getBoundingClientRect());
}


const gorgeteshez = elem.addEventListener('click', (evt) => {
    //client = lathato ablak pontjai
    console.log('client ' + evt.clientX + ' : ' + evt.clientY);
    //offset = az adott elem pontjai
    console.log('offet ' + evt.offsetX, evt.offsetY);
    //page = az egesz html oldal pontjai
    console.log('page ' + evt.pageX, evt.pageY);
    console.log(elem.getBoundingClientRect().y);
});