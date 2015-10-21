import _ from 'lodash';
import RectangleDiv from './rectangle-div';

var mainEl = document.getElementsByTagName('main')[0];
var containerEl = document.getElementsByClassName('chart-container')[0];

function Experiment() {}

_.extend(Experiment.prototype, {
  render() {
    mainEl.className = 'div-experiment';
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
    containerEl.appendChild(fragment);
    console.log('Divs end:', performance.now() - now);
  },

  // At the moment, no teardown is necessary for this section
  teardown() {}
});

export default Experiment;
