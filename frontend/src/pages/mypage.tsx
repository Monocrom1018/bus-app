import React, { useEffect, useState, useCallback } from 'react';
import useAuth from '@hooks/useAuth';
import { logoutAPI } from '@api';
import { f7, Navbar, Page, NavLeft, NavTitle, Link, Button, List } from 'framework7-react';

const MyPage = () => {
  const { isAuthenticated, authenticateUser, unAuthenticateUser } = useAuth();

  const a = 'T';

  const logoutHandler = useCallback(async () => {
    try {
      await logoutAPI();
    } finally {
      unAuthenticateUser();
    }
  }, []);

  return (
    <Page ptr ptrPreloader>
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>마이페이지</NavTitle>
      </Navbar>

      <div className="m-4 flex items-center">
        <div className="mr-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=wffnP1KziQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            width="64"
            height="64"
            className="radius"
          />
        </div>
        <div className="flex-shrink-1 margin-left">
          <h4 className="text-lg font-bold">홍길동</h4>
          <p className="text-sm text-gray-600">test01@bus.com</p>
        </div>
      </div>

      <List linksList>
        <li>
          <a href="/users/modify">회원정보 수정</a>
        </li>
        <li>
          <a href="#">저장한 일정</a>
        </li>
        <li>
          <a href="/notices">공지사항</a>
        </li>
        <li>
          <a href="/faqs">자주 묻는 질문</a>
        </li>
        <li>
          <a href="/contacts">이메일 문의</a>
        </li>
        <li>
          <a onClick={logoutHandler}>로그아웃</a>
        </li>
      </List>
    </Page>
  );
};

export default MyPage;
