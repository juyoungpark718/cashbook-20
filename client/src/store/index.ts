function Store() {
  type stateType = {
    isLogin: { value: boolean; subs: Array<any> };
    year: { value: number; subs: Array<any> };
    month: { value: number; subs: Array<any> };
    datas: { value: object; subs: Array<any> };
  };
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
  function getState(stateName: string): any {
    return eval(`state.${stateName}`).value;
  }
  function subscribe(stateName: string, subscriber: any): any {
    eval(`state.${stateName}`).subs.push(subscriber);
    return eval(`state.${stateName}`).value;
  }
  function setState(stateName: string, value: any): void {
    eval(`state.${stateName}`).value = value;
    const nextState: { [key: string]: any } = {};
    nextState[stateName] = value;
    eval(`state.${stateName}`).subs.forEach((subscriber: any) => {
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
