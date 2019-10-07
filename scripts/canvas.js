var canvas;

function setup () {
    canvas = new Canvas(document.getElementById("canvasArea"));
}

function draw() {
    background(255, 255, 255);
    canvas.draw();
    canvas.boundFigures();
}

function windowResized() {
    canvas.resize();
}

function mousePressed() {
    canvas.mousePressed();
}

function mouseReleased() {
    canvas.mouseReleased();
}