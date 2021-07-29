/* global kakao */
import { f7, Block, BlockTitle, Link, Navbar, NavLeft, NavTitle, Page, Input, Button, List } from 'framework7-react';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchingOptionState, searchingOptionDateSelector } from '@atoms';
import DetailContainer from '@components/search/DetailContainer';
import DatePopup from '@components/search/DatePopUp';
import TimeDisplay from '@components/search/timeDisplay';
import moment from 'moment';
import { getDrivers } from '@api';
import { showToast } from '@js/utils';
import Driver from './users/Driver';

const SearchPage = () => {
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const { departureDate, returnDate } = useRecoilValue(searchingOptionDateSelector);
  const [popupOpened, setPopupOpened] = useState(false);
  const { distance, drivers, departure, destination, landing } = searchingOption;
  const [tempState, setTempState] = useState({
    stopoverCount: 1,
    landingState: false,
    returnStopoverCheck: false,
    drivers: null,
    pointList: {},
  });
  const KakaoPlaceRef = useRef(null);
  const { returnStopoverCheck } = tempState;
  const dayDiff = returnDate ? moment(returnDate).diff(moment(departureDate), 'days') + 1 : 0;

  useEffect(() => {
    KakaoPlaceRef.current = new (window as any).kakao.maps.services.Places();
  }, []);

  const getDayList = () => {
    const days = [];
    [...Array(dayDiff)].forEach((day, index) => {
      days.push(moment(departureDate).add(index, 'days').format('YY년 MM월 D일'));
    });
    return days;
  };

  const handleSearch = async () => {
    if (departure !== '' && destination !== '' && departureDate !== '' && returnDate !== '') {
      f7.dialog.preloader();
      const searchParam = {
        departure,
        landing,
        destination,
        departureDate,
        returnDate,
        // stopovers: stopovers.length > 0 ? stopovers : [],
        returnStopoverCheck,
      };
      const { foundDrivers, calculatedDistance } = await getDrivers(searchParam);
      setSearchingOption((prev) => ({ ...prev, ...{ drivers: foundDrivers, distance: calculatedDistance } }));
      f7.dialog.close();
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
        <DetailContainer searchPlaces={searchPlaces} day={day} />
      ))}
      <Button onClick={handleSearch} text="검색" className="bg-red-500 text-white mt-8 mx-4 h-10 text-lg" />
      {drivers.length > 0 ? (
        <div>
          <div className="flex justify-between">
            <Input type="select" defaultValue="인기순" className="w-28 mx-4 px-1 border-b-2 border-red-400">
              <option value="인기순">인기순</option>
              <option value="인승">인승</option>
              <option value="최저가격순">최저가격순</option>
            </Input>
            <div className="mx-4 font-medium text-gray-700">거리(왕복) : {distance}km</div>
          </div>
          <div>
            {drivers.map((driver) => (
              <Driver driver={driver} key={driver.id} />
            ))}
          </div>
        </div>
      ) : null}
    </Page>
  );
};

export default SearchPage;
