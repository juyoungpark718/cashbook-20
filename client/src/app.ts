import 'core-js';
import { qs } from './utils';
import constant from './constant';
import store from './store';
import { oauthLogin, getCategories } from './lib/api';
import router from './lib/router';
import Nav from './component/Nav';
import Home from './component/home/Home';
import Calendar from './component/calendar/Calender';
import Graph from './component/graph/Graph';
import User from './component/user/User';
import Alert from './component/Alert';

import './scss/app.scss';

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
const app = qs('#app');
const navWrapper = document.createElement('nav');
const pages = document.createElement('div');
const alertWrapper = document.createElement('div');
new Nav(navWrapper, 'nav-wrapper', {});
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/user', component: User, middleware: oauthMiddleware },
  { path: '/graph', component: Graph, middleware: loginMiddleWare },
  { path: '/calendar', component: Calendar, middleware: loginMiddleWare },
];

async function init() {
  const categories = await getCategories();
  store.commit({ type: 'setTypes', stateName: 'types', value: categories.types });
  store.commit({ type: 'setTypes', stateName: 'cardCategories', value: categories.cardCategories });
  app.append(navWrapper, pages, alertWrapper);
  router.setView(pages);
  router.setPath(routes);
  router.render(location.pathname);
}

init();
