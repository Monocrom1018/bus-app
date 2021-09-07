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
import TimePicker from '@components/search/TimePicker';
import moment, { Moment } from 'moment';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchingOptionState, tourScheduleState } from '@atoms';
import 'react-dates/initialize';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '@styles/calendar.less';

const DatePopUp = ({ popupOpened, setPopupOpened }) => {
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const setTourSchedule = useSetRecoilState(tourScheduleState);
  const { departureDate, returnDate } = searchingOption;
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>('startDate');

  const handleDatesChange = ({ startDate, endDate }) => {
    const set = {} as any;
    const [departureDate, returnDate] = [startDate?._d, endDate?._d];
    set.departureDate = departureDate;
    set.returnDate = '';
    if (startDate !== null || endDate !== null) {
      set.returnDate = returnDate;
      const days = [];
      const dayDiff = returnDate ? moment(returnDate).diff(moment(departureDate), 'days') + 1 : 0;
      [...Array(dayDiff)].forEach((day, index) => {
        days.push(moment(departureDate).add(index, 'days').format('YY년 MM월 D일'));
      });
      setTourSchedule(days.map((day) => ({ day, stopOvers: [] }), []));
    }
    setSearchingOption((prev) => ({ ...prev, ...set }));

    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFocusChange = (arg: FocusedInputShape | null) => {
    if (arg === null) {
      arg = 'startDate';
    }
    setFocusedInput(arg);
  };

  const isDayBlocked = (day: Moment): boolean => {
    if (day.isBefore(moment().subtract(1, 'days'))) {
      return true;
    }
    return false;
  };

  const renderDay = (day: Moment) =>
    startDate && endDate ? (
      <>
        <div className="day-wrapper" />
        <div>{day.format('D')}</div>
      </>
    ) : (
      day.format('D')
    );

  const renderWeekHeaderElement = (day: string) => <div>{day}</div>;

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
          <div style={{ height: '75%' }}>
            <DayPickerRangeController
              startDate={startDate}
              endDate={endDate}
              onDatesChange={handleDatesChange}
              renderWeekHeaderElement={renderWeekHeaderElement}
              focusedInput={focusedInput}
              onFocusChange={handleFocusChange}
              orientation="verticalScrollable"
              isDayBlocked={isDayBlocked}
              minimumNights={0}
              initialVisibleMonth={() => moment().add(0, 'month')}
              monthFormat="M월"
              numberOfMonths={12}
              verticalHeight={800}
              noNavPrevButton
              noNavNextButton
              renderDayContents={renderDay}
            />
          </div>
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
