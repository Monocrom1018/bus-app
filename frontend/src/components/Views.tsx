import React, { useEffect, useState, useCallback } from 'react';
import { Views, View, Toolbar, Link } from 'framework7-react';
import Panel from '@components/shared/Panel';
import useAuth from '@hooks/useAuth';
import LandingPage from '@pages/landing';
import { logoutAPI, refresh } from '@api';
import { destroyToken, getToken } from '@store';
import { sleep } from '@utils/index';

const F7Views = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated, authenticateUser, unAuthenticateUser } = useAuth();

  const logoutHandler = useCallback(async () => {
    try {
      await logoutAPI();
    } finally {
      unAuthenticateUser();
    }
  }, []);

  useEffect(() => {
    (async function checkToken() {
      try {
        // TODO Check Token 구현 필요

        // const response = await refresh();
        // saveToken(response.data);
        authenticateUser(getToken());
      } catch {
        destroyToken();
        unAuthenticateUser();
      } finally {
        await sleep(700);
        setIsLoading(false);
      }
    })();
  }, []);

  // if (isLoading) {
  //   return <LandingPage />;
  // }

  const loggedInViews = () => (
    <Views tabs className="safe-areas">
      <Toolbar tabbar labels bottom>
        <Link tabLink="#view-home" tabLinkActive icon="las la-home" text="홈" />
        <Link tabLink="#view-search" icon="las la-gift" text="검색" />
        <Link tabLink="#view-reservations" icon="las la-address-book" text="일정" />
        <Link tabLink="#view-rooms" icon="las la-edit" text="채팅" />
        <Link tabLink="#view-mypage" icon="las la-user" text="마이페이지" />
      </Toolbar>
      <View id="view-home" stackPages name="home" main tab tabActive url="/" iosDynamicNavbar={false} />
      <View id="view-search" stackPages name="search" tab url="/search?is_main=true/" />
      <View id="view-reservations" stackPages name="reservations" tab url="/reservations?is_main=true" />
      <View id="view-rooms" stackPages name="rooms" tab url="/rooms?is_main=true" />
      <View id="view-mypage" stackPages name="mypage" tab url="/mypage?is_main=true" />
    </Views>
  );

  const loggedOutViews = () => <View id="view-intro" main url="/intro" />;

  return (
    <>
      <Panel handleLogout={logoutHandler} isLoggedIn={isAuthenticated} />
      {isAuthenticated ? loggedInViews() : loggedOutViews()}
    </>
  );
};

export default F7Views;
