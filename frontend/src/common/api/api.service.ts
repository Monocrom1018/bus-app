import { API } from './api.config';

export const ApiService = (resourceName) => {
  const query = (params: any) => async () => {
    const { data } = await API.get(`/${resourceName}`, { params });
    return data;
  };

  const infiniteQuery =
    (params: any) =>
    async ({ pageParam = 1 }) => {
      const { data } = await API.get(`/${resourceName}?cursor=${pageParam}`, { params });
      return data;
    };

  const get =
    ({ id, ...params }) =>
    async () => {
      const { data } = await API.get(`/${resourceName}/${id}`, { params });
      return data;
    };

  const create = (params) => async (newObj) => {
    const { data } = await API.post(`/${resourceName}`, { ...newObj, ...params });
    return data;
  };

  const update =
    ({ id, ...params }) =>
    async (obj) => {
      const { data } = await API.patch(`/${resourceName}/${id}`, { ...obj, ...params });
      return data;
    };

  const destroy =
    ({ id, ...params }) =>
    async () => {
      const { data } = await API.delete(`/${resourceName}/${id}`, { params });
      return data;
    };

  return {
    query,
    infiniteQuery,
    get,
    create,
    update,
    destroy,
  };
};
