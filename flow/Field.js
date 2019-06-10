function Field(step,speed) {
    this.last = null
    
    this.step = step || 0.01 // шаг шума, шумность
    this.speed = speed || 0.01 // множитель шага на каждом тике, скорость

    this.xoff = 0
    this.yoff = 0
    this.zoff = 0

    this.center = {x:width/2,y:height/2}
    
    /////////////////////////////////////

    this.get = function(x,y,vect, i_zoff,i_xoff,i_yoff) {
      vect = vect||false

      zoff = (this.speed*this.step)*i_zoff ||this.zoff
      xoff = (this.speed*this.step)*i_xoff ||this.xoff
      yoff = (this.speed*this.step)*i_yoff ||this.yoff
      
      let cx = this.center.x * (1 - this.step) 
      let cy = this.center.y * (1 - this.step)

      x = xoff + this.step*x + cx
      y = yoff + this.step*y + cy
      this.last  = noise(x,y,zoff)
      
      if (vect == true){

        let k = 1, val = map(this.last,0,1,0,k)
        return p5.Vector.fromAngle(TWO_PI*val)
        
      }else{
        return this.last
      }
    }

    //////////////////////////

    this.tick = function(do_zoff, do_xoff, do_yoff){
        do_zoff = do_zoff||true
        do_xoff = do_zoff||false
        do_yoff = do_zoff||false

        let tick_step = this.speed*this.step
        if (do_xoff){this.xoff += tick_step}
        if (do_yoff){this.yoff += tick_step}
        if (do_zoff){this.zoff += tick_step}
    }

    ////////////////////////////

    this.addStep = function(val){
      if (this.step + val > 0) this.step += val;
    }

    this.move = function(x, y){
      this.xoff += x * this.step
      this.yoff += y * this.step
    }
}

function renderField(field, cell_size,iters){
  iters = iters||1
  var cell_size = cell_size||50

  for (let x = 0; x < width; x += cell_size){
    for (let y = 0; y < height; y += cell_size){
      
      let v = field.get(x,y,true,frameCount*iters)
      let vMag = map(v.mag(),0,1,0,1.2)
      
      push();

      translate(x,y);
      rotate(v.heading());
      
      noStroke()
      fill(0)

      triangle(0, cell_size/6, 0, -cell_size/6, vMag*(cell_size/2), 0)
      
      pop();
    }
  }
}   
