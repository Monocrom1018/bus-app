import { List, AccordionItem, AccordionContent, AccordionToggle, f7 } from 'framework7-react';
import React, { useRef, useState } from 'react';
import { PointDetail, StopOver } from '@interfaces';
import { useRecoilState } from 'recoil';
import { tourScheduleState } from '@atoms';

const DetailContainer = ({ searchPlaces, day, index }) => {
  const [tourSchedule, setTourSchedule] = useRecoilState(tourScheduleState);
  const { day: previousDate } = tourSchedule[index - 1] || {};
  const { day: currentDate, departure, stopOvers, destination } = tourSchedule[index];
  const [pointList, setPointList] = useState({});
  const [accordionOpened, setAccordionOpened] = useState(true);
  const stopOverCount = useRef(1);
  let searchTarget: string;
  let stopOverId: number | string;

  const addStopOver = async (type: string) => {
    if (stopOvers && stopOvers.length < 2) {
      setTourSchedule(
        tourSchedule.map((schedule) =>
          schedule.day === currentDate
            ? {
                ...schedule,
                ...{ [`${type}`]: stopOvers.concat({ id: `${stopOverCount.current}`, region: '' }) },
              }
            : schedule,
        ),
      );
      stopOverCount.current += 1;
    }
  };

  const deleteStopOver = async (id: number | string, type: string) => {
    setTourSchedule(
      tourSchedule.map((schedule) =>
        schedule.day === currentDate
          ? {
              ...schedule,
              ...{
                [`${type}`]: stopOvers.filter((stopOver) => {
                  if (stopOver.id === `${id}`) {
                    return false;
                  }
                  return true;
                }),
              },
            }
          : schedule,
      ),
    );
    stopOverCount.current -= 1;
  };

  const placesSearchCallBack = (data: string, status: any) => {
    const cutData = data.slice(0, 5);
    const kakaoCompleteStatus = 'OK';
    const isSearchTargetStopOver = searchTarget === 'stopOvers';

    if (status === kakaoCompleteStatus && isSearchTargetStopOver) {
      setPointList((prev) => ({ ...prev, [stopOverId]: cutData }));
    } else if (status === kakaoCompleteStatus) {
      setPointList((prev) => ({ ...prev, [searchTarget]: cutData }));
    } else {
      setPointList({});
    }
  };

  const setScheduleByType = (type: string, value: string) => {
    if (type === 'departure') {
      setTourSchedule(
        tourSchedule.map((schedule) => {
          if (schedule.day === currentDate) {
            return {
              ...schedule,
              ...{
                [`${type}`]: value,
              },
            };
          }
          if (schedule.day === previousDate) {
            return {
              ...schedule,
              ...{
                [`landing`]: value,
              },
            };
          }
          return schedule;
        }),
      );
    }
    if (type === 'destination') {
      setTourSchedule(
        tourSchedule.map((schedule) =>
          schedule.day === currentDate
            ? {
                ...schedule,
                ...{
                  [`${type}`]: value,
                },
              }
            : schedule,
        ),
      );
    }
  };

  const departureSelect = async (value: string, type: string, id = null) => {
    const isTypeStopOver = type === 'stopOvers';

    if (isTypeStopOver) {
      const duplicatedArr = JSON.parse(JSON.stringify(stopOvers));
      const mapped = duplicatedArr.map((item: StopOver) => {
        if (item.id === id) {
          item.region = value;
          return item;
        }
        return item;
      });

      setTourSchedule(
        tourSchedule.map((schedule) =>
          schedule.day === currentDate
            ? {
                ...schedule,
                ...{
                  [`${type}`]: mapped,
                },
              }
            : schedule,
        ),
      );
    }

    setScheduleByType(type, value);
    setPointList({});
  };

  const setPostCode = (value: string, type: string, id: string | null) => {
    const isTypeStopOver = type === 'stopOvers';

    if (isTypeStopOver) {
      const duplicatedArr = JSON.parse(JSON.stringify(stopOvers));
      const mapped = duplicatedArr.map((stopOver: StopOver) => {
        if (stopOver.id === `${id}`) {
          stopOver.region = value;
          return stopOver;
        }
        return stopOver;
      });
      setTourSchedule(
        tourSchedule.map((schedule) =>
          schedule.day === currentDate
            ? {
                ...schedule,
                ...{
                  [`${type}`]: mapped,
                },
              }
            : schedule,
        ),
      );
      setPointList((prev) => ({ ...prev, [`${type}`]: mapped }));
    }

    setScheduleByType(type, value);
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
    <List accordionList noHairlinesMd style={{ zIndex: 'auto' }}>
      <AccordionItem
        opened
        onAccordionOpen={() => {
          setAccordionOpened(true);
        }}
        onAccordionClose={() => {
          setAccordionOpened(false);
        }}
        id={`accordion-item-${index}`}
      >
        <AccordionToggle className="px-4 flex justify-between">
          <div className="text-xl font-bold">{day}</div>
          <div className="f7-icons text-lg">{accordionOpened ? 'chevron_compact_up' : 'chevron_compact_down'}</div>
        </AccordionToggle>
        <AccordionContent style={{ overflow: accordionOpened ? 'visible' : 'hidden' }}>
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
          {stopOvers &&
            stopOvers.map((stopOver) => (
              <div className="relative" key={stopOver.id}>
                <div className="flex px-4 py-2">
                  <button
                    className="f7-icons text-xl text-red-500 outline-none"
                    onClick={() => deleteStopOver(stopOver.id, 'stopOvers')}
                  >
                    minus_circle_fill
                  </button>
                  <input
                    className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50"
                    value={stopOver.region}
                    placeholder="경유지를 입력해주세요"
                    onChange={(e) => setPostCode(e.currentTarget.value, 'stopOvers', `${stopOver.id}`)}
                  />
                </div>
                {searchResult('postStopOvers', stopOver.id)}
              </div>
            ))}
          {stopOvers && stopOvers.length < 2 && (
            <div className="flex-col text-center">
              <button className="f7-icons text-xl text-red-500 outline-none" onClick={() => addStopOver('stopOvers')}>
                plus_circle_fill
              </button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </List>
  );
};

export default DetailContainer;
