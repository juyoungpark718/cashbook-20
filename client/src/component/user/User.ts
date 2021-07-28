import RootComponent from '../../core/RootComponent';
import store from '../../store';

export default class User extends RootComponent {
  template() {
    const { login } = this.$state;
    return `<p>${login ? 'Hi, user' : `<button class="oauth-btn">github login</button>`}</p>`;
  }
  setup() {
    this.$state = {
      login: store.subscribe('isLogin', this),
    };
  }
  setEvent() {
    this.addEvent('click', '.oauth-btn', () => {
      /* @ts-ignore */
      location.href = OAUTH_URL;
    });
  }
}
