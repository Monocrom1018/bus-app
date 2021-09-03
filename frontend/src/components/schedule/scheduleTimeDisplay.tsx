import { List, ListInput } from 'framework7-react';
import React from 'react';
import moment from 'moment';
import { formatTime } from '@utils';

const ScheduleTimeDisplay = ({ departureDate, departureTime, returnDate, returnTime }) => (
  <List className="bg-gray-50">
    <ListInput
      label="가는날 및 탑승시간"
      className="bg-gray-50"
      disabled
      value={`${moment(departureDate).format('YYYY년 MM월 DD일')} ${formatTime(departureTime)}`}
    />
    <ListInput
      label="오는날 및 탑승시간"
      disabled
      className="bg-gray-50"
      value={`${moment(returnDate).format('YYYY년 MM월 DD일')} ${formatTime(returnTime)}`}
    />
  </List>
);

export default ScheduleTimeDisplay;
