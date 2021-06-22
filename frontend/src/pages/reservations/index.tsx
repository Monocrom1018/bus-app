import React, { useState, useEffect } from 'react';
import { Block, Button, f7, Link, List, ListItem, Navbar, NavLeft, NavTitle, Page } from 'framework7-react';
import Reservation from './Reservation';
import DriverReservationPage from './DriverReservation';
import { useRecoilValue } from 'recoil';
import { getReservations, userMeApi } from '@api';
import { reservationState } from '@atoms';
import useAuth from '@hooks/useAuth';

const ReservationIndexPage = () => {
  const test = 'test';
  const [reservations, setReservations] = useState(null);
  const reservationUpdate = useRecoilValue(reservationState);
  const { currentUser } = useAuth();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const getDatas = async () => {
      const user = await userMeApi(currentUser.email);
      setUserType(user.data.user_type);
      const reservationsData = await getReservations(currentUser.email);
      setReservations(reservationsData);
    };
    getDatas();
  }, [reservationUpdate]);

  return (
    <Page name="DriverReservation">
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
              if (userType === 'normal') {
                return <Reservation reservation={reservation} key={reservation.id} />;
              } else {
                return <DriverReservationPage reservation={reservation} key={reservation.id} />;
              }
            })}
          </div>
        ) : null}
      </Block>
    </Page>
  );
};

export default ReservationIndexPage;
