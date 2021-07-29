import RootComponent from '../../core/RootComponent';
import store from '../../store';

export default class Home extends RootComponent {
  template() {
    return `<p>Home</p>`;
  }
  setup() {
    this.$state = {
      month: store.subscribe('month', this),
      cardCategories: store.getState('cardCategories'),
      types: store.getState('types'),
    };
  }
  setEvent() {}
}
