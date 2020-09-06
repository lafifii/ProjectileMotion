
function Clickable(txt){
  this.state = 0
  this.txt = txt
  this.x = w - 130
  this.w = 120
  this.y = 20
  this.h = 40

  this.draw = function(){
    noStroke()
    fill(255,0,0,100)
    rect(this.x, this.y, this.w, this.h)
    fill('white')
    textSize(20)
    text(this.txt[this.state], (this.x + this.w/2) - textWidth(this.txt[this.state])/2, this.y + this.h/1.5)
  }

  this.resize = function(){
    this.x = w - 130
  }

  this.over = function(){
    return (Math.abs(this.x + this.w/2 - mouseX) <= this.w && Math.abs(this.y + this.h/2 - mouseY) <= this.h)
  }

  this.click = function(){
    var ok = this.over()
    if(ok) this.state = (this.state+1)%this.txt.length
    return ok
  }
}
