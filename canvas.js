window.onload = function () {
  var app = new App();
  app.run();
}

// TBC : Object constructors
function App() {
  this.elements = { };
  this.context;

  // TBC : Initialize app and bindEventHandlers
  this.run = function() {
    this.init();
    this.bindEventHandlers();
  }

  // TBC : Initialize elements and variables
  this.init = function() {
    // TBC : Get valuable elements
    this.elements.canvas = document.getElementById('canvas');
    this.elements.btnBoxes = document.getElementById('btn-boxes');
    this.elements.btnCircles = document.getElementById('btn-circles');
    this.elements.btnSpiral = document.getElementById('btn-spiral');
    this.elements.btnSinCosWave = document.getElementById('btn-sincos-wave');
    this.elements.btnClear = document.getElementById('btn-clear');
    this.elements.textBoxRepeat = document.getElementById('textbox-repeat');
    this.elements.textBoxLineWidth = document.getElementById('textbox-linewidth');
    this.elements.textBoxRotations = document.getElementById('textbox-rotations');
    this.elements.textBoxSteps = document.getElementById('textbox-steps');

    // TBC : Get canvas context
    this.context = elements.canvas.getContext('2d');
  }

  // Bind event handlers to elements
  this.bindEventHandlers = function() {

    this.elements.btnBoxes.addEventListener('click', function() {
      try {
        this.generateRandomBoxes(this.getRepeat(), this.getLineWidth());
      } catch (ex) {
        alert(ex.message);
      }
    });

    this.elements.btnCircles.addEventListener('click', function() {
      try {
        this.generateRandomCircles(this.getRepeat(), this.getLineWidth())
      } catch (ex) {
        alert(ex.message);
      }
    });

    this.elements.btnSpiral.addEventListener('click', function() {
      try {
        this.generateSpiral(this.getRotations(), this.getSteps());
      } catch (ex) {
        alert(ex.message);
      }
    });

    this.elements.btnSinCosWave.addEventListener('click', function() {
      try {
        this.generateSinCosWave();
      } catch (ex) {
        alert(ex.message);
      }
    });

    this.elements.btnClear.addEventListener('click', function() {
      try {
        this.clearCanvas();
      } catch (ex) {
        alert(ex.message);
      }
    });

    // TODO : Add handler for mouse draw

    // TODO : Add handler for etch-a-sketch keys
  }

  this.generateRandomBoxes = function(repeat, lineWidth) {
    // TODO
  }

  this.generateRandomCircles = function(repeat, lineWidth) {
    // TODO
  }

  this.generateSpiral = function(rotations, steps) {
    // TODO
  }

  this.generateSinCosWave = function() {
    // TODO
  }

  this.clearCanvas = function() {
    // TODO
  }

  this.getRepeat() {
    // TODO : Return repeat
  }

  this.getLineWidth() {
    // TODO : Return lineWidth
  }

  this.getRotations() {
    // TODO : Return rotations
  }

  this.getSteps() {
    // TODO : Return steps
  }
}
