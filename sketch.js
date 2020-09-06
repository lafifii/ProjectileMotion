var p;
var w = window.innerWidth;
var h = window.innerHeight;

var sliderAng, sliderRad, sliderV0, buttonStart;


window.onresize = function() {
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
  buttonStart.resize()
}

function preload(){

  buttonStart = new Clickable(['iniciar', 'reiniciar'])

  sliderV0 = createSlider(1,300,60)
  sliderV0.position(20, 40)

  sliderAng = createSlider(0,90,45)
  sliderAng.position(20, 80)

  sliderRad = createSlider(1,100,20)
  sliderRad.position(20, 120)


}

function setup() {
  createCanvas(w, h);
  p = new Proyectil();
  frameRate(20);
  textFont('Montserrat', 20);
}

function draw() {

  background(0);


  p.update(sliderAng.value(), sliderRad.value()/100)
  p.draw()

  printSliders()
  printInfo()

  if(buttonStart.over()) cursor(HAND)
  else cursor(ARROW)

}

function printSliders(){
  noStroke()
  fill('white')
  textSize(15)

  text('v0', sliderV0.x + sliderV0.width/2 - textWidth('v0')/2, sliderV0.y)
  text('angulo', sliderAng.x + sliderAng.width/2 - textWidth('angulo')/2, sliderAng.y)
  text('radio', sliderRad.x + sliderRad.width/2 - textWidth('radio')/2, sliderRad.y)
}

function printInfo(){
  noStroke()

  buttonStart.draw()

  fill('white')
  textSize(15)

  var txt
  txt = "Velocidad Inicial: " + sliderV0.value() + " m/s"
  text(txt, w - textWidth(txt) - 10 , 80)

  txt = "Angulo: " + sliderAng.value() + " °"
  text(txt, w - textWidth(txt) - 10 , 100)

  txt = "Radio: " + sliderRad.value()/100 + " m"
  text(txt, w - textWidth(txt) - 10 , 120)

  txt = "Densidad: " + p.rho + " kg/m^3"
  text(txt, w - textWidth(txt) - 10 , 140)

  txt = "Peso: " + p.cd + " kg"
  text(txt, w - textWidth(txt) - 10 , 160)

  txt = "Altura: " + (-p.dummy_y) + " m"
  text(txt, w - textWidth(txt) - 10 , 180)

}


function mousePressed(){
  if(buttonStart.click()){
    p.calculate(sliderV0.value(), sliderAng.value());
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    p.addStart(-10);
  } else if (keyCode === DOWN_ARROW) {
    p.addStart(+10);
  }
  else if(key == '+'){
    sliderAng.value()++;
  }
  else if(key == '-'){
    sliderAng.value()--;
  }
}
