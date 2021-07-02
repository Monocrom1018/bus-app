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
} from 'framework7-react';
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  returnDateState,
  departureDateState,
  departureState,
  destinationState,
  stopoversState,
  totalChargeState,
  driverState,
  reservationState,
} from '@atoms';
import moment from 'moment';
import { createReservation } from '../../common/api/index';
import useAuth from '@hooks/useAuth';

const EstimatePage = () => {
  const departure = useRecoilValue(departureState);
  const departureDate = useRecoilValue(departureDateState);
  const returnDate = useRecoilValue(returnDateState);
  const destination = useRecoilValue(destinationState);
  const stopovers = useRecoilValue(stopoversState);
  const totalCharge = useRecoilValue(totalChargeState);
  const driver = useRecoilValue(driverState);
  const [reservation, setReservation] = useRecoilState(reservationState);

  const { currentUser } = useAuth();
  const [people, setPeople] = useState(0);

  const handleSubmit = async () => {
    const stopoversArray = stopovers.map((stopover) => {
      return stopover.stopover;
    });
    const params = {
      userEmail: currentUser.email,
      driverId: driver.id,
      departure,
      returnDate,
      departureDate,
      destination,
      totalCharge,
      stopoversArray,
      people,
    };
    f7.preloader.show();
    let message: string;

    try {
      const result = await createReservation(params);
      setReservation(result);
      message = '기사님께 예약이 전달되었습니다';
    } catch (error) {
      if (typeof error.message === 'string') message = '이미 동일한 예약이 존재합니다';
      else message = '예상치 못한 오류가 발생하였습니다';
    } finally {
      f7.preloader.hide();
      f7.dialog.alert(message);
    }
  };

  return (
    <Page name="search">
      <Navbar title="견적확인" backLink></Navbar>
      <List noHairlinesMd>
        <div className="flex flex-col">
          <div className="mx-6 mt-6 -mb-6 font-semibold">일정확인</div>
          <List className="bg-gray-50">
            <ListInput
              label="가는날 및 탑승시간"
              placeholder="가는날과 탑승시간을 선택해주세요"
              className="bg-gray-50"
              disabled
              value={moment(departureDate).format('YYYY년 MM월 DD일 HH시 MM분')}
            />
            <ListInput
              label="오는날 및 탑승시간"
              disabled
              placeholder="오는날과 탑승시간을 선택해주세요"
              className="bg-gray-50"
              value={moment(returnDate).format('YYYY년 MM월 DD일 HH시 MM분')}
            />
          </List>

          <div className="mx-6 mb-2 font-semibold">장소확인</div>

          <div className="flex px-4 mb-3">
            <div className="f7-icons text-base mr-1">map_pin_ellipse</div>
            <input
              className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
              readOnly
              value={departure}
              placeholder="출발지를 검색해주세요"
              disabled
            ></input>{' '}
          </div>
        </div>
        {stopovers.map((item) => {
          return (
            <div className="flex px-4 py-2" key={item.id}>
              <div className="f7-icons text-base mr-1">placemark</div>
              <input className="pl-3 h-8 ml-1 flex-1 rounded-lg bg-gray-50" value={item.stopover}></input>{' '}
            </div>
          );
        })}
        <div className="flex px-4 mt-3">
          <div className="f7-icons text-base mr-1">map_pin_ellipse</div>
          <input
            className="pl-3 h-8 flex-1 rounded-lg bg-gray-50"
            value={destination}
            placeholder="도착지를 검색해주세요"
            disabled
          ></input>{' '}
        </div>

        <div className="mx-6 mb-2 mt-8 font-semibold">입력사항</div>
        <ListInput
          label="탑승 인원수"
          placeholder="탑승 인원수를 숫자만 입력해주세요"
          className="bg-gray-50 mb-32"
          onChange={(e) => setPeople(e.target.value)}
        />

        <div className="fixed bottom-12 pb-4 z-50 w-full bg-white pt-1">
          <div className="flex flex-row justify-between text-lg font-semibold tracking-wider mx-4 -mb-3">
            <div>요금 총액</div>
            <div>{totalCharge.toLocaleString()}₩</div>
          </div>
          <Button
            text="견적 전달하기"
            className="bg-red-500 text-white mt-6 mx-4 h-10 text-lg"
            onClick={handleSubmit}
          />
        </div>
      </List>
    </Page>
  );
};

export default EstimatePage;
