import store from '../store';
interface IRouteInfo {
  path: string;
  redirect?: string;
  component?: any;
  middleware?: () => boolean | Promise<boolean>;
}

interface IRoutes {
  [key: string]: {
    redirect?: string;
    component?: any;
    middleware?: () => boolean | Promise<boolean>;
  };
}

interface IPathParam {
  [key: string]: string | number;
}

interface IState {
  [key: string]: any;
}

interface IRouter {
  setView: (target: HTMLElement) => void;
  setPath: (routeInfo: IRouteInfo[]) => void;
  render: (path: string, state?: unknown) => void;
  to: (path: string, state?: IState) => void;
  redirect: (path: string, state?: IState) => void;
  back: () => void;
}

function Router(): IRouter {
  const paths: IRoutes = {};
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

  const render = async (path: string) => {
    const pathsKey = eraseQuery(path);
    const pathInfo = paths[pathsKey];
    if (!pathInfo) {
      render404();
      return;
    }
    if (pathInfo.redirect) {
      redirect(pathInfo.redirect);
      return;
    }
    if (pathInfo.middleware) {
      const funcType = pathInfo.middleware.constructor.name;
      if (funcType === 'Function' && !pathInfo.middleware()) return;
      else if (funcType === 'AsyncFunction') {
        const result = await pathInfo.middleware();
        if (!result) return;
      }
    }
    if (pathInfo.component) {
      new pathInfo.component(view, 'content-wrapper', {});
      store.commit({ type: 'setRouteActive', stateName: 'routeActive', value: pathsKey });
    }
  };
  const eraseQuery = (path: string) => {
    const resultArr = path.split('?');
    return resultArr[0];
  };

  const render404 = () => {
    alert('없는 페이지입니다.\n메인페이지로 이동합니다.');
    to('/');
  };

  const setView = (target: HTMLElement) => (view = target);

  const setPath = (routeInfo: IRouteInfo[]): void => {
    routeInfo.forEach(obj => {
      paths[obj.path] = {};
      if (obj.redirect) paths[obj.path].redirect = obj.redirect;
      if (obj.component) paths[obj.path].component = obj.component;
      if (obj.middleware) paths[obj.path].middleware = obj.middleware;
    });
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
