import { f7 } from 'framework7-react';
import React, { useEffect } from 'react';
import jQuery from 'jquery';

const Calendar = (props) => {
  const { Dates, setDates } = props;
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  useEffect(() => {
    const calendarInline = f7.calendar.create({
      containerEl: '#demo-calendar-inline-container',
      rangePicker: true,
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
        change(c, v: Array<string>) {
          setDates([...v]);
        },
      },
    });
  }, []);

  return (
    <div className="block block-strong no-padding">
      <div id="demo-calendar-inline-container" />
    </div>
  );
};

export default Calendar;
