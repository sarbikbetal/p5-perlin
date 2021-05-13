/// <reference path="node_modules/@types/p5/global.d.ts" />

let camera;
let cols, rows;
let scl = 20;
let xShift = 0.1;
let yShift = 0.1;

const docWidth = document.body.clientWidth;
const docHeight = document.body.clientHeight - 100;

let w = 1400;
let h = 1000;

let flying = 0;
let terrain = [];

document.getElementById("xoff").addEventListener("input", (ev) => {
  xShift = parseFloat(ev.target.value);
});
document.getElementById("yoff").addEventListener("input", (ev) => {
  yShift = parseFloat(ev.target.value);
});
document.getElementById("scl").addEventListener("input", (ev) => {
  scl = parseFloat(ev.target.value);
});

function setup() {
  createCanvas(docWidth, docHeight, WEBGL);
  camera = createEasyCam();
  document.oncontextmenu = () => false;

  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  // flying -= 0.1;
  let yoff = flying;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      // xoff += 0.1;
      xoff += xShift;
    }
    // yoff += 0.1;
    yoff += yShift;
  }

  background(255);
  // background(0);
  stroke(120)


  translate(0, 50);
  rotateX(PI / 3);
  fill(220, 160);

  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      vertex(x * scl, y * scl, terrain[x][y]);
      // fill(map(terrain[x][y], -100, 100, 0, 255));
    }
    endShape();
  }

  checkPan();
}

function checkPan() {
  if (keyIsDown(LEFT_ARROW)) {
    camera.panX(-scl);
  } else if (keyIsDown(UP_ARROW)) {
    camera.panY(-scl);
  } else if (keyIsDown(RIGHT_ARROW)) {
    camera.panX(scl);
  } else if (keyIsDown(DOWN_ARROW)) {
    camera.panY(scl);
  }
}
