import React, { useEffect, useState, useCallback } from 'react';
import { f7, Views, View, Toolbar, Link, Popup, Navbar, Page, Button } from 'framework7-react';
import CustomPanel from '@components/shared/CustomPanel';
import useAuth from '@hooks/useAuth';
import LandingPage from '@pages/Landing';
import { Auth } from '@aws-amplify/auth';
import { onNotificationCreateRecevier } from '@graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { innerNotification } from '@utils';
import { Observable } from 'zen-observable-ts';
import Footer from './shared/Footer';

const F7Views = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [popupOpened, setPopupOpened] = useState(true);
  const { authenticateUser, unAuthenticateUser, currentUser, signOutUser } = useAuth();

  const handleSignout = async () => {
    f7.dialog.confirm('로그아웃 하시겠어요?', async () => {
      await signOutUser();
      window.location.replace('/');
    });
  };

  const normalViews = (
    <Views tabs className="safe-areas">
      {currentUser.isAuthenticated ? null : (
        <Popup className="demo-popup" opened={popupOpened} onPopupClosed={() => setPopupOpened(false)}>
          <Page>
            <Navbar title="배낭버스" />

            <div className="text-center font-bold text-3xl mt-10">버스 대절은 배낭버스</div>

            <div className="flex flex-col text-center items-center mt-16">
              <div className="text-base tracking-widest">
                언제 어디서나
                <br />
                앱을 통해 배낭버스를 이용하세요
              </div>
              <Button className="bg-gray-900 w-32 text-white mt-2">googleStore</Button>
            </div>

            <div className="flex flex-col items-center text-center my-16">
              <i className="fas fa-bus text-6xl" />
              <div className="font-bold text-2xl mt-3">기사님/운수회사 이신가요?</div>
              <div className="m-3 italic text-gray-700">
                배낭버스의 파트너가 되어주세요.
                <br />
                5,000명의 버스기사님들이 <br />
                배낭버스와 함께 수익을 내고 계십니다.
              </div>
              <Button className="border text-lg h-10" onClick={() => setPopupOpened(false)} href="/users/sign_up/intro">
                버스기사/운수회사 회원가입
              </Button>
            </div>

            <Button className="text-lg h-10 py-6" fill onClick={() => setPopupOpened(false)}>
              배낭버스 이용하기
            </Button>

            <Footer />
          </Page>
        </Popup>
      )}
      <Toolbar tabbar labels bottom>
        <Link tabLink="#view-home" tabLinkActive icon="las la-home" text="홈" />
        <Link tabLink="#view-search" icon="las la-gift" text="검색" />
        <Link tabLink="#view-reservations" icon="las la-address-book" text="일정" />
        <Link tabLink="#view-rooms" icon="las la-edit" text="채팅" />
        <Link tabLink="#view-mypage" icon="las la-user" text="마이페이지" />
      </Toolbar>
      <View id="view-home" name="home" main tab tabActive url="/" iosDynamicNavbar={false} />
      <View id="view-search" name="search" tab url="/search/" />
      <View id="view-reservations" name="reservations" tab url="/reservations?is_main=true" />
      <View id="view-rooms" name="rooms" tab url="/rooms?is_main=true" />
      <View id="view-mypage" name="mypage" tab url="/mypage?is_main=true" />
    </Views>
  );

  const driverViews = (
    <Views tabs className="safe-areas">
      <Toolbar tabbar labels bottom>
        <Link tabLink="#view-reservations" tabLinkActive icon="las la-address-book" text="일정" />
        <Link tabLink="#view-rooms" icon="las la-edit" text="채팅" />
        <Link tabLink="#view-mypage" icon="las la-user" text="마이페이지" />
      </Toolbar>
      <View id="view-reservations" stackPages name="reservations" main tab tabActive url="/reservations?is_main=true" />
      <View id="view-rooms" stackPages name="rooms" tab url="/rooms?is_main=true" />
      <View id="view-mypage" stackPages name="mypage" tab url="/mypage?is_main=true" />
    </Views>
  );

  const renderViews = () => {
    if (currentUser.isAuthenticated && currentUser.user_type === 'normal') {
      return normalViews;
    }

    if (currentUser.isAuthenticated && currentUser.user_type === 'driver') {
      return driverViews;
    }

    return normalViews;
  };

  // ? useAuth 에서 로그인, 로그아웃 될때마다 얘는 계속 호출됨
  // const getCognitoUserSession = useCallback(async () => {
  //   try {
  //     const cognitoUser = await Auth.currentAuthenticatedUser();
  //     await authenticateUser(cognitoUser);
  //   } catch (erorr) {
  //     unAuthenticateUser();
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [authenticateUser, unAuthenticateUser]);

  const getCognitoUserSession = useCallback(async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      await authenticateUser(cognitoUser);
    } catch (error) {
      unAuthenticateUser();
    } finally {
      setIsLoading(false);
    }
  }, [authenticateUser, unAuthenticateUser]);

  useEffect(() => {
    getCognitoUserSession();
  }, []);

  useEffect(() => {
    if (currentUser.isAuthenticated) {
      const subscription = (
        API.graphql(
          graphqlOperation(onNotificationCreateRecevier, { receiver_id: currentUser.uuid }),
        ) as Observable<any>
      ).subscribe({
        next: (msg: any) => {
          const notification = msg.value.data.onNotificationCreateRecevier;
          if (notification?.receiver_id !== currentUser.uuid) return;
          innerNotification(notification);
        },
      });
      return () => subscription.unsubscribe();
    }
    return () => {};
  }, [currentUser]);

  // useEffect(() => {
  //   getCognitoUserSession();
  // }, [getCognitoUserSession]);

  if (isLoading) return <LandingPage />;

  return (
    <>
      <CustomPanel handleLogout={handleSignout} isLoggedIn={currentUser.isAuthenticated} currentUser={currentUser} />
      {renderViews()}
    </>
  );
};

export default F7Views;
