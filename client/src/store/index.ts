export interface ISubscriber {
  setState: (state: any) => void;
}

function Store() {
  type stateType = {
    isLogin: { value: boolean; subs: ISubscriber[] };
    year: { value: number; subs: ISubscriber[] };
    month: { value: number; subs: ISubscriber[] };
    datas: { value: any; subs: ISubscriber[] };
  };

  type StateName = keyof stateType;

  const state: stateType = {
    isLogin: {
      value: false,
      subs: [],
    },
    year: {
      value: new Date().getFullYear(),
      subs: [],
    },
    month: {
      value: new Date().getMonth() + 1,
      subs: [],
    },
    datas: {
      value: {},
      subs: [],
    },
  };

  function getState(stateName: StateName): any {
    return state[stateName].value;
  }

  function subscribe(stateName: StateName, subscriber: ISubscriber): any {
    state[stateName].subs.push(subscriber);
    return state[stateName].value;
  }

  function setState(stateName: StateName, value: any): void {
    state[stateName].value = value;
    const nextState: { [key: string]: any } = {};
    nextState[stateName] = value;
    state[stateName].subs.forEach((subscriber: ISubscriber) => {
      subscriber.setState(nextState);
    });
  }

  function dateChangeHandler(nextRawMonth: number) {
    let nextMonth: number = nextRawMonth;
    if (nextMonth < 1 || nextMonth > 12) {
      let nextYear = state.year.value;
      if (nextMonth < 1) {
        nextMonth = 12;
        nextYear -= 1;
      } else {
        nextMonth = 1;
        nextYear += 1;
      }
      setState('year', nextYear);
    }
    setState('month', nextMonth);
    // 비동기 요청으로 날짜에 맞는 데이터 요청하기
  }

  const dispatch = {
    monthLeftClick() {
      const nextRawMonth = state.month.value - 1;
      dateChangeHandler(nextRawMonth);
    },
    monthRightClick() {
      const nextRawMonth = state.month.value + 1;
      dateChangeHandler(nextRawMonth);
    },
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = Store();

export default store;
