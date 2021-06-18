import { atom } from 'recoil';

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
