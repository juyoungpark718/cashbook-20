import Component from "./abstract";

export default abstract class PureComponent extends Component {
  constructor($target: Element, $props: any) {
    super($target, $props);
    this.render();
  }

  // state 정의
  setup() {
    this.$state = {};
  }
  // render 후 실행되는 함수 (자식 객체 생성하는 코드가 필요)
  mounted() {};
  // render 이전에 template literal로 string 리턴해주는 함수
  abstract template(): string;
  // render
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}