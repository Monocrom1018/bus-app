import { List, ListInput } from 'framework7-react';
import React from 'react';
import moment from 'moment';

const ScheduleTimeDisplay = ({ departureDate, departureTime, returnDate, returnTime }) => {
  return (
    <List className="bg-gray-50">
      <ListInput
        label="가는날 및 탑승시간"
        className="bg-gray-50"
        disabled
        value={
          moment(departureDate).format('YYYY년 MM월 DD일') +
          ' ' +
          `${departureTime[0]}시 ${departureTime[2]}${departureTime[3]}분`
        }
      />
      <ListInput
        label="오는날 및 탑승시간"
        disabled
        className="bg-gray-50"
        value={
          moment(returnDate).format('YYYY년 MM월 DD일') + ' ' + `${returnTime[0]}시 ${returnTime[2]}${returnTime[3]}분`
        }
      />
    </List>
  );
};

export default ScheduleTimeDisplay;
