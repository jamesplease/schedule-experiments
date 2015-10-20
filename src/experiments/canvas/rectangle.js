function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The width of every rectangle
var widthUnit = 100;
var heightUnit = 30;

function Rectangle(context) {
  this.height = getRandomInt(1, 10) * heightUnit;
  this.width = widthUnit;
  this.left = getRandomInt(0, 39) * widthUnit;
  this.top = getRandomInt(0, 120) * heightUnit;
  var r = getRandomInt(0, 255);
  var g = getRandomInt(0, 255);
  var b = getRandomInt(0, 255);
  this.fillStyle = `rgb(${r},${g},${b})`;
  this.context = context;
}

Rectangle.prototype.draw = function({ offsetX = 0, offsetY = 0 }) {
  var relativeLeft = this.left - offsetX;
  var relativeTop = this.top - offsetY;
  if (relativeLeft + this.width > 0 && relativeTop + this.height > 0) {
    this.context.fillStyle = this.fillStyle;
    this.context.fillRect(relativeLeft, relativeTop, this.width, this.height);
  }
};

export default Rectangle;
