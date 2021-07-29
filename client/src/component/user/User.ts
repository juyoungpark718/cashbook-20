import RootComponent from '../../core/RootComponent';
import store from '../../store';

export default class User extends RootComponent {
  template() {
    const { login, userInfo } = this.$state;
    if (login) {
      return `
        <img src="${userInfo.profileUrl}">
        <h2>반가워요, ${userInfo.email}님.</h2>
      `;
    } else {
      return `<button class="oauth-btn">github login</button>`;
    }
  }
  setup() {
    this.$state = {
      login: store.subscribe('isLogin', this),
      userInfo: store.subscribe('userInfo', this),
    };
  }
  setEvent() {
    this.addEvent('click', '.oauth-btn', () => {
      /* @ts-ignore */
      location.href = OAUTH_URL;
    });
  }
}
