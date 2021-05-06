import React, { useRef } from 'react';
import { Block, Button, f7, Link, List, ListItem, Navbar, NavLeft, NavTitle, Page } from 'framework7-react';
import Reservation from './Reservation';

const ReservationIndexPage = () => {
  const test = 'test';

  return (
    <Page>
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>예약목록</NavTitle>
      </Navbar>
      <Block>
        <Reservation />
        <Reservation />
        <Reservation />
        <Reservation />
      </Block>
    </Page>
  );
};

export default ReservationIndexPage;
