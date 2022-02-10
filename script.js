let startHead = document.querySelector(".lol")
let activeKey = "ArrowDown";

let arrowUp = "ArrowUp";
let arrowDown = "ArrowDown";
let arrowLeft = "ArrowLeft";
let arrowRight = "ArrowRight";

document.addEventListener("keydown", swapDir)

let width = Math.ceil(document.documentElement.clientWidth / 50) - 1;
let height = Math.ceil(document.documentElement.clientHeight / 50) - 1;
let eats = []

let field = []

for (let i = 0; i < height; i++) {
    field.push([])
    for (let j = 0; j < width; j++) {
        field[i].push(0)
    }
}

startHead.posX = Math.ceil(width / 2);
startHead.posY = Math.ceil(height / 2);
field[startHead.posY][startHead.posX] = startHead;


function showPart(y, x, div) {
   div.style.top = y * 50 + "px";
   div.style.left = x * 50 + "px";
}

showPart(Math.ceil(height / 2), Math.ceil(width / 2), startHead)
let snake = [[startHead.posY, startHead.posX]]


function swapDir() {
    if (!(event.code === arrowUp || event.code === arrowDown || event.code === arrowLeft || event.code === arrowRight)) return;
    if (activeKey === arrowUp && event.code === arrowDown ||
        activeKey === arrowDown && event.code === arrowUp ||
        activeKey === arrowLeft && event.code === arrowRight ||
        activeKey === arrowRight && event.code === arrowLeft) return;
    activeKey = event.code;
}

function move() {
    addElement();
    field[snake[snake.length - 1][0]][snake[snake.length - 1][1]].remove();
    field[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = 0;
    snake.pop();
}
function addElement() {
    let div = document.createElement("div");
    div.className = "lol2";
    document.body.append(div);
    let [y, x] = snake[0];
    switch (activeKey) {
        case arrowUp:
            y = y - 1 === -1 ? height - 1 : y - 1;
            break;
        case arrowDown:
            y = (y + 1 == height) ? 0 : y + 1;
            break;
        case arrowRight:
            x = (x + 1 == width) ? 0 : x + 1;
            break;
        case arrowLeft:
            x = (x - 1 == -1) ? width - 1 : x - 1;
            break;
    }
    let head = [y, x]
    snake.unshift(head)
    showPart(head[0], head[1], div);
    isError(head);
    takeEat();
    field[head[0]][head[1]] = div;
}
function isError(head) {
    if (field[head[0]][head[1]] !== 0 && field[head[0]][head[1]].className === "lol2") {
        alert("Ты слился...")
        clearInterval(a)
        clearInterval(b)
        document.body.remove()
    }
}
function takeEat() {
    let head = snake[0];
    if (field[head[0]][head[1]] !== 0 && field[head[0]][head[1]].className === "eat") {
        addElement();
        field[head[0]][head[1]].remove();
        field[head[0]][head[1]] = 0;
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function addEat() {
    let div = document.createElement("div");
    div.className = "eat";
    div.append(document.createElement("div"))
    document.body.append(div);
    let x;
    let y;
    do {
        x = getRandomInt(width - 1)
        y = getRandomInt(height - 1)
    } while (field[y][x] !== 0)
    showPart(y, x, div)
    field[y][x] = div;
}
let b = setInterval(addEat, 2000)

let a = setInterval((event) => move(), 50)

