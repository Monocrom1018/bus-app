/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import 'react-dates/initialize';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import moment, { Moment } from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import '@styles/calendar.less';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchingOptionState, tourScheduleState } from '@atoms';

const Calendar = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const setTourSchedule = useSetRecoilState(tourScheduleState);
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

  return (
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
  );
};

export default Calendar;
