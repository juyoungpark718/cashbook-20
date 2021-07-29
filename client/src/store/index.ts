import { createStore } from '../lib/store';
import mutations from './mutations';
import { IRootState, ISubscriber } from '../lib/store';

interface IUserValue {
  cards: string[];
}
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
  routeActive: {
    value: string;
    subs: ISubscriber[];
  };
  userInfo: {
    value: IUserValue;
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
    routeActive: {
      value: '',
      subs: [] as ISubscriber[],
    },
    userInfo: {
      value: {} as IUserValue,
      subs: [] as ISubscriber[],
    },
  },
  {
    ...mutations,
  }
);

export default store;
