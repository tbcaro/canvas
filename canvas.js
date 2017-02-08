window.onload = function () {
  var app = new App();
  app.initialize();
}

// TBC : Object constructors
function App() {
  // TBC : Constants
  var MAX_WIDTH = 300,
      MAX_HEIGHT = 150;

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
    mouseDrawer = new MouseDrawer(elements.canvas, context, self);
    etchASketch = new EtchASketch(elements.canvas, context, self);

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
        generateRandomBoxes(self.getRepeat(), self.getLineWidth());
      } catch (ex) {
        alert(ex.message);
      }
    });

    elements.btnCircles.addEventListener('click', function() {
      try {
        generateRandomCircles(self.getRepeat(), self.getLineWidth())
      } catch (ex) {
        alert(ex.message);
      }
    });

    elements.btnSpiral.addEventListener('click', function() {
      try {
        generateSpiral(self.getRotations(), self.getSteps());
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

    context.lineWidth = lineWidth;
    context.strokeStyle = 'black';

    // TBC : Generate random boxes based on repeat
    for (var i = 0; i < repeat; i++) {

      var colors    = getRandomColors(),
          size      = getRandomSize(),
          location  = getRandomLocation();

      context.beginPath();
      context.fillStyle = 'rgba('+ colors.r + ',' + colors.g + ',' + colors.b + ',' + colors.a + ')';
      context.rect(location.x, location.y, size.width, size.height);
      context.stroke();
      context.fill();
    }

    console.log('generating random boxes complete');
  }

  var generateRandomCircles = function(repeat, lineWidth) {
    console.log('generating random circles...');
    console.log('repeat: ' + repeat);
    console.log('lineWidth: ' + lineWidth);

    context.lineWidth = lineWidth;
    context.strokeStyle = 'black';

    // TBC : Generate random circles based on repeat
    for (var i = 0; i < repeat; i++) {

      var colors      = getRandomColors(),
          size        = getRandomSize(),
          location    = getRandomLocation(),
          START_ANGLE = 0,
          END_ANGLE   = 2 * Math.PI;

      context.beginPath();
      context.fillStyle = 'rgba('+ colors.r + ',' + colors.g + ',' + colors.b + ',' + colors.a + ')';
      context.arc(
        location.x + (size.radius / 2),
        location.y + (size.radius / 2),
        size.radius,
        START_ANGLE,
        END_ANGLE
      );
      context.stroke();
      context.fill();
    }

    console.log('generating random circles complete');
  }

  var generateSpiral = function(rotations, steps) {
    console.log('generating spiral...');
    console.log('rotations: ' + rotations);
    console.log('steps: ' + steps);

    var OFFSET      = 10,
        LINE_WIDTH  = 2,
        radius      = 5,
        angle       = 0,
        center      = { x: canvas.width / 2, y: canvas.height / 2 },
        colors      = getRandomColors();

    context.lineWidth = LINE_WIDTH;
    context.strokeStyle = 'rgba('+ colors.r + ',' + colors.g + ',' + colors.b + ',' + 1 + ')';
    context.moveTo(center.x, center.y);
    context.beginPath();

    for (var i = 0; i < rotations; i++) {
      angle = 0;

      while (angle < 2 * Math.PI) {
        var newPoint = {
          x: center.x + (Math.cos(angle) * radius),
          y: center.y + (Math.sin(angle) * radius)
        }

        context.lineTo(newPoint.x, newPoint.y);
        context.stroke();

        radius  += OFFSET / steps;
        angle   += (2 * Math.PI) / steps;
      }
    }

    console.log('generating spiral complete');
  }

  var generateSinCosWave = function() {
    console.log('generating sin-cos wave...');

    var OFFSET      = 20,
        BOX_SIZE    = 3,
        angle       = 0,
        location    = { x: 0, y: canvas.height / 2 };

    context.moveTo(location.x, location.y);
    context.beginPath();

    while (location.x < canvas.width) {
      var sin = Math.sin(angle),
          cos = Math.cos(angle);

      // TBC : Draw sin wave
      context.fillStyle = '#ff0000';
      context.fillRect(location.x, location.y + (sin * OFFSET), BOX_SIZE, BOX_SIZE);

      // TBC : Draw cos wave
      context.fillStyle = '#00ff00';
      context.fillRect(location.x, location.y + (cos * OFFSET), BOX_SIZE, BOX_SIZE);

      location.x  += 5;
      angle       += Math.PI / 12;
    }
    console.log('generating sin-cos wave complete');
  }

  var clearCanvas = function() {
    console.log('clearing canvas...');
    context.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    context.beginPath();
    console.log('clearing canvas complete');
  }

  self.getRepeat = function() {
    return Number.parseInt(elements.textBoxRepeat.value);
  }

  self.getLineWidth = function() {
    return Number.parseInt(elements.textBoxLineWidth.value);
  }

  self.getRotations = function() {
    return Number.parseInt(elements.textBoxRotations.value);
  }

  self.getSteps = function() {
    return Number.parseInt(elements.textBoxSteps.value);
  }

  var getRandomColors = function() {
    return {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
      a: Math.random()
    };
  }

  var getRandomLocation = function() {
    return {
      x: Math.floor(Math.random() * (elements.canvas.width - (MAX_WIDTH / 2))),
      y: Math.floor(Math.random() * (elements.canvas.height - (MAX_HEIGHT / 2)))
    };
  }

  var getRandomSize = function() {
    return {
      width: Math.floor(Math.random() * MAX_WIDTH),
      height: Math.floor(Math.random() * MAX_HEIGHT),
      radius: Math.floor(Math.random() * (MAX_WIDTH / 2)),
    };
  }

  return self;
}

function MouseDrawer(canvas, context, app) {
  var self = { };

  var canvas = canvas,
      context = context,
      coords = { x: 0, y: 0 },
      isDrawing = false;

  self.bindEventHandlers = function() {
    console.log('binding mouse drawer event handlers...');

    canvas.addEventListener('mousedown', function(event) {
      coords = toCanvasPos(event.clientX, event.clientY);

      isDrawing = true;
      context.beginPath();
      canvas.style.cursor = 'crosshair';
      context.moveTo(coords.x, coords.y);
      draw();
    });

    canvas.addEventListener('mousemove', function(event) {
      if (isDrawing) {
        coords = toCanvasPos(event.clientX, event.clientY);
        draw();
      }
    });

    canvas.addEventListener('mouseup', function(event) {
      isDrawing = false;
      canvas.style.cursor = 'default';
    });

    console.log('binding mouse drawer event handlers complete');
  }

  var draw = function() {
    context.lineWidth = app.getLineWidth();
    context.lineTo(coords.x, coords.y);
    context.stroke();
  }

  var toCanvasPos = function(x, y) {
    var box = canvas.getBoundingClientRect();

    return {
      x: x - box.left,
      y: y - box.top
    };
  }

  return self;
}

function EtchASketch(canvas, context, app) {
  var self = { };

  var canvas = canvas,
      context = context,
      x = canvas.width / 2,
      y = canvas.height / 2,
      controls = {
        up: 'w',
        left: 'a',
        down: 's',
        right: 'd'
      };

  self.bindEventHandlers = function() {
    console.log('binding etch-a-sketch event handlers...');

    window.addEventListener('keydown', function(event){
      if (Object.values(controls).includes(event.key)) {
        switch (event.key) {
          case controls.up:
            y < 0 ? y = canvas.height : y -= app.getLineWidth();
            draw();
            break;
          case controls.left:
            x < 0 ? x = canvas.width : x -= app.getLineWidth();
            draw();
            break;
          case controls.down:
            y > canvas.height ? y = 0 : y += app.getLineWidth();
            draw();
            break;
          case controls.right:
            x > canvas.width ? x = 0 : x += app.getLineWidth();
            draw();
            break;
        }
      }
    });

    console.log('binding etch-a-sketch event handlers complete');
  }

  var draw = function() {
    context.beginPath();
    context.fillStyle = '#000';
    context.fillRect(x, y, app.getLineWidth(), app.getLineWidth());
  }

  return self;
}
