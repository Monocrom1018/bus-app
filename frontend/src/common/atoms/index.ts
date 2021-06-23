import { atom } from 'recoil';
import { CurrentUser, AuthState } from '@constants';

const initialCurrentUser: CurrentUser = {
  email: '',
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

export const departureState = atom({
  key: 'departureState',
  default: '',
});

export const returnDateState = atom({
  key: 'returnDateState',
  default: '',
});

export const departureDateState = atom({
  key: 'departureDateState',
  default: '',
});

export const destinationState = atom({
  key: 'destinationState',
  default: '',
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
  },
});

export const reservationState = atom({
  key: 'reservationState',
  default: null,
});
