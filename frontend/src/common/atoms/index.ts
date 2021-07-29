import { atom, selector } from 'recoil';
import { CurrentUser } from '@interfaces';

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
    returnDate: '',
    distance: 0,
    departureTime: '',
    returnTime: '',
    date: [], // 전체 일정
    schedule: [], // 세부 일정
  },
});

export const searchingOptionDateSelector = selector({
  key: 'searchingOptionDateSelector',
  get: ({ get }) => {
    const searchingOption = get(searchingOptionState);
    return {
      departureDate: searchingOption.date[0] && searchingOption.date[0],
      returnDate: searchingOption.date[1] && searchingOption.date[1],
    };
  },
});

export const searchingOptionTimeSelector = selector({
  key: 'searchingOptionTimeSelector',
  get: ({ get }) => {
    const searchingOption = get(searchingOptionState);
    return {
      departureTime: searchingOption.departureTime,
      returnTime: searchingOption.returnTime,
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
