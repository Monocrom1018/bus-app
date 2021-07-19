import jwt_decode from 'jwt-decode';
import { TokenPayload } from '@interfaces';

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const convertObjectToFormData = ({ modelName, data }: { modelName: string; data: any }): FormData => {
  const fd = new FormData();
  Object.entries(data).forEach(([k, v]) => fd.append(`${modelName}[${k}]`, `${v}`));
  return fd;
};

export const getCurrentUserFromToken = (token: string) => {
  const { user } = jwt_decode(token) as TokenPayload;
  return user;
};
