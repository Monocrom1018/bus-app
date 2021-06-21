import React, { useEffect, useState, useCallback } from 'react';
import { Views, View, Toolbar, Link } from 'framework7-react';
import CustomPanel from '@components/shared/CustomPanel';
import useAuth from '@hooks/useAuth';
import LandingPage from '@pages/landing';
import { logoutAPI, refresh } from '@api';
import { destroyToken, getToken } from '@store';
import { sleep } from '@utils/index';
import { Auth } from '@aws-amplify/auth';

const F7Views = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { authenticateUser, unAuthenticateUser, currentUser, signOutUser } = useAuth();

  const renderViews = () => {
    if (currentUser.isAuthenticated && currentUser.user_type === 'normal') {
      console.log('111111');
      console.log(currentUser);
      return normalViews;
    }

    if (currentUser.isAuthenticated && currentUser.user_type === 'driver') {
      console.log('22222222');
      console.log(currentUser);
      return driverViews;
    }

    if (currentUser.isAuthenticated && currentUser.user_type === 'company') {
      console.log('333333333');
      console.log(currentUser);
      return driverViews;
    }

    return <View id="view-intro" main url="/intro" />;
  };

  const normalViews = (
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

  const driverViews = (
    <Views tabs className="safe-areas">
      <Toolbar tabbar labels bottom>
        <Link tabLink="#view-reservations" tabLinkActive icon="las la-address-book" text="일정" />
        <Link tabLink="#view-rooms" icon="las la-edit" text="채팅" />
        <Link tabLink="#view-mypage" icon="las la-user" text="마이페이지" />
      </Toolbar>
      <View
        id="view-reservations"
        stackPages
        name="reservations"
        main
        tab
        tabActive
        url="/driverReservation?is_main=true"
      />
      <View id="view-rooms" stackPages name="rooms" tab url="/rooms?is_main=true" />
      <View id="view-mypage" stackPages name="mypage" tab url="/mypage?is_main=true" />
    </Views>
  );

  const getCognitoUserSession = useCallback(async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      await authenticateUser(cognitoUser);
    } catch (erorr) {
      unAuthenticateUser();
    } finally {
      setIsLoading(false);
    }
  }, [authenticateUser, unAuthenticateUser]);

  useEffect(() => {
    getCognitoUserSession();
  }, [getCognitoUserSession]);

  if (isLoading) return <LandingPage />;

  return (
    <>
      <CustomPanel handleLogout={signOutUser} isLoggedIn={currentUser.isAuthenticated} currentUser={currentUser} />
      {renderViews()}
    </>
  );
};

export default F7Views;
