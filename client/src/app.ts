import 'core-js';
import './scss/app.scss';
import './scss/app.css';
import { qs } from './utils';

const app = qs('#app');
if (app) {
  app.innerHTML = `
    <div class="test-wrapper">안녕하세요</div>
  `;
}
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
}).then((res) => {
  console.log(res);
});
