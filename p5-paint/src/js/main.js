import p5 from 'p5'

let sketch = function (p) {
  let paint = false;

  let col = {
    r: 0,
    g: 0,
    b: 0
  };

  p.setup = function () {
    let canvasDiv = document.getElementById("test");
    let width = canvasDiv.offsetWidth - 50;

    let myCanvas = p.createCanvas(width, width * 0.5625);
    myCanvas.parent('test');
    p.background(255);
  };

  p.draw = function () {
    if (paint) {
      p.noStroke();
      p.fill(col.r, col.g, col.b);
      p.ellipse(p.mouseX, p.mouseY, 20, 20);
    }
  };

  p.touchStarted = function () {
    col.r = p.random(0, 255);
    col.g = p.random(0, 255);
    col.b = p.random(0, 255);
    paint = true;
  };

  p.touchEnded = function () {
    paint = false;
  };
};

new p5(sketch);

document.getElementById('download').addEventListener('click', function () {
  let downcanvas = document.getElementById("defaultCanvas0");
  downloadURI(downcanvas.toDataURL("image/png"), "test.png");
});

function downloadURI(uri, name) {
  let link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
