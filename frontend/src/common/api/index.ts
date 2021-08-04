import { ID, SignUpParams } from '@constants';
import { Token, CurrentUser } from '@interfaces';
import { getToken } from '@store';
import { PlainAPI, API, VERSION, API_URL } from './api.config';
import { ApiService } from './api.service';

export const refresh = (): Promise<{ data: Token }> =>
  PlainAPI.post(
    '/token',
    {},
    {
      headers: { 'X-CSRF-TOKEN': getToken().csrf, Authorization: `Bearer ${getToken().token}` },
    },
  );
export const userMeApi = (params) => API.get<CurrentUser>(`/users/me/${params}`);

export const get = (url: string, params: any) => PlainAPI.get(url, params);
export const loginAPI = (params: FormData) => PlainAPI.post('/login', params);
export const modifyAPI = (params: FormData) => API.post('/users/update', params);
export const signupAPI = (params: SignUpParams) => API.post('/users/signup', params);
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

export const { infiniteQuery: getUser, update: updateUser } = ApiService('users');
export { API_URL, VERSION };

export const getNotices = async () => {
  const { data } = await API.get(`/notices`);
  return data;
};

export const getNotice = async (params) => {
  const { data } = await API.get(`/notices/${params}`);
  return data;
};

export const getFaqs = async () => {
  const { data } = await API.get(`/faqs`);
  return data;
};

export const getDrivers = async (params, page, sortBy) => {
  const { data } = await API.post(`/users/drivers?page=${page}&sort_by=${sortBy}`, params);
  return data;
};

export const getOneDriver = async (params) => {
  const { data } = await API.get(`users/driver/${params}`);
  return data;
};

export const getDistance = async (params) => {
  const { data } = await API.get(`schedules/distance`, {
    params: {
      departure: params.departure,
      destination: params.destination,
      landing: params.landing,
    },
  });
  return data;
};

export const createReservation = async (params: FormData) => {
  const { data } = await API.post(`reservations/create`, params);
  return data;
};

export const getReservations = async (email, page) => {
  const { data } = await API.get(`reservations?email=${email}&page=${page}`);
  return data;
};

export const updateReservation = async (params) => {
  const { data } = await API.post(`reservations/update`, params);
  return data;
};

export const getBillingKey = async (params) => {
  const { data } = await API.post(`users/billing`, params);
  return data;
};

export const createPayment = async (params) => {
  const { data } = await API.post(`users/payment`, params);
  return data;
};

// export const getRegistrationConfirmed = async (email) => {
//   const { data } = await API.get(`users?email=${email}`);
//   return data;
// };

export const createChatroom = () => async (params: any) => {
  const { data } = await API.post('/chatrooms', params);
  return data;
};

export const getSingleChatroom = (params: any) => async () => {
  const { data } = await API.get('/chatrooms/single', { params });
  return data;
};

export const getChatroom = (id: ID) => async () => {
  const { data } = await API.get(`/chatrooms/${id}`);
  return data;
};

export const createUserChatroom =
  () =>
  async ({ chatroom_id, params }: any) => {
    const { data } = await API.post(`/chatrooms/${chatroom_id}/user_chatrooms`, params);
    return data;
  };
