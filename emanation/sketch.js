var xOffset = 0;       
var yOffset = 0;       
var offsetInc = 0.001;  //meiat  0.001
var inc = 4//meiat 5
var _s = 10;             
var m = 1.03;         
var c
var _c


function setup() {
  createCanvas(1000, 1000);
  //frameRate(20)
  pixelDensity(1)
  noFill();
  
  
  //stroke(255, 20, 147, 128);
}

function draw() {
  
  clear()
  background(0);
  blendMode(ADD);
  translate(width * 0.5, height * 0.5);
  var s = _s
    var nTval = 180
    for (var nTimes = 0; nTimes < nTval; nTimes++) { //180
      colorMode(HSB, 255);
      var r = sin(((1.0/255)*nTimes)*TWO_PI)
      var g = sin(((1.0/255)*nTimes)*PI)
      var b = sin(((1.0/255)*nTimes)*PI)
      var a = abs(sin(((10/255)*nTimes)*TAU)+1)
      r = map(r, 0,1,200,255)
      g = map(g, 0,1,0,255)
      b = map(b, 0,1,200,255)
      a = map(a, 0,9,20,100)
      c = color(r,255,255,a)
      //c = color(255,255,255,100)
      
      stroke(c);
      nPoints = int(2 * PI * s);
      nPoints = min(nPoints, 200);

      curveTightness(-1);
      beginShape();

      for (var i = 0; i < nPoints; i+=3) {
        
        var a = i / (nPoints) * TAU;
        var p = p5.Vector.fromAngle(a);
        var n = noise(xOffset*nTimes*0.001 + p.x * inc, yOffset*nTimes*0.001 + p.y * inc) * s;
        p.mult(n);

        var mv = createVector(-width * 0.5+mouseX,-height * 0.5+mouseY)
        var k =pow(nTimes/nTval,5)*400
        var mx = p.x-mv.x
        var e = pow(-dist(mv.x, mv.y, p.x, p.y)/height,1)*k
        //var e = exp(-dist(mv.x, mv.y, p.x, p.y)*(1/k))*k
        var mx = p.x-mv.x
        var my = p.y-mv.y
        var mv = createVector(mx,my)
        mv.normalize().mult(e)

        p.add(mv)

        curveVertex(p.x, p.y);
        if (i==0){curveVertex(p.x, p.y);}

        
      }
      endShape(CLOSE);

      xOffset += offsetInc;
      yOffset += offsetInc;

      s *= m;
    }

}