import { List, Button, Checkbox, ListItem, AccordionItem, AccordionContent, AccordionToggle } from 'framework7-react';
import React, { useRef, useState } from 'react';

interface stopOver {
  id: number;
  region: string;
}

const DetailContainer = ({ searchPlaces, day }) => {
  const [tempState, setTempState] = useState({
    departure: '',
    destination: '',
    landing: '',
    landingState: false,
    returnStopOverCheck: false,
    drivers: null,
    pointList: {},
    stopOvers: [],
  });
  const stopOverCount = useRef(1);
  const { returnStopOverCheck, pointList, landingState, stopOvers, departure, destination, landing } = tempState;
  let searchTarget: string;
  let itemId: number;

  const addStopOver = async () => {
    if (stopOvers.length < 6) {
      setTempState((prev) => ({
        ...prev,
        ...{ stopOvers: stopOvers.concat({ id: stopOverCount.current, region: '' }) },
      }));
      stopOverCount.current += 1;
    }
  };

  const deleteStopOver = async (id: number) => {
    setTempState((prev) => ({
      ...prev,
      ...{
        stopOvers: stopOvers.filter((stopOver) => {
          if (stopOver.id === id) {
            return false;
          }
          return true;
        }),
      },
    }));
    stopOverCount.current -= 1;
  };

  // use callback으로 빼기
  const placesSearchCallBack = (data: string, status: any) => {
    const cutData = data.slice(0, 5);
    const kakaoCompleteStatus = 'OK';
    if (status === kakaoCompleteStatus && searchTarget === 'stopOver') {
      setTempState((prev) => ({ ...prev, ...{ pointList: { [itemId]: cutData } } }));
    } else if (status === kakaoCompleteStatus) {
      setTempState((prev) => ({ ...prev, ...{ pointList: { [searchTarget]: cutData } } }));
    } else {
      setTempState((prev) => ({ ...prev, ...{ pointList: {} } }));
    }
  };

  const landingCheck = async () => {
    if (landingState === true) {
      setTempState((prev) => ({ ...prev, ...{ landing: '' } }));
    }
    setTempState((prev) => ({ ...prev, ...{ landingState: !landingState } }));
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

  const departureSelect = async (point: string, where, id = null) => {
    if (where === 'departure') {
      setTempState((prev) => ({ ...prev, ...{ departure: point } }));
    }
    if (where === 'destination') {
      setTempState((prev) => ({ ...prev, ...{ destination: point } }));
    }
    if (where === 'landing') {
      setTempState((prev) => ({ ...prev, ...{ landing: point } }));
    }
    if (where === 'stopOver') {
      const duplicatedArr = JSON.parse(JSON.stringify(stopOvers));
      const mapped = duplicatedArr.map((item: stopOver) => {
        if (item.id === id) {
          item.region = point;
          return item;
        }
        return item;
      });

      setTempState((prev) => ({ ...prev, ...{ stopOvers: mapped } }));
    }

    setTempState((prev) => ({ ...prev, ...{ pointList: {} } }));
  };

  const setPostCode = (value: string, type: string, id: number | null) => {
    if (type === 'stopOver') {
      const duplicatedArr = JSON.parse(JSON.stringify(stopOvers));
      const mapped = duplicatedArr.map((stopOver: stopOver) => {
        if (stopOver.id === id) {
          stopOver.region = value;
          return stopOver;
        }
        return stopOver;
      });
      setTempState((prev) => ({ ...prev, ...{ stopOvers: mapped } }));
    } else {
      setTempState((prev) => ({ ...prev, ...{ [`${type}`]: value } }));
    }

    searchTarget = type;
    itemId = id;
    searchPlaces(value, placesSearchCallBack);
  };

  const searchResult = (where: string, id = null) => (
    <div className="z-50 absolute left-0 buttom-0 right-0 top-7 bg-white w-auto mx-4 rounded-lg">
      {pointList[id || where] &&
        pointList[id || where].map(
          (point: {
            road_address_name: string;
            address_name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
            place_name: string;
          }) => (
            <div className="mt-3">
              <a
                className="font-medium pl-3"
                onClick={() =>
                  departureSelect(point.road_address_name || `${point.address_name} ${point.place_name}`, where, id)
                }
              >
                {point.road_address_name || point.place_name}
              </a>
              <div className="text-gray-500 text-sm pl-3">{point.address_name}</div>
            </div>
          ),
        )}
    </div>
  );

  return (
    <List accordionList noHairlinesMd>
      <AccordionItem opened>
        <AccordionToggle className="px-4 flex justify-between">
          <div className="text-xl font-bold">{day}</div>
          <i className="f7-icons text-gray-400">chevron_down</i>
        </AccordionToggle>
        <AccordionContent>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="mx-6 mb-2 font-semibold tracking-wider">경로</div>
              {stopOvers.length > 0 ? (
                <div className="mr-4">
                  <Checkbox
                    onChange={() => setTempState({ ...tempState, returnStopOverCheck: !returnStopOverCheck })}
                    className="pb-1 text-sm"
                  />
                  <span className="ml-1 text-gray-700 text-sm">귀환시에도 경유</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="relative">
            <div className="flex px-4 mb-3">
              <input
                className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
                value={departure}
                placeholder="출발지를 검색해주세요"
                onChange={(e) => setPostCode(e.currentTarget.value, 'departure', null)}
              />
            </div>
            {searchResult('departure')}
          </div>
          {stopOvers &&
            stopOvers.map((stopOver) => (
              <div className="relative" key={stopOver.id}>
                <div className="flex px-4 py-2">
                  <button
                    className="f7-icons text-xl text-red-500 outline-none"
                    onClick={() => deleteStopOver(stopOver.id)}
                  >
                    minus_circle_fill
                  </button>
                  <input
                    className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50"
                    value={stopOver.region}
                    placeholder="최대 5개까지 추가 가능합니다"
                    onChange={(e) => setPostCode(e.currentTarget.value, 'stopOver', stopOver.id)}
                  />
                </div>
                {searchResult('stopOver', stopOver.id)}
              </div>
            ))}
          <div className="relative">
            <div className="flex px-4 mt-3">
              <input
                className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
                value={destination}
                placeholder="목적지를 검색해주세요"
                onChange={(e) => setPostCode(e.currentTarget.value, 'destination', null)}
              />
            </div>
            {searchResult('destination')}
          </div>
          {landingState ? (
            <div className="relative">
              <div className="flex px-4 mt-6">
                <input
                  className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
                  value={landing}
                  placeholder="귀환지를 검색해주세요"
                  onChange={(e) => setPostCode(e.currentTarget.value, 'landing', null)}
                />
              </div>
              {searchResult('landing')}
            </div>
          ) : null}
          <div className="flex justify-between mx-4 pb-3">
            <Button onClick={addStopOver} className="mt-4" raised>
              경유지 추가
            </Button>
            <Button onClick={landingCheck} className="mt-4" raised>
              출발지와 귀환지가 다른가요?
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </List>
  );
};

export default DetailContainer;
