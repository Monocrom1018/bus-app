import React from 'react';
import { Col, ListInput, Row } from 'framework7-react';
import { searchingOptionDateSelector, searchingOptionTimeSelector } from '@atoms';
import { useRecoilValue } from 'recoil';
import { formatTime } from '@utils';
import moment from 'moment';

const TimeDisplay = ({ setPopupOpened }) => {
  const { departureDate, returnDate } = useRecoilValue(searchingOptionDateSelector);
  const { departureTime, returnTime } = useRecoilValue(searchingOptionTimeSelector);

  return (
    <div className="mt-4 -mb-2">
      <Row>
        <Col width="50" onClick={() => setPopupOpened(true)}>
          <ListInput
            label="출발일자"
            type="text"
            readonly
            className="bg-gray-50 mb-4 h-14 border rounded-lg ml-3 px-3 pt-1"
            value={moment(departureDate).format('YYYY년 MM월 DD일')}
            wrap={false}
          />
        </Col>
        <Col width="50" onClick={() => setPopupOpened(true)}>
          <div className="">
            <ListInput
              label="출발시간"
              wrap={false}
              type="text"
              readonly
              value={departureTime ? formatTime(departureTime) : '0시 00분'}
              className="bg-gray-50 mb-4 h-14 border rounded-lg mr-3 px-3 pt-1"
            />
          </div>
        </Col>
        <Col width="50" onClick={() => setPopupOpened(true)}>
          <ListInput
            label="하차일자"
            type="text"
            readonly
            className="bg-gray-50 mb-4 h-14 border rounded-lg ml-3 px-3 pt-1"
            value={returnDate ? moment(returnDate).format('YYYY년 MM월 DD일') : ''}
            wrap={false}
          />
        </Col>
        <Col width="50" onClick={() => setPopupOpened(true)}>
          <div className="">
            <ListInput
              label="하차시간"
              wrap={false}
              type="text"
              readonly
              value={returnTime ? formatTime(returnTime) : '0시 00분'}
              className="bg-gray-50 mb-4 h-14 border rounded-lg mr-3 px-3 pt-1"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TimeDisplay;
