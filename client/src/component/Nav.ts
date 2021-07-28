import RootComponent from '../core/RootComponent';
import router from '../lib/router';
import store from '../store';
import { qs, qsa } from '../utils';
import '../scss/nav.scss';

export default class Nav extends RootComponent {
  setup() {
    this.$state = {
      routeActive: store.subscribe('routeActive', this),
      month: store.subscribe('month', this),
      year: store.subscribe('year', this),
    };
  }
  template() {
    const { routeActive, year, month } = this.$state;
    return `
    <h1>우아한 가계부</h1>
    <div class="nav-center">
      <div class="month">${month}월</div>
      <div class="year">${year}</div>
      <button class="month-btn left"><i class="fas fa-chevron-left"></i></button>
      <button class="month-btn right"><i class="fas fa-chevron-right"></i></button>
    </div>
    <div class="route-container">
      <button class="home route-btn ${
        routeActive === 'home' ? 'active' : ''
      }"><i class="fas fa-file-invoice-dollar"></i></button>
      <button class="calendar route-btn ${
        routeActive === 'calendar' ? 'active' : ''
      }"><i class="fas fa-calendar-alt"></i></button>
      <button class="graph route-btn ${
        routeActive === 'graph' ? 'active' : ''
      }"><i class="fas fa-chart-pie"></i></button>
      <button class="user route-btn ${routeActive === 'user' ? 'active' : ''}"><i class="fas fa-user"></i></button>
    </div>
    <div class="toggle-container">
      <button class="toggle-btn"><i class="fas fa-bars"></i></button>
      <ul class="toggle-content">
        <li class="home">상세보기</li>
        <li class="calendar">달력으로 보기</li>
        <li class="graph">그래프로 보기</li>
        <li class="user">내 정보</li>
      </ul>
    </div>
    `;
  }
  setEvent() {
    this.addEvent('click', '.home', () => {
      router.to('/');
    });
    this.addEvent('click', '.calendar', () => {
      router.to('/calendar');
    });
    this.addEvent('click', '.graph', () => {
      router.to('/graph');
    });
    this.addEvent('click', '.user', () => {
      router.to('/user');
    });
    this.addEvent('click', '.month-btn.left', () => {
      store.commit({ type: 'setMonth', stateName: 'month', value: this.$state.month - 1 });
    });
    this.addEvent('click', '.month-btn.right', () => {
      store.commit({ type: 'setMonth', stateName: 'month', value: this.$state.month + 1 });
    });
    this.addEvent('click', '.toggle-btn', () => {
      const toggleContent = qs('.toggle-content');
      const app = qs('#app');
      toggleContent.classList.add('on');
      app.addEventListener('click', toggleOf, true);
    });
  }
  shouldComponentUpdate(prevState: any, nextState: any) {
    if (prevState.routeActive !== nextState.routeActive) {
      const active = nextState.routeActive;
      const routeBtns = qsa('.route-btn');
      routeBtns.forEach(routeBtn => {
        if (routeBtn.classList.contains(active)) {
          routeBtn.classList.add('active');
        } else {
          routeBtn.classList.remove('active');
        }
      });
    } else if (prevState.month !== nextState.month) {
      const $month = qs<HTMLDivElement>('.nav-center > .month');
      $month.innerText = `${nextState.month}월`;
    } else if (prevState.year !== nextState.year) {
      const $year = qs<HTMLDivElement>('.nav-center > .year');
      $year.innerText = `${nextState.year}`;
    }
    return false;
  }
}

function toggleOf(e: any) {
  if (e && e.target && e.target.closest('.toggle-content')) {
    return;
  }
  e.stopPropagation();
  const toggleContent = qs('.toggle-content');
  const app = qs('#app');
  toggleContent.classList.remove('on');
  toggleContent.classList.add('off');
  setTimeout(() => {
    toggleContent.classList.remove('off');
  }, 300);
  app.removeEventListener('click', toggleOf, true);
}
