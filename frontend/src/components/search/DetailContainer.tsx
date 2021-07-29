import { List, Button, AccordionItem, AccordionContent, AccordionToggle } from 'framework7-react';
import React, { useRef, useState } from 'react';
import { PointDetail, Schedule, StopOver } from '@interfaces';

const DetailContainer = ({ searchPlaces, day }) => {
  const [tempState, setTempState] = useState<Schedule>({
    departure: '',
    destination: '',
    landing: '',
    landingState: false,
    returnStopOverCheck: false,
    pointList: {},
    preStopOvers: [],
    postStopOvers: [],
  });

  const preStopOverCount = useRef(1);
  const postStopOverCount = useRef(1);
  const { pointList, preStopOvers, postStopOvers, departure, destination, landing } = tempState;
  let searchTarget: string;
  let stopOverId: number;

  const addStopOver = async (type: string) => {
    const stopOvers = type === 'preStopOvers' ? preStopOvers : postStopOvers;
    const stopOverCount = type === 'preStopOvers' ? preStopOverCount : postStopOverCount;
    if (stopOvers.length < 2) {
      setTempState((prev) => ({
        ...prev,
        ...{ [`${type}`]: stopOvers.concat({ id: stopOverCount.current, region: '' }) },
      }));
      stopOverCount.current += 1;
    }
  };

  const deleteStopOver = async (id: number, type: string) => {
    const stopOvers = type === 'preStopOvers' ? preStopOvers : postStopOvers;
    const stopOverCount = type === 'preStopOvers' ? preStopOverCount : postStopOverCount;
    setTempState((prev) => ({
      ...prev,
      ...{
        [`${type}`]: stopOvers.filter((stopOver) => {
          if (stopOver.id === id) {
            return false;
          }
          return true;
        }),
      },
    }));
    stopOverCount.current -= 1;
  };

  const placesSearchCallBack = (data: string, status: any) => {
    const cutData = data.slice(0, 5);
    const kakaoCompleteStatus = 'OK';
    const isSearchTargetStopOver = searchTarget === 'preStopOvers' || searchTarget === 'postStopOvers';
    if (status === kakaoCompleteStatus && isSearchTargetStopOver) {
      setTempState((prev) => ({ ...prev, ...{ pointList: { [stopOverId]: cutData } } }));
    } else if (status === kakaoCompleteStatus) {
      setTempState((prev) => ({ ...prev, ...{ pointList: { [searchTarget]: cutData } } }));
    } else {
      setTempState((prev) => ({ ...prev, ...{ pointList: {} } }));
    }
  };

  const departureSelect = async (value: string, type: string, id = null) => {
    const stopOvers = type === 'preStopOvers' ? preStopOvers : postStopOvers;
    const isTypeStopOver = type === 'preStopOvers' || type === 'postStopOvers';

    if (isTypeStopOver) {
      const duplicatedArr = JSON.parse(JSON.stringify(stopOvers));
      const mapped = duplicatedArr.map((item: StopOver) => {
        if (item.id === id) {
          item.region = value;
          return item;
        }
        return item;
      });

      setTempState((prev) => ({ ...prev, ...{ [`${type}`]: mapped } }));
    }

    if (type === 'departure' || type === 'destination' || type === 'landing') {
      setTempState((prev) => ({ ...prev, ...{ [`${type}`]: value } }));
    }

    setTempState((prev) => ({ ...prev, ...{ pointList: {} } }));
  };

  const setPostCode = (value: string, type: string, id: number | null) => {
    const stopOvers = type === 'preStopOvers' ? preStopOvers : postStopOvers;
    const isTypeStopOver = type === 'preStopOvers' || type === 'postStopOvers';

    if (isTypeStopOver) {
      const duplicatedArr = JSON.parse(JSON.stringify(stopOvers));
      const mapped = duplicatedArr.map((stopOver: StopOver) => {
        if (stopOver.id === id) {
          stopOver.region = value;
          return stopOver;
        }
        return stopOver;
      });
      setTempState((prev) => ({ ...prev, ...{ [`${type}`]: mapped } }));
    }

    if (type === 'departure' || type === 'destination' || type === 'landing') {
      setTempState((prev) => ({ ...prev, ...{ [`${type}`]: value } }));
    }

    searchTarget = type;
    stopOverId = id;
    searchPlaces(value, placesSearchCallBack);
  };

  const searchResult = (type: string, id = null) => (
    <div className="z-50 absolute left-0 buttom-0 right-0 top-7 bg-white w-auto mx-4 rounded-lg">
      {pointList[id || type] &&
        pointList[id || type].map((point: PointDetail) => (
          <div className="mt-3">
            <a
              className="font-medium pl-3"
              onClick={() =>
                departureSelect(point.road_address_name || `${point.address_name} ${point.place_name}`, type, id)
              }
            >
              {point.road_address_name || point.place_name}
            </a>
            <div className="text-gray-500 text-sm pl-3">{point.address_name}</div>
          </div>
        ))}
    </div>
  );

  return (
    <List accordionList noHairlinesMd>
      <AccordionItem opened>
        <AccordionToggle className="px-4">
          <b>{day}</b>
        </AccordionToggle>
        <AccordionContent>
          <div className="relative mt-2">
            <div className="flex px-4 mb-2">
              <input
                className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
                value={departure}
                placeholder="출발지를 검색해주세요"
                onChange={(e) => setPostCode(e.currentTarget.value, 'departure', null)}
              />
            </div>
            {searchResult('departure')}
          </div>
          {preStopOvers &&
            preStopOvers.map((stopOver) => (
              <div className="relative" key={stopOver.id}>
                <div className="flex px-4 py-2">
                  <button
                    className="f7-icons text-xl text-red-500 outline-none"
                    onClick={() => deleteStopOver(stopOver.id, 'preStopOvers')}
                  >
                    minus_circle_fill
                  </button>
                  <input
                    className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50"
                    value={stopOver.region}
                    placeholder="경유지를 입력해주세요"
                    onChange={(e) => setPostCode(e.currentTarget.value, 'preStopOvers', stopOver.id)}
                  />
                </div>
                {searchResult('preStopOvers', stopOver.id)}
              </div>
            ))}
          {preStopOvers.length < 2 && (
            <div className="flex-col text-center">
              <button
                className="f7-icons text-xl text-red-500 outline-none"
                onClick={() => addStopOver('preStopOvers')}
              >
                plus_circle_fill
              </button>
            </div>
          )}
          <div className="relative">
            <div className="flex px-4 my-2">
              <input
                className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
                value={destination}
                placeholder="목적지를 검색해주세요"
                onChange={(e) => setPostCode(e.currentTarget.value, 'destination', null)}
              />
            </div>
            {searchResult('destination')}
          </div>
          {postStopOvers &&
            postStopOvers.map((stopOver) => (
              <div className="relative" key={stopOver.id}>
                <div className="flex px-4 py-2">
                  <button
                    className="f7-icons text-xl text-red-500 outline-none"
                    onClick={() => deleteStopOver(stopOver.id, 'postStopOvers')}
                  >
                    minus_circle_fill
                  </button>
                  <input
                    className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50"
                    value={stopOver.region}
                    placeholder="경유지를 입력해주세요"
                    onChange={(e) => setPostCode(e.currentTarget.value, 'postStopOvers', stopOver.id)}
                  />
                </div>
                {searchResult('postStopOvers', stopOver.id)}
              </div>
            ))}
          {postStopOvers.length < 2 && (
            <div className="flex-col text-center">
              <button
                className="f7-icons text-xl text-red-500 outline-none"
                onClick={() => addStopOver('postStopOvers')}
              >
                plus_circle_fill
              </button>
            </div>
          )}
          <div className="relative">
            <div className="flex px-4 mt-3">
              <input
                className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
                value={landing}
                placeholder="하차지를 검색해주세요"
                onChange={(e) => setPostCode(e.currentTarget.value, 'landing', null)}
              />
            </div>
            {searchResult('landing')}
          </div>
        </AccordionContent>
      </AccordionItem>
    </List>
  );
};

export default DetailContainer;
