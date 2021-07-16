import React from 'react';
import { Router } from 'framework7/types';
import { CognitoUser } from '@aws-amplify/auth';
import { CognitoIdToken, CognitoAccessToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import packageJson from '../../../package.json';
import { fromPairs } from 'lodash';

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

// export interface Route {
//   path: string;
//   component?: React.FunctionComponent;
//   async?: any;
// }

// export interface ResourceRoute {
//   resource: string;
//   collection?: string[];
//   member?: string[];
//   only?: ('show' | 'edit' | 'new' | 'index')[];
// }

/** 인터페이스 */
/* User Auth Interfaces */
export interface Token {
  token: null | string;
  csrf: null | string;
}

export interface AuthState extends Token {
  // isLoading: boolean;
  currentUser: any; // TODO currentUser 인터페이스화
}

export interface TokenPayload {
  user: any; // TODO IToknePayload any 타입 변경
}

export interface Like {
  id: number;
  target_type: string;
  target_id: number;
}

/* Routes Interfaces */

export interface Route {
  path: string;
  component?: React.FunctionComponent;
  async?: any;
}

export interface ResourceRoute {
  resource: string;
  collection?: string[];
  member?: string[];
  only?: ('show' | 'edit' | 'new' | 'index')[];
}

interface CurrentUserState {
  isAuthenticated: boolean;
}

export interface CurrentUser extends CurrentUserState {
  email: string;
  // TODO
  name: string;
  uuid: string;
  user_type: string;
  profile_img: any;
  password: string;
  password_confirmation: string;
  drivable_legion: string[];
  drivable_date: string[];
  company: string;
  bus_number: string;
  bus_type: string;
  bus_old: string;
  people_available: number;
  introduce: string;
  basic_charge: number;
  basic_km: number;
  night_charge: number;
  charge_per_km: number;
  night_begin: string;
  night_end: string;
  charge_per_day: number;
  service_charge: number;
  card_registerd: boolean;
  card_company: string;
  card_number: string;
  peak_charge: number;
  peak_charge_per_km: number;
}

export interface Address {
  zipcode: string;
  address1: string;
  address2?: string;
}
