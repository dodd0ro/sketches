var field;
var rope;

var step = 0.01;
var speed = 0.05;
var iter = 2;

var cell_size = 10;
var doRenderField = false;
var pause = false;

function setup() {
	createCanvas(400, 400);
	field = new Field(step, speed, cell_size);
	rope = new Rope(1000, 2, iter, 1000);
}

function draw() {
	background(255);

	if (doRenderField) {
		renderField(field, 20, iter);
	}
	info();

	rope.tick(field);
	rope.render();
}

function mouseWheel(event) {
	if (event.delta<0){
		field.addStep(-0.001);
	}else if (event.delta>0){
		field.addStep(0.001);
	} 
}

function mouseDragged() {
	field.move(pmouseX - mouseX, pmouseY - mouseY);
}

function keyPressed() {
	if (keyCode == 17) {
		doRenderField = !doRenderField;
	} else if (keyCode == 32) {
		if (pause == false) {
			noLoop();
		} else {
			loop();
		}
		pause = !pause;
	} else if (keyCode == 16) {
		rope.plot.clear();
	}
}

function info() {
	fill(0);
	text('fps: ' + int(frameRate()), 10, 10);
	text('step: ' + field.step.toFixed(3), 10, 25);
	text('speed: ' + field.speed, 10, 40);
	text('pause ' + pause, 10, 55);
}


