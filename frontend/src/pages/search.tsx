import {
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
  Segmented,
  Input,
} from 'framework7-react';
import React, { useEffect, useState } from 'react';
import Driver from './users/Driver';
import { getDistance } from '../common/api/index';

const SearchPage = () => {
  const test = 'test';
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(0);
  const [stopovers, setStopovers] = useState([]);
  const [stopoverCount, setStopoverCount] = useState(0);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [withDriver, setWithDriver] = useState('');

  const handleSearch = async () => {
    if (departure !== '' && destination !== '') {
      const distance = await getDistance({ departure, destination, stopovers });
      setDistance(distance);
    } else {
      // 출발지 도착지 입력해달라고 토스트 띄우기
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

  const handlePostCode = (e, value, id) => {
    new daum.Postcode({
      oncomplete: (data) => {
        if (value === 'departure') {
          setDeparture(data.address);
        }

        if (value === 'destination') {
          setDestination(data.address);
        }

        if (value === 'stopover') {
          const mapped = stopovers.map((item) => {
            if (item.id === id) {
              item.stopover = data.address;
              return item;
            }
            return item;
          });

          setStopovers(mapped);
        }
      },
    }).open();
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
        <Segmented strong round className="mx-4 mb-4">
          <Button active={isRoundTrip === false} onClick={() => setIsRoundTrip(!isRoundTrip)}>
            편도
          </Button>
          <Button active={isRoundTrip} onClick={() => setIsRoundTrip(!isRoundTrip)}>
            왕복
          </Button>
        </Segmented>
        <div className="flex flex-col">
          <div className="mx-6 mt-6 -mb-6 font-semibold">일정입력</div>
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
              }}
              className="bg-gray-50"
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
              }}
              className="bg-gray-50"
            />
          </List>

          <div className="mx-6 mb-2 font-semibold">장소입력</div>

          <div className="flex px-4 mb-3">
            <input
              className="pl-3 flex-1 rounded-lg"
              readOnly
              value={departure}
              placeholder="출발지를 검색해주세요"
            ></input>{' '}
            <Button raised className="w-20 ml-2" onClick={(e) => handlePostCode(e.target.value, 'departure', null)}>
              출발지검색
            </Button>
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
                className="pl-3 ml-1 flex-1 rounded-lg"
                readOnly
                value={item.stopover}
                placeholder="최대 5개까지 추가 가능합니다"
              ></input>{' '}
              <Button raised className="w-20 ml-2" onClick={(e) => handlePostCode(e.target.value, 'stopover', item.id)}>
                경유지검색
              </Button>
            </div>
          );
        })}
        <div className="flex px-4 mt-3">
          <input
            className="pl-3 flex-1 rounded-lg"
            readOnly
            value={destination}
            placeholder="도착지를 검색해주세요"
          ></input>{' '}
          <Button raised className="w-20 ml-2" onClick={(e) => handlePostCode(e.target.value, 'destination', null)}>
            도착지검색
          </Button>
        </div>
        <Button onClick={handleAddStopover} className="mt-4">
          경유지 추가
        </Button>
        <ListInput
          type="select"
          defaultValue="기사님의 동행여부를 선택해주세요"
          className="mt-8 bg-gray-50"
          onChange={(e) => setWithDriver(e.target.value)}
        >
          <option disabled>기사님의 동행여부를 선택해주세요</option>
          <option value="전체일정 동행">전체일정 동행</option>
          <option value="출발, 귀환시에만 동행">출발, 귀환시에만 동행</option>
        </ListInput>

        {withDriver === '전체일정 동행' ? (
          <Input
            type="textarea"
            placeholder="구체적인 동행일정을 상세히 적어주세요"
            className="m-3 pl-2 border-2 border-gray-200 rounded-lg bg-gray-50"
          ></Input>
        ) : null}
        <br />

        <Button onClick={handleSearch} text="검색" className="bg-red-500 text-white mt-8 mx-4 h-10 text-lg" />
      </List>

      {distance ? (
        <div>
          <div className="flex justify-between">
            <Input type="select" defaultValue="인기순" className="w-28 mx-4 px-1 border-b-2 border-red-400">
              <option value="인기순">인기순</option>
              <option value="인승">인승</option>
              <option value="최저가격순">최저가격순</option>
            </Input>
            {isRoundTrip ? (
              <div className="mx-4 font-medium text-gray-700">왕복거리 : {Number(`${distance}`) * 2}km</div>
            ) : (
              <div className="mx-4 font-medium text-gray-700">편도거리 : {`${distance}km`}</div>
            )}
          </div>
          <div>
            <Driver />
            <Driver />
            <Driver />
            <Driver />
          </div>
        </div>
      ) : null}
    </Page>
  );
};

export default SearchPage;
