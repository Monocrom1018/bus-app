import { Block, BlockTitle, Link, Navbar, NavLeft, NavTitle, Page, Input } from 'framework7-react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { stopoversState, searchingOptionState, distanceState } from '@atoms';
import DetailContainer from '@components/search/DetailContainer';
import DatePopup from '@components/search/DatePopUp';
import Driver from './users/Driver';

const SearchPage = () => {
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const [stopovers, setStopovers] = useRecoilState(stopoversState);
  const [tempState, setTempState] = useState({
    stopoverCount: 0,
    lastDestinationCheck: false,
    returnStopoverCheck: false,
    drivers: null,
    pointList: {},
  });

  let departDay;
  let searchTarget;
  let itemId;

  const [distance, setDistance] = useRecoilState(distanceState);
  const [drivers, setDrivers] = useState(null);


  return (
    <Page name="search">
      <Navbar>
        <NavLeft>
          <Link icon="las la-bars" panelOpen="left" />
        </NavLeft>
        <NavTitle>검색</NavTitle>
      </Navbar>
      <Block className="my-5">
        <BlockTitle className="text-center text-xl text-gray-900">내용을 입력하고 예약해보세요</BlockTitle>
      </Block>

      <DatePopup />
      <DetailContainer />

      {tempState.drivers ? (
        <div>
          <div className="flex justify-between">
            <Input type="select" defaultValue="인기순" className="w-28 mx-4 px-1 border-b-2 border-red-400">
              <option value="인기순">인기순</option>
              <option value="인승">인승</option>
              <option value="최저가격순">최저가격순</option>
            </Input>
            <div className="mx-4 font-medium text-gray-700">거리(왕복) : {searchingOption.distance}km</div>
          </div>
          <div>
            {tempState.drivers.map((driver) => (
              <Driver driver={driver} key={driver.id} />
            ))}
          </div>
        </div>
      ) : null}
    </Page>
  );
};

export default SearchPage;
