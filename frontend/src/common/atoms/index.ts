import { atom } from 'recoil';
import { CurrentUser, CurrentUserState } from '@interfaces';
import { string } from 'prop-types';

const initialCurrentUser: CurrentUser = {
  isAuthenticated: false,
};

export const currentUserState = atom<CurrentUser>({
  key: 'currentUser',
  default: initialCurrentUser,
});

export const userLikes = atom({
  key: 'userLikes',
  default: {},
});

export const lineItemsCount = atom({
  key: 'lineItems',
  default: 0,
});

export const searchingOptionState = atom({
  key: 'searchingOption',
  default: {
    departure: '',
    destination: '',
    lastDestination: '',
    departureDate: '',
    returnDate: '',
    distance: 0,
    drivers: [],
  },
});

export const stopoversState = atom({
  key: 'stopoversState',
  default: [],
});

export const distanceState = atom({
  key: 'distanceState',
  default: 0,
});

export const totalChargeState = atom({
  key: 'totalChargeState',
  default: 0,
});

export const driverState = atom({
  key: 'driverState',
  default: {
    id: null,
    name: '',
    bus_old: '',
    bus_type: '',
    company_name: '',
    people_available: 0,
    profile_img: '',
    sanitizer: false,
    movie: false,
    wifi: false,
    audio: false,
    fridge: false,
    usb: false,
    introduce: null,
  },
});

export const reservationState = atom({
  key: 'reservationState',
  default: null,
});
