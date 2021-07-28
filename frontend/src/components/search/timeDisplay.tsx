import React from 'react';
import { Col, ListInput, Row } from 'framework7-react';
import { searchingOptionDateSelector } from '@atoms';
import { useRecoilValue } from 'recoil';
import moment from 'moment';

const TimeDisplay = ({ setPopupOpened }) => {
  const { departureDate, returnDate } = useRecoilValue(searchingOptionDateSelector);

  return (
    <div className="mt-4">
      <Row>
        <Col width="50" onClick={() => setPopupOpened(true)}>
          <ListInput
            label="가는날"
            type="text"
            readonly
            className="bg-gray-50 mb-4 h-14 border rounded-lg ml-3 px-3 pt-1"
            value={moment(departureDate).format('YYYY년 MM월 DD일')}
            wrap={false}
          />
        </Col>
        {/* <Col width="50">
          <div className="">
            <ListInput
              label="탑승시간"
              wrap={false}
              type="text"
              readonly
              value={time.departureTime ? `${time.departureTime[0]}:${time.departureTime[1]}` : ''}
              className="bg-gray-50 mb-4 h-14 border rounded-lg mr-3 px-3 pt-1"
            />
          </div>
        </Col> */}
        <Col width="50" onClick={() => setPopupOpened(true)}>
          <ListInput
            label="오는날"
            type="text"
            readonly
            className="bg-gray-50 mb-4 h-14 border rounded-lg mr-3 px-3 pt-1"
            value={returnDate ? moment(returnDate).format('YYYY년 MM월 DD일') : ''}
            wrap={false}
          />
        </Col>
        {/* <Col width="50">
          <div className="">
            <ListInput
              label="탑승시간"
              wrap={false}
              type="text"
              readonly
              value={time.returnTime ? `${time.returnTime[0]}:${time.returnTime[1]}` : ''}
              className="bg-gray-50 mb-4 h-14 border rounded-lg mr-3 px-3 pt-1"
            />
          </div>
        </Col> */}
      </Row>
    </div>
  );
};

export default TimeDisplay;
