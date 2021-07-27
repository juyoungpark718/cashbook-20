export default abstract class Component{
  $target: Element;
  $props: any;
  $state:any;
  constructor($target: Element, $props:any){
    this.$target = $target;
    this.$props = $props;
    this.setup();
  }

  abstract render() :void;
  abstract mounted?() :void;
  abstract template() :string;
  abstract setup() :void;
  
  shouldComponentUpdate(prevState:any, nextState:any): boolean{
    return true;
  }; 

  setState(newState: any) {
    const prevState = this.$state;
    this.$state = { ...this.$state, ...newState };
    if (this.shouldComponentUpdate(prevState, this.$state)) this.render();
  }
}

/**
 * PureComponent -> 이벤트가 없고, root가 없는
 * RootComponent -> root wrapper에서 이벤트를 관리하는
 * ListComponent -> for 문으로 props를 전달하여 작성하는
 */