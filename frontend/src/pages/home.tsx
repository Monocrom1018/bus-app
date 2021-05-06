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
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userLikes, lineItemsCount, authState } from '@atoms';
import { getLikes, getObjects, API_URL, getLineItems } from '@api';
import Categories from '@components/categories/Categories';
import NewItems from '@components/shared/NewItems';
import MainBanner from '@components/shared/MainBanner';
import { useQuery, useQueryClient } from 'react-query';
import { getRecoilRootState } from '@components/RecoilRootPortal';
import { AuthState } from '@constants';
import Footer from '@components/shared/Footer';
import Driver from './users/Driver';

const HomePage = () => {
  const queryClient = useQueryClient();
  const state = getRecoilRootState(authState);
  const { currentUser } = state.contents as AuthState;

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
        <BlockTitle className="text-center text-xl">내 주변 추천 기사님들</BlockTitle>
        <Driver />
        <Driver />
        <Driver />
        <Driver />
      </Block>
      <Footer />
    </Page>
  );
};
export default HomePage;
