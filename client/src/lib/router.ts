interface IPath {
  path: string;
  component: any;
}

interface IPaths {
  [path: string]: any;
}

interface IPathParam {
  [key: string]: string | number;
}

interface IState {
  [key: string]: any;
}

interface IRouter {
  setView: (target: HTMLElement) => void;
  setPath: (props: IPath) => void;
  render: (path: string, state?: unknown) => void;
  to: (path: string, state?: IState) => void;
  redirect: (path: string, state?: IState) => void;
  back: () => void;
}

function Router(): IRouter {
  const paths: IPaths = {};
  let view: HTMLElement | null = null;

  const init = () => {
    window.addEventListener('popstate', popStateHandler);
  };

  const popStateHandler = (event: PopStateEvent) => {
    const { path } = event.state;
    render(path);
  };

  const to = (path: string, state?: IState) => {
    history.pushState({ path, ...state }, '', path);
    render(path);
  };

  const redirect = (path: string, state?: IState) => {
    history.replaceState({ path, ...state }, '', path);
    render(path);
  };

  const back = () => {
    history.back();
  };

  const render = (path: string) => {
    const pathInfo = findPath(path);
    if (!pathInfo) {
      render404();
      return;
    }
    const component = paths[pathInfo];
    if (view) {
      new component(view, 'wrapper', {});
    }
    if (!history.state) {
      to('/');
    }
  };

  const render404 = () => {
    alert('없는 페이지입니다.\n메인페이지로 이동합니다.');
    to('/');
  };

  const setView = (target: HTMLElement) => (view = target);

  const setPath = (props: IPath): void => {
    const { path, component } = props;
    paths[path] = component;
  };

  const findPath = (path: string): string | null => {
    const pathname = getPathname(path);
    const target = Object.keys(paths).find(key => getPathname(key) === pathname);
    return target ? target : null;
  };

  const getPathname = (path: string) => {
    const secondPathIndex = path.indexOf('/', path.indexOf('/') + 1);
    if (secondPathIndex) {
      return path.slice(0, secondPathIndex);
    }
    return path;
  };

  init();

  return {
    setView,
    setPath,
    render,
    to,
    redirect,
    back,
  };
}

const router = Router();

export default router;
