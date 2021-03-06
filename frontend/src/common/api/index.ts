import { ID, SignUpParams, S3Image, Token, CurrentUser } from '@interfaces';

import { getToken } from '@store';
import { PlainAPI, API, VERSION, API_URL } from './api.config';
import { ApiService } from './api.service';

interface DefaultParams {
  [key: string]: any;
}

interface UpdatePayloadProps {
  id?: ID;
  [key: string]: any;
}

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
export const updateAPI = (params: DefaultParams = {}) => API.post('/users/update', params);
export const signupAPI = (params: DefaultParams = {}) => API.post('/users/signup', params);
export const logoutAPI = () => API.delete('/logout');
export const resetPasswordApi = (params: any) => PlainAPI.get('/users/reset-password', params);

export const getSmsAuth = (params) => API.get('/phone_certifications/sms_auth', { params });
export const deleteImage = (id, params) => API.delete(`/images/${id}`, { params });
export const getLikes = () => API.get('/likes');

// 일반적인 경우는 Ojbect API 사용하기
export const {
  query: getObjects,
  infiniteQuery: getInfiniteObjects,
  get: getObject,
  create: createObject,
  update: updateObject,
  destroy: destroyObject,
} = ApiService('objects');

export const {
  query: getImages,
  get: getImage,
  create: createImage,
  update: updateImage,
  destroy: destroyImage,
} = ApiService<S3Image>('images');

export const bulkCreateImages = async (params: DefaultParams) => {
  const { data } = await API.post<S3Image[]>(`/images/bulk`, params);
  return data;
};

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

export const getDrivers = async (params, page, sortBy, searchBy) => {
  const { data } = await API.post(`/users/drivers?page=${page}&sort_by=${sortBy}&search_by=${searchBy}`, params);
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
      stopOvers: params.stopOvers,
      destination: params.destination,
    },
  });
  return data;
};

export const getDriversByRegion = async (x, y) => {
  const { data } = await API.get(`users/driversByRegion?x=${x}&y=${y}`);
  return data;
};

export const createReservation = async (params) => {
  const { data } = await API.post(`reservations/create`, params);
  return data;
};

export const createSchedules = async (params) => {
  const { data } = await API.post(`schedules/create`, params);
  return data;
};

export const getReservations = async (email, status, page) => {
  const { data } = await API.get(`reservations?email=${email}&status=${status}&page=${page}`);
  return data;
};

export const updateReservation = async (params, id) => {
  const { data } = await API.patch(`reservations/${id}`, params);
  return data;
};

export const getBillingKey = async (params) => {
  const { data } = await API.post(`users/getBilling`, params);
  return data;
};

export const deleteBillingKey = async () => {
  const { data } = await API.delete(`users/deleteBilling`);
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

export const createImageAPI = (params: FormData) => API.post('/images', params);

export const destroyImageAPI = (params: FormData) => API.delete('/images', { data: params });

export const createReview = (params: object) => API.post('reviews/create', params);

export const getReviews = (driverId: ID) => API.get(`reviews?driver=${driverId}`);

export const getTargetReview = (reservationId: ID) => API.get(`reviews?reservation=${reservationId}`);

export const updateReviews = (params: object, id: ID) => API.patch(`reviews/${id}`, params);