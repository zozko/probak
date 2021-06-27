const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.height = 600;
canvas.style.width = '600px';
canvas.style.height = '600px';
canvas.style.border = '2px solid black';
canvas.style.backgroundColor = '#e1edd3';
//ctx.fillText('hi', 50, 50);


const CELL_SIZE = 30;
const WORLD_WIDTH = Math.floor(canvas.width / CELL_SIZE);
const WORLD_HEIGHT = Math.floor(canvas.height / CELL_SIZE);
let MOVE_INTERVAL = 400;

const FOOD_SPAWN_INTERVAL = 2500;

// ebben az objektumban lesz tarolva, hogy a gomb le van e nyomva vagy nincs
const input = {}

let score = 0;
let catched;

//let id = 0;

const snake = {
    moveElapsed: 0,
    length: 4,
    parts: [{
        x: 0,
        y: 0
    }],
    dir: null,
    newdir: {
        x: 1,
        y: 0
    }
}
let foods = [{
    //id: id,
    x: Math.floor(Math.random() * canvas.width / CELL_SIZE),
    y: Math.floor(Math.random() * canvas.width / CELL_SIZE)
}];
let foodSpawnElapsed = 0;

let lastLoopTime = Date.now();
let x = 0;
let fej = [];
//jatekciklus
function gameLoop() {
    const most = Date.now();
    const eltelt = most - lastLoopTime;
    lastLoopTime = most;
    update(eltelt);
    render();
    window.requestAnimationFrame(gameLoop);
}


gameLoop();


function update(delta) {
    //az iranyitas
    if (input.ArrowLeft && snake.dir.x !== 1) {
        snake.newdir = {
            x: -1,
            y: 0
        }
    } else if (input.ArrowUp && snake.dir.y !== 1) {
        snake.newdir = {
            x: 0,
            y: -1
        }
    } else if (input.ArrowRight && snake.dir.x !== -1) {
        snake.newdir = {
            x: 1,
            y: 0
        }
    } else if (input.ArrowDown && snake.dir.y !== -1) {
        snake.newdir = {
            x: 0,
            y: 1
        }
    } else if (input.s) {
        snake.newdir = {
            x: 0,
            y: 0
        }
    } else if (input[" "]) {
        location.reload();
    }


    snake.moveElapsed += delta;
    // x += (delta * 1 / 16);
    if (snake.moveElapsed > MOVE_INTERVAL) {
        //csak mozgaskor rogzitjuk az iranyt
        snake.dir = snake.newdir;
        snake.moveElapsed -= MOVE_INTERVAL;
        const newSnakePart = {
            x: snake.parts[0].x + snake.dir.x,
            y: snake.parts[0].y + snake.dir.y
        }
        snake.parts.unshift(newSnakePart);

        if (snake.parts.length > snake.length) {
            snake.parts.pop();
        }


        //  snake.parts[0].x++;

    }

    foodSpawnElapsed += delta;
    if (foodSpawnElapsed > FOOD_SPAWN_INTERVAL) {
        //visszaallitjuk az idomerest

        foodSpawnElapsed -= FOOD_SPAWN_INTERVAL;

        foods.push({
            // id: id,
            x: Math.floor(Math.random() * canvas.width / CELL_SIZE),
            y: Math.floor(Math.random() * canvas.height / CELL_SIZE)
        })
    }

}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    catched = foods.find(elem => {
        if (snake.parts[0].x == elem.x && snake.parts[0].y == elem.y) {
            return elem;
        } else {
            return undefined;
        }
    })


    //a bongeszo ujrarajzolo funkcioja
    // ctx.fillText('Hahoy', x, 50);

    // if (snake.parts[0].x < 0 || snake.parts[0].x >= canvas.width / CELL_SIZE || snake.parts[0].y >= canvas.height / CELL_SIZE || snake.parts[0].y < 0) {

    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.fillStyle = 'red';
    //     ctx.font = '60px Arial';
    //     ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    //     gameLoop.exit;
    //     return null;
    // } else {

    // }


    if (catched) {

        foods = foods.filter(elem => elem != catched);
        // {
        // //  console.log('torlendo koordinatai  ' + catched.x + ":" + catched.y);
        // if (catched.x != elem.x && catched.y != elem.y) {
        //     console.log('elem koordinatai  ' + elem.x + ":" + elem.y);
        //     console.error('itt vagyok');
        //     return elem;
        // }
        // });

        score++;
        MOVE_INTERVAL -= 5;
        catched = undefined;
        snake.length++;
    }



    //athaladas a mezon
    if (snake.parts[0].x < 0) {
        snake.parts[0].x = Math.floor(canvas.width / CELL_SIZE) - 1;
    } else if (snake.parts[0].x > Math.floor(canvas.width / CELL_SIZE) - 1) {
        snake.parts[0].x = 0;
    } else if (snake.parts[0].y < 0) {
        snake.parts[0].y = Math.floor(canvas.width / CELL_SIZE) - 1;
    } else if (snake.parts[0].y > Math.floor(canvas.width / CELL_SIZE) - 1) {
        snake.parts[0].y = 0;
    }




    ctx.fillStyle = 'pink';
    foods.forEach(({ x, y }) => {
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    });
    // ctx.fillStyle = 'green'
    // snake.parts.forEach(({ x, y }) => {
    //     ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    // })

    for (let i = 0; i < snake.parts.length; i++) {
        let x = snake.parts[i].x;
        let y = snake.parts[i].y;
        if (i === 0) {
            fej = [{
                x: snake.parts[i].x,
                y: snake.parts[i].y
            }]
            ctx.fillStyle = 'black';
        } else {
            ctx.fillStyle = 'green';
        }


        //ellenorzi hogy magaba harap e
        for (let i = 0; i < snake.parts.length; i++) {
            if (i > 0) {
                // console.table(snake.parts[i], fej[0]);
                if (snake.parts[i].x === fej[0].x && snake.parts[i].y === fej[0].y) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = 'red';
                    ctx.font = '60px Arial';
                    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
                    ctx.fillStyle = 'grey';
                    ctx.font = '20px Arial';
                    ctx.fillText(`Your final core is ${score}`, canvas.width / 2, canvas.height / 2 + 45);
                    ctx.font = '12x Arial';
                    ctx.fillText(`press space to restart the game`, canvas.width / 2, canvas.height / 2 + 65);
                    update();
                };
            }
        }

        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }


    ctx.fillStyle = 'black';
    ctx.textAlign = 'center'
    ctx.fillText('SCORE: ' + score, canvas.width / 2, 30, 100);

    //let teste = snake.parts.shift();
    // let ok = teste.some(fej);
    //console.log(teste);
    if (catched) score++;

}



window.addEventListener('keyup', (event) => {
    input[event.key] = false;
});

window.addEventListener('keydown', (event) => {
    input[event.key] = true;
})