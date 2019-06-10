var xOffset = 0;       
var yOffset = 0;       
var offsetInc = 0.00010;  //meiat  0.001
var inc = 0.6//meiat 5 !!!! detali
var _s = 6;  //////////!!!!     podviznost      
var m = 1.025;  ///dlina       
var c
var _c
var min_n = 150;
var smth = 0;
var smth2 = 50;

var a_mouseX = 250
var a_mouseY = 250


function setup() {
  createCanvas(500, 500);
  frameRate(20)
  pixelDensity(0.9)
  noFill();
  
}

function draw() {
  

  clear()
  background(0);
  

  blendMode(ADD);
  translate(width * 0.5, height * 0.5);
  var nTval = smth2*(1-(m-1))*_s

  
    
    for (var nTimes = 0; nTimes <nTval; nTimes++) { //180
      xOffset += offsetInc;
      yOffset += offsetInc;


      var s = _s*nTval/pow(m,nTimes) //////////////
      var nxOffset = xOffset+nTimes*0.015
      var nyOffset = yOffset+nTimes*0.015


      colorMode(HSB, 255);
      var r = sin(((1.0/255)*(nTval-nTimes))*TWO_PI)
      var g = sin(((1.0/255)*(nTval-nTimes))*PI)
      var b = sin(((1.0/255)*(nTval-nTimes))*TWO_PI)
      var a = abs(sin(((10/255)*(nTval-nTimes))*PI)+1)
      r = map(r, 0,1,190,200)
      g = map(g, 0,1,0,255)
      b = map(b, 0,1,220,255)
      a = map(a, 0,9,10,150)
      c = color(r,255,b,a)
      // c = color(255,255,255,50)
      
      stroke(c);
      nPoints = int(2 * PI * s);
      nPoints = min(nPoints, min_n);

      curveTightness(smth);
      beginShape();

      for (var i = 0; i < nPoints; i+=3) {
        
        var a = i / (nPoints) * TAU;
        var p = p5.Vector.fromAngle(a);
        var n = noise(nxOffset + p.x * inc, nyOffset + p.y * inc) * s; ////////////
        p.mult(n);

        var mv = createVector(-width * 0.5+a_mouseX,-height * 0.5+a_mouseY)
        var mx = p.x-mv.x

        var k =pow(1-nTimes/nTval,2)*500 /////////////
        var e = pow(-dist(mv.x, mv.y, p.x, p.y)/height,1)*k
        //var k2 = pow(nTimes/nTval,2)*500
        //var e2 = exp(-dist(mv.x, mv.y, p.x, p.y)*(1/k2))*k2
        //var e2 = pow(-dist(mv.x, mv.y, p.x, p.y)*(1/k2),1)*k2
        //e = (e+e2*0.5)/1.5
        var mx = p.x-mv.x
        var my = p.y-mv.y
        var mv = createVector(mx,my)
        mv.normalize().mult(e)

        p.add(mv)

        curveVertex(p.x, p.y);
        if (i==0){curveVertex(p.x, p.y);}

        
      }
      endShape(CLOSE);




    }

}

function mouseDragged() {
  if(mouseX<width && mouseX>0 && mouseY<height && mouseY>0){
  a_mouseX = a_mouseX + mouseX-pmouseX
  a_mouseY = a_mouseY + mouseY- pmouseY
  }
}

