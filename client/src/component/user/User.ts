import RootComponent from '../../core/RootComponent';
import store from '../../store';

export default class User extends RootComponent {
  template() {
    const { login } = this.$state;
    return `<p>${login ? 'Hi, user' : 'please login..'}</p>`;
  }
  setup() {
    this.$state = {
      login: store.subscribe('isLogin', this),
    };
  }
  setEvent() {}
}
