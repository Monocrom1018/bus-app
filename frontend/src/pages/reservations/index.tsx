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

    if (currentUser.isAuthenticated) {
      getDatas();
    }
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
        {currentUser.isAuthenticated ? (
          <>
            {reservations ? (
              <div>
                {reservations.map((reservation) => {
                  if (userType === 'normal') {
                    return <Reservation reservation={reservation} key={reservation.id} />;
                  } else if (userType === 'driver' || userType === 'comapany') {
                    return <DriverReservationPage reservation={reservation} key={reservation.id} />;
                  }
                })}
              </div>
            ) : (
              <div className="text-center mt-60">
                <i className="f7-icons text-8xl text-gray-400">lock</i>
                <div className="text-xl text-gray-400 mt-4 tracking-wide">예약 내역이 없습니다 :)</div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-60">
            <i className="f7-icons text-8xl text-gray-400">lock</i>
            <div className="text-xl text-gray-400 mt-4 tracking-wide">로그인 후 이용해보세요 :)</div>
          </div>
        )}
      </Block>
    </Page>
  );
};

export default ReservationIndexPage;
