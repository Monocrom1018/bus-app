import { DEFAULT_ACTIONS, ACTIONS } from '@constants';
import { ResourceRoute, Route } from '@interfaces';
import { Auth } from 'aws-amplify';
import IntroPage from '@pages/intro';

const isActionMember = { index: false, new: false, edit: true, show: true };

const reduceRoute = (resource: string, routeArray: Array<string>, member: boolean): Route[] =>
  routeArray.reduce((routes: Route[], routeName: string) => {
    try {
      const isMember = typeof member === 'boolean' ? member : isActionMember[routeName];
      const route = buildRoute(resource, routeName, isMember);
      routes.push(route);
      return routes;
    } catch {
      return routes;
    }
  }, []);

const mapResourceRoute = (_resource: ResourceRoute): Route[] => {
  const { resource, collection = [], member = [], only = DEFAULT_ACTIONS } = _resource;
  const [onlyRoutes, collectionRoutes, memberRoutes] = [
    reduceRoute(resource, only, null),
    reduceRoute(resource, collection, false),
    reduceRoute(resource, member, true),
  ];

  return [...onlyRoutes, ...collectionRoutes, ...memberRoutes];
};

function buildRoute(resource: string, actionName: string, isMember: boolean): Route {
  let path = `/${resource}`;

  switch (actionName) {
    case ACTIONS.SHOW:
      path += '/:id';
      break;
    case ACTIONS.EDIT:
      path += '/:id/edit';
      break;
    case ACTIONS.NEW:
      path += '/new';
      break;
    case ACTIONS.INDEX:
      break;
    default:
      path += isMember ? `/:id/${actionName}` : `/${actionName}`;
  }

  // eslint-disable-next-line import/no-dynamic-require
  return { path, component: require(`@pages/${resource}/${actionName}`).default };
}

function mapAsyncRoute(asyncRoute: any) {
  return {
    path: asyncRoute.path,
    async: ({ resolve }) =>
      Auth.currentSession()
        .then(() => {
          resolve({ component: asyncRoute.component });
        })
        .catch(() => {
          resolve({ component: IntroPage });
        }),
  };
}

function mergeRoutes(resourceRoutes, customRoutes, asyncRoutes) {
  const asyncPaths = asyncRoutes.map((route) => route.path);
  const filteredResourceRoutes = resourceRoutes.filter((route) => !asyncPaths.includes(route.path));
  const filteredCustomRoutes = customRoutes.filter((route) => !asyncPaths.includes(route.path));
  return [...filteredResourceRoutes, ...filteredCustomRoutes, ...asyncRoutes];
}

export { mapResourceRoute, mapAsyncRoute, mergeRoutes };
