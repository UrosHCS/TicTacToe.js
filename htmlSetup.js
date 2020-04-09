var cells;
var player = true;

var CELL_COLOR = "#AA00FF";
var CELL_HOVER = "#D500F9";

window.onload = function () {
  cells = document.getElementsByClassName("table-cell");
  resize();
  window.onresize = resize;
  setupNewGameButton();
  newGame();
};

function resize() {
  var cellWidth = cells[0].clientWidth;
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    cell.style.height = cellWidth + "px";
    if (cell.hasChildNodes()) {
      var canvas = cell.lastChild;
      fitCanvasToDiv(canvas, cell);
      if (canvas.id === "X") {
        drawX();
      } else if (canvas.id === "O") {
        drawO();
      }
    }
  }
}

function fitCanvasToDiv(canvas, div) {
  canvas.width = div.clientWidth * 0.8;
  canvas.height = div.clientHeight * 0.8;
}

function mouseOver(event) {
  event.target.style.backgroundColor = CELL_HOVER;
}

function mouseOut(event) {
  event.target.style.backgroundColor = CELL_COLOR;
}

function onClick(event) {
  var element = event.target;
  element.style.backgroundColor = CELL_COLOR;
  removeListeners(element);
  setGameElm(element);
  drawX(createAndAppendCanvas(element));
  var answerElem = _computerMove();
  if (answerElem) {
    drawO(createAndAppendCanvas(answerElem));
    removeListeners(answerElem);
  }
}

function createAndAppendCanvas(element) {
  var canvas = document.createElement("canvas");
  fitCanvasToDiv(canvas, element);
  element.appendChild(canvas);
  return canvas;
}

function addListeners(element) {
  element.addEventListener("mouseover", mouseOver, false);
  element.addEventListener("mouseout", mouseOut, false);
  element.addEventListener("click", onClick, false);
}

function removeListeners(element) {
  element.removeEventListener("mouseover", mouseOver);
  element.removeEventListener("mouseout", mouseOut);
  element.removeEventListener("click", onClick);
}

function setupHoverAndClick() {
  for (var i = 0; i < cells.length; i++) {
    addListeners(cells[i]);
    cells[i].style.backgroundColor = CELL_COLOR;
  }
}
function newGame() {
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    while (cell.hasChildNodes()) cell.removeChild(cell.lastChild);
  }
  setupHoverAndClick();
  _newGame();
}

function setupNewGameButton() {
  var btn = document.getElementById("btn");

  btn.addEventListener("click", newGame, false);
}

function drawX(canvas) {
  var draw = new InitDraw(canvas);
  draw.drawX();
}
function drawO(canvas) {
  var draw = new InitDraw(canvas);
  draw.drawO();
}

function InitDraw(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.a = canvas.height / 3;
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
}

InitDraw.prototype.colors = ["white", "white"];

InitDraw.prototype.drawX = function () {
  this.canvas.id = "X";
  for (var i = 1; i < 3; i++) {
    this.ctx.lineWidth = (2 * this.a) / (i * 10);
    this.ctx.strokeStyle = this.colors[i - 1];
    this.ctx.beginPath();
    this.ctx.lineCap = "round";
    this.ctx.moveTo(this.x - this.a, this.y - this.a);
    this.ctx.lineTo(this.x + this.a, this.y + this.a);
    this.ctx.moveTo(this.x + this.a, this.y - this.a);
    this.ctx.lineTo(this.x - this.a, this.y + this.a);
    this.ctx.stroke();
  }
};

InitDraw.prototype.drawO = function () {
  this.canvas.id = "O";
  for (var i = 1; i < 3; i++) {
    this.ctx.lineWidth = (2 * this.a) / (i * 10);
    this.ctx.strokeStyle = this.colors[i - 1];
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.a, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
};

function setGameElm(elm) {
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      if (divMatrix[row][col] === elm) {
        gameMatrix[row][col] = 1;
      }
    }
  }
}

function removeAllClicks() {
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      removeListeners(divMatrix[row][col]);
    }
  }
}
