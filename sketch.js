var p;

var w = window.innerWidth;
var h = window.innerHeight;

window.onresize = function() {

  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);

}

function preload(){

}

function setup() {
  createCanvas(w, h);
  p = new Proyectil();
  frameRate(20);
  textFont('Montserrat', 20);
}

function draw() {
  background(0);
  p.draw();


  fill(255,0,0,150);
  rect(w - 130 , 10, 120, 40);
  noStroke();
  fill(255);
  var txt = p.animate >= 0 ? "reiniciar" : "empezar"
  text(txt, w - 130 + 60 - textWidth(txt)/2, 35);

  if( Math.abs(mouseX - w + 130 - 60) <= 60 && Math.abs(mouseY - 30) <= 20) cursor(HAND);
  else cursor(ARROW);
}

function mousePressed(){
  if( Math.abs(mouseX - w + 130 - 60) <= 60  <= 120 && Math.abs(mouseY - 30) <= 20)
    p.calculate();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    p.addStart(-10);
  } else if (keyCode === DOWN_ARROW) {
    p.addStart(+10);
  }
}
