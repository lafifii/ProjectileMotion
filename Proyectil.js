const pi = Math.acos(-1);
const g = 9.81;

function Proyectil(){

  this.m = 0.200
  this.rad = 0.2
  this.rho = 1.20
  this.cd = 0.500
  this.k = 0.5 * this.cd * this.rho * (pi * this.rad * this.rad)

  this.ts = [0.00]
  this.x = [0]
  this.y = [0]

  this.x2 = [0]
  this.y2 = [0]
  this.ts2 = [0]

  this.animate = -1;

  this.old_min_x = 0;
  this.old_max_x = 0;
  this.old_min_y = 0;
  this.old_max_y = 0;

  this.dummy_y = 0;

  this.scale_xy = function(xx, yy){
    var new_min_x = w/20;
    var new_max_x = w - w/20;

    var new_min_y = h/10;
    var new_max_y = h - h/10;

    var nx = (new_max_x - new_min_x) / (this.old_max_x - this.old_min_x) * (xx - this.old_min_x) + new_min_x;
    var ny = (new_max_y - new_min_y) / (this.old_max_y - this.old_min_y) * (yy - this.old_min_y) + new_min_y;

    return [nx, ny];
  }

  this.rescale_y = function(ny){
    var new_min_y = h/10;
    var new_max_y = h - h/10;
    return ( (ny - new_min_y)*(this.old_max_y - this.old_min_y)/(new_max_y - new_min_y) ) + this.old_min_y ;
  }

  this.draw = function(){

    stroke('white')
    fill('white')
    textSize(20)
    text("Movimiento Proyectil", 30 , 30)

    var xy;
    noStroke();

    fill(255,2555,255,10)
    rect(0, h - h/10, w, h/10)

    if(this.animate >= 0){

      var lim = this.animate >= this.x.length ? this.x.length - 1 : this.animate;
      for(var i = 0; i < lim; i+=10){
        fill(255,255,255,10);
        xy = this.scale_xy(this.x[i], this.y[i]);
        circle(xy[0], h - xy[1], this.rad*100);
      }

      fill('cyan')
      xy = this.scale_xy(this.x[lim], this.y[lim])
      circle(xy[0], h - xy[1], this.rad*100)


      lim = this.animate >= this.x2.length ? this.x2.length - 1 : this.animate;
      for(var i = 0; i < lim; i+=10){
        fill(255,255,255,10);
        var xy = this.scale_xy(this.x2[i], this.y2[i]);
        circle(xy[0], h - xy[1], this.rad*100);
      }

      fill('magenta')
      xy = this.scale_xy(this.x2[lim], this.y2[lim])
      circle(xy[0], h - xy[1], this.rad*100)

      this.animate+=10;

    }
    else {
      fill('magenta')
      circle(w/20, h - h/10 + this.dummy_y, this.rad*100)
    }
  }

  this.calculate = function(){
    if(this.animate >= 0){
      this.animate = -1
      this.dummy_y =  0
      return;
    }
    var angle = 45 * pi / 180.0
    var v0 = 60
    this.calculate_air(angle, v0)
    this.calculate_no_air(angle, v0)
    this.animate = 0;
  }

  this.calculate_air = function(angle, v0){

     this.ts = [0.00]
     this.x = [0]
     this.y = [0]


     var vx = [v0 * Math.cos(angle)]
     var vy = [v0 * Math.sin(angle)]
     var ax = [-(this.k/this.m) * 60.0 * vx[0]]
     var ay = [-g - ((this.k/this.m) * 60.0 * vy[0])]

     var i = 0;
     var delta = 0.01;

     while(this.y[i] >= 0.0){

        var vel = Math.sqrt((vx[i] * vx[i]) + (vy[i] * vy[i]));

      	ax.push(-(this.k/this.m) * vel * vx[i])
      	ay.push(-g - ((this.k/this.m) * vel * vy[i]))

        var new_vx = vx[i] + (ax[i+1] * delta)
      	var new_vy = vy[i] + (ay[i+1] * delta)
      	var new_x = this.x[i] + (vx[i] * delta) + (0.5 * ax[i+1] * (delta * delta))
      	var new_y = this.y[i] + (vy[i] * delta) + (0.5 * ay[i+1] * (delta * delta))

        vx.push(new_vx)
      	vy.push(new_vy)
        this.ts.push(this.ts[i] + delta)
      	this.x.push(new_x)
      	this.y.push(new_y)
        i++;

        if(this.old_min_x > this.x[i]) this.old_min_x = this.x[i];
        if(this.old_max_x < this.x[i]) this.old_max_x = this.x[i];
        if(this.old_min_y > this.y[i]) this.old_min_y = this.y[i];
        if(this.old_max_y < this.y[i]) this.old_max_y = this.y[i];

    }
  }

  this.calculate_no_air = function(angle, v0){

     this.x2 = [0]
     this.y2 = [0]
     this.ts2 = [0]


     var i = 0;
     var delta = 0.01;
     var vx2 = [v0 * Math.cos(angle)]
     var vy2 = [v0 * Math.sin(angle)]

     while(this.y2[i] >= 0.0){
        var new_vx = vx2[i]
        var new_vy = vy2[i] + (-g * delta)
        var new_x = this.x2[i] + (vx2[i] * delta) + (0.5 * 0 * (delta * delta))
        var new_y = this.y2[i] + (vy2[i] * delta) + (0.5 * (-g) * (delta * delta))

        vx2.push(new_vx)
        vy2.push(new_vy)
        this.ts2.push(this.ts2[i] + delta)
        this.x2.push(new_x)
        this.y2.push(new_y)

        if(this.old_min_x > this.x2[i]) this.old_min_x = this.x2[i];
        if(this.old_max_x < this.x2[i]) this.old_max_x = this.x2[i];
        if(this.old_min_y > this.y2[i]) this.old_min_y = this.y2[i];
        if(this.old_max_y < this.y2[i]) this.old_max_y = this.y2[i];

        i++;
    }
  }

  this.addStart = function(dd){
    if(this.animate < 0){
      this.dummy_y+= dd;
    }
  }
}
