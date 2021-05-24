import {
  Block,
  BlockTitle,
  Button,
  Icon,
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
import { useQuery } from 'react-query';
import { getDistance } from '../common/api/index';

const SearchPage = () => {
  const test = 'test';
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [stopover, setStopover] = useState('');
  const [isStopover, setIsStopover] = useState(false);

  //? search 시 useQuery 사용
  // const { data, error, refetch } = useQuery(
  //   'distance',
  //   () =>
  //     getDistance({
  //       departure,
  //       destination,
  //     }),
  //   {
  //     onSuccess: () => {
  //       console.log(data);
  //       setDistance(data);
  //     },
  //     onError: () => {
  //       console.log(error);
  //     },
  //   },
  // );

  const handleSearchButton = async () => {
    if (departure !== '' && destination !== '') {
      const distance = await getDistance({ departure, destination });
      setDistance(distance);
    } else {
      // 출발지 도착지 입력해달라고 토스트 띄우기
    }
  };

  const handlePostCode = (e, value) => {
    new daum.Postcode({
      oncomplete: (data) => {
        if (value === 'departure') {
          setDeparture(data.address);
        }

        if (value === 'destination') {
          setDestination(data.address);
        }

        if (value === 'stopover') {
          setStopover(data.address);
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
        <BlockTitle className="text-center text-xl">내용을 입력하고 예약해보세요</BlockTitle>
      </Block>
      <List noHairlinesMd>
        <Segmented strong round className="mx-4 mb-4">
          <Button>왕복</Button>
          <Button>편도</Button>
        </Segmented>

        <div className="flex flex-col">
          <div className="mx-6 mb-2 font-semibold">일정입력</div>
          <Input
            type="datepicker"
            placeholder="가는날과 탑승시간을 선택해주세요"
            readonly
            calendarParams={{
              timePicker: true,
              openIn: 'customModal',
              footer: true,
              dateFormat: '(가는날) yyyy년 mm월 dd일 hh시 :mm분',
            }}
            className="pl-3 mx-4 flex-1 border-2 rounded-lg"
          />
          <Input
            type="datepicker"
            placeholder="오는날과 탑승시간을 선택해주세요"
            readonly
            calendarParams={{
              timePicker: true,
              openIn: 'customModal',
              footer: true,
              dateFormat: '(오는날) yyyy년 mm월 dd일 hh시 :mm분',
            }}
            className="pl-3 mx-4 mt-2 flex-1 border-2 rounded-lg"
          />

          <div className="mx-6 mt-8 mb-2 font-semibold">장소입력</div>

          <div className="flex px-4 mb-3">
            <input className="pl-3 flex-1 rounded-lg" value={departure} placeholder="출발지를 검색해주세요"></input>{' '}
            <Button onClick={(e) => handlePostCode(e.target.value, 'departure')} raised className="w-20 ml-2">
              출발지검색
            </Button>
          </div>
        </div>

        {isStopover ? (
          <div className="flex px-4 py-2">
            <input className="pl-3 flex-1 rounded-lg" value={stopover} placeholder="경유지를 검색해주세요"></input>{' '}
            <Button onClick={(e) => handlePostCode(e.target.value, 'stopover')} raised className="w-20 ml-2">
              경유지검색
            </Button>
          </div>
        ) : null}

        <div className="flex px-4 mt-3">
          <input className="pl-3 flex-1 rounded-lg" value={destination} placeholder="도착지를 검색해주세요"></input>{' '}
          <Button onClick={(e) => handlePostCode(e.target.value, 'destination')} raised className="w-20 ml-2">
            도착지검색
          </Button>
        </div>

        {isStopover ? (
          <Button onClick={() => setIsStopover(!isStopover)} className="mt-4">
            경유지 삭제
          </Button>
        ) : (
          <Button onClick={() => setIsStopover(!isStopover)} className="mt-4">
            경유지 추가
          </Button>
        )}

        <ListInput type="select" defaultValue="기사님의 동행여부를 선택해주세요" className="mt-8">
          <option disabled>기사님의 동행여부를 선택해주세요</option>
          <option value="전체일정 동행">전체일정 동행</option>
          <option value="출발, 귀환시에만 동행">출발, 귀환시에만 동행</option>
        </ListInput>

        {distance ? <ListInput label="편도거리" value={`${distance}km`} /> : null}

        <Button
          // href="/driverlists"
          onClick={handleSearchButton}
          text="검색"
          className="bg-red-500 text-white mt-8 mx-4 h-10 text-lg"
        />
      </List>
    </Page>
  );
};

export default SearchPage;
