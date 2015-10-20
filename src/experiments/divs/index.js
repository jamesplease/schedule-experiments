import $ from 'jquery';
import RectangleDiv from './rectangle-div';

var $main = $('main');
var $container = $('.chart-container');
var newRectangle = new RectangleDiv();

function render() {
  $('main')[0].className = 'div-experiment';
  var count = 10000;
  var rects = [];
  var now = performance.now();
  for (var x = 0; x < count; x++) {
    rects.push(new RectangleDiv());
  }

  var fragment = document.createDocumentFragment();
  rects.forEach(rect => {
    fragment.appendChild(rect.el);
  });
  $container[0].appendChild(fragment);
  console.log('Divs end:', performance.now() - now);
}

export default render;
