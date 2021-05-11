import { Token } from '@constants';
import { getToken } from '@store';
import { PlainAPI, API, VERSION, API_URL } from './api.config';
import { ApiService } from './api.service';
import { async } from 'q';

export const refresh = (): Promise<{ data: Token }> =>
  PlainAPI.post(
    '/token',
    {},
    {
      headers: { 'X-CSRF-TOKEN': getToken().csrf, Authorization: `Bearer ${getToken().token}` },
    },
  );

export const get = (url: string, params: any) => PlainAPI.get(url, params);
export const loginAPI = (params: FormData) => PlainAPI.post('/login', params);
export const signupAPI = (params: FormData) => PlainAPI.post('/signup', params);
export const logoutAPI = () => API.delete('/logout');

/* TODO : parameter type 지정 (위에는 샘플로 해두었습니다) */
export const getSmsAuth = (params) => API.get('/phone_certifications/sms_auth', { params });
export const getImages = (params) => API.get(`/images`, { params });
export const deleteImage = (id, params) => API.delete(`/images/${id}`, { params });
export const getLikes = () => API.get('/likes');
/* TODO */

// 일반적인 경우는 Ojbect API 사용하기
export const {
  query: getObjects,
  infiniteQuery: getInfiniteObjects,
  get: getObject,
  create: createObject,
  update: updateObject,
  destroy: destroyObject,
} = ApiService('objects');

export const { infiniteQuery: getInfiniteItems, get: getItem } = ApiService('items');
export { API_URL, VERSION };

export const createLike = () => async (params) => {
  const { data } = await API.post('/likes', params);
  return data;
};

export const deleteLike = () => async (id) => {
  const { data } = await API.delete(`/likes/${id}`);
  return data;
};

export const getOptions = (itemId) => async () => {
  const { data } = await API.get(`/items/${itemId}/options`);
  return data;
};

export const getLineItems = () => async () => {
  const { data } = await API.get(`/line_items`);
  return data;
};

export const createLineItem = () => async (params) => {
  const { data } = await API.post('/line_items', params);
  return data;
};

export const deleteLineItem = () => async (lineItemId) => {
  const { data } = await API.delete(`/line_items/${lineItemId}`);
  return data;
};

export const changeLineItemQuantity = (lineItemId) => async (params) => {
  const { data } = await API.post(`/line_items/${lineItemId}/quantity`, params);
  return data;
};

export const getNotices = async () => {
  const { data } = await API.get(`/notices`);
  return data;
};

export const getNotice = async (params) => {
  const { data } = await API.get(`/notices/${params}`);
  return data;
};
