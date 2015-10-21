import $ from 'jquery';
import Rectangle from './rectangle';

const mainEl = document.getElementsByTagName('main')[0];
const containerEl = document.getElementsByClassName('chart-container')[0];

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

function Experiment() {
  // Binding in the constructor is required so that I can keep the reference for removing
  // the event listener later on.
  this.onScroll = _.bind(this.onScroll, this);
}

_.extend(Experiment.prototype, {
  render() {
    containerEl.innerHTML = template;
    mainEl.className = 'canvas-experiment';
    var canvasEl = document.getElementsByTagName('canvas')[0];
    this.$vertScrollBar = $('.native-vertical-scrollbar');
    this.$horizScrollBar = $('.native-horizontal-scrollbar');

    canvasEl.height = mainEl.offsetHeight;
    canvasEl.width = mainEl.offsetWidth;

    this.canvasEl = canvasEl;
    this.ctx = canvasEl.getContext('2d');

    var now = performance.now();
    this.rectangles = [];
    for (var i = 0; i < 10000; i++) {
      this.rectangles.push(new Rectangle(this.ctx));
    }

    this.reposition();

    canvasEl.addEventListener("mousewheel", this.onScroll, false);
    canvasEl.addEventListener("DOMMouseScroll", this.onScroll, false);

    console.log('Canvas performance:', performance.now() - now);
  },

  reposition(offset = {}) {
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    this.rectangles.forEach(rect => rect.draw(offset));
  },

  handlingScroll: false,

  onScroll(e) {
    if (this.handlingScroll) { return; }
    this.handlingScroll = true;
    this._onScroll(e);
  },

  _onScroll(e) {
    var newTop = this.$vertScrollBar[0].scrollTop - e.wheelDeltaY / 2;
    var newLeft = this.$horizScrollBar[0].scrollLeft - e.wheelDeltaX / 2;

    newTop = clamp(newTop, 0, 3300);
    newLeft = clamp(newLeft, 0, 3050);
    this.$vertScrollBar.scrollTop(newTop);
    this.$horizScrollBar.scrollLeft(newLeft);
    this.$vertScrollBar.trigger('scroll');
    this.$horizScrollBar.trigger('scroll');
    this.reposition({
      offsetY: newTop,
      offsetX: newLeft
    });
    this.handlingScroll = false;
  },

  teardown() {
    this.rectangles = [];
    if (this.canvasEl) {
      this.canvasEl.removeEventListener('mousewheel', this.onScroll);
      this.canvasEl.removeEventListener('DOMMouseScroll', this.onScroll);
      delete this.canvasEl;
      delete this.context;
    }
  }
});

export default Experiment;
