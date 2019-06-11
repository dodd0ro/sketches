var notes = [ 60, 64, 67, 72, 76, 79, 84, 88, 91, 96 ];
var notes2 = [ 62, 67, 67, 74, 77, 81, 83, 86, 89, 94 ];

var pic_border = 0.01;
var w_hole;
var holes;

var curMousePressed = null;
var pressCount = 0;

//=============================================================================

function setup() {
	createCanvas(600, 150);
	w_hole = width * (1 - pic_border * 2) / notes.length;
	holes = new Holes();
  initGui();
}

function draw() {
	holes.tick();
}

function mousePressed() {
	pressCount++;
	curMousePressed = mouseButton;
}

function mouseReleased() {
	pressCount--;
	if (!pressCount) {
		curMousePressed = null;
	}
}

document.oncontextmenu = function(e) {
	e.preventDefault();
	e.stopPropagation();
};

//=============================================================================

var Hole = function(i) {
	this.i = i;
	this.isActive = false;
	this.score = 0;

	this.osc = new p5.Oscillator();
	this.osc.setType('square');
	this.osc.freq(pitch(notes[this.i]));
	this.osc.amp(0);
	// this.osc.start();

	this.osc2 = new p5.Oscillator();
	this.osc2.setType('square');
	this.osc2.freq(pitch(notes2[this.i]));
	this.osc2.amp(0);
	this.osc2.start();

	this.tick = function() {
		// play
		var score1 = 0,
			score2 = 0;
		if (curMousePressed == LEFT) {
			var score1 = this.score;
			if (!this.osc.started) this.osc.start();
		} else if (curMousePressed == RIGHT) {
			var score2 = this.score;
			if (!this.osc2.started) this.osc.start();
		}
		this.osc.amp(map(score1, 0, 1, 0, 0.1));
		this.osc2.amp(map(score2, 0, 1, 0, 0.1));

		// draw
		var hcolor = map(this.score, 0, 1, 255, 0);
		push();
		stroke(128, 128, 128);
		translate(width * pic_border + w_hole * i + w_hole / 2, height / 2);
		rectMode(CENTER);
		if (mouseIsPressed != true) {
			fill(map(hcolor, 0, 255, 100, 255));
		} else {
			fill(hcolor);
		}
		rect(0, 0, w_hole, height * 0.99);
		fill(0);
		stroke(0);
		textAlign(CENTER);
		text(this.i + 1, 0, 0);
		pop();
	};
};

var Holes = function() {
	this.container = [];
	for (let i = 0; i < notes.length; i++) {
		this.container.push(new Hole(i));
	}

	this.tick = function() {
		var posX = mouseX - width * pic_border;
		if (0 <= posX && posX <= width * (1 - pic_border * 2)) {
			var c = (posX - w_hole / 2) / w_hole;
			c = map(c, 0, 10, 0, 1);
		} else {
			c = 1000;
		}

		for (let i = 0; i < notes.length; i++) {
			var k = 20;
			var w = map(mouseY, 0, height, 1 / 15, 1 / 7) * k;
			var x = map(i, 0, 10, 0, 1);

			var g = exp(-pow(x - c, 2) / (2 * pow(w, 2) / 100));
			var e = pow(exp(-(abs(x - c) ** w)), k);
			this.container[i].score = e * g;
			this.container[i].tick();
		}
	};
};

//=============================================================================

function pitch(i) {
	var l = 4;
	return l * pow(2, i / 12);
}

function gaus(x, c, w) {s
	var g = exp(-pow(x - c, 2) / (2 * pow(w, 2)));
	return g;
}

//=============================================================================

var QS_WIDTH = 300;
var QS_GAP = 10;
var CANVAS_MAX_SCALE = 1;
var CANVAS_MIN_SCALE = 0.5;

var _maxWidth, _maxHeight, _minWidth, _minHeight, _canvasRatio;

function initGui() {
  var gui = QuickSettings
    .create(0, 0, 'Digimonica')
    .setDraggable(false)
    .addHTML('Что это', 'Виртуальная до-мажорная губная гормоника.')
    .addHTML('Управление', '<li>ЛКМ - выдох</li><li>ПКМ - вдох</li><li>Горизонтальная ось - высота ноты</li><li>Вертикальная ось - количество нот</li>')
  var defaultValues = gui.getValuesAsJSON();
}

window.addEventListener('load', function() {
  var canvas = document.getElementsByTagName('canvas')[0];
  _minWidth = canvas.offsetWidth * CANVAS_MIN_SCALE;
  _maxWidth = canvas.offsetWidth * CANVAS_MAX_SCALE;
  _minHeight = canvas.offsetHeight * CANVAS_MIN_SCALE;
  _maxHeight = canvas.offsetHeight * CANVAS_MAX_SCALE;
  _canvasRatio = canvas.offsetWidth / canvas.offsetHeight;
  resetQSStyle();
  fitCanvas();
});

window.addEventListener('resize', function() {
  fitCanvas();
});

function fitCanvas() {
  var size;
  var canvas = document.getElementsByTagName('canvas')[0];
  var qs_main = document.getElementsByClassName('qs_main')[0];
  
  var w = document.body.offsetWidth - qs_main.offsetWidth - QS_GAP * 2;
  var h = document.body.offsetHeight - QS_GAP * 2;
  w = Math.max(Math.min(w, _maxWidth), _minWidth);
  h = Math.max(Math.min(h, _maxHeight), _minHeight);
  
  var dw = w - canvas.offsetWidth;
  var dh = h - canvas.offsetHeight;
  if (dw < dh) {
    canvas.style.height = w / _canvasRatio  + 'px';
    canvas.style.width = w + 'px';
  } else {
    canvas.style.height = h + 'px';
    canvas.style.width = h * _canvasRatio  + 'px';
  }
}

function resetQSStyle() {
  var qs_main = document.getElementsByClassName('qs_main')[0];
  qs_main.style.position = 'static';
  qs_main.style.minWidth = QS_WIDTH + 'px';
  qs_main.style.width = QS_WIDTH + 'px';
  qs_main.style.maxWidth = QS_WIDTH + 'px';
  qs_main.style.height = '100%';
}

