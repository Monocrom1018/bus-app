import { API } from './api.config';

export const ApiService = (resourceName) => {
  // const singleResourceName = pluralize.singular(resourceName);
  // const isObjects = resourceName === 'objects';
  // const queryKey = (model_name = null) => (isObjects ? ['objects', model_name] : resourceName);
  // const infiniteQueryKey = (model_name = null) =>
  //   isObjects ? ['objectsInfinite', model_name] : `${resourceName}Infinite`;
  // const getKey = (id, model_name = null) =>
  //   isObjects ? ['object', model_name, id] : [singleResourceName, id];

  const query = (params) => async () => {
    const { data } = await API.get(`/${resourceName}`, { params });
    return data;
  };

  const infiniteQuery =
    (params) =>
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
