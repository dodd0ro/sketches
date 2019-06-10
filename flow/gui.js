var QS_WIDTH = 300;
var QS_GAP = 10;
var CANVAS_MAX_SCALE = 1;
var CANVAS_MIN_SCALE = 0.5;

var _maxWidth, _maxHeight, _minWidth, _minHeight, _canvasRatio;

function initGui() {
    var gui = QuickSettings
    .create(0, 0, 'Settings')
    .setDraggable(false)
    .addRange('speed', 0.01, 0.2, field.speed, 0.01, (speed) => {
      field.speed = speed;
    }).addRange('scale', 0.001, 0.05, field.step, 0.001, (step) => {
      field.step = step;
    }).addBoolean('show field', doRenderField, (val) => {
      doRenderField = !doRenderField;
    }).addBoolean('pause', doRenderField, (val) => {
      if (pause == false) {
        noLoop();
      } else {
        loop();
      }
      pause = !pause;
    }).addButton("clear", function () {
			rope.plot.clear();
    })
    .addButton("reset", function () {
			gui.setValuesFromJSON(defaultValues);
    });
  var defaultValues = gui.getValuesAsJSON();
}

window.addEventListener('load', function () {
  initGui();
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
