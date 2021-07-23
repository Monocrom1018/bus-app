import { CurrentUser } from '@interfaces';
import { useEffect } from 'react';
import { SetterOrUpdater } from 'recoil';
import { getBillingKey } from '@api';
import { showToast } from '@js/utils';

type f7RouteQuery = {
  result: string;
  code: string;
};

const usePostBillingProcess = (f7routeQuery: f7RouteQuery, setCurrentUser: SetterOrUpdater<CurrentUser>) => {
  useEffect(() => {
    if (f7routeQuery.hasOwnProperty('result')) {
      switch (f7routeQuery.result) {
        case 'success':
          (async () => {
            const updatedUser = await getBillingKey(f7routeQuery);
            window.history.replaceState({}, document.title, '/');
            setCurrentUser({ ...updatedUser, isAuthenticated: true });
            showToast('카드를 등록하였습니다');
          })();
          break;

        case 'fail':
          (async () => {
            if (f7routeQuery.code === 'INVALID_CARD_NUMBER') {
              showToast('신용카드가 아니거나, 카드번호를 잘못 입력하셨습니다');
            }
            window.history.replaceState({}, document.title, '/');
            showToast('카드 등록에 실패했습니다.');
          })();
          break;

        default:
          throw new Error('예상치 못한 오류가 발생하였습니다');
      }
    }
  }, [f7routeQuery, setCurrentUser]);
};

export default usePostBillingProcess;
