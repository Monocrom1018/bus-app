import React from 'react';
import { f7, Page, Navbar, NavLeft, Link, NavTitle, Block, BlockTitle, Button, Icon } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { currentUserState } from '@atoms';
import Footer from '@components/shared/Footer';
import usePostBillingProcess from '@hooks/usePostBillingProcess';

const HomePage = ({ f7route, f7router }) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  usePostBillingProcess(f7route.query, setCurrentUser);

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
