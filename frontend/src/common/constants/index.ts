import packageJson from '../../../package.json';

// export * from './schema';
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
