function _(data) { console.log(data); }

let canvas, ctx, 
  windowWidth = window.innerWidth, 
  windowHeight = window.innerHeight - 20,
  lastTime = Date.now(), 
  currentTime = 0,
  delta = 0,
  interval = 1000 / 60;

let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  
window.onload = init;
  
function init() {
  canvas = document.getElementById("canvas");
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  ctx = canvas.getContext("2d");

  requestAnimationFrame(loop);
}

class Stone {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let player = new Snake(4, 0, 0, 20, 20, 10, "#238D43");

// CREATE STONES
let stones = [];
let sWidth = 40;
let sHeight = 40;
let x = Math.floor(Math.random() * (windowWidth - sWidth));
let y = Math.floor(Math.random() * (windowHeight - sHeight));
stones.push(new Stone(x, y, sWidth, sHeight, "#ccc"));
for(let i = 0; i < 5; i++) {
  let nx = Math.floor(Math.random() * (windowWidth - sWidth));
  let ny = Math.floor(Math.random() * (windowHeight - sHeight));
  if(nx > x + sWidth || nx < x &&
      ny > y + sHeight || ny < y) {
      x = nx;
      y = ny;
      stones.push(new Stone(nx, ny, sWidth, sHeight, "#ccc"));
    } 
}

let mice = [];
for(let i = 0; i < 5; i++) {
  let nx = Math.floor(Math.random() * (windowWidth - sWidth));
  let ny = Math.floor(Math.random() * (windowHeight - sHeight));
  if(nx > x + sWidth || nx < x &&
      ny > y + sHeight || ny < y) {
      x = nx;
      y = ny;
      mice.push(new Mouse(3, nx, ny, 20, 20, 5, "#333"));
    } 
}

function loop() {
  requestAnimationFrame(loop);
  
  currentTime = Date.now();
  delta = currentTime - lastTime;
  if(delta > interval) {
    draw();
  }
  lastTime = currentTime - (delta % interval);
}

function draw() {
  ctx.clearRect(0, 0, windowWidth, windowHeight);

  player.draw();

  for(let i = 0; i < mice.length; i++) {
    mice[i].makeMove();
    mice[i].draw();
  }

  for(let i = 0; i < stones.length; i++) {
    stones[i].draw();
  }
}

document.addEventListener("keydown", (e) => {
  if(e.code === "ArrowUp" && player.dir !== 2) player.dir = 0;
  else if(e.code === "ArrowRight" && player.dir !== 3) player.dir = 1;
  else if(e.code === "ArrowDown" && player.dir !== 0) player.dir = 2;
  else if(e.code === "ArrowLeft" && player.dir !== 1  ) player.dir = 3;
  // else if(e.code === "Space") {
  //   player.size += 1;
  // }
});

