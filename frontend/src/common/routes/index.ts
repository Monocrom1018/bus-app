import _ from 'lodash';
import HomePage from '@pages/Home';
import MyPage from '@pages/Mypage';
import EditPage from '@pages/users/Edit';
import SearchPage from '@pages/Search';
import LoginPage from '@pages/users/sessions/New';
import NormalSignUpPage from '@pages/users/registrations/Normal';
import DriverSignUpPage from '@pages/users/registrations/Driver';
import SignUpIntroPage from '@pages/users/registrations/Intro';
import { ResourceRoute } from '@interfaces';
import IntroPage from '@pages/Intro';
import DriverDetailPage from '@pages/DriverDetail';
import CompanySignUpPage from '@pages/users/registrations/Company';
import EstimatePage from '@pages/estimates';
import DriverReservationPage from '@pages/reservations/DriverReservation';
import DriverEditPage from '@pages/users/DriverEdit';
import CardPage from '@pages/users/Card';
import NewPasswordPage from '@pages/users/passwords/new';
import { mapResourceRoute, mapAsyncRoute, mergeRoutes } from './routes.utils';
import PastReservationListPage from '@pages/reservations/PastReservationList';
import CreateReviewPage from '@pages/reviews/Create';
import EditReviewPage from '@pages/reviews/Edit';

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
  {
    resource: 'chatrooms',
    only: ['index', 'show'],
    member: ['single'],
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
  { path: '/users/sign_up/normal', component: NormalSignUpPage },
  { path: '/users/sign_up/driver', component: DriverSignUpPage },
  { path: '/users/sign_up/company', component: CompanySignUpPage },
  { path: '/users/sign_up/intro', component: SignUpIntroPage },
  { path: '/users/passwords/new', component: NewPasswordPage },
  { path: '/users/card', component: CardPage },
  { path: '/users/modify', component: EditPage },
  { path: '/users/driverEdit', component: DriverEditPage },
  { path: '/drivers/:id', component: DriverDetailPage },
  { path: '/driverReservation', component: DriverReservationPage },
  { path: '/reviews/create/:id', component: CreateReviewPage },
  { path: '/reviews/edit/:id', component: EditReviewPage },
  { path: '/reservations/pastReservationList', component: PastReservationListPage },
];

/**
 * @asyncRoutes
 * @param {String} path (required)
 * @param {React.FC} component (required)
 * asyncRoutes 랑 path 가 중복되면 asyncRoute 를 우선 적용
 */
const asyncRoutes = [];

const mappedResourceRoutes = resourceRoutes
  .map((resource) => mapResourceRoute(resource))
  .reduce((acc, routes) => [...acc, ...routes], []);

const mappedAsyncRoutes = asyncRoutes.map((route) => mapAsyncRoute(route));

export default mergeRoutes(mappedResourceRoutes, customRoutes, mappedAsyncRoutes);
