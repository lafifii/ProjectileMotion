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


      var lim2 = this.animate >= this.x2.length ? this.x2.length - 1 : this.animate;
      for(var i = 0; i < lim2; i+=10){
        fill(255,255,255,10);
        var xy = this.scale_xy(this.x2[i], this.y2[i]);
        circle(xy[0], h - xy[1], this.rad*100);
      }

      this.draw_velocity(lim,lim2)
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


     this.vx = [v0 * Math.cos(angle)]
     this.vy = [v0 * Math.sin(angle)]
     var ax = [-(this.k/this.m) * 60.0 * this.vx[0]]
     var ay = [-g - ((this.k/this.m) * 60.0 * this.vy[0])]

     var i = 0;
     var delta = 0.01;

     while(this.y[i] >= 0.0){

        var vel = Math.sqrt((this.vx[i] * this.vx[i]) + (this.vy[i] * this.vy[i]));

      	ax.push(-(this.k/this.m) * vel * this.vx[i])
      	ay.push(-g - ((this.k/this.m) * vel * this.vy[i]))

        var new_vx = this.vx[i] + (ax[i+1] * delta)
      	var new_vy = this.vy[i] + (ay[i+1] * delta)
      	var new_x = this.x[i] + (this.vx[i] * delta) + (0.5 * ax[i+1] * (delta * delta))
      	var new_y = this.y[i] + (this.vy[i] * delta) + (0.5 * ay[i+1] * (delta * delta))

        this.vx.push(new_vx)
      	this.vy.push(new_vy)
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
     this.vx2 = [v0 * Math.cos(angle)]
     this.vy2 = [v0 * Math.sin(angle)]

     while(this.y2[i] >= 0.0){
        var new_vx = this.vx2[i]
        var new_vy = this.vy2[i] + (-g * delta)
        var new_x = this.x2[i] + (this.vx2[i] * delta) + (0.5 * 0 * (delta * delta))
        var new_y = this.y2[i] + (this.vy2[i] * delta) + (0.5 * (-g) * (delta * delta))

        this.vx2.push(new_vx)
        this.vy2.push(new_vy)
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

  this.draw_velocity = function(id1,id2){
    var a_1 = this.scale_xy(this.x[id1], this.y[id1])
    var a_2 = this.scale_xy(this.x2[id2], this.y2[id2])

    // vel_1
    if(this.animate <= id1){
     this.draw_arrow(a_1, [a_1[0] + 45, a_1[1]])
     this.draw_arrow(a_1, [a_1[0], a_1[1] + 45*Math.sign(this.vy[id1]) ])
     this.draw_arrow(a_1, [a_1[0] + 40, a_1[1] + 40*Math.sign(this.vy[id1]) ])
    }

    // vel_2
    if(this.animate <= id2){
     this.draw_arrow(a_2, [a_2[0] + 45, a_2[1]])
     this.draw_arrow(a_2, [a_2[0], a_2[1] + 45*Math.sign(this.vy2[id2]) ])
     this.draw_arrow(a_2, [a_2[0] + 40, a_2[1] + 40*Math.sign(this.vy2[id2]) ])
    }

    fill('cyan')
    circle(a_1[0], h - a_1[1], this.rad*100)
    fill('magenta')
    circle(a_2[0], h - a_2[1], this.rad*100)

  }

  this.draw_arrow = function(a2,b2) {

    a = a2.slice()
    b = b2.slice()

    a[1] = h - a[1]
    b[1] = h - b[1]

    stroke('#2E4057');
    line(a[0], a[1], b[0], b[1])
    push();
    var offset = 10;
    var angle = atan2(a[1] - b[1], a[0] - b[0]);

    translate(b[0], b[1] );
    rotate(angle-HALF_PI);

    fill('#2E4057');
    triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2);
    pop();
    noStroke();
  }

  this.addStart = function(dd){
    if(this.animate < 0){
      this.dummy_y+= dd;
    }
  }
}
