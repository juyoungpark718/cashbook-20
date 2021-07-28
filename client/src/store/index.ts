import { createStore } from '../lib/store';
import mutations from './mutations';
import { IRootState, ISubscriber } from '../lib/store';

export interface state extends IRootState {
  year: {
    value: number;
    subs: ISubscriber[];
  };
  month: {
    value: number;
    subs: ISubscriber[];
  };
  isLogin: {
    value: boolean;
    subs: ISubscriber[];
  };
}

const store = createStore<state>(
  {
    year: {
      value: new Date().getFullYear(),
      subs: [] as ISubscriber[],
    },
    month: {
      value: new Date().getMonth() + 1,
      subs: [] as ISubscriber[],
    },
    isLogin: {
      value: false,
      subs: [] as ISubscriber[],
    },
  },
  {
    ...mutations,
  }
);

export default store;
