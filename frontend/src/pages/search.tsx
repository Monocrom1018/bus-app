import {
  f7,
  Block,
  BlockTitle,
  Button,
  Link,
  List,
  ListInput,
  Navbar,
  NavLeft,
  NavTitle,
  Page,
  Input,
  Checkbox,
} from 'framework7-react';
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import {
  returnDateState,
  departureDateState,
  departureState,
  destinationState,
  distanceState,
  stopoversState,
  lastDestinationState,
} from '@atoms';
import Driver from './users/Driver';
import { getDrivers } from '../common/api/index';
import moment from 'moment';
import { showToast } from '@js/utils';

const SearchPage = () => {
  const test = 'test';
  const [departure, setDeparture] = useRecoilState(departureState);
  const [departureDate, setDepartureDate] = useRecoilState(departureDateState);
  const [returnDate, setReturnDate] = useRecoilState(returnDateState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const [lastDestination, setLastDestination] = useRecoilState(lastDestinationState);
  const [distance, setDistance] = useRecoilState(distanceState);
  const [stopovers, setStopovers] = useRecoilState(stopoversState);
  const [stopoverCount, setStopoverCount] = useState(0);
  const [lastDestinationCheck, setLastDestinationCheck] = useState(false);
  const [returnStopoverCheck, setReturnStopoverCheck] = useState(false);
  const [drivers, setDrivers] = useState(null);
  const postCodeRef = useRef();
  let departDay;

  const handleSearch = async () => {
    if (departure !== '' && destination !== '' && departureDate !== '' && returnDate !== '') {
      f7.dialog.preloader();
      const searchParam = {
        departure,
        departureDate,
        lastDestination,
        returnDate,
        destination,
        stopovers: stopovers.length > 0 ? stopovers : [],
        returnStopoverCheck,
      };
      const { foundDrivers, calculatedDistance } = await getDrivers(searchParam);
      setDrivers(foundDrivers);
      setDistance(calculatedDistance);
      f7.dialog.close();
    } else {
      showToast('일정을 모두 입력해주세요');
    }
  };

  const handleAddStopover = async () => {
    if (stopovers.length < 5) {
      setStopovers(stopovers.concat({ id: stopoverCount, stopover: '' }));
      setStopoverCount(stopoverCount + 1);
    }
  };

  const handleDeleteStopover = async (param) => {
    setStopovers(
      stopovers.filter((item) => {
        if (item.id !== param) {
          return true;
        }
      }),
    );
  };

  const handleLastDestinationCheck = async () => {
    if (lastDestinationCheck === true) {
      setLastDestination('');
    }

    setLastDestinationCheck(!lastDestinationCheck);
  };

  const handleDepartureDate = async (param) => {
    departDay = param;
    await setDepartureDate(String(param));
  };

  const handleReturnDate = async (param) => {
    const format = await moment(param).format('YYYY-MM-DD');
    const isBefore = moment(format).isBefore(departDay);
    if (isBefore) {
      showToast('가는날 이후를 선택해주세요');
      return;
    }

    setReturnDate(String(param));
  };

  const handlePostCode = (e, value, id) => {
    new daum.Postcode({
      oncomplete: (data) => {
        if (value === 'departure') {
          setDeparture(data.address);
        }

        if (value === 'destination') {
          setDestination(data.address);
        }

        if (value === 'lastDestination') {
          setLastDestination(data.address);
        }

        if (value === 'stopover') {
          let duplicatedArr = JSON.parse(JSON.stringify(stopovers));
          let mapped = duplicatedArr.map((item) => {
            if (item.id === id) {
              item.stopover = data.address;
              return item;
            }
            return item;
          });

          setStopovers(mapped);
        }
      },
      width: 360,
      height: 466,
    }).embed(postCodeRef.current);
  };

  return (
    <Page name="search">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>검색</NavTitle>
      </Navbar>
      <Block className="my-10">
        <BlockTitle className="text-center text-xl text-gray-900">내용을 입력하고 예약해보세요</BlockTitle>
      </Block>
      <List noHairlinesMd>
        <div className="flex flex-col">
          <div className="mx-6 mt-6 -mb-6 font-semibold tracking-wider">일정</div>
          <List className="bg-gray-50">
            <ListInput
              label="가는날 및 탑승시간"
              type="datepicker"
              placeholder="가는날과 탑승시간을 선택해주세요"
              readonly
              calendarParams={{
                timePicker: true,
                openIn: 'customModal',
                footer: true,
                dateFormat: 'yyyy년 mm월 dd일 hh시 :mm분',
                disabled: {
                  to: new Date(),
                },
              }}
              className="bg-gray-50"
              onCalendarChange={(e) => handleDepartureDate(e[0])}
            />
            <ListInput
              label="오는날 및 탑승시간"
              type="datepicker"
              placeholder="오는날과 탑승시간을 선택해주세요"
              readonly
              calendarParams={{
                timePicker: true,
                openIn: 'customModal',
                footer: true,
                dateFormat: 'yyyy년 mm월 dd일 hh시 :mm분',
                disabled: {
                  to: new Date(),
                },
              }}
              className="bg-gray-50"
              onCalendarChange={(e) => handleReturnDate(e[0])}
            />
          </List>

          <div className="flex justify-between">
            <div className="mx-6 mb-2 font-semibold tracking-wider">경로</div>
            {stopovers.length > 0 ? (
              <div className="mr-4">
                <Checkbox onChange={() => setReturnStopoverCheck(!returnStopoverCheck)} className="pb-1 text-sm" />
                <span className="ml-1 text-gray-700 text-sm">귀환시에도 경유</span>
              </div>
            ) : null}
          </div>

          <div ref={postCodeRef} className="ml-2"></div>

          <div className="flex px-4 mb-3">
            <input
              className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
              readOnly
              value={departure}
              placeholder="출발지를 검색해주세요"
              onClick={(e) => handlePostCode(e.currentTarget.value, 'departure', null)}
            ></input>{' '}
          </div>
        </div>
        {stopovers.map((item) => {
          return (
            <div className="flex px-4 py-2" key={item.id}>
              <button
                className="f7-icons text-xl text-red-500 outline-none"
                onClick={() => handleDeleteStopover(item.id)}
              >
                minus_circle_fill
              </button>
              <input
                className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50"
                readOnly
                value={item.stopover}
                placeholder="최대 5개까지 추가 가능합니다"
                onClick={(e) => handlePostCode(e.currentTarget.value, 'stopover', item.id)}
              ></input>{' '}
            </div>
          );
        })}
        <div className="flex px-4 mt-3">
          <input
            className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
            readOnly
            value={destination}
            placeholder="목적지를 검색해주세요"
            onClick={(e) => handlePostCode(e.currentTarget.value, 'destination', null)}
          ></input>{' '}
        </div>
        {lastDestinationCheck ? (
          <div className="flex px-4 mt-6">
            <input
              className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
              readOnly
              value={lastDestination}
              placeholder="귀환지를 검색해주세요"
              onClick={(e) => handlePostCode(e.currentTarget.value, 'lastDestination', null)}
            ></input>{' '}
          </div>
        ) : null}
        <div className="flex justify-between mx-4">
          <Button onClick={handleAddStopover} className="mt-4" raised>
            경유지 추가
          </Button>
          <Button onClick={handleLastDestinationCheck} className="mt-4" raised>
            출발지와 귀환지가 다른가요?
          </Button>
        </div>
        <Button onClick={handleSearch} text="검색" className="bg-red-500 text-white mt-8 mx-4 h-10 text-lg" />
      </List>

      {drivers ? (
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
            {drivers.map((driver) => {
              return <Driver driver={driver} key={driver.id} />;
            })}
          </div>
        </div>
      ) : null}
    </Page>
  );
};

export default SearchPage;
