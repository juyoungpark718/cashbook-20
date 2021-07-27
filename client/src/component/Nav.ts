import RootComponent from '../core/RootComponent';
import router from '../lib/router';

export default class Nav extends RootComponent {
  template() {
    return `<button class="home">home</button>
    <button class="calender">calender</button>
    <button class="graph">graph</button>`;
  }
  setEvent() {
    this.addEvent('click', '.home', () => {
      router.to('/');
    });
    this.addEvent('click', '.calender', () => {
      router.to('/calender');
    });
    this.addEvent('click', '.graph', () => {
      router.to('/graph');
    });
  }
}
