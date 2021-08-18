import { atom, selector, selectorFamily } from 'recoil';
import { CurrentUser, Schedule } from '@interfaces';

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

export const tourScheduleState = atom<Schedule[]>({
  key: 'tourSchedule',
  default: [],
});

export const searchingOptionState = atom({
  key: 'searchingOption',
  default: {
    totalDistance: 0,
    departureDate: new Date(),
    returnDate: '',
    departureTime: '',
    returnTime: '',
    people: null,
  },
});

export const searchingOptionDateSelector = selector({
  key: 'searchingOptionDateSelector',
  get: ({ get }) => {
    const searchingOption = get(searchingOptionState);
    const { departureDate, returnDate } = searchingOption;
    return {
      departureDate,
      returnDate,
    };
  },
});

export const searchingOptionTimeSelector = selector({
  key: 'searchingOptionTimeSelector',
  get: ({ get }) => {
    const searchingOption = get(searchingOptionState);
    const { departureTime, returnTime } = searchingOption;
    return {
      departureTime,
      returnTime,
    };
  },
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
    profile: '',
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
