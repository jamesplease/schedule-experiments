function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The width of every rectangle
var widthUnit = 100;
var heightUnit = 30;

function RectangleDiv(container) {
  this.height = getRandomInt(1, 10) * heightUnit;
  this.width = widthUnit;
  this.left = getRandomInt(0, 39) * widthUnit;
  this.top = getRandomInt(0, 120) * heightUnit;
  var r = getRandomInt(0, 255);
  var g = getRandomInt(0, 255);
  var b = getRandomInt(0, 255);
  this.color = `rgba(${r},${g},${b},0.8)`;
  this.el = this.createElement('div');
  this.el.className = 'cell';
  this.el.style.top = `${this.top}px`;
  this.el.style.left = `${this.left}px`;
  this.el.style.width = `${this.width}px`;
  this.el.style.height = `${this.height}px`;
  this.el.style.backgroundColor = this.color;
}

RectangleDiv.prototype.createElement = function(tagName) {
  return document.createElement(tagName);
};

export default RectangleDiv;
