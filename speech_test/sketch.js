var myRec; 

var x, y;
var dx, dy;
var lastCommand = '';
var speed = 1;


function setup() {
    var canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');
	background(255, 255, 255);
	fill(0, 0, 0, 255);
	x = width / 2;
	y = height / 2;
	dx = 0;
	dy = 0;

	textSize(20);
	textAlign(LEFT);
    myRec = new p5.SpeechRec();
    myRec.continuous = true; 
    myRec.interimResults = true;
	myRec.onResult = parseResult; // recognition callback
	myRec.start(); // start engine
}

function draw() {
	ellipse(x, y, 5, 5);
	x += dx * speed;
	y += dy * speed;
	if (x < 0) x = width;
	if (y < 0) y = height;
	if (x > width) x = 0;
	if (y > height) y = 0;
}

function parseResult() {
    var mostrecentword = myRec.resultString.split(' ').pop();
    lastCommand = mostrecentword;
    document.getElementById('command').innerHTML = '> ' + lastCommand; 
	console.log('>', myRec.resultString, '|', mostrecentword);
    if (mostrecentword.indexOf('лево') !== -1) {
        dx = -1;
        dy = 0;
    } else if (mostrecentword.indexOf('право') !== -1) {
        dx = 1;
        dy = 0;
    } else if (mostrecentword.indexOf('верх') !== -1) {
        dx = 0;
        dy = -1;
    } else if (mostrecentword.indexOf('низ') !== -1) {
        dx = 0;
        dy = 1;
    } else if (mostrecentword.indexOf('очистить') !== -1) {
        background(255);
    } else if (mostrecentword.indexOf('быстрее') !== -1) {
        speed++;
    } else if (mostrecentword.indexOf('медленнее') !== -1) {
        speed--;
    } else if (mostrecentword.indexOf('стоп') !== -1) {
        speed = 0;
    }
}
