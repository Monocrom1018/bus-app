import _ from 'lodash';
import HomePage from '@pages/home';
import MyPage from '@pages/mypage';
import LoginPage from '@pages/users/sessions/new';
import SignUpPage from '@pages/users/registrations/new';
import { ResourceRoute } from '@constants';
import ItemIndexPage from '@pages/items/index';
import IntroPage from '@pages/intro';
import { mapResourceRoute, mapAsyncRoute, mergeRoutes } from './routes.utils';
import OptionIndexPage from '@pages/options';

/**
 * @resourceRoutes
 * @param {String} resource (required)
 * @param {Array} only (optional)
 * ex) ['show'] -> [{ path: 'items/:id', component: '@pages/items/show.{jsx|tsx}'}]
 * only 를 명시 안해주면 show, index, new, edit 을 모두 탐색 합니다.
 *
 * @param {Array} collection (optional)
 * ex) ['buy'] -> [{ path: 'items/buy', component: '@pages/items/buy.{jsx|tsx}'}]
 *
 * @param {Array} member (optional)
 * ex) ['my_item'] -> [{ path: 'items/:id/my_item', component: '@pages/items/my_item.{jsx|tsx}'}]
 */
const resourceRoutes: ResourceRoute[] = [
  {
    resource: 'items',
  },
  {
    resource: 'users',
  },
  {
    resource: 'posts',
  },
  {
    resource: 'notices',
  },
  {
    resource: 'faqs',
  },
  {
    resource: 'line_items',
  },
  {
    resource: 'contacts',
  },
];

/**
 * @customRoutes
 * @param {String} path (required)
 * @param {Array} component (required)
 */
const customRoutes = [
  { path: '/', component: HomePage },
  { path: '/intro', component: IntroPage },
  { path: '/users/sign_in', component: LoginPage },
  { path: '/users/sign_up', component: SignUpPage },
  { path: '/mypage', component: MyPage },
  { path: '/items/:item_id/options', component: OptionIndexPage },
];

/**
 * @asyncRoutes
 * @param {String} path (required)
 * @param {React.FC} component (required)
 * asyncRoutes 랑 path 가 중복되면 asyncRoute 를 우선 적용
 */
const asyncRoutes = [{ path: '/items', component: ItemIndexPage }];

const mappedResourceRoutes = resourceRoutes
  .map((resource) => mapResourceRoute(resource))
  .reduce((acc, routes) => [...acc, ...routes], []);

const mappedAsyncRoutes = asyncRoutes.map((route) => mapAsyncRoute(route));

export default mergeRoutes(mappedResourceRoutes, customRoutes, mappedAsyncRoutes);
