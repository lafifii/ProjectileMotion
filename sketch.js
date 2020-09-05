var p;
var v0 = 60;
var angulo = 45;
var rad = 0.02;
var w = window.innerWidth - 30;
var h = window.innerHeight - 30;

var buttonAng, buttonRad, buttonStart;

window.onresize = function() {
  w = window.innerWidth - 30;
  h = window.innerHeight - 30;
  resizeCanvas(w, h);
}

function preload(){
  buttonAng = new Option(['Cambiar Angulo'],1,45)
  buttonAng.button.mousePressed(changeAng)

  buttonRad = new Option(['Cambiar Radio'], 1 , 0.02)
  buttonRad.button.mousePressed(changeRad)

  buttonStart = new Option(['Iniciar', 'Reiniciar'], 0)
  buttonStart.button.mousePressed(start_animation)
}

function valid(input_val){
  if(input_val == "" || isNaN(input_val)) return 0;
  return 1;
}

function changeAng(){
  if(valid(buttonAng.inputs[0]) != 0)
    angulo = parseInt(buttonAng.inputs[0])
}

function changeRad(){
  if(valid(buttonRad.inputs[0]) != 0)
    rad = parseInt(buttonRad.inputs[0])
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

  printInfo()

}

function printInfo(){
  noStroke()
  fill('white')
  textSize(15)
  var txt
  txt = "Velocidad Inicial: " + v0
  text(txt, w - textWidth(txt) - 10 , 25)

  txt = "Angulo: " + angulo
  text("Angulo: " + angulo, w - textWidth(txt) - 10 , 45)

  txt = "Radio: " + rad
  text("Radio: " + rad, w - textWidth(txt) - 10 , 65)
}
function start_animation(){
  buttonStart.change_text()
  p.calculate(v0);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    p.addStart(-10);
  } else if (keyCode === DOWN_ARROW) {
    p.addStart(+10);
  }
  else if(key == '+'){
    v0++;
  }
  else if(key == '-'){
    v0--;
  }
}
