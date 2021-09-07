/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import {
  Row,
  Col,
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
  ListInput,
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
          <Block style={{ height: '25%' }}>
            <div>
              <Row>
                <Col width="50">
                  <ListInput
                    label="가는날"
                    type="text"
                    placeholder="가는날을 선택해주세요"
                    readonly
                    className="bg-gray-50 mb-4 h-20 border rounded-lg ml-3 p-3"
                    value={moment(departureDate).format('YYYY년 MM월 DD일')}
                    wrap={false}
                  />
                </Col>
                <Col width="50">
                  <TimePicker el="departureTime" />
                </Col>
                <Col width="50">
                  <ListInput
                    label="오는날"
                    type="text"
                    placeholder="오는날을 선택해주세요"
                    readonly
                    className="bg-gray-50 h-20 border rounded-lg ml-3 p-3"
                    value={returnDate ? moment(returnDate).format('YYYY년 MM월 DD일') : ''}
                    wrap={false}
                  />
                </Col>
                <Col width="50">
                  <TimePicker el="returnTime" />
                </Col>
              </Row>
            </div>
          </Block>
          <Calendar />
          <Toolbar position="bottom" className="justify-end">
            <div className="w-full flex">
              <Button
                text="날짜지우기"
                className="text-xl py-4"
                fill
                style={{ margin: '0 auto' }}
                onClick={resetCalendar}
              />
              <Button popupClose text="완료" className="text-xl py-4" fill style={{ margin: '0 auto' }} />
            </div>
          </Toolbar>
        </Page>
      </Popup>
    </>
  );
};

export default DatePopUp;
