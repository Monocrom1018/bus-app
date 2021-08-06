import { Router } from 'framework7/types';
import packageJson from '../../../package.json';

export * from './schema';
export * from './api';

/** 리터럴 혹은 불변 객체 */
export const TOKEN_KEY = `${packageJson.name}_TOKEN`;
export const CSRF_KEY = `${packageJson.name}_CSRF`;
export const ACTIONS = {
  NEW: 'new',
  INDEX: 'index',
  EDIT: 'edit',
  SHOW: 'show',
};

export const DEFAULT_ACTIONS = Object.values(ACTIONS);

export type UserType = 'normal' | 'driver' | 'company';

export const REACT_QUERY_KEYS = {
  RESERVATION: 'reservation',
};

export interface Objects<T> {
  total_pages: number;
  total_count: number;
  objects: T[];
}

export interface PageRouteProps {
  f7route: Router.Route;
  f7router: Router.Router;
}

export interface InfiniteAppSync<T> {
  nextToken: string;
  items: T[];
}
