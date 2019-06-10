var QS_WIDTH = 300;
var QS_GAP = 10;
var CANVAS_MAX_SCALE = 1.5;
var CANVAS_MIN_SCALE = 0.5;

var _maxWidth, _maxHeight, _minWidth, _minHeight, _canvasRatio;

function initGui() {
  var gui = QuickSettings
    .create(0, 0, 'Settings')
    .setDraggable(false)
    .addRange('smth', -5, 5, smth, 1, (val) => { smth = val })
    .addRange('_s', 0, 25, _s, 1, (val) => { _s = val })
    .addRange('inc', 0.1, 3, inc, 0.2, (val) => { inc = val })
    .addRange('m', 1, 1.05, m, 0.005, (val) => { m = val })
    .addRange('min_n', 25, 400, min_n, 25, (val) => { min_n = val })
    .addRange('offsetInc', 0.00001, 0.0002, offsetInc, 0.00001, (val) => { offsetInc = val })
    .addRange('min_n', 1, 150, smth2, 1, (val) => { smth2 = val })
    .addButton("reset", function () {
      // console.log(gui)
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
