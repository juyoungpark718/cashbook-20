import 'core-js';
import './scss/app.scss';
import './scss/app.css';
import { qs } from './utils';
import core from './core';
import store from './store';
const app = qs('#app') as HTMLElement;

class Year extends core.PureComponent {
  setup() {
    this.$state = {
      year: store.subscribe('year', this),
    };
  }
  template() {
    return `
      <h1>${this.$state.year}</h1>
    `;
  }
}

class Month extends core.RootComponent {
  setup() {
    this.$state = {
      month: store.subscribe('month', this),
    };
  }

  template() {
    return `
    <div>
      ${this.$state.month}
      <button class="plus-btn">+</button>
      <button class="minus-btn">-</button>
    </div>
    `;
  }
  setEvent() {
    this.addEvent('click', '.plus-btn', e =>
      store.commit({ type: 'setMonth', stateName: 'month', value: this.$state.month + 1 })
    );
    this.addEvent('click', '.minus-btn', e =>
      store.commit({ type: 'setMonth', stateName: 'month', value: this.$state.month - 1 })
    );
  }
}
const $year = document.createElement('div');
new Year($year, {});
const $month = document.createElement('div');
new Month($month, '', {});

app.append($year, $month);
