// This module resets the page to be in the default state that the app is in
// when the page first loads. Individual experiment teardown should be in the
// Experiment object itself! This file isn't responsible for cleaning up
// memory leaks.
const template = `
  <div class="notification">
    <p>
      Click a button above to run one of the experiments.
    </p>
    <p>
      View the performance in the console.
    </p>
  </div>`;

const main = document.getElementsByTagName('main')[0];
const container = document.getElementsByClassName('chart-container')[0];

function clearPage() {
  main.className = '';
  container.innerHTML = template;
}

export default clearPage;
