import React from 'react';
import { Col, ListInput, Row } from 'framework7-react';
import { searchingOptionDateSelector, searchingOptionTimeSelector } from '@atoms';
import { useRecoilValue } from 'recoil';
import { formatTime } from '@utils';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko');

const TimeDisplay = ({ setPopupOpened }) => {
  const { departureDate, returnDate } = useRecoilValue(searchingOptionDateSelector);
  const { departureTime, returnTime } = useRecoilValue(searchingOptionTimeSelector);

  return (
    <div className="mt-4 -mb-4 relative">
      <Row>
        <Col onClick={() => setPopupOpened(true)}>
          <div className="bg-gray-50 mb-4 h-14 border rounded-lg mx-4 px-3 pt-3 text-xl font-semibold">
            <div className="f7-icons text-xl mr-2">calendar</div>
            {`${moment(departureDate).format('M월 DD일 (ddd)')} ${departureTime ? formatTime(departureTime) : '0시 00분'}`}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
        <div className="f7-icons z-50 absolute top-11 left-9 border-l-2 border-dashed border-gray-500" style={{height: '25%'}}></div>
        </Col>
      </Row>
      <Row>
        <Col onClick={() => setPopupOpened(true)}>
          <div className="bg-gray-50 mb-4 h-14 border rounded-lg mx-4 px-3 pt-3 text-xl font-semibold">
            <div className="f7-icons text-xl mr-2">calendar</div>
            {returnDate ? `${moment(returnDate).format('M월 DD일 (ddd)')} ${returnTime ? formatTime(returnTime) : '0시 00분'}` : ''}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TimeDisplay;
