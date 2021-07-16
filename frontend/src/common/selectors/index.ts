import _ from 'lodash';
import { selector, selectorFamily } from 'recoil';
import { CurrentUser } from '@interfaces';
import { userLikes, currentUserState } from '@atoms';

export const authSelector = selector({
  key: 'authSelector',
  get: ({ get }) => get(currentUserState),
  set: ({ set }, newcurrentUserState: CurrentUser) => set(currentUserState, newcurrentUserState),
});

export const getLikeIds = selectorFamily({
  key: 'likeIds',
  get:
    (model_name: string) =>
    ({ get }) => {
      const likes = get(userLikes);
      return likes[model_name] || [];
    },
});
