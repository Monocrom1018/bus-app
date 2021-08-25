import { f7, Link, Navbar, NavLeft, NavTitle, Page, Input, Button } from 'framework7-react';
import { Dom7 as $$ } from 'framework7/lite-bundle';
import { sleep } from '@utils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchingOptionState, searchingOptionDateSelector, tourScheduleState } from '@atoms';
import DetailContainer from '@components/search/DetailContainer';
import DatePopup from '@components/search/DatePopUp';
import TimeDisplay from '@components/search/timeDisplay';
import moment from 'moment';
import { useInView } from 'react-intersection-observer';
import { getDistance, getDrivers } from '@api';
import { showToast } from '@js/utils';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import ListPreloader from '@components/shared/ListPreloader';
import Driver from './users/Driver';

const SearchPage = () => {
  const KakaoPlaceRef = useRef(null);
  const allowInfinite = useRef(true);
  const queryClient = useQueryClient();
  const [isInfinite, setIsInfinite] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const [tourSchedule, setTourSchedule] = useRecoilState(tourScheduleState);
  const latestTourSchedule = useRef(tourSchedule);
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const { totalDistance } = useRecoilValue(searchingOptionState);
  const { departureDate, returnDate } = useRecoilValue(searchingOptionDateSelector);
  const dayDiff = returnDate ? moment(returnDate).diff(moment(departureDate), 'days') + 1 : 0;
  const { ref: targetRef, inView: isTargetInView } = useInView({
    threshold: 1,
  });
  let sortBy = 'createdAtDesc';

  useEffect(() => {
    KakaoPlaceRef.current = new (window as any).kakao.maps.services.Places();
  }, []);

  // const { data, isLoading, isError, error, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
  //   InfiniteObjects<CurrentUser>
  // >(
  const { data, isLoading, isError, error, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['drivers'],
    async ({ pageParam: page = 1 }) => {
      console.log(hasNextPage, isInfinite, page);
      const response = await getDrivers({ ...searchingOption, schedule: latestTourSchedule.current }, page, sortBy);
      return response.data || [];
    },
    {
      enabled: isInfinite,
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    },
  );
  const drivers = useMemo(() => data?.pages?.flat() || [], [data]);
  const isDriverPresent: boolean = !!hasNextPage && !isLoading && data.pages.flat().length !== 0;

  const fetchNextPageAsync = useCallback(async () => {
    allowInfinite.current = false;
    await fetchNextPage();
    // await sleep(300);
    allowInfinite.current = true;
  }, [fetchNextPage]);

  useEffect(() => {
    console.log(isTargetInView, allowInfinite.current);
    if (!isTargetInView || !allowInfinite.current) return;
    fetchNextPageAsync();
  }, [isTargetInView, fetchNextPageAsync]);

  const getDayList = () => {
    const days = [];
    if (dayDiff >= 0) {
      [...Array(dayDiff)].forEach((day, index) => {
        days.push(moment(departureDate).add(index, 'days').format('YY년 MM월 D일'));
      });
    }
    return days;
  };

  const sortDrivers = async (value) => {
    sortBy = value;
    queryClient.removeQueries(['drivers']);
    await refetch();
    allowInfinite.current = true;
  };

  const getResult = async () => {
    if (departureDate !== null && returnDate !== '') {
      f7.dialog.preloader();
      data?.pages.length > 0 && (data.pages = []);
      const copiedTourSchedule = JSON.parse(JSON.stringify(tourSchedule));
      copiedTourSchedule.length === 1 &&
        copiedTourSchedule.push({
          day: copiedTourSchedule[0].day,
          departure: copiedTourSchedule[0].destination,
          destination: copiedTourSchedule[0].departure,
          stopOvers: copiedTourSchedule[0].stopOvers,
        });
      const schedulePromise = [];
      try {
        copiedTourSchedule.forEach((schedule: any) => {
          const { departure, destination, stopOvers } = schedule;
          const promise = getDistance({ departure, destination, stopOvers }).then((distance) => {
            schedule.distance = distance;
            setSearchingOption({ ...searchingOption, totalDistance: totalDistance + distance });
            return schedule;
          });
          schedulePromise.push(promise);
        });
        const addDistanceSchedules = await Promise.all(schedulePromise);
        latestTourSchedule.current = addDistanceSchedules;
        setTourSchedule(addDistanceSchedules);
        setIsInfinite(true);
        await fetchNextPage();
        f7.dialog.close();
      } catch (err) {
        queryClient.resetQueries('drivers', { exact: true });
        setIsInfinite(false);

        if (err.response.data.error.message === 'empty data exist') {
          f7.dialog.close();
          showToast('경로를 모두 입력해주세요');
          return;
        }
        if (err.response.data.error.message === 'over 1000km') {
          f7.dialog.close();
          showToast('하루의 일정중 1000km가 넘어간 일정이 있습니다. <br> 1000km이하의 경로만 요청 가능합니다.');
          return;
        }
      }

      const accordions = $$('.accordion-item');
      accordions.each((el) => {
        if ([...el.classList].includes('accordion-item-opened')) {
          f7.accordion.close(`#${el.id}`);
        }
      });
    } else {
      showToast('일정을 모두 입력해주세요');
    }
  };

  const searchPlaces = async (keyword: string, callback: any) => {
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      return false;
    }
    return KakaoPlaceRef.current.keywordSearch(keyword, callback);
  };

  return (
    <Page name="search">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>검색</NavTitle>
      </Navbar>
      <TimeDisplay setPopupOpened={setPopupOpened} />
      <DatePopup popupOpened={popupOpened} setPopupOpened={setPopupOpened} />
      {getDayList().map((day, index) => (
        <DetailContainer
          key={`detail-${day}`}
          searchPlaces={searchPlaces}
          day={day}
          index={index}
          lastIndex={dayDiff - 1}
        />
      ))}
      <Button onClick={getResult} text="검색" className="bg-red-500 text-white my-32 mx-4 h-10 text-lg" />
      {!!data && isDriverPresent && isInfinite && (
        <div ref={targetRef}>
          <div className="flex justify-between">
            <Input
              type="select"
              defaultValue={sortBy}
              className="w-28 mx-4 px-1 border-b-2 border-red-400"
              onChange={(e) => sortDrivers(e.target.value)}
            >
              <option value="createdAtDesc">최신순</option>
              <option value="peopleAsc">낮은인승순</option>
              <option value="peopleDesc">높은인승순</option>
              <option value="chargeAsc">낮은가격순</option>
            </Input>
          </div>
          <div>
            {drivers.map((driver) => (
              <Driver driver={driver} key={`driver-${driver.id}`} />
            ))}
          </div>
        </div>
      )}
      {allowInfinite.current && !!data && !isDriverPresent && (
        <div className="text-center">
          <i className="f7-icons text-6xl text-gray-400 -mt-10">exclamationmark_bubble</i>
          <div className="text-xl text-gray-400 mt-4 tracking-wide">검색 결과가 없습니다</div>
        </div>
      )}
      {hasNextPage && <ListPreloader ref={targetRef} />}
    </Page>
  );
};

export default SearchPage;
