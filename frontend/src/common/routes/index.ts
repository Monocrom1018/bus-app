import _ from 'lodash';
import HomePage from '@pages/home';
import MyPage from '@pages/mypage';
import ModifyPage from '@pages/users/modify';
import SearchPage from '@pages/search';
import LoginPage from '@pages/users/sessions/new';
import NormalSignUpPage from '@pages/users/registrations/normal';
import DriverSignUpPage from '@pages/users/registrations/driver';
import SignUpIntroPage from '@pages/users/registrations/intro';
import { ResourceRoute } from '@constants';
import ItemIndexPage from '@pages/items/index';
import IntroPage from '@pages/intro';
import OptionIndexPage from '@pages/options';
import SignUpPage from '@pages/users/registrations/new';
import DriverDetailPage from '@pages/DriverDetail';
import CompanySignUpPage from '@pages/users/registrations/company';
import EstimatePage from '@pages/estimates';
import DriverReservationPage from '@pages/reservations/DriverReservation';
import { mapResourceRoute, mapAsyncRoute, mergeRoutes } from './routes.utils';
import driverModifyPage from '@pages/users/driverModify';

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
    only: ['index', 'show'],
  },
  {
    resource: 'faqs',
    only: ['index'],
  },
  {
    resource: 'estimates',
    only: ['index'],
  },
  {
    resource: 'line_items',
  },
  {
    resource: 'contacts',
  },
  {
    resource: 'reservations',
  },
  {
    resource: 'rooms',
  },
  {
    resource: 'driverlists',
  },
];

/**
 * @customRoutes
 * @param {String} path (required)
 * @param {Array} component (required)
 */
const customRoutes = [
  { path: '/', component: HomePage },
  { path: '/mypage', component: MyPage },
  { path: '/intro', component: IntroPage },
  { path: '/search', component: SearchPage },
  { path: '/users/sign_in', component: LoginPage },
  { path: '/users/sign_up/new', component: SignUpPage },
  { path: '/users/sign_up/normal', component: NormalSignUpPage },
  { path: '/users/sign_up/driver', component: DriverSignUpPage },
  { path: '/users/sign_up/company', component: CompanySignUpPage },
  { path: '/users/sign_up/intro', component: SignUpIntroPage },
  { path: '/users/modify', component: ModifyPage },
  { path: '/users/driverModify', component: driverModifyPage },
  { path: '/items/:item_id/options', component: OptionIndexPage },
  { path: '/drivers/:id', component: DriverDetailPage },
  { path: '/drivers/:id/esimate', component: EstimatePage },
  { path: '/driverReservation', component: DriverReservationPage },
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
