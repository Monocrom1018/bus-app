import { f7, Link, Navbar, NavLeft, NavTitle, Page, Input, Button, Preloader } from 'framework7-react';
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
import { useInfiniteQuery } from 'react-query';
import Driver from './users/Driver';

const SearchPage = () => {
  const KakaoPlaceRef = useRef(null);
  const allowInfinite = useRef(true);
  const [isInfinite, setIsInfinite] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const [tourSchedule, setTourSchedule] = useRecoilState(tourScheduleState);
  const latestTourSchedule = useRef(tourSchedule);
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const { departureDate, returnDate, people } = useRecoilValue(searchingOptionDateSelector);
  const dayDiff = returnDate ? moment(returnDate).diff(moment(departureDate), 'days') + 1 : 0;
  const { ref: targetRef, inView: isTargetInView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    KakaoPlaceRef.current = new (window as any).kakao.maps.services.Places();
  }, []);

  const { data, isLoading, isError, error, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'drivers',
    async ({ pageParam: page = 1 }) => {
      const sortBy = 'created_at';
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
    // await sleep(200);
    allowInfinite.current = true;
  }, [fetchNextPage]);

  useEffect(() => {
    if (!isTargetInView || !allowInfinite.current) return;
    fetchNextPageAsync();
  }, [isTargetInView]);

  const getDayList = () => {
    const days = [];
    if (dayDiff >= 0) {
      [...Array(dayDiff)].forEach((day, index) => {
        days.push(moment(departureDate).add(index, 'days').format('YY년 MM월 D일'));
      });
    }
    return days;
  };

  const getResult = async () => {
    if (departureDate !== null && returnDate !== '') {
      f7.dialog.preloader();
      data?.pages.length > 0 && (data.pages = []);
      const copiedTourSchedule = JSON.parse(JSON.stringify(tourSchedule));
      const schedulePromise = [];
      try {
        copiedTourSchedule.forEach((schedule: any) => {
          const { departure, destination, stopOvers } = schedule;
          const promise = getDistance({ departure, destination, stopOvers }).then((distance) => {
            schedule.distance = distance;
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
      } catch (error) {
        if (error.response.data.error.message === 'empty data exist') {
          f7.dialog.close();
          showToast('경로를 모두 입력해주세요');
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
      <div className="flex px-4 mb-2">
        <input
          className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
          value={people}
          placeholder="탑승인원수를 숫자만 입력해주세요"
          onChange={(e) => setSearchingOption({ ...searchingOption, people: e.target.value })}
        />
      </div>

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
      {!!data && isDriverPresent && (
        <div ref={targetRef}>
          <div className="flex justify-between">
            <Input type="select" defaultValue="인기순" className="w-28 mx-4 px-1 border-b-2 border-red-400">
              <option value="인승">인승</option>
              <option value="최저가격순">최저가격순</option>
            </Input>
          </div>
          <div>
            {drivers.map((driver) => (
              <Driver driver={driver} key={driver.id} />
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
      {hasNextPage && isLoading && <Preloader size={16} />}
    </Page>
  );
};

export default SearchPage;
