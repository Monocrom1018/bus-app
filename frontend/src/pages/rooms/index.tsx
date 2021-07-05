import useAuth from '@hooks/useAuth';
import { Button, f7, Link, List, Navbar, NavLeft, NavTitle, Page } from 'framework7-react';
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import Room from './Room';

const RoomIndexPage = () => {
  const { currentUser } = useAuth();
  const rooms = [];

  return (
    <Page name="room">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>채팅목록</NavTitle>
      </Navbar>
      {currentUser.isAuthenticated ? (
        // 나중에 room 생기면 유저에게 room이 존재하는지에 따른 분기 한 번 더 필요함
        <List mediaList style={{ margin: 0 }}>
          <ul>
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
          </ul>
        </List>
      ) : (
        <div className="text-center mt-60">
          <i className="f7-icons text-8xl text-gray-400">lock</i>
          <div className="text-xl text-gray-400 mt-4 tracking-wide">로그인 후 이용해보세요 :)</div>
        </div>
      )}
    </Page>
  );
};

export default RoomIndexPage;
