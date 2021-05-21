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
} from 'framework7-react';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getDistance } from '../common/api/index';

const SearchPage = () => {
  const test = 'test';
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');

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
    const distance = await getDistance({ departure, destination });
    setDistance(distance);
    console.log(distance + 'km');
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
        <Segmented strong round className="mx-4 mb-2">
          <Button>왕복</Button>
          <Button>편도</Button>
        </Segmented>

        <div className="flex p-4">
          <input className="flex-1 rounded-lg" value={departure} placeholder="  출발지를 검색해주세요"></input>{' '}
          <Button onClick={(e) => handlePostCode(e.target.value, 'departure')} raised className="w-20 ml-2">
            출발지검색
          </Button>
        </div>
        <div className="flex p-4">
          <input className="flex-1 rounded-lg" value={destination} placeholder="  도착지를 검색해주세요"></input>{' '}
          <Button onClick={(e) => handlePostCode(e.target.value, 'destination')} raised className="w-20 ml-2">
            도착지검색
          </Button>
        </div>
        <ListInput outline label="가는날" floatingLabel type="text" placeholder="가는날" clearButton />
        <ListInput outline label="오는날" floatingLabel type="text" placeholder="오는날" clearButton />
        {/* <ListInput outline label="출발지" floatingLabel type="text" placeholder="출발지" clearButton /> */}
        {/* <ListInput outline label="경유지" floatingLabel type="text" placeholder="경유지" clearButton /> */}
        {/* <ListInput outline label="도착지" floatingLabel type="text" placeholder="도착지" clearButton /> */}
        <ListInput outline label="인원수" floatingLabel type="text" placeholder="인원수" clearButton />
        <Button
          href="/driverlists"
          onClick={handleSearchButton}
          text="검색"
          className="bg-red-500 text-white mt-8 mx-4 h-10 text-lg"
        />
      </List>
    </Page>
  );
};

export default SearchPage;
