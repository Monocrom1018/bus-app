import { f7 } from 'framework7-react';
import React, { useEffect } from 'react';
import jQuery from 'jquery';
import { searchingOptionState, tourScheduleState } from '@atoms';
import { useRecoilState } from 'recoil';
import moment from 'moment';

const Calendar = () => {
  const [searchingOption, setSearchingOption] = useRecoilState(searchingOptionState);
  const [tourSchedule, setTourSchedule] = useRecoilState(tourScheduleState);
  const { departureDate: departure, returnDate: arrival } = searchingOption;
  const Dates = [departure as Date, arrival as unknown as Date];
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  useEffect(() => {
    const today = new Date();
    const yesterDay = new Date().setDate(today.getDate() - 1);
    const calendarInline = f7.calendar.create({
      containerEl: '#demo-calendar-inline-container',
      rangePicker: true,
      disabled: {
        to: new Date(yesterDay),
      },
      renderToolbar() {
        return `
          <div class="toolbar calendar-custom-toolbar no-shadow">
            <div class="toolbar-inner">
              <div class="left">
                <a href="#" class="link icon-only"><i class="icon icon-back"></i></a>
              </div>
              <div class="center"></div>
              <div class="right">
                <a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>
              </div>
            </div>
          </div>
          `;
      },
      on: {
        init(c) {
          jQuery('.calendar-custom-toolbar .center').text(`${monthNames[c.currentMonth]}, ${c.currentYear}`);
          jQuery('.calendar-custom-toolbar .left .link').on('click', () => {
            calendarInline.prevMonth(100);
          });
          jQuery('.calendar-custom-toolbar .right .link').on('click', () => {
            calendarInline.nextMonth(100);
          });
          if (Dates) {
            c.setValue(Dates);
          }
        },
        monthYearChangeStart(c) {
          jQuery('.calendar-custom-toolbar .center').text(`${monthNames[c.currentMonth]}, ${c.currentYear}`);
        },
        change(_, value: Array<string>) {
          const set = {};
          const [departureDate, returnDate] = value;
          (set as any).departureDate = departureDate;
          (set as any).returnDate = '';
          if (value.length !== 1) {
            (set as any).returnDate = returnDate;
            const days = [];
            const dayDiff = returnDate ? moment(returnDate).diff(moment(departureDate), 'days') + 1 : 0;
            [...Array(dayDiff)].forEach((day, index) => {
              days.push(moment(departureDate).add(index, 'days').format('YY년 MM월 D일'));
            });
            setTourSchedule(days.map((day) => ({ day, stopOvers: [] }), []));
          }
          setSearchingOption((prev) => ({ ...prev, ...set }));
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="block block-strong no-padding">
      <div id="demo-calendar-inline-container" />
    </div>
  );
};

export default Calendar;
