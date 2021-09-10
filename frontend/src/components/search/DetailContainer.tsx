import { List, AccordionItem, AccordionContent, AccordionToggle, f7 } from 'framework7-react';
import React, { useRef, useState } from 'react';
import { PointDetail, StopOver } from '@interfaces';
import { useRecoilState } from 'recoil';
import { tourScheduleState } from '@atoms';
import { IoCloseCircle } from 'react-icons/io5';

const DetailContainer = ({ searchPlaces, day, index, lastIndex }) => {
  const [tourSchedule, setTourSchedule] = useRecoilState(tourScheduleState);
  const { day: previousDate } = tourSchedule[index - 1] || tourSchedule[lastIndex] || {};
  const { day: currentDate, departure, stopOvers, destination } = tourSchedule[index];
  const { day: nextDate } = tourSchedule[index + 1] || {};
  const [pointList, setPointList] = useState({});
  const [accordionOpened, setAccordionOpened] = useState(true);
  const stopOverCount = useRef(1);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const maxStopOverLength = 5;
  let searchTarget: string;
  let stopOverId: number | string;

  const addStopOver = async (type: string) => {
    if (stopOvers && stopOvers.length < maxStopOverLength) {
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

  const placesSearchCallBack = async (data: string, status: any) => {
    setTimeout(() => {
      const cutData = data.slice(0, 5);
      const kakaoCompleteStatus = 'OK';
      const isSearchTargetStopOver = searchTarget === 'stopOvers';
      console.log(cutData, status);
      if (status === kakaoCompleteStatus && isSearchTargetStopOver) {
        setPointList((prev) => ({ ...prev, [stopOverId]: cutData }));
      } else if (status === kakaoCompleteStatus) {
        setPointList((prev) => ({ ...prev, [searchTarget]: cutData }));
      } else {
        setPointList({});
      }
    }, 400);
  };

  const setScheduleByType = (type: string, value: string) => {
    switch (type) {
      case 'departure':
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
                  [`destination`]: value,
                },
              };
            }
            return schedule;
          }),
        );
        break;
      case 'destination':
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
            if (schedule.day === nextDate) {
              return {
                ...schedule,
                ...{
                  [`departure`]: value,
                },
              };
            }
            return schedule;
          }),
        );
        break;
      default:
        break;
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
    }

    stopOverId = id;
    setScheduleByType(type, value);
    searchTarget = type;

    if (!value) {
      setTimeout(() => setPointList({}), 300);
    } else {
      searchPlaces(value, placesSearchCallBack);
    }
  };

  const setPostCodeByType = (type: string, id) => {
    if (type === 'stopOvers') {
      return setPostCode('', 'stopOvers', `${id}`);
    }
    console.log(type, id);
    return setScheduleByType(`${type}`, '');
  };

  const searchResult = (type: string, id = null) => (
    <div className="z-50 absolute left-0 buttom-0 right-0 top-12 bg-white w-auto mx-4 rounded-lg">
      {focused && pointList[id || type] && (
        <div
          className="image-slide-delete-btn absolute top-2 right-4"
          onClick={() => {
            setPostCodeByType(type, id);
            setFocused(false);
          }}
        >
          <IoCloseCircle size="20px" />
        </div>
      )}
      {focused &&
        pointList[id || type] &&
        pointList[id || type].map((point: PointDetail) => {
          const selectedDeparture = point.road_address_name === '' ? `${point.address_name} ${point.place_name}` : `${point.road_address_name} ${point.place_name}`;
          return (
            <div className="mt-3" key={point.id}>
              <a
                className="font-medium pl-3"
                onClick={() => {
                  departureSelect(selectedDeparture, type, id);
                  setFocused(true);
                }}
              >
                {point.place_name || point.road_address_name}
                <div className="text-gray-500 text-sm pl-3">{point.road_address_name || point.address_name}</div>
              </a>
            </div>
          )
        })}
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
          setFocused(false);
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
                value={departure || ''}
                placeholder="출발지를 검색해주세요"
                onChange={(e) => setPostCode(e.target.value, 'departure', null)}
                onFocus={onFocus}
                onKeyUp={onFocus}
              />
              <span
                className="input-clear-button mr-6"
                onClick={() => {
                  setScheduleByType('departure', '');
                  setFocused(false);
                }}
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
                    onClick={() => deleteStopOver(stopOver.id, 'stopOvers')}
                  >
                    minus_circle_fill
                  </button>
                  <input
                    className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50"
                    value={stopOver.region}
                    placeholder="경유지를 입력해주세요"
                    onChange={(e) => {
                      setPostCode(e.target.value, 'stopOvers', `${stopOver.id}`);
                    }}
                    onFocus={onFocus}
                  />
                  <span
                    className="input-clear-button mr-6"
                    onClick={() => {
                      setPostCode('', 'stopOvers', `${stopOver.id}`);
                      setFocused(false);
                    }}
                  />
                </div>
                {searchResult('stopOvers', stopOver.id)}
              </div>
            ))}

          <div className="relative">
            <div className="flex px-4 my-2">
              <input
                className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
                value={destination || ''}
                placeholder="목적지를 검색해주세요"
                onChange={(e) => setPostCode(e.target.value, 'destination', null)}
                onFocus={onFocus}
              />
              <span
                className="input-clear-button mr-6"
                onClick={() => {
                  setScheduleByType('destination', '');
                  setFocused(false);
                }}
              />
            </div>
            {searchResult('destination')}
          </div>
          {stopOvers && stopOvers.length < maxStopOverLength && (
            <div className="flex px-4 pt-1">
              <div
                className="flex-initial text-white bg-red-500 py-2 px-4 rounded-lg"
                onClick={() => addStopOver('stopOvers')}
              >
                경유지 추가
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </List>
  );
};

export default DetailContainer;
