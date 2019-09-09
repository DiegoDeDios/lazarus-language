

function setup() {
  
    var can=createCanvas(1280,200);
    can.parent("sketch-div")
  }
var param;
function draw() {
    if(param=="cuadrado"){
      fill(120);
      rect(90,55,40,40);
      param="";
    }
    if(param=="circulo"){
      fill(120);
      ellipse(320,60,90,90);
      param="";
    }
    if(param=="triangulo"){
      fill(120);
      triangle(620,100,670,30,720,100);
      param=""
    }
    if(param=="estrella"){
      fill(120);
      star(800, 100, 30, 70, 5);
      param="";
    }

  }

function limpiar(){
  clear();
}


function exec(){
  var tmp=document.getElementById("exampleFormControlTextarea1").value;
  param=tmp;
}

//star function
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

