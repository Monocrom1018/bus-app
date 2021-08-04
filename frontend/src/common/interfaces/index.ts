import { UserType } from '@constants';
import React from 'react';

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

export interface CurrentUserState {
  isAuthenticated: false;
}

export interface CurrentUser extends CurrentUserState {
  id: number;
  name: string;
  email: string;
  registration_confirmed: boolean;
  uuid: string;
  user_type: UserType;
  profile_img: any;
  password: string;
  password_confirmation: string;
  drivable_legion: string[];
  drivable_date: string[];
  company_name: string;
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
  wifi: boolean;
  sanitizer: boolean;
  fridge: boolean;
  usb: boolean;
  movie: boolean;
  audio: boolean;
  bank: string;
  bank_account: string;
}

export interface Address {
  zipcode: string;
  address1: string;
  address2?: string;
}

export interface InfiniteObjects<T> {
  next_cursor: number;
  total_count: number;
  objects: T[];
}

export interface Reservation {
  id: number;
  departure: string;
  departureDate: Date;
  stopover: string[];
  destination: string;
  returnDate: Date;
  people: number;
  accompany: string;
  price: number;
  status: string;
  // user: Users;
  // driver: User;
}

export interface PointDetail {
  address_name: string;
  category_group_code?: string;
  category_group_name?: string;
  category_name?: string;
  distance?: number;
  id?: number;
  phone?: string;
  place_name: string;
  place_url?: string;
  road_address_name: string;
  x?: number;
  y?: number;
}

export type Point = {
  [name in number | string]: PointDetail[];
};

export interface StopOver {
  id: number | string;
  region: string;
}
export interface Schedule {
  day: string;
  departure?: string;
  destination?: string;
  landing?: string;
  landingState?: boolean;
  returnStopOverCheck?: boolean;
  distance?: number;
  pointList?: any;
  preStopOvers?: StopOver[];
  postStopOvers?: StopOver[];
}
