import React, { useEffect } from 'react';
import { f7, Navbar, Page, NavLeft, NavTitle, Link } from 'framework7-react';

const MyPage = () => {
  return (
    <Page name="mypage">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>마이페이지</NavTitle>
      </Navbar>
    </Page>
  );
};

export default MyPage;
