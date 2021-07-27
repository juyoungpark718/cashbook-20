import 'core-js';
import { qs } from './utils';
import router from './lib/router';
import Nav from './component/Nav';
import Home from './component/Home';
import Calender from './component/Calender';
import Graph from './component/Graph';

const app = qs('#app') as HTMLElement;
const navWrapper = document.createElement('div');
const pages = document.createElement('div');
new Nav(navWrapper, 'nav-wrapper', {});

app.append(navWrapper, pages);

router.setView(pages);

router.setPath({ path: '/', component: Home });
router.setPath({ path: '/calender', component: Calender });
router.setPath({ path: '/graph', component: Graph });

router.render(location.pathname);
