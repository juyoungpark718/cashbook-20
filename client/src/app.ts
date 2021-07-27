import 'core-js';
import { qs } from './utils';
import store from './store';
import router from './lib/router';
import Nav from './component/Nav';
import Home from './component/home/Home';
import Calendar from './component/calendar/Calender';
import Graph from './component/graph/Graph';
import User from './component/user/User';

const app = qs('#app') as HTMLElement;

function loginMiddleWare() {
  if (!store.getState('isLogin')) {
    router.redirect('/user');
    return false;
  } else {
    return true;
  }
}

const navWrapper = document.createElement('nav');
const pages = document.createElement('div');
new Nav(navWrapper, 'nav-wrapper', {});
app.append(navWrapper, pages);

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/user', component: User },
  { path: '/graph', component: Graph, middleware: loginMiddleWare },
  { path: '/calendar', component: Calendar, middleware: loginMiddleWare },
];

router.setView(pages);
router.setPath(routes);

router.render(location.pathname);
