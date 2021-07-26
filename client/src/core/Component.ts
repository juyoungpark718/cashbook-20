export default class Component {
  $target: HTMLElement;
  $root: HTMLElement;
  $props: any;
  $state: any;
  constructor($target: HTMLElement, rootSelector: string, $props: any) {
    this.$target = $target;
    this.$props = $props;
    this.$root = document.createElement('div');
    this.$root.setAttribute("class", rootSelector);
    this.setup();
    this.render();
    this.setEvent();
  }

  // state 정의
  setup() {
    this.$state = {};
  }
  // render 후 실행되는 함수 (자식 객체 생성하는 코드가 필요)
  mounted() {}
  // render 이전에 template literal로 string 리턴해주는 함수
  template() {
    return '';
  }
  // render
  render() {
    const virtual = document.createElement('div');
    virtual.innerHTML = this.template();
    this.$root.append(...virtual.children);
    this.$target.innerHTML = '';
    this.$target.appendChild(this.$root);
    this.mounted();
  }
  // render를 해야하는가?
  shouldComponentUpdate(prevState: any, nextState: any) {
    return true;
  }
  // 이벤트 등록 (addEvent 사용)
  setEvent() {}
  // state 변경되면 render 다시
  setState(newState: any) {
    const prevState = this.$state;
    this.$state = { ...this.$state, ...newState };

    if (this.shouldComponentUpdate(prevState, this.$state)) this.render();
  }
  // event add 하기
  addEvent(eventType: string, selector: string, callback: (event?: Event) => void, capture = false) {
    // 없을 때를 방지하기 위해서
    const children = [...this.$target.querySelectorAll(selector)];
    // selector로 명시한 노드보다 더 하위 요소가 선택되었을 때를 처리하기 위해
    // closest를 사용한다.
    const isRight = (target: HTMLElement) =>
      children.includes(target) || target.closest(selector);

    this.$root.addEventListener(
      eventType,
      (e: Event) => {
        if (!isRight(e.target as HTMLElement)) return;
        callback(e);
      },
      capture
    );
  }
}