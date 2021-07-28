import { IMutation } from '../lib/store';
import { state } from './index';

const mutations: IMutation<state> = {
  setYear: ({ value }) => {
    return value;
  },
  setMonth: ({ state, value, commit }) => {
    let nextMonth: number = value;
    if (nextMonth < 1 || nextMonth > 12) {
      let nextYear = state.year.value;
      if (nextMonth < 1) {
        nextMonth = 12;
        nextYear -= 1;
      } else {
        nextMonth = 1;
        nextYear += 1;
      }
      commit({ type: 'setYear', stateName: 'year', value: nextYear });
    }
    return nextMonth;
  },
  setRouteActive: ({ value }) => {
    const routeName = value.split('/')[1];
    return routeName;
  },
};

export default mutations;
