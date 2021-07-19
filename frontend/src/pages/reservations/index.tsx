/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import { Block, Link, Navbar, NavLeft, NavTitle, Page } from 'framework7-react';
import { getReservations } from '@api';
import useAuth from '@hooks/useAuth';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { REACT_QUERY_KEYS } from '@constants';
import DriverReservationPage from './DriverReservation';
import ReservationPage from './Reservation';

const ReservationIndexPage = () => {
  const { currentUser } = useAuth();

  const { data, isError, error, fetchNextPage, isLoading, refetch } = useInfiniteQuery(
    REACT_QUERY_KEYS.RESERVATION,
    // eslint-disable-next-line consistent-return
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

  const { ref: targetRef, inView: isTargetInView } = useInView({
    threshold: 1,
  });

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
            <Block>{(error as any).message}</Block>
          ) : (
            <>
              {reservations.length > 0 ? (
                <>
                  {reservations.map((reservation) => {
                    if (currentUser.user_type === 'normal') {
                      return <ReservationPage reservation={reservation} refetch={refetch} key={reservation.id} />;
                    } else {
                      return <DriverReservationPage reservation={reservation} refetch={refetch} key={reservation.id} />;
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
