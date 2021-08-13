import { ID } from '@constants';
import { API } from './api.config';

interface Params<T = any> {
  model_name?: string;
  // q?: RansackQuery<T> & { s?: string | string[] };
  [key: string]: any;
}

interface MemberPayloadProps {
  id: ID;
}

export const ApiService = <ModelType = any, ResponseType = any>(resourceName: string) => {
  const query =
    <T = ModelType>(params: Params<T> = {}) =>
    async () => {
      const { data } = await API.get<T>(`/${resourceName}`, { params });
      return data;
    };

  const infiniteQuery =
    <T = ModelType>(params: Params<T>) =>
    async ({ pageParam = 1 }) => {
      const { data } = await API.get<T>(`/${resourceName}?cursor=${pageParam}`, { params });
      return data;
    };

  const get =
    <T = ModelType>(id: ID, params: Params<T> = {}) =>
    async () => {
      const { data } = await API.get<T>(`/${resourceName}/${id}`, { params });
      return data;
    };

  const create =
    <T = ModelType>(params: Params<T> = {}) =>
    async (payload?: any) => {
      const { data } = await API.post<T>(`/${resourceName}`, payload, { params });
      return data;
    };

  const update =
    <T = ModelType, TProps = MemberPayloadProps>(params: Params = {}) =>
    async (payload: TProps & MemberPayloadProps) => {
      const { id, ..._payload } = payload;
      const { data } = await API.patch<T>(`/${resourceName}/${id}`, _payload, { params });
      return data;
    };

  const destroy =
    <T = ResponseType>(params: Params<T> = {}) =>
    async (id: ID) => {
      const { data } = await API.delete<T>(`/${resourceName}/${id}`, { params });
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
