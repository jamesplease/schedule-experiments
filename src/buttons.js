import _ from 'lodash';
import clearPage from './clear-page';
import renderDivs from './experiments/divs';
import renderCanvas from './experiments/canvas';

// These are the buttons at the top of the page
function Buttons() {
  this.setUi();
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

  bindEvents() {
    this.ui.canvasBtn.addEventListener('click', renderCanvas);
    this.ui.divBtn.addEventListener('click', renderDivs);
    this.ui.clearBtn.addEventListener('click', clearPage);
  }
});

export default Buttons;
