export interface ISubscriber {
  setState: (state: any) => void;
}

export interface IRootState {
  [key: string]: {
    value: any;
    subs: ISubscriber[];
  };
}

interface ICommit<T> {
  type: string;
  stateName: T;
  value: any;
}

interface IMutationPayload<T> {
  state: T;
  value: any;
  commit: (payload: ICommit<keyof T>) => void;
}

export interface IMutation<T> {
  [key: string]: (payload: IMutationPayload<T>) => any;
}

export function createStore<T extends IRootState>(initialState: T, mutations: IMutation<T>) {
  type StateName = keyof T;

  const state: T = initialState;

  function getState(stateName: StateName): any {
    return state[stateName].value;
  }

  function subscribe(stateName: StateName, subscriber: ISubscriber): any {
    state[stateName].subs.push(subscriber);
    return state[stateName].value;
  }

  function setState(stateName: StateName, value: any): void {
    state[stateName].value = value;
    const nextState: T = {
      ...state,
      [stateName]: value,
    };
    state[stateName].subs.forEach((subscriber: ISubscriber) => {
      subscriber.setState({
        [stateName]: value,
      });
    });
  }

  function commit(payload: ICommit<keyof T>): void {
    const { type, stateName, value } = payload;
    if (mutations[type] === undefined) {
      throw new Error(`${type}에 해당하는 mutation이 없습니다.`);
    }
    const mutatedValue = mutations[type]({ state, value, commit });
    setState(stateName, mutatedValue);
  }

  return {
    getState,
    subscribe,
    commit,
  };
}
