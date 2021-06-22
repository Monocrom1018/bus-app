import React, { useState, useEffect } from 'react';
import { Block, Button, f7, Link, List, ListItem, Navbar, NavLeft, NavTitle, Page } from 'framework7-react';
import Reservation from './Reservation';
import { useRecoilValue } from 'recoil';
import { getReservations } from '@api';
import { reservationState } from '@atoms';
import useAuth from '@hooks/useAuth';

const ReservationIndexPage = () => {
  const test = 'test';
  const [reservations, setReservations] = useState(null);
  const reservationUpdate = useRecoilValue(reservationState);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getDatas = async () => {
      const reservations = await getReservations(currentUser.email);
      setReservations(reservations);
    };
    getDatas();
  }, [reservationUpdate]);

  return (
    <Page name="reservation">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>예약목록</NavTitle>
      </Navbar>
      <Block>
        {reservations ? (
          <div>
            {reservations.map((reservation) => {
              return <Reservation reservation={reservation} key={reservation.id} />;
            })}
          </div>
        ) : null}
      </Block>
    </Page>
  );
};

export default ReservationIndexPage;
