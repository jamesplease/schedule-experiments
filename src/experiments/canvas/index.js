import $ from 'jquery';
import Rectangle from './rectangle';

const container = document.getElementsByClassName('chart-container')[0];
var $main = $('main');

var clamp = function(num, min, max) {
  if (typeof min !== 'undefined' && num < min) {
    return min;
  } else if (typeof max !== 'undefined' && num > max) {
    return max;
  } else {
    return num;
  }
};

var template = `<canvas></canvas>
      <div class='native-scrollbar native-vertical-scrollbar'><div></div></div>
      <div class='native-scrollbar native-horizontal-scrollbar'><div></div></div>`;

function Experiment() {}

_.extend(Experiment.prototype, {
  render() {
    container.innerHTML = template;
    $('main')[0].className = 'canvas-experiment';
    var $canvas = $('canvas');
    var $vertScrollBar = $('.native-vertical-scrollbar');
    var $horizScrollBar = $('.native-horizontal-scrollbar');

    $canvas[0].height = $main.height();
    $canvas[0].width = $main.width();

    var canvas = $canvas[0];
    this.$canvas = $canvas;
    var ctx = canvas.getContext('2d');

    var now = performance.now();
    var rectangles = [];
    for (var i = 0; i < 10000; i++) {
      rectangles.push(new Rectangle(ctx));
    }
    function reposition(offset = {}) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rectangles.forEach(rect => rect.draw(offset));
    }

    reposition();

    var handlingScroll = false;
    var newTop, newLeft;
    function onScroll(e) {
      newTop = $vertScrollBar.scrollTop() - e.originalEvent.wheelDeltaY / 2;
      newLeft = $horizScrollBar.scrollLeft() - e.originalEvent.wheelDeltaX / 2;

      newTop = clamp(newTop, 0, 3300);
      newLeft = clamp(newLeft, 0, 3050);
      $vertScrollBar.scrollTop(newTop);
      $horizScrollBar.scrollLeft(newLeft);
      $vertScrollBar.trigger('scroll');
      $horizScrollBar.trigger('scroll');
      reposition({
        offsetY: newTop,
        offsetX: newLeft
      });
      handlingScroll = false;
    }

    this.$canvas.on('mousewheel', e => {
      if (handlingScroll) { return; }
      handlingScroll = true;
      onScroll(e);
    });

    console.log('Canvas performance:', performance.now() - now);
  },

  teardown() {
    _.result(this.$canvas, 'off');
    delete this.$canvas;
  }
});

export default Experiment;
