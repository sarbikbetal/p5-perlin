/// <reference path="node_modules/@types/p5/global.d.ts" />

let xShift = 0.01;
let flying = 0;

const docWidth = document.body.clientWidth - 600;
const docHeight = document.body.clientHeight - 200;

document.getElementById("dsty").addEventListener("input", (ev) => {
  xShift = parseFloat(ev.target.value);
});

function setup() {
  createCanvas(docWidth, docHeight);
}

function draw() {
  flying -= 0.05;
  let yoff = flying;

  for (let y = 0; y < docHeight; y++) {
    let xoff = 0;
    for (let x = 0; x < docWidth; x++) {
      set(x, y, color(135, 206, 235, map(noise(xoff, yoff), 0, 1, 0, 255)));
      xoff += xShift;
    }
    yoff += xShift;
  }
  updatePixels();
}
