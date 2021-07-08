import React, { useEffect, useState, useCallback } from 'react';
import useAuth from '@hooks/useAuth';
import { logoutAPI } from '@api';
import { f7, Navbar, Page, NavLeft, NavTitle, Link, Button, List } from 'framework7-react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '@atoms';

const MyPage = () => {
  const { signOutUser, authenticateUser, unAuthenticateUser, currentUser } = useAuth();
  const user = useRecoilValue(currentUserState);
  const { email, name, profile_img } = user;
  const a = 'T';

  const logoutHandler = useCallback(async () => {
    try {
      await logoutAPI();
    } finally {
      unAuthenticateUser();
    }
  }, []);

  const handleSignout = () => {
    f7.dialog.confirm('로그아웃 하시겠어요?', async () => {
      await signOutUser();
      location.replace('/');
    });
  };

  return (
    <Page ptr ptrPreloader>
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>마이페이지</NavTitle>
      </Navbar>

      <div className="ml-4 mt-6 -mb-3 flex items-center ">
        <div className="mr-4">
          <img
            src={
              profile_img ||
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=wffnP1KziQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            width="64"
            height="64"
            className="rounded-full"
          />
        </div>
        <div className="flex-shrink-1">
          <h4 className="text-lg font-bold">{name || '비회원'}</h4>
          <p className="text-sm text-gray-600">{email || '로그인하시고 모든 서비스를 이용하세요'}</p>
        </div>
      </div>

      {currentUser.isAuthenticated ? (
        <List linksList>
          <li>
            <a href="/notices">공지사항</a>
          </li>
          <li>
            <a href="/faqs">자주 묻는 질문</a>
          </li>
          <li>
            <a href="#">저장한 일정</a>
          </li>
          <li>
            <a href="/contacts">이메일 문의</a>
          </li>
          <li>
            {currentUser.user_type === 'normal' ? (
              <>
                <a href="/users/modify">회원정보 수정</a>
                <a href="/users/card">카드목록</a>
              </>
            ) : (
              <a href="/users/driverModify">회원정보 수정</a>
            )}
          </li>
          <li>
            <a onClick={handleSignout}>로그아웃</a>
          </li>
        </List>
      ) : (
        <List linksList>
          <li>
            <a href="/notices">공지사항</a>
          </li>
          <li>
            <a href="/faqs">자주 묻는 질문</a>
          </li>
          <li>
            <a href="/users/sign_in">로그인</a>
          </li>
          <li>
            <a href="/users/sign_up/intro">회원가입</a>
          </li>
        </List>
      )}
    </Page>
  );
};

export default MyPage;
