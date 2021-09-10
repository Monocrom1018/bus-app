/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import {
  Popup,
  Button,
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  Link,
  Block,
  Icon,
  Toolbar,
} from 'framework7-react';
import moment, { Moment } from 'moment';
import TimePicker from '@components/search/TimePicker';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchingOptionState, tourScheduleState } from '@atoms';
import Calendar from '@components/search/Calendar';

const DatePopUp = ({ popupOpened, setPopupOpened }) => {
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const setTourSchedule = useSetRecoilState(tourScheduleState);
  const { departureDate, returnDate } = searchingOption;
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const resetCalendar = () => {
    setStartDate(null);
    setEndDate(null);
    setTourSchedule([]);
    setSearchingOption(() => ({
      totalDistance: 0,
      departureDate: new Date(),
      returnDate: '',
      departureTime: '',
      returnTime: '',
      people: null,
    }));
  };

  return (
    <>
      <Popup
        className="demo-popup"
        swipeToClose
        animate
        opened={popupOpened}
        onPopupClosed={() => setPopupOpened(false)}
      >
        <Page>
          <Navbar>
            <NavLeft>
              <Link popupClose onClick={resetCalendar}>
                <Icon f7="multiply" />
              </Link>
            </NavLeft>
            <NavTitle>날짜 및 시간 선택</NavTitle>
          </Navbar>
          <Block style={{ height: '20%' }}>
            <div className="flex justify-between mt-6 mx-20">
              <div 
                className="border-b-2 w-24 h-10 border-black text-base font-bold truncate pt-4"
              >{moment(departureDate).format('YYYY년 M월 DD일')}</div>
              <div
                className="border-b-2 w-24 h-10 border-black text-base font-bold truncate pt-4"
              >{returnDate ? moment(returnDate).format('YYYY년 M월 DD일') : ''}</div>
            </div>
            <div className="flex justify-between mt-10 mx-20">
              <TimePicker el="departureTime" />
              <TimePicker el="returnTime" />
            </div>
          </Block>
          <Calendar startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          <Toolbar position="bottom">
            <div className="w-full flex justify-between">
              <Button
                text="날짜지우기"
                className="text-lg py-4"
                style={{ margin: '0 5' }}
                onClick={resetCalendar}
              />
              <Button popupClose text="적용" className="text-lg py-4 mx-2" fill style={{ margin: '0 5' }} />
            </div>
          </Toolbar>
        </Page>
      </Popup>
    </>
  );
};

export default DatePopUp;