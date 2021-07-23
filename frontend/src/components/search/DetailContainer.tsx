import { f7, List, ListInput, Button, Checkbox } from 'framework7-react';
import { stopoversState, searchingOptionState } from '@atoms';
import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { getDrivers } from '@api';
import { showToast } from '@js/utils';
import moment from 'moment';

const DetailContainer = () => {
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const [stopovers, setStopovers] = useRecoilState(stopoversState);
  const [tempState, setTempState] = useState({
    stopoverCount: 1,
    lastDestinationCheck: false,
    returnStopoverCheck: false,
    drivers: null,
    pointList: {},
  });

  const { departure, destination, date, returnDate, lastDestination, drivers } = searchingOption;
  const { stopoverCount, lastDestinationCheck, returnStopoverCheck, pointList } = tempState;
  let departDay, searchTarget, itemId;

  const handleSearch = async () => {
    if (departure !== '' && destination !== '' && date[0] !== '' && date[1] !== '') {
      f7.dialog.preloader();
      const searchParam = {
        departure,
        lastDestination,
        destination,
        departureDate: date[0],
        returnDate: date[1],
        stopovers: stopovers.length > 0 ? stopovers : [],
        returnStopoverCheck,
      };
      const { foundDrivers, calculatedDistance } = await getDrivers(searchParam);
      setSearchingOption({ ...searchingOption, drivers: foundDrivers, distance: calculatedDistance });
      f7.dialog.close();
    } else {
      showToast('일정을 모두 입력해주세요');
    }
  };

  const handleAddStopover = async () => {
    if (stopovers.length < 5) {
      setStopovers(stopovers.concat({ id: stopoverCount, stopover: '' }));
      setTempState({ ...tempState, stopoverCount: stopoverCount + 1 });
    }
  };

  const handleDeleteStopover = async (param) => {
    setStopovers(
      stopovers.filter((item) => {
        if (item.id === param) {
          return false;
        }
        return true;
      }),
    );
  };

  const handleLastDestinationCheck = async () => {
    if (tempState.lastDestinationCheck === true) {
      setSearchingOption({ ...searchingOption, lastDestination: '' });
    }
    setTempState({ ...tempState, lastDestinationCheck: !lastDestinationCheck });
  };

  // const handleDepartureDate = async (param) => {
  //   departDay = param;
  //   await setSearchingOption({ ...searchingOption, departureDate: String(param) });
  // };

  // const handleReturnDate = async (param) => {
  //   const format = await moment(param).format('YYYY-MM-DD');
  //   const yesterday = await moment(departDay).subtract(1, 'day').toDate();
  //   const isBefore = moment(format).isBefore(yesterday);
  //   if (isBefore) {
  //     showToast('가는날보다 이릅니다');
  //     return;
  //   }
  //   await setSearchingOption({ ...searchingOption, departureDate: String(departDay), returnDate: String(param) });
  // };

  const handleDepartureSelect = async (point, where, id = null) => {
    if (where === 'departure') {
      setSearchingOption({ ...searchingOption, departure: point });
    }
    if (where === 'destination') {
      setSearchingOption({ ...searchingOption, destination: point });
    }
    if (where === 'lastDestination') {
      setSearchingOption({ ...searchingOption, lastDestination: point });
    }
    if (where === 'stopover') {
      const duplicatedArr = JSON.parse(JSON.stringify(stopovers));
      const mapped = duplicatedArr.map((item) => {
        if (item.id === id) {
          item.stopover = point;
          return item;
        }
        return item;
      });

      setStopovers(mapped);
    }

    setTempState({ ...tempState, pointList: {} });
  };

  const placesSearchCallBack = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const cutData = data.slice(0, 5);

      if (searchTarget === 'stopover') {
        setTempState({ ...tempState, pointList: { [itemId]: cutData } });
      } else {
        setTempState({ ...tempState, pointList: { [searchTarget]: cutData } });
      }
    } else {
      setTempState({ ...tempState, pointList: {} });
    }
  };

  const searchPlaces = async (keyword) => {
    const ps = new kakao.maps.services.Places();

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      return false;
    }

    ps.keywordSearch(keyword, placesSearchCallBack);
  };

  const handlePostCode = (e, value, id) => {
    if (value === 'departure') {
      setSearchingOption({ ...searchingOption, departure: e });
    }

    if (value === 'destination') {
      setSearchingOption({ ...searchingOption, destination: e });
    }

    if (value === 'lastDestination') {
      setSearchingOption({ ...searchingOption, lastDestination: e });
    }

    if (value === 'stopover') {
      const duplicatedArr = JSON.parse(JSON.stringify(stopovers));
      const mapped = duplicatedArr.map((item) => {
        if (item.id === id) {
          item.stopover = e;
          return item;
        }
        return item;
      });

      setStopovers(mapped);
    }

    searchTarget = value;
    itemId = id;
    searchPlaces(e);
  };

  const searchResult = (where, id = null) => {
    return (
      <div className="z-50 absolute left-0 buttom-0 right-0 top-7 bg-white w-auto mx-4 rounded-lg">
        {tempState.pointList[id || where] &&
          tempState.pointList[id || where].map((point) => {
            return (
              <div className="mt-3">
                <a
                  className="font-medium pl-3"
                  onClick={(e) =>
                    handleDepartureSelect(
                      point.road_address_name ? point.road_address_name : point.address_name + ' ' + point.place_name,
                      where,
                      id,
                    )
                  }
                >
                  {point.road_address_name || point.place_name}
                </a>
                <div className="text-gray-500 text-sm pl-3">{point.address_name}</div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
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
            // onCalendarChange={(e) => handleDepartureDate(e[0])}
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
            // onCalendarChange={(e) => handleReturnDate(e[0])}
          />
        </List>

        <div className="flex justify-between">
          <div className="mx-6 mb-2 font-semibold tracking-wider">경로</div>
          {stopovers.length > 0 ? (
            <div className="mr-4">
              <Checkbox
                onChange={() => setTempState({ ...tempState, returnStopoverCheck: !tempState.returnStopoverCheck })}
                className="pb-1 text-sm"
              />
              <span className="ml-1 text-gray-700 text-sm">귀환시에도 경유</span>
            </div>
          ) : null}
        </div>

        {/* <div ref={postCodeRef} className="ml-2" /> */}
        <div className="relative">
          <div className="flex px-4 mb-3">
            <input
              className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
              value={searchingOption.departure}
              placeholder="출발지를 검색해주세요"
              onChange={(e) => handlePostCode(e.currentTarget.value, 'departure', null)}
            />{' '}
          </div>
          {searchResult('departure')}
        </div>
      </div>
      {stopovers.map((item) => (
        <div className="relative" key={item.id}>
          <div className="flex px-4 py-2">
            <button
              className="f7-icons text-xl text-red-500 outline-none"
              onClick={() => handleDeleteStopover(item.id)}
            >
              minus_circle_fill
            </button>
            <input
              className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50"
              value={item.stopover}
              placeholder="최대 5개까지 추가 가능합니다"
              onChange={(e) => handlePostCode(e.currentTarget.value, 'stopover', item.id)}
            />{' '}
          </div>
          {searchResult('stopover', item.id)}
        </div>
      ))}
      <div className="relative">
        <div className="flex px-4 mt-3">
          <input
            className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
            value={searchingOption.destination}
            placeholder="목적지를 검색해주세요"
            onChange={(e) => handlePostCode(e.currentTarget.value, 'destination', null)}
          />{' '}
        </div>
        {searchResult('destination')}
      </div>
      {tempState.lastDestinationCheck ? (
        <div className="relative">
          <div className="flex px-4 mt-6">
            <input
              className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
              value={searchingOption.lastDestination}
              placeholder="귀환지를 검색해주세요"
              onChange={(e) => handlePostCode(e.currentTarget.value, 'lastDestination', null)}
            ></input>{' '}
          </div>
          {searchResult('lastDestination')}
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
  );
};

export default DetailContainer;
