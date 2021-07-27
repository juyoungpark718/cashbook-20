import Component from "./abstract";
export default abstract class RootComponent extends Component {
  $root: HTMLElement;
  constructor($target: Element, rootSelector: string, $props: any) {
    super($target, $props);
    this.$root = document.createElement('div');
    this.$root.setAttribute("class", rootSelector);
    this.render();
    this.setEvent();
  }

  // state 정의
  setup() {
    this.$state = {};
  }
  // render 이전에 template literal로 string 리턴해주는 함수
  mounted() {};

  abstract template(): string;
  // render
  render() {
    this.$target.innerHTML = '';
    this.$root.innerHTML = '';
    const virtual = document.createElement('div');
    virtual.innerHTML = this.template();
    this.$root.append(...virtual.children);
    this.$target.appendChild(this.$root);
    this.mounted();
  }
  // 이벤트 등록 (addEvent 사용)
  abstract setEvent():void;
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