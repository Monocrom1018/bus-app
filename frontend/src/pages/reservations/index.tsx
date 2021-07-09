import React, { useState, useMemo } from 'react';
import { Block, Button, f7, Link, List, ListItem, Navbar, NavLeft, NavTitle, Page } from 'framework7-react';
import { useRecoilValue } from 'recoil';
import { getReservations, userMeApi } from '@api';
import { reservationState } from '@atoms';
import useAuth from '@hooks/useAuth';
import { useInfiniteQuery } from 'react-query';
import DriverReservationPage from './DriverReservation';
import Reservation from './Reservation';

const ReservationIndexPage = () => {
  const test = 'test';
  const { currentUser } = useAuth();

  const { data, isError, error, fetchNextPage, isLoading, refetch } = useInfiniteQuery(
    'reservations',
    async ({ pageParam: page = 1 }) => {
      if (currentUser.isAuthenticated) {
        const response = await getReservations(currentUser.email, page);
        return response || [];
      }
    },
    {
      getNextPageParam: (lastPage, pages) => (pages ? pages.length + 1 : 1),
    },
  );

  const reservations = useMemo(() => data?.pages?.flat() || [], [data]);

  const reload = async (done = null) => {
    await refetch();
    if (done) done();
  };

  const loadMore = async () => {
    if (!isLoading && data.pages?.slice(-1)[0]?.length > 0) {
      await fetchNextPage();
    }
  };

  return (
    <Page
      name="DriverReservation"
      ptr
      ptrPreloader
      onPtrRefresh={reload}
      infinite
      infinitePreloader={isLoading}
      onInfinite={loadMore}
    >
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>예약목록</NavTitle>
      </Navbar>
      <Block>
        {currentUser.isAuthenticated ? (
          isLoading ? (
            <div>로딩중입니다</div>
          ) : isError ? (
            <Block>{error['message']}</Block>
          ) : (
            // todo : 여기서 유저타입이 기사인 경우와 승객인 경우를 또 분기해야 함
            <>
              {reservations.length > 0 ? (
                <>
                  {reservations.map((reservation) => {
                    if (currentUser.user_type === 'normal') {
                      return <Reservation reservation={reservation} refetch={refetch} />;
                    } else {
                      return <DriverReservationPage reservation={reservation} refetch={refetch} />;
                    }
                  })}
                </>
              ) : (
                <div className="text-center mt-60">
                  <i className="f7-icons text-8xl text-gray-400">lock</i>
                  <div className="text-xl text-gray-400 mt-4 tracking-wide">예약 내역이 없습니다 :)</div>
                </div>
              )}
            </>
          )
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
