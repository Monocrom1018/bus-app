import { Router } from 'framework7/types';
import { User } from './schema';

export interface CurrentUserType {
  isCoach: boolean;
  isExpert: boolean;
  isNormal: boolean;
  isAdmin: boolean;
  isNonCurrentUser: boolean;
  isProUser: boolean;
  isUser: boolean;
}

export interface LoginApiParams {
  email: string;
  password: string;
}

export interface CurrentUserSelector extends CurrentUserType {
  currentUser: User;
}

export interface F7Route {
  f7route: Router.Route;
  f7router: Router.Router;
}

export interface AnyObject {
  [key: string]: unknown;
}

export interface TossPaymentResultQuery {
  code: 'PAY_PROCESS_CANCELED';
  message: string;
  orderId: string;
  paymentId: string;
  result: 'fail' | 'success';
  paymentKey: string;
}
