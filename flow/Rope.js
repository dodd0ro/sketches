function Rope(n,scale,iters,life,pathLen){
    this.plot = createGraphics(width, height)
    this.container = []
    this.iters = iters
    this.life = life
    this.scale = scale || 2

    
    for (let i = 0; i < n; i++){
        this.container.push( new Pat(this.life,random(width),random(height)) )
    }

    this.tick = function(field){
        var field = field

        for (index in this.container){
            for (let iter = 0; iter<iters; iter++){
                this.container[index].move(this.scale,frameCount*iters+iter,null,null)
                this.container[index].render(this.plot)
            }
            //rope.plot.clear()
        }
    }

    this.render = function(){
        image(this.plot, 0, 0)
    }
}


function Pat(life,x,y,z){
    x = x || random(width*0.25,width*0.75)
    y = y || random(height*0.25,height*0.75)
    z = z || 0

    this.lifeMax = life || -1
    this.life = life || -1
    var alpha = 4

    this.location = createVector(x,y,z)
    this.plocation = this.location.copy()
    this.blocation = this.location.copy()

    this.move = function(scale,i_zoff,i_xoff,i_yoff){
        this.plocation = this.location.copy()
        this.location.add(
            field.get(this.location.x, this.location.y,true,i_zoff,i_xoff,i_yoff).mult(scale)
        )
        this.checkBorder()
        this.checkLife()
    }

    this.checkBorder = function(){ // условие лучше???
        if(0>this.location.x || this.location.x>width || 0>this.location.y || this.location.y>height){
            this.location.x = (this.location.x%width+width)%width
            this.location.y = (this.location.y%width+width)%width            
            this.plocation = this.location.copy()
        }
    }

    this.checkLife = function(base){
        if (this.life == 0){
            if (base){
                this.location = this.blocation.copy()
            }else{
                this.location.x = random(width)
                this.location.y = random(height)
            }
            this.plocation = this.location.copy()
            this.life = this.lifeMax
            
        }
        this.life-=1
    }

    this.render = function(plot){
        plot.push()
        plot.strokeWeight(1);
        plot.stroke(0,0,0,alpha)
        plot.line(
            this.plocation.x,this.plocation.y,
            this.location.x,this.location.y
        )
        plot.pop()
    }
}

