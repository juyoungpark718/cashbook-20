import 'core-js';
import { qs } from './utils';
import constant from './constant';
import store from './store';
import { oauthLogin } from './lib/api';
import router from './lib/router';
import Nav from './component/Nav';
import Home from './component/home/Home';
import Calendar from './component/calendar/Calender';
import Graph from './component/graph/Graph';
import User from './component/user/User';
import Alert from './component/Alert';

import './scss/app.scss';

const app = qs('#app');

function loginMiddleWare() {
  if (!store.getState('isLogin')) {
    new Alert(alertWrapper, 'alert-wrapper', {
      text: constant.LOGIN_REQUIRED,
      color: 'warning',
    });
    router.redirect('/user');
    return false;
  } else {
    return true;
  }
}

async function oauthMiddleware() {
  const query = location.search;
  if (!query) return true;
  try {
    const result = await oauthLogin(query);
    store.commit({ type: 'loginSuccess', stateName: 'isLogin', value: result });
  } catch (err) {
    new Alert(alertWrapper, 'alert-wrapper', {
      text: err.message,
      color: 'danger',
    });
  } finally {
    router.redirect('/user');
    return false;
  }
}

const navWrapper = document.createElement('nav');
const pages = document.createElement('div');
const alertWrapper = document.createElement('div');
new Nav(navWrapper, 'nav-wrapper', {});
app.append(navWrapper, pages, alertWrapper);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/user', component: User, middleware: oauthMiddleware },
  { path: '/graph', component: Graph, middleware: loginMiddleWare },
  { path: '/calendar', component: Calendar, middleware: loginMiddleWare },
];

router.setView(pages);
router.setPath(routes);

router.render(location.pathname);
