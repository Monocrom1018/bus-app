import { Button, f7, Link, List, Navbar, NavLeft, NavTitle, Page } from 'framework7-react';
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import Room from './Room';

const RoomIndexPage = () => {
  const rooms = [];

  return (
    <Page name="room">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>채팅목록</NavTitle>
      </Navbar>
      <List mediaList style={{ margin: 0 }}>
        <ul>
          <Room />
          <Room />
          <Room />
          <Room />
          <Room />
        </ul>
      </List>
    </Page>
  );
};

export default RoomIndexPage;
