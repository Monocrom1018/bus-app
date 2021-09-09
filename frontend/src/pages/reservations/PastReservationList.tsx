import React, { useMemo } from 'react';
import { Page, Navbar } from 'framework7-react';
import SimpleCard from '@components/reservations/SimpleCard';
import useAuth from '@hooks/useAuth';
import { REACT_QUERY_KEYS } from '@constants';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { getReservations } from '@api';

const PastReservationListPage = () => {
  const { currentUser } = useAuth();

  const { data, isError, error, fetchNextPage, isLoading, refetch } = useInfiniteQuery(
    REACT_QUERY_KEYS.RESERVATION,
    async ({ pageParam: page = 1 }) => {
      if (currentUser.isAuthenticated) {
        const response = await getReservations(currentUser.email,'all', page);
        return response || [];
      } else {
        return [];
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
      ptr
      ptrPreloader
      onPtrRefresh={reload}
      infinite
      infinitePreloader={isLoading}
      onInfinite={loadMore}
    >
      <Navbar title="예약내역" backLink />
      <>
        {reservations && reservations.length > 0 ? (
          <>
            {reservations.map((reservation) => {
              if (currentUser.user_type === 'normal') {
                return <SimpleCard reservation={reservation} key={reservation?.id || ''} />;
              }
              return (
                <div>기사의 경우 다른 화면 렌더링</div>
              );
            })}
          </>
        ) : (
          <div className="text-center mt-60">
            <i className="f7-icons text-8xl text-gray-400">lock</i>
            <div className="text-xl text-gray-400 mt-4 tracking-wide">예약 내역이 없습니다 :)</div>
          </div>
        )}
      </>
    </Page>
  );
};

export default PastReservationListPage;