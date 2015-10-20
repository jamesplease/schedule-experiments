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
