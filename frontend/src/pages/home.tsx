import React, { useEffect } from 'react';
import {
  f7,
  f7ready,
  Page,
  Navbar,
  NavLeft,
  NavRight,
  Link,
  NavTitle,
  Searchbar,
  Block,
  ListItem,
  List,
  BlockTitle,
  Button,
  Icon,
} from 'framework7-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLikes, lineItemsCount, currentUserState } from '@atoms';
import { getLikes, getObjects, API_URL, getLineItems, getBillingKey } from '@api';
import { useQuery, useQueryClient } from 'react-query';
import { AuthState } from '@constants';
import { showToast } from '@js/utils';
import Categories from '@components/categories/Categories';
import NewItems from '@components/shared/NewItems';
import MainBanner from '@components/shared/MainBanner';
import Footer from '@components/shared/Footer';
import useAuth from '@hooks/useAuth';
import Driver from './users/Driver';

const HomePage = ({ f7route, f7router }) => {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  // const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (f7route.query.hasOwnProperty('result')) {
      switch (f7route.query['result']) {
        case 'success':
          (async () => {
            const updatedUser = await getBillingKey(f7route.query);
            window.history.replaceState({}, document.title, '/');
            setCurrentUser({ ...updatedUser, isAuthenticated: true });
            showToast('카드를 등록하였습니다');
          })();
          break;

        case 'fail':
          (async () => {
            if (f7route.query.code === 'INVALID_CARD_NUMBER') {
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
  }, []);

  return (
    <Page name="home" className="home-page">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>배낭버스</NavTitle>
      </Navbar>
      <Block className="p-4 my-8">
        <Button
          className="justify-start h-12 rounded-2xl bg-gray-300 text-black"
          onClick={() => f7.tab.show('#view-search', true)}
        >
          <p>검색</p>
          <Icon className="searchbar-icon right-4" style={{ left: 'unset' }} />
        </Button>
      </Block>
      <Block className="border-t-2 pt-8">
        <BlockTitle className="text-center text-xl font-bold">내 주변 추천 기사님들</BlockTitle>
      </Block>
      <Footer />
    </Page>
  );
};
export default HomePage;
