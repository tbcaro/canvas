window.onload = function () {
  var app = new App();
  app.initialize();
}

// TBC : Object constructors
function App() {
  // TBC : Public scope
  var self = { };

  // TBC : Private variables
  var elements = { },
      context,
      mouseDrawer,
      etchASketch;

  // TBC : Initialize app and bindEventHandlers
  self.initialize = function() {
    console.log('initializing app...');
    // TBC : Get valuable elements
    elements.canvas            = document.getElementById('canvas');
    elements.btnBoxes          = document.getElementById('btn-boxes');
    elements.btnCircles        = document.getElementById('btn-circles');
    elements.btnSpiral         = document.getElementById('btn-spiral');
    elements.btnSinCosWave     = document.getElementById('btn-sincos-wave');
    elements.btnClear          = document.getElementById('btn-clear');
    elements.textBoxRepeat     = document.getElementById('textbox-repeat');
    elements.textBoxLineWidth  = document.getElementById('textbox-linewidth');
    elements.textBoxRotations  = document.getElementById('textbox-rotations');
    elements.textBoxSteps      = document.getElementById('textbox-steps');

    // TBC : Get canvas context
    context = elements.canvas.getContext('2d');

    // TBC : Instantiate delegated modules
    mouseDrawer = new MouseDrawer(elements.canvas, context);
    etchASketch = new EtchASketch(elements.canvas, context);

    // TBC : Bind event handlers
    bindEventHandlers();
    mouseDrawer.bindEventHandlers();
    etchASketch.bindEventHandlers();
    console.log('initializing app complete');
  }

  // Bind event handlers to elements
  var bindEventHandlers = function() {
    console.log('binding app event handlers...');
    elements.btnBoxes.addEventListener('click', function() {
      try {
        generateRandomBoxes(getRepeat(), getLineWidth());
      } catch (ex) {
        alert(ex.message);
      }
    });

    elements.btnCircles.addEventListener('click', function() {
      try {
        generateRandomCircles(getRepeat(), getLineWidth())
      } catch (ex) {
        alert(ex.message);
      }
    });

    elements.btnSpiral.addEventListener('click', function() {
      try {
        generateSpiral(getRotations(), getSteps());
      } catch (ex) {
        alert(ex.message);
      }
    });

    elements.btnSinCosWave.addEventListener('click', function() {
      try {
        generateSinCosWave();
      } catch (ex) {
        alert(ex.message);
      }
    });

    elements.btnClear.addEventListener('click', function() {
      try {
        clearCanvas();
      } catch (ex) {
        alert(ex.message);
      }
    });
    console.log('binding app event handlers complete');
  }

  var generateRandomBoxes = function(repeat, lineWidth) {
    console.log('generating random boxes...');
    console.log('repeat: ' + repeat);
    console.log('lineWidth: ' + lineWidth);

    console.log('generating random boxes complete');
  }

  var generateRandomCircles = function(repeat, lineWidth) {
    console.log('generating random circles...');
    console.log('repeat: ' + repeat);
    console.log('lineWidth: ' + lineWidth);

    console.log('generating random circles complete');
  }

  var generateSpiral = function(rotations, steps) {
    console.log('generating spiral...');
    console.log('rotations: ' + rotations);
    console.log('steps: ' + steps);

    console.log('generating spiral complete');
  }

  var generateSinCosWave = function() {
    console.log('generating sin-cos wave...');

    console.log('generating sin-cos wave complete');
  }

  var clearCanvas = function() {
    console.log('clearing canvas...');

    console.log('clearing canvas complete');
  }

  var getRepeat = function() {
    return elements.textBoxRepeat.value;
  }

  var getLineWidth = function() {
    return elements.textBoxLineWidth.value;
  }

  var getRotations = function() {
    return elements.textBoxRotations.value;
  }

  var getSteps = function() {
    return elements.textBoxSteps.value;
  }

  return self;
}

function MouseDrawer(canvas, context) {
  var self = { };
  self.canvas = canvas;
  self.context = context;
  self.coords = { x: 0, y: 0 }
  self.isDrawing = false;

  self.bindEventHandlers = function() {
    console.log('binding mouse drawer event handlers...');

    self.canvas.addEventListener('mousedown', function(event) {
      self.coords = self.toCanvasPos(event.clientX, event.clientY);

      self.isDrawing = true;
      self.canvas.style.cursor = 'crosshair';
      self.context.moveTo(self.coords.x, self.coords.y);
      self.draw();
    });

    self.canvas.addEventListener('mousemove', function(event) {
      if (self.isDrawing) {
        self.coords = self.toCanvasPos(event.clientX, event.clientY);

        self.draw();
      }
    });

    self.canvas.addEventListener('mouseup', function(event) {
      self.isDrawing = false;
      self.canvas.style.cursor = 'default';
    });

    console.log('binding mouse drawer event handlers complete');
  }

  self.draw = function() {
    self.context.lineTo(self.coords.x, self.coords.y);
    self.context.stroke();
  }

  self.toCanvasPos = function(x, y) {
    var box = self.canvas.getBoundingClientRect();

    return {
      x: x - box.left,
      y: y - box.top
    };
  }

  return self;
}

function EtchASketch(canvas, context) {
  var self = { };
  self.DRAW_SIZE = 5;
  self.canvas = canvas;
  self.context = context;
  self.x = canvas.width / 2;
  self.y = canvas.height / 2;
  self.controls = {
    up: 'w',
    left: 'a',
    down: 's',
    right: 'd'
  }

  self.bindEventHandlers = function() {
    console.log('binding etch-a-sketch event handlers...');

    window.addEventListener('keydown', function(event){
      if (Object.values(self.controls).includes(event.key)) {
        switch (event.key) {
          case self.controls.up:
            self.y -= self.DRAW_SIZE;
            self.draw();
            break;
          case self.controls.left:
            self.x -= self.DRAW_SIZE;
            self.draw();
            break;
          case self.controls.down:
            self.y += self.DRAW_SIZE;
            self.draw();
            break;
          case self.controls.right:
            self.x += self.DRAW_SIZE;
            self.draw();
            break;
        }
      }
    });

    console.log('binding etch-a-sketch event handlers complete');
  }

  self.draw = function() {
    self.context.fillStyle = '#000';
    self.context.fillRect(self.x, self.y, self.DRAW_SIZE, self.DRAW_SIZE);
  }

  return self;
}
