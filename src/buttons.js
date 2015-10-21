import _ from 'lodash';
import clearPage from './clear-page';
import DivExperiment from './experiments/divs';
import CanvasExperiment from './experiments/canvas';

// These are the buttons at the top of the page
function Buttons() {
  this.setUi();
  this.createExperiments();
  this.bindEvents();
}

_.extend(Buttons.prototype, {
  setUi() {
    this.ui = {
      canvasBtn: document.getElementsByClassName('render-canvas')[0],
      divBtn: document.getElementsByClassName('render-divs')[0],
      clearBtn: document.getElementsByClassName('clear-btn')[0]
    };
  },

  createExperiments() {
    this.divExperiment = new DivExperiment();
    this.canvasExperiment = new CanvasExperiment();
  },

  bindEvents() {
    this.ui.canvasBtn.addEventListener('click', _.bind(this.swapExperiment, this, 'canvas'));
    this.ui.divBtn.addEventListener('click', _.bind(this.swapExperiment, this, 'div'));
    this.ui.clearBtn.addEventListener('click', _.bind(this.swapExperiment, this));
  },

  swapExperiment(experiment) {
    // Teardown the current experiment, if it exists
    _.result(this.currentExperiment, 'teardown');
    // Render the new experiment, if one is specified
    if (_.isString(experiment)) {
      document.getElementsByClassName('chart-container')[0].innerHTML = '';
      var targetExperiment = this[`${experiment}Experiment`];
      targetExperiment.render();
      this.currentExperiment = targetExperiment;
    } else {
      clearPage();
    }
  }
});

export default Buttons;
