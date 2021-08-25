import jwt_decode from 'jwt-decode';
import { TokenPayload } from '@interfaces';
import moment from 'moment';
import { f7 } from 'framework7-react';

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const convertObjectToFormData = ({ modelName, data }: { modelName: string; data: any }): FormData => {
  const fd = new FormData();
  Object.entries(data).forEach(([k, v]) => fd.append(`${modelName}[${k}]`, `${v}`));
  return fd;
};

export const toFormData = ({ modelName, data }: { modelName: string; data: unknown }): FormData => {
  const fd = new FormData();
  if (typeof data !== 'object') return fd;
  if (data === null) return fd;

  Object.entries(data).forEach(([k, v]) => {
    if (typeof v === 'string' || v instanceof Blob) fd.append(`${modelName}[${k}]`, v);
    if (typeof v === 'number') fd.append(`${modelName}[${k}]`, `${k}`);
    if (v instanceof Date) fd.append(`${modelName}[${k}]`, v.toUTCString());
  });
  return fd;
};

export const formatTime = (time_at: string) => moment(time_at).format('YYYY.MM.DD');

export const formatTimeAgo = (time_at: string) => moment(time_at).fromNow();

export const formatCurrency = (val: string | number) =>
  val
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getCurrentUserFromToken = (token: string) => {
  const { user } = jwt_decode(token) as TokenPayload;
  return user;
};

export const formatPhoneNumber = (phone_number: string) => {
  const original_number = phone_number.replace(/[^0-9]/g, '');
  let formatted_number = '';

  if (original_number.length < 4) {
    return original_number;
  }
  if (original_number.length < 7) {
    formatted_number += original_number.substr(0, 3);
    formatted_number += '-';
    formatted_number += original_number.substr(3);
  } else if (original_number.length < 11) {
    formatted_number += original_number.substr(0, 3);
    formatted_number += '-';
    formatted_number += original_number.substr(3, 3);
    formatted_number += '-';
    formatted_number += original_number.substr(6);
  } else {
    formatted_number = original_number.substr(0, 3);
    formatted_number += '-';
    formatted_number += original_number.substr(3, 4);
    formatted_number += '-';
    formatted_number += original_number.substr(7);
  }
  return formatted_number;
};

export const formatCognitoPhoneNumber = (phone_number: string) => `+82${phone_number.replace(/-/g, '')}`;

export const formatPhoneNumberWithDashed = (cognito_phone_number: string) =>
  formatPhoneNumber(cognito_phone_number.replace('+82', ''));

const handleNotificationClick = (notification) => () => {
  const { currentRoute } = f7.views.current.router;
  switch (notification.target_type) {
    case 'Room':
      if (currentRoute.route.path === '/chatrooms/:id/single') {
        f7.views.current.router.navigate(notification.redirect_to, {
          reloadCurrent: true,
        });
      } else {
        f7.views.current.router.navigate(notification.redirect_to);
      }
      break;
    default:
      break;
  }
};

export const innerNotification = (notification) => {
  if (notification.redirect_to !== f7.views.current.router.currentRoute.path) {
    f7.notification
      .create({
        title: notification.title,
        titleRightText: 'now',
        text: notification.content,
        closeTimeout: 3000,
        closeOnClick: true,
        on: {
          closed: (noti: any) => noti.destroy(),
          click: handleNotificationClick(notification),
        },
      })
      .open();
  }
};
